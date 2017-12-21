<?php

	require('Mysql.php');
	// vwZonasPoligonos
	// vwTrabajosLvl1
	// vwTrabajosLvl2
	// vwTrabajosLvl3
	Class Provtrabajo extends Mysql{

		public function verifMail($info){
			$idMail = $info["id"];
			$url = $info["url"];
			$idProv = $info["prov"];
			$dataClienteMail = $this->query_assoc("SELECT A.id, A.idtrabajo, A.idcliente, A.status, C.nombre FROM adminmail A JOIN clientes C ON C.idcliente = A.idcliente WHERE A.id = $idMail AND A.url = '$url'");
			$verifTrabStatus = $this->query_assoc("SELECT status FROM trabajos WHERE idtrabajo = ".$dataClienteMail[0]['idtrabajo']);

			if(intval($verifTrabStatus[0]['status']) > 8){
				return "VERIFICADO";
			}else if(intval($verifTrabStatus[0]['status']) < 8){
				return "LINKERROR";
			}else{
				if(intval($dataClienteMail[0]['status']) === 4){
					$idConfig = $dataClienteMail[0]["idtrabajo"];

					$trabajoGeneral = $this->query_assoc("SELECT * FROM config_trabajo WHERE idtrabajo = $idConfig");
					$trabajoDetalles = $this->query_assoc("SELECT * FROM config_trabajo_detalle WHERE idconfig = (SELECT id FROM config_trabajo WHERE idtrabajo = $idConfig)");

					$provsData["status"] = "CORRECTO";
					$provsData["general"] = array();
					array_push($provsData["general"], $trabajoGeneral);

					// LLAMAMOS A DOMGEO
					require_once('Domgeo.php');
					$Geo = new Domgeo();
					for($i = 0; $i < count($trabajoDetalles); $i++){
						$arrProv = explode(",", $trabajoDetalles[$i]["proveedor"]);

						for($j = 0; $j < count($arrProv); $j++){
							if($idProv === $arrProv[$j]){
								
								
								$nomEdo = $Geo->getEdo($trabajoDetalles[$i]["estado"]);
								$nomMun = $Geo->getMun($trabajoDetalles[$i]["estado"], $trabajoDetalles[$i]["municipio"]);

								$trabajoDetalles[$i]["nommun"] = $nomMun[0]["nomMpo"];
								if(array_key_exists($nomEdo[0]["nombent"], $provsData)){
									array_push($provsData[$nomEdo[0]["nombent"]], $trabajoDetalles[$i]);
								}else{
									$provsData[$nomEdo[0]["nombent"]] = array();
									array_push($provsData[$nomEdo[0]["nombent"]], $trabajoDetalles[$i]);
								}

							}
						}
					}
					return $provsData;
				}else if(intval($dataClienteMail[0]['status']) === 5){
					$provsData["status"] = "COMPLETO";
					return $provsData;
				}else if($dataClienteMail[0]['status'] === "ERROR"){
					return "LINKERROR";
				}else{
					return false;
				}
			}
			if(count($dataClienteMail) > 0){
				$status = $dataClienteMail[0]["status"];
			}else{
				$status = "ERROR";
			}

		}

		public function actTrabajoPorvs($info){
			$idMail = $info["mail"];
			$idTrab = $info["idTrab"];
			$idConfig = $info["idConfig"];
			$provId = $info["provId"];
			$ini = $info["ini"];
			$fin = $info["fin"];

			$actualizarProv = "CALL SP_ACTCONFIGTRABPROVS('$idTrab', '$idConfig', '$provId', '$ini', '$fin')";
			if($this->query($actualizarProv)){
				$verifStatus = $this->query_assoc("SELECT SUM(status) AS suma, COUNT(*) AS conteo FROM config_trabajo_proveedor WHERE idconfig = $idConfig AND idtrabajo = $idTrab");
				if(intval($verifStatus[0]["suma"]) === intval($verifStatus[0]["conteo"])){
					$cambiarStatus = $this->query("CALL SP_CAMBIARSTATUS('$idMail', 'COMPLETAR')");
					$statusTrabajo = $this->query("CALL SP_STATUSTRABAJO('$idTrab','10')");
					$this->query("CALL SP_ACTUALIZARPENDIENTETRABAJO('proptrabajoprovs', '$idTrab', 'ACTIVAR')");
				}
				return "true";
			}else{
				return "false";
			}
		}

	}

?>
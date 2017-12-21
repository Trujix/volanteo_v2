<?php

	require('Mysql.php');
	// vwZonasPoligonos
	// vwTrabajosLvl1
	// vwTrabajosLvl2
	// vwTrabajosLvl3
	Class ConfigTrabajo extends Mysql{
		public function verifMail($info){
			$verifStatus = $this->query_assoc("SELECT * FROM adminmail WHERE id= {$info['id']} AND url = '".$info["url"]."'");
			if(count($verifStatus) > 0){
				if(intval($verifStatus[0]["status"]) > 0){					
					$trabN1Data = $this->query_assoc("SELECT TS.cantidad, TS.idtrabajo, TS.status, S.nombre, T.tipo, T.periodoini, T.periodofin FROM trabajos_sucursales TS JOIN sucursales S ON S.idsucursal = {$info['suc']} JOIN trabajos T ON T.idtrabajo = {$verifStatus[0]['idtrabajo']} WHERE TS.idtrabajo = {$verifStatus[0]['idtrabajo']} AND TS.idsucursal = {$info['suc']}");
					if(count($trabN1Data) > 0){
						$clienteData["status"] = "VIGENTE";
						$clienteData["idsucursal"] = $info['suc'];
						$clienteData["cliente"] = $trabN1Data[0]["nombre"];
						$clienteData["tipo"] = $trabN1Data[0]["tipo"];
						$clienteData["idtrabajo"] = $trabN1Data[0]["idtrabajo"];
						$clienteData["idmail"] = $info['id'];
						$clienteData["vigencia"] = $trabN1Data[0]["periodoini"].' - '.$trabN1Data[0]["periodofin"];
						$clienteData["cantidad"] = $trabN1Data[0]["cantidad"];

						$sucsDomgeo = $this->query_assoc("SELECT estado, municipio FROM sucursales_poligonos WHERE idsucursal = {$info['suc']} GROUP BY estado, municipio");
						$domgeoArr = array();
						for($d = 0; $d < count($sucsDomgeo); $d++){
							array_push($domgeoArr, $sucsDomgeo[$d]['estado'] . ":" . $sucsDomgeo[$d]['municipio']);
						}

						// LLAMAMOS A DOMGEO
						require_once('Domgeo.php');
						$Geo = new Domgeo();

						sort($domgeoArr);

						$estArr = array();
						$estArrTxt = array();
						$munArr = array();
						for($e = 0; $e < count($domgeoArr); $e++){
							array_push($estArr, explode(':', $domgeoArr[$e])[0]);
							$edo = $Geo->getEdo(explode(':', $domgeoArr[$e])[0]);
							array_push($estArrTxt, $edo[0]['nombent']);
							array_push($munArr, explode(':', $domgeoArr[$e])[1]);
						}

						$domgeoAux = array();
						for($a = 0; $a < count($estArr); $a++){
							$mun = $Geo->getMun($estArr[$a], $munArr[$a]);
							if(!in_array($estArr[$a], $domgeoAux)){
								$domgeoData[$estArrTxt[$a].'-'.$estArr[$a]] = array();
								array_push($domgeoData[$estArrTxt[$a].'-'.$estArr[$a]], $mun[0]['nomMpo'].'-'.$munArr[$a]);
								array_push($domgeoAux, $estArr[$a]);
							}else{
								array_push($domgeoData[$estArrTxt[$a].'-'.$estArr[$a]], $mun[0]['nomMpo'].'-'.$munArr[$a]);
							}
						}
						$clienteData["DOMGEO"] = $domgeoData;

						// INGRESAMOS EL VALOR SI ES USER O ADMIN
						if(isset($_SESSION['iduser']) && isset($_SESSION['roluser']) && isset($_SESSION['name'])){
							$clienteData["LOGIN"] = "ADMIN";
						}else{
							$clienteData["LOGIN"] = "CLIENTE";
						}

						// VERIFICAMOS SI EL LINK TIENE COMO STATUS 2
						$clienteData["EditVals"] = array();
						if(intval($trabN1Data[0]["status"]) === 4 || intval($trabN1Data[0]["status"]) === 5){
							$clienteData["status"] = "PROVEEDOR";
						}else if(intval($trabN1Data[0]["status"]) > 5){
							$clienteData["status"] = "COMPLETADO";
						}else if(intval($trabN1Data[0]["status"]) === 3 && isset($_SESSION['iduser']) && isset($_SESSION['roluser']) && isset($_SESSION['name'])){
							$clienteData["status"] = "EDITANDO";
						}else if((intval($trabN1Data[0]["status"]) === 3 && !isset($_SESSION['iduser']) && !isset($_SESSION['roluser']) && !isset($_SESSION['name'])) || (intval($verifStatus[0]["status"]) === 2 && isset($_SESSION['iduser']) && isset($_SESSION['roluser']) && isset($_SESSION['name']))){
							$idTrab = $clienteData["idtrabajo"];
							$editData = $this->query_assoc("SELECT C.cantTienda, CD.*, P.nombre AS nompolig FROM config_trabajo C JOIN config_trabajo_detalle CD ON CD.idconfig = C.id AND CD.sucursal = {$info['suc']} JOIN zonaspoligonos P ON P.id = CD.poligono WHERE C.idtrabajo = $idTrab");
							array_push($clienteData["EditVals"], $editData);
						}else if(intval($trabN1Data[0]["status"]) === 2 && !isset($_SESSION['iduser']) && !isset($_SESSION['roluser']) && !isset($_SESSION['name'])){
							$clienteData["status"] = "ENREVISION";
						}

						return $clienteData;
					}else{
						return "ERRSUCURSAL";
					}
				}else{
					$clienteData["status"] = "CADUCADO";
				}
				return $clienteData;
			}else{
				return false;
			}
		}

		public function todosPolig($info){
			return $info;
		}

		public function traerPoligEdo($info){
			$poligsEdo = $this->query_assoc("SELECT idpoligono FROM sucursales_poligonos WHERE idsucursal = {$info['suc']} AND estado = {$info['edo']}");
			$poligs = "";
			for($p = 0; $p < count($poligsEdo); $p++){
				$poligs .= $poligsEdo[$p]['idpoligono'].',';
			}
			$poligs = substr($poligs, 0, strlen($poligs)-1);
			$poligsData = $this->query_assoc("SELECT P.id, P.coords, P.nombre, Z.nombre AS nomtxt, P.observaciones, P.numvolantes, P.hrsperifoneo, P.atributos, P.fecha_registro 
									FROM poligono_zonas P JOIN vwZonasPoligonos Z
									ON Z.id = P.id WHERE P.id IN ($poligs)");
			return $poligsData;
		}

		public function traerPoligMun($info){
			$poligsMun = $this->query_assoc("SELECT idpoligono FROM sucursales_poligonos WHERE idsucursal = {$info['suc']} AND estado = {$info['edo']} AND municipio = {$info['mun']}");
			$poligs = "";
			for($p = 0; $p < count($poligsMun); $p++){
				$poligs .= $poligsMun[$p]['idpoligono'].',';
			}
			$poligs = substr($poligs, 0, strlen($poligs)-1);
			$poligsData = $this->query_assoc("SELECT P.id, P.coords, P.nombre, Z.nombre AS nomtxt, P.observaciones, P.numvolantes, P.hrsperifoneo, P.atributos, P.fecha_registro 
									FROM poligono_zonas P JOIN vwZonasPoligonos Z
									ON Z.id = P.id WHERE P.id IN ($poligs)");
			return $poligsData;
		}

		public function traerPolig($info){
			$polig = $this->query_assoc("SELECT P.*, Z.nombre AS nomtxt FROM poligono_zonas P JOIN zonaspoligonos Z ON Z.id = $info WHERE P.id = $info");
			return $polig;
		}

		public function traerZona($info){
			$zona = $this->query_assoc("SELECT P.*, Z.nombre AS nomtxt FROM sucursales_poligonos S JOIN poligono_zonas P ON P.id = S.idpoligono JOIN zonaspoligonos Z ON Z.id = P.id WHERE S.idsucursal = $info");
			return $zona;
		}

		public function traerPoligZona($info){
			$zona = $this->query_assoc("SELECT P.*, Z.nombre AS nomtxt FROM poligono_zonas P JOIN zonaspoligonos Z ON Z.id = $info WHERE P.id = $info");
			return $zona;
		}

		public function guardarConfig($info){
			$mail = $info["mail"];
			$trabajo = $info["trabajo"];
			$cliente = $info["cliente"];
			$cant = $info["cant"];
			$cantTienda = $info["cantTienda"];
			$vigencia = $info["vigencia"];
			$tipo = $info["tipo"];
			$sucursal = $info["sucursal"];

			$secciones = $info["poligs"];
			$seccionesInsert = "";

			$status = 2;
			$usuario;
			if(isset($_SESSION['iduser']) && isset($_SESSION['roluser']) && isset($_SESSION['name'])){
				//$status = 3;
				$usuario = "ADMIN";
			}else{
				//$status = 2;
				$usuario = "CLIENTE";
			}

			foreach ($secciones as $key => $value) {
				$poligInfo = $this->query_assoc("SELECT estado, municipio FROM sucursales_poligonos WHERE idpoligono = {$value['idpolig']}");
				$seccionesInsert .= "($, \'$sucursal\', \'{$value['idpolig']}\', \'{$value['cant']}\', \'{$poligInfo[0]['estado']}\', \'{$poligInfo[0]['municipio']}\'),";
			}
			$seccionesInsert = substr($seccionesInsert, 0, strlen($seccionesInsert)-1);

			$confTrabajo = "CALL SP_CONFIGTRABAJO(
				$mail, '$trabajo', '$sucursal', '$cliente', '$cant', '$cantTienda', '$vigencia','$tipo', '$seccionesInsert', '$status'
			)";

			if($this->query($confTrabajo)){
				if($usuario === 'CLIENTE'){
					if($this->query("CALL SP_STATUSUCURSAL('$trabajo','$sucursal', '2')")){
						$conteoSucsTrab = $this->query_assoc("SELECT COUNT(*) AS conteo, SUM(status) AS suma FROM trabajos_sucursales WHERE idtrabajo = $trabajo");
						if(intval($conteoSucsTrab[0]['conteo']) != intval($conteoSucsTrab[0]['suma'])){
							$valueStatus = intval($conteoSucsTrab[0]['suma']) / intval($conteoSucsTrab[0]['conteo']);
							if(intval($valueStatus) === 2){
								$this->query("CALL SP_ACTUALIZARPENDIENTETRABAJO('correoclientes', '$trabajo', 'ACTIVAR')");
								$this->query("CALL SP_STATUSTRABAJO('$trabajo','7')");
								$this->query("CALL SP_MAILSTATUS('$mail', '2')");
							}
						}
					}
					
					$correoHeraldos = json_decode(file_get_contents("../params/mailAdminJSON.json"), true)["MailAdmin"];

					$msg = '<!DOCTYPE html>'.
							'<html>'.
							'<head>'.
								'<title>.: - Mail-Format -:.</title>'.
							'</head>'.
							'<body>'.
								'<div style="width: 450px;">'.
									'<div style="background:#fff; border:1px solid #ddd; box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2); margin: 15px 0; overflow:hidden;border-radius:7px;border-color: #428bca;">'.
										'<div style="border-color: transparent #428bca transparent transparent;border-color: rgba(255,255,255,0) #428bca rgba(255,255,255,0) rgba(255,255,255,0);">'.
										'</div>'.
										'<div style="padding:0 20px 10px;">'.
											'<h3 style="font: 21px Helvetica Neue,Helvetica,Arial,sans-serif;">Apreciable Administrador:</h3>'.
											'<p style="font: 15px Helvetica Neue,Helvetica,Arial,sans-serif;">*CUERPO*</p>'.
										'</div>'.
									'</div>'.
								'</div>'.
							'</body>'.
							'</html>';
					
					$cuerpo = "Se le informa que el trabajo N° ".$trabajo." de <b>Volanteo</b> asignado al cliente ".$cliente.", para la sucursal <b>".$this->query_assoc("SELECT nombre FROM sucursales WHERE idsucursal = $sucursal")[0]["nombre"]."</b> ha sido configurado exitosamente. Puede revisarlo desde su plataforma Administrativa.";
					$msg = str_replace("*CUERPO*" ,$cuerpo , $msg);
					
					$mail = $this->enviarMail($correoHeraldos, "Notificacion - Grupo Heraldos", $msg, "Trabajo N° ".$trabajo." Configurado", "");
					//mail($correoHeraldos, "Trabajo N° $trabajo Configurado - Grupo Heraldos", utf8_decode($msg), "Content-type: text/html; charset=iso-8859-1\r\nFrom: Grupo Publicitario Heraldos <contacto@grupoheraldos.com.mx>");
				}else if($usuario === "ADMIN"){
					if($this->query("CALL SP_STATUSUCURSAL('$trabajo','$sucursal', '4')")){
						$conteoSucsTrab = $this->query_assoc("SELECT COUNT(*) AS conteo, SUM(status) AS suma FROM trabajos_sucursales WHERE idtrabajo = $trabajo");
						if(intval($conteoSucsTrab[0]['conteo']) != intval($conteoSucsTrab[0]['suma'])){
							$valueStatus = intval($conteoSucsTrab[0]['suma']) / intval($conteoSucsTrab[0]['conteo']);
							if(intval($valueStatus) === 4){
								$this->query("CALL SP_ACTUALIZARPENDIENTETRABAJO('verifpropuesta', '$trabajo', 'ACTIVAR')");
								$this->query("CALL SP_STATUSTRABAJO('$trabajo','8')");
								$this->query("CALL SP_MAILSTATUS('$mail', '3')");
							}
						}
					}
				}
				return $usuario;
			}else{
				return false;
			}
		}

		public function restConfig($info){
			$restConfigTrab = "CALL SP_RESTCONFIGTRABAJO($info)";
			if($this->query($restConfigTrab))
				return true;
			else
				return false;
		}

		public function edicionMailCliente($info){
			$id = $info["cliente"];
			if($this->query("CALL SP_EDITCLIENTEMAILSTATUS('$id')")){
				$idMail = $this->query_assoc("SELECT M.id, M.url, C.nombre, C.ctacorreo, M.status
												FROM adminmail M join clientes C ON C.idcliente = M.idcliente 
													WHERE M.idtrabajo = $id AND M.status > 1");
				// PREPARANDO MAIL
				if(intval($idMail[0]["status"]) === 4){
					return "PROVEEDOR";
				}else if(intval($idMail[0]["status"]) === 5){
					return "COMPLETO";
				}else{
					if(intval($idMail[0]["status"]) === 2){
						$idMailEditar = $idMail[0]["id"];
						$editarMail = $this->query("CALL SP_CAMBIARSTATUS('$idMailEditar', 'CLIENTE')");
					}

					$msg = $info["contenido"];
					$msg = str_replace("*CLIENTE*",$idMail[0]["nombre"],$msg);
					$msg = str_replace("*IDMAIL*",$idMail[0]["id"],$msg);
					$msg = str_replace("*URL*",$idMail[0]["url"],$msg);

					$this->query("CALL SP_STATUSTRABAJO('$id','6')");
					
					$mail = $this->enviarMail($idMail[0]["ctacorreo"], $idMail[0]["nombre"], $msg, "Editar Trabajo", "");
					return "EXITO";
				}
			}else{
				return "ERROR";
			}
		}

		// *************************** NUEVAS FUNCIONES ************************
		// :::::::::::::::::::::::::: [ 11/18/2017 ] :::::::::::::::::::::::::::
		public function consultarMailPerif($info){
			$respuesta;
			$mailData = $this->query_assoc("SELECT * FROM adminmail WHERE id= {$info['id']} AND url = '{$info["url"]}'");
			if(count($mailData) > 0){
				if(intval($mailData[0]["status"]) > 0){
					$trabSucStatus = intval($this->query_assoc("SELECT status FROM trabajos_sucursales WHERE idtrabajo = {$mailData[0]['idtrabajo']} AND idsucursal = {$info['suc']}")[0]["status"]);
					if(isset($_SESSION['iduser']) && isset($_SESSION['roluser']) && isset($_SESSION['name'])){
						$respuesta["LOGIN"] = "ADMIN";
						if($trabSucStatus === 6){
							$respuesta["status"] = "COMPLETADO";
						}else{
							$respuesta["status"] = "VIGENTE";
						}
					}else{
						$respuesta["LOGIN"] = "CLIENTE";
						if($trabSucStatus === 2){
							$respuesta["status"] = "ENREVISION";
						}else if($trabSucStatus === 6){
							$respuesta["status"] = "COMPLETADO";
						}else{
							$respuesta["status"] = "VIGENTE";
						}
					}
					// LLENADO DEL JSON CON LA INFO DEL TRABAJO
					if($respuesta["status"] === "VIGENTE"){
						$respuesta["cliente"] = $this->query_assoc("SELECT T.*, S.nombre AS nomsucursal FROM trabajos T JOIN sucursales S ON S.idsucursal = {$info['suc']} WHERE T.idtrabajo = {$mailData[0]['idtrabajo']}");
						$respuesta["perifoneo"] = $this->query_assoc("SELECT *, TIME_FORMAT(inicio, '%k:%i') AS iniciohr, TIME_FORMAT(fin, '%k:%i') AS finhr FROM config_trabajo_perifoneo WHERE idtrabajo = {$mailData[0]['idtrabajo']} AND idsucursal = {$info['suc']}");
						$respuesta["sucursal"] = $this->query_assoc("SELECT * FROM trabajos_sucursales WHERE idtrabajo = {$mailData[0]['idtrabajo']} AND idsucursal = {$info['suc']}");

						$sucsDomgeo = $this->query_assoc("SELECT estado, municipio FROM sucursales_poligonos WHERE idsucursal = {$info['suc']} GROUP BY estado, municipio");
						$domgeoArr = array();
						for($d = 0; $d < count($sucsDomgeo); $d++){
							array_push($domgeoArr, $sucsDomgeo[$d]['estado'] . ":" . $sucsDomgeo[$d]['municipio']);
						}

						// LLAMAMOS A DOMGEO
						require_once('Domgeo.php');
						$Geo = new Domgeo();

						sort($domgeoArr);

						$estArr = array();
						$estArrTxt = array();
						$munArr = array();
						for($e = 0; $e < count($domgeoArr); $e++){
							array_push($estArr, explode(':', $domgeoArr[$e])[0]);
							$edo = $Geo->getEdo(explode(':', $domgeoArr[$e])[0]);
							array_push($estArrTxt, $edo[0]['nombent']);
							array_push($munArr, explode(':', $domgeoArr[$e])[1]);
						}

						$domgeoAux = array();
						for($a = 0; $a < count($estArr); $a++){
							$mun = $Geo->getMun($estArr[$a], $munArr[$a]);
							if(!in_array($estArr[$a], $domgeoAux)){
								$domgeoData[$estArrTxt[$a].'-'.$estArr[$a]] = array();
								array_push($domgeoData[$estArrTxt[$a].'-'.$estArr[$a]], $mun[0]['nomMpo'].'-'.$munArr[$a]);
								array_push($domgeoAux, $estArr[$a]);
							}else{
								array_push($domgeoData[$estArrTxt[$a].'-'.$estArr[$a]], $mun[0]['nomMpo'].'-'.$munArr[$a]);
							}
						}
						$respuesta["DOMGEO"] = $domgeoData;

						$editData = $this->query_assoc("SELECT CD.*, TIME_FORMAT(CP.inicio, '%k:%i') AS iniconfig, TIME_FORMAT(CP.fin, '%k:%i') AS finconfig, CP.inicio AS iniconfigalta, CP.fin AS finconfigalta, Z1.nombre AS nompolig, Z2.hrsperifoneo FROM config_trabajo_detalle CD JOIN config_trabajo_detalle_perifoneo CP ON CP.idconfig = CD.id JOIN zonaspoligonos Z1 ON Z1.id = CD.poligono JOIN poligono_zonas Z2 ON Z2.id = CD.poligono WHERE CD.idconfig IN (SELECT C.id FROM config_trabajo_perifoneo C WHERE C.idtrabajo = {$mailData[0]['idtrabajo']} AND idsucursal = {$info['suc']})");
						$respuesta["EditVals"] = array();
						if(count($editData) > 0)
							array_push($respuesta["EditVals"], $editData);
					}
				}else{
					$respuesta["status"] = "CADUCADO";
				}

				return $respuesta;
			}else{
				return false;
			}	
		}

		public function guardarConfigPerif($info){
			$respuesta = true;
			$poligonos = $info["poligonos"];

			for($p = 0; $p < count($poligonos); $p++){
				$poligInfo = $this->query_assoc("SELECT estado, municipio FROM sucursales_poligonos WHERE idpoligono = {$poligonos[$p]['idpolig']}");
				if($this->query("INSERT INTO config_trabajo_detalle (idconfig, sucursal, poligono, cantidad, estado, municipio) VALUES ('{$poligonos[$p]['idLista']}', '{$info['idSuc']}', '{$poligonos[$p]['idpolig']}', '{$poligonos[$p]['cant']}', '{$poligInfo[0]['estado']}', '{$poligInfo[0]['municipio']}')")){
					$lastID = $this->query_assoc("SELECT MAX(id) AS id FROM config_trabajo_detalle")[0]["id"];
					if(!$this->query("INSERT INTO config_trabajo_detalle_perifoneo (idconfig, inicio, fin) VALUES ('$lastID', '{$poligonos[$p]['hrinialta']}', '{$poligonos[$p]['hrfinalta']}')"))
						$respuesta = "ERROR1";
				}else{
					$respuesta = "ERROR2";
				}
			}
			
			$provsIDS = explode(",", $this->query_assoc("SELECT proveedores FROM trabajos_sucursales WHERE idtrabajo = {$info['idTrab']} AND idsucursal = {$info['idSuc']}")[0]["proveedores"]);
			$statusTS = 0;
			if($info["user"] === "ADMIN"){
				for($p = 0; $p < count($provsIDS); $p++){
					$fechas = $this->query_assoc("SELECT MIN(inicio) AS inicio, MAX(fin) AS fin FROM config_trabajo_perifoneo WHERE idtrabajo = {$info['idTrab']} AND idsucursal = {$info['idSuc']}");
					$munsCants = explode(",", $this->query_assoc("SELECT TZ.municipios FROM trabajos_nivel2 TN JOIN trabajos_zonas_detalles TZ ON TZ.idZonaTrabajo = TN.id AND TZ.idProveedor = '{$provsIDS[$p]}' WHERE TN.fk_idTrabajo = {$info['idTrab']}")[0]["municipios"]);
					$cant = 0;
					for($c = 0; $c < count($munsCants); $c++){
						if(intval($info["idSuc"]) === intval(explode(":", $munsCants[$c])[0])){
							$cant = explode(":", $munsCants[$c])[1];
						}
					}
					$inicio = explode(" ", $fechas[0]['inicio'])[0];
					$fin = explode(" ", $fechas[0]['fin'])[0];
					if(!$this->query("INSERT INTO config_trabajo_proveedor (idsucursal, idtrabajo, cantidad, idproveedor, inicio, fin, status) VALUES ('{$info['idSuc']}', '{$info['idTrab']}', '$cant', '{$provsIDS[$p]}', '$inicio', '$fin', '2')"))
						$respuesta = "ERROR3";
				}
				$status = 6;
			}else if($info["user"] === "CLIENTE"){
				$status = 2;

				$correoHeraldos = json_decode(file_get_contents("../params/mailAdminJSON.json"), true)["MailAdmin"];
				$msg = '<!DOCTYPE html>'.
							'<html>'.
							'<head>'.
								'<title>.: - Mail-Format -:.</title>'.
							'</head>'.
							'<body>'.
								'<div style="width: 450px;">'.
									'<div style="background:#fff; border:1px solid #ddd; box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2); margin: 15px 0; overflow:hidden;border-radius:7px;border-color: #428bca;">'.
										'<div style="border-color: transparent #428bca transparent transparent;border-color: rgba(255,255,255,0) #428bca rgba(255,255,255,0) rgba(255,255,255,0);">'.
										'</div>'.
										'<div style="padding:0 20px 10px;">'.
											'<h3 style="font: 21px Helvetica Neue,Helvetica,Arial,sans-serif;">Apreciable Administrador:</h3>'.
											'<p style="font: 15px Helvetica Neue,Helvetica,Arial,sans-serif;">*CUERPO*</p>'.
										'</div>'.
									'</div>'.
								'</div>'.
							'</body>'.
							'</html>';
					
				$cuerpo = "Se le informa que el trabajo N° ".$info['idTrab']." de <b>Perifoneo</b> asignado al cliente ".$this->query_assoc("SELECT C.nombre FROM trabajos T JOIN clientes C ON C.idcliente = T.idcliente WHERE T.idtrabajo = {$info['idTrab']}")[0]["nombre"].", para la sucursal <b>".$this->query_assoc("SELECT nombre FROM sucursales WHERE idsucursal = {$info['idSuc']}")[0]["nombre"]."</b> ha sido configurado exitosamente. Puede revisarlo desde su plataforma Administrativa.";
				$msg = str_replace("*CUERPO*" ,$cuerpo , $msg);
					
				$mail = $this->enviarMail($correoHeraldos, "Notificacion - Grupo Heraldos", $msg, "Trabajo N° ".$info['idTrab']." Configurado", "");
			}

			if(!$this->query("UPDATE trabajos_sucursales SET status = '$status' WHERE idtrabajo = {$info['idTrab']} AND idsucursal = {$info['idSuc']}"))
				$respuesta = "ERROR4";

			return $respuesta;
		}

		public function restaurarConfigPerif($info){
			$respuesta = "";
			//echo "DELETE FROM config_trabajo_detalle WHERE idconfig IN ('{$info['ctdDELETE']}') AND idsucursal = {$info['idSuc']}";exit();
			if($this->query("DELETE FROM config_trabajo_detalle_perifoneo WHERE idconfig IN (SELECT id FROM config_trabajo_detalle WHERE idconfig IN ({$info['ctdDELETE']}))"))
				if($this->query("DELETE FROM config_trabajo_detalle WHERE idconfig IN ({$info['ctdDELETE']}) AND sucursal = {$info['idSuc']}"))
					if($this->query("DELETE FROM config_trabajo_proveedor WHERE idtrabajo IN ('{$info['idTrab']}') AND idsucursal = {$info['idSuc']}"))
						$respuesta = true;
					else
						$respuesta = 3;
				else
					$respuesta = 2;			
			else
				$respuesta = 1;

			return $respuesta;
		}

		
	}

?>
<?php  
	
	require('Mysql.php');

	Class Formcliente extends Mysql{

		public function traerData($info){
			$id = $info['id'];
			$tipo = $info['tipo'];
			$campo = $info['campo'];
			$dataUser = $this->query_assoc("SELECT * FROM ".$tipo." WHERE ".$campo." = ".$id);
			return $dataUser;
		}

		public function clientesTrabs($info){
			$traerTrabajos = $this->query_assoc("SELECT T.*, B.nombre FROM trabajos T JOIN trabajos_nivel2 T2 ON T2.fk_idTrabajo = T.idtrabajo JOIN bloques B ON B.idbloque = T2.idEdo WHERE T.idcliente = $info ORDER BY FIELD(T.status,6,12) DESC");
			return $traerTrabajos;
		}

		public function clientesBloques($info){
			$traerTrabajos = $this->query_assoc("SELECT T.* FROM trabajos T JOIN trabajos_nivel2 TN ON TN.idEdo = $info WHERE T.idtrabajo = TN.fk_idTrabajo ORDER BY FIELD(T.status,6,12) DESC");
			return $traerTrabajos;
		}

		public function clientesSucursales($info){
			$sucursales = $this->query_assoc("SELECT TS.*, T.alias, T.tipo, T.vigencia FROM trabajos_sucursales TS JOIN trabajos T ON T.idtrabajo = TS.idtrabajo WHERE TS.idsucursal = $info");
			return $sucursales;
		}

		public function sucursalesCliente($info){
			$sucursales = $this->query_assoc("SELECT T.*, S.nombre, P.vigencia, P.tipo FROM trabajos_sucursales T JOIN sucursales S ON S.idsucursal = T.idsucursal JOIN trabajos P ON P.idtrabajo = $info WHERE T.idtrabajo = $info");
			return $sucursales;
		}

		public function configurarTrab($info){
			$traerMail = $this->query_assoc("SELECT * FROM adminmail WHERE idtrabajo = {$info['trab']} AND status >= 1"); //  OR status = 3  <- SE QUITO ESTA LINEA
			return $traerMail;
		}

		public function detallesTrab($info){
			$principal = $this->query_assoc("SELECT T.idtrabajo ,S.nombre, S.encargado, C.cantTienda, C.id AS idconfig, TS.cantidad, TS.proveedores, T.alias, T.tipo, T.vigencia FROM trabajos_sucursales TS JOIN trabajos T ON T.idtrabajo = {$info['trab']} JOIN sucursales S ON S.idsucursal = {$info['suc']} JOIN config_trabajo C ON C.idtrabajo = {$info['trab']} AND C.sucursal = {$info['suc']} WHERE TS.idtrabajo = {$info['trab']} AND TS.idsucursal = {$info['suc']}");
			if(count($principal) > 0){
				$detalles = $this->query_assoc("SELECT * FROM config_trabajo_detalle WHERE idconfig = {$principal[0]['idconfig']}");
				$horarios = $this->query_assoc("SELECT * FROM config_trabajo_proveedor WHERE idsucursal = {$info['suc']} AND idtrabajo = {$info['trab']}");

				require_once('Domgeo.php');
				for($i = 0; $i < count($detalles); $i++){
					$Geo[$i] = new Domgeo();

					$poligono = $this->query_assoc("SELECT nombre FROM zonaspoligonos WHERE id = {$detalles[$i]['poligono']} AND sucursal = {$info['suc']}");

					$edo = $Geo[$i]->getEdo($detalles[$i]['estado']);
					$mun = $Geo[$i]->getMun($detalles[$i]['estado'], $detalles[$i]['municipio']);

					$detalles[$i]["Estado"] = $edo[0]["nombent"];
					$detalles[$i]["Municipio"] = $mun[0]["nomMpo"];
					$detalles[$i]["Localidad"] = $poligono[0]["nombre"];

					$nomProveedores = "";
					$nomProv = $this->query_assoc("SELECT P.nombre FROM trabajos_zonas_detalles TD JOIN trabajos_nivel2 T ON T.fk_idTrabajo = {$info['trab']} JOIN proveedores P ON P.idproveedor = TD.idProveedor JOIN vwZonas Z ON Z.idEdo = {$detalles[$i]['estado']} AND Z.mun = {$detalles[$i]['municipio']} AND Z.idProveedor = TD.idProveedor WHERE TD.municipios RLIKE '[[:<:]]{$info['suc']}[[:>:]]' AND TD.idZonaTrabajo = T.id");
					for($p = 0; $p < count($nomProv); $p++){
						if($p > 0){ $nomProveedores .= '<br>'; }
						$nomProveedores .= $nomProv[$p]["nombre"];
					}
					$detalles[$i]["NomProvs"] = $nomProveedores;
				}

				for($h = 0; $h < count($horarios); $h++){
					$nomProv = $this->query_assoc("SELECT nombre FROM proveedores WHERE idproveedor = ".$horarios[$h]["idproveedor"]);
					$horarios[$h]["NomProv"] = $nomProv[0]["nombre"];
				}

				$rolesData["cliente"] = $principal;
				$rolesData["detalles"] = $detalles;
				$rolesData["horarios"] = $horarios;
				return $rolesData;
			}else{
				return "SINCONFIGURAR";
			}
		}

		public function getEstadistica($info){
			return $this->query_assoc("SELECT A.*,P.nombre FROM app_sucursales A JOIN proveedores P ON P.idproveedor = A.proveedor WHERE idservicio = {$info['serv']} AND idsucursal = {$info['suc']}");
		}

		// :::::::::: LOGIN DE PROVEEDORES ::::::::::::::::::::
		// ***************************************************
		public function provsTrabs($info){
			return $this->query_assoc("SELECT T.*, B.nombre FROM trabajos_zonas_detalles TD JOIN trabajos T ON T.idtrabajo = (SELECT fk_idTrabajo FROM trabajos_nivel2 WHERE id = TD.idZonaTrabajo) JOIN bloques B ON B.idbloque = (SELECT idEdo FROM trabajos_nivel2 WHERE id = TD.idZonaTrabajo) WHERE TD.idProveedor = $info ORDER BY FIELD(T.status,4,5) DESC");
		}

		public function sucursalesProv($info){
			return $this->query_assoc("SELECT T.*, S.nombre, P.vigencia, P.tipo, C.cantidad AS cantprov FROM trabajos_sucursales T JOIN sucursales S ON S.idsucursal = T.idsucursal JOIN trabajos P ON P.idtrabajo = {$info['trab']} JOIN config_trabajo_proveedor C ON C.idtrabajo = {$info['trab']} AND C.idproveedor = {$info['idprov']} WHERE T.idsucursal = C.idsucursal AND T.idtrabajo = {$info['trab']} AND T.proveedores RLIKE '[[:<:]]{$info['idprov']}[[:>:]]'");
		}

		public function configFecha($info){
			return $this->query_assoc("SELECT CT.inicio, CT.fin, T.periodoini, T.periodofin, T.idtrabajo, S.nombre FROM config_trabajo_proveedor CT JOIN trabajos T ON T.idtrabajo = {$info['trab']} JOIN sucursales S ON S.idsucursal = CT.idsucursal WHERE CT.idtrabajo = {$info['trab']} AND CT.idsucursal = {$info['suc']} AND CT.idproveedor = {$info['prov']}");
		}

		public function altaPropuestaProv($info){
			$actualizarProv = "CALL SP_ACTCONFIGTRABPROVS('{$info['trab']}', '{$info['suc']}', '{$info['prov']}', '{$info['ini']}', '{$info['fin']}')";
			if($this->query($actualizarProv)){
				$countProvSucs = $this->query_assoc("SELECT proveedores FROM trabajos_sucursales WHERE idtrabajo = {$info['trab']} AND idsucursal = {$info['suc']}");
				$trabSucs = count(explode(',', $countProvSucs[0]['proveedores']));
				$countConfTrabs = $this->query_assoc("SELECT COUNT(*) AS suma FROM config_trabajo_proveedor C WHERE C.idsucursal = {$info['suc']} AND C.idtrabajo = {$info['trab']} AND C.inicio <> '1111-11-11' AND C.fin <> '1111-11-11'");
				
				if(intval($trabSucs) === intval($countConfTrabs[0]['suma'])){
					if($this->query("CALL SP_STATUSUCURSAL('{$info['trab']}','{$info['suc']}', '5')")){
						$conteoSucsTrab = $this->query_assoc("SELECT COUNT(*) AS conteo, SUM(status) AS suma FROM trabajos_sucursales WHERE idtrabajo = {$info['trab']}");
						if(intval($conteoSucsTrab[0]['conteo']) != intval($conteoSucsTrab[0]['suma'])){
							$valueStatus = intval($conteoSucsTrab[0]['suma']) / intval($conteoSucsTrab[0]['conteo']);
							if(intval($valueStatus) === 5){
								$mail = $this->query_assoc("SELECT id FROM adminmail WHERE idtrabajo = {$info['trab']} AND status > 1");
								$cambiarStatus = $this->query("CALL SP_CAMBIARSTATUS('{$mail[0]['id']}', 'COMPLETAR')");
								$statusTrabajo = $this->query("CALL SP_STATUSTRABAJO('{$info['trab']}','10')");
								$this->query("CALL SP_ACTUALIZARPENDIENTETRABAJO('proptrabajoprovs', '{$info['trab']}', 'ACTIVAR')");
							}
						}
					}
				}
				return "EXITO";
			}else{
				return "ERRORACT";
			}
		}

		public function zonasPoligonos($info){
			return $this->query_assoc("SELECT P.*, Z.nombre AS nomtxt, SP.cantidad FROM config_trabajo_detalle SP JOIN poligono_zonas P ON P.id = SP.poligono JOIN zonaspoligonos Z ON Z.id = P.nombre WHERE SP.sucursal = $info");
		}

		// FUNCIONES DE SEGUMIENTO
		public function lvl1($info){
			//vwTrabajosLvl1 <--- SERVIDOR
			$idTrab = $this->query_assoc("SELECT idtrabajo FROM trabajos WHERE idcliente = $info");
			$idTrabs = "";
			for($i = 0; $i < count($idTrab); $i++){
				if($i > 0)
					$idTrabs .= ",";
				$idTrabs .= $idTrab[$i]['idtrabajo'];
			}

			$consult = "SELECT G.id, G.id_service, V.nombre, V.periodoini, V.periodofin 
						FROM geolocation G 
						JOIN vwTrabajosLvl1 V ON G.id_service = V.idtrabajo WHERE G.id_service IN ($idTrabs)
						GROUP BY id_service";
			return $this->query_assoc($consult);
		}

		public function lvl2($id){
			$consult = "SELECT DISTINCT G.id_proveedor, P.nombre proveedor 
						FROM geolocation G 
						JOIN proveedores P ON G.id_proveedor = P.idproveedor 
						WHERE G.id_service = {$id['trab']} AND G.id_sucursal = {$id['suc']}";
			return $this->query_assoc($consult);
		}

		public function showLvl2_2($info){
			$consult = "SELECT id_device, id_service FROM geolocation WHERE id_proveedor = {$info['prov']} AND id_service = {$info['serv']} AND id_sucursal = {$info['suc']} GROUP BY id_device";
			return $this->query_assoc($consult);
		}

		public function lvl3($info){
			$id_device = $info['id_device'];
			$id_service = $info['id_service'];

			$consult = "SELECT id, latitud, longitud, date_time
						FROM geolocation 
						WHERE id_device = '$id_device'
						AND id_service = $id_service order by date_time";
			return $this->query_assoc($consult);
		}

		public function lvl3_todos($info){

			$id_service = $info['id_service'];
			$id_proveedor = $info['id_device'];

			$consult = "SELECT id, latitud, longitud, date_time
						FROM geolocation 
						WHERE id_service = '$id_service'
						AND id_proveedor = $id_proveedor order by date_time";
			return $this->query_assoc($consult);
		}

		public function getProveedoresImages($id){

			// $consult = "SELECT DISTINCT(P.idproveedor),G.id_service, P.nombre proveedor, F.url
			// 			FROM geolocation G
			// 			JOIN proveedores P ON G.id_proveedor = P.idProveedor
			// 			JOIN fotos F ON F.id_service = G.id_service AND F.id_proveedor = P.idproveedor
			// 			WHERE G.id_service = $id GROUP BY P.idproveedor";
			 			
			$consult = "SELECT DISTINCT(F.url), G.id_service, P.idproveedor, P.nombre proveedor
						FROM geolocation G
						JOIN proveedores P ON G.id_proveedor = P.idProveedor
						JOIN fotos F ON F.id_service = G.id_service AND F.id_proveedor = P.idproveedor
						WHERE G.id_service = $id";
			return $this->query_assoc($consult);

		}


		public function getImg($info){

			$id_service   = $info['id_service'];
			$id_proveedor = $info['id_proveedor'];

			$consult = "SELECT url FROM fotos 
						WHERE id_service = $id_service 
						AND id_proveedor = $id_proveedor";
						// echo $consult;exit;

			return $this->query_assoc($consult);
		}

		// FUNCION DE REINICIO DE PASSWORD
		public function editPassword($info){
			if($info['antPass'] != md5($info['antPass2'])){
				return "ERRANTPASS";
			}else{
				if($this->query("CALL SP_UPDATEPASS('{$info['id']}', md5('{$info['newPass']}'), '{$info['tipo']}')")){
					return "EXITO";
				}else{
					return "ERRORINESPERADO";
				}
			}
		}

	}

?>
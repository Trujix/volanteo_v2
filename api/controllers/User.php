<?php  

	require_once("utilities/DBConnection.class.php");
	class User extends DBConnection{

		const SUCCESS = 1;
	    const MSG_SUCCESS = "success";

		const ACCESS_DENIED = 2;
	    const MSG_ACCESS_DENIED = "Acceso denegado";

	    const UNKNOW_ERROR = 3;
	    const MSG_UNKNOW_ERROR = "Internal Server error";

	    const ERROR_PARAMETROS = 4;
		const MSG_ERROR_PARAMETROS = "Error en la estructura de la peticion o en los parametros";

	    const AUTH = "C0s1T3c!2ol7$";
	    const CAMBIARSTATUS = "{c4m814r5747u5!}";
	    const MODIFICARZONA = "{m0d1f1c4Rz0n4}";

		public function post($info){

			if(Main::authorization()){
				$indicador = $_SERVER['HTTP_INDICADOR'];
				if(!isset($indicador)){
					$res = self::login();

					switch ($res['status']) {
						case 'success':
							$res['status'] = self::MSG_SUCCESS;
							return ["estado" => self::SUCCESS, "datos" => $res];
							break;
						case 'error':
							$res['status'] = self::MSG_ACCESS_DENIED;
							throw new ExceptionApi(self::ACCESS_DENIED, $res, 403);
							self::log($res);
							break;
						default:
							$res['status'] = self::MSG_UNKNOW_ERROR;
							throw new ExceptionApi(self::UNKNOW_ERROR, $res, 500);
							break;
					}
				}else{
					if($indicador === self::CAMBIARSTATUS){
						$param = self::cambiarStatus();
						if($param === "EXITO"){
							$indicadorzona = $_SERVER['HTTP_INDICADORZONA'];
							if($indicadorzona === self::MODIFICARZONA){
								$res = self::modificarZona();
								return $res;
							}else{
								return ["error" => "Indicador de seguridad"];
							}
						}else{
							return $param;
						}
					}else if($indicador === self::MODIFICARZONA){
						$res = self::modificarZona();
						return $res;
					}else{
						return ["error" => "Indicador de seguridad"];
					}
				}
		    }
		    else
		    	throw new ExceptionApi(self::ACCESS_DENIED, self::MSG_ACCESS_DENIED, 403);
		}

		private function login(){
			$body = $_POST['info'];
	        $info = json_decode($body);

	        if(self::validateStructure($info))
	        	return self::auth($info);
	        else
		    	throw new ExceptionApi(self::ERROR_PARAMETROS, self::MSG_ERROR_PARAMETROS, 422);
		}

		private function auth($info){
			$username = $info->username;
			$password = $info->password;
			$response = "success";

			$consult = "SELECT COUNT(idproveedor) count, idproveedor, nombre FROM proveedores 
						WHERE ctacorreo = '$username' AND pass = md5('$password')";
			$resultado = DBConnection::query_single_object($consult);

			if($resultado == NULL)
				$response = array("status" => "unknow_error");
		    else if($resultado->count == 0)
		    	$response = array("status" => "error");
		    else{
		    	//$trabajoslista = DBConnection::query_assoc("SELECT C.idtrabajo, T.alias, C.idproveedor, C.idsucursal, S.nombre FROM config_trabajo_proveedor C JOIN trabajos T ON T.idtrabajo = C.idtrabajo JOIN sucursales S ON S.idsucursal = C.idsucursal 
		    						//WHERE C.idproveedor RLIKE '[[:<:]]$resultado->idproveedor[[:>:]]' AND C.status > 1");

		    	//$idConfigs = DBConnection::query_assoc("SELECT idconfig FROM config_trabajo_proveedor WHERE idproveedor RLIKE '[[:<:]]$resultado->idproveedor[[:>:]]' AND status = 2 GROUP BY idconfig");
		    	
		    	$trabajoslista = DBConnection::query_assoc("SELECT C.idtrabajo, T.alias, C.idproveedor, P.nombre FROM config_trabajo_proveedor C JOIN trabajos T ON T.idtrabajo = C.idtrabajo JOIN proveedores P ON P.idproveedor = C.idproveedor 
		    						WHERE C.idproveedor RLIKE '[[:<:]]$resultado->idproveedor[[:>:]]' AND C.status > 1 GROUP BY C.idtrabajo");

		    	$servicios = array();
		    	$alias = array();
		    	$idsSucursales = array();
		    	$sucursales = array();
		    	$nomproveedor = "";
		    	for($i = 0; $i < count($trabajoslista); $i++){
		    		$nomproveedor = $trabajoslista[$i]["nombre"];
		    		array_push($servicios, intval($trabajoslista[$i]["idtrabajo"]));
		    		array_push($alias, $trabajoslista[$i]["alias"]);

		    		//array_push($idsScurusales, $trabajoslista[$i]["idsucursal"]);
		    		//array_push($sucursales, $trabajoslista[$i]["nombre"]);

		    		$sucursalesQuery = DBConnection::query_assoc("SELECT C.idsucursal, S.nombre FROM config_trabajo_proveedor C JOIN sucursales S ON S.idsucursal = C.idsucursal 
		    							WHERE C.idtrabajo = '{$trabajoslista[$i]['idtrabajo']}' AND C.idproveedor = '$resultado->idproveedor'");
		    		//$idSucs = array();
		    		//$txtSucs = array();
		    		$idsSucursales[$trabajoslista[$i]["idtrabajo"]] = array();
		    		$sucursales[$trabajoslista[$i]["idtrabajo"]] = array();
		    		
		    		for($s = 0; $s < count($sucursalesQuery); $s++){
		    			
		    			//array_push($idSucs, $sucursalesQuery[$s]["idsucursal"]);
		    			//array_push($txtSucs, $sucursalesQuery[$s]["nombre"]);
		    			
		    			array_push($idsSucursales[$trabajoslista[$i]["idtrabajo"]], $sucursalesQuery[$s]["idsucursal"]);
		    			array_push($sucursales[$trabajoslista[$i]["idtrabajo"]], $sucursalesQuery[$s]["nombre"]);
		    		}
		    		/*$idsSucursales[$trabajoslista[$i]["idtrabajo"]] = array();
		    		$sucursales[$trabajoslista[$i]["idtrabajo"]] = array();
		    		array_push($idsSucursales[$trabajoslista[$i]["idtrabajo"]], $idSucs);
		    		array_push($sucursales[$trabajoslista[$i]["idtrabajo"]], $txtSucs);*/
		    	}

		    	$response = array(
		    		"status" => "success",
		    		"idproveedor" => $resultado->idproveedor,
		    		"nomproveedor" => $resultado->nombre,
		    		"servicios" => $servicios,
		    		"alias" => $alias,
		    		"sucursalesids" => $idsSucursales,
		    		"sucursalestxt" => $sucursales
		    	);
		    }
		    return $response;
		}

		private function validateStructure($info){
			$response = FALSE;
			if ($info !== NULL && count($info) === 1 && 
				isset($info->username) && isset($info->password))
	    		$response = TRUE;

	    	return $response;

		}

		private function cambiarStatus(){
			$body = $_POST['info'];
			$info = json_decode($body);

			if ($info !== NULL && count($info) === 1 && isset($info->id_servicio) && isset($info->id_proveedor) && isset($info->id_sucursal) && isset($info->accion)){
	    		$idServicio = $info->id_servicio;
	    		$idProveedor = $info->id_proveedor;
	    		$idSucursal = $info->id_sucursal;
	    		$accion = $info->accion;

	    		$consult = DBConnection::query_single_object("SELECT COUNT(*) cuenta FROM config_trabajo_proveedor WHERE idtrabajo = $idServicio AND idproveedor = $idProveedor AND idsucursal = $idSucursal");
	    		if(intval($consult->cuenta) > 0){
	    			if($accion === "INICIAR"){
	    				if(DBConnection::query("UPDATE trabajos SET status = 12 WHERE idtrabajo = $idServicio")){
	    					$appzonas = DBConnection::query_assoc("SELECT * FROM app_sucursales WHERE idservicio = $info->id_servicio AND proveedor = $info->id_proveedor"); // AND idsucursal = $info->id_sucursal
	    					if(count($appzonas) < 1){
	    						$dataProveedor = DBConnection::query_assoc("SELECT C.*, S.nombre FROM config_trabajo_proveedor C JOIN sucursales S ON S.idsucursal = C.idsucursal WHERE C.idproveedor RLIKE '[[:<:]]$info->id_proveedor[[:>:]]' AND C.status = 2");
	    						for($y = 0; $y < count($dataProveedor); $y++){
	    							DBConnection::query("INSERT INTO app_sucursales (idservicio, proveedor, idsucursal, txtsucursal) VALUES ({$dataProveedor[$y]['idtrabajo']}, {$dataProveedor[$y]['idproveedor']}, {$dataProveedor[$y]['idsucursal']}, '{$dataProveedor[$y]['nombre']}')");
						    	}
	    					}

	    					return "EXITO";
	    				}else{
	    					return ["error Base de Datos" => "Error al actualizar trabajo"];
	    				}
	    			}else if($accion === "TERMINAR"){
	    				if(DBConnection::query("UPDATE config_trabajo_proveedor SET status = 0 WHERE idtrabajo = $idServicio AND idproveedor = $idProveedor AND idsucursal = $idSucursal")){
	    					return "EXITO";
	    				}else{
	    					return ["error Base de Datos" => "Error al actualizar trabajo"];
	    				}
	    			}else{
	    				return ["error" => "Parametro incorrecto - Accion: $accion"];
	    			}
	    		}else{
	    			return ["error" => "Datos no encontrados - idServicio: $idServicio, idProveedor: $idProveedor, idSucursal: $idSucursal"];
	    		}
			}else{
	    		throw new ExceptionApi(self::ERROR_PARAMETROS, self::MSG_ERROR_PARAMETROS, 422);
			}
		}

		private function modificarZona(){
			$body = $_POST['info'];
			$info = json_decode($body);

			if ($info !== NULL && count($info) === 1 && isset($info->id_servicio) && isset($info->id_proveedor) && isset($info->id_sucursal) && isset($info->accion)){
	    		if($info->accion === "INICIAR"){
	    			if(DBConnection::query("UPDATE app_sucursales SET status = 2 WHERE idservicio = $info->id_servicio AND proveedor = $info->id_proveedor AND idsucursal = $info->id_sucursal")){
	    				return "EXITO";
	    			}else{
	    				return ["error Base de Datos" => "Error al guardar trabajo"];
	    			}
	    		}else if($info->accion === "TERMINAR"){
	    			if(DBConnection::query("UPDATE app_sucursales SET status = 0 WHERE idservicio = $info->id_servicio AND proveedor = $info->id_proveedor AND idsucursal = $info->id_sucursal")){
	    				$sumaZonasProv = DBConnection::query_assoc("SELECT SUM(status) AS suma FROM app_sucursales WHERE idservicio = $info->id_servicio AND proveedor = $info->id_proveedor");
	    				if(intval($sumaZonasProv[0]['suma']) === 0){
	    					DBConnection::query("UPDATE config_trabajo_proveedor SET status = 0 WHERE idtrabajo = $info->id_servicio AND idproveedor = $info->id_proveedor");
	    				}
	    				return "EXITO";
	    			}else{
	    				return ["error Base de Datos" => "Error al actualizar trabajo"];
	    			}
	    		}else{
	    			return ["error" => "Parametro incorrecto - Accion: $info->accion"];
	    		}
			}else{
	    		throw new ExceptionApi(self::ERROR_PARAMETROS, self::MSG_ERROR_PARAMETROS, 422);
			}
		}

	}
	
?>
<?php  



	require_once("utilities/DBConnection.class.php");

	/**

	* 

	*/

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

		

		public function post($info){



			if(Main::authorization()){

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



		    }

		    else

		    	throw new ExceptionApi(self::ACCESS_DENIED, self::MSG_ACCESS_DENIED, 403);

		

		}



		private function login(){

			$body = $_POST['info'];



			// $body = file_get_contents('php://input');

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



			$consult = "SELECT COUNT(idproveedor) count, idproveedor FROM proveedores 

						WHERE ctacorreo = '$username' AND rfc = '$password'";



			$resultado = DBConnection::query_single_object($consult);



			if($resultado == NULL)

				$response = array("status" => "unknow_error");

		    else if($resultado->count == 0)

		    	$response = array("status" => "error");

		    else{
		    	$trabajoslista = DBConnection::query_assoc("SELECT C.idtrabajo, C.idproveedor, T.alias FROM config_trabajo_proveedor C JOIN trabajos T ON T.idtrabajo = C.idtrabajo 
		    												WHERE C.idproveedor RLIKE '[[:<:]]$resultado->idproveedor[[:>:]]'");
		    	$servicios = array();
		    	$alias = array();
		    	for($i = 0; $i < count($trabajoslista); $i++){
		    		//array_push($servicios, intval($trabajoslista[$i]["idtrabajo"]):$trabajoslista[$i]["alias"]);
		    		//$servicios[intval($trabajoslista[$i]["idtrabajo"])] = $trabajoslista[$i]["alias"];
		    		array_push($servicios, intval($trabajoslista[$i]["idtrabajo"]));
		    		array_push($alias, $trabajoslista[$i]["alias"]);
		    	}
		    	$response = array(
		    		"status" => "success",
		    		"idproveedor" => $resultado->idproveedor,
		    		"servicios" => $servicios,
		    		"alias" => $alias
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



	}



?>
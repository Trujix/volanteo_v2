<?php  

	require_once("utilities/DBConnection.class.php");
	/**
	* 
	*/
	class Configuracion extends DBConnection{

		const SUCCESS = 1;
	    const MSG_SUCCESS = "success";

		const ACCESS_DENIED = 2;
	    const MSG_ACCESS_DENIED = "Acceso denegado";

	    const UNKNOW_ERROR = 3;
	    const MSG_UNKNOW_ERROR = "Internal Server error";

	    const ERROR_PARAMETROS = 4;
		const MSG_ERROR_PARAMETROS = "Error en la estructura de los parametros";

		const ERROR = 5;
	    const MSG_ERROR = "error";

		const NOT_FOUND = 6;
	    const MSG_NOT_FOUND = "Servicio o tipo de alerta no encontrados";

		
		public function post($info){

			$action = (string)$info[1];

			if(Main::authorization()){
		    	if(self::$action())
		    		return ["estado" => self::SUCCESS, "datos" => self::MSG_SUCCESS];
		    	else
		    		throw new ExceptionApi(self::UNKNOW_ERROR, self::MSG_UNKNOW_ERROR, 500);
		    }
		    else
		    	throw new ExceptionApi(self::ACCESS_DENIED, self::MSG_ACCESS_DENIED, 403);
		
		}

		public static function get($info){

			$prov = $info[2];
			$serv = $info[3];

	    	if(Main::authorization())
	    		return self::read($prov, $serv);
			else
		    	throw new ExceptionApi(self::ACCESS_DENIED, self::MSG_ACCESS_DENIED, 403);

	    }


	    // =============  FUNCIONES PARA DEFINIR LA HORA DE DESAYUNO ====================

		private function desayuno(){
			
			$body = $_POST['info'];
	        $info = json_decode($body);
		        
	        if(self::validateStructure1($info))
	        	return self::setTime($info);
	        else
		    	throw new ExceptionApi(self::ERROR_PARAMETROS, self::MSG_ERROR_PARAMETROS, 422);

		}

		private function read($prov = NULL, $serv = NULL){

			if($prov == NULL && $serv == NULL)
				$consult = "SELECT hora1, hora2 FROM app_desayuno";
			else if($prov == NULL || $serv == NULL)
				throw new ExceptionApi(self::ERROR_PARAMETROS, self::MSG_ERROR_PARAMETROS, 422);
			else{
				$consult = "SELECT hora1, hora2 FROM app_desayuno 
							WHERE id_service = $serv AND id_proveedor = $prov";
			}

			// echo $consult;exit;

			if ($resultado = DBConnection::query_assoc($consult)) {
	        	http_response_code(200);
	            return [ "estado" => self::SUCCESS, "datos" => $resultado ];	
	        }
	        else
	        	throw new ExceptionApi(self::NOT_FOUND, self::MSG_NOT_FOUND, 200);

		}

		private function setTime($info){

			$proveedor = $info->id_proveedor;
			$service   = $info->id_service;
			$h1        = $info->h1;
			$h2        = $info->h2;

			$compara = "SELECT COUNT(id_proveedor) count FROM app_desayuno 
						WHERE id_proveedor = $proveedor AND id_service = $service";

			$count = DBConnection::query_single_object($compara);

			if($count->count == 0){
				$consult = "INSERT INTO app_desayuno (id_proveedor, id_service, hora1, hora2)
							VALUES ($proveedor, $service, '$h1', '$h2')";
			}
			else{
				$consult = "UPDATE app_desayuno SET hora1 = '$h1', hora2 = '$h2'
						WHERE id_proveedor = $proveedor AND id_service = $service";
			}

			return DBConnection::query($consult);
		
		}

		private function validateStructure1($info){

			$response = FALSE;
			if ($info !== NULL && count($info) === 1 && 
				isset($info->id_service) && isset($info->id_proveedor) && 
				isset($info->h1) && isset($info->h2))
	    		$response = TRUE;

	    	return $response;

		}

		// ============ FUNCIONES PARA DEFINIR UN NUEVO TOKEN ===========================

		private function token(){
			$body = $_POST['info'];
	        $info = json_decode($body);
		        
	        if(self::validateStructure2($info))
	        	return self::setToken($info);
	        else
		    	throw new ExceptionApi(self::ERROR_PARAMETROS, self::MSG_ERROR_PARAMETROS, 422);
		}

		private function setToken($info){

			$proveedor = $info->id_proveedor;
			$token     = $info->token;

			$compara = "SELECT COUNT(id) count FROM app_token
						WHERE id_proveedor = $proveedor";

			$count = DBConnection::query_single_object($compara);

			if($count->count == 0){
				$consult = "INSERT INTO app_token (id_proveedor, token_fcm) VALUES ($proveedor, '$token')";
			}
			else{
				$consult = "UPDATE app_token SET token_fcm = '$token' 
							WHERE id_proveedor = $proveedor";
			}

			return DBConnection::query($consult);
		
		}

		private function validateStructure2($info){

			$response = FALSE;
			if ($info !== NULL && count($info) === 1 && isset($info->id_proveedor) && 
				isset($info->token))
	    		$response = TRUE;

	    	return $response;

		}


		/*
			public static function put($info){

		        if(Main::authorization()){
			    	if(self::update())
			    		return ["estado" => self::SUCCESS, "datos" => self::MSG_SUCCESS];
			    	else
			    		throw new ExceptionApi(self::UNKNOW_ERROR, self::MSG_UNKNOW_ERROR, 500);
			    }
			    else
			    	throw new ExceptionApi(self::ACCESS_DENIED, self::MSG_ACCESS_DENIED, 403);

		    }

		    private function update(){

				parse_str(file_get_contents("php://input"),$post_vars);
				$body = $post_vars['info'];
		        $info = json_decode($body);

		        if(self::validateStructure($info))
		        	return self::updateTime($info);
		        else
			    	throw new ExceptionApi(self::ERROR_PARAMETROS, self::MSG_ERROR_PARAMETROS, 422);

			}

			private function updateTime($info){

				$proveedor = $info->id_proveedor;
				$service   = $info->id_service;
				$h1        = $info->h1;
				$h2        = $info->h2;

				$consult = "UPDATE app_desayuno SET hora1 = '$h1', hora2 = '$h2'
							WHERE id_proveedor = $proveedor AND id_service = $service";

				return DBConnection::query($consult);
			
			}
		*/

	}

?>
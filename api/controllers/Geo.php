<?php  

	require_once("utilities/DBConnection.class.php");

	/**
	* 
	*/
	class Geo extends DBConnection{

		const SUCCESS = 1;
	    const MSG_SUCCESS = "Success";

		const ACCESS_DENIED = 2;
	    const MSG_ACCESS_DENIED = "Acceso denegado";

	    const UNKNOW_ERROR = 3;
	    const MSG_UNKNOW_ERROR = "Internal Server error";

	    const ERROR_PARAMETROS = 4;
		const MSG_ERROR_PARAMETROS = "Error en la estructura de la peticion o en los parametros";
		const NOT_FOUND = 5;
	    const MSG_NOT_FOUND = "Id no encontrado";
		
		public function post($parametros){
			// $action = $parametros[1];

			if(Main::authorization()){
		    	if(self::create())
		    		return ["estado" => self::SUCCESS, "datos" => self::MSG_SUCCESS];
		    	else
		    		throw new ExceptionApi(self::UNKNOW_ERROR, self::MSG_UNKNOW_ERROR, 500);
		    }
		    else
		    	throw new ExceptionApi(self::ACCESS_DENIED, self::MSG_ACCESS_DENIED, 403);
		}

		public static function get($info){
			
	    	if(Main::authorization())
	    		return self::read($info[1]);
			else
		    	throw new ExceptionApi(self::ACCESS_DENIED, self::MSG_ACCESS_DENIED, 403);

	    }

		private function create(){

			$body = $_POST['info'];
	        $info = json_decode($body);
		        
	        if(self::validateStructure($info))
	        	return self::insert($info);
	        else
		    	throw new ExceptionApi(self::ERROR_PARAMETROS, self::MSG_ERROR_PARAMETROS, 422);

		}

		public function insert($info){
			// SE AGREGO EL CAMPO ID_SUCURSAL
			$consult = "INSERT INTO geolocation (
							id_device, id_service, id_sucursal, id_proveedor, latitud, longitud, date_time
						)
						VALUES ";


			for ($i = 0; $i < count($info); $i++){
				
				/*$values = "(";
				foreach ($info[$i] as $key => $value) {
					$values .= "'{$value}',";
				}
				$values = substr($values, 0, -1);
				$values .= "),";

				$consult .= $values;*/
				$values = "('".$info[$i]->id_device."','".$info[$i]->id_service."','".$info[$i]->id_sucursal."','".$info[$i]->id_proveedor."','".$info[$i]->latitud."','".$info[$i]->longitud."','".$info[$i]->date_time."'),";
				$consult .= $values;
			}

			$consult = substr($consult, 0, -1);

			// echo $consult;exit;

			return DBConnection::query($consult);	
		
		}

		private function read($id = NULL){

			if(!$id)
				$consult = "SELECT * FROM geolocation ORDER BY id DESC LIMIT 20";
			else
				$consult = "SELECT * FROM geolocation WHERE id = $id ORDER BY id DESC LIMIT 20";

			if ($resultado = DBConnection::query_row($consult)) {
	        	http_response_code(200);
	            return [ "estado" => self::SUCCESS, "datos" => $resultado ];	
	        }
	        else
	        	throw new ExcepcionApi(self::NOT_FOUND, self::MSG_NOT_FOUND, 404);
		}


		private function validateStructure($info){
			$response = TRUE;

			if(count($info) !== 0){
				for ($i = 0; $i < count($info); $i++) { 

					if ($info === NULL || !isset($info[$i]->id_device) || 
						!isset($info[$i]->id_service) || !isset($info[$i]->id_sucursal) || !isset($info[$i]->id_proveedor) || 
						!isset($info[$i]->latitud) || !isset($info[$i]->longitud) || 
						!isset($info[$i]->date_time))
			    		$response = FALSE;

				}
			}
			else
				$response = FALSE;

				
	    	return $response;

		}
	}

?>
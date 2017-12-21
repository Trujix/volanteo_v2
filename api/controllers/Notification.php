<?php  

	require_once('utilities/DBConnection.class.php');
	/**
	* 
	*/
	class Notification extends DBConnection{
		
		const SUCCESS = 1;
	    const MSG_SUCCESS = "success";

		const ACCESS_DENIED = 2;
	    const MSG_ACCESS_DENIED = "Acceso denegado";

	    const UNKNOW_ERROR = 3;
	    const MSG_UNKNOW_ERROR = "Internal Server error";

	    const ERROR_PARAMETROS = 4;
		const MSG_ERROR_PARAMETROS = "Error en la estructura de la peticion o en los parametros";

		const ERROR = 5;
	    const MSG_ERROR = "error";

	    const NOT_FOUND = 6;
	    const MSG_NOT_FOUND = "Servicio o tipo de alerta no encontrados";


		public function post($info){

			if(Main::authorization()){

				$res = self::send();

				switch ($res->success) {
					case 1:
						return ["estado" => self::SUCCESS, "datos" => self::MSG_SUCCESS];
						break;
					case 0:
						throw new ExceptionApi(self::ERROR, $res->results[0]->error, 200);
						break;
					default:
						throw new ExceptionApi(self::UNKNOW_ERROR, self::MSG_UNKNOW_ERROR, 500);
						break;
				}

			}
			else
		    	throw new ExceptionApi(self::ACCESS_DENIED, self::MSG_ACCESS_DENIED, 403);

		}

		public function get($info){

			$servicio = $info[1];
			$prov = $info[2];
			$tipo = $info[3];

			if(Main::authorization()){
				return self::read($servicio, $prov, $tipo);
			}
			else
		    	throw new ExceptionApi(self::ACCESS_DENIED, self::MSG_ACCESS_DENIED, 403);
		}

		private function send(){

			$body = $_POST['info'];
	        $info = json_decode($body);
		        
	        if(self::validateStructure($info))
	        	return self::sendFirebaseCloudMessaging($info);
	        else
		    	throw new ExceptionApi(self::ERROR_PARAMETROS, self::MSG_ERROR_PARAMETROS, 422);

		}

		private function read($servicio, $prov, $tipo = NULL){

			if($tipo == NULL)
				$consult = "SELECT * FROM app_notifications 
							WHERE id_service = $servicio";
			else{
				$consult = "SELECT * FROM app_notifications 
							WHERE tipo = $tipo 
							AND id_proveedor = $prov
							AND id_service = $servicio";
			}

			if ($resultado = DBConnection::query_assoc($consult)) {
	        	http_response_code(200);
	            return [ "estado" => self::SUCCESS, "datos" => $resultado ];	
	        }
	        else
	        	throw new ExceptionApi(self::NOT_FOUND, self::MSG_NOT_FOUND, 200);
		}

		private function sendFirebaseCloudMessaging($info){

			$tipo = $info->data->tipo;
			$lat  = $info->data->lat;
			$lng  = $info->data->lng;
			$serv = $info->data->serv;
			$prov = $info->data->prov;


			$getToken = "SELECT token_fcm FROM app_token WHERE id_proveedor = $prov";
			$resToken = DBConnection::query_single_object($getToken);
			$info->to = $resToken->token_fcm;

			// echo '<prev>';
			// var_dump($info);
			// echo '<prev>';
			// exit;

			$insert = "INSERT INTO app_notifications 
					   (tipo, id_service, id_proveedor, latitud, longitud)
					   VALUES ($tipo, $serv, $prov, '{$lat}', '{$lng}')";

					   // echo $insert;exit;

			if ($resInsert = DBConnection::query($insert)) {
				$headers = array(
					'Content-Type: application/json',
					"Authorization: key=AAAAnhMkz5Q:APA91bGsKuY8OQh1piaYtjkCYe5Xt6dyXzJhlG9XitJIrFC0W03KOfGmK9lMqf6T-E7r45MuU1igux-NwsuRQQLVEScJDoGmxbNX3dTOUEki8HjoZ7i7dsLp_SQ_UwBmgfl5pSidwg9I"
				);

				$url = "https://fcm.googleapis.com/fcm/send";

				$ch = curl_init($url);
				curl_setopt($ch,CURLOPT_HTTPHEADER, $headers);
				curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
				curl_setopt($ch,CURLOPT_POST, true);
				curl_setopt($ch,CURLOPT_POSTFIELDS, json_encode($info));
				curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );
				$result = curl_exec($ch);
				curl_close($ch);
				return json_decode($result);
			}
			else{
				$res = array("results" => array(array("error"=> "InsertDbError")));
				return json_decode(json_encode($res));
			}

		}

		private function validateStructure($info){

			$response = FALSE;
			if ($info !== NULL && count($info) === 1 && 
				isset($info->data) && isset($info->notification) && isset($info->to))
	    		$response = TRUE;

	    	return $response;

		}


	}



?>
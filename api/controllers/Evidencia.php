<?php  

	require_once("utilities/DBConnection.class.php");

	/**

	* 

	*/

	class Evidencia extends DBConnection {

		const SUCCESS = 1;
	    const MSG_SUCCESS = "success";

		const ACCESS_DENIED = 2;
	    const MSG_ACCESS_DENIED = "Acceso denegado";

	    const UNKNOW_ERROR = 3;
	    const MSG_UNKNOW_ERROR = "Internal Server error";

	    const ERROR_PARAMETROS = 4;
		const MSG_ERROR_PARAMETROS = "Error en la estructura de la peticion o en los parametros";

		const ERROR_TOKEN = 5;
		const MSG_ERROR_TOKEN = "Token no valido";

		const ERROR_IMG = 6;
		const MSG_ERROR_IMG = "Error al guardar Imagen";

		const ERROR_UPLOADIMG = 7;
		const MSG_ERROR_UPLOADIMG = "Error al cargar la imagen";

		const TOKEN_DEFAULT = "{3MP7Y!}";


		public function post($info){
			$info = $_POST['info'];
			$infoData = json_decode($info);

			$imgNombre = $infoData->imgstring;
			$tokenAndroid = $infoData->token;

			if($tokenAndroid === self::TOKEN_DEFAULT){
				if(Main::authorization()){
					$token = self::photo('TOKENCREATE', $imgNombre);
					// INSERTAMOS EL TOKEN EN BASE DE DATOS JUNTO A LA CADENA CON EL NOMBRE DE LA IMG(S)
					return $token;
				}else{
					throw new ExceptionApi(self::ACCESS_DENIED, self::MSG_ACCESS_DENIED, 403);
				}
			}else{
				$token = self::photo($tokenAndroid, $imgNombre);
		    	return $token;
			}
		}

		private function photo($infoToken, $imgstring){
			if($infoToken === 'TOKENCREATE'){
				//Main::log("ENTRE");
				$caracteres = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
				//Main::log("LEI CARACTERES");
			    $caracteresLong = strlen($caracteres);
			    //Main::log("LEI LONGITUD DE CARACTERES");
			    $tokenEnvio = '';
			    for ($i = 0; $i < 10; $i++) {
			        $tokenEnvio .= $caracteres[rand(0, $caracteresLong - 1)];
			    }
			    //Main::log("TOKEN: ".$tokenEnvio);
			    //Main::log("INSERT INTO app_tokenimg (imgtoken, imgstring) VALUES ('$tokenEnvio', '$imgstring')");
			    $consulta = DBConnection::query("INSERT INTO app_tokenimg (imgtoken, imgstring) VALUES ('$tokenEnvio', '$imgstring')");
			    return $tokenEnvio;
			}else{
				$verifToken = DBConnection::query_single_object("SELECT COUNT(*) count FROM app_tokenimg
							WHERE imgtoken = '$infoToken' AND imgstring = '$imgstring'");
				if(intval($verifToken->count) > 0){
					$body = $_POST['identificadores'];
			        $info = json_decode($body);
				        
			        if(self::validateStructure($info))
			        	return self::uploadPhoto($info);
			        else
				    	throw new ExceptionApi(self::ERROR_PARAMETROS, self::MSG_ERROR_PARAMETROS, 422);
				}else{
					throw new ExceptionApi(self::ERROR_TOKEN, self::MSG_ERROR_TOKEN, 460);
				}
			}
		}

		private function uploadPhoto($info){
			if (isset($_FILES["image"])) {
			    $file     = $_FILES["image"];
			    $nombre   = $file["name"];
			    $img_path = $file["tmp_name"];

				$id_service   = $info->id_service;
				$id_proveedor = $info->id_proveedor;
				$id_sucursal = $info->id_sucursal;

				//$project_name = "manuel/volanteo2/api";
				$target_path  = "evidencias/"; 

				$response    = array();
				// $server   = gethostbyname(gethostname());
				$server = $_SERVER["HTTP_HOST"];
				$target_path .= $nombre;
				$url         = "http://{$server}".dirname(dirname($_SERVER['REQUEST_URI']))."/{$target_path}";

				if ($nombre && move_uploaded_file($img_path,$target_path)){
					$consult = "INSERT INTO fotos (id_service, id_proveedor, id_sucursal, url) 
								VALUES ($id_service, $id_proveedor, $id_sucursal, '$url')";

					// echo $consult;exit;
					return DBConnection::query($consult);
				}
				else
					throw new ExceptionApi(self::ERROR_IMG, self::MSG_ERROR_IMG, 471);
			}
			else
				throw new ExceptionApi(self::ERROR_UPLOADIMG, self::MSG_ERROR_UPLOADIMG, 472);
		}

		private function uploadVideo(){
			return;
		}

		private function validateStructure($info){
			$response = FALSE;
			if ($info !== NULL && count($info) === 1 && 
				isset($info->id_service) && isset($info->id_proveedor) && isset($info->id_sucursal))
	    		$response = TRUE;
	    	return $response;
		}


	}



?>
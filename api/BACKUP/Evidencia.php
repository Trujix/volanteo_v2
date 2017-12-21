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





		public function post($info){



			$action = $info[1];

			return self::$action();

			exit;



			// if(Main::authorization()){



				switch (self::$action()) {

					case 'success':

						return ["estado" => self::SUCCESS, "datos" => self::MSG_SUCCESS];

						break;

					case 'error':

						throw new ExceptionApi(self::ACCESS_DENIED, self::MSG_ACCESS_DENIED, 403);

						break;

					default:
						throw new ExceptionApi(self::UNKNOW_ERROR, self::MSG_UNKNOW_ERROR, 500);


						break;

				}



		    // }

		    // else

		    	// throw new ExceptionApi(self::ACCESS_DENIED, self::MSG_ACCESS_DENIED, 403);

		

		}



		private function photo(){
			// CODIGO SOMBREADO DE PRUEBA LECTURA HEADERS E IMAGEN
			/*$headers = apache_request_headers();
			//echo $header;

			foreach ($headers as $header => $value) {
    			echo "$header: $value <br />\n";
			}*/
			/*self::log($_SERVER);
			print_r($_SERVER);
			foreach($_POST as $valor ) {
			    if( is_array( $valor ) ) {
			        foreach( $valor as $elemento ) {
			            print_r("Array1: ".$elemento);
			        }
			    } else {
			        print_r($valor);
			    }
			}
			$header = $_SERVER["HTTP_COSITEC"];
			$ids = $_SERVER["HTTP_IDENTIFICADORES"];
			//print_r("HEADER: ".$header."\n");
			//print_r("IDS: ".$ids);

			$ids = "";
			$ids = $_SERVER["HTTP_IDENTIFICADORES"];
	        $info = json_decode($ids);*/

	        $body = $_POST['identificadores'];
	        $info = json_decode($body);

	        if(self::validateStructure($info)){
	        	/*$imagen = $_POST;
	        	$imagen = implode($imagen);
	        	$imagen = explode("\n\n", $imagen);
	        	echo $imagen[1];*/
	        	return self::uploadPhoto($info);
	        	/*$headers = apache_request_headers();
	        	return $headers["Cositec"]."\n".$_FILES["image"];*/
	        }

	        else

		    	throw new ExceptionApi(self::ERROR_PARAMETROS, self::MSG_ERROR_PARAMETROS, 422);

		}



		private function uploadPhoto($info){

			if (isset($_FILES["image"])) {



			    $file     = $_FILES["image"];

			    $nombre   = $file["name"];

			    $img_path = $file["tmp_name"];

				$id_service   = $info->id_service;

				$id_proveedor = $info->id_proveedor;



				$project_name = "volanteo/api";

				$target_path  = "evidencias/"; 



				$response    = array();

				// $server   = gethostbyname(gethostname());

				$server = $_SERVER["HTTP_HOST"];

				$target_path .= $nombre;

				$url         = "http://{$server}/{$project_name}/{$target_path}";



				if ($nombre && move_uploaded_file($img_path,$target_path)){

					$consult = "INSERT INTO fotos (id_service, id_proveedor, url) 

								VALUES ($id_service, $id_proveedor, '$url')";



					// echo $consult;exit;



					return DBConnection::query($consult);

				}

				else
					return "ERROR DE GUARDADO";

			}

			else

				return "IMAGEN";



			

		}



		private function uploadVideo(){

			return;

		}





		private function validateStructure($info){



			$response = FALSE;

			if ($info !== NULL && count($info) === 1 && 

				isset($info->id_service) && isset($info->id_proveedor))

	    		$response = TRUE;



	    	return $response;



		}



	}



?>
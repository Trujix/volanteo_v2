<?php  
	
	require('Mysql.php');

	Class Cliente extends Mysql{

		public function create($info){
			$info = $this->jsonToObject($info);

			$consult = "SELECT COUNT(idcliente) count FROM clientes WHERE rfc = '$info->txt_rfc'";
			$res = $this->query_single_object($consult);

			if(intval($res->count) < 1){

				// CREANDO CONTRASEÑA ALEATORIA
				$caracteres = '0123456789';
				$caracteresLong = strlen($caracteres);
				$pass = '';
				for ($i = 0; $i < 10; $i++) {
				    $pass .= $caracteres[rand(0, $caracteresLong - 1)];
				}

				//$this->next_result();  <--- ESTA LINEA GENERA ERRORES DE ENVIO (NO SE CONSIDERA NECESARIA)
				$consult = "CALL SP_CREATECLIENTE(
								'$info->txt_nombre', 	'$info->txt_rfc', '$info->txt_encargado',
								'$info->txt_calle', 	'$info->txt_noext', 
								'$info->txt_noint', 	'$info->txt_colonia', 
								'$info->txt_cp', 		'$info->txt_pais', 
								'$info->txt_estado', 	'$info->txt_ciudad', 
								'$info->txt_municipio', '$info->txt_tel1', 
								'$info->txt_tel2', 	    '$info->txt_correo', 
								'$info->txt_web', md5('$pass')
							)";

				$this->correoPass($info->txt_correo, $info->txt_encargado, $pass);
				return $this->query($consult);
			}
			else
				return 2;
		}

		public function read($status){
			return json_encode($this->query_row("CALL SP_SHOWCLIENTES($status)"));
		}

		public function update($info){
			$info = $this->jsonToObject($info);	

			$update = "CALL SP_UPDATECLIENTE(
						'$info->txt_nombre', '$info->txt_rfc', '$info->txt_encargado',
						'$info->txt_calle',  '$info->txt_noext', 
						'$info->txt_noint',  '$info->txt_colonia', 
						'$info->txt_cp', 	 '$info->txt_pais', 
						'$info->txt_estado', '$info->id',
						'$info->txt_ciudad', '$info->txt_municipio', 
						'$info->txt_tel1', 	 '$info->txt_tel2',    
						'$info->txt_correo', '$info->txt_web'
						)";


			return json_encode($this->query($update));
		
		}

		public function delete($id){

			$DateTime = $this->DateTime();

			$nombre = $this->query_assoc("CALL SP_GETCLIENTE($id)");
			$nombre = $nombre[0]['nombre'];

			$this->next_result();

			$consulta = "CALL SP_DELETECLIENTE(
							$id, 
							'Adminstrador', 
							'$DateTime[1]', 
							'$DateTime[0]',
							'Se dio de baja el cliente con nombre: $nombre'
						)";

			// echo $consulta; exit;
			return json_encode($this->query($consulta));
		
		}

		public function reactiva($id){
			return json_encode($this->query("CALL SP_REACTIVACLIENTE($id)"));;

		}

		public function get($id){
			$consult = "CALL SP_GETCLIENTE($id)";
			$res = $this->query_assoc($consult);
			return json_encode($res);
		}

		// :::::::::::::::: 19-12-2017 :::::::::::::::::::
		// FUNCION NUEVA QUE ELIMINAR AL CLIENTE DEFINITIVAMENTE
		public function eliminarCliente($id){
			return json_encode($this->query("CALL SP_ELIMINARCLIENTE($id)"));
		}


	}

?>
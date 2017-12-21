<?php  
	
	require('Mysql.php');

	Class Proveedor extends Mysql{

		public function create($info){
			$info = $this->jsonToObject($info);

			$consult = "SELECT COUNT(idproveedor) count FROM proveedores 
						WHERE rfc = '$info->txt_rfc' OR rfc_f = '$info->txt_rfcF'";
			$verifMail = $this->query_assoc("SELECT idproveedor FROM proveedores WHERE ctacorreo = '$info->txt_correo'");
			$res = $this->query_single_object($consult);

			if($res->count == 0){
				if(intval(count($verifMail)) > 0){
					return 3;
				}else{
					// CREANDO CONTRASEÑA ALEATORIA
					$caracteres = '0123456789';
					$caracteresLong = strlen($caracteres);
					$pass = '';
					for ($i = 0; $i < 10; $i++) {
					    $pass .= $caracteres[rand(0, $caracteresLong - 1)];
					}

					$consult = "CALL SP_CREATEPROVEEDOR(
									'$info->txt_nombre', 	'$info->txt_rfc', 
									'$info->txt_calle', 	'$info->txt_noext', 
									'$info->txt_noint', 	'$info->txt_colonia', 
									'$info->txt_cp', 		'$info->txt_pais', 
									'$info->txt_estado', 	'$info->txt_ciudad', 
									'$info->txt_municipio', '$info->txt_banco',
									'$info->txt_claveBanco','$info->txt_nosucursal',
									'$info->txt_nocuenta',	'$info->txt_tel1',
									'$info->txt_tel2',		'$info->txt_tel3',   
									'$info->txt_correo',	
									'$info->txt_nombreF', 	'$info->txt_rfcF', 
									'$info->txt_calleF', 	'$info->txt_noextF', 
									'$info->txt_nointF', 	'$info->txt_coloniaF', 
									'$info->txt_cpF', 		'$info->txt_paisF', 
									'$info->txt_estadoF', 	'$info->txt_ciudadF', 
									'$info->txt_municipioF','$info->txt_tarjeta', md5('$pass')
								)";
					// echo $consult; exit;
					$this->correoPass($info->txt_correo, $info->txt_nombre, $pass);
					return $this->query($consult);
				}
			}else{
				return 2;
			}
		}


		public function read($status){
			return json_encode($this->query_row("CALL SP_SHOWPROVEEDORES($status)"));
		}

		public function update($data){
			$info = $this->jsonToObject($data);	

			$consult = "SELECT COUNT(idproveedor) count FROM proveedores 
						WHERE idproveedor != $info->id AND (rfc = '$info->txt_rfc' OR rfc_f = '$info->txt_rfcF')";
			$verifMail = $this->query_assoc("SELECT idproveedor FROM proveedores WHERE idproveedor != $info->id AND ctacorreo = '$info->txt_correo'");
			$res = $this->query_single_object($consult);

			if($res->count == 0){
				if(intval(count($verifMail)) > 0){
					return 3;
				}else{
					$update = "CALL SP_UPDATEPROVEEDOR(
								'$info->txt_nombre', 	'$info->txt_rfc', 
								'$info->txt_calle', 	'$info->txt_noext', 
								'$info->txt_noint', 	'$info->txt_colonia', 
								'$info->txt_cp', 		'$info->txt_pais', 
								'$info->txt_estado', 	'$info->txt_ciudad', 
								'$info->txt_municipio', '$info->txt_banco',
								'$info->txt_claveBanco','$info->txt_nosucursal',
								'$info->txt_nocuenta',	'$info->txt_tel1',
								'$info->txt_tel2',		'$info->txt_tel3', 
								'$info->txt_correo',	'$info->id',
								'$info->txt_nombreF', 	'$info->txt_rfcF', 
								'$info->txt_calleF', 	'$info->txt_noextF', 
								'$info->txt_nointF', 	'$info->txt_coloniaF', 
								'$info->txt_cpF', 		'$info->txt_paisF', 
								'$info->txt_estadoF', 	'$info->txt_ciudadF', 
								'$info->txt_municipioF','$info->txt_tarjeta'
							)";

					//echo $update; exit;
					if($this->query($update)){
						return json_encode($this->query($update));
					}else{
						return 2;
					}
				}
			}else{
				return 2;
			}
		}

		public function delete($id){

			$DateTime = $this->DateTime();

			$nombre = $this->query_assoc("CALL SP_GETPROVEEDOR($id)");
			$nombre = $nombre[0]['nombre'];

			$this->next_result();

			$consulta = "CALL SP_DELETEPROVEEDOR(
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
			return json_encode($this->query("CALL SP_REACTIVAPROVEEDOR($id)"));;

		}

		public function get($id){
			$consult = "CALL SP_GETPROVEEDOR($id)";
			// echo $consult;exit;

			$res = $this->query_assoc($consult);

			return json_encode($res);
		
		}


	}

?>
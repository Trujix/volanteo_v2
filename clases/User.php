<?php  
	
	require('Mysql.php');

	Class User extends Mysql{

		public function login($info){

			$response = "false";

			$user = $info["user"];
			$pass = $info["password"];

			$datos = $this->query_assoc("CALL login('$user', '$pass')");

			if(count($datos) > 0){
				// session_start(); 
				# no se inicia la sesón aqui por que ya se inició en el archivo de rutas
				$_SESSION["iduser"] = $datos[0]['id'];
				$_SESSION["roluser"] = $datos[0]['rol'];
				$_SESSION["name"] = strtoupper($datos[0]['username']);
				$response = "admin";
			}else{
				$clientes = array("clientes", "bloques", "sucursales", "proveedores");
				$ids = array("idcliente", "idbloque", "idsucursal", "idproveedor");
				$c = 0;
				for($i = 0; $i < count($clientes); $i++){
					$cliente = new Mysql();
					$datos2 = $cliente->query_assoc("CALL SP_LOGINCLIENTE('$user', md5('$pass'), '{$clientes[$i]}')");
					if(count($datos2) > 0 && $c < 1){
						if($datos2[0]["status"] > 0){
							$response = $clientes[$i];
							setcookie("alterego", $user, time() + 3600, "/");
							setcookie("key", md5($pass), time() + 3600, "/");
							setcookie("idusuario", $datos2[0][$ids[$i]], time() + 3600, "/");
							setcookie("tipo", $clientes[$i], time() + 3600, "/");
						}else{
							$response = "desactivado";
						}
						$c++;
					}
				}
			}

			return json_encode($response);

		}

		public function logout(){
			session_destroy();
			header("Location: index.php");
		}

		public function register(){
			return;
		}

	}
	
?>
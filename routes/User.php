<?php  

	require('Mysql.php');

	Class User extends Mysql{

		public function login($info){
			$response = false;
			$user = $info["user"];
			$pass = $info["password"];
			$datos = $this->query_assoc("CALL login('$user', '$pass')");

			if(count($datos)>0){
				// session_start(); 
				# no se inicia la sesón aqui por que ya se inició en el archivo de rutas
				$_SESSION["iduser"] = $datos[0]['id'];
				$_SESSION["roluser"] = $datos[0]['rol'];
				$_SESSION["name"] = strtoupper($datos[0]['username']);
				$response = true;
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
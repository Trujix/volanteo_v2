<?php  
	
	require('Mysql.php');

	Class Configuracion extends Mysql{

		public function traerUsers($info){
			return $this->query_assoc("SELECT {$info['campo2']} AS id, {$info['campo1']} AS user FROM {$info['tabla']}");
		}

		public function traerMail($info){
			return $this->query_assoc("SELECT ctacorreo FROM {$info['tabla']} WHERE {$info['campo1']} = {$info['id']}");
		}

		public function resetUserPass($info){
			// CREANDO CONTRASEÑA ALEATORIA
			$caracteres = '0123456789';
			$caracteresLong = strlen($caracteres);
			$pass = '';
			for ($i = 0; $i < 10; $i++) {
			    $pass .= $caracteres[rand(0, $caracteresLong - 1)];
			}
			if($this->query("CALL SP_UPDATEPASS('{$info['id']}', md5('$pass'), '{$info['tabla']}')")){
				$this->resetPass($info['mail'], $info['nombre'], $pass);
				return "EXITO";
			}else{
				return "ERRORGUARDAR";
			}
		}

		public function resetUserAdm($info){
			return "EXITO";
			/*$dataAdm = $this->query_assoc("SELECT username, password FROM usuarios WHERE id = ".$_SESSION["iduser"]);
			if(sha1(md5('-t3CN01oG1a5%C0s173c!'.$info['antPass'])) !== $dataAdm[0]['password']){
				return "ERRANTPASS";
			}else{
				$id = $_SESSION['iduser'];
				$newpass = sha1(md5('-t3CN01oG1a5%C0s173c!'.$info['newPass']));
				if($this->query("CALL SP_UPDATEPASS('$id', '$newpass', 'usuarios')")){
					return "EXITO";
				}else{
					return "ERRORINESPERADO";
				}
			}*/
		}

	}

?>
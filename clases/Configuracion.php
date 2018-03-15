<?php  
	
	require('Mysql.php');

	Class Configuracion extends Mysql{

		// **** PERMISOS - OBTENCION DE FUNCION ESTANDARIZADA ****
		public function verifUsuarioPermiso($info){
			if($this->query_assoc("SELECT rol FROM usuarios WHERE id = ".$_SESSION["iduser"])[0]["rol"] === "Administrador"){
				return 1;
			}else{
				$status = $this->query_assoc("SELECT status FROM permisos_usuarios WHERE idusuario = ".$_SESSION["iduser"]." AND permisoclave = '$info'");
				if(count($status) > 0)
					return intval($status[0]["status"]);
				else
					return 0;
			}
		}
		public function traerListaModulos(){
			return $this->query_assoc("SELECT DISTINCT(modulo) FROM permisos");
		}
		// **** PERMISOS - OBTENCION DE FUNCION ESTANDARIZADA ****

		public function traerUsers($info){
			$condicion = "";
			if($info['tabla'] === "usuarios")
				$condicion = " WHERE rol = 'Usuario'";
			return $this->query_assoc("SELECT {$info['campo2']} AS id, {$info['campo1']} AS user FROM {$info['tabla']}".$condicion);
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
			if($info['tabla'] === "usuarios")
				$password = sha1(md5('-t3CN01oG1a5%C0s173c!'.$pass));
			else
				$password = md5($pass);

			if($this->query("CALL SP_UPDATEPASS('{$info['id']}', '$password', '{$info['tabla']}')")){
				$this->resetPass($info['mail'], $info['nombre'], $pass);
				return "EXITO";
			}else{
				return "ERRORGUARDAR";
			}
		}

		public function resetUserAdm($info){
			//return "EXITO";
			$dataAdm = $this->query_assoc("SELECT username, password FROM usuarios WHERE id = ".$_SESSION["iduser"]);
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
			}
		}

		// ************************** NUEVAS FUNCIONES ***************************
		// :::::::::::::::::::::::::::: 03/01/2017 :::::::::::::::::::::::::::::::
		public function altaUsuario($info){
			// CREANDO CONTRASEÑA ALEATORIA
			$respuesta = "";
			$caracteres = '0123456789';
			$caracteresLong = strlen($caracteres);
			$pass = '';
			for ($i = 0; $i < 10; $i++) {
			    $pass .= $caracteres[rand(0, $caracteresLong - 1)];
			}
			$password = sha1(md5('-t3CN01oG1a5%C0s173c!'.$pass));

			if($this->query("INSERT INTO usuarios (username, password, ctacorreo ,rol) VALUES ('{$info['nombre']}', '$password', '{$info['correo']}', 'Usuario')")){
				$respuesta["INFO"] = "EXITO";

				$btn = 'display: inline-block;padding: 6px 12px;margin-bottom: 0;font-size: 14px;font-weight: normal;line-height: 1.42857143;text-align: center;white-space: nowrap;vertical-align: middle;-ms-touch-action: manipulation;touch-action: manipulation;cursor: pointer;-webkit-user-select: none;-moz-user-select: none;-ms-user-select: none;user-select: none;background-image: none;border: 1px solid transparent;border-radius: 4px;';
				$msg = '<!DOCTYPE html>'.
					'<html>'.
					'<head>'.
						'<title>.: - Mail-Format -:.</title>'.
					'</head>'.
					'<body>'.
						'<div style="width: 450px;">'.
							'<div style="background:#fff; border:1px solid #ddd; box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2); margin: 15px 0; overflow:hidden;border-radius:7px;border-color: #428bca;">'.
								'<div style="border-color: transparent #428bca transparent transparent;border-color: rgba(255,255,255,0) #428bca rgba(255,255,255,0) rgba(255,255,255,0);">'.
								'</div>'.
								'<div style="padding:0 20px 10px;">'.
									'<h3 style="font: 21px Helvetica Neue,Helvetica,Arial,sans-serif;">Apreciable Usuario:</h3>'.
									'<p style="font: 15px Helvetica Neue,Helvetica,Arial,sans-serif;">'.
										'Por medio del presente correo el <b>Grupo Heraldos</b> le da la bienvenida y te da a conocer tu información de inicio de sesión a nuestra plataforma.'.
										'<br>Su usuario y contraseña son:<br><br><b>Usuario: </b>'.$info["nombre"].'<br><b>Contraseña: </b>'.$pass.
										'<br><br><b><i> - Dicha información solo <b>Usted</b> la conoce, por lo que le recomendamos cambiar su contraseña de inicio de sesión en la plataforma.</i></b>'.
										'<br><br><a href="http://'.$_SERVER["HTTP_HOST"].dirname(dirname($_SERVER['REQUEST_URI'])).'"><button style="'.$btn.'color: #FFFFFF;background-color: #663399;border-color: #663399;padding: 1px 5px;font-size: 12px;line-height: 1.5;border-radius: 3px;">Ir al sitio Grupo Heraldos</button></a>'.
									'</p>'.
									'</div>'.
								'</div>'.
							'</div>'.
						'</body>'.
					'</html>';
				if($this->enviarMail($info['correo'], 'Usuario', $msg, 'Registro de Usuario', ''))
					$respuesta["MAIL"] = "EXITO";
				else
					$respuesta["MAIL"] = $pass;
			}
			return $respuesta;
		}

		public function verifUsuario(){
			return $this->query_assoc("SELECT rol FROM usuarios WHERE id = ".$_SESSION["iduser"])[0]["rol"];
		}

		public function traerUsuariosSistema(){
			$respuesta["USUARIOS"] = $this->query_assoc("SELECT * FROM usuarios WHERE rol = 'Usuario'");
			$respuesta["CHECKS"] = $this->query_assoc("SELECT * FROM permisos");

			return $respuesta;
		}

		public function traerUsuarioInfo($info){
			$respuesta["CORREO"] = $this->query_assoc("SELECT ctacorreo FROM usuarios WHERE id = $info")[0]["ctacorreo"];
			$respuesta["CHECKS"] = $this->query_assoc("SELECT * FROM permisos_usuarios WHERE idusuario = $info");

			return $respuesta;
		}

		public function editarPermisosUsuario($info){
			$respuesta = "EXITO";
			if($this->query("UPDATE usuarios SET ctacorreo = '{$info['correo']}' WHERE id = {$info['id']}")){
				if($this->query("DELETE FROM permisos_usuarios WHERE idusuario = {$info['id']}")){
					$permisos = $info["checks"];
					$altaPermisos = "INSERT INTO permisos_usuarios (idusuario, idpermiso, permisoclave, status) VALUES ";
					for($p = 0; $p < count($permisos); $p++){
						$altaPermisos .= "(".$info["id"].",".$permisos[$p]["idpermiso"].",'".$permisos[$p]["permisoclave"]."',".$permisos[$p]["status"]."),";
					}
					$altaPermisos = substr($altaPermisos, 0, strlen($altaPermisos)-1);
					if(!$this->query($altaPermisos)){
						$respuesta = "ERRORPERMISOS";
					}
				}else{
					$respuesta = "ERRORPERMISOS";
				}
			}else{
				$respuesta = "ERRORMAIL";
			}
			return $respuesta;
		}

	}

?>
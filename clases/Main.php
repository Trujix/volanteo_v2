<?php  

	Class Main{

		public function DateTime(){
			$time = date('H:i:s', time());
			$date = date('d-m-Y');
			return array($time, $date);
		}

		public function getDate(){
			$dateTime = $this->DateTime();
			$fecha = explode('-', $dateTime[1]);
			// $fecha[2] = substr($fecha[2], 2, 3);
			$fecha = $fecha[2].'-'.$fecha[1].'-'.$fecha[0];
			return $fecha;
		}

		public function getTime(){
			$dateTime = $this->DateTime();
			$hora = $dateTime[0];
			return $hora;
		}

		public function getURL(){
			$url = $_SERVER['HTTP_REFERER'];
			$folders = explode('/', $url);
			$web = $_SERVER['HTTP_HOST'];
			for ($i = 3; $i < count($folders) - 1; $i++){
				$web .= "/".$folders[$i];
			}
			return $web;
		}

		public function log($texto){
			$myfile = fopen("log.txt", "a") or die("Unable to open file!");

			$log = $clientes[0]->nombre.'--';

			$txt = "
			---- ".$texto." ----- ";

			fwrite($myfile, $txt);
			fclose($myfile);
		}


		public function jsonToObject($info){
			$info = str_replace('\"', '"', $info);
			$info = json_decode($info);
			return $info[0];
		}

		public function normaliza($cadena){
		    $originales = 'ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûýýþÿŔŕ';
		    $modificadas = 'aaaaaaaceeeeiiiidnoooooouuuuybsaaaaaaaceeeeiiiidnoooooouuuyybyRr';
		    $cadena = utf8_decode($cadena);
		    $cadena = strtr($cadena, utf8_decode($originales), $modificadas);
		    $cadena = strtolower($cadena);
		    return utf8_encode($cadena);
		}

		// public function getEstados($bandera){
		// 	if($bandera)
		// 		return json_encode($this->query_assoc("SELECT * FROM estados"));
		// 	else
		// 		return $this->query_assoc("SELECT * FROM estados");
		// }

		// public function getMunicipios($edo){
		// 	$consult = "SELECT idmunicipio, municipio 
		// 				FROM municipios WHERE idestado = $edo";
								
		// 	return json_encode($this->query_assoc($consult));
		// }

		// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
		// **************************** [ PHP MAILER ] ****************************** 
		
		public function enviarMail($mailTo, $nameTo, $cuerpo, $subject, $copia){
			// $page = 'http://localhost/volanteo/configTrabajo.php'; CAMBIAR ESTA VARIABLE POR SITIO DONDE SE ALOJA PROYECTO
			$msg = $cuerpo;
			
		    $bcc = "";
			$mailFrom = 'pruebacorreo2236@gmail.com';

			require_once("../plugins/PHPMailer-maste/PHPMailerAutoload.php");
			
			$mail = new PHPMailer();

			$mail->SMTPDebug = 0;

		    $mail->SetLanguage( 'es', '../PHPMailer-maste/includes/language/' );
		                    
		    $mail->From     = $mailFrom;   // Correo Electronico para SMTP 
		    $mail->FromName = 'Grupo Publicitario Heraldos'.$copia;
		    $mail->AddAddress($mailTo); // Dirección a la que llegaran los mensajes

		    if($bcc != "")
		    	$mail->AddBCC($bcc); // copia oculta

		    $mail->WordWrap = 50; 
		    $mail->IsHTML(true);     
		    $mail->CharSet = 'UTF-8';  
		    $mail->Subject  =  utf8_decode($subject);
		    $mail->Body     =  $msg;

			$mail->IsSMTP(); 
		    $mail->Host = "smtp.gmail.com";  // mail. o solo dominio - Servidor de 
		    $mail->Port = 587;
    		$mail->SMTPSecure = 'tls';
		    $mail->SMTPAuth = true; 
		    $mail->Username = $mailFrom;  // Correo Electrónico para SMTP correo@dominio
		    $mail->Password = "prueba2236"; // Contraseña para SMTP

		    if(!$mail->send())
		    	return false;
		    else
		    	return true;
		}

		public function mailCliente($mailTo, $nameTo, $cuerpo, $subject, $copia){
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
									'<h3 style="font: 21px Helvetica Neue,Helvetica,Arial,sans-serif;">Apreciable Cliente:</h3>'.
									'<p style="font: 15px Helvetica Neue,Helvetica,Arial,sans-serif;">'.
										'Se le informa que se ha habilitado un nuevo trabajo de '.$cuerpo.'. Lo invitamos a ingresar a nuestra plataforma para comenzar su configuración.'.
										'<br><br><a href="http://'.$_SERVER["HTTP_HOST"].dirname(dirname($_SERVER['REQUEST_URI'])).'"><button style="'.$btn.'color: #FFFFFF;background-color: #663399;border-color: #663399;padding: 1px 5px;font-size: 12px;line-height: 1.5;border-radius: 3px;">Sitio del Grupo Heraldos</button></a>'.
									'</p>'.
									'</div>'.
								'</div>'.
							'</div>'.
						'</body>'.
					'</html>';
			
		    $bcc = "";
			$mailFrom = 'pruebacorreo2236@gmail.com';

			require_once("../plugins/PHPMailer-maste/PHPMailerAutoload.php");
			
			$mail = new PHPMailer();

			$mail->SMTPDebug = 0;

		    $mail->SetLanguage( 'es', '../PHPMailer-maste/includes/language/' );
		                    
		    $mail->From     = $mailFrom;
		    $mail->FromName = 'Grupo Publicitario Heraldos';
		    $mail->AddAddress($mailTo);

		    if(count($copia) > 0){
		    	for($c = 1; $c < count($copia); $c++){
		    		$mail->AddBCC($copia[$c], "Copia");
		    	}
		    }

		    $mail->WordWrap = 50; 
		    $mail->IsHTML(true);     
		    $mail->CharSet = 'UTF-8';  
		    $mail->Subject  =  utf8_decode('Configurar Trabajo');
		    $mail->Body     =  $msg;

			$mail->IsSMTP(); 
		    $mail->Host = "smtp.gmail.com";
		    $mail->Port = 587;
    		$mail->SMTPSecure = 'tls';
		    $mail->SMTPAuth = true; 
		    $mail->Username = $mailFrom;
		    $mail->Password = "prueba2236";

		    if(!$mail->send())
		    	return false;
		    else
		    	return true;
		}

		public function correoPass($correo, $nombre, $pass){
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
									'<h3 style="font: 21px Helvetica Neue,Helvetica,Arial,sans-serif;">Apreciable '.$nombre.'</h3>'.
									'<p style="font: 15px Helvetica Neue,Helvetica,Arial,sans-serif;">'.
										'El Grupo Heraldos le da la bienvenida y agradece su preferencia. Para brindarle un mejor servicio ponemos a su dispocisión nuestra herramienta de configuración de trabajos del Grupo Heraldos.'.
										'<br>Su usuario y contraseña son:<br><br><b>Usuario: </b>'.$correo.'<br><b>Contraseña: </b>'.$pass.
										'<br><br><b><i> - Puede cambiar su contraseña de inicio de sesión en la plataforma.</i></b>'.
										'<br><br><a href="http://'.$_SERVER["HTTP_HOST"].dirname(dirname($_SERVER['REQUEST_URI'])).'"><button style="'.$btn.'color: #FFFFFF;background-color: #663399;border-color: #663399;padding: 1px 5px;font-size: 12px;line-height: 1.5;border-radius: 3px;">Ir al sitio Grupo Heraldos</button></a>'.
									'</p>'.
									'</div>'.
								'</div>'.
							'</div>'.
						'</body>'.
					'</html>';

			$mailFrom = 'pruebacorreo2236@gmail.com';
			require_once("../plugins/PHPMailer-maste/PHPMailerAutoload.php");
			
			$mail = new PHPMailer();

			$mail->SMTPDebug = 0;
		    $mail->SetLanguage( 'es', '../PHPMailer-maste/includes/language/' );
		                    
		    $mail->From     = $mailFrom;
		    $mail->FromName = 'Grupo Publicitario Heraldos';
		    $mail->AddAddress($correo);

		    $mail->WordWrap = 50; 
		    $mail->IsHTML(true);     
		    $mail->CharSet = 'UTF-8';  
		    $mail->Subject  =  utf8_decode('Datos de Usuario');
		    $mail->Body     =  $msg;

			$mail->IsSMTP(); 
		    $mail->Host = "smtp.gmail.com";
		    $mail->Port = 587;
    		$mail->SMTPSecure = 'tls';
		    $mail->SMTPAuth = true; 
		    $mail->Username = $mailFrom;
		    $mail->Password = "prueba2236";

		    if(!$mail->send())
		    	return false;
		    else
		    	return true;
		}

		public function correoProveedor($correo, $nombre, $idTrab, $sucursal){
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
									'<h3 style="font: 21px Helvetica Neue,Helvetica,Arial,sans-serif;">Apreciable '.$nombre.'</h3>'.
									'<p style="font: 15px Helvetica Neue,Helvetica,Arial,sans-serif;">'.
										'Se le informa que se ha habilitado la opción de asignar fecha de inicio y término del trabajo con ID <b>No. "'.$idTrab.'"</b> para la sucursal <b>'.$sucursal.'</b>.'.
										'<br>Lo invitamos a que configure su rol de trabajo en la plataforma.'.
										'<br><br><a href="http://'.$_SERVER["HTTP_HOST"].dirname(dirname($_SERVER['REQUEST_URI'])).'"><button style="'.$btn.'color: #FFFFFF;background-color: #663399;border-color: #663399;padding: 1px 5px;font-size: 12px;line-height: 1.5;border-radius: 3px;">Ir al sitio Grupo Heraldos</button></a>'.
									'</p>'.
									'</div>'.
								'</div>'.
							'</div>'.
						'</body>'.
					'</html>';

			$mailFrom = 'pruebacorreo2236@gmail.com';
			require_once("../plugins/PHPMailer-maste/PHPMailerAutoload.php");
			
			$mail = new PHPMailer();

			$mail->SMTPDebug = 0;
		    $mail->SetLanguage( 'es', '../PHPMailer-maste/includes/language/' );
		                    
		    $mail->From     = $mailFrom;
		    $mail->FromName = 'Grupo Publicitario Heraldos';
		    $mail->AddAddress($correo);

		    $mail->WordWrap = 50; 
		    $mail->IsHTML(true);     
		    $mail->CharSet = 'UTF-8';  
		    $mail->Subject  =  utf8_decode('Config. de Trabajo');
		    $mail->Body     =  $msg;

			$mail->IsSMTP(); 
		    $mail->Host = "smtp.gmail.com";
		    $mail->Port = 587;
    		$mail->SMTPSecure = 'tls';
		    $mail->SMTPAuth = true; 
		    $mail->Username = $mailFrom;
		    $mail->Password = "prueba2236";

		    if(!$mail->send())
		    	return false;
		    else
		    	return true;
		}

		public function correoReenvio($correo, $nombre, $idTrab, $sucursal, $tipo, $correos){
			$btn = 'display: inline-block;padding: 6px 12px;margin-bottom: 0;font-size: 14px;font-weight: normal;line-height: 1.42857143;text-align: center;white-space: nowrap;vertical-align: middle;-ms-touch-action: manipulation;touch-action: manipulation;cursor: pointer;-webkit-user-select: none;-moz-user-select: none;-ms-user-select: none;user-select: none;background-image: none;border: 1px solid transparent;border-radius: 4px;';
			if($tipo === 'PROVEEDOR'){
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
										'<h3 style="font: 21px Helvetica Neue,Helvetica,Arial,sans-serif;">Apreciable '.$nombre.'</h3>'.
										'<p style="font: 15px Helvetica Neue,Helvetica,Arial,sans-serif;">'.
											'Se le informa que su propuesta de fecha de inicio y término del trabajo con ID <b>No. "'.$idTrab.'"</b> para la sucursal <b>'.$sucursal.'</b> necesita ser editada.'.
											'<br>Lo invitamos a que vaya a la plataforma para realizar dicha acción. Si tiene alguna duda, haganos el favor de contactarnos<br><b>Le enviamos un saludo.</b>'.
											'<br><br><a href="http://'.$_SERVER["HTTP_HOST"].dirname(dirname($_SERVER['REQUEST_URI'])).'"><button style="'.$btn.'color: #FFFFFF;background-color: #663399;border-color: #663399;padding: 1px 5px;font-size: 12px;line-height: 1.5;border-radius: 3px;">Ir al sitio Grupo Heraldos</button></a>'.
										'</p>'.
										'</div>'.
									'</div>'.
								'</div>'.
							'</body>'.
						'</html>';
			}else if($tipo === 'CLIENTE'){
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
										'<h3 style="font: 21px Helvetica Neue,Helvetica,Arial,sans-serif;">Apreciable Cliente:</h3>'.
										'<p style="font: 15px Helvetica Neue,Helvetica,Arial,sans-serif;">'.
											'Se le informa que la configuracion realizada del trabajo con ID <b>No. "'.$idTrab.'"</b> para la sucursal <b>'.$sucursal.'</b> necesita ser editada.'.
											'<br>Lo invitamos a que vaya a la plataforma para realizar dicha acción. Si tiene alguna duda, háganos el favor de contactarnos<br><b>Le enviamos un saludo.</b>'.
											'<br><br><a href="http://'.$_SERVER["HTTP_HOST"].dirname(dirname($_SERVER['REQUEST_URI'])).'"><button style="'.$btn.'color: #FFFFFF;background-color: #663399;border-color: #663399;padding: 1px 5px;font-size: 12px;line-height: 1.5;border-radius: 3px;">Ir al sitio Grupo Heraldos</button></a>'.
										'</p>'.
										'</div>'.
									'</div>'.
								'</div>'.
							'</body>'.
						'</html>';
			}	

			$mailFrom = 'pruebacorreo2236@gmail.com';
			require_once("../plugins/PHPMailer-maste/PHPMailerAutoload.php");
			
			$mail = new PHPMailer();

			if($tipo === 'CLIENTE'){
				if(count($correos) > 0){
		    		for($c = 0; $c < count($correos); $c++){
		    			$mail->AddBCC($correos[$c], "Copia");
		    		}
		    	}
			}

			$mail->SMTPDebug = 0;
		    $mail->SetLanguage( 'es', '../PHPMailer-maste/includes/language/' );
		                    
		    $mail->From     = $mailFrom;
		    $mail->FromName = 'Grupo Publicitario Heraldos';
		    $mail->AddAddress($correo);

		    $mail->WordWrap = 50; 
		    $mail->IsHTML(true);     
		    $mail->CharSet = 'UTF-8';  
		    $mail->Subject  =  utf8_decode('EDITAR PROPUESTA');
		    $mail->Body     =  $msg;

			$mail->IsSMTP(); 
		    $mail->Host = "smtp.gmail.com";
		    $mail->Port = 587;
    		$mail->SMTPSecure = 'tls';
		    $mail->SMTPAuth = true; 
		    $mail->Username = $mailFrom;
		    $mail->Password = "prueba2236";

		    if(!$mail->send())
		    	return false;
		    else
		    	return true;
		}

		public function resetPass($correo, $nombre, $pass){
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
									'<h3 style="font: 21px Helvetica Neue,Helvetica,Arial,sans-serif;">Apreciable '.$nombre.'</h3>'.
									'<p style="font: 15px Helvetica Neue,Helvetica,Arial,sans-serif;">'.
										'Le informamos que su contraseña ha sido reestablecida con exito. Solo USTED conoce esta nueva contraseña, y para su total comodidad lo invitamos a cambiarla en la plataforma del Grupo Heraldos.'.
										'<br><br><b>Su nueva contraseña: </b>'.$pass.
										'<br><br><b><i> - Recuerde que su contraseña puede cambiarla en el sistema.</i></b>'.
										'<br><br><a href="http://'.$_SERVER["HTTP_HOST"].dirname(dirname($_SERVER['REQUEST_URI'])).'"><button style="'.$btn.'color: #FFFFFF;background-color: #663399;border-color: #663399;padding: 1px 5px;font-size: 12px;line-height: 1.5;border-radius: 3px;">Ir al sitio Grupo Heraldos</button></a>'.
									'</p>'.
									'</div>'.
								'</div>'.
							'</div>'.
						'</body>'.
					'</html>';

			$mailFrom = 'pruebacorreo2236@gmail.com';
			require_once("../plugins/PHPMailer-maste/PHPMailerAutoload.php");
			
			$mail = new PHPMailer();

			$mail->SMTPDebug = 0;
		    $mail->SetLanguage( 'es', '../PHPMailer-maste/includes/language/' );
		                    
		    $mail->From     = $mailFrom;
		    $mail->FromName = 'Grupo Publicitario Heraldos';
		    $mail->AddAddress($correo);

		    $mail->WordWrap = 50; 
		    $mail->IsHTML(true);     
		    $mail->CharSet = 'UTF-8';  
		    $mail->Subject  =  utf8_decode('Restablecer contraseña');
		    $mail->Body     =  $msg;

			$mail->IsSMTP(); 
		    $mail->Host = "smtp.gmail.com";
		    $mail->Port = 587;
    		$mail->SMTPSecure = 'tls';
		    $mail->SMTPAuth = true; 
		    $mail->Username = $mailFrom;
		    $mail->Password = "prueba2236";

		    if(!$mail->send())
		    	return false;
		    else
		    	return true;
		}

		// :::::::::: UTILIZAR CUANDO EL SERVIDOR NO PERMITE USAR PHPMAILER :::::::::
		// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
		// **************************** [ MAIL NORMAL ] *****************************
		public function enviarMailMN($mailTo, $nameTo, $cuerpo, $subject, $copia){
			$headers  = 'MIME-Version: 1.0'."\r\n";
		    $headers .= 'Content-type: text/html; charset=iso-8859-1'."\r\n";
		    $headers .= 'From: Grupo Publicitario Heraldos <grupoheraldos@gmail.com>'."\r\n";

		    mail($mailTo, utf8_decode("Información de Usuario"), $cuerpo, $headers);
		}

		public function mailClienteMN($mailTo, $nameTo, $cuerpo, $subject, $copia){
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
									'<h3 style="font: 21px Helvetica Neue,Helvetica,Arial,sans-serif;">Apreciable Cliente:</h3>'.
									'<p style="font: 15px Helvetica Neue,Helvetica,Arial,sans-serif;">'.
										'Se le informa que se ha habilitado un nuevo trabajo de '.$cuerpo.'. Lo invitamos a ingresar a nuestra plataforma para comenzar su configuración.'.
										'<br><br><a href="http://'.$_SERVER["HTTP_HOST"].dirname(dirname($_SERVER['REQUEST_URI'])).'"><button style="'.$btn.'color: #FFFFFF;background-color: #663399;border-color: #663399;padding: 1px 5px;font-size: 12px;line-height: 1.5;border-radius: 3px;">Sitio del Grupo Heraldos</button></a>'.
									'</p>'.
									'</div>'.
								'</div>'.
							'</div>'.
						'</body>'.
					'</html>';
			
		    $headers  = 'MIME-Version: 1.0'."\r\n";
		    $headers .= 'Content-type: text/html; charset=iso-8859-1'."\r\n";
		    $headers .= 'From: Grupo Publicitario Heraldos <grupoheraldos@gmail.com>'."\r\n";
		    $headers .= 'Bcc: [email]';
		    if(count($copia) > 0){
		    	for($c = 1; $c < count($copia); $c++){
		    		if($c > 1)
		    			$headers .= ',';
		    		$headers .= $copia[$c];
		    	}
		    }
		    $headers .= '[/email]'."\r\n";
		    mail($mailTo, $subject, $msg, $headers);
		}

		public function correoPassMN($correo, $nombre, $pass){
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
									'<h3 style="font: 21px Helvetica Neue,Helvetica,Arial,sans-serif;">Apreciable '.$nombre.'</h3>'.
									'<p style="font: 15px Helvetica Neue,Helvetica,Arial,sans-serif;">'.
										'El Grupo Heraldos le da la bienvenida y agradece su preferencia. Para brindarle un mejor servicio ponemos a su dispocisión nuestra herramienta de configuración de trabajos del Grupo Heraldos.'.
										'<br>Su usuario y contraseña son:<br><br><b>Usuario: </b>'.$correo.'<br><b>Contraseña: </b>'.$pass.
										'<br><br><b><i> - Puede cambiar su contraseña de inicio de sesión en la plataforma.</i></b>'.
										'<br><br><a href="http://'.$_SERVER["HTTP_HOST"].dirname(dirname($_SERVER['REQUEST_URI'])).'"><button style="'.$btn.'color: #FFFFFF;background-color: #663399;border-color: #663399;padding: 1px 5px;font-size: 12px;line-height: 1.5;border-radius: 3px;">Ir al sitio Grupo Heraldos</button></a>'.
									'</p>'.
									'</div>'.
								'</div>'.
							'</div>'.
						'</body>'.
					'</html>';
			$headers  = 'MIME-Version: 1.0'."\r\n";
		    $headers .= 'Content-type: text/html; charset=iso-8859-1'."\r\n";
		    $headers .= 'From: Grupo Publicitario Heraldos <grupoheraldos@gmail.com>'."\r\n";

		    mail($correo, utf8_decode("Información de Usuario"), $msg, $headers);
		}

		public function correoProveedorMN($correo, $nombre, $idTrab, $sucursal){
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
									'<h3 style="font: 21px Helvetica Neue,Helvetica,Arial,sans-serif;">Apreciable '.$nombre.'</h3>'.
									'<p style="font: 15px Helvetica Neue,Helvetica,Arial,sans-serif;">'.
										'Se le informa que se ha habilitado la opción de asignar fecha de inicio y término del trabajo con ID <b>No. "'.$idTrab.'"</b> para la sucursal <b>'.$sucursal.'</b>.'.
										'<br>Lo invitamos a que configure su rol de trabajo en la plataforma.'.
										'<br><br><a href="http://'.$_SERVER["HTTP_HOST"].dirname(dirname($_SERVER['REQUEST_URI'])).'"><button style="'.$btn.'color: #FFFFFF;background-color: #663399;border-color: #663399;padding: 1px 5px;font-size: 12px;line-height: 1.5;border-radius: 3px;">Ir al sitio Grupo Heraldos</button></a>'.
									'</p>'.
									'</div>'.
								'</div>'.
							'</div>'.
						'</body>'.
					'</html>';
			$headers  = 'MIME-Version: 1.0'."\r\n";
		    $headers .= 'Content-type: text/html; charset=iso-8859-1'."\r\n";
		    $headers .= 'From: Grupo Publicitario Heraldos <grupoheraldos@gmail.com>'."\r\n";

		    mail($correo, utf8_decode("Información de Usuario"), $msg, $headers);
		}

		public function correoReenvioMN($correo, $nombre, $idTrab, $sucursal, $tipo, $correos){
			$btn = 'display: inline-block;padding: 6px 12px;margin-bottom: 0;font-size: 14px;font-weight: normal;line-height: 1.42857143;text-align: center;white-space: nowrap;vertical-align: middle;-ms-touch-action: manipulation;touch-action: manipulation;cursor: pointer;-webkit-user-select: none;-moz-user-select: none;-ms-user-select: none;user-select: none;background-image: none;border: 1px solid transparent;border-radius: 4px;';
			if($tipo === 'PROVEEDOR'){
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
										'<h3 style="font: 21px Helvetica Neue,Helvetica,Arial,sans-serif;">Apreciable '.$nombre.'</h3>'.
										'<p style="font: 15px Helvetica Neue,Helvetica,Arial,sans-serif;">'.
											'Se le informa que su propuesta de fecha de inicio y término del trabajo con ID <b>No. "'.$idTrab.'"</b> para la sucursal <b>'.$sucursal.'</b> necesita ser editada.'.
											'<br>Lo invitamos a que vaya a la plataforma para realizar dicha acción. Si tiene alguna duda, haganos el favor de contactarnos<br><b>Le enviamos un saludo.</b>'.
											'<br><br><a href="http://'.$_SERVER["HTTP_HOST"].dirname(dirname($_SERVER['REQUEST_URI'])).'"><button style="'.$btn.'color: #FFFFFF;background-color: #663399;border-color: #663399;padding: 1px 5px;font-size: 12px;line-height: 1.5;border-radius: 3px;">Ir al sitio Grupo Heraldos</button></a>'.
										'</p>'.
										'</div>'.
									'</div>'.
								'</div>'.
							'</body>'.
						'</html>';
			}else if($tipo === 'CLIENTE'){
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
										'<h3 style="font: 21px Helvetica Neue,Helvetica,Arial,sans-serif;">Apreciable Cliente:</h3>'.
										'<p style="font: 15px Helvetica Neue,Helvetica,Arial,sans-serif;">'.
											'Se le informa que la configuracion realizada del trabajo con ID <b>No. "'.$idTrab.'"</b> para la sucursal <b>'.$sucursal.'</b> necesita ser editada.'.
											'<br>Lo invitamos a que vaya a la plataforma para realizar dicha acción. Si tiene alguna duda, háganos el favor de contactarnos<br><b>Le enviamos un saludo.</b>'.
											'<br><br><a href="http://'.$_SERVER["HTTP_HOST"].dirname(dirname($_SERVER['REQUEST_URI'])).'"><button style="'.$btn.'color: #FFFFFF;background-color: #663399;border-color: #663399;padding: 1px 5px;font-size: 12px;line-height: 1.5;border-radius: 3px;">Ir al sitio Grupo Heraldos</button></a>'.
										'</p>'.
										'</div>'.
									'</div>'.
								'</div>'.
							'</body>'.
						'</html>';
			}
			$headers  = 'MIME-Version: 1.0'."\r\n";
		    $headers .= 'Content-type: text/html; charset=iso-8859-1'."\r\n";
		    $headers .= 'From: Grupo Publicitario Heraldos <grupoheraldos@gmail.com>'."\r\n";
			if($tipo === 'CLIENTE'){
				$headers .= 'Bcc: [email]';
				if(count($correos) > 0){
		    		for($c = 0; $c < count($correos); $c++){
		    			if($c > 1)
		    				$headers .= ',';
		    			$headers .= $copia[$c];
		    		}
		    	}
		    	$headers .= '[/email]'."\r\n";
			}

		    mail($correo, utf8_decode("Reenvío de información"), $msg, $headers);
		}

		public function resetPassMN($correo, $nombre, $pass){
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
									'<h3 style="font: 21px Helvetica Neue,Helvetica,Arial,sans-serif;">Apreciable '.$nombre.'</h3>'.
									'<p style="font: 15px Helvetica Neue,Helvetica,Arial,sans-serif;">'.
										'Le informamos que su contraseña ha sido reestablecida con exito. Solo USTED conoce esta nueva contraseña, y para su total comodidad lo invitamos a cambiarla en la plataforma del Grupo Heraldos.'.
										'<br><br><b>Su nueva contraseña: </b>'.$pass.
										'<br><br><b><i> - Recuerde que su contraseña puede cambiarla en el sistema.</i></b>'.
										'<br><br><a href="http://'.$_SERVER["HTTP_HOST"].dirname(dirname($_SERVER['REQUEST_URI'])).'"><button style="'.$btn.'color: #FFFFFF;background-color: #663399;border-color: #663399;padding: 1px 5px;font-size: 12px;line-height: 1.5;border-radius: 3px;">Ir al sitio Grupo Heraldos</button></a>'.
									'</p>'.
									'</div>'.
								'</div>'.
							'</div>'.
						'</body>'.
					'</html>';
			$headers  = 'MIME-Version: 1.0'."\r\n";
		    $headers .= 'Content-type: text/html; charset=iso-8859-1'."\r\n";
		    $headers .= 'From: Grupo Publicitario Heraldos <grupoheraldos@gmail.com>'."\r\n";

		    mail($correo, utf8_decode("Cambio de Contraseña"), $msg, $headers);
		}

	}
	
?>
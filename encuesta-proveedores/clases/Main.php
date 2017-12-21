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

		public function log($texto){
			$myfile = fopen("log.txt", "a") or die("Unable to open file!");

			// $log = $clientes[0]->nombre.'--';

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

		public function sendMailLocal($msg, $subject, $bcc = ""){

			$mailFrom = 'pruebas.de.correo.angel@gmail.com';

			require("../plugins/PHPMailer-maste/PHPMailerAutoload.php");
			
			$mail = new PHPMailer();

		    $mail->SetLanguage( 'es', '../PHPMailer-maste/includes/language/' );
		                    
		    $mail->From     = $mailFrom;    // Correo Electronico para SMTP 
		    $mail->FromName = 'Contacto Anadic'; //anadic_pruebas
		    $mail->AddAddress($mailFrom); // Dirección a la que llegaran los mensajes

		    if($bcc != "")
		    	$mail->AddBCC($bcc); // copia oculta

		    $mail->WordWrap = 50; 
		    $mail->IsHTML(true);     
		    $mail->Subject  =  utf8_decode($subject);
		    $mail->Body     =  $msg;

			$mail->IsSMTP(); 
		    $mail->Host = "smtp.gmail.com";  // mail. o solo dominio - Servidor de 
		    $mail->Port = 587;
    		$mail->SMTPSecure = 'tls';
		    $mail->SMTPAuth = true; 
		    $mail->Username = $mailFrom;  // Correo Electrónico para SMTP correo@dominio
		    $mail->Password = "pruebasdecorreo"; // Contraseña para SMTP

		    if(!$mail->send())
		    	return false;
		    else
		    	return true;

		 //    if (!$mail->send())
			//     echo "Mailer Error: " . $mail->ErrorInfo;
			// else
			//     echo "Mensaje enviado!";

		}

		public function sendMail($msg, $subject, $bcc = ""){


			$mailFrom = 'angeltorres@tecnologiascositec.com';

			require("../plugins/PHPMailer-maste/PHPMailerAutoload.php");
			
			$mail = new PHPMailer();

		    $mail->SetLanguage( 'es', '../PHPMailer-maste/includes/language/' );
		                    
		    $mail->From     = $mailFrom;    // Correo Electronico para SMTP 
		    $mail->FromName = 'Cotizador'; 
		    $mail->AddAddress($mailFrom); // Dirección a la que llegaran los mensajes
		    
		    if($bcc != "")
		    	$mail->AddBCC($bcc); // copia oculta

		    $mail->WordWrap = 50; 
		    $mail->IsHTML(true);     
		    $mail->Subject  =  utf8_decode($subject);
		    $mail->Body     =  $msg;

			$mail->IsSMTP(); 
		    $mail->Host = "tecnologiascositec.com";  // mail. o solo dominio - Servidor de 
		    $mail->SMTPAuth = true; 
		    $mail->Username = $mailFrom;  // Correo Electrónico para SMTP correo@dominio
		    $mail->Password = "Thekamitorres!"; // Contraseña para SMTP

		    if(!$mail->send())
		    	return false;
		    else
		    	return true;


		}

		

	}
	
?>
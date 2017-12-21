<?php

$emailDestino = $_POST['email'];
$nombre = $_POST['nombre'];
$tel = $_POST['tel'];
$cotizacion = $_POST['cotizacion'];
$total = $_POST['total'];

$tbody = '';


for ($i = 0; $i < count($cotizacion); $i++) { 
	$body .= '<tr>
				<td class="row1">'.$cotizacion[$i]["name"].'</td>
				<td class="row2">'.$cotizacion[$i]["gender"].'</td>
				<td class="row3">$'.$cotizacion[$i]["costo_prorrateo"].'</td>
			  </tr>';
}

$body .= '<tr>
			<td class="row1 row-invisible"> </td>
			<td class="row2 row-total">TOTAL: </td>
			<td class="row3 row-total">$'.$total.'</td>
		  </tr>';
//SMTP needs accurate times, and the PHP time zone MUST be set
//This should be done in your php.ini, but this is how to do it if you don't have access to that
date_default_timezone_set('Etc/UTC');

require '../PHPMailerAutoload.php';

//Create a new PHPMailer instance
$mail = new PHPMailer;

//Tell PHPMailer to use SMTP
$mail->isSMTP();

//Enable SMTP debugging
// 0 = off (for production use)
// 1 = client messages
// 2 = client and server messages
$mail->SMTPDebug = 0;

//Ask for HTML-friendly debug output
$mail->Debugoutput = 'html';

//Set the hostname of the mail server
$mail->Host = 'smtp.gmail.com';

//Set the SMTP port number - 587 for authenticated TLS, a.k.a. RFC4409 SMTP submission
$mail->Port = 587;

//Set the encryption system to use - ssl (deprecated) or tls
$mail->SMTPSecure = 'tls';

//Whether to use SMTP authentication
$mail->SMTPAuth = TRUE;

//Username to use for SMTP authentication - use full email address for gmail
$mail->Username = "pruebas.de.correo.angel@gmail.com";

//Password to use for SMTP authentication
$mail->Password = "pruebasdecorreo"; 

//Set who the message is to be sent from
$mail->setFrom('pruebas.de.corre.angel@gmail.com', 'Cotizador');

//Set an alternative reply-to address
//$mail->addReplyTo('replyto@example.com', 'First Last');

//Set who the message is to be sent to
$mail->addAddress($emailDestino, utf8_decode($nombre));
// $mail->addAddress('thekamitorres@gmail.com', 'Cliente');

//Set the subject line
$mensaje = utf8_decode('Tu cotización ha sido enviada!');
$mail->Subject = $mensaje;

//Read an HTML message body from an external file, convert referenced images to embedded,
//convert HTML into a basic plain-text alternative body
//$mail->msgHTML(file_get_contents('contentsutf8.html'), dirname(__FILE__));
$mail->Body = '
			<head>
				<meta charset="utf-8">
				<style>
					table, td, th { 
					  border-collapse: collapse;
					  border: solid 1px; 
					  width: 640px;
					}
					th{
						background-color: #dbdbdb;
					}
					.div-main{
						width: 640px; 
						font-family: Arial, Helvetica, sans-serif; 
						font-size: 11px;
					}
					.row1{
						width: 350px
					}
					.row2{
						width: 160px;
					}
					.row3{
						width: 160px;
					}
					.row-total{
						background-color: yellow;
						color: black;
					}
					.row-invisible{
						border-color: transparent black transparent transparent;
					}
				</style>
			</head>
				
			<div class="div-main">
				<br>
				<b>
					Contacto
					<br>
					Nombre: '.$nombre.'
					<br>
					Teléfono: '.$tel.'
					<br>
					e-mail: '.$emailDestino.'
				</b>
				<br><br>
				<table>
					<thead>
						<tr>
							<th class="row1">Nombre</th>
							<th class="row2">Genero</th>
							<th class="row3">Costo</th>
						</tr>
					</thead>
					<tbody>
						'.$body.'
					</tbody>
				</table>
				<i></i><p>El total mostrado incluye iva mas $180.00 de la constancia expedida valida hasta el 19 de Julio del ano en curso<sup>*</sup></p></i>
				<br><br>
				<h2>
					'.$nombre.', gracias por ponerse en contacto. A la brevedad uno de nuestros asesores se comunicará con usted al telefono '.$tel.' donde con gusto atenderá todas sus dudas.
				</h2>
			</div>';
			 
//Replace the plain text body with one created manually
$mail->AltBody = 'Gracias por ponerse en contacto, a la brevedad uno de nuestros asesores se comunicará con usted.';

//Attach an image file
//$mail->addAttachment('images/phpmailer_mini.png');

//send the message, check for errors
if (!$mail->send())
    echo "Mailer Error: " . $mail->ErrorInfo;
else
    echo "Mensaje enviado!";

?>
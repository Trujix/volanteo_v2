<?php  
	
	require('Mysql.php');

	Class Vigencia extends Mysql{

		public function statusDia($info){
			$traerTrabajos = $this->query_assoc("SELECT T.*, C.nombre FROM trabajos T JOIN clientes C ON C.idcliente = T.idcliente WHERE T.periodofin <= CURRENT_DATE + INTERVAL 5 DAY AND T.periodofin >= CURRENT_DATE");
			if(count($traerTrabajos) > 0){

				$url = $_SERVER['HTTP_REFERER'];
				$folders = explode('/', $url);
				$web = $_SERVER['HTTP_HOST'];
				for ($i = 3; $i < count($folders) - 1; $i++){
					$web .= "/".$folders[$i];
				}

				$cuerpoHTML = "";
				$label = 'display: inline;padding: .2em .6em .3em;font-size: 75%;font-weight: bold;line-height: 1;text-align: center;white-space: nowrap;vertical-align: baseline;border-radius: .25em;';
				for($i = 0; $i < count($traerTrabajos); $i++){
					if($i > 0){
						$cuerpoHTML .= '<hr>';
					}

					$cuerpoHTML .= '<p><b>ID Trabajo: </b>'.$traerTrabajos[$i]["idtrabajo"].' - <b>Alias: </b>'.$traerTrabajos[$i]["alias"].' - <b>Cliente: </b>'.$traerTrabajos[$i]["nombre"].'</p>';
					if($traerTrabajos[$i]["status"] === "1"){
						$cuerpoHTML .= '<h2><label style="color: #fff;background-color: #87d37C;border-color: #87d37C;'.$label.'">Alta Completa</label></h2>';
					}else if($traerTrabajos[$i]["status"] === "2"){
						$cuerpoHTML .= '<h2><label style="color: #fff;background-color: #1E824C;border-color: #1E824C;'.$label.'">Alta Incompleta</label></h2>';
					}else if($traerTrabajos[$i]["status"] === "3"){

						$cuerpoHTML .= '<h2><label style="color: #fff;background-color: #d9534f;border-color: #d43f3a;'.$label.'">Seguimiento</label></h2><p><b>Presione el boton para dar por realizada las actividades a continuación enlistadas:</b></p>';
						
						$traerPendientes = $this->query_assoc("SELECT * FROM alertas_trabajos WHERE idtrabajo = ".$traerTrabajos[$i]['idtrabajo']);
						$btn = 'display: inline-block;padding: 6px 12px;margin-bottom: 0;font-size: 14px;font-weight: normal;line-height: 1.42857143;text-align: center;white-space: nowrap;vertical-align: middle;-ms-touch-action: manipulation;touch-action: manipulation;cursor: pointer;-webkit-user-select: none;-moz-user-select: none;-ms-user-select: none;user-select: none;background-image: none;border: 1px solid transparent;border-radius: 4px;';
						if($traerPendientes[0]['verifsumin'] === "0"){
							$cuerpoHTML .= '&nbsp;&nbsp;&nbsp;&nbsp;<b>- </b><a href="http://'.$_SERVER["HTTP_HOST"].dirname(dirname($_SERVER['REQUEST_URI'])).'/statusPendiente.php?row=verifsumin;idTrab='.$traerTrabajos[$i]["idtrabajo"].'"><button style="'.$btn.'color: #333;background-color: #fff;border-color: #ccc;padding: 1px 5px;font-size: 12px;line-height: 1.5;border-radius: 3px;">Suministros verificados</button></a><p></p>';
						}
						if($traerPendientes[0]['sumincompleto'] === "0"){
							$cuerpoHTML .= '&nbsp;&nbsp;&nbsp;&nbsp;<b>- </b><a href="http://'.$_SERVER["HTTP_HOST"].dirname(dirname($_SERVER['REQUEST_URI'])).'/statusPendiente.php?row=sumincompleto;idTrab='.$traerTrabajos[$i]["idtrabajo"].'"><button style="'.$btn.'color: #333;background-color: #fff;border-color: #ccc;padding: 1px 5px;font-size: 12px;line-height: 1.5;border-radius: 3px;">Suministros Completos</button></a><p></p>';
						}
						if($traerPendientes[0]['llamarprovs'] === "0"){
							$cuerpoHTML .= '&nbsp;&nbsp;&nbsp;&nbsp;<b>- </b><a href="http://'.$_SERVER["HTTP_HOST"].dirname(dirname($_SERVER['REQUEST_URI'])).'/statusPendiente.php?row=llamarprovs;idTrab='.$traerTrabajos[$i]["idtrabajo"].'"><button style="'.$btn.'color: #333;background-color: #fff;border-color: #ccc;padding: 1px 5px;font-size: 12px;line-height: 1.5;border-radius: 3px;">Llamar proveedores</button></a><p></p>';
						}
						if($traerPendientes[0]['suminentregados'] === "0"){
							$cuerpoHTML .= '&nbsp;&nbsp;&nbsp;&nbsp;<b>- </b><a href="http://'.$_SERVER["HTTP_HOST"].dirname(dirname($_SERVER['REQUEST_URI'])).'/statusPendiente.php?row=suminentregados;idTrab='.$traerTrabajos[$i]["idtrabajo"].'"><button style="'.$btn.'color: #333;background-color: #fff;border-color: #ccc;padding: 1px 5px;font-size: 12px;line-height: 1.5;border-radius: 3px;">Suministros entregados</button></a>';
						}
					}else if($traerTrabajos[$i]["status"] === "4"){
						$cuerpoHTML .= '<h2><label style="color: #fff;background-color: #F1A9A0;border-color: #F1A9A0;'.$label.'">Seguimiento completo</label></h2>';
					}else if($traerTrabajos[$i]["status"] === "5"){
						$cuerpoHTML .= '<h2><label style="color: #fff;background-color: #D35400;border-color: #D35400;'.$label.'">Enviar Mail al cliente</label></h2>';
					}else if($traerTrabajos[$i]["status"] === "6"){
						$cuerpoHTML .= '<h2><label style="color: #000000;background-color: #F0E3A7;border-color: #F0E3A7;'.$label.'">Envio Completo</label></h2>';
					}else if($traerTrabajos[$i]["status"] === "7"){
						$cuerpoHTML .= '<h2><label style="color: #fff;background-color: #337ab7;border-color: #2e6da4;'.$label.'">Verificar Propuesta cliente</label></h2>';
					}else if($traerTrabajos[$i]["status"] === "8"){
						$cuerpoHTML .= '<h2><label style="color: #fff;background-color: #5bc0de;border-color: #46b8da;'.$label.'">Propuesta Terminada</label></h2>'.
								'<p><b>Este trabajo está listo para:</b></p><h2><label style="color: #fff;background-color: #663399;border-color: #663399;'.$label.'">Enviar a Proveedor(es)</label></h2>';
					}else if($traerTrabajos[$i]["status"] === "10"){
						$cuerpoHTML .= '<h2><label style="color: #fff;background-color: #9A12B3;border-color: #9A12B3;'.$label.'">Verificar Roles de Trabajo</label></h2>';
					}else if($traerTrabajos[$i]["status"] === "11"){
						$cuerpoHTML .= '<h2><label style="color: #000000;background-color: #BE90D4;border-color: #BE90D4;'.$label.'">Roles de Trabajo Enviados</label></h2>';
					}else if($traerTrabajos[$i]["status"] === "12"){
						$cuerpoHTML .= '<h2><label style="color: #fff;background-color: #87d37C;border-color: #87d37C;'.$label.'">Trabajo Iniciado</label></h2>';
					}else if($traerTrabajos[$i]["status"] === "13"){
						$cuerpoHTML .= '<h2><label style="color: #fff;background-color: #00B16A;border-color: #00B16A;'.$label.'">Trabajo Terminado</label></h2>';
					}
				}
				$correoHeraldos = json_decode(file_get_contents("../params/mailAdminJSON.json"), true)["MailAdmin"];
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
											'*CUERPO*'.
										'</div>'.
									'</div>'.
								'</div>'.
							'</body>'.
							'</html>';
				$msg = str_replace("*CUERPO*", $cuerpoHTML, $msg);
					
				$mail = $this->enviarMail($correoHeraldos, "Notificacion - Trabajos pendientes", utf8_decode($msg), "Notificacion - Prueba", "");
				//mail($correo, "Trabajo para proveedor", utf8_decode($msg), "Content-type: text/html; charset=iso-8859-1\r\nFrom: Grupo Publicitario Heraldos <contacto@grupoheraldos.com.mx>");
			}
			
			// POSIBLEMENTE PASAREMOS ESTE SCRIPT A OTRO CORN JOB
			// FUNCION QUE ACTUALIZA LA TABLA TRABAJOS SEGUN EL STATUS DE LOS TRABAJOS POR PROVEEDOR
			$trabajosStatus = $this->query_assoc("SELECT idtrabajo FROM trabajos WHERE status = 12");
			if(count($trabajosStatus) > 0){
				for($i = 0; $i < count($trabajosStatus); $i++){
					$suma = $this->query_assoc("SELECT SUM(status) AS suma FROM config_trabajo_proveedor WHERE idtrabajo = ".$trabajosStatus[$i]['idtrabajo']);
					if(intval($suma[0]['suma']) === 0){
						$idStatus = $trabajosStatus[$i]['idtrabajo'];
						$this->query("CALL SP_STATUSTRABAJO('$idStatus','13')");
					}
				}	
			}

		}

	}

?>
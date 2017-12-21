<?php
	$return = Array('ok'=>TRUE);
	$upload_folder = '../kmlfiles';
	$nombre_archivo = $_POST['nombre'];
	$tmp_archivo = $_FILES['archivo']['tmp_name'];
	$archivador = $upload_folder . '/' . $nombre_archivo;

	if (!move_uploaded_file($tmp_archivo, $archivador)) {
		$return = Array('ok' => FALSE, 'msg' => "Ocurrio un error al subir el archivo. No pudo guardarse.", 'status' => 'error');
	}
	echo json_encode($return);
?>
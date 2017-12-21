<?php

	require_once("../clases/Encuesta.class.php");

	$Encuesta = new Encuesta();

	if(isset($_POST['info']))
		$info = $_POST['info'];

	$action = $_POST['action'];

	switch ($action) {
		case 'create':
			echo json_encode($Encuesta->create($info));
			break;
		case 'guardar_info':
			echo json_encode($Encuesta->guardar_info($info));
			break;
		case 'cargar_detalles':
			echo json_encode($Encuesta->cargar_detalles($info));
			break;
		case 'cargar_respuestas':
			echo json_encode($Encuesta->cargar_respuestas($info));
			break;
	}

?>

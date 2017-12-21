<?php
	session_start();

	require('../clases/ConfigTrabajo.php');

	$ConfigTrabajo = new ConfigTrabajo();

	$action = $_POST['action'];
	
	if(isset($_POST['info']))
		$info = $_POST['info'];

	switch ($action) {
		case 'consultarMail':
			echo json_encode($ConfigTrabajo->verifMail($info));
			break;
		case 'traerPoligEdo':
			echo json_encode($ConfigTrabajo->traerPoligEdo($info));
			break;
		case 'traerPoligMun':
			echo json_encode($ConfigTrabajo->traerPoligMun($info));
			break;
		case 'todosPolig':
			echo json_encode($ConfigTrabajo->todosPolig($info));
			break;
		case 'traerZona':
			echo json_encode($ConfigTrabajo->traerZona($info));
			break;
		case 'traerPoligZona':
			echo json_encode($ConfigTrabajo->traerPoligZona($info));
			break;
		case 'traerPolig':
			echo json_encode($ConfigTrabajo->traerPolig($info));
			break;
		case 'guardarConfig':
			echo json_encode($ConfigTrabajo->guardarConfig($info));
			break;
		case 'restConfig':
			echo json_encode($ConfigTrabajo->restConfig($info));
			break;
		case 'edicionMailCliente':
			echo json_encode($ConfigTrabajo->edicionMailCliente($info));
			break;

		// *********** NUEVAS FUNCIONES ************
		// ::::::::::::: [ 11/18/2017 ] ::::::::::::
		case 'consultarMailPerif':
			echo json_encode($ConfigTrabajo->consultarMailPerif($info));
			break;
		case 'guardarConfigPerif':
			echo json_encode($ConfigTrabajo->guardarConfigPerif($info));
			break;
		// *********** NUEVAS FUNCIONES ************
		// ::::::::::::: [ 12/17/2017 ] ::::::::::::
		case 'restaurarConfigPerif':
			echo json_encode($ConfigTrabajo->restaurarConfigPerif($info));
			break;
	}
?>
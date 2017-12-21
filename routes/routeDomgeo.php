<?php  
	
	session_start();

	require('../clases/Domgeo.php');

	$Domgeo = new Domgeo();

	$action = $_POST['action'];
	
	if(isset($_POST['info']))
		$info = $_POST['info'];

	switch ($action) {
		case 'edo':
			echo json_encode($Domgeo->getEstados());
			break;
		case 'mun':
			echo json_encode($Domgeo->getMunicipios($info));
			break;
		case 'loc':
			echo json_encode($Domgeo->getLocalidades($info));
			break;
		case 'col':
			echo json_encode($Domgeo->getAsentamientos($info));
			break;
		case 'cp':
			echo json_encode($Domgeo->getCodigopostal($info));
			break;
		case 'getinfo':
			echo json_encode($Domgeo->getInfoByCP($info));
			break;
	}
	
?>
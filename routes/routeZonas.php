<?php  
	
	session_start();

	require('../clases/Zona.php');

	$Zona = new Zona();

	$action = $_POST['action'];
	
	if(isset($_POST['info']))
		$info = $_POST['info'];

	switch ($action) {
		case 'create':
			echo json_encode($Zona->create($info));
			break;
		case 'read':
			echo json_encode($Zona->read($info));
			break;
		case 'update':
			echo json_encode($Zona->update($info));
			break;
		case 'delete':
			echo json_encode($Zona->delete($info));
			break;
		case 'get':
			echo json_encode($Zona->get($info));
			break;
	}
	
?>
<?php  
	
	session_start();

	require('../clases/Statuspendiente.php');

	$Statuspendiente = new Statuspendiente();

	$action = $_POST['action'];
	
	if(isset($_POST['info']))
		$info = $_POST['info'];

	switch ($action) {
		case 'activarPendiente':
			echo json_encode($Statuspendiente->activarPendiente($info));
			break;
	}
	
?>
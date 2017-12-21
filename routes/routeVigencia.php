<?php  
	
	session_start();

	require('../clases/Vigencia.php');

	$Vigencia = new Vigencia();

	$action = $_POST['action'];
	
	if(isset($_POST['info']))
		$info = $_POST['info'];

	switch ($action) {
		case 'statusDia':
			echo json_encode($Vigencia->statusDia($info));
			break;
		case 'enviarAlerta':
			echo json_encode($Vigencia->enviarAlerta($info));
			break;
	}
	
?>
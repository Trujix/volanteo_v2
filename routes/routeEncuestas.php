<?php  

	require('../clases/Encuesta.php');
	$Encuesta = new Encuesta();


	if(isset($_POST['info']))
		$info = $_POST['info'];

	$action = $_POST['action'];

	switch ($action) {
		case 'read':
			echo json_encode($Encuesta->read());
 			break;

	}
	
?>
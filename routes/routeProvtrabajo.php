<?php
	session_start();

	require('../clases/Provtrabajo.php');

	$Provtrabajo = new Provtrabajo();

	$action = $_POST['action'];
	
	if(isset($_POST['info']))
		$info = $_POST['info'];

	switch ($action) {
		case 'consultarMail':
			echo json_encode($Provtrabajo->verifMail($info));
			break;
		case 'actTrabajoPorvs':
			echo json_encode($Provtrabajo->actTrabajoPorvs($info));
			break;
	}
?>
<?php  
	
	session_start();

	require('../clases/Configuracion.php');

	$Configuracion = new Configuracion();

	$action = $_POST['action'];
	
	if(isset($_POST['info']))
		$info = $_POST['info'];

	switch ($action) {
		case 'traerUsers':
			echo json_encode($Configuracion->traerUsers($info));
			break;
		case 'traerMail':
			echo json_encode($Configuracion->traerMail($info));
			break;
		case 'resetUserPass':
			echo json_encode($Configuracion->resetUserPass($info));
			break;
		case 'resetUserAdm':
			echo json_encode($Configuracion->resetUserAdm($info));
			break;
	}
	
?>
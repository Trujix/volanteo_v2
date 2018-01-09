<?php  
	
	session_start();

	require('../clases/Configuracion.php');

	$Configuracion = new Configuracion();

	$action = $_POST['action'];
	
	if(isset($_POST['info']))
		$info = $_POST['info'];

	switch ($action) {
		// **** PERMISOS - OBTENCION DE FUNCION ESTANDARIZADA ****
		case 'verifUsuarioPermiso':
			echo $Configuracion->verifUsuarioPermiso($info);
			break;
		case 'traerListaModulos':
			echo json_encode($Configuracion->traerListaModulos());
			break;
		// **** PERMISOS - OBTENCION DE FUNCION ESTANDARIZADA ****

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
		// ******* 03/01/2017 ********
		case 'altaUsuario':
			echo json_encode($Configuracion->altaUsuario($info));
			break;
		case 'verifUsuario':
			echo json_encode($Configuracion->verifUsuario());
			break;
		case 'traerUsuariosSistema':
			echo json_encode($Configuracion->traerUsuariosSistema());
			break;
		case 'traerUsuarioInfo':
			echo json_encode($Configuracion->traerUsuarioInfo($info));
			break;
		case 'editarPermisosUsuario':
			echo json_encode($Configuracion->editarPermisosUsuario($info));
			break;
	}
	
?>
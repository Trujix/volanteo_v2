<?php  
	
	session_start();

	require('../clases/Trabajo.php');

	$Trabajo = new Trabajo();

	$action = $_POST['action'];
	
	if(isset($_POST['info']))
		$info = $_POST['info'];

	switch ($action) {
		case 'step3':
			echo json_encode($Trabajo->getStep3($info));
			break;
		case 'create':
			echo json_encode($Trabajo->create($info));
			break;
		case 'edit':
			echo json_encode($Trabajo->edit($info));
			break;
		case 'showNivel1':
			echo json_encode($Trabajo->showNivel1());
			break;
		case 'showNivel2':
			echo json_encode($Trabajo->showNivel2($info));
			break;
		case 'showNivel3':
			echo json_encode($Trabajo->showNivel3($info));
			break;
		case 'accionTrabajos':
			echo json_encode($Trabajo->accionTrabajos($info));
			break;
		case 'traerAccionTrabajos':
			echo json_encode($Trabajo->traerAccionTrabajos($info));
			break;
		case 'editarTrabajo':
			echo json_encode($Trabajo->editarTrabajo($info));
			break;
		case 'eliminarTrabajo':
			echo json_encode($Trabajo->eliminarTrabajo($info));
			break;
		// FUNCIONES CON MAIL, CLIENTES Y TRABAJOS
		case 'verifMail':
			echo json_encode($Trabajo->verifMail($info));
			break;
		case 'generarMail':
			echo json_encode($Trabajo->generarMail($info));
			break;
		case 'traerMail':
			echo json_encode($Trabajo->traerMail($info));
			break;
		case 'edicionMailCliente':
			echo json_encode($Trabajo->edicionMailCliente($info));
			break;
		case 'enviarMailProveedor':
			echo json_encode($Trabajo->enviarMailProveedor($info));
			break;
		case 'comenzarSeguimiento':
			echo json_encode($Trabajo->comenzarSeguimiento($info));
			break;
		case 'configCliente':
			echo json_encode($Trabajo->configCliente($info));
			break;
		case 'guardarRoles':
			echo json_encode($Trabajo->guardarRoles($info));
			break;
		case 'mostrarRoles':
			echo json_encode($Trabajo->mostrarRoles($info));
			break;
		case 'reenvioRoles':
			echo json_encode($Trabajo->reenvioRoles($info));
			break;
		case 'pendientesNivel3':
			echo json_encode($Trabajo->pendientesNivel3($info));
			break;
		case 'cambiarStatusNvl3':
			echo json_encode($Trabajo->cambiarStatusNvl3($info));
			break;
		case 'getEstadistica':
			echo json_encode($Trabajo->getEstadistica($info));
			break;
		// ::::::::: [22/07/2017] ::::::::::::
		// FUNCIONES NUEVAS
		case 'traerBloques':
			echo json_encode($Trabajo->traerBloques($info));
			break;
		case 'traerSucursales':
			echo json_encode($Trabajo->traerSucursales($info));
			break;
		case 'domgeoSucursales':
			echo json_encode($Trabajo->domgeoSucursales($info));
			break;
		case 'sucsData':
			echo json_encode($Trabajo->sucsData($info));
			break;
		case 'eliminarPorpProv':
			echo json_encode($Trabajo->eliminarPorpProv($info));
			break;
		// ::::::::: [18/11/2017] ::::::::::::
		// FUNCIONES NUEVAS
		case 'verifSucursalesPerifoneoP1':
			echo json_encode($Trabajo->verifSucursalesPerifoneoP1($info));
			break;
		case 'configPerifoneo':
			echo json_encode($Trabajo->configPerifoneo($info));
			break;
		case 'traerConfigPerifoneo':
			echo json_encode($Trabajo->traerConfigPerifoneo($info));
			break;
		case 'editarConfigPerifoneo':
			echo json_encode($Trabajo->editarConfigPerifoneo($info));
			break;
		case 'verifSucTrabajoStatus':
			echo json_encode($Trabajo->verifSucTrabajoStatus($info));
			break;
		case 'configTrabajoPerifoneo':
			echo json_encode($Trabajo->configTrabajoPerifoneo($info));
			break;
		// ::::::::: [15/12/2017] ::::::::::::
		// FUNCIONES NUEVAS
		case 'traerDetallePerifoneo':
			echo json_encode($Trabajo->traerDetallePerifoneo($info));
			break;
	}
	
?>
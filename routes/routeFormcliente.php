<?php  
	
	session_start();

	require('../clases/Formcliente.php');

	$Formcliente = new Formcliente();

	$action = $_POST['action'];
	
	if(isset($_POST['info']))
		$info = $_POST['info'];


	switch ($action) {
		case 'traerData':
			echo json_encode($Formcliente->traerData($info));
			break;
		case 'traerTrabajos':
			echo json_encode($Formcliente->traerTrabajos($info));
			break;
		case 'configurarTrab':
			echo json_encode($Formcliente->configurarTrab($info));
			break;
		case 'detallesTrab':
			echo json_encode($Formcliente->detallesTrab($info));
			break;
		case 'getEstadistica':
			echo json_encode($Formcliente->getEstadistica($info));
			break;

		// FUNCIONES DE SEGUIMIENTO
		case 'lvl1':
			echo json_encode($Formcliente->lvl1($info));
			break;
		case 'lvl2':
			echo json_encode($Formcliente->lvl2($info));
			break;
		case 'showLvl2_2':
			echo json_encode($Formcliente->showLvl2_2($info));
			break;
		case 'lvl3':
			echo json_encode($Formcliente->lvl3($info));
			break;
		case 'lvl3_todos':
			echo json_encode($Formcliente->lvl3_todos($info));
			break;
		case 'getImg':
			echo json_encode($Formcliente->getImg($info));
			break;
		// NUEVAS FUNCIONES [01/08/2017]
		case 'clientesTrabs':
			echo json_encode($Formcliente->clientesTrabs($info));
			break;
		case 'sucursalesCliente':
			echo json_encode($Formcliente->sucursalesCliente($info));
			break;
		case 'clientesBloques':
			echo json_encode($Formcliente->clientesBloques($info));
			break;
		case 'clientesSucursales':
			echo json_encode($Formcliente->clientesSucursales($info));
			break;
		// PROVEEDORES LOGIN
		case 'provsTrabs':
			echo json_encode($Formcliente->provsTrabs($info));
			break;
		case 'sucursalesProv':
			echo json_encode($Formcliente->sucursalesProv($info));
			break;
		case 'configFecha':
			echo json_encode($Formcliente->configFecha($info));
			break;
		case 'altaPropuestaProv':
			echo json_encode($Formcliente->altaPropuestaProv($info));
			break;
		case 'zonasPoligonos':
			echo json_encode($Formcliente->zonasPoligonos($info));
			break;
		case 'editPassword':
			echo json_encode($Formcliente->editPassword($info));
			break;
	}
	
?>
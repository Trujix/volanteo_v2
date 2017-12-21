<?php  
	
	session_start();

	require('../clases/Tienda.php');

	$Tienda = new Tienda();

	$action = $_POST['action'];
	
	if(isset($_POST['info']))
		$info = $_POST['info'];

	switch ($action) {
		case 'create':
			echo json_encode($Tienda->create($info));
			break;
		case 'read':
			echo json_encode($Tienda->read($info));
			break;
		case 'update':
			echo json_encode($Tienda->update($info));
			break;
		case 'delete':
			echo json_encode($Tienda->delete($info));
			break;
		case 'reactiva':
			echo json_encode($Tienda->reactiva($info));
			break;
		case 'get':
			echo json_encode($Tienda->get($info));
			break;
		// *********** NUEVAS ENTRADAS PARA BLOQUES Y SUCURSALES ********
		// ::::::::: BLOQUES ::::::::::::
		case 'readBloques':
			echo json_encode($Tienda->readBloques($info));
			break;
		case 'nuevoBloque':
			echo json_encode($Tienda->nuevoBloque($info));
			break;
		case 'editarBloqueInfo':
			echo json_encode($Tienda->editarBloqueInfo($info));
			break;
		case 'editarBloque':
			echo json_encode($Tienda->editarBloque($info));
			break;
		case 'deleteBloque':
			echo json_encode($Tienda->deleteBloque($info));
			break;
		// :::::: SUCURSALES ::::::::::::::
		case 'readSucursales':
			echo json_encode($Tienda->readSucursales($info));
			break;
		case 'nuevaSucursal':
			echo json_encode($Tienda->nuevaSucursal($info));
			break;
		case 'editarSucursalInfo':
			echo json_encode($Tienda->editarSucursalInfo($info));
			break;
		case 'editarSucursal':
			echo json_encode($Tienda->editarSucursal($info));
			break;
		case 'eliminarSucursal':
			echo json_encode($Tienda->eliminarSucursal($info));
			break;
		case 'traerEstados':
			echo json_encode($Tienda->traerEstados());
			break;
		case 'traerMunicipio':
			echo json_encode($Tienda->traerMunicipio($info));
			break;
		case 'traerLocalidades':
			echo json_encode($Tienda->traerLocalidades($info));
			break;
		case 'traerPoligono':
			echo json_encode($Tienda->traerPoligono($info));
			break;
	}
	
?>
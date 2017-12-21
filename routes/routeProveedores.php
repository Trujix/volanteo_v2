<?php  
	
	session_start();

	require('../clases/Proveedor.php');

	$Proveedor = new Proveedor();

	$action = $_POST['action'];
	
	if(isset($_POST['info']))
		$info = $_POST['info'];

	switch ($action) {
		case 'create':
			echo $Proveedor->create($info);
			break;
		case 'read':
			echo $Proveedor->read($info);
			break;
		case 'update':
			echo $Proveedor->update($info);
			break;
		case 'delete':
			echo $Proveedor->delete($info);
			break;
		case 'reactiva':
			echo $Proveedor->reactiva($info);
			break;
		case 'get':
			echo $Proveedor->get($info);
			break;
	}
	
?>
<?php  
	
	session_start();

	require('../clases/Cliente.php');

	$Cliente = new Cliente();

	$action = $_POST['action'];
	
	if(isset($_POST['info']))
		$info = $_POST['info'];

	switch ($action) {
		case 'create':
			echo $Cliente->create($info);
			break;
		case 'read':
			echo $Cliente->read($info);
			break;
		case 'update':
			echo $Cliente->update($info);
			break;
		case 'delete':
			echo $Cliente->delete($info);
			break;
		case 'reactiva':
			echo $Cliente->reactiva($info);
			break;
		case 'get':
			echo $Cliente->get($info);
			break;
		// 19-12-2017 <- NUEVA FUNCION
		case 'eliminarCliente':
			echo $Cliente->eliminarCliente($info);
			break;
	}
	
?>
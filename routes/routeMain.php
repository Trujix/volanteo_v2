<?php  
	
	session_start();

	require('../clases/Mysql.php');

	$Main = new Mysql();

	$action = $_POST['action'];
	
	if(isset($_POST['info']))
		$info = $_POST['info'];

	switch ($action) {
		case 'getEdos':
			echo $Main->getEstados();
			break;
		case 'getMun':
			echo $Main->getMunicipios($info);
			break;
	}
	
?>
<?php  
	
	require('../clases/MySQL.php');
	$Main = new MySQL();

	if(isset($_POST['info']))
		$info = $_POST['info'];

	$action = $_POST['action'];

	switch ($action) {
		case 'select':
			$query1="SELECT nombre, puntos,contacto FROM empresa ORDER BY empresa.puntos  DESC";
			echo json_encode($Main->query_row($query1));
			break;

	}
	
?>
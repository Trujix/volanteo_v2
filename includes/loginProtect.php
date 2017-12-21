<?php  
	session_start();

	require('clases/Mysql.php');
	$main = new Mysql();

	$hoy = $main->getDate();

	$user = "Usuario";
	
	if(!isset($_SESSION['iduser']) || !isset($_SESSION['roluser']) || 
	   !isset($_SESSION['name']))
		header('Location: index.php');
	else
		$user = $_SESSION['name'];

?>
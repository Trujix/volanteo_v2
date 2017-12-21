<?php 

	session_start();
	// session_start();

	if(isset($_SESSION['iduser']) && isset($_SESSION['roluser']) && 
	   isset($_SESSION['name']))
		header('Location: clientes.php');
	// if(isset($_SESSION['iduser']) || isset($_SESSION['roluser']) || 
	//    isset($_SESSION['name']))
	// 	header('Location: inicio.php');

?>
<?php 
	
	session_start();

	require('clases/Domgeo.php');
	$domgeo = new Domgeo();

	// ===============  Login protect  ==============================

	$user = "Usuario";
	
	if(!isset($_SESSION['iduser']) || !isset($_SESSION['roluser']) || 
	   !isset($_SESSION['name']))
		header('Location: index.php');
	else
		$user = $_SESSION['name'];

    // =============== Obtener estados ===============================
	$edos = $domgeo->getEstados();		

	$estadosDomgeo = "";

	for ($i = 0; $i < count($edos); $i++) 
      $estadosDomgeo .= '<option value="'.$edos[$i]["cveEnt"].'">'.$edos[$i]["nombent"].'</option>';
    
    

?>
<?php

	require_once('Vigencia.php');
	$ejecutarVigencia = new Vigencia();

	// CREAMOS UNA VARIABLE CON DATOS SOLO PARA DETONAR EL SCRIPT (NO TIENE UN USO ESPECIFICO)
	$fechaJson = array("DATO" => "ACTIVADOR");
	$vigenciaJSON = $fechaJson;

	// EJECUCION DE VIGENCIA
	$ejecutarVigencia->statusDia($vigenciaJSON);

?>
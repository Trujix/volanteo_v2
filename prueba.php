<?php  

	require_once 'clases/Mysql.php';

	$db = new Mysql();

	$consult = "SELECT idcliente FROM clientes WHERE nombre = '2'";

	$resultado = $db->query_assoc($consult);

	echo 'prev';
	var_dump($resultado);
	echo 'prev';
	exit;

?>
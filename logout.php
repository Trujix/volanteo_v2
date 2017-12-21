<?php  

	session_start();
	require('clases/User.php');
	$User = new User();
	$User->logout();
?>
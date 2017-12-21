<?php  
	
	session_start();

	require('../clases/User.php');

	$User = new User();

	$action = $_POST['action'];

	if(isset($_POST['info']))
		$info = $_POST['info'];

	switch ($action) {
		case 'Login':
			echo $User->login($info);
			break;
		case 'Logout':
			echo $User->logout();
			break;
		case 'Register':
			echo $User->register();
			break;
	}
	
?>
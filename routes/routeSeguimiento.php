<?php  
	
	session_start();

	require('../clases/Seguimiento.php');

	$Seguimiento = new Seguimiento();

	$action = $_POST['action'];
	
	if(isset($_POST['info']))
		$info = $_POST['info'];

	switch ($action) {
		case 'lvl1':
			echo json_encode($Seguimiento->lvl1($info));
			break;
		case 'lvl2':
			echo json_encode($Seguimiento->lvl2($info));
			break;
		case 'showLvl2_2':
			echo json_encode($Seguimiento->showLvl2_2($info));
			break;
		case 'lvl3':
			echo json_encode($Seguimiento->lvl3($info));
			break;
		case 'lvl3_todos':
			echo json_encode($Seguimiento->lvl3_todos($info));
			break;
		// case 'lvl4':
		// 	echo json_encode($Seguimiento->lvl4($info));
		// 	break;
		case 'getImg':
			echo json_encode($Seguimiento->getImg($info));
			break;
	}
	
	
?>
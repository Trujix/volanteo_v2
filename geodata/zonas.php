<?php
		require('resources/mysql.php');
		$_conexion = new mysql();
	   
	    $localidad=$_POST['localidad'];
	    $selector=$_POST['selector'];
	    
	    if($selector=="crear"){
			
			$sql="SELECT id,nombre FROM zonas WHERE territorio LIKE '$localidad%' ORDER BY nombre";
	   //var_dump($sql);
			$res = $_conexion->query_assoc($sql);
		   
			foreach ($res as $i => $value) {

				$res[$i]['id']=$res[$i]['id'];
				$res[$i]['nombre']=$res[$i]['nombre'];
				
			}
	    }
	    if($selector=="ver"){
	    	$sql="SELECT id,nombre FROM zonas WHERE territorio = '$localidad' ORDER BY nombre";
	   //var_dump($sql);
			$res = $_conexion->query_assoc($sql);
		   
			foreach ($res as $i => $value) {

				$res[$i]['id']=$res[$i]['id'];
				$res[$i]['nombre']=$res[$i]['nombre'];
				
			}
	    }
		
			

  		echo json_encode($res);

?>
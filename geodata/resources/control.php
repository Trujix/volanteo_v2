<?php

	
	$class=$_POST['clase'];	
	$selector=$_POST['selector'];// se obtiene el nombre del selector
	
	$data=$_POST['data'];


	switch ($class) {
		case 'crud_poligonos':
			
			include ("class_Crud_polig.php") ;
			$fx=new crud_poligonos(); // se instancía la clase para llamar el método con el nombre que es igual al selector
			
			$x=$fx->$selector($data); // se usa la misma variable selector como nombre del método.
			
			echo($x); //se imprime el resultado del metodo llamado
		break;
		

		case 'crud_becarios':
			
			include ("class_Crud_becarios.php") ;
			$fx=new crud_becarios(); // se instancía la clase para llamar el método con el nombre que es igual al selector
			
			// var_dump($data);
			// exit();
			$x=$fx->$selector($data); // se usa la misma variable selector como nombre del método.
			
			echo($x); //se imprime el resultado del metodo llamado
		
		break;


		default:

		break;

	}

	
	
	

?>







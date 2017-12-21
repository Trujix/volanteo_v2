<?php 

	require("clases/MySQL.php");

	$Main= new MySQL();


	$name = $_POST['name'];
	$email = $_POST['email'];
	$facebook = $_POST['facebook'];
	$telefono = $_POST['telefono'];
	$address = $_POST['address'];

	$form ="<input type='text' id='nombre_encuesta' maxlength='50' name='empresa' value='{$name}' hidden>
			<input type='text' id='correo' name='correo' value='{$email}' hidden>
			<input type='text' id='face_encuesta' name='facebook' value='{$facebook}' hidden>
			<input type='text' id='num_encuesta'  name='telefono' value='{$telefono}' hidden>
			<input type='text' id='dom_encuesta' name='domicilio' value='{$address}' hidden>";


	$query="SELECT * FROM pregunta";

	$r = $Main->query_assoc($query);


	$hmtl = "";
	for ($i = 0; $i < count($r); $i++) { 

		$id = $r[$i]['id_pregunta'];
		$pregunta = $r[$i]['pregunta'];
		
		if ($i == 1)
			$hmtl .="<div class='preA'>";

		$hmtl .="<div class='col-12 div-pregunta'>";

		// Creación de cada pregunta ---------------------------------
		$hmtl .= "<h5 class='card-text' for='{$id}'>{$pregunta}</h5>";
		
		$query2 = "SELECT * FROM pregunta_respuesta P 
				   JOIN respuesta R ON P.id_respuesta = R.id_respuesta 
				   WHERE P.id_pregunta = $id";

		$row = $Main->query_assoc($query2);
		
		// Creación de cada respuesta --------------------------------
		$hmtl .="<div class='btn-group' data-toggle='buttons'>";

		for ($j=0; $j < count($row); $j++) {
	 
			$res=$row[$j]["respuesta"]; 
			
			$id_=$row[$j]["id_respuesta"];
			
			$hmtl .="<label class='rad{$i} btn btn-primary mi-radio'>
					 <input autocomplete='off' class='radios' type='radio' name='{$i}' value='{$id_}' required>
					 {$res}
					 </label>";

		}
	
		$hmtl .="</div><hr></div>";
	
	}

	$hmtl .="</div>";
 ?>
<?php

	require("clases/MySQL.php");

	$Main= new MySQL();


	$name     = $_POST['name'];
	$email    = $_POST['email'];
	$facebook = $_POST['facebook'];
	$telefono = $_POST['telefono'];
	$address  = $_POST['address'];

	$form ="<input type='text' id='nombre_encuesta' maxlength='50' name='empresa' value='{$name}' hidden>
			<input type='text' id='correo' name='correo' value='{$email}' hidden>
			<input type='text' id='face_encuesta' name='facebook' value='{$facebook}' hidden>
			<input type='text' id='num_encuesta'  name='telefono' value='{$telefono}' hidden>
			<input type='text' id='dom_encuesta' name='domicilio' value='{$address}' hidden>";


	$query="SELECT * FROM pregunta";

	$r = $Main->query_assoc($query);

	$totalPreguntas = count($r);

	// echo '<pre>';
	// print_r($r);
	// echo '</pre>';
	// exit;


	$hmtl = "";
	for ($i = 0; $i < count($r); $i++) {

		$id       = $r[$i]['id_pregunta'];
		$pregunta = $r[$i]['pregunta'];

		$query2 = "SELECT * FROM pregunta_respuesta P
				   JOIN respuesta R ON P.id_respuesta = R.id_respuesta
				   WHERE P.id_pregunta = $id";

		$row = $Main->query_assoc($query2);


		$respuestas = "";
		for ($j=0; $j < count($row); $j++) {

			$respuesta = $row[$j]["respuesta"];
			$id_resp   = $row[$j]["id_respuesta"];
			$puntos   = $row[$j]["puntos"];

			$respuestas .= "<a class='btn btn-primary btn-sm' data-toggle='{$id}' data-value='{$id_resp}' data-puntos='{$puntos}'>
						{$respuesta}
					  </a>";
		}

		$hmtl .="<div class='form-group col-12 div-pregunta'>
					<h5 class='card-text' for='p{$id}'>{$pregunta}</h5>
					<div class='input-group'>
	    		 		<div id='radioBtn' class='btn-group'>
	    		 			{$respuestas}
	    		 		</div>
	    		 		<input type='hidden' name='p{$i}' id='p{$i}'>
					</div>
				</div>";

	}


 ?>

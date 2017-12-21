<?

require('mysql.php');
	$main = new mysql();

	if(isset($_POST['json']))
	{
		$json = $_POST['json'];

		if($json != "")
		{

			$json = str_replace('\"', '"', $json);

			$json = json_decode($json);


			$consulta = "INSERT INTO geopuntos (identificador,longitud,latitud,altura,grados)
										 VALUES ";
			for ($i=0; $i < count($json); $i++) { 

				$consulta .= "('".$json[$i]->identificador."', '".$json[$i]->longitud."', '".$json[$i]->latitud."','".$json[$i]->altura."','".$json[$i]->grados."'),";
			}
			$consulta = substr($consulta, 0, -1);

			if ($main->query($consulta))
			{
				
				echo "success";

			}
		}

	}
	
	//if(!isset($_POST['json']))
	else
	{
		if(isset($_POST["identificador"])){$identificador = $_POST["identificador"];}
		else{$identificador ="NO ASIGNADO";}
		if(isset($_POST["longitud"])){$longitud = $_POST["longitud"];}
		else{$longitud ="NO ASIGNADO";}
		if(isset($_POST["latitud"])){$latitud = $_POST["latitud"];}
		else{$latitud ="NO ASIGNADO";}
		if(isset($_POST["altura"])){$altura = $_POST["altura"];}
		else{$altura ="NO ASIGNADO";}
		if(isset($_POST["grados"])){$grados = $_POST["grados"];}
		else{$grados ="NO ASIGNADO";}



		$insert = "INSERT INTO geopuntos (identificador,longitud,latitud,altura,grados)
									 VALUES ('$identificador','$longitud','$latitud','$altura','$grados')";

		if ($main->query($insert))
		{
			
			echo "success";

		}

	}

?>
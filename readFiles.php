<?php  
	ini_set('max_execution_time', 0);

	require('clases/Mysql.php');

	$db = new Mysql();

	$txt = file_get_contents("cat_localidad_AGO2016.csv");

	$array = explode("\n", $txt);

	$insert = "INSERT INTO cigel (idEdo, nomEdo, idMpo, nomMpo, idLoc, nomLoc, lat, lng) VALUES ";

	$values = "";

	for ($i = 0; $i < count($array)-1; $i++) { 
		$temp = explode(',', $array[$i]);

		$values .= "({$temp[0]}, '{$temp[1]}', {$temp[3]}, '{$temp[4]}', {$temp[5]}, '{$temp[6]}', '{$temp[7]}', '{$temp[8]}'),";

		// $newArr = array(
		// 	"idEdo" => $temp[0], 
		// 	"nomEdo" => $temp[1],
		// 	"idMpo" => $temp[3],
		// 	"nomMpo" => $temp[4],
		// 	"idLoc" => $temp[5],
		// 	"nomLoc" => $temp[6],
		// 	"lat" => $temp[7],
		// 	"lng" => $temp[8]
		// );
		// $array[$i] = $newArr;
	}

	$values = substr($values, 0, strlen($values)-1);

	$insert .= $values;

	if($db->query($insert))
		echo "fin";
	// echo $insert;

	// echo "<pre>";
	// var_dump($array);
	// echo "</pre>";
	// exit;
			

?>
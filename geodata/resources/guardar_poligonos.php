<?php

// $coo=$_POST['coordenadas'];
// $est=$_POST['menu_estado'];
// $mun=$_POST['menu_municipios'];
// $loc=$_POST['menu_localidades'];
// $zon=$_POST['zona'];
// $soc=$_POST['socios'];
// $pro=$_POST['propuesta'];
// $col=$_POST['color'];
// $obs=$_POST['observaciones'];

$tipo_de_poligono=$_POST['valor_tipo_poligono'];

if($tipo_de_poligono=="z"){
	$mysqli = new mysqli("localhost", "root", "toortoor", "volantes");
	// $mysqli = new mysqli("localhost", "root", "toortoor", "volantes");
	$response=true;

	$coordenadas=$_POST['coordenadas'];//aqui se guardan las coordenadas que se copiaron de un input en el html
// var_dump($coordenadas);
	$territorio=$_POST['valor_entidad'].":".$_POST['valor_municipio'].":".$_POST['valor_localidad'];// se construye este valor por la composicion de los campos del formulario de referencia geográfica
// var_dump($territorio);
	
	$observaciones=$_POST['observaciones']; //viene del campo propuesta
	$atributos=$_POST['color'];// viene del campo color

	$nombre=$_POST['nombre']; //viene del campo nombre
	// $zona_elegida=$_POST['valor_zona'];
	$id_zona; //creacion de la variable QUE SE USARÁ MAS ABAJO cuando se recoja el valor de unsercion de un elemento en la tabla zonas.
	
	if ($mysqli->connect_errno) {
	    echo "Falló la conexión a MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
	}

	/* Sentencia preparada, etapa 1: preparación */
	if (!($sentencia = $mysqli->prepare("INSERT INTO zonas(territorio,nombre) VALUES (?,?)"))) {
	     echo "Falló la preparación: (" . $mysqli->errno . ") " . $mysqli->error;
	}

	/* Sentencia preparada, etapa 2: vinculación y ejecución */
	
	if (!$sentencia->bind_param("ss", $territorio,$nombre)) {
	    echo "Falló la vinculación de parámetros: (" . $sentencia->errno . ") " . $sentencia->error;
	}

	if ($sentencia->execute()) {
	    $id_zona=$sentencia->insert_id;
	}
	else{
		echo "Falló la ejecución: (" . $sentencia->errno . ") " . $sentencia->error;
	    $response=false;		
	}

   //-----------------------------
   $territorio=$territorio.":".$id_zona;
	
	 /* Sentencia preparada, etapa 1: preparación */
	if (!($sentencia = $mysqli->prepare("INSERT INTO poligono_z_r1(territorio,coords,nombre,observaciones,atributos) VALUES (?,?,?,?,?)"))) {
	     echo "Falló la preparación: (" . $mysqli->errno . ") " . $mysqli->error;
	}

	/* Sentencia preparada, etapa 2: vinculación y ejecución */
	
	if (!$sentencia->bind_param("ssiss", $territorio,$coordenadas,$id_zona,$observaciones,$atributos)) {
	    echo "Falló la vinculación de parámetros: (" . $sentencia->errno . ") " . $sentencia->error;
	}

	if (!$sentencia->execute()) {
	    echo "Falló la ejecución: (" . $sentencia->errno . ") " . $sentencia->error;
	    $response=false;
	}
$sentencia->close();
}//fin IF ZONA
//###################################################POLIGONOS DE SECCIÓN###########################333333

if($tipo_de_poligono=="s"){
	 require('mysql.php');
		$_conexion = new mysql();
		
		$sql="SELECT id,atributos from poligono_z_r1 WHERE territorio LIKE '%$zona_elegida'";
		$res = $_conexion->query_assoc($sql);
					 
		
			   
		
	$coordenadas=$_POST['coordenadas'];

	$zona=$_POST['valor_zona'];

	
	$observaciones=$_POST['observaciones'];
	$atributos=$_POST['color'];

	$nombre=$_POST['nombre'];
	
	// $mysqli = new mysqli("localhost", "root", "toor", "volantes");
	$mysqli = new mysqli("localhost", "root", "toortoor", "volantes");
	if ($mysqli->connect_errno) {
	    echo "Falló la conexión a MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
	}


   //-----------------------------
   $ter=$ter.":".$id_zona;
	/* Sentencia preparada, etapa 1: preparación */
	if (!($sentencia = $mysqli->prepare("INSERT INTO poligono_s_r1(zona,coords,nombre,observaciones,atributos) VALUES (?,?,?,?,?)"))) {
	     echo "Falló la preparación: (" . $mysqli->errno . ") " . $mysqli->error;
	}

	/* Sentencia preparada, etapa 2: vinculación y ejecución */
	
	if (!$sentencia->bind_param("issss", $zona,$coordenadas,$nombre,$observaciones,$atributos)) {
	    echo "Falló la vinculación de parámetros: (" . $sentencia->errno . ") " . $sentencia->error;
	}

	if (!$sentencia->execute()) {
	    echo "Falló la ejecución: (" . $sentencia->errno . ") " . $sentencia->error;
	    $response=false;
	}
	$sentencia->close();
}//fin IF ZONA




echo json_encode($response);

?>
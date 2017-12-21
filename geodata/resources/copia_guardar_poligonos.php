<?php
$mysqli = new mysqli("localhost", "root", "toor", "volantes");
$response=true;

// $coo=$_POST['coordenadas'];
// $est=$_POST['menu_estado'];
// $mun=$_POST['menu_municipios'];
// $loc=$_POST['menu_localidades'];
// $zon=$_POST['zona'];
// $soc=$_POST['socios'];
// $pro=$_POST['propuesta'];
// $col=$_POST['color'];
// $obs=$_POST['observaciones'];

$coo=$_POST['coordenadas'];

$ter=$_POST['slc_estado'].":".$_POST['slc_municipio'].":".$_POST['slc_localidad'].":".$_POST['zona'];

$soc=$_POST['socios'];
$pro=$_POST['propuesta'];
$atr=$_POST['color'].":".$_POST['observaciones'];


if ($mysqli->connect_errno) {
    echo "Falló la conexión a MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
}


/* Sentencia preparada, etapa 1: preparación */
if (!($sentencia = $mysqli->prepare("INSERT INTO poligono_z_r1(territorio,coords,socios,propuesta,atributos) VALUES (?,?,?,?,?)"))) {
     echo "Falló la preparación: (" . $mysqli->errno . ") " . $mysqli->error;
}

/* Sentencia preparada, etapa 2: vinculación y ejecución */
$id = 1;
if (!$sentencia->bind_param("sssis", $ter,$coo,$soc,$pro,$atr)) {
    echo "Falló la vinculación de parámetros: (" . $sentencia->errno . ") " . $sentencia->error;
}

if (!$sentencia->execute()) {
    echo "Falló la ejecución: (" . $sentencia->errno . ") " . $sentencia->error;
    $response=false;
}

$sentencia->close();
echo json_encode($response);

?>
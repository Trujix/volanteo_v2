<?php
	session_start();

	require('../clases/Poligonos.php');

	$Poligonos = new Poligonos();

	$action = $_POST['action'];
	
	if(isset($_POST['info']))
		$info = $_POST['info'];

	switch ($action) {
		case 'altaPoligono':
			echo json_encode($Poligonos->altaPoligono($info));
			break;
		case 'altaPoligonoImp':
			echo json_encode($Poligonos->altaPoligonoImp($info));
			break;
		case 'editarPoligono':
			echo json_encode($Poligonos->editarPoligono($info));
			break;
		case 'editarPoligonoCants':
			echo json_encode($Poligonos->editarPoligonoCants($info));
			break;
		case 'bajaPoligono':
			echo json_encode($Poligonos->bajaPoligono($info));
			break;
		case 'getZonas':
			echo json_encode($Poligonos->getZonas($info));
			break;
		case 'getZonasExact':
			echo json_encode($Poligonos->getZonasExact($info));
			break;
		case 'getZonasCrear':
			echo json_encode($Poligonos->getZonasCrear($info));
			break;
		case 'getZonasSecciones':
			echo json_encode($Poligonos->getZonasSecciones($info));
			break;
		case 'getEdicion':
			echo json_encode($Poligonos->getEdicion($info));
			break;
		case 'coordZona':
			echo json_encode($Poligonos->coordZona($info));
			break;
		case 'altaPoligonoImpZona':
			echo json_encode($Poligonos->altaPoligonoImpZona($info));
			break;
	}
?>
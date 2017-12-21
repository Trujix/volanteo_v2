<?php
	require('Mysql.php');

	Class Poligonos extends Mysql{

		public function altaPoligono($info){
			$tipo 			= 	$info['tipo'];
			$coordenadas 	= 	$info['coordenadas'];
			$color 			= 	$info['color'];
			$nombre 		= 	$info['nombre'];
			$observaciones 	= 	$info['observaciones'];
			$numvolantes	=	$info['numvolantes'];
			$hrsperifoneo	=	$info['hrsperifoneo'];
			$territorioZona	=	$info['territorioZona'];
			$fecharegistro	=	$info['fecharegistro'];

			$cadena = "";
			$cadenazonas = "";

			if($tipo === "zonas"){
				$cadena = "(\'$territorioZona:$\', \'$coordenadas\',$, \'$observaciones\', \'$numvolantes\', \'$hrsperifoneo\', \'$color\', \'$fecharegistro\')";
				$cadenazonas = "(\'$territorioZona\', \'$nombre\', \'$fecharegistro\')";
			}else{
				$cadena = "(\'$territorioZona\', \'$coordenadas\', \'$nombre\', \'$observaciones\', \'$numvolantes\', \'$hrsperifoneo\', \'$color\', \'$fecharegistro\')";
				$cadenazonas = "--";
			}
			$insertPoligono = "CALL SP_CREARPOLIGONO('$cadena', '$cadenazonas', '$tipo')";
			if($this->query($insertPoligono)){
				return true;
			}else{
				return $insertPoligono;
			}
		}

		public function altaPoligonoImp($info){
			$cadenaZonas = '';
			$cadenaZonasPolig = '';

			$cadenaSecciones = '';
			$cadenaZonasAux = '';
			for($i = 0; $i < count($info); $i++){
				if($info[$i]["tipo"] === 'zona'){
					$cadenaZonas = "(\'{$info[$i]['territorioZona']}:$\', \'{$info[$i]['coordenadas']}\',$, \'{$info[$i]['observaciones']}\', \'{$info[$i]['numvolantes']}\', \'{$info[$i]['hrsperifoneo']}\', \'{$info[$i]['color']}\', \'{$info[$i]['fecharegistro']}\')";
					$cadenaZonasPolig = "(\'{$info[$i]['territorioZona']}\', \'{$info[$i]['nombre']}\', \'{$info[$i]['fecharegistro']}\')";
				}else if($info[$i]["tipo"] === 'seccion'){
					$cadenaSecciones .= "(\'?\', \'{$info[$i]['coordenadas']}\',\'{$info[$i]['nombre']}\', \'{$info[$i]['observaciones']}\', \'{$info[$i]['numvolantes']}\', \'{$info[$i]['hrsperifoneo']}\', \'{$info[$i]['color']}\', \'{$info[$i]['fecharegistro']}\'),";
					$cadenaZonasAux = '--';
				}
			}

			$cadenaSecciones = substr($cadenaSecciones, 0, strlen($cadenaSecciones)-1);

			$altaZonaImp = "CALL SP_CREARPOLIGONO('$cadenaZonas', '$cadenaZonasPolig', 'zonas')";
			if($this->query($altaZonaImp)){
				$lastID = $this->query_single_object("SELECT LAST_INSERT_ID() id FROM trabajos");
				$cadenaSecciones = str_replace("?",$lastID->id, $cadenaSecciones);

				$altaSeccionesImp = "CALL SP_CREARPOLIGONO('$cadenaSecciones', '$cadenaZonasAux', 'seccion')";
				$this->query($altaSeccionesImp);
			}else{
				return $altaZonaImp;
			}
		}

		public function editarPoligono($info){
			$id = $info["id"];
			$coord = $info["coords"];
			$tabla = $info["tabla"];

			$coords = "\'$coord\'";
			
			$editaPoligono = "CALL SP_EDITARPOLIGONO('$id', '$coords', '$tabla')";

			if($this->query($editaPoligono)){
				return true;
			}else{
				return $editaPoligono;
			}
		}

		public function editarPoligonoCants($info){
			$id = $info["id"];
			$numVols = $info["volanteo"];
			$hrsPer = $info["perifoneo"];
			$tabla = $info["tabla"];

			$volantes = "\'$numVols\'";
			$perifoneo = "\'$hrsPer\'";
			
			$editaPoligonoCants = "CALL SP_EDITARPOLIGONOCANTS('$id', '$volantes', '$perifoneo', '$tabla')";

			if($this->query($editaPoligonoCants)){
				return true;
			}else{
				return $editaPoligonoCants;
			}
		}

		public function bajaPoligono($info){
			$id = $info["id"];
			$tabla = $info["tabla"];

			$bajaPoligono = "CALL SP_BAJAPOLIGONO('$id', '$tabla')";
			if($this->query($bajaPoligono)){
				return true;
			}else{
				return $bajaPoligono;
			}
		}

		public function getZonas($info){
			$consult = "SELECT * FROM vwZonasPoligonos WHERE territorio LIKE '".$info.":%'";
			return $this->query_assoc($consult);
		}

		public function getZonasExact($info){
			$consult = "SELECT * FROM vwZonasPoligonos WHERE territorio = '".$info."'";
			return $this->query_assoc($consult);
		}

		public function getZonasCrear($info){
			$consult = "SELECT P.id, P.territorio, P.coords, Z.nombre, P.observaciones, P.numvolantes, P.hrsperifoneo, P.atributos, P.fecha_registro, 'zona' AS tipo FROM poligono_zonas P JOIN zonaspoligonos Z ON Z.id = P.nombre WHERE P.territorio LIKE '$info:%' AND P.status <> 0";
			return $this->query_assoc($consult);
		}

		public function getZonasSecciones($info){
			$consult = "SELECT id, coords, nombre, observaciones, numvolantes, hrsperifoneo, atributos, fecha_registro, 'seccion' AS tipo
							FROM poligono_seccion 
								WHERE zona = (SELECT nombre FROM poligono_zonas WHERE territorio = '$info') AND status <> 0
							UNION
						SELECT P.id, P.coords, Z.nombre, P.observaciones, P.numvolantes, P.hrsperifoneo, P.atributos, P.fecha_registro, 'zona' AS tipo
							FROM poligono_zonas P JOIN zonaspoligonos Z
							ON Z.id = P.nombre WHERE
								P.territorio =  '$info' AND P.status <> 0";
			return $this->query_assoc($consult);
		}

		public function getEdicion($info){
			$ids = $info["ids"];
			$territorio = $info["terr"];
			$consulta = $info["consulta"];
			
			if($consulta === "ZONA"){
				$consult = "SELECT P.id, P.territorio, P.coords, Z.nombre, P.observaciones, P.numvolantes, P.hrsperifoneo, P.atributos, P.fecha_registro, 'zona' AS tipo
								FROM poligono_zonas P JOIN zonaspoligonos Z
							ON Z.id = P.nombre
									WHERE P.id = $ids AND P.status <> 0";
			}else if($consulta === "ZONAYSECCION"){
				$consult = "SELECT id, zona AS territorio, coords, nombre, observaciones, numvolantes, hrsperifoneo, atributos, fecha_registro, 'seccion' AS tipo
								FROM poligono_seccion
									WHERE zona = $ids AND status <> 0
								UNION
							SELECT P.id, P.territorio, P.coords, Z.nombre, P.observaciones, P.numvolantes, P.hrsperifoneo, P.atributos, P.fecha_registro, 'zona' AS tipo
								FROM poligono_zonas P JOIN zonaspoligonos Z
							ON Z.id = P.nombre
									WHERE P.id = $ids AND P.status <> 0";
			}else if($consulta === "ZONAS"){
				$consult = "SELECT P.id, P.territorio, P.coords, Z.nombre, P.observaciones, P.numvolantes, P.hrsperifoneo, P.atributos, P.fecha_registro, 'zona' AS tipo FROM poligono_zonas P JOIN zonaspoligonos Z ON Z.id = P.nombre WHERE P.id IN (".$ids.") AND P.status <> 0";
			}else if($consulta === "ZONASYSECCIONES"){
				$consult = "SELECT id, zona AS territorio, coords, nombre, observaciones, numvolantes, hrsperifoneo, atributos, fecha_registro, 'seccion' AS tipo  FROM poligono_seccion WHERE zona IN (".$ids.") AND status <> 0 UNION "." SELECT P.id, P.territorio, P.coords, Z.nombre, P.observaciones, P.numvolantes, P.hrsperifoneo, P.atributos, P.fecha_registro, 'zona' AS tipo FROM poligono_zonas P JOIN zonaspoligonos Z ON Z.id = P.nombre WHERE P.id IN (".$ids.") AND P.status <> 0";
			}
			return $this->query_assoc($consult);
		}

		public function coordZona($info){
			$consult = "SELECT * FROM poligono_zonas WHERE nombre = ".$info;
			return $this->query_assoc($consult);
		}

		public function altaPoligonoImpZona($info){
			$tipo 			= 	$info['tipo'];
			$coordenadas 	= 	$info['coordenadas'];
			$color 			= 	$info['color'];
			$nombre 		= 	$info['nombre'];
			$observaciones 	= 	$info['observaciones'];
			$numvolantes	=	$info['numvolantes'];
			$hrsperifoneo	=	$info['hrsperifoneo'];
			$territorioZona	=	$info['territorioZona'];
			$fecharegistro	=	$info['fecharegistro'];

			$cadena = "(\'$territorioZona:$\', \'$coordenadas\',$, \'$observaciones\', \'$numvolantes\', \'$hrsperifoneo\', \'$color\', \'$fecharegistro\')";
			$cadenazonas = "(\'$territorioZona\', \'$nombre\', \'$fecharegistro\')";

			$insertPoligonoImpZona = "CALL SP_CREARPOLIGONO('$cadena', '$cadenazonas', '$tipo')";
			if($this->query($insertPoligonoImpZona)){
				return true;
			}else{
				return $insertPoligonoImpZona;
			}
		}

		
	}
?>
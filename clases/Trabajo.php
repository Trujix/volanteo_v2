<?php  
	
	require('Mysql.php');

	Class Trabajo extends Mysql{

		public function getStep3($info){

			$response = array();
			$idBloque = "";
			$bloquesArray;
			$idSucursalesArray;

			foreach ($info as $key => $value) {

				// ============ Creaciòn de la consulta  =========================================
				$idBloque = $key;
				$vec = $info[$key]['info'];
				$bloquesArray = $info[$key]['bloques'];
				$idSucursalesArray = $info[$key]['checks'];

				$values = "";

				$idEdo2 = "(";
				for ($i = 0; $i < count($vec); $i++){ 
					$idMun = $vec[$i]['idMun'];
					$idEdo = $vec[$i]['idEdo'];
					$idEdo2 .=$vec[$i]['idEdo'] . ",";
					$cantidad = $vec[$i]['cantidad'];
					$values .= "($idEdo,$idMun,$cantidad),";
				}

				$values = substr($values, 0, strlen($values)-1);
				$idEdo2 = substr($idEdo2, 0, strlen($idEdo2)-1);
				$idEdo2 .= ")";

				// $consult = "CREATE TEMPORARY TABLE tmp LIKE temp";
				// $this->query($consult);

				$insert = "TRUNCATE TABLE temp";
				$this->query($insert);

				$insert = "INSERT INTO temp (edo, mun, cantidad) VALUES ".$values;
				$this->query($insert);


				$consult = "SELECT M.cveMpo, M.nomMpo, Z.idzona, Z.idProveedor, 
							Z.nombre_proveedor,  Z.idEdo, Z.estado, Z.costoservicio, 
							Z.costosadicionales 
							FROM vwZonas Z 
							JOIN temp T ON Z.mun = T.mun
							JOIN domgeo.municipios M ON T.mun = M.cveMpo 
							AND T.edo = M.cveEnt OR M.nomMpo IS NULL
							WHERE Z.idEdo = $idEdo
							UNION
							SELECT T.mun, D.nomMpo, '', '', '', '', '', '', '' FROM temp T 
							JOIN domgeo.municipios D ON T.edo = D.cveEnt AND T.mun = D.cveMpo 
							WHERE T.mun NOT IN (
								SELECT mun FROM vwZonas WHERE idEdo = $idEdo
							)";

							// echo "$consult; \n";

				$getMuns = "SELECT DISTINCT(M.cveMpo), M.nomMpo, T.cantidad
							FROM vwZonas Z 
							JOIN temp T ON Z.mun = T.mun
							JOIN domgeo.municipios M ON T.mun = M.cveMpo 
							AND T.edo = M.cveEnt OR M.nomMpo IS NULL
							WHERE Z.idEdo = $idEdo";

							// echo "$getMuns; \n";

				$getProV = "SELECT DISTINCT(Z.idProveedor), Z.nombre_proveedor, P.tel1 AS tel
							FROM vwZonas Z 
							RIGHT JOIN temp T ON Z.mun = T.mun
							JOIN proveedores P ON Z.idProveedor = P.idproveedor
							JOIN domgeo.municipios M ON T.mun = M.cveMpo AND T.edo = M.cveEnt OR M.nomMpo IS NULL
							WHERE Z.idEdo = $idEdo";
				
							// echo "$getProV; \n";
							// exit;

				// coincidencias de zonas de cobertura y proveedores con zonas solicitadas
				$resTemp = $this->query_assoc($consult);
				// Municipios disponibles en las zonas de coberturas
				$resMuns = $this->query_assoc($getMuns);
				// Proveedores disponibles para el servicio
				$resProv = $this->query_assoc($getProV);
				
				// TENGO QUE REVISAR CODIGO DE AQUÍ PARA ABAJO
				$res = array();
				$noproveedor = array();

				if(count($resProv) > 0){
					for ($i = 0; $i < count($resProv); $i++) { 
						
						array_push($res, array(
							"idProveedor" => $resProv[$i]['idProveedor'], 
							"nombreProv" => $resProv[$i]['nombre_proveedor'], 
							"tel" => $resProv[$i]['tel'], 
							"edo" => $key,
							"municipios" => array(),
							"sucursales" => array()
						));

						for ($j = 0; $j < count($resTemp); $j++) {
							// No recuerdo por que es está condición
							if($i == 0){
								// Si idzona es = "" quiere decir que ese registro (municipio)
								// no puede ser atendido por ningun proveedor
								if ($resTemp[$j]['idzona'] == "") {

									$cant = 0;
									// El ciclo recorre el indice "info" de la informacion 
									// enviada por ajax
									for ($h = 0; $h < count($vec); $h++){
										// Se valida que coincida el municipio resultante 
										// en la  base de datos con el que viene desde el ajax
										if($resTemp[$j]['cveMpo'] == $vec[$h]['idMun'])
											$cant = $vec[$h]['cantidad'];
									}

									array_push($noproveedor, array(
										"idmun" => $resTemp[$j]['cveMpo'],
										"municipio" => $resTemp[$j]['nomMpo'],
										"cantidad" => (int)$cant
									));
								}
							}
								

							if($resProv[$i]['idProveedor'] == $resTemp[$j]['idProveedor']){

								$cant = 0;
								for ($h = 0; $h < count($resMuns); $h++){
									if($resTemp[$j]['cveMpo'] == $resMuns[$h]['cveMpo']){
										$cant = $resMuns[$h]['cantidad'];
									}
								}
								
								$temp = array(
									"id" => $resTemp[$j]['cveMpo'],
									"nombre" => $resTemp[$j]['nomMpo'],
									"cantidad" => (int)$cant
								);

								array_push($res[$i]["municipios"], $temp);
							}
						}

					}

				}
				else{
					for ($j = 0; $j < count($resTemp); $j++) {
						$cant = 0;
						for ($h = 0; $h < count($vec); $h++)
							if($resTemp[$j]['cveMpo'] == $vec[$h]['idMun'])
								$cant = $vec[$h]['cantidad'];

						array_push($noproveedor, array(
							"idmun" => $resTemp[$j]['cveMpo'],
							"municipio" => $resTemp[$j]['nomMpo'],
							"cantidad" => (int)$cant
						));
					}

				}

				// LLENAMOS EL ARRAY CON VALORES VACIOS (DESPUES SE INSERTARAN EN SU
				// RESPECTIVO INDEX EL CONJUNTO DE DATOS)
				$response[$key] = array('', '', '');
			}

			// ***************** :::::::::: [22/07/2017] :::::::::::: ******************
			$idSucursales = "";
			for($q = 0; $q < count($idSucursalesArray); $q++){
				if($q > 0){
					$idSucursales .= ",";
				}
				$idSucursales .= $idSucursalesArray[$q]['idMun'];
			}

			// LLENAMOS LOS VALORES DE PROVEEDORES (SUSTIUMOS LOS MUNICIPIOS POR SUCURSALES)
			$sucMunArr;
			$idsProvs = array();
			for($s = 0; $s < count($res); $s++){
				$sucMunArr[$res[$s]["idProveedor"]] = array();
				array_push($idsProvs, $res[$s]["idProveedor"]);

				$sucursales = array();
				$municipios = $res[$s]["municipios"];
				for($m = 0; $m < count($municipios); $m++){
					$consulSucurs = $this->query_assoc("SELECT D.idsucursal, D.municipio, D.estado, S.nombre FROM sucursales_domgeo D 
							JOIN sucursales S ON D.idsucursal = S.idsucursal 
								WHERE S.idbloque = $idBloque AND D.municipio = {$municipios[$m]['id']} AND S.idsucursal IN ($idSucursales) GROUP BY idsucursal");
					for($a = 0; $a < count($consulSucurs); $a++){
						$cantSucur;
						for($i = 0; $i < count($bloquesArray); $i++){
							if(intval($consulSucurs[$a]['idsucursal']) === intval($bloquesArray[$i]['idSucrusal'])){
								$cantSucur = $bloquesArray[$i]['cantidad'];
							}
						}
						$suc = array(
							"id" => $consulSucurs[$a]['idsucursal'],
							"nombre" => $consulSucurs[$a]['nombre'],
							"nombretxt" => $consulSucurs[$a]['nombre'],
							"cantidad" => $cantSucur
						);
						$suc2 = array(
							"id" => $consulSucurs[$a]['idsucursal'],
							"nombre" => $consulSucurs[$a]['nombre'],
							"cantidad" => $cantSucur,
							"municipio" => $consulSucurs[$a]['municipio'],
							"estado" => $consulSucurs[$a]['estado']
						);
						//array_push($res[$s]["sucursales"], $suc);
						array_push($sucMunArr[$res[$s]["idProveedor"]], $suc2);
					}
					//$res[$s]["sucursales"] = array_values( array_unique( $res[$s]["sucursales"], SORT_REGULAR ) );
				}
			}
			// FUNCION INTERNA ORDENAR ARROBJECT BY KEY
			function cmp($a, $b){
				return $a['id'] - $b['id'];
			}
			require_once('Domgeo.php');
			$Geo = new Domgeo();
			for($o1 = 0; $o1 < count($idsProvs); $o1++){
				$objeto = $sucMunArr[$idsProvs[$o1]];
				usort($objeto, "cmp");

				$new_array = array();
				$cont = 0;
				$sucMunArr[$idsProvs[$o1]]["sucursales"] = array();
				foreach( $objeto as $element ) {
				    if( !in_array( $element['id'], $new_array )) {
				    	array_push($new_array, $element['id']);
				    	if($cont > 0){
				    		$mun = $res[$o1]["sucursales"][$cont - 1]["nombretxt"];
				    		$mun = substr($mun, 0, strlen($mun)-1);
				    		$res[$o1]["sucursales"][$cont - 1]["nombretxt"] = $mun."</b>)";
				    	}
				        $suc = array(
							"id" => $element['id'],
							"nombre" => $element['nombre'],
							"nombretxt" => $element['nombre']." - (<b>".$Geo->getMun($element['estado'], $element['municipio'])[0]["nomMpo"].",",
							"cantidad" => $element['cantidad']
						);
				        array_push($sucMunArr[$idsProvs[$o1]]["sucursales"], $suc);
				        array_push($res[$o1]["sucursales"], $suc);
				        $cont++;
				    }else{
				    	$mun = $sucMunArr[$idsProvs[$o1]]["sucursales"][$cont - 1]["nombretxt"];
				    	$sucMunArr[$idsProvs[$o1]]["sucursales"][$cont - 1]["nombretxt"] = $mun.$Geo->getMun($element['estado'], $element['municipio'])[0]["nomMpo"].",";
				    	$res[$o1]["sucursales"][$cont - 1]["nombretxt"] = $mun.$Geo->getMun($element['estado'], $element['municipio'])[0]["nomMpo"].",";
				    }
				}
				$mun = $res[$o1]["sucursales"][$cont - 1]["nombretxt"];
				$mun = substr($mun, 0, strlen($mun)-1);
				$res[$o1]["sucursales"][$cont - 1]["nombretxt"] = $mun."</b>)";
			}
			//echo json_encode($sucMunArr); exit();
			
			// LLENAMOS LOS VALORES DE MUNICIPIOS NO CUBIERTOS (SUSTIUMOS LOS MUNICIPIOS POR SUCURSALES)
			// SCRIPT DE CONSULTA : SELECT D.idsucursal, S.nombre FROM sucursales_domgeo D 
							//JOIN sucursales S ON D.idsucursal = S.idsucursal 
								//WHERE S.idbloque = $idBloque AND D.municipio = {$noproveedor[$n]['idmun']} GROUP BY idsucursal
			$noprovsSuc = array();
			for($n = 0; $n < count($noproveedor); $n++){
				$consulSucurs = $this->query_assoc("SELECT D.idsucursal, D.municipio, D.estado, S.nombre FROM sucursales_domgeo D 
							JOIN sucursales S ON D.idsucursal = S.idsucursal 
								WHERE S.idbloque = $idBloque AND D.municipio = {$noproveedor[$n]['idmun']} AND S.idsucursal IN ($idSucursales) GROUP BY idsucursal");
				for($p = 0; $p < count($consulSucurs); $p++){
					$noprovCant;
					for($i = 0; $i < count($bloquesArray); $i++){
						if(intval($consulSucurs[$p]['idsucursal']) === intval($bloquesArray[$i]['idSucrusal'])){
							$noprovCant = $bloquesArray[$i]['cantidad'];
						}
					}
					$cero = 0;
					$noprov = array(
						"idmun" => $consulSucurs[$p]['idsucursal'],
						"municipio" => $consulSucurs[$p]['nombre'],
						"cantidad" => $cero,
						"municip" => $consulSucurs[$p]['municipio'],
						"estado" => $consulSucurs[$p]['estado']
					);
					array_push($noprovsSuc, $noprov);
				}
			}
			// FUNCION INTERNA ORDENAR ARROBJECT BY KEY
			function cmp2($a, $b){
				return $a['idmun'] - $b['idmun'];
			}
			usort($noprovsSuc, "cmp2");
			require_once('Domgeo.php');
			$Geo = new Domgeo();

			$noprovs = array();
			$new_array = array();
			$cont = 0;
			foreach( $noprovsSuc as $element ) {
				if( !in_array( $element['idmun'], $new_array )) {
					array_push($new_array, $element['idmun']);
					if($cont > 0){
				    	$mun = $noprovs[$cont - 1]["municipio"];
				    	$mun = substr($mun, 0, strlen($mun)-1);
				    	$noprovs[$cont - 1]["municipio"] = $mun."</b>)";
				    }
				    $suc = array(
						"idmun" => $element['idmun'],
						/*"nombre" => $element['nombre'],*/
						"municipio" => $element['municipio']." - (<b>".$Geo->getMun($element['estado'], $element['municip'])[0]["nomMpo"].",",
						"cantidad" => $element['cantidad']
					);
					array_push($noprovs, $suc);
					$cont++;
				}else{
				    $mun = $noprovs[$cont - 1]["municipio"];
				    $noprovs[$cont - 1]["municipio"] = $mun.$Geo->getMun($element['estado'], $element['municip'])[0]["nomMpo"].",";
				}
			}
			if(count($noprovs) > 0){
				$mun = $noprovs[$cont - 1]["municipio"];
				$mun = substr($mun, 0, strlen($mun)-1);
				$noprovs[$cont - 1]["municipio"] = $mun."</b>)";
			}
			

			// LLENAMOS LOS VALORES DE MUNICIPIOS CUBIERTOS (SUSTIUMOS LOS MUNICIPIOS POR SUCURSALES)
			$sucCubiertas = array();
			for($c = 0; $c < count($resMuns); $c++){
				$consulSucurs = $this->query_assoc("SELECT D.idsucursal, D.municipio, D.estado, S.nombre FROM sucursales_domgeo D 
							JOIN sucursales S ON D.idsucursal = S.idsucursal 
								WHERE S.idbloque = $idBloque AND D.municipio = {$resMuns[$c]['cveMpo']} AND S.idsucursal IN ($idSucursales) GROUP BY idsucursal");
				for($p = 0; $p < count($consulSucurs); $p++){
					$siCubCant;
					for($i = 0; $i < count($bloquesArray); $i++){
						if(intval($consulSucurs[$p]['idsucursal']) === intval($bloquesArray[$i]['idSucrusal'])){
							$siCubCant = $bloquesArray[$i]['cantidad'];
						}
					}

					$siCub = array(
						"cveMpo" => $consulSucurs[$p]['idsucursal'],
						"nomMpo" => $consulSucurs[$p]['nombre'],
						"cantidad" => $siCubCant,
						"municip" => $consulSucurs[$p]['municipio'],
						"estado" => $consulSucurs[$p]['estado']
					);
					array_push($sucCubiertas, $siCub);
				}
			}
			
			// FUNCION INTERNA ORDENAR ARROBJECT BY KEY
			function cmp3($a, $b){
				return $a['cveMpo'] - $b['cveMpo'];
			}
			usort($sucCubiertas, "cmp3");
			//echo(json_encode($sucCubiertas)); exit();

			require_once('Domgeo.php');
			$Geo = new Domgeo();

			$succubs = array();
			$new_array = array();
			$cont = 0;
			foreach( $sucCubiertas as $element ) {
				if( !in_array( $element['cveMpo'], $new_array )) {
					array_push($new_array, $element['cveMpo']);
					if($cont > 0){
				    	$mun = $succubs[$cont - 1]["nomMpo"];
				    	$mun = substr($mun, 0, strlen($mun)-1);
				    	$succubs[$cont - 1]["nomMpo"] = $mun."</b>)";
				    }
				    $suc = array(
						"cveMpo" => $element['cveMpo'],
						/*"nombre" => $element['nombre'],*/
						"nomMpo" => $element['nomMpo']." - (<b>".$Geo->getMun($element['estado'], $element['municip'])[0]["nomMpo"].",",
						"cantidad" => $element['cantidad']
					);
					array_push($succubs, $suc);
					$cont++;
				}else{
				    $mun = $succubs[$cont - 1]["nomMpo"];
				    $succubs[$cont - 1]["nomMpo"] = $mun.$Geo->getMun($element['estado'], $element['municip'])[0]["nomMpo"].",";
				}
			}
			if(count($succubs)){
				$mun = $succubs[$cont - 1]["nomMpo"];
				$mun = substr($mun, 0, strlen($mun)-1);
				$succubs[$cont - 1]["nomMpo"] = $mun."</b>)";
			}

			$response[$idBloque][0] = $res;
			$response[$idBloque][1] = $noprovs; /*array_values( array_unique( $noprovsSuc, SORT_REGULAR ) );$noprovsSuc;*/
			$response[$idBloque][2] = $succubs; /*array_values( array_unique( $sucCubiertas, SORT_REGULAR ) );$sucCubiertas;*/
			return $response; echo(json_encode($response)); exit();
		
		}

		public function create($info){

			$recibido_via = $info['select_via'];

			if($recibido_via == 'Otro')
				$recibido_via = $info['txt_otro'];

			$cliente 			= 	$info['txt_cliente'];
			$fechasolicitud 	= 	$info['txt_fecha'];
			$hora 				= 	$info['txt_hora'];
			$alias 				= 	$info['txt_alias'];
			$tipo 				= 	$info['select_servicio'];
			$cantidad 			= 	$info['txt_cantidadP1'];
			$vigencia 			= 	$info['txt_vigencia'];
			$periodoini			=	$info['txt_periodoini'];
			$periodofin 		= 	$info['txt_periodofin'];
			$detalles 			= 	$info['txt_detalles'];
			$status 			= 	$info['status'];

			$zonas = $info['zonas'];

			$zonasInsert = "";

			foreach ($zonas as $key => $value) {
				$zonasInsert .= "($, {$value['idedo']}, \'{$value['edo']}\', \'{$value['cantidad']}\', {$value['status']}),";
			}

			$zonasInsert = substr($zonasInsert, 0, strlen($zonasInsert)-1);

			$consult = "CALL SP_CREATETRABAJO(
				$cliente, '$fechasolicitud', '$hora', '$recibido_via','$alias','$tipo', 
				'$cantidad', '$vigencia', '$periodoini', '$periodofin', '$detalles',
				$status, '$zonasInsert', '-', 'PASO1Y2'
			)";

			// ARRAY CON LA INTENCION DE INSERTAR DATOS DIRECTAMENTE DESDE AQUI
			$sqlAux = array();

			if($this->query($consult)){

				$lastID = $this->query_single_object("SELECT MAX(idtrabajo) id FROM trabajos");
				$arr = $this->query_assoc("SELECT id FROM trabajos_nivel2 WHERE fk_idTrabajo = '$lastID->id'");

				$detallesInsert = "";
				$contArr = 0;

				$condiVerifCount = "";

				foreach ($zonas as $key => $value){
					$infoZona = $value['info'];

					for ($i = 0; $i < count($infoZona); $i++){

						$municipios = $infoZona[$i]['municipios'];
						$nocubiertos = $infoZona[$i]['nocubiertos'];

						$listMunicipios = "";
						$listNocubiertos = "";
						for ($j = 0; $j < count($municipios); $j++){
							$listMunicipios .= "{$municipios[$j]},";
						}
						for ($l = 0; $l < count($nocubiertos); $l++){
							$listNocubiertos .= "{$nocubiertos[$l]},";
						}

						$listMunicipios = substr($listMunicipios, 0, strlen($listMunicipios)-1);
						$listNocubiertos = substr($listNocubiertos, 0, strlen($listNocubiertos)-1);

						$detallesInsert .= "({$arr[$contArr]['id']}, {$infoZona[$i]['proveedor']}, \'{$infoZona[$i]['cantidad']}\', \'$listMunicipios\', \'$listNocubiertos\'),";
						// ARRAY CONCATENADO PARA EJECUTAR LAS SQL QUERYS
						$sqlAux[] = "(".$arr[$contArr]['id'].",".$infoZona[$i]['proveedor'].",'".$infoZona[$i]['cantidad']."','".$listMunicipios."','".$listNocubiertos."')";
						
						/*$condiVerifCount .= $arr[$contArr]['id'];
						if($contArr > 0){$condiVerifCount .= ',';}*/

					}
					$contArr++;
				}
				
				$detallesInsert = substr($detallesInsert, 0, strlen($detallesInsert)-1);
				$consult = "CALL SP_CREATETRABAJO(
					$cliente, '$fechasolicitud', '$hora', '$recibido_via','$alias','$tipo',
					'$cantidad', '$vigencia', '$periodoini', '$periodofin', '$detalles',
					$status, '-','$detallesInsert', 'PASO3'
				)";
				if($this->query($consult)){
					// GUARDA EL REGISTRO PARA LAS ACTIVIDADES PENDIENTES
					$trabajoPendientes = $this->query("CALL SP_ALTATRABAJOPENDIENTES('$lastID->id', '$tipo')");
				}

				/*for($q = 0; $q < count($sqlAux); $q++){
					$this->query("INSERT INTO trabajos_zonas_detalles (idZonaTrabajo, idProveedor, cantidad, municipios, nocubiertos) VALUES ".$sqlAux[$q]);
				}*/
				
			}else{
				return false;
			}
		}

		public function edit($info){
			$idP = $info['idPrinc'];
			$idsN2 = "(".$info['idsN2'].")";

			$recibido_via = $info['select_via'];

			if($recibido_via == 'Otro')
				$recibido_via = $info['txt_otro'];

			$cliente 			= 		$info['txt_cliente'];
			$fechasolicitud 	= 		$info['txt_fecha'];
			$hora 				= 		$info['txt_hora'];
			$alias 				= 		$info['txt_alias'];
			$tipo 				= 		$info['select_servicio'];
			$cantidad 			= 		$info['txt_cantidadP1'];
			$vigencia 			= 		$info['txt_vigencia'];
			$periodoini 		= 		$info['txt_periodoini'];
			$periodofin 		= 		$info['txt_periodofin'];
			$detalles 			= 		$info['txt_detalles'];
			$status 			= 		$info['status'];

			$zonas = $info['zonas'];

			$zonasInsert = "";

			foreach ($zonas as $key => $value) {
				$zonasInsert .= "({$idP}, {$value['idedo']}, \'{$value['edo']}\', \'{$value['cantidad']}\', {$value['status']}),";
			}

			$zonasInsert = substr($zonasInsert, 0, strlen($zonasInsert)-1);

			$consult = "CALL SP_EDITTRABAJOS(
				$idP, '$idsN2', $cliente, '$fechasolicitud', '$hora', '$recibido_via', '$alias', '$tipo', 
				'$cantidad', '$vigencia', '$periodoini', '$periodofin', '$detalles', $status, '$zonasInsert',
				'-', 'PASO1'
			)";

			if($this->query($consult)){
				$arr = $this->query_assoc("SELECT id FROM trabajos_nivel2 WHERE fk_idTrabajo = ".$idP);

				$detallesInsert = "";
				$contArr = 0;

				$condiVerifCount = "";

				foreach ($zonas as $key => $value){
					$infoZona = $value['info'];

					for ($i = 0; $i < count($infoZona); $i++){

						$municipios = $infoZona[$i]['municipios'];
						$nocubiertos = $infoZona[$i]['nocubiertos'];

						$listMunicipios = "";
						$listNocubiertos = "";
						for ($j = 0; $j < count($municipios); $j++){
							$listMunicipios .= "{$municipios[$j]},";
						}
						for ($l = 0; $l < count($nocubiertos); $l++){
							$listNocubiertos .= "{$nocubiertos[$l]},";
						}

						$listMunicipios = substr($listMunicipios, 0, strlen($listMunicipios)-1);
						$listNocubiertos = substr($listNocubiertos, 0, strlen($listNocubiertos)-1);

						$detallesInsert .= "({$arr[$contArr]['id']}, {$infoZona[$i]['proveedor']}, \'{$infoZona[$i]['cantidad']}\', \'$listMunicipios\', \'$listNocubiertos\'),";
					}
					$contArr++;
				}
				
				$detallesInsert = substr($detallesInsert, 0, strlen($detallesInsert)-1);
				$consult2 = "CALL SP_EDITTRABAJOS(
					$idP, '$idsN2', $cliente, '$fechasolicitud', '$hora', '$recibido_via', '$alias', '$tipo', 
					'$cantidad', '$vigencia', '$periodoini', '$periodofin', '$detalles', $status, '$zonasInsert',
					'$detallesInsert', 'PASO2'
				)";
				if($this->query($consult2)){
					// RESTAURACION PARA TRABAJOS DE PERIFONEO
					$idsPerif = $this->query_assoc("SELECT CTP.id, CTP.idsucursal FROM config_trabajo_perifoneo CTP WHERE CTP.idtrabajo = $idP");
					for($p = 0; $p < count($idsPerif); $p++){
						$this->query("DELETE FROM config_trabajo_detalle_perifoneo WHERE idconfig IN (SELECT id FROM config_trabajo_detalle WHERE idconfig = {$idsPerif[$p]['id']} AND sucursal = {$idsPerif[$p]['idsucursal']})");
						$this->query("DELETE FROM config_trabajo_detalle WHERE idconfig = {$idsPerif[$p]['id']} AND sucursal = {$idsPerif[$p]['idsucursal']}");
					}
					
					$restTabs = $this->query("CALL SP_RESTAURARTRABAJOSANEXAS('$idP')");
					$this->query("CALL SP_ALTATRABAJOPENDIENTES('$idP', '$tipo')");
					return "EXITO";
				}else{
					return "ERROR";
				}

			}else{
				return $consult;
			}
		}

		public function showNivel1(){

			$consult = "SELECT * FROM vwTrabajosLvl1";

			return $this->query_row($consult);

		}

		public function showNivel2($info){

			$consult = "SELECT * FROM vwTrabajosLvl2 WHERE idtrabajo = $info";

			return $this->query_assoc($consult);
			
		}

		public function showNivel3($info){
			$id = $info['id'];
			$edo = $info['edo'];

			$consult = "SELECT * FROM vwTrabajosLvl3 WHERE idZonaTrabajo = $id";
			$res = $this->query_assoc($consult);

			for ($i = 0; $i < count($res); $i++) {
				$muns = $res[$i]['municipios'];
				$muns = explode(',', $muns);

				$nomuns = $res[$i]['nocubiertos'];
				$nomuns = explode(',', $nomuns);

				$municipios = array();
				$nocubiertos = array();

				for ($j = 0; $j < count($muns); $j++) {
					if(explode(':',$muns[$j])[0] != '0'){
						//$municipio = $Geo->getMun($edo, explode(':',$muns[$j])[0]); ::::: CAMBIO 23/07/2017
						$sucursal = explode(':',$muns[$j])[0];
						$municipio = $this->query_assoc("SELECT idsucursal AS cveMpo, nombre AS nomMpo FROM sucursales WHERE idsucursal = $sucursal AND idbloque = $edo");
					}else{
						$municipio[0]['cveMpo'] = "0";
						$municipio[0]['nomMpo'] = "S/M";
					}
					$municipio[0]['canMpo'] = explode(':',$muns[$j])[1];

					array_push($municipios, $municipio[0]);

				}

				for ($o = 0; $o < count($nomuns); $o++){
					if(explode(':',$nomuns[$o])[0] != '0'){
						//$nomunicipio = $Geo->getMun($edo, explode(':',$nomuns[$o])[0]); ::::: CAMBIO 23/07/2017
						$sucursal = explode(':',$muns[$j])[0];
						$nomunicipio = $this->query_assoc("SELECT idsucursal AS cveMpo, nombre AS nomMpo FROM sucursales WHERE idsucursal = $sucursal AND idbloque = $edo");
					}else{
						$nomunicipio[0]['cveMpo'] = "0";
						$nomunicipio[0]['nomMpo'] = "S/M";
					}
					$nomunicipio[0]['canMpo'] = explode(':',$nomuns[$o])[1];

					array_push($nocubiertos, $nomunicipio[0]);

				}

				$res[$i]['municipios'] = $municipios;
				$res[$i]['nocubiertos'] = $nocubiertos;
			}

			return $res;$res = $this->query_assoc($consult);

			for ($i = 0; $i < count($res); $i++) {
				$muns = $res[$i]['municipios'];
				$muns = explode(',', $muns);

				$nomuns = $res[$i]['nocubiertos'];
				$nomuns = explode(',', $nomuns);

				$municipios = array();
				$nocubiertos = array();

				for ($j = 0; $j < count($muns); $j++) {
					if(explode(':',$muns[$j])[0] != '0'){
						//$municipio = $Geo->getMun($edo, explode(':',$muns[$j])[0]); ::::: CAMBIO 23/07/2017
						$sucursal = explode(':',$muns[$j])[0];
						$municipio = $this->query_assoc("SELECT idsucursal AS cveMpo, nombre AS nomMpo FROM sucursales WHERE idsucursal = $sucursal AND idbloque = $edo");
					}else{
						$municipio[0]['cveMpo'] = "0";
						$municipio[0]['nomMpo'] = "S/M";
					}
					$municipio[0]['canMpo'] = explode(':',$muns[$j])[1];

					array_push($municipios, $municipio[0]);

				}

				for ($o = 0; $o < count($nomuns); $o++){
					if(explode(':',$nomuns[$o])[0] != '0'){
						//$nomunicipio = $Geo->getMun($edo, explode(':',$nomuns[$o])[0]); ::::: CAMBIO 23/07/2017
						$sucursal = explode(':',$muns[$j])[0];
						$nomunicipio = $this->query_assoc("SELECT idsucursal AS cveMpo, nombre AS nomMpo FROM sucursales WHERE idsucursal = $sucursal AND idbloque = $edo");
					}else{
						$nomunicipio[0]['cveMpo'] = "0";
						$nomunicipio[0]['nomMpo'] = "S/M";
					}
					$nomunicipio[0]['canMpo'] = explode(':',$nomuns[$o])[1];

					array_push($nocubiertos, $nomunicipio[0]);

				}

				$res[$i]['municipios'] = $municipios;
				$res[$i]['nocubiertos'] = $nocubiertos;
			}

			return $res;

		}

		public function accionTrabajos($info){
			$dato = explode(':', $info);
			$llenarAccion = $this->query("UPDATE accion_trabajos SET accion='".$dato[0]."',idobj='".$dato[1]."' WHERE id='key'");
		}

		public function traerAccionTrabajos($info){
			$dato = explode(':', $info);
			$llenarAccion = $this->query_assoc("SELECT * FROM accion_trabajos WHERE id='key'");
			$accion = $llenarAccion[0]['accion'].':'.$llenarAccion[0]['idobj'];
			
			return $accion;
		}

		public function editarTrabajo($info){
			$consultaT1 = $this->query_assoc("SELECT * FROM trabajos WHERE idtrabajo = ".$info);
			$consultaT2 = $this->query_assoc("SELECT * FROM trabajos_nivel2 WHERE fk_idTrabajo = ".$info);

			$condicionC3 = '';
			$munsIDS = [];
			for($i = 0; $i < count($consultaT2); $i++){
				if($i > 0){
					$condicionC3 .= ',';
				}
				$condicionC3 .= $consultaT2[$i]['id'];
				$munsIDS[$i] = $consultaT2[$i]['id'].','.$consultaT2[$i]['idEdo'];
			}

			$consultaT3 = $this->query_assoc("SELECT * FROM trabajos_zonas_detalles WHERE idZonaTrabajo IN (".$condicionC3.")");

			$contT2 = 0;
			for($c3 = 0; $c3 < count($consultaT3); $c3++){
				if($consultaT3[$c3]['idZonaTrabajo'] === $consultaT2[$contT2]['id']){
					$consultaT3[$c3]['Zona'] = $consultaT2[$contT2]['idEdo'];
					$consultaT3[$c3]['Estado'] = $consultaT2[$contT2]['edo'];
				}else{
					$contT2++;
					$consultaT3[$c3]['Zona'] = $consultaT2[$contT2]['idEdo'];
					$consultaT3[$c3]['Estado'] = $consultaT2[$contT2]['edo'];
				}
				$consultaT3[$c3]['munscub'] = 'NA';
				$consultaT3[$c3]['munsnocub'] = 'NA';
			}

			$idSucursales = "";
			for($j = 0; $j < count($munsIDS); $j++){
				//$muns = $this->query_assoc("SELECT * FROM municipios WHERE idestado = ".explode(',', $munsIDS[$j])[1]);
				$muns = $this->query_assoc("SELECT nombre AS municipio FROM sucursales WHERE idbloque = ".explode(',', $munsIDS[$j])[1]);
				for($k = 0; $k < count($consultaT3); $k++){
					if(intval($consultaT3[$k]['cantidad']) !== 0 && explode(',', $munsIDS[$j])[0] === $consultaT3[$k]['idZonaTrabajo']){
						$munCubList = '';
						$munnoCubLis = '';

						$munCub = explode(',', $consultaT3[$k]['municipios']);
						$munnoCub = explode(',', $consultaT3[$k]['nocubiertos']);

						for($l = 0; $l < count($munCub); $l++){
							$con = 1;
							for($m = 0; $m < count($muns); $m++){
								if($con === intval(explode(':', $munCub[$l])[0])){
									if($l > 0)
										$munCubList .= ',';
									$munCubList .= $muns[$m]['municipio'];
								}
								$con++;
							}
							$consultaT3[$k]['munscub'] = $munCubList;
							// IDS DOMGEO (PERO EN REALIDAD SON DE SUCURSALES)
							$idSucursales .= explode(':', explode(',', $munCub[$l])[0])[0].",";
						}

						for($l = 0; $l < count($munnoCub); $l++){
							if(intval(explode(':', $munnoCub[$l])[0]) !== 0){
								$con = 1;
								for($m = 0; $m < count($muns); $m++){
									if($con === intval(explode(':', $munnoCub[$l])[0])){
										if($l > 0)
											$munnoCubLis .= ',';
										$munnoCubLis .= $muns[$m]['municipio'];
									}
									$con++;
								}
								$consultaT3[$k]['munsnocub'] = $munnoCubLis;
							}
							// IDS DOMGEO (PERO EN REALIDAD SON DE SUCURSALES)
							$idSucursales .= explode(':', explode(',', $munnoCub[$l])[0])[0].",";
						}
					}
				}
			}

			// *************** :::::::::::: [22/07/2017] ::::::::::::::::: *************
			$idSucursales = substr($idSucursales, 0, strlen($idSucursales)-1);
			$domgeoDATA = array();
			// REVISAR LA CONSULTA PARA FUTURAS FALLAS
			$consultSucursales = $this->query_assoc("SELECT estado, municipio FROM sucursales_domgeo WHERE idsucursal IN ($idSucursales) GROUP BY estado, municipio");
			for($s = 0; $s < count($consultSucursales); $s++){
				$domgeo = array(
					"cantidad" => $consultSucursales[$s]["estado"],
					"idEdo" => $consultSucursales[$s]["estado"],
					"idMun" => $consultSucursales[$s]["municipio"],
					"nombEdo" => $consultSucursales[$s]["estado"]
				);
				array_push($domgeoDATA, $domgeo);
			}

			// LLENAR VARIABLE CON LOS 3 RESULTADOS
			$jsonEnviar['PASO1'] = $consultaT1;
			$jsonEnviar['PASO2'] = $consultaT2;
			$jsonEnviar['PASO3'] = $consultaT3;
			$jsonEnviar['DOMGEO'] = $domgeoDATA;

			return $jsonEnviar;
		}

		public function eliminarTrabajo($info){
			$id = intval($info);
			$elimTrabajo = "CALL SP_DELETETRABAJOS($id)";
			if($this->query($elimTrabajo)){
				return true;
			}else{
				return $elimTrabajo;
			}
		}

		// FUNCIONES CON MAILS, CLIENTES Y TRABAJOS
		public function verifMail($info){
			$verifCount = $this->query_single_object("SELECT COUNT(*) C FROM adminmail WHERE idtrabajo = $info");
			if($verifCount->C > 0){
				$verif = $this->query_assoc("SELECT status FROM adminmail WHERE idtrabajo = $info ORDER BY id DESC LIMIT 1");
				if(intval($verif[0]["status"]) === 1){
					return "VIGENTE";
				}
				else if(intval($verif[0]["status"]) === 5){
					return "COMPLETADO";
				}else{
					return "ENPROCESO";
				}
			}else{
				return "SIN ENVIAR";
			}
		}

		public function generarMail($info){
			$idtrabajo = $info["idCliente"];
			$reenvio = $info["accion"];
			$continuar = true;

			// ************* [30/07/2017] *************
			// NUEVA FUNCION CAMBIOS REQUERIDOS
			$sucsConsult = $this->query_assoc("SELECT Z.municipios, T.id FROM trabajos_zonas_detalles Z JOIN trabajos_nivel2 T ON T.fk_idTrabajo = $idtrabajo WHERE Z.idZonaTrabajo = T.id");
			$sucsTxt = "";
			for($c = 0; $c < count($sucsConsult); $c++){
				$sucsTxt .= $sucsConsult[$c]['municipios'] . ",";
			}
			$sucsTxt = substr($sucsTxt, 0, strlen($sucsTxt)-1);
			$sucs = explode(',', $sucsTxt);
			sort($sucs);
			$sucsIDS = "";

			$sucsString = [];
			$sucsStringArr = [];
			$sucsCants = [];
			$sucsCantsArr = [];
			for($t = 0; $t < count($sucs); $t++){
				array_push($sucsStringArr, intval(explode(':', $sucs[$t])[0]));
				array_push($sucsCantsArr, intval(explode(':', $sucs[$t])[1]));
				$sucsIDS .= explode(':', $sucs[$t])[0] . ",";
			}
			$sucsIDS = substr($sucsIDS, 0, strlen($sucsIDS)-1);

			for($a = 0; $a < count($sucsStringArr); $a++){
				if(!in_array($sucsStringArr[$a], $sucsString)){
					array_push($sucsString, $sucsStringArr[$a]);
					array_push($sucsCants, $sucsCantsArr[$a]);
				}else{
					$sucsCants[$a - 1] = intval($sucsCants[$a - 1]) + intval($sucsCantsArr[$a]);
				}
			}

			$mailsArr = array();
			$mailsSucsDB = $this->query_assoc("SELECT ctacorreo, idbloque FROM sucursales WHERE idsucursal IN ($sucsIDS)");
			for($m = 0; $m < count($mailsSucsDB); $m++){
				array_push($mailsArr, $mailsSucsDB[$m]["ctacorreo"]);
			}

			$sucsTrabajosInsert = "";
			for($s = 0; $s < count($sucsString); $s++){
				$provs = $this->query_assoc("SELECT idProveedor FROM trabajos_zonas_detalles WHERE municipios RLIKE '[[:<:]]$sucsString[$s][[:>:]]' AND idZonaTrabajo = {$sucsConsult[0]['id']}");
				$cliente = $this->query_assoc("SELECT idcliente FROM trabajos WHERE idtrabajo = $idtrabajo");
				$provsIds = "";
				for($p = 0; $p < count($provs); $p++){
					$provsIds .= $provs[$p]['idProveedor'].",";
				}
				$provsIds = substr($provsIds, 0, strlen($provsIds)-1);
				$sucsTrabajosInsert .= "($idtrabajo, {$cliente[0]['idcliente']}, {$mailsSucsDB[0]['idbloque']}, $sucsString[$s], $sucsCants[$s], '$provsIds'),";
			}
			$sucsTrabajosInsert = substr($sucsTrabajosInsert, 0, strlen($sucsTrabajosInsert)-1);


			if($reenvio === "REENVIAR"){
				$ultimoID = $this->query_assoc("SELECT id FROM adminmail WHERE idtrabajo = $idtrabajo ORDER BY id DESC LIMIT 1");
				$idmail = $ultimoID[0]["id"];
				$mailRenviar = "CALL SP_REENVIARMAIL(
		    		'$idmail'
		    	)";
				if(!$this->query($mailRenviar))
					$continuar = false;
			}else if($reenvio === "NUEVO"){
				$this->query("CALL SP_STATUSTRABAJO('$idtrabajo', '6')");
				$this->query("INSERT INTO trabajos_sucursales (idtrabajo, idcliente, idbloque, idsucursal, cantidad, proveedores) VALUES ".$sucsTrabajosInsert);
			}
			
			if($continuar === true){
				$datosTrabajo = $this->query_assoc("SELECT * FROM trabajos WHERE idtrabajo = ".$idtrabajo);
				$mailCliente = $this->query_assoc("SELECT * FROM clientes WHERE idcliente = ".$datosTrabajo[0]["idcliente"]);
				$nomcliente = $mailCliente[0]["nombre"];

			    // CREANDO LA CADENA URL
			    $caracteres = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
			    $caracteresLong = strlen($caracteres);
			    $url = '';
			    for ($i = 0; $i < 24; $i++)
			        $url .= $caracteres[rand(0, $caracteresLong - 1)];
			    // FIN CREANDO LA CADENA URL

			    $idcliente = $datosTrabajo[0]["idcliente"];

			    $altaMail = "CALL SP_ALTAMAIL(
			    	'$idtrabajo', '$idcliente', '$url'
			    )";
				if($this->query($altaMail)){
					$idMail = $this->query_assoc("SELECT DISTINCT LAST_INSERT_ID() FROM adminmail");
					// PREPARANDO MAIL
					$msg = $info["contenido"];
					$msg = str_replace("*CLIENTE*",$nomcliente,$msg);
					$msg = str_replace("*IDMAIL*",$idMail[0]["LAST_INSERT_ID()"],$msg);
					$msg = str_replace("*URL*",$url,$msg);

					$bloqueCorreo = $this->query_assoc("SELECT ctacorreo FROM bloques WHERE idbloque = ".$mailsSucsDB[0]["idbloque"]);
					array_push($mailsArr, $bloqueCorreo[0]['ctacorreo']);

					$mail = $this->mailCliente($mailCliente[0]["ctacorreo"], $mailCliente[0]["nombre"], $datosTrabajo[0]["tipo"], "Configurar Trabajo", $mailsArr);
					return "EXITO";
				}else{
					return false;
				}
			}else{
				return false;
			}
		}

		public function traerMail($info){
			$traerMail = $this->query_assoc("SELECT * FROM adminmail WHERE idtrabajo = $info AND status > 1");
			return $traerMail;
		}

		public function edicionMailCliente($info){
			if($this->query("CALL SP_STATUSUCURSAL('{$info['trab']}','{$info['suc']}', '3')")){
				$mailSuc = $this->query_assoc("SELECT ctacorreo, nombre FROM sucursales WHERE idsucursal = {$info['suc']}");
				$mailBloque = $this->query_assoc("SELECT B.ctacorreo FROM trabajos_nivel2 T JOIN bloques B ON B.idbloque = T.idEdo WHERE T.fk_idTrabajo = {$info['trab']}");
				$mailCliente = $this->query_assoc("SELECT C.ctacorreo FROM trabajos T JOIN clientes C ON C.idcliente = T.idcliente WHERE T.idtrabajo = {$info['trab']}");

				$correos = array();
				array_push($correos, $mailBloque[0]['ctacorreo']);
				array_push($correos, $mailCliente[0]['ctacorreo']);

				$this->correoReenvio($mailSuc[0]['ctacorreo'], '', $info['trab'], $mailSuc[0]['nombre'], 'CLIENTE', $correos);
				return "EXITO";
			}else{
				return "ERROR";
			}
		}

		public function enviarMailProveedor($info){
			$dataProv = $this->query_assoc("SELECT IT.*, S.nombre, M.url, M.id AS idmail FROM trabajos_sucursales IT JOIN sucursales S ON S.idsucursal = IT.idsucursal JOIN adminmail M ON M.idtrabajo = {$info['cliente']} AND M.status > 1 WHERE IT.idtrabajo = {$info['cliente']} AND IT.idsucursal = {$info['suc']}");
			if(intval($dataProv[0]["status"]) === 1 || intval($dataProv[0]["status"]) === 3){
				return "EDITANDO";
			}else if(intval($dataProv[0]["status"]) === 2){
				return "ENREVISION";
			}else if(intval($dataProv[0]["status"]) === 5){
				return "COMPLETADO";
			}else{
				$provs = $this->query_assoc("SELECT idproveedor,nombre,ctacorreo FROM proveedores WHERE idproveedor IN ({$dataProv[0]['proveedores']})");
				$altaTrabajosPorvs = "";
				for($m = 0; $m < count($provs); $m++){
					$mail = $this->correoProveedor($provs[$m]["ctacorreo"], $provs[$m]["nombre"], $info['cliente'], $dataProv[0]["nombre"]);
					
					$sucsDet = $this->query_assoc("SELECT D.municipios FROM trabajos_nivel2 T JOIN trabajos_zonas_detalles D ON D.idZonaTrabajo = T.id AND D.idProveedor = {$provs[$m]['idproveedor']} AND D.municipios RLIKE '[[:<:]]{$info['suc']}[[:>:]]' WHERE T.fk_idTrabajo = {$info['cliente']}");
					$sucsArr = explode(",", $sucsDet[0]["municipios"]);
					$sucCnt = "";
					for($s = 0; $s < count($sucsArr); $s++){
						$val = explode(":", $sucsArr[$s]);
						if(intval($val[0]) === intval($info['suc'])){
							$sucCnt = $val[1];
						}
					}
					$altaTrabajosPorvs .= "({$info['suc']}, {$info['cliente']}, $sucCnt, {$provs[$m]['idproveedor']}),";
					//$altaTrabajosPorvs .= "({$info['suc']}, {$info['cliente']}, {$provs[$m]['idproveedor']}),";
				}
				//echo $altaTrabajosPorvs; exit();
				$altaTrabajosPorvs = substr($altaTrabajosPorvs, 0, strlen($altaTrabajosPorvs)-1);
				$verif = $this->query_assoc("SELECT COUNT(*) AS suma FROM config_trabajo_proveedor WHERE idtrabajo = {$info['cliente']} AND idsucursal = {$info['suc']} AND idproveedor IN ({$dataProv[0]['proveedores']})");
				if(intval($verif[0]['suma']) < 1){
					$this->query("CALL SP_CONFIGTRABPROVS('$altaTrabajosPorvs')");
				}

				// DESACTIVAMOS EL TRABAJO
				$this->query("CALL SP_STATUSUCURSAL('{$info['cliente']}','{$info['suc']}', '4')");

				// VERIFICACION QUE TODOS LOS PROVEEDORES HAYAN RECIBIDO EL MAIL
				$contProvs = $this->query_assoc("SELECT proveedores FROM trabajos_sucursales WHERE idtrabajo = {$info['cliente']}");
				$provsNum = ""; 
				for($p = 0; $p < count($contProvs); $p++){
					$provsNum .= $contProvs[$p]['proveedores'].',';
				}
				$provsNum = substr($provsNum, 0, strlen($provsNum)-1);
				$contProvs2 = $this->query_assoc("SELECT idproveedor FROM config_trabajo_proveedor WHERE idtrabajo = {$info['cliente']}");
				if(count(explode(',', $provsNum)) === count($contProvs2)){
					$this->query("CALL SP_CAMBIARSTATUS('{$dataProv[0]['idmail']}', 'PROVEEDOR')");
					$this->query("CALL SP_ACTUALIZARPENDIENTETRABAJO('correoproveedores', '{$info['cliente']}', 'ACTIVAR')");
				}

				return "ENVIADO";
			}
		}

		// FUNCIONES RELACIONADAS AL LAS ALERTAS
		public function comenzarSeguimiento($info){
			if($this->query("CALL SP_STATUSTRABAJO('$info', '3')")){
				return "EXITO";
			}else{
				return "ERROR";
			}
		}

		public function configCliente($info){
			if($this->query("CALL SP_STATUSTRABAJO('$info', '5')")){
				return "EXITO";
			}else{
				return "ERROR";
			}
		}

		public function mostrarRoles($info){
			$principal = $this->query_assoc("SELECT T.idtrabajo ,S.nombre, S.encargado, C.cantTienda, C.id AS idconfig, TS.cantidad, TS.proveedores, T.alias, T.tipo, T.vigencia FROM trabajos_sucursales TS JOIN trabajos T ON T.idtrabajo = {$info['trab']} JOIN sucursales S ON S.idsucursal = {$info['suc']} JOIN config_trabajo C ON C.idtrabajo = {$info['trab']} AND C.sucursal = {$info['suc']} WHERE TS.idtrabajo = {$info['trab']} AND TS.idsucursal = {$info['suc']}");
			if(count($principal) > 0){
				$detalles = $this->query_assoc("SELECT * FROM config_trabajo_detalle WHERE idconfig = {$principal[0]['idconfig']}");
				$horarios = $this->query_assoc("SELECT * FROM config_trabajo_proveedor WHERE idsucursal = {$info['suc']} AND idtrabajo = {$info['trab']} AND inicio <> '1111-11-11' AND fin <> '1111-11-11'");

				require_once('Domgeo.php');
				for($i = 0; $i < count($detalles); $i++){
					$Geo[$i] = new Domgeo();

					$poligono = $this->query_assoc("SELECT nombre FROM zonaspoligonos WHERE id = {$detalles[$i]['poligono']}");

					$edo = $Geo[$i]->getEdo($detalles[$i]['estado']);
					$mun = $Geo[$i]->getMun($detalles[$i]['estado'], $detalles[$i]['municipio']);

					$detalles[$i]["Estado"] = $edo[0]["nombent"];
					$detalles[$i]["Municipio"] = $mun[0]["nomMpo"];
					$detalles[$i]["Localidad"] = $poligono[0]["nombre"];

					$nomProveedores = "";
					$nomProv = $this->query_assoc("SELECT P.nombre FROM trabajos_zonas_detalles TD JOIN trabajos_nivel2 T ON T.fk_idTrabajo = {$info['trab']} JOIN proveedores P ON P.idproveedor = TD.idProveedor JOIN vwZonas Z ON Z.idEdo = {$detalles[$i]['estado']} AND Z.mun = {$detalles[$i]['municipio']} AND Z.idProveedor = TD.idProveedor WHERE TD.municipios RLIKE '[[:<:]]{$info['suc']}[[:>:]]' AND TD.idZonaTrabajo = T.id");
					for($p = 0; $p < count($nomProv); $p++){
						if($p > 0){ $nomProveedores .= '<br>'; }
						$nomProveedores .= $nomProv[$p]["nombre"];
					}
					$detalles[$i]["NomProvs"] = $nomProveedores;
				}

				for($h = 0; $h < count($horarios); $h++){
					$nomProv = $this->query_assoc("SELECT nombre FROM proveedores WHERE idproveedor = ".$horarios[$h]["idproveedor"]);
					$horarios[$h]["NomProv"] = $nomProv[0]["nombre"];
				}

				$rolesData["cliente"] = $principal;
				$rolesData["detalles"] = $detalles;
				$rolesData["horarios"] = $horarios;
				return $rolesData;
			}else{
				return "SINCONFIGURAR";
			}
		}

		public function guardarRoles($info){
			$cuerpo = $info["mensaje"];

			if($this->query("CALL SP_STATUSUCURSAL('{$info['trab']}','{$info['suc']}', '6')")){
				$conteoSucsTrab = $this->query_assoc("SELECT COUNT(*) AS conteo, SUM(status) AS suma FROM trabajos_sucursales WHERE idtrabajo = {$info['trab']}");
				if(intval($conteoSucsTrab[0]['conteo']) != intval($conteoSucsTrab[0]['suma'])){
					$valueStatus = intval($conteoSucsTrab[0]['suma']) / intval($conteoSucsTrab[0]['conteo']);
					if(intval($valueStatus) === 6){
						$this->query("CALL SP_STATUSTRABAJO('{$info['trab']}', '11')");
						$this->query("CALL SP_ACTUALIZARPENDIENTETRABAJO('enviopropcliente', '{$info['trab']}', 'ACTIVAR')");
					}
				}
			}

			$correoCliente = $this->query_assoc("SELECT C.ctacorreo FROM trabajos T JOIN clientes C ON C.idcliente = T.idcliente WHERE T.idtrabajo = {$info['trab']}");
			$nomSuc = $this->query_assoc("SELECT nombre FROM sucursales WHERE idsucursal = {$info['suc']}");
			$correoHeraldos = json_decode(file_get_contents("../params/mailAdminJSON.json"), true)["MailAdmin"];
			$msg = '<!DOCTYPE html>'.
						'<html>'.
						'<head>'.
							'<title>.: - Mail-Format -:.</title>'.
						'</head>'.
						'<body>'.
							'<div style="width: 450px;">'.
								'<div style="background:#fff; border:1px solid #ddd; box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2); margin: 15px 0; overflow:hidden;border-radius:7px;border-color: #428bca;">'.
									'<div style="border-color: transparent #428bca transparent transparent;border-color: rgba(255,255,255,0) #428bca rgba(255,255,255,0) rgba(255,255,255,0);">'.
									'</div>'.
									'<div style="padding:0 20px 10px;">'.
										'<h3 style="font: 21px Helvetica Neue,Helvetica,Arial,sans-serif;">Descripcion de Roles de trabajo: '.$info['trab'].'</h3><h3>Sucursal: '.$nomSuc[0]['nombre'].'</h3>'.
										'<p style="font: 15px Helvetica Neue,Helvetica,Arial,sans-serif;">*CUERPO*</p>'.
									'</div>'.
								'</div>'.
							'</div>'.
						'</body>'.
						'</html>';
			$msg = str_replace("*CUERPO*" ,$cuerpo , $msg);

			// ENVIO AL CLIENTE
			$mail = $this->enviarMail($correoCliente[0]["ctacorreo"], "Rol de Trabajo N° {$info['trab']} - Grupo Heraldos", $msg, "Propuesta de Trabajo Terminada", "");
			//mail($correoCliente[0]["ctacorreo"], "Rol de Trabajo N° $id - Grupo Heraldos", utf8_decode($msg), "Content-type: text/html; charset=iso-8859-1\r\nFrom: Grupo Publicitario Heraldos <contacto@grupoheraldos.com.mx>");

			// ENVIO AL ADMINISTRADOR
			$mail = $this->enviarMail($correoHeraldos, "Rol de Trabajo N° {$info['trab']} - Grupo Heraldos", $msg, "Propuesta de Trabajo Terminada", "");
			//mail($correoHeraldos, "Rol de Trabajo N° $id - Grupo Heraldos", utf8_decode($msg), "Content-type: text/html; charset=iso-8859-1\r\nFrom: Grupo Publicitario Heraldos <contacto@grupoheraldos.com.mx>");
			return "EXITO";
		}

		public function reenvioRoles($info){
			$id = $info["id"];
			$cuerpo = $info["mensaje"];

			$correoCliente = $this->query_assoc("SELECT C.ctacorreo FROM trabajos T JOIN clientes C ON C.idcliente = T.idcliente WHERE T.idtrabajo = $id");
			if(count($correoCliente) > 0){
				$correoHeraldos = json_decode(file_get_contents("../params/mailAdminJSON.json"), true)["MailAdmin"];
				$msg = '<!DOCTYPE html>'.
							'<html>'.
							'<head>'.
								'<title>.: - Mail-Format -:.</title>'.
							'</head>'.
							'<body>'.
								'<div style="width: 450px;">'.
									'<div style="background:#fff; border:1px solid #ddd; box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2); margin: 15px 0; overflow:hidden;border-radius:7px;border-color: #428bca;">'.
										'<div style="border-color: transparent #428bca transparent transparent;border-color: rgba(255,255,255,0) #428bca rgba(255,255,255,0) rgba(255,255,255,0);">'.
										'</div>'.
										'<div style="padding:0 20px 10px;">'.
											'<h3 style="font: 21px Helvetica Neue,Helvetica,Arial,sans-serif;">Descripcion de Roles de trabajo: '.$id.'</h3>'.
											'<p style="font: 15px Helvetica Neue,Helvetica,Arial,sans-serif;">*CUERPO*</p>'.
										'</div>'.
									'</div>'.
								'</div>'.
							'</body>'.
							'</html>';
				$msg = str_replace("*CUERPO*" ,$cuerpo , $msg);

				// ENVIO AL CLIENTE
				$mail = $this->enviarMail($correoCliente[0]["ctacorreo"], "Rol de Trabajo N° $id - Grupo Heraldos", $msg, "Propuesta enviada desde sistema", "");
				//mail($correoCliente[0]["ctacorreo"], "Rol de Trabajo N° $id - Grupo Heraldos", utf8_decode($msg), "Content-type: text/html; charset=iso-8859-1\r\nFrom: Grupo Publicitario Heraldos <contacto@grupoheraldos.com.mx>");

				// ENVIO AL ADMINISTRADOR
				$mail = $this->enviarMail($correoHeraldos, "Rol de Trabajo N° $id - Grupo Heraldos", $msg, "Propuesta enviada desde sistema", "");
				//mail($correoHeraldos, "Rol de Trabajo N° $id - Grupo Heraldos", utf8_decode($msg), "Content-type: text/html; charset=iso-8859-1\r\nFrom: Grupo Publicitario Heraldos <contacto@grupoheraldos.com.mx>");
				return "EXITO";
			}else{
				return "ERROR";
			}
		}

		public function pendientesNivel3($info){
			$pendientes = $this->query_assoc("SELECT * FROM alertas_trabajos WHERE idtrabajo = $info");
			return $pendientes;
		}

		public function cambiarStatusNvl3($info){
			$id = $info["id"];
			$fila = $info["fila"];
			$activarPendiente = "CALL SP_ACTUALIZARPENDIENTETRABAJO('$fila', '$id', 'ACTIVAR')";
			if($this->query($activarPendiente)){
				$alertas = $this->query_assoc("SELECT * FROM alertas_trabajos WHERE idtrabajo = $id");
				$suma = intval($alertas[0]["verifsumin"]) + intval($alertas[0]["sumincompleto"]) + intval($alertas[0]["llamarprovs"]) + intval($alertas[0]["suminentregados"]);
				if(intval($suma) === 4){
					$statusTrabajo = $this->query("CALL SP_STATUSTRABAJO('$id', '4')");
				}
				return $suma;
			}
		}

		public function getEstadistica($info){
			$appZonas = $this->query_assoc("SELECT A.*,P.nombre FROM app_sucursales A JOIN proveedores P ON P.idproveedor = A.proveedor WHERE idservicio = $info");
			return $appZonas;
		}

		// :::::::::::::::::::::::: **************************** ::::::::::::::::::::::
		// **************    CAMBIOS [22/07/2017] ************************
		// FUNCION TRAER BLOQUES
		public function traerBloques($idcliente){
			return $this->query_assoc("SELECT * FROM bloques WHERE idcliente = $idcliente");
		}

		public function traerSucursales($idbloque){
			return $this->query_assoc("SELECT * FROM sucursales WHERE idbloque = $idbloque");
		}

		public function domgeoSucursales($idsucursal){
			return $this->query_assoc("SELECT * FROM sucursales_domgeo WHERE idsucursal IN ($idsucursal) GROUP BY estado, municipio");
		}

		public function sucsData($idTrab){
			$datSucs = $this->query_assoc("SELECT TS.idsucursal, S.nombre, TS.status FROM trabajos_sucursales TS JOIN sucursales S ON S.idsucursal = TS.idsucursal WHERE TS.idtrabajo = $idTrab");
			for($s = 0; $s < count($datSucs); $s++){
				$iniFin = $this->query_assoc("SELECT inicio, fin FROM config_trabajo_proveedor WHERE ");
				$datSucs[$s]['inicio'] = '';
				$datSucs[$s]['fin'] = '';
			}
			return $datSucs;
		}

		public function eliminarPorpProv($info){
			$response = "EXITO";
			$mail = $this->query_assoc("SELECT id FROM adminmail WHERE idtrabajo = {$info['trab']} AND status > 1");
			if(!$this->query("CALL SP_DELETEPROPUESTAPROV('{$info['trab']}','{$info['suc']}','{$info['prov']}','{$mail[0]['id']}')")){
				$response = "ERROR1";
			}
			if(!$this->query("CALL SP_STATUSUCURSAL('{$info['trab']}','{$info['suc']}', '4')")){
				$response = "ERROR2";
			}
			if(!$this->query("CALL SP_ACTUALIZARPENDIENTETRABAJO('proptrabajoprovs', '{$info['trab']}', 'DESACTIVAR')")){
				$response = "ERROR3";
			}
			
			$provData = $this->query_assoc("SELECT * FROM proveedores WHERE idproveedor = {$info['prov']}");
			$nomSucursal = $this->query_assoc("SELECT * FROM sucursales WHERE idsucursal = {$info['suc']}");
			if(!$this->correoReenvio( $provData[0]['ctacorreo'], $provData[0]['nombre'], $info['trab'], $nomSucursal[0]['nombre'], 'PROVEEDOR', '')){
				$response = "ERROR4";
			}

			return $response;
		}

		// :::::::::::::::::::::::: **************************** ::::::::::::::::::::::
		// **************    CAMBIOS [18/11/2017] ************************
		public function verifSucursalesPerifoneoP1($info){
			$consultaSucs = $this->query_assoc("SELECT T1.municipios FROM trabajos_nivel2 T JOIN trabajos_zonas_detalles T1 ON T1.idZonaTrabajo = T.id WHERE T.fk_idTrabajo = $info");
			$consultaSucsString = "";
			for($s = 0; $s < count($consultaSucs); $s++){
				$consultaSucsString .= $consultaSucs[$s]["municipios"].",";
			}
			$consultaSucsString = substr($consultaSucsString, 0, strlen($consultaSucsString)-1);

			$dataSucsArr = explode(",", $consultaSucsString);
			sort($dataSucsArr);

			$sucsArrAux = array();
			$sucsData = array();
			$c = -1;
			for($i = 0; $i < count($dataSucsArr); $i++){
				$idSuc = explode(":", $dataSucsArr[$i])[0];
				if(!in_array($idSuc, $sucsArrAux)){
					array_push($sucsArrAux, $idSuc);
					$suc = array(
						"idTrab" => $info,
						"idSuc" => $idSuc,
						"nomSuc" => $this->query_assoc("SELECT nombre FROM sucursales WHERE idsucursal = $idSuc")[0]["nombre"],
						"cantidad" => intval(explode(":", $dataSucsArr[$i])[1]),
						"cliente" => $this->query_assoc("SELECT idCliente FROM trabajos WHERE idtrabajo = $info")[0]["idCliente"],
						"statusbtn" => intval($this->query_assoc("SELECT COUNT(*) AS Total FROM config_trabajo_proveedor WHERE idtrabajo = $info AND idsucursal = $idSuc")[0]["Total"]),
						"status" => intval($this->query_assoc("SELECT COUNT(*) AS Status FROM trabajos_sucursales WHERE idtrabajo = $info AND idsucursal = $idSuc")[0]["Status"])
					);
					array_push($sucsData, $suc);
					$c++;
				}else{
					$sucsData[$c]["cantidad"] = intval($sucsData[$c]["cantidad"]) + intval(explode(":", $dataSucsArr[$i])[1]);
				}
			}
			return $sucsData;
		}

		public function configPerifoneo($info){
			$respuesta = true;
			$consulTZDSucursal = $this->query_assoc("SELECT TZD.idProveedor, TZD.municipios FROM trabajos_zonas_detalles TZD JOIN trabajos_nivel2 TN2 ON TN2.fk_idTrabajo = {$info['idTrab']} WHERE TZD.idZonaTrabajo = TN2.id AND TZD.municipios RLIKE '[[:<:]]{$info['idSuc']}[[:>:]]'");
			$sucInfo = $this->query_assoc("SELECT B.idbloque, B.idcliente FROM sucursales S JOIN bloques B ON B.idbloque = S.idbloque WHERE S.idsucursal = {$info['idSuc']}");

			$provs = "";
			$muns = "";
			$cant = 0;
			for($c = 0; $c < count($consulTZDSucursal); $c++){
				$provs .= $consulTZDSucursal[$c]["idProveedor"].",";
				$muns = explode(",", $consulTZDSucursal[$c]["municipios"]);
				for($m = 0; $m < count($muns); $m++){
					if(intval($info["idSuc"]) === intval(explode(":", $muns[$m])[0])){
						$cant = $cant + intval(explode(":", $muns[$m])[1]);
					}
				}
			}
			$provs = substr($provs, 0, strlen($provs)-1);

			$sucsLista = array();
			$sucsListaConsul = $this->query_assoc("SELECT T1.municipios FROM trabajos_nivel2 T JOIN trabajos_zonas_detalles T1 ON T1.idZonaTrabajo = T.id WHERE T.fk_idTrabajo = {$info['idTrab']}");
			$sucsString = "";
			for($c = 0; $c < count($sucsListaConsul); $c++){
				$sucsString .= $sucsListaConsul[$c]["municipios"].",";
			}
			$sucsString = substr($sucsString, 0, strlen($sucsString)-1);
			$sucsListaArr = explode(",", $sucsString);
			for($a = 0; $a < count($sucsListaArr); $a++){
				if(!in_array(explode(":", $sucsListaArr[$a])[0], $sucsLista)){
					array_push($sucsLista, explode(":", $sucsListaArr[$a])[0]);
				}
			}

			if($info["alta"] === 'true'){
				if(!$this->query("INSERT INTO trabajos_sucursales (idtrabajo, idcliente, idbloque, idsucursal, cantidad, proveedores, status) VALUES ('{$info['idTrab']}', '{$sucInfo[0]['idcliente']}', '{$sucInfo[0]['idbloque']}', '{$info['idSuc']}', '$cant', '$provs', '2')")){
					$respuesta = false;
				}else{
					$perifData = $info["json"];
					$perifCad = "";
					for($p = 0; $p < count($perifData); $p++){
						$perifCad .= "('{$info['idTrab']}', '{$info['idSuc']}', '{$perifData[$p]['fecha']}', '{$perifData[$p]['hrinicio']}', '{$perifData[$p]['hrfin']}', '{$perifData[$p]['minutos']}'),";
					}
					$perifCad = substr($perifCad, 0, strlen($perifCad)-1);
					$this->query("INSERT INTO config_trabajo_perifoneo (idtrabajo, idsucursal, fecha, inicio, fin, minutos) VALUES $perifCad");

					$verifSucs = intval($this->query_assoc("SELECT COUNT(*) AS Cant FROM trabajos_sucursales WHERE idtrabajo = {$info['idTrab']}")[0]["Cant"]);
					if(count($sucsLista) === $verifSucs){
						$this->query("CALL SP_STATUSTRABAJO('{$info['idTrab']}', '6')");

						$caracteres = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
						$caracteresLong = strlen($caracteres);
						$url = '';
						for ($i = 0; $i < 24; $i++)
							$url .= $caracteres[rand(0, $caracteresLong - 1)];
						if(!$this->query("CALL SP_ALTAMAIL('{$info['idTrab']}', '{$info['cliente']}', '$url')")){
							$respuesta = false;
						}
					}
				}
			}

			if($info["mail"] === 'true'){
				if($this->query("UPDATE trabajos_sucursales SET status = '1' WHERE idtrabajo = '{$info['idTrab']}' AND idsucursal = '{$info['idSuc']}'")){
					$mailsArr = array();
					$mailCliente = $this->query_assoc("SELECT ctacorreo FROM sucursales WHERE idsucursal = {$info['idSuc']}");
					if(!$this->mailCliente($mailCliente[0]["ctacorreo"], "", "Perifoneo", "Configurar Trabajo", $mailsArr)){
						$respuesta = false;
					}
				}else{
					$respuesta = false;
				}
			}
			//SELECT TIME_FORMAT(C.inicio, "%k:%i") AS Fin, TIME_FORMAT(C.fin, "%k:%i") AS Fin FROM config_trabajo_perifoneo C;
			return $respuesta;
		}

		public function traerConfigPerifoneo($info){
			return $this->query_assoc("SELECT * FROM config_trabajo_perifoneo WHERE idtrabajo = {$info['idTrab']} AND idsucursal = {$info['idSuc']}");
		}

		public function editarConfigPerifoneo($info){
			$response = true;
			if(!$this->query("DELETE FROM config_trabajo_perifoneo WHERE idtrabajo = {$info['idTrab']} AND idsucursal = {$info['idSuc']}")){
				$response = false;
			}else{
				$perifData = $info["json"];
				$perifCad = "";
				for($p = 0; $p < count($perifData); $p++){
					$perifCad .= "('{$info['idTrab']}', '{$info['idSuc']}', '{$perifData[$p]['fecha']}', '{$perifData[$p]['hrinicio']}', '{$perifData[$p]['hrfin']}', '{$perifData[$p]['minutos']}'),";
				}
				$perifCad = substr($perifCad, 0, strlen($perifCad)-1);
				if(!$this->query("INSERT INTO config_trabajo_perifoneo (idtrabajo, idsucursal, fecha, inicio, fin, minutos) VALUES $perifCad")){
					$response = false;
				}
			}
			return $response;
		}

		public function verifSucTrabajoStatus($info){
			return $this->query_assoc("SELECT status FROM trabajos_sucursales WHERE idtrabajo = {$info['trab']} AND idsucursal = {$info['suc']}")[0]["status"];
		}

		public function configTrabajoPerifoneo($info){
			return $this->query_assoc("SELECT * FROM adminmail WHERE idtrabajo = {$info['trab']} AND idcliente = {$info['cliente']} AND status >= 1");
		}


		// :::::::::::::::::::::::: **************************** ::::::::::::::::::::::
		// **************    CAMBIOS [15/12/2017] ************************
		public function traerDetallePerifoneo($info){
			$respuesta["cliente"] = $this->query_assoc("SELECT TS.*, S.nombre, S.encargado, T.tipo, T.alias, T.vigencia FROM trabajos_sucursales TS JOIN sucursales S ON S.idsucursal = TS.idsucursal JOIN trabajos T ON T.idtrabajo = TS.idtrabajo WHERE TS.idtrabajo = {$info['trab']} AND TS.idsucursal = {$info['suc']}")[0];
			$provsArr = explode(",", $respuesta["cliente"]["proveedores"]);
			$proveedores = "";
			for($p = 0; $p < count($provsArr); $p++){
				$proveedores .= $this->query_assoc("SELECT nombre FROM proveedores WHERE idproveedor = {$provsArr[$p]}")[0]["nombre"].",";
			}
			$proveedores = substr($proveedores, 0, strlen($proveedores)-1);

			$respuesta["config"] = $this->query_assoc("SELECT CP.* FROM config_trabajo_perifoneo CP WHERE CP.idtrabajo = {$info['trab']} AND CP.idsucursal = {$info['suc']}");
			for($i = 0; $i < count($respuesta["config"]); $i++){
				$respuesta["config"][$i]["proveedores"] = $proveedores;
				
				$respuesta[$respuesta["config"][$i]["id"]] = $this->query_assoc("SELECT CD.*, CDP.inicio, CDP.fin, Z.nombre, E.estado AS estadotxt FROM config_trabajo_detalle CD JOIN config_trabajo_detalle_perifoneo CDP ON CDP.idconfig = CD.id JOIN zonaspoligonos Z ON Z.id = CD.poligono JOIN estados E ON E.idestado = CD.estado WHERE CD.idconfig = {$respuesta['config'][$i]['id']} AND CD.sucursal = {$respuesta['config'][$i]['idsucursal']}");
				require_once('Domgeo.php');
				for($m = 0; $m < count($respuesta[$respuesta["config"][$i]["id"]]); $m++){
					$Geo[$m] = new Domgeo();
					$respuesta[$respuesta["config"][$i]["id"]][$m]["municipiotxt"] = $Geo[$m]->getMun($respuesta[$respuesta["config"][$i]["id"]][$m]["estado"], $respuesta[$respuesta["config"][$i]["id"]][$m]["municipio"])[0]["nomMpo"];
				}
			}
			return $respuesta;
		}

	}

?>
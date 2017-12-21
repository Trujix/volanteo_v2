<?php 
	// ===============  Login protect  ==============================
	session_start();

	if(!isset($_SESSION['iduser']) || !isset($_SESSION['roluser']) || 
	   !isset($_SESSION['name']))
		header('Location: index.php');
	else
		$user = $_SESSION['name'];



	require("clases/Seguimiento.php");
	$Seguimiento = new Seguimiento();

	if (isset($_GET['opt']) && isset($_GET['serv'])) {
		
		$titulo = '<h2>Evidencias</h2>';
		$body = "";

		$res = $Seguimiento->getProveedoresImages($_GET['serv']);


		$html = '';
		$prov = '';
		for ($i=0; $i < count($res); $i++) { 

			if($prov != $res[$i]["idproveedor"]){
				// $html .= '<br>';

				if($i > 0)
					$html .= '</div>';

				$html .= '<div class="col-md-12" style="margin: 10px 0px 40px 0px;">
							<h2>Nombre de proveedor: '.$res[$i]["proveedor"].'</h2>
                  			<hr>';
			}
			$html .= '<div class="col-md-2">
	                    <a data-gallery="" title="" href="'.$res[$i]["url"].'">
	                        <img style="width: 100%; max-height: 130px; min-height: 130px;" src="'.$res[$i]["url"].'">
	                    </a>
	                  </div>';

			$prov = $res[$i]["idproveedor"];
        }
		
	}
	else{
		$res = $Seguimiento->lvl1();

		$body = "";
		for ($i=0; $i < count($res); $i++) { 
			$body .= "<tr>";
			$body .= "<td>{$res[$i]['id_service']}</td>";
			$body .= "<td>". $res[$i]['nombre'] ."</td>";
			$body .= "<td>". $res[$i]['periodoini'] ." - ". $res[$i]["periodofin"] ."</td>";
			$body .= '<td>
						<a href="#" onclick="showLvl2('. $res[$i]['id_service'] .')" class="btn btn-info btn-xs">
							<i class="fa fa-eye"></i> Ver detalle 
						</a>
						<a href="#" onclick="showPhotos('. $res[$i]['id_service'] .')" class="btn btn-info btn-xs">
							<i class="fa fa-eye"></i> Ver fotos 
						</a>
					  </td>';
			$body .= "</tr>";

		}

		$html = '<div id="tableContainer" class="x_content table-responsive">
					<table class="table table-striped projects">
                      <thead id="thead">
                        <tr>
                          <th>NO. TRABAJADOR</th>
                          <th>CLIENTE</th>
                          <th>VIGENCIA</th>
                          <th>OPCIONES</th>
                        </tr>
                      </thead>
                      <tbody id="tbody">
                        '. $body .'
                      </tbody>
                  	</table>
                 </div>';

		$titulo = '<h2>Geolocalización</h2>';
	}

	

		
	
    
?>
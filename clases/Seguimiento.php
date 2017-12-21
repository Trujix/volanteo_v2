<?php  
	
	require('Mysql.php');

	Class Seguimiento extends Mysql{

		public function lvl1(){
			//vwTrabajosLvl1 <--- SERVIDOR
			$consult = "SELECT G.id, G.id_service, V.nombre, V.periodoini, V.periodofin 
						FROM geolocation G 
						JOIN vwTrabajosLvl1 V ON G.id_service = V.idtrabajo
						GROUP BY id_service";
			return $this->query_assoc($consult);

		}

		public function lvl2($id){
			
			/*$consult = "SELECT G.id, G.id_device, P.nombre proveedor
						FROM geolocation G
						JOIN proveedores P ON G.id_proveedor = P.idProveedor
						WHERE id_service = $id GROUP BY id_device";*/

			/*$consult = "SELECT DISTINCT G.id_proveedor, G.id, G.id_device, P.nombre proveedor
						FROM geolocation G
						JOIN proveedores P ON G.id_proveedor = P.idProveedor
						WHERE id_service = $id GROUP BY id_device";*/


			$consult = "SELECT DISTINCT G.id_proveedor, P.nombre proveedor 
						FROM geolocation G 
						JOIN proveedores P ON G.id_proveedor = P.idproveedor 
						WHERE id_service = $id";

			return $this->query_assoc($consult);

		}

		public function showLvl2_2($id){
			$consult = "SELECT id_device, id_service FROM geolocation WHERE id_service = {$id["idService"]} AND id_proveedor = {$id["idProv"]} GROUP BY id_device";

			return $this->query_assoc($consult);
		}

		public function lvl3($info){

			$id_device = $info['id_device'];
			$id_service = $info['id_service'];

			$consult = "SELECT id, latitud, longitud, date_time
						FROM geolocation 
						WHERE id_device = '$id_device'
						AND id_service = $id_service order by date_time";

						// echo $consult;exit;
			return $this->query_assoc($consult);

		}

		public function lvl3_todos($info){

			$id_service = $info['id_service'];
			$id_proveedor = $info['id_device'];

			$consult = "SELECT id, latitud, longitud, date_time
						FROM geolocation 
						WHERE id_service = '$id_service'
						AND id_proveedor = $id_proveedor order by date_time";

						// echo $consult;exit;
			return $this->query_assoc($consult);

		}

		public function getProveedoresImages($id){

			// $consult = "SELECT DISTINCT(P.idproveedor),G.id_service, P.nombre proveedor, F.url
			// 			FROM geolocation G
			// 			JOIN proveedores P ON G.id_proveedor = P.idProveedor
			// 			JOIN fotos F ON F.id_service = G.id_service AND F.id_proveedor = P.idproveedor
			// 			WHERE G.id_service = $id GROUP BY P.idproveedor";
			 			
			$consult = "SELECT DISTINCT(F.url), G.id_service, P.idproveedor, P.nombre proveedor
						FROM geolocation G
						JOIN proveedores P ON G.id_proveedor = P.idProveedor
						JOIN fotos F ON F.id_service = G.id_service AND F.id_proveedor = P.idproveedor
						WHERE G.id_service = $id";
			return $this->query_assoc($consult);

		}


		public function getImg($info){

			$id_service   = $info['id_service'];
			$id_proveedor = $info['id_proveedor'];

			$consult = "SELECT url FROM fotos 
						WHERE id_service = $id_service 
						AND id_proveedor = $id_proveedor";
						// echo $consult;exit;

			return $this->query_assoc($consult);
		}

	}

?>
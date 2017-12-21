<?php  
	
	require('Mysql.php');

	Class Geo extends Mysql{

		public function lvl1(){

			$consult = "SELECT id, id_service  FROM geolocation GROUP BY id_service";
			return json_encode($this->query_assoc($consult));

		}

		public function lvl2($id){

			$consult = "SELECT id, id_device
						FROM geolocation WHERE id_service = $id GROUP BY id_device";
			return json_encode($this->query_assoc($consult));

		}

		public function lvl3($info){

			$id_device = $info['id_device'];
			$id_service = $info['id_service'];

			$consult = "SELECT id, latitud, longitud, date_time
						FROM volanteo.geolocation 
						WHERE id_device = $id_device
						AND id_service = $id_service";

						// echo $consult;exit;
			return json_encode($this->query_assoc($consult));

		}

	}

?>
<?php  
	
	require_once('MysqlGeo.php');

	Class Domgeo extends MysqlGeo{

		public function getEstados(){
			$consult = "SELECT * FROM vwEstados";
			return $this->query_assoc($consult);
		}

		public function getMunicipios($edo){
			$consult = "CALL SP_GETMUNICIPIOS($edo)";
			return $this->query_assoc($consult);
		}

		public function getLocalidades($info){
			$edo = $info['edo'];
			$mun = $info['mun'];
			$consult = "CALL SP_GETLOCALIDADES($edo, $mun)";
			return $this->query_assoc($consult);
		}

		public function getAsentamientos($info){
			$edo = $info['edo'];
			$mun = $info['mun'];
			$loc = $info['loc'];
			$consult = "CALL SP_GETASENTAMIENTOS($edo, $mun,$loc)";
			return $this->query_assoc($consult);
		}

		public function getCodigopostal($info){
			$edo = $info['edo'];
			$mun = $info['mun'];
			$loc = $info['loc'];
			$col = $info['col'];
			$consult = "CALL SP_GETCP($edo, $mun, $loc, $col)";
			return $this->query_assoc($consult);
		}

		public function getInfoByCP($cp){
			$consult = "CALL SP_GETINFO($cp)";
			return $this->query_assoc($consult);
		}

		public function getEdo($idEdo){
			$consult = "SELECT nombent FROM estados WHERE cveEnt = $idEdo";

			return $this->query_assoc($consult);
		}

		public function getMun($idEdo, $idMpo){
			$consult = "SELECT cveMpo, nomMpo FROM municipios WHERE cveEnt = $idEdo AND cveMpo = $idMpo";

			return $this->query_assoc($consult);
		}

		public function getLoc($cveEnt, $cveMpo, $cveLoc){
			$consult = "SELECT nomLoc FROM localidades WHERE cveEnt = $cveEnt AND cveMpo = $cveMpo AND cveLoc = $cveLoc";
			
			return $this->query_assoc($consult);
		}
		
	}

?>
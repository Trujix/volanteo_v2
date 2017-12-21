<?php  
	
	require('MysqlEncuesta.php');

	Class Encuesta extends MysqlEncuesta{

		public function read(){

			$query1 = "SELECT UPPER(nombre), puntos,contacto 
					   FROM empresa ORDER BY empresa.puntos DESC";

			return $this->query_row($query1);
		}

	}

?>
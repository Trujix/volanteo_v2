<?php  
	
	require('MysqlEncuesta.php');

	Class Encuesta extends MysqlEncuesta{

		public function read(){

			$query1 = "SELECT UPPER(nombre), puntos,contacto,id_empresa
					   FROM empresa ORDER BY empresa.puntos DESC";

			return $this->query_row($query1);
		}

		public function cargar_respuestas($info){
			return $this->query_assoc("SELECT respuesta from respuesta INNER JOIN encuesta ON respuesta.id_respuesta = encuesta.id_respuesta WHERE encuesta.id_empresa = $info");
		}

	}

?>
<?php 

	class MysqlEncuesta{

		var $dbCon;

		function __construct(){
			$this->conect();
		}

		function commit(){
			$this->dbCon->commit();
		}

		public function conect(){
			//$this->dbCon = new mysqli('localhost', 'tecnol24_angel', 'Thekamitorres!', 'tecnol24_encuestas');
			$this->dbCon = new mysqli('localhost', 'root', '', 'encuesta-proveedores');
			$this->dbCon->autocommit(false);
			$this->dbCon->set_charset("utf8");

			if(!$this->dbCon)
				echo $this->show_error();
		
		}

		public function query($consult){
			$query = $this->dbCon->query($consult);
			if(!$query)
				$this->show_error();
			else
				return $query;
			
		}

		public function next_result(){
			$this->dbCon->next_result();
		}

		private function show_error(){
			return $this->dbCon->connect_error;
		}

		public function query_assoc($consult){
			$vec = array();
			if($result = $this->query($consult)){
				while($fila = $result->fetch_assoc()){ $vec[] = $fila; }
			}
			return $vec;
		}

		public function query_row($consult){
			$vec = array();
			if($result = $this->query($consult)){
				while($fila = $result->fetch_row()){ $vec[] = $fila; }
			}
			return $vec;
		}

		public function exit_conect(){
			mysqli_close($this->dbCon);
		}

		public function obtenerId(){
			return $this->dbCon->insert_id;
		}
	 
	}
?>
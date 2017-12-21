<?php 
//require('phpmailer.php');

class mysql{

var $dbCon;

	function __construct(){
		$this->conect();
	}

	public function conect(){
		//$enlace = mysql_connect('localhost', 'root', '');
		$enlace = mysql_connect('localhost', 'root', 'toortoor');
		// $enlace = mysql_connect('localhost', 'root', 'toortoor');		
		//coreccion en la ñ
		mysql_query("SET character_set_results = 'utf8', character_set_client = 'utf8', character_set_connection = 'utf8', character_set_database = 'utf8', character_set_server = 'utf8'", $enlace);
		//$dbCon = mysql_select_db('metsi', $enlace);
		$dbCon = mysql_select_db('volantes', $enlace);
		
		
		if (!$dbCon) {
		  $msg = "No pudo conectarse -- Error: " . mysql_error();
		}else{
		  $msg = "Conectado satisfactoriamente ---- ";
		}
		return $msg;

		//$this->query("SET NAMES 'utf-8'");
	}

	public function query($consult){

		$result = mysql_query($consult);
		//return mysql_query($consult);
		if($result){
		 	return $result;
		}else{
			return "Error: ".mysql_error();
		}

	}

	public function query_assoc($consult){

		$vec = array();
		if($result = $this->query($consult)){
			while($fila = mysql_fetch_assoc($result)){ 
				$vec[] = $fila; 
			}
		}
		return $vec;
	}

	public function exit_conect(){
		mysql_close($this->dbCon);
	}

	public function destroy(){
		session_destroy();
		Header('Location: perfil_user.php');
		//return 1;
	}


}
?>

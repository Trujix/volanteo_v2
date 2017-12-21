<?php  
	
	require('Mysql.php');

	Class Zona extends Mysql{

		public function create($info){

			$municipios = $info['mun'];

			$values = "";
			for ($i = 0; $i < count($municipios); $i++) { 
				$values .= "($, {$info['idestado']}, {$municipios[$i]}),";
			}

			$values = substr($values, 0, strlen($values)-1);

			$insert = "CALL SP_CREATEZONA(
							{$info["id"]}, {$info["idestado"]}, '{$info["edo"]}', 
							'{$values}', '{$info["costoserv"]}', '{$info["costosad"]}'
						)";
						// echo $insert;exit;

			return $this->query($insert);
		
		}

		public function read($idproveedor){
			return $this->query_row("CALL SP_SHOWZONAS($idproveedor)");
		}

		public function update($info){
			// echo '<prev>';
			// var_dump($info);
			// echo '<prev>';
			// exit;
			$municipios = $info['mun'];

			$values = "";
			for ($i = 0; $i < count($municipios); $i++) { 
				$values .= "({$info["id"]}, {$info['idestado']}, {$municipios[$i]}),";
			}

			$values = substr($values, 0, strlen($values)-1);

			// echo $values;exit;

			$consult = "CALL SP_UPDATEZONA(
							{$info["id"]}, {$info["idestado"]}, '{$info["edo"]}', 
							'{$values}', '{$info["costoserv"]}', '{$info["costosad"]}'
						)";

						// echo $consult;exit;

			return $this->query($consult);
		}

		public function delete($id){

			$consulta = "CALL SP_DELETEZONA($id)";
			
			return json_encode($this->query($consulta));
		
		}

		public function get($id){

			$consult1 = "CALL SP_GETZONA($id)";
			$res1 = $this->query_assoc($consult1);

			$this->next_result();

			$consult2 = "CALL SP_GET_DETALLES_ZONA($id)";
			$res2 = $this->query_assoc($consult2);

			$response = array($res1, $res2);	

			return $response;
		}


	}

?>
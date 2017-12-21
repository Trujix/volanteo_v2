<?php

	require_once("MySQL.php");

	Class Encuesta extends MySQL{

		public function create($info){

			$respuestas = $info['respuestas'];
			$empresa    = $info['empresa'];

			$consult = "INSERT INTO encuesta (id_empresa, id_pregunta, id_respuesta)
						VALUES ($values)";

			$values = "";
			for ($i = 0; $i < count($respuestas); $i++) {
				# code...
			}
			return 	$this->query($consult);
		}

		public function guardar_info($info){
			$nombre_empresa = $info[0];
		    $email_empresa = $info[1];
		    $face_empresa = $info[2];
		    $telefono_empresa = $info[3];
		    $domicilio_empresa = $info[4];

			$preguntas = $info[5];
		    $respuestas = $info[6];
			$puntos_juntos = $info[7];

			$preguntas_separadas = explode("-", $preguntas);
			$respuestas_separadas = explode("-", $respuestas);
			$puntos_separados = explode("-", $puntos_juntos);
			$puntos = "";

			if(count($respuestas_separadas) == 14){

				for($i = 0; $i < count($puntos_separados); $i++){
					$puntos = $puntos_separados[$i] + $puntos;
				}

				$consulta1 ="INSERT INTO empresa (id_empresa, nombre, contacto, facebook, num_telefono, domicilio, puntos) VALUES ('','$nombre_empresa','$email_empresa','$face_empresa','$telefono_empresa','$domicilio_empresa','$puntos')";
				$respuesta1 = $this->query($consulta1);

				$consulta2 = "SELECT MAX(id_empresa) as id FROM empresa";
				$respuesta2 = $this->query_assoc($consulta2);
				$respuesta_id = $respuesta2[0]["id"];

				for($i = 0; $i < count($preguntas_separadas)-1; $i++){

					$consulta3 = "INSERT INTO encuesta (id_encuesta, id_pregunta, id_respuesta, id_empresa) VALUES ('','$preguntas_separadas[$i]','$respuestas_separadas[$i]','$respuesta_id')";
					$respuesta3=$this->query($consulta3);

				}
				return true;
			}
			else{
				return false;
			}

		}

		//funcion solo para ver la informacion en otra vista, no es importante
		public function cargar_detalles($info){
			$consulta = "SELECT id_empresa, nombre, puntos FROM empresa";
			$respuesta = $this->query_assoc($consulta);
			return $respuesta;
		}

		public function cargar_respuestas($info){
			$consulta = "SELECT respuesta from respuesta INNER JOIN encuesta ON respuesta.id_respuesta = encuesta.id_respuesta WHERE encuesta.id_empresa = ".$info;
			$respuesta = $this->query_assoc($consulta);
			return $respuesta;
		}

	}
?>

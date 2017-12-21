<?php
	if(isset($_POST['info'])){
		$info = $_POST['info'];
		$sql = $_POST['sql'];

		$db = $info["db"];
		$user = $info["user"];
		$pass = $info["pass"];
		$server = $info["server"];
		$accion = $_POST['accion'];

		$conexion = new mysqli($server, $user, $pass, $db);

		if($accion === 'probarConn'){
			if(mysqli_query($conexion, "SHOW TABLES FROM $db")){
				echo "CONEXION CORRECTA";
			}else{
				echo "ERROR DE CONEXION";
			}
		}else if($accion === 'ejecutarSQLSPS'){
			if(mysqli_query($conexion, $sql)){
				echo "SQL / SPS EJECUTADO CON EXITO";
			}else{
				echo "ERROR EN LA CADENA SQL / SPS";
			}
		}else if($accion === 'consultaSQL'){
			if(mysqli_query($conexion, $sql)){
				$filas = array();
				if($resultado = $conexion->query($sql)){
					while($fila = $resultado->fetch_assoc()){
						$filas[] = $fila;
					}
				}
				if(count($filas) > 0){
					$keys = array_keys($filas[0]);

					$tabla = "<table class='table table-sm'><thead class='thead-inverse'><tr>";
					for($k = 0; $k < count($keys); $k++){
						$tabla .= '<th>'.$keys[$k].'</th>';
					}
					$tabla .= '</tr></thead><tbody>';
					for($i = 0; $i < count($filas); $i++){
						$tabla .= "<tr>";
						for($j = 0; $j < count($filas[$i]); $j++){
							$tabla .= "<td>".$filas[$i][$keys[$j]]."</td>";
						}
						$tabla .= "</tr>";
					}
					$tabla .= '</tbody></table>';
					print_r(utf8_encode($tabla));
				}else{
					echo "Tabla vacia";
				}
			}else{
				echo "ERROR EN LA CONSULTA: DESCRIPCION - ".mysqli_error($resultado);
			}
		}
	}
?>
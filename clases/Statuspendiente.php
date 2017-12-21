<?php  

	require('Mysql.php');

	Class Statuspendiente extends Mysql{

		public function activarPendiente($info){
			$row = $info["row"];
			$id = $info["id"];
			$mensajeReturn = "";

			$verifStatus = $this->query_assoc("SELECT $row FROM alertas_trabajos WHERE idtrabajo = $id");
			if(intval($verifStatus[0][$row]) > 0){
				$mensajeReturn = "ACTIVADO";
			}else{
				$cambiarStatus = "CALL SP_ACTUALIZARPENDIENTETRABAJO('$row', '$id', 'ACTIVAR')";
				if($this->query($cambiarStatus)){
					$pendientes = $this->query_assoc("SELECT verifsumin, sumincompleto, llamarprovs, suminentregados FROM alertas_trabajos WHERE idtrabajo = $id");
					$suma = intval($pendientes[0]['verifsumin']) + intval($pendientes[0]['sumincompleto']) + intval($pendientes[0]['llamarprovs']) + intval($pendientes[0]['suminentregados']);
					if(intval($suma) === 4){
						$statusTrabajo = $this->query("CALL SP_STATUSTRABAJO('$id', '4')");
					}
					$mensajeReturn = "EXITO";
				}else{
					$mensajeReturn = "ERRORGUARDAR";
				}
			}
			return $mensajeReturn;
		}

	}

?>
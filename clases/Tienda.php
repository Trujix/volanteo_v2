<?php  
	
	require('Mysql.php');

	Class Tienda extends Mysql{

		public function create($info){
			$consult = "CALL SP_CREATETIENDA(
						 {$info["id"]}, '{$info["nombre"]}', '{$info["encargado"]}', 
						'{$info["edo"]}', '{$info["mun"]}', '{$info["loc"]}', 
						'{$info["col"]}', '{$info["cp"]}', '{$info["calle"]}', 
						'{$info["noint"]}', '{$info["noext"]}', '{$info["lat"]}', 
						'{$info["lng"]}'
						)";

						// echo $consult;exit;

			return $this->query($consult);
		
		}

		public function read($idcliente){
			return $this->query_row("CALL SP_SHOWTIENDAS($idcliente)");
		}

		public function update($info){
			$consult = "CALL SP_UPDATETIENDA(
						 {$info["id"]}, '{$info["nombre"]}', '{$info["encargado"]}', 
						'{$info["edo"]}', '{$info["mun"]}', '{$info["loc"]}', 
						'{$info["col"]}', '{$info["cp"]}', '{$info["calle"]}', 
						'{$info["noint"]}', '{$info["noext"]}', '{$info["lat"]}', 
						'{$info["lng"]}'
						)";

						// echo $consult;exit;

			return $this->query($consult);
		
		}

		public function delete($id){
			return;
		}

		public function get($id){

			$consult1 = "CALL SP_GETTIENDA($id)";
			$consult2 = "CALL SP_GETINFOTIENDA($id)";

			$res1 = $this->query_assoc($consult1);
			$this->next_result();
			$res2 = $this->query_assoc($consult2);

			$response = array($res1, $res2);

			return $response;
		}

		// :::::::: **************** ::::::::
		// FUNCIONES CON BLOQUES Y SUCURSALES
		// :::::::: **************** ::::::::

		// :::::::::::::: BLOQUES ::::::::::::::::
		public function readBloques($idcliente){
			return $this->query_row("CALL SP_SHOWBLOQUES($idcliente)");
		}

		public function nuevoBloque($info){
			$verifMail = $this->query_assoc("SELECT * FROM bloques WHERE ctacorreo = '{$info["correo"]}'");
			if(count($verifMail) < 1){
				// CREANDO CONTRASEÑA ALEATORIA
				$caracteres = '0123456789';
				$caracteresLong = strlen($caracteres);
				$pass = '';
				for ($i = 0; $i < 10; $i++) {
				    $pass .= $caracteres[rand(0, $caracteresLong - 1)];
				}
				$consult = "CALL SP_CREATEBLOQUE(
							 {$info["cliente"]}, '{$info["nombre"]}', '{$info["encargado"]}', 
							'{$info["correo"]}', '{$info["celular"]}', '{$info["oficina"]}', '{$info["whatsapp"]}', md5('$pass')
							)";
				$this->correoPass($info["correo"], $info["encargado"], $pass);
				return $this->query($consult);
			}else{
				return "MAILERROR";
			}
		}

		public function editarBloqueInfo($idbloque){
			return $this->query_row("CALL SP_SHOWBLOQUESEDIT($idbloque)");
		}

		public function editarBloque($info){
			$consult = "CALL SP_UPDATEBLOQUE(
						 {$info["idbloque"]}, '{$info["nombre"]}', '{$info["encargado"]}', 
						'{$info["correo"]}', '{$info["celular"]}', '{$info["oficina"]}', 
						'{$info["whatsapp"]}'
						)";
			return $this->query($consult);
		}

		public function deleteBloque($idbloque){
			return $this->query("CALL SP_DELETEBLOQUE($idbloque)");
		}

		// :::::::::::::: SUCURSALES ::::::::::::::::
		public function readSucursales($idbloque){
			return $this->query_row("CALL SP_SHOWSUCURSALES($idbloque)");
		}

		public function nuevaSucursal($info){
			$idbloque = $info["idbloque"];
			$nombre = $info["nombre"];
			$encargado = $info["encargado"];
			$correo = $info["correo"];
			$telefono = $info["telefono"];
			$estado = $info["estado"];
			$municipio = $info["municipio"];
			$localidades = $info["localidades"];
			$poligonos = $info["poligonos"];

			$verifMail = $this->query_assoc("SELECT * FROM sucursales WHERE ctacorreo = '$correo'");
			if(count($verifMail) === 0){
				// CADENA PARA LA TABLA LOCALIDADES
				$localidadesTxt = "";
				for($l = 0; $l < count($localidades); $l++){
					$localidadesTxt .= "($, {$localidades[$l]['edo']}, {$localidades[$l]['mun']}, {$localidades[$l]['idpolig']}),";
				}
				$localidadesTxt = substr($localidadesTxt, 0, strlen($localidadesTxt)-1);

				// CADENA PARA LA TABLA POLIGONOS
				$poligonosTxt = "";
				for($p = 0; $p < count($poligonos); $p++){
					$poligonosTxt .= "($, {$poligonos[$p]['edo']}, {$poligonos[$p]['mun']}, {$poligonos[$p]['idpolig']}),";
				}
				$poligonosTxt = substr($poligonosTxt, 0, strlen($poligonosTxt)-1);

				// CREANDO CONTRASEÑA ALEATORIA
				$caracteres = '0123456789';
				$caracteresLong = strlen($caracteres);
				$pass = '';
				for ($i = 0; $i < 10; $i++) {
				    $pass .= $caracteres[rand(0, $caracteresLong - 1)];
				}
				$nuevaSucural = "CALL SP_CREATESUCURSAL(
					'$idbloque', '$nombre', '$encargado', '$correo', '$telefono', '$estado', '$municipio', md5('$pass'), '$localidadesTxt', '$poligonosTxt'
				)";

				if($this->query($nuevaSucural)){
					$this->correoPass($correo, $encargado, $pass);
					return true;
				}else{
					return "ERROR";
				}
			}else{
				return "MAILERROR";
			}
		}

		public function editarSucursalInfo($idsucursal){
			$sucursal = $this->query_assoc("SELECT * FROM sucursales WHERE idsucursal = $idsucursal");
			$sucursal[0]["localidades"] = $this->query_assoc("SELECT * FROM sucursales_domgeo WHERE idsucursal = $idsucursal");
			$sucursal[0]["poligonos"] = $this->query_assoc("SELECT S.*, P.nombre AS nombrepolig FROM sucursales_poligonos S JOIN zonaspoligonos P ON S.idpoligono = P.id WHERE S.idsucursal = $idsucursal");
			return $sucursal;
		}

		public function editarSucursal($info){
			$idsucursal = $info["idsucursal"];
			$nombre = $info["nombre"];
			$encargado = $info["encargado"];
			$correo = $info["correo"];
			$telefono = $info["telefono"];
			$estado = $info["estado"];
			$municipio = $info["municipio"];
			$localidades = $info["localidades"];
			$poligonos = $info["poligonos"];

			// CADENA PARA LA TABLA LOCALIDADES
			$localidadesTxt = "";
			for($l = 0; $l < count($localidades); $l++){
				$localidadesTxt .= "($idsucursal, {$localidades[$l]['edo']}, {$localidades[$l]['mun']}, {$localidades[$l]['idpolig']}),";
			}
			$localidadesTxt = substr($localidadesTxt, 0, strlen($localidadesTxt)-1);

			// CADENA PARA LA TABLA POLIGONOS
			$poligonosTxt = "";
			for($p = 0; $p < count($poligonos); $p++){
				$poligonosTxt .= "($idsucursal, {$poligonos[$p]['edo']}, {$poligonos[$p]['mun']}, {$poligonos[$p]['idpolig']}),";
			}
			$poligonosTxt = substr($poligonosTxt, 0, strlen($poligonosTxt)-1);

			$editarSucursal = "CALL SP_EDITSUCURSAL(
				'$idsucursal', '$nombre', '$encargado', '$correo', '$telefono', '$estado', '$municipio', '$localidadesTxt', '$poligonosTxt'
			)";

			if($this->query($editarSucursal))
				return true;
			else
				return "ERROR";
		}

		public function eliminarSucursal($idsucursal){
			return $this->query("CALL SP_DELETESUCURSAL($idsucursal)");
		}

		public function traerEstados(){
			require_once('Domgeo.php');
			$Geo = new Domgeo();
			return $Geo->getEstados();
		}

		public function traerMunicipio($info){
			require_once('Domgeo.php');
			$Geo = new Domgeo();
			return $Geo->getMunicipios($info);
		}

		public function traerLocalidades($info){
			require_once('Domgeo.php');
			$Geo = new Domgeo();
			return $Geo->getLocalidades($info);
		}

		public function traerPoligono($info){
			// vwZonasPoligonos
			return $this->query_assoc("SELECT Z.*, V.nombre AS nomtxt FROM poligono_zonas Z JOIN vwzonaspoligonos V ON Z.nombre = V.id WHERE Z.territorio LIKE '$info%'");
		}


	}

?>
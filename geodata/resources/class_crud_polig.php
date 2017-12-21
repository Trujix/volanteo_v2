<?php
class crud_poligonos {

	function ver($datos){
	   
	    require('mysql.php');
		$_conexion = new mysql();
	
	    parse_str($datos, $data);
	    //****************************
		   
			$tipo_poligono=($data["tipo_poligono"]);
			$condicion=($data["condicion"]);
			$todos=($data["todos"]);

		//************************************
		   
		   if($todos=="si"){
		   		$sql="SELECT id,territorio,coords,atributos FROM poligono_z_r1 WHERE territorio LIKE '$condicion:%' ORDER BY territorio";
		   }
		   	if($todos=="no"){
		   		$sql="SELECT id,territorio,coords,atributos FROM poligono_z_r1 WHERE territorio LIKE '$condicion%' ORDER BY territorio";
		   	}
	  		
	  		
	   
		
		$res = $_conexion->query_assoc($sql);
					 
		
			   
		foreach ($res as $i => $value) {
		
					 
			$res[$i]['territorio']=$explode= explode(":", $res[$i]['territorio']);
			$res[$i]['atributos']=$res[$i]['atributos'];
			$res[$i]['coords']=$explode= explode(";", $res[$i]['coords']);  
			
			foreach ($res[$i]['coords'] as $ii=> $value) {
				$res[$i]['coords'][$ii]=$explode2= explode(",", $res[$i]['coords'][$ii]);
			}
		}

		echo json_encode($res);
	}// FIN FUNCTION VER
	//##################################

	function ver_secciones($datos){
	   
	    require('mysql.php');
		$_conexion = new mysql();
	  	 $sql;
	    parse_str($datos, $data);
	    //****************************
		//var_dump($data);	   
			
			$condicion=($data["condicion"]);
			$todos=($data["todos"]);

		//************************************
		
		   if($todos=="si"){
		   		$sql="SELECT id,zona,coords,atributos,nombre,fecha_registro, observaciones FROM poligono_s_r1 WHERE zona = $condicion ORDER BY zona";
		   }
		   	if($todos=="no"){
		   		$sql="SELECT id,zona,coords,atributos,nombre,fecha_registro, observaciones FROM poligono_s_r1 WHERE zona LIKE '$condicion%' ORDER BY zona";
		   	}
	  		
	  		
	     //var_dump($sql);
		
		$res = $_conexion->query_assoc($sql);
					 
		
			   
		foreach ($res as $i => $value) {
		$sql2="SELECT nombre FROM zonas WHERE id=".$res[$i]['zona']."";

		$res2 = $_conexion->query_assoc($sql2);
		// var_dump($res2);
			$res[$i]['zona']=$res2[0]['nombre'];
			$res[$i]['nombre']=$res[$i]['nombre'];
			$res[$i]['id']=$res[$i]['id'];
			$res[$i]['fecha_registro']=$res[$i]['fecha_registro'];
			$res[$i]['observaciones']=$res[$i]['observaciones'];
			$res[$i]['atributos']=$res[$i]['atributos'];
			$res[$i]['coords']=$explode= explode(";", $res[$i]['coords']);  
			
			foreach ($res[$i]['coords'] as $ii=> $value) {
				$res[$i]['coords'][$ii]=$explode2= explode(",", $res[$i]['coords'][$ii]);
			}
		}

		echo json_encode($res);
	}// FIN FUNCTION VER_secciones
	function ver_zonas($datos){
	   
	    require('mysql.php');
		$_conexion = new mysql();
	   
	    parse_str($datos, $data);
	    //****************************
		   
			$tipo_poligono=($data["tipo_poligono"]);
			$condicion=($data["condicion"]);

		//************************************
		
		///////////////////////////////////////////////QUERY ALTA/////////////
		

		///////////////////////////////////////////////QUERY ALTA/////////////
		   
	  		$sql="SELECT coords,id,atributos,territorio,nombre,observaciones,fecha_registro FROM poligono_z_r1 WHERE territorio LIKE '$condicion:%' ORDER BY territorio";
	   
		//////////////////////////////////////////////EJECUCIÓN DEL QUERY /////////////

		$res = $_conexion->query_assoc($sql);
					 
		
			   
		foreach ($res as $i => $value) {
			$sql2="SELECT nombre FROM zonas WHERE id=".$res[$i]['nombre']."";
			$res2 = $_conexion->query_assoc($sql2);
			
			$res[$i]['zona']=$res[$i]['nombre'];		 
			$res[$i]['territorio']=$explode= explode(":", $res[$i]['territorio']);
			$res[$i]['atributos']=$res[$i]['atributos'];
			$res[$i]['coords']=$explode= explode(";", $res[$i]['coords']);  
			$res[$i]['id']=$res[$i]['id'];
			$res[$i]['nombre']=$res2[0]['nombre'];
			

			
			foreach ($res[$i]['coords'] as $ii=> $value) {
				$res[$i]['coords'][$ii]=$explode2= explode(",", $res[$i]['coords'][$ii]);
			}
		}

		echo json_encode($res);
	}// FIN FUNCTION VER
	function crear($datos){
	   
	    require('mysql.php');
		$_conexion = new mysql();
	   
	    parse_str($datos, $data);
	    //****************************
		   
			$tipo_poligono=($data["tipo_poligono"]);
			$condicion=($data["condicion"]);

		//************************************
		
		///////////////////////////////////////////////QUERY ALTA/////////////
		

		///////////////////////////////////////////////QUERY ALTA/////////////
		   
	  		$sql="SELECT coords,id,atributos,territorio FROM poligono_z_r1 WHERE territorio LIKE '%:$condicion' ORDER BY territorio";
	   //var_dump($sql); exit();
		//////////////////////////////////////////////EJECUCIÓN DEL QUERY /////////////

		$res = $_conexion->query_assoc($sql);
					 
		
			   
		foreach ($res as $i => $value) {

			$res[$i]['territorio']=$explode= explode(":", $res[$i]['territorio']);
			$res[$i]['atributos']=$res[$i]['atributos'];
			$res[$i]['coords']=$explode= explode(";", $res[$i]['coords']);  
			$res[$i]['id']=$res[$i]['id'];  
			
			foreach ($res[$i]['coords'] as $ii=> $value) {
				$res[$i]['coords'][$ii]=$explode2= explode(",", $res[$i]['coords'][$ii]);
			}
		}

		echo json_encode($res);
	}// FIN FUNCTION VER
	function actualizar($datos){
	   
	     require('mysql.php');
		 $_conexion = new mysql();
	  	 $sql;
		    parse_str($datos, $data);
		    //****************************
			//var_dump($data);	   
			
			$condicion=($data["condicion"]);
			$id_poligono=($data["id_poligono"]);

			//************************************
		
		    if($condicion=="z"){
		   		$sql="UPDATE poligono_z_r1 SET coords='".$data['coords']."' WHERE id=$id_poligono";
		    }
		   	if($condicion=="s"){
		   		$sql="UPDATE poligono_s_r1 SET coords='".$data['coords']."' WHERE id=$id_poligono";
		   	}
 		
		
			$res = $_conexion->query($sql);
					 
		
		echo json_encode($res);
	}// FIN FUNCTION VER
}//fin clase crud becarios
?>
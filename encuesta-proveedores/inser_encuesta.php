<?php 
require("clases/MySQL.php");

$Main= new MySQL();

$query="SELECT * FROM pregunta";


$r=$Main->query_assoc($query);
$tt=count($r);
$empresa=$_POST["empresa"];
$correo=$_POST["correo"];
$facebook=$_POST["facebook"];
$telefono=$_POST["telefono"];
$domicilio=$_POST["domicilio"];



		$query3="INSERT INTO empresa (id_empresa,nombre,contacto,facebook,num_telefono,domicilio,puntos) VALUES ('','$empresa','$correo','$facebook','$telefono','$domicilio','0')";
		
				$e3=$Main->query($query3);
		
				$queryMax="SELECT MAX(id_empresa) as id FROM empresa";
				$e4=$Main->query_assoc($queryMax);
				$re=$e4[0]["id"];

				




		if ($_POST[0]==2) {
			$rie=$_POST[0];


			$query="INSERT INTO encuesta (id_encuesta,id_pregunta, id_respuesta,id_empresa) VALUES ('','1','$rie','$re')";


				$e=$Main->query($query);
				
						$query6="SELECT nombre, SUM(r.puntos) as puntos FROM empresa as emp inner join encuesta as en on emp.id_empresa=en.id_empresa inner join pregunta_respuesta  as r on en.id_respuesta=r.id_respuesta where emp.id_empresa=$re";
				$regis_puntos=$Main->query_assoc($query6);
				$t=$regis_puntos[0]["puntos"];
				
				$query22="SELECT contacto,num_telefono from empresa where id_empresa=$re";
				$saber_tel_yc=$Main->query_row($query22);
				$punto=0;
				if ($saber_tel_yc[0][0]) {

					$punto=$punto+3;
				}
				if ($saber_tel_yc[0][1]) {
					$punto=$punto+5;
				}
				$t=$t+$punto;

				$query="UPDATE empresa set puntos=$t where id_empresa=$re";
				$Main->query($query);

				

				
				header("Location: index.php");
			
		}else{


					for ($i=0; $i <$tt; $i++) { 
						$s=$i+1;
					$respuesta=$_POST[$i];
				

				$query="INSERT INTO encuesta (id_encuesta,id_pregunta, id_respuesta,id_empresa) VALUES ('','$s','$respuesta','$re')";
				echo "--------------------------".$query."<br>";
				$ee=$Main->query($query);
				
				
				}
				
									$query6="SELECT nombre, SUM(r.puntos) as puntos FROM empresa as emp inner join encuesta as en on emp.id_empresa=en.id_empresa inner join pregunta_respuesta  as r on en.id_respuesta=r.id_respuesta where emp.id_empresa=$re";
				$regis_puntos=$Main->query_assoc($query6);
				$t=$regis_puntos[0]["puntos"];

				$query22="SELECT contacto,telefono from empresa where id_empresa=$re";
				$saber_tel_yc=$Main->query($query);
			
				
				$query="UPDATE empresa set puntos=$t where id_empresa=$re" ;
				$Main->query($query);



	}
				header("Location: final.php");
				
 ?>
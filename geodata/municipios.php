<?php

$entidad=$_POST['entidad'];

menu_municipios($entidad);

function menu_municipios($entidad){
	if($entidad=="6"){
	echo'

			
			<option value=1>Armeria</option>
			<option value=2>Colima</option>
			<option value=3>Comala</option>
			<option value=4>Coquimatlan</option>
			<option value=5>Cuauhtemoc</option>
			<option value=6>Ixtlahuacan</option>
			<option value=7>Manzanillo</option>
			<option value=8>Minatitlan</option>
			<option value=9>Tecoman</option>
			<option value=10>Villa de Alvarez</option>
		
	';

	}
		
}
?>
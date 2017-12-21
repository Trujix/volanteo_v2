<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>GeoData</title>
</head>

  <!-- <link rel="stylesheet" href="css/normalize.css"> -->

  <link rel="stylesheet" href="bootstrap/css/bootstrap.min.css">
  <link rel="stylesheet" href="bootstrap/css/bootstrap-theme.min.css">
  <link rel="stylesheet" href="fontawesome/css/font-awesome.min.css"  type="text/css" />
  <link rel="stylesheet" href="css/estilo.css"  type="text/css" />
  <link rel="stylesheet" href="css/colorpicker.css"  type="text/css" />
  
  <!-- <link href='//fonts.gstatic.com/s/raleway/v9/xkvoNo9fC8O2RDydKj12bwzyDMXhdD8sAj6OAJTFsBI.woff2' rel='stylesheet' type='text/css'> -->

<body>

	<nav class="navbar navbar-default" style="    margin-bottom: 0px;">
		<div class="container-fluid">

			<!-- Brand and toggle get grouped for better mobile display -->
			<div class="navbar-header pull-right">
			<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
			<span class="sr-only">Toggle navigation</span>
			<span class="icon-bar"></span>
			<span class="icon-bar"></span>
			<span class="icon-bar"></span>
			</button>
			<a class="navbar-brand" id="titulo_navbar">GEODATA</a>
			<a class="navbar-brand" href="#menu-toggle" id="menu-toggle" hidden="true"><i class="fa fa-cogs fa-2x"></i> Ver Menú</a>
			</div>

			<!-- Collect the nav links, forms, and other content for toggling -->
			<div class="collapse navbar-collapse"  id="bs-example-navbar-collapse-1" id="">
				<ul class="nav navbar-nav nav-pills  ">  
					  <!-- <li class=""><a style="font-size: 20px;"><i class='fa fa-power-off' id="txt_opcion_elegida"> Salir</i></a></li> -->
				</ul>
				<!--+++++++++++++++++ MENU INICIO ++++++++++++++++++-->
					<div id="" class="menu_nav_opcion">
						<ul class="nav navbar-nav nav-pills nav_menu_opcion_nav"  id="separador_nav">  
						  <li class=""><a style="font-size: 16px;"> </a></li>
						</ul>
						<ul class="nav navbar-nav nav-pills nav_menu_opcion_nav" name="crear">  
						  <li class=""><a href="" style="font-size: 16px; color: black;"><i class='fa fa-road text-primary'></i> Crear Polígonos</a></li>
						</ul>
						<ul class="nav navbar-nav nav-pills nav_menu_opcion_nav" name="ver">  
						  <li class=""><a href="" style="font-size: 16px; color: black;"><i class='fa fa-map text-primary'></i> Ver Polígonos</a></li>
						</ul>
						
						<ul class="nav navbar-nav nav-pills nav_menu_opcion_nav" name="editar">  
						  <li class=""><a href="" style="font-size: 16px; color: black;"><i class='fa fa-magic text-primary'></i> Editar Polígonos</a></li>
						</ul>
						<ul class="nav navbar-nav nav-pills nav_menu_opcion_nav" name="importar">  
						  <li class=""><a href="" style="font-size: 16px; color: black;"><i class='fa fa-cogs text-primary'></i> Importar Polígonos</a></li>
						</ul>
						<ul class="nav navbar-nav nav-pills nav_menu_opcion_nav" name="borrar">  
						  <li class=""><a href="" style="font-size: 16px; color: black;"><i class='fa fa-exclamation  text-primary'></i> Borrar Polígonos</a></li>
						</ul>
						<ul class="nav navbar-nav nav-pills nav_menu_opcion_nav" name="borrar">  
						  <li class=""><a href="" style="font-size: 16px; color: black;"><i class='fa fa-power-off  text-primary'></i> Salir</a></li>
						</ul>
					</div>	
				<!--+++++++++++++++++ FIN MENU INICIO ++++++++++++++++++-->
				
				<!--+++++++++++++++++ MENU CREAR ++++++++++++++++++-->
					<div id="menu_crear" class="menu_nav_opcion" hidden>

						<div class="col-lg-2 " id="div_usar_base">
			                <div class="checkbox">
								<label>
							  		<input type="checkbox" name="crear_zona" class="chk_opcion_crear" id="chk_crear_zona" value="z">
							  	Polígono de zona
								</label>
							</div>
							<div class="checkbox">
							  <label>
							  	<input type="checkbox" name="crear_seccion" class="chk_opcion_crear" id="chk_crear_seccion" value="s">
							  	Poligonos de sección
							</label>
							</div>
			                
	                	</div>
					
	                	

		                <div id="div_territorio_crear" hidden>
			               
		                	<div class="col-lg-2 " id="div_estado_crear">
				                <label class="letras-gris"> Estado</label>
				                <select class="reauth-email form-control " name="slc_estado_crear" id="slc_estado_crear"> 
									<option value="">Elija Estado</option>
									<option value="1">Aguascalientes</option>
									<option value="2">Baja California</option>
									<option value="3">Baja California Sur</option>
									<option value="4">Campeche</option>
									<option value="5">Coahuila de Zaragoza</option>
									<option value="6">Colima</option>
									<option value="7">Chiapas</option>
									<option value="8">Chihuahua</option>
									<option value="9">Distrito Federal</option>
									<option value="10">Durango</option>
									<option value="11">Guanajuato</option>
									<option value="12">Guerrero</option>
									<option value="13">Hidalgo</option>
									<option value="14">Jalisco</option>
									<option value="15">México</option>
									<option value="16">Michoacán de Ocampo</option>
									<option value="17">Morelos</option>
									<option value="18">Nayarit</option>
									<option value="19">Nuevo León</option>
									<option value="20">Oaxaca</option>
									<option value="21">Puebla</option>
									<option value="22">Querétaro</option>
									<option value="23">Quintana Roo</option>
									<option value="24">San Luis Potosí</option>
									<option value="25">Sinaloa</option>
									<option value="26">Sonora</option>
									<option value="27">Tabasco</option>
									<option value="28">Tamaulipas</option>
									<option value="29">Tlaxcala</option>
									<option value="30">Veracruz de Ignacio de la Llave</option>
									<option value="31">Yucatán</option>
									<option value="32">Zacatecas</option>
								</select>
		                	</div>
		                	<div class="col-lg-2 " id="div_municipio_crear">
				                <label class="letras-gris"> Municipio</label>
				                <select class="reauth-email form-control slc_crear" name="slc_municipio_crear" id="slc_municipio_crear"> 
				                	<option class="" value="null">Elija Municipio...</option>
				               	</select>
		                	</div>
		                	<div class="col-lg-2 " id="div_localidad_crear">
			                	<label class="letras-gris"> Localidad</label>
			                	<select class="reauth-email form-control slc_crear" name="slc_localidad_crear" id="slc_localidad_crear"> 
			                		<option class="" value="null">Elija Localidad...</option>
			               		</select>
	                		</div>
		                	
		                	<div class="col-lg-2 " id="div_zona_crear">
				                <label class="letras-gris"> Zona</label>
				                <select class="reauth-email form-control slc_crear" name="slc_zona_crear" id="slc_zona_crear"> 
				                <option class="" value="null">Elija Zona...</option>
				               	</select>
		                	</div>

		                		
		                </div>	
	                	

					</div>			
				<!--+++++++++++++++++ ./FIN MENU CREAR ++++++++++++++++++-->
				
				<!--+++++++++++++++++ MENU VER ++++++++++++++++++-->
					<div id="menu_ver" class="menu_nav_opcion" hidden>
						<div class="col-lg-2 " id="div_slsc_estado">
			                <label class="letras-gris"> Estado</label>
			                <select class="reauth-email form-control" name="slc_estado" id="slc_estado"> 
								<option value="0">Elija Entidad</option>
								<option value="1">Aguascalientes</option>
								<option value="2">Baja California</option>
								<option value="3">Baja California Sur</option>
								<option value="4">Campeche</option>
								<option value="5">Coahuila de Zaragoza</option>
								<option value="6">Colima</option>
								<option value="7">Chiapas</option>
								<option value="8">Chihuahua</option>
								<option value="9">Distrito Federal</option>
								<option value="10">Durango</option>
								<option value="11">Guanajuato</option>
								<option value="12">Guerrero</option>
								<option value="13">Hidalgo</option>
								<option value="14">Jalisco</option>
								<option value="15">México</option>
								<option value="16">Michoacán de Ocampo</option>
								<option value="17">Morelos</option>
								<option value="18">Nayarit</option>
								<option value="19">Nuevo León</option>
								<option value="20">Oaxaca</option>
								<option value="21">Puebla</option>
								<option value="22">Querétaro</option>
								<option value="23">Quintana Roo</option>
								<option value="24">San Luis Potosí</option>
								<option value="25">Sinaloa</option>
								<option value="26">Sonora</option>
								<option value="27">Tabasco</option>
								<option value="28">Tamaulipas</option>
								<option value="29">Tlaxcala</option>
								<option value="30">Veracruz de Ignacio de la Llave</option>
								<option value="31">Yucatán</option>
								<option value="32">Zacatecas</option>
							</select>
	                	</div>
	                	<div class="col-lg-2 " id="div_slsc_municipio">
			                <label class="letras-gris"> Municipio</label>
			                <select class="reauth-email form-control slc_ver" name="slc_municipio" id="slc_municipio"> 
			                	<option class="" value="null">Elija Municipio...</option>
			               	</select>
	                	</div>
	                	<div class="col-lg-2 " id="div_slsc_localidad">
			                <label class="letras-gris"> Localidad</label>
			                <select class="reauth-email form-control slc_ver" name="slc_localidad" id="slc_localidad"> 
			                <option class="" value="null">Elija Localidad...</option>
			               	</select>
	                	</div>
	                	<div class="col-lg-2 " id="div_slsc_zona">
			                <label class="letras-gris"> Zona</label>
			                <select class="reauth-email form-control slc_ver" name="slc_zona" id="slc_zona"> 
			                <option class="" value="null">Elija Zona...</option>
			               	</select>
	                	</div>
	                	
	                	<div class="col-lg-1 " id="">
							<div class="checkbox">
						  		<label class="letras-gris">
						  			<input type="checkbox"  class="chk_acumulativo" name="chk_ver" value="chk_ver" id="chk_ver">
						  			Acumular
						  		</label>
							</div>
						</div>

	         		</div>
				<!--+++++++++++++++++ FIN MENU VER ++++++++++++++++++-->

				<!--+++++++++++++++++ MENU EDITAR ++++++++++++++++++-->
					<div id="menu_editar" class="menu_nav_opcion" hidden>
						
			                <div class="col-lg-1">&nbsp</div>
		                	<div class="col-lg-2 " id="div_slc_estado_editar">
				                <label class="letras-gris"> Estado</label>
				                <select class="reauth-email form-control" name="slc_estado_editar" id="slc_estado_editar"> 
									<option value="0">Elija Entidad</option>
									<option value="1">Aguascalientes</option>
									<option value="2">Baja California</option>
									<option value="3">Baja California Sur</option>
									<option value="4">Campeche</option>
									<option value="5">Coahuila de Zaragoza</option>
									<option value="6">Colima</option>
									<option value="7">Chiapas</option>
									<option value="8">Chihuahua</option>
									<option value="9">Distrito Federal</option>
									<option value="10">Durango</option>
									<option value="11">Guanajuato</option>
									<option value="12">Guerrero</option>
									<option value="13">Hidalgo</option>
									<option value="14">Jalisco</option>
									<option value="15">México</option>
									<option value="16">Michoacán de Ocampo</option>
									<option value="17">Morelos</option>
									<option value="18">Nayarit</option>
									<option value="19">Nuevo León</option>
									<option value="20">Oaxaca</option>
									<option value="21">Puebla</option>
									<option value="22">Querétaro</option>
									<option value="23">Quintana Roo</option>
									<option value="24">San Luis Potosí</option>
									<option value="25">Sinaloa</option>
									<option value="26">Sonora</option>
									<option value="27">Tabasco</option>
									<option value="28">Tamaulipas</option>
									<option value="29">Tlaxcala</option>
									<option value="30">Veracruz de Ignacio de la Llave</option>
									<option value="31">Yucatán</option>
									<option value="32">Zacatecas</option>
								</select>
		                	</div>
		                	<div class="col-lg-2 " id="div_slsc_municipio_editar">
				                <label class="letras-gris"> Municipio</label>
				                <select class="reauth-email form-control slc_editar" name="slc_municipio_editar" id="slc_municipio_editar"> 
				                	<option class="" value="null">Elija Municipio...</option>
				               	</select>
		                	</div>
		                	
		                	<div class="col-lg-2 " id="div_slsc_zona_editar">
				                <label class="letras-gris"> Zona</label>
				                <select class="reauth-email form-control slc_editar" name="slc_zona_editar" id="slc_zona_editar"> 
				                <option class="" value="null">Elija Zona...</option>
				               	</select>
		                	</div>
			            	
			            	<div class="col-lg-1 " id="">
								<div class="checkbox">
								  		<label class="letras-gris">
								  			<input type="checkbox"  class="chk_acumulativo" name="chk_editar_acumular" value="chk_editar_acumular" id="chk_editar_acumular">
								  			Acumular
								  		</label>
								</div>
							</div>

					</div>			
				<!--+++++++++++++++++ ./FIN MENU EDITAR ++++++++++++++++++-->
				
				<!--+++++++++++++++++ MENU IMPORTAR ++++++++++++++++++-->
					<div id="menu_importar" class="menu_nav_opcion" hidden>
					</div>			
				<!--+++++++++++++++++ ./FIN MENU IMPORTAR ++++++++++++++++++-->
				
				<!--+++++++++++++++++ MENU BORRAR ++++++++++++++++++-->
					<div id="menu_borrar" class="menu_nav_opcion" hidden>
					</div>			
				<!--+++++++++++++++++ ./FIN MENU BORRAR ++++++++++++++++++-->
		
				
			</div><!-- /.navbar-collapse -->
			<br>
		</div><!-- /.container-fluid -->
	</nav>

	<div id="wrapper" class="toggled">

        <!-- Sidebar -->
        <div id="sidebar-wrapper" >
            <ul class="sidebar-nav" id="ul_menu_sidebar">
                <li class="sidebar-brand" id="titulo_sidebar">
                       <a style="color:white;">ELIJA OPCIÓN</a>                            
                </li>
                    
            </ul>
            <div style="padding-top: 75px;" id="menu_sidebar" hidden>
	            <ul class="nav navbar-nav  nav-pills nav_menu_opcion_nav letras-gris" name="ver">  
				  <li class=""><a href="" style="font-size: 16px; color:white;"><i class='fa fa-map '></i> Ver Polígonos</a></li>
				</ul>
				<ul class="nav navbar-nav  nav-pills nav_menu_opcion_nav letras-gris" name="crear">  
				  <li class=""><a href="" style="font-size: 16px; color:white;"><i class='fa fa-road '></i> Crear Polígonos</a></li>
				</ul>
				<ul class="nav navbar-nav  nav-pills nav_menu_opcion_nav letras-gris" name="editar">  
				  <li class=""><a href="" style="font-size: 16px; color:white;"><i class='fa fa-magic '></i> Editar Polígonos</a></li>
				</ul>
				<ul class="nav navbar-nav  nav-pills nav_menu_opcion_nav letras-gris" name="exportar">  
				  <li class=""><a href="" style="font-size: 16px; color:white;"><i class='fa fa-cogs '></i> Exportar Polígonos</a></li>
				</ul>
				<ul class="nav navbar-nav  nav-pills nav_menu_opcion_nav letras-gris" name="borrar">  
				  <li class=""><a href="" style="font-size: 16px; color:white;"><i class='fa fa-exclamation  '></i> Borrar Polígonos</a></li>
				</ul>
				<center>
				<ul class="nav navbar-nav  nav-pills nav_menu_opcion_nav letras-gris" name="salir">  
				  <li class=""><a href="#menu-toggle" style="font-size: 18px; color:white;" class="pull-right" id="menu-toggle"><i class="fa fa-power-off"></i>Salir</a></li>
				</ul>
				</center>
				
			</div>
        	
        </div>
        <!-- /#sidebar-wrapper -->

        <!-- Page Content -->
        <div id="page-content-wrapper">
	       	
       
	        <!-- *******************************DIV MAPA************************* -->
	        <div class="col-lg-11" id="map" style="height:650px; width:100%"></div>
	                    
        </div>
        <!-- /#page-contentr -->

    </div>
    <!-- ++++++++++++++++/#wrapper +++++++++++++++-->
	

<!-- ++++++++++++++++++++++++++++++++ MODALES +++++++++++++++++++++++++++++++++++++++++++++ -->
      
  <!-- ++++++++++++++++++++++++++++++++ MODAL CONFIRMAR +++++++++++++++++++++++++++++++++++++++++++++ -->
  	<div class="modal fade bs-example-modal-md" id="mdl_confirmacion" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel">
	    <div class="modal-dialog modal-md">
	      <div class="modal-content">
	        <div class="modal-header">
	          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	          <h4 class="modal-title text-center" id="titulo_modal">¿Desea agregar este polígono a la base de datos?</h4>
	        </div>
	        <div class="modal-body" id="body_modal" style="overflow: auto">
	          
	            <div class="col-lg-6 text-center" id=""  name="">
	              <br>
	              <button class="btn btn-primary btn-lg" id="btn_confirmar">Agregar Polígono</button>
	            </div>

	            <div class="col-lg-6 text-center" id=""  name="">
	              <br>
	              <button class="btn btn-warning btn-lg " id="btn_descartar"  data-dismiss="modal" aria-label="Close">Descartar Polígono</button>
	            </div>
	       
	          
	        </div><!--fin div modal_body-->
	        
	      </div><!-- /.modal-content -->
	    </div><!-- /.modal-dialog -->
  	</div><!-- /.modal --> <!-- FIN MODAL CONFIRMACIÓN PARA GUARDAR POLIGONOS -->

  <!-- +++++++++++++++++++++++++++++++++MODAL ATRIBUTOS POLIGONO++++++++++++++++++++++++++++++++++++++++++++ -->
  
  	<div class="modal fade bs-example-modal-lg" id="mdl_form_poligono" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel">
	    <div class="modal-dialog modal-lg">
	      <div class="modal-content">
	        <div class="modal-header">
	          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	          <h3 class="modal-title text-primary text-center" id="titulo_modal_form_poligono">Ingrese la descripción del polígono</h3>
	        </div>
	        <div class="modal-body" id="body_modal_form_poligono" style="overflow: auto">
	          <form id="frm_info_poligono" name="frm_info_poligono">  
	            <div class="col-lg-12" >
	              
	              <div hidden="true">
	                <input type="text" class="" id="coordenadas" name="coordenadas">
	              </div>
	              
	              <div class="col-lg-4" id="" name="">
	                <center><label for="">Nombre</label></center>
	                <input type="text" class="form-control input_insertarPunto " id="zona" name="nombre" placeholder="">
	              </div>
	             
	              
	              <div class="col-lg-5" id="" name="">
	                <center><label for="">Observaciones</label></center>
	                <input type="text" class="form-control input_insertarPunto " id="observaciones" name="observaciones" placeholder="">
	              </div>
				  <div class="col-lg-3" id="" name="">
					<center><label for="">Color</label></center>
	              	<div id="cp11" class="input-group colorpicker-component">
	                	<input type="text" value="" class="form-control" name="color"/>
                    	<span class="input-group-addon"><i>*</i></span>
                  	</div>
				  </div>
				  <div class="col-lg-3" id="" name="" hidden="true">
					<input type="text" class="" id="valor_entidad" name="valor_entidad" placeholder="">
					<input type="text" class="" id="valor_municipio" name="valor_municipio" placeholder="">
					<input type="text" class="" id="valor_localidad" name="valor_localidad" placeholder="">
					<input type="text" class="" id="valor_zona" name="valor_zona" placeholder="">
					<input type="text" class="" id="valor_tipo_poligono" name="valor_tipo_poligono" placeholder="">
				  </div>
	              
	              <div class="col-lg-4 pull-right" id="" name="">
	                <br>
	                <button class="btn btn-primary btn-lg btn-block" id="btn_guardar_poligono">Guardar Polígono</button>
	              </div>

	              
	            </div>
	          <form>
	        </div><!--fin div modal_body-->

	      </div><!-- /.modal-content -->
	    </div><!-- /.modal-dialog -->
  	</div><!-- /.modal -->
  
  <!-- ++++++++++++++++++++++++++++++++++++MODAL MENSAJES+++++++++++++++++++++++++++++++++++++++++ -->
  
  	<div class="modal fade bs-example-modal-md" id="mdl_mensajes" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel">
	    <div class="modal-dialog modal-md">
	      <div class="modal-content">
	        <div class="modal-header">
	          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	          <h4 class="modal-title text-center" id="titulo_modal_mensajes">Geodata</h4>
	        </div>
	        
	        <div class="modal-body text-center" id="body_modal_mensajes" style="overflow: auto">
	          
	                      
	        </div><!--fin div modal_body-->
	        
	      </div><!-- /.modal-content -->
	    </div><!-- /.modal-dialog -->
  	</div><!-- /.modal --> <!-- FIN MODAL CONFIRMACIÓN PARA GUARDAR POLIGONOS -->

<!-- ++++++++++++++++++++++++++++++++FIN MODALES +++++++++++++++++++++++++++++++++++++++++++++ -->

</body>
	
	<script src="js/jquery-1.11.2.min.js"></script>
	
	<script src="bootstrap/js/bootstrap.min.js"></script>

	<!--script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAj-JBtJgRgNbc5sbGMkCis2xSKfT_WEbg&signed_in=true&libraries=geometry,drawing"></script-->

    <script src="js/colorpicker.js"></script>
    <script src="js/index.js"></script>
	< <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDyiiFQENdEVRyTbOzInSz1eebRMgmYX9Q&signed_in=true&libraries=geometry,drawing"></script>
 >
	<script>
	    $(function() {
	        $('#cp11').colorpicker();
	    });
	    
	    $(function() {
    		$('input').keyup(function() {
        		this.value = this.value.toLocaleUpperCase();
    		});
		});
  
	</script>


</body>
</html>
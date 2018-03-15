<?php include('includes/header_clientes.php');?>
<!DOCTYPE html>
<html lang="es">

<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <!-- Meta, title, CSS, favicons, etc. -->
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <title>Volanteo - Proveedores</title>
  <link rel="icon" href="images/logo.ico?v=2" type="image/x-icon" />

  <!-- Bootstrap core CSS -->

  <link href="css/bootstrap.min.css" rel="stylesheet">

  <link href="fonts/css/font-awesome.min.css" rel="stylesheet">
  <link href="css/animate.min.css" rel="stylesheet">

  <link href="plugins/pnotify/pnotify.custom.min.css" rel="stylesheet">

  <!-- Custom styling plus plugins -->
  <link href="css/custom.css" rel="stylesheet">
  <link href="css/icheck/flat/green.css" rel="stylesheet">

  <link href="plugins/toast/jquery.dreamalert.css" rel="stylesheet">
  <link href="plugins/CustomAlerts/css/jquery-confirm.css" rel="stylesheet">
  <link href="css/spinner.css" rel="stylesheet">


  <!-- Chosen files -->
  <link rel="stylesheet" href="plugins/chosen/css/chosen.css">


  <script src="js/jquery.min.js"></script>

  <style>

  	@media (min-width: 992px){
  		.header_tablas{
  			margin-left: -10px; padding: 0px;
  		}
  		.margin_search{
  			margin-right: -14px;
  		}
  	}
    .no-pading{
      padding: 0px;
    }

    .a-la-izq{
      float: left;
    }

    .a-la-der{
      float: right;
    }

    .my-h3{
      display: inline-block;
      text-decoration: underline;
      cursor: pointer;
    }

    .my-span{
        display: inline-block;
      cursor: pointer;
      font-size: 15px;
      margin-left: 15px;
      border: solid 1px;
      padding: 3px 3px 2px 3px;
    }

  </style>



</head>


<body class="nav-md">

  <div class="container body">


    <div class="main_container">

      <!-- Navigation bar left -->
      <?php include("navigation_left.php"); ?>
      <!-- /Navigation bar left -->

      <!-- Navigation bar top -->
      <?php include("navigation_top.php"); ?>
      <!-- /Navigation bar top -->

      <!-- page content -->
      <div class="right_col" role="main">

        <div class="">
          <div class="page-title">
            <div class="form-group col-md-12 col-sm-12 col-xs-12 header_tablas">
            	<!-- <div class="col-md-12" > -->
            		<div class="col-md-3 col-sm-6 col-xs-6">
            			<select name="" class="form-control col-md-12 col-sm-12 col-xs-12" id="select_ac_in">
							<option value="2" selected>TODOS</option>
							<option value="1">ACTIVOS</option>
							<option value="0">INACTIVOS</option>
						</select>
            		</div>
            		<div class="col-md-4 col-sm-6 col-xs-6">
            			<button id="btn_nuevo" class="btn btn-primary col-md-12 col-sm-12 col-xs-12">NUEVO PROVEEDOR</button>
            		</div>
            	<!-- </div> -->
            	<div class="col-md-4 col-sm-12 col-xs-12 form-group pull-right top_search margin_search">
                    <!-- <div class="input-group">
                        <input type="text" value="" class="form-control" id="buscar" placeholder="Busqueda...">
                        <span class="input-group-btn">
                            <button class="btn btn-default" type="button">Busca!</button>
                        </span>
                    </div> -->
                </div>		
            </div>
          </div>

          <div class="clearfix"></div>

          <div class="row">
            <div class="col-md-12 col-sm-12 col-xs-12">
              <div class="x_panel">
                <div class="x_title">
                  <h2>Proveedores</h2>
                  <ul class="nav navbar-right panel_toolbox">
                  </ul>
                  <div class="clearfix"></div>
                </div>
                <div id="tableContainer" class="x_content table-responsive">

                  <!-- start project list -->
                  <table class="table table-striped projects">
                      <thead id="thead">
                      </thead>
                      <tbody id="tbody">
                      </tbody>
                  </table>

                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- footer content -->
        <?php include("footer.html"); ?>
        <!-- /footer content -->

      </div>
      <!-- /page content -->
    </div>

  </div>
  
  <!-- MODAL PROVEEDORES-->
  <div class="modal fade bs-example-modal-lg" id="modalProveedores" data-keyboard="false" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">

        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
          </button>
          <h4 class="modal-title" id="modal_title">Nuevo proveedor</h4>
        </div>
        <div class="modal-body" id="modal_body">
          <form class="form-horizontal form-label-left input_mask" id="formNuevo" style="overflow-y: scroll; max-height: 900px">
            
            <input type="text" value="create" id="action" name="action" hidden>
            <input type="text" value="" id="id" name="id" hidden>

            <div class="col-md-12 no-pading">
              <div class="col-md-12">
                <!-- <hr> -->
                <h3 class="my-h3 header_acordeon" id="h_data_gen">Datos Generales</h3>
                <!-- <span class="fa fa-chevron-down my-span"></span> -->
                <hr>
              </div>
            </div>
            
            <div class="col-md-12 no-pading acordeon" id="data_gen" style="display: none;">
              <div class="col-md-4 col-sm-4 col-xs-12 form-group has-feedback">
                <label for="">Nombre </label><span style="color: red;">*</span>
                <input class="form-control required" id="txt_nombre" name="txt_nombre" placeholder="Ej. Miguel Angel" type="text">
                
              </div>

              <div class="col-md-4 col-sm-4 col-xs-12 form-group has-feedback">
                <label for="">RFC</label><!-- <span style="color: red;">*</span> -->
                <input class="form-control" onkeyup="conMayusculas(this);" id="txt_rfc" name="txt_rfc" placeholder="Ej. TOMA280382HMXRPN01" type="text">
                
              </div>

              <div class="col-md-4 col-sm-4 col-xs-12 form-group has-feedback">
                <label for="">Calle</label><span style="color: red;">*</span>
                <input class="form-control required" id="txt_calle" name="txt_calle" placeholder="Ej. Dr. Miguel Galindo" type="text">
                
              </div>


              <div class="col-md-4 col-sm-4 col-xs-12 form-group has-feedback">
                <label for="">Colonia</label><span style="color: red;">*</span>
                <input class="form-control required" id="txt_colonia" name="txt_colonia" placeholder="Ej. Centro" type="text">
                
              </div>

              <div class="col-md-2 col-sm-2 col-xs-12 form-group has-feedback">
                <label for="">No. Ext.</label><span style="color: red;">*</span>
                <input class="form-control required" id="txt_noext" name="txt_noext" placeholder="Ej. 223" type="text">
                
              </div>

              <div class="col-md-2 col-sm-2 col-xs-12 form-group has-feedback">
                <label for="">No. Int.</label>
                <input class="form-control" id="txt_noint" name="txt_noint" placeholder="Ej. 43" type="text">
                
              </div>


              <div class="col-md-4 col-sm-4 col-xs-12 form-group has-feedback">
                <label for="">Codigo Postal</label><span style="color: red;">*</span>
                <input class="form-control required" id="txt_cp" name="txt_cp" placeholder="Ej. 28000" type="text">
                
              </div>

              <div class="col-md-4 col-sm-4 col-xs-12 form-group has-feedback" hidden>
                <label for="">Pais</label><span style="color: red;">*</span>
                <input class="form-control required" id="txt_pais" name="txt_pais" placeholder="Ej. Mexico" type="text" value="México">
                
              </div>

              <div class="col-md-4 col-sm-4 col-xs-12 form-group has-feedback">
                <label for="">Estado</label><span style="color: red;">*</span>
                <select name="txt_estado" class="form-control required" id="txt_estado">
                  <option value="null" selected disabled>Seleccione una opción</option>
                    <?php echo $estadosDomgeo; ?>
                </select>
                
              </div>

              <div class="col-md-4 col-sm-4 col-xs-12 form-group has-feedback">
                <label for="">Localidad</label><span style="color: red;">*</span>
                <input class="form-control required" id="txt_ciudad" name="txt_ciudad" placeholder="Ej. Colima" type="text">
                
              </div>

              <div class="col-md-4 col-sm-4 col-xs-12 form-group has-feedback">
                <label for="">Municipio</label><span style="color: red;">*</span>
                <select name="txt_municipio" class="form-control required" id="txt_municipio">
                  <option value="null" selected disabled>Seleccione una opción</option>
                </select>
                
              </div>
            </div> 
              

            <div class="col-md-12 no-pading">
              <div class="col-md-4">
                <h3 class="my-h3 header_acordeon" id="h_data_fac">Datos de Facturación</h3><hr>
              </div>
              <div class="col-md-8">
                <h3><span id="datGen2DatFact" class="label label-info" style="cursor: pointer;">Llenar de "Datos Generales"</span></h3>
              </div>
            </div>

            <div class="col-md-12 no-pading acordeon" id="data_fac" style="display: none;">
              <div class="col-md-4 col-sm-4 col-xs-12 form-group has-feedback">
                <label for="">Nombre o Razón Social </label><!-- <span style="color: red;">*</span> -->
                <input class="form-control" id="txt_nombreF" name="txt_nombreF" placeholder="Ej. Miguel Angel" type="text">
                
              </div>

              <div class="col-md-4 col-sm-4 col-xs-12 form-group has-feedback">
                <label for="">RFC</label><!-- <span style="color: red;">*</span> -->
                <input class="form-control" onkeyup="conMayusculas(this);" id="txt_rfcF" name="txt_rfcF" placeholder="Ej. TOMA280382HMXRPN01" type="text">
                
              </div>

              <div class="col-md-4 col-sm-4 col-xs-12 form-group has-feedback">
                <label for="">Calle</label><!-- <span style="color: red;">*</span> -->
                <input class="form-control" id="txt_calleF" name="txt_calleF" placeholder="Ej. Dr. Miguel Galindo" type="text">
                
              </div>


              <div class="col-md-4 col-sm-4 col-xs-12 form-group has-feedback">
                <label for="">Colonia</label><!-- <span style="color: red;">*</span> -->
                <input class="form-control" id="txt_coloniaF" name="txt_coloniaF" placeholder="Ej. Centro" type="text">
                
              </div>

              <div class="col-md-2 col-sm-2 col-xs-12 form-group has-feedback">
                <label for="">No. Ext.</label><!-- <span style="color: red;">*</span> -->
                <input class="form-control" id="txt_noextF" name="txt_noextF" placeholder="Ej. 223" type="text">
                
              </div>

              <div class="col-md-2 col-sm-2 col-xs-12 form-group has-feedback">
                <label for="">No. Int.</label>
                <input class="form-control" id="txt_nointF" name="txt_nointF" placeholder="Ej. 43" type="text">
                
              </div>


              <div class="col-md-4 col-sm-4 col-xs-12 form-group has-feedback">
                <label for="">Codigo Postal</label><!-- <span style="color: red;">*</span> -->
                <input class="form-control" id="txt_cpF" name="txt_cpF" placeholder="Ej. 28000" type="text">
                
              </div>

              <div class="col-md-4 col-sm-4 col-xs-12 form-group has-feedback" hidden>
                <label for="">Pais</label><!-- <span style="color: red;">*</span> -->
                <input class="form-control" id="txt_paisF" name="txt_paisF" placeholder="Ej. Mexico" type="text" value="México">
                
              </div>

              <div class="col-md-4 col-sm-4 col-xs-12 form-group has-feedback">
                <label for="">Estado</label><!-- <span style="color: red;">*</span> -->
                <select name="txt_estadoF" class="form-control" id="txt_estadoF">
                  <option value="0" selected disabled>Seleccione una opción</option>
                    <?php echo $estadosDomgeo; ?>
                </select>
                
              </div>

              <div class="col-md-4 col-sm-4 col-xs-12 form-group has-feedback">
                <label for="">Localidad</label><!-- <span style="color: red;">*</span> -->
                <input class="form-control" id="txt_ciudadF" name="txt_ciudadF" placeholder="Ej. Colima" type="text">
                
              </div>

              <div class="col-md-4 col-sm-4 col-xs-12 form-group has-feedback">
                <label for="">Municipio</label><!-- <span style="color: red;">*</span> -->
                <select name="txt_municipioF" class="form-control" id="txt_municipioF">
                  <option value="0" selected disabled>Seleccione una opción</option>
                </select>
                
              </div>
            </div>

            <div class="col-md-12 no-pading">
              <div class="col-md-12">
                <!-- <hr> -->
                <h3 class="my-h3 header_acordeon" id="h_data_ban">Datos Bancarios</h3>
                <!-- <span class="fa fa-chevron-down my-span"></span> -->
                <hr>
              </div>
            </div>

            <div class="col-md-12 no-pading acordeon" id="data_ban" style="display: none;">
              
              <div class="col-md-4 col-sm-4 col-xs-12 form-group has-feedback">
                <label for="">Banco</label><span style="color: red;">*</span>
                <select name="txt_banco" class="form-control required" id="txt_banco">
                  <option value="null" selected disabled>Seleccione una opción</option>
                  <option value="Santander">Santander</option>
                  <option value="Banorte">Banorte</option>
                  <option value="Bancomer">Bancomer</option>
                  <option value="Banamex">Banamex</option>
                  <option value="HSBC">HSBC</option>
                  <option value="HSBC">Banbajio</option>
                  <option value="HSBC">Inbursa</option>
                  <option value="HSBC">Scotiabank</option>
                  <option value="HSBC">Oxxo</option>
                  <option value="HSBC">Farmacia Guadalajara</option>
                </select>
                
              </div>

              <div class="col-md-4 col-sm-4 col-xs-12 form-group has-feedback">
                <label for="">Clabe interbancaria</label>
                <input class="form-control required_no" id="txt_claveBanco" maxlength="18" name="txt_claveBanco" placeholder="Ej. 01568934" type="text" data-toggle="popover" placement="top" data-trigger="focus" data-content="El campo debe contener 18 digitos exactos">
                
              </div>

              <div class="col-md-4 col-sm-4 col-xs-12 form-group has-feedback">
                <label for="">Tarjeta de credito / debito</label>
                <input class="form-control required_no" id="txt_tarjeta" name="txt_tarjeta" maxlength="16" minlength="16" placeholder="Ej. 3122437643" type="text" data-toggle="popover" placement="top" data-trigger="focus" data-content="El campo debe contener 16 digitos exactos" >
                
              </div>

              <div class="col-md-4 col-sm-4 col-xs-12 form-group has-feedback">
                <label for="">No. de Sucursal</label>
                <input class="form-control" id="txt_nosucursal" name="txt_nosucursal" placeholder="Ej. 3122437643" type="text">
                
              </div>

              <div class="col-md-4 col-sm-4 col-xs-12 form-group has-feedback">
                <label for="">No. de cuenta</label>
                <input class="form-control" id="txt_nocuenta" name="txt_nocuenta" placeholder="Ej. 0599503256840599" type="text">
                
              </div>

              <div class="col-md-4 col-sm-4 col-xs-12 form-group has-feedback">
                <label for="">Telefono </label><span style="color: red;">*</span>
                <input class="form-control required" id="txt_tel1" name="txt_tel1" placeholder="Ej. 3122437643" type="text">
                
              </div>

              <div class="col-md-4 col-sm-4 col-xs-12 form-group has-feedback">
                <label for="">Celular </label>
                <input class="form-control" id="txt_tel2" name="txt_tel2" placeholder="Ej. 3122437643" type="text">
                
              </div>

              <div class="col-md-4 col-sm-4 col-xs-12 form-group has-feedback">
                <label for="">Oficina </label>
                <input class="form-control" id="txt_tel3" name="txt_tel3" placeholder="Ej. 3122437643" type="text">
                
              </div>

              <div class="col-md-4 col-sm-4 col-xs-12 form-group has-feedback">
                <label for="">Correo Electronico</label><span style="color: red;">*</span>
                <input class="form-control required" id="txt_correo" name="txt_correo" placeholder="Ej. micorreo@midominio.com" type="text">
                
              </div>

              <!-- <div class="col-md-12 col-sm-12 col-xs-12 form-group has-feedback">
                <label for="">Domicilio personal</label><span style="color: red;">*</span>
                <input class="form-control required" id="txt_domPersonal" name="txt_domPersonal" placeholder="Ej. Francisco I. Madero 56, Colonia Centro, Colima Colima." type="text">
                
              </div> -->
            </div>
              

          </form>
        </div>
        <div class="modal-footer">
          <button type="button" id="" class="btn btn-warning col-md-5 a-la-izq" data-dismiss="modal">Cerrar</button>
          <button type="button" id="" class="btn btn-primary btnModal col-md-5 a-la-der">Guardar</button>
        </div>

      </div>
    </div>
  </div>

  <input type="text" id="idprov" hidden name="idprov">
  <input type="text" id="idzona" hidden name="idzona">
  <input type="text" id="action" hidden name="action">

  <!-- MODAL VER ZONAS-->
  <div class="modal fade bs-example-modal-lg" id="modalVerZonas" data-keyboard="false" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">

        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
          </button>
          <h4 class="modal-title" id="modal_title">Zonas de cobertura</h4>
        </div>
        <div class="modal-body" id="modal_body" style="overflow: auto;">
          <div id="tableContainerZ" class="x_content table-responsive">

            <!-- start project list -->
            <table class="table table-striped projects">
                <thead id="theadZ"></thead>
                <tbody id="tbodyZ"></tbody>
            </table>
            <!-- end project list -->

          </div>

          <!-- <div class="col-md-6" style="float: right;">
            <button class="btn btn-info">Agregar tienda</button>
          </div> -->
        </div>
        <div class="modal-footer">
          <button type="button" id="" class="btn btn-warning col-md-5 a-la-izq" data-dismiss="modal">Cerrar</button>
          <button type="button" id="btn_nuevaZ" class="btn btn-primary col-md-5 a-la-der">Nueva Zona</button>
        </div>

      </div>
    </div>
  </div>

  <!-- MODAL ZONAS-->
  <div class="modal fade bs-example-modal-lg" id="modalZonas" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">

        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
          </button>
          <h4 class="modal-title" id="modal_titleZ">Editar Zona</h4>
        </div>
        <div class="modal-body" id="modal_bodyZ" style="min-height: 200px;">
          
          <form class="form-horizontal form-label-left input_mask" id="formZonas">
            
            <input type="text" value="create" id="action" name="action" hidden>
            <input type="text" value="" id="id" name="id" hidden>
            
 
            <div class="col-md-12 no-pading">

              <div class="col-md-4 col-sm-4 col-xs-12">
                <div class="col-md-12 col-sm-12 col-xs-12 form-group has-feedback">
                  <label for="">Estado</label><span style="color: red;">*</span>
                  <select name="txt_estadoZ" class="form-control" id="txt_estadoZ">
                    <option value="null" selected disabled>Seleccione una opción</option>
                      <?php echo $estadosDomgeo; ?>
                  </select>
                  
                </div>
                <div class="col-md-12 col-sm-12 col-xs-12 form-group has-feedback">
                  <label for="">Costo servicio</label><span style="color: red;">*</span>
                  <input class="form-control" id="txt_costoserv" name="txt_costoserv" placeholder="Ej. 500" type="text">
                  
                </div>
                <div class="col-md-12 col-sm-12 col-xs-12 form-group has-feedback">
                  <label for="">Costos adicionales</label><span style="color: red;">*</span>
                  <input class="form-control" id="txt_costosad" name="txt_costosad" placeholder="Ej. 500" type="text">
                  
                </div>
              </div>
              
              <div class="col-md-8 col-sm-8 col-xs-12 form-group has-feedback">
                <label for="">Municipio</label><span style="color: red;">*</span>
                <select data-placeholder="Elije un municipio" class="form-control chosen-select" multiple tabindex="4" name="txt_municipioZ" id="txt_municipioZ" disabled>
                </select>
              </div>

            </div>

          </form>

        </div>
        <div class="modal-footer">
          <button type="button" id="" class="btn btn-warning col-md-5 a-la-izq" data-dismiss="modal">Cerrar</button>
          <button type="button" id="" class="btn btn-primary btnModalZ col-md-5 a-la-der">Guardar</button>
        </div>

      </div>
    </div>
  </div>

  <div id="custom_notifications" class="custom-notifications dsp_none">
    <ul class="list-unstyled notifications clearfix" data-tabbed_notifications="notif-group">
    </ul>
    <div class="clearfix"></div>
    <div id="notif-group" class="tabbed_notifications"></div>
  </div>

  <script src="js/bootstrap.min.js"></script>

  <!-- bootstrap progress js -->
  <script src="js/progressbar/bootstrap-progressbar.min.js"></script>
  <script src="js/nicescroll/jquery.nicescroll.min.js"></script>
  <!-- icheck -->
  <script src="js/icheck/icheck.min.js"></script>

  <script src="js/custom.js"></script>

  <!-- pace -->
  <script src="js/pace/pace.min.js"></script>

  <!-- PNotify -->
  <script src="plugins/pnotify/pnotify.custom.min.js"></script>

  <!-- Mis scripts -->
  <script src="js/main.js"></script>
  <script src="plugins/toast/jquery.dreamalert.js"></script>
  <script src="plugins/CustomAlerts/js/jquery-confirm.js"></script>
  <script src="js/jQueryTablesCustom.js"></script>
  <script src="js/proveedores.js"></script>
  <script src="js/editar-trabajos.js"></script>
  <script src="js/zonas.js"></script>
  <script src="js/spinner.js"></script>

  <!-- Chosen files -->
  <script src="plugins/chosen/js/chosen.jquery.js" type="text/javascript"></script>
  <script src="plugins/chosen/js/prism.js" type="text/javascript" charset="utf-8"></script>

</body>

</html>

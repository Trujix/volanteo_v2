<?php include('includes/header_clientes.php');?>
<!DOCTYPE html>
<html lang="es">

<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <!-- Meta, title, CSS, favicons, etc. -->
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <title>Volanteo - Clientes</title>
  <link rel="icon" href="images/logo.ico?v=2" type="image/x-icon" />

  <!-- Bootstrap core CSS -->

  <link href="css/bootstrap.min.css" rel="stylesheet">

  <link href="fonts/css/font-awesome.min.css" rel="stylesheet">
  <link href="css/animate.min.css" rel="stylesheet">

  <link href="plugins/pnotify/pnotify.custom.min.css" rel="stylesheet">

  <!-- Custom styling plus plugins -->
  <link href="css/custom.css" rel="stylesheet">
  <link href="css/icheck/flat/green.css" rel="stylesheet">
  <link href="css/checkMaterialize.css" rel="stylesheet">

  <link href="plugins/toast/jquery.dreamalert.css" rel="stylesheet">
  <link href="plugins/CustomAlerts/css/jquery-confirm.css" rel="stylesheet">
  <link href="css/spinner.css" rel="stylesheet">


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

    /*.qrcode-opt{
      margin-top: 1px;margin-right: 10px;cursor: pointer;font-size: 30px;
    }
*/
    .no-pading{
      padding: 0px;
    }

    .a-la-izq{
      float: left;
    }

    .a-la-der{
      float: right;
    }

  </style>

  <!--[if lt IE 9]>
        <script src="../assets/js/ie8-responsive-file-warning.js"></script>
        <![endif]-->

  <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
  <!--[if lt IE 9]>
          <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
          <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
        <![endif]-->

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
            			<button id="btn_nuevo" class="btn btn-primary col-md-12 col-sm-12 col-xs-12">NUEVO CLIENTE</button>
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
                  <h2>Clientes</h2>
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
                  <!-- end project list -->

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
  
  <!-- MODAL CLIENTES-->
  <div class="modal fade bs-example-modal-lg" id="modalClientes" data-keyboard="false" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">

        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
          </button>
          <h4 class="modal-title" id="modal_title">Nuevo cliente</h4>
        </div>
        <div class="modal-body" id="modal_body">
          <form class="form-horizontal form-label-left input_mask" id="formNuevo">
            
            <input type="text" value="create" id="action" name="action" hidden>
            <input type="text" value="" id="id" name="id" hidden>
            
            <div class="col-md-12 no-pading">
              <div class="col-md-6 col-sm-6 col-xs-12 form-group has-feedback">
                <label for="">Nombre, Razón Social o Denominación</label><span style="color: red;">*</span>
                <input class="form-control required" id="txt_nombre" name="txt_nombre" placeholder="Ej. BODESA, CIAPACOV" type="text">
                
              </div>

              <div class="col-md-6 col-sm-6 col-xs-12 form-group has-feedback">
                <label for="">RFC</label><span style="color: red;">*</span>
                <input class="form-control required" onkeyup="conMayusculas(this);" id="txt_rfc" name="txt_rfc" placeholder="Ej. TOMA280382HMXRPN01" type="text">
                
              </div>
            </div>

            <div class="col-md-12 no-pading"> <!-- INPUT CON ID: txt_encargado -->
              <div class="col-md-6 col-sm-6 col-xs-12 form-group has-feedback">
                <label for="">Nombre del encargado... </label><span style="color: red;">*</span>
                <input class="form-control required" id="txt_encargado" name="txt_encargado" placeholder="Ej. Miguel Angel" type="text">
              </div>

              <div class="col-md-6 col-sm-6 col-xs-12 form-group has-feedback">
              </div>
            </div>
              
            <div class="col-md-12 no-pading">
              <div class="col-md-12">
                <hr>
                <h3>Domicilio Fiscal</h3>
                <hr>
              </div>
            </div>
              
            <div class="col-md-12 no-pading">
              <div class="col-md-8 col-sm-8 col-xs-12 form-group has-feedback">
                <label for="">Calle</label><span style="color: red;">*</span>
                <input class="form-control required" id="txt_calle" name="txt_calle" placeholder="Ej. Dr. Miguel Galindo" type="text">
                
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
                <label for="">Colonia</label><span style="color: red;">*</span>
                <input class="form-control required" id="txt_colonia" name="txt_colonia" placeholder="Ej. Centro" type="text">
                
              </div>

              <div class="col-md-4 col-sm-4 col-xs-12 form-group has-feedback">
                <label for="">Codigo Postal</label><span style="color: red;">*</span>
                <input class="form-control required" id="txt_cp" name="txt_cp" placeholder="Ej. 28000" type="text">
                
              </div>

              <div class="col-md-4 col-sm-4 col-xs-12 form-group has-feedback">
                <label for="">Pais</label><span style="color: red;">*</span>
                <input class="form-control required" id="txt_pais" name="txt_pais" placeholder="Ej. Mexico" type="text" value="México">
                
              </div>

              <div class="col-md-4 col-sm-4 col-xs-12 form-group has-feedback">
                <label for="">Estado</label><span style="color: red;">*</span>
                <!-- <input class="form-control required" id="txt_estado" name="txt_estado" placeholder="Ej. Colima" type="text"> -->
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
                <!-- <input class="form-control required" id="txt_municipio" name="txt_municipio" placeholder="Ej. Colima" type="text"> -->
                <select name="txt_municipio" class="form-control required" id="txt_municipio">
                  <option value="null" selected disabled>Seleccione una opción</option>
                </select>
                
              </div>
            </div>

            <div class="col-md-12 no-pading">
              <div class="col-md-12">
                <hr>
                <h3>Contacto</h3>
                <hr>
              </div>
            </div>

            <div class="col-md-12 no-pading">
              <div class="col-md-6 col-sm-6 col-xs-12 form-group has-feedback">
                <label for="">Telefono 1</label><span style="color: red;">*</span>
                <input class="form-control required" id="txt_tel1" name="txt_tel1" placeholder="Ej. 3122437643" type="text">
                
              </div>

              <div class="col-md-6 col-sm-6 col-xs-12 form-group has-feedback">
                <label for="">Telefono 2</label>
                <input class="form-control" id="txt_tel2" name="txt_tel2" placeholder="Ej. 3125643" type="text">
                
              </div>

              <div class="col-md-6 col-sm-6 col-xs-12 form-group has-feedback">
                <label for="">Correo Electronico</label><span style="color: red;">*</span>
                <input class="form-control required" id="txt_correo" name="txt_correo" placeholder="Ej. micorreo@midominio.com" type="text">
                
              </div>

              <div class="col-md-6 col-sm-6 col-xs-12 form-group has-feedback">
                <label for="">Web</label>
                <input class="form-control" id="txt_web" name="txt_web" placeholder="Ej. www.mipagina.com.mx" type="text">
                
              </div>
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

  <input type="text" id="idcliente" hidden name="idcliente">
  <input type="text" id="idtienda" hidden name="idtienda">
  <input type="text" id="action" hidden name="action">

  <!-- MODAL VER BLOQUES-->
  <div class="modal fade bs-example-modal-lg" id="modalVerBloques" data-keyboard="false" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">

        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
          </button>
          <h4 class="modal-title" id="modal_titleVer">Bloques de Sucursales</h4>
        </div>
        <div class="modal-body" id="modal_body" style="overflow: auto;">
          <div id="tableContainerB" class="x_content table-responsive">

            <!-- start project list -->
            <table class="table table-striped projects">
                <thead id="theadB"></thead>
                <tbody id="tbodyB"></tbody>
            </table>
            <!-- end project list -->

          </div>

          <!-- <div class="col-md-6" style="float: right;">
            <button class="btn btn-info">Agregar tienda</button>
          </div> -->
        </div>
        <div class="modal-footer">
          <button type="button" id="cerrarModals" class="btn btn-warning col-md-5 a-la-izq" data-dismiss="modal">Cerrar</button>
          <button type="button" id="btn_nuevaB" class="btn btn-primary col-md-5 a-la-der">Nuevo Bloque</button>
        </div>

      </div>
    </div>
  </div>

   <!-- MODAL BLOQUES-->
  <div class="modal fade bs-example-modal-lg" id="modalBloques" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">

        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
          </button>
          <h4 class="modal-title" id="modal_titleB"></h4>
        </div>
        <div class="modal-body" id="modal_bodyT" style="overflow: auto;">
          
          <form class="form-horizontal form-label-left input_mask" id="formTiendas">
            
            <input type="text" value="create" id="action" name="action" hidden>
            <input type="text" value="" id="id" name="id" hidden>
            
            <div class="col-md-12 no-pading">
              <div class="col-md-12 col-sm-12 col-xs-12 form-group has-feedback">
                <label for="">Nombre de Bloque de sucursal: </label><span style="color: red;">*</span>
                <input class="form-control requiredB" id="txt_nombreB" name="txt_nombreB" placeholder="Ej. El BODEGÓN INSTITUCIONAL" type="text">
              </div>
            </div>

            <div class="col-md-12 no-pading">
              <div class="col-md-12">
                <hr>
                <h3>Contacto</h3>
                <hr>
              </div>
            </div>
              
            <div class="col-md-12 no-pading">

              <div style="overflow: auto;">
                <div class="col-md-6 col-sm-6 col-xs-12 form-group has-feedback">
                  <label for="">Encargado</label><span style="color: red;">*</span>
                  <input class="form-control requiredB" id="txt_encargadoB" name="txt_encargadoB" placeholder="Ej. Miguel Galindo" type="text">
                </div>

                <div class="col-md-6 col-sm-6 col-xs-12 form-group has-feedback">
                  <label for="">Correo Electrónico</label><span style="color: red;">*</span>
                  <input class="form-control requiredB" id="txt_correoB" name="txt_correoB" placeholder="Ej. micorreo@midominio.com" type="text">
                </div>
              </div>

              <div style="overflow: auto;">
                <div class="col-md-4 col-sm-4 col-xs-12 form-group has-feedback">
                  <label for="">Celular</label><span style="color: red;">*</span>
                  <input class="form-control requiredB" id="txt_celularB" name="txt_celularB" maxlength="10" placeholder="Ej. 3121231234" type="text" onkeypress="return event.charCode >= 48 && event.charCode <= 57">
                </div>

                <div class="col-md-4 col-sm-4 col-xs-12 form-group has-feedback">
                  <label for="">Tel. Oficina</label><span style="color: red;">*</span>
                  <input class="form-control requiredB" id="txt_teloficinaB" name="txt_teloficinaB" maxlength="10" placeholder="Ej. 3121231234" type="text" onkeypress="return event.charCode >= 48 && event.charCode <= 57">
                </div>

                <div class="col-md-4 col-sm-4 col-xs-12 form-group has-feedback">
                  <label for="">Whatsapp</label><span style="color: red;">*</span>
                  <input class="form-control requiredB" id="txt_whatsappB" name="txt_whatsappB" maxlength="14" placeholder="Ej. 3121231234" type="text" value="+52 " onkeypress="return event.charCode >= 48 && event.charCode <= 57">
                </div>
              </div>

            </div>

            <input type="text" name="address" id="address" hidden>
            <input type="text" name="latitud" id="latitud" hidden>
            <input type="text" name="longitud" id="longitud" hidden>

          </form>

        </div>
        <div class="modal-footer">
          <button type="button" id="" class="btn btn-warning col-md-5 a-la-izq" data-dismiss="modal">Cerrar</button>
          <button type="button" id="btnGuardaBloque" class="btn btn-primary col-md-5 a-la-der">Guardar Bloque</button>
        </div>

      </div>
    </div>
  </div>

  <!-- MODAL SUCURSALES -->
  <div class="modal fade bs-example-modal-lg" id="modalSucursales" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">

        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
          </button>
          <h4 class="modal-title" id="modal_titleS"></h4>
        </div>
        <div class="modal-body" id="modal_bodyT" style="overflow: auto;">
          
          <div class="form-horizontal form-label-left input_mask">
            
            <input type="text" value="create" id="action" name="action" hidden>
            <input type="text" value="" id="id" name="id" hidden>
            
            <div class="col-md-12 no-pading">
              <div class="col-md-6 col-sm-6 col-xs-6 form-group has-feedback">
                <label for="">Nombre de sucursal: </label><span style="color: red;">*</span>
                <input class="form-control requiredS" id="txt_nombreS" name="txt_nombreB" placeholder="Ej. El BODEGÓN INSTITUCIONAL" type="text">
              </div>

              <div class="col-md-6 col-sm-6 col-xs-6 form-group has-feedback">
                <label for="">Encargado</label><span style="color: red;">*</span>
                <input class="form-control requiredS" id="txt_encargadoS" name="txt_encargadoS" placeholder="Ej. Carlos Trejo" type="text">
              </div>
            </div>

            <div class="col-md-12 no-pading">
                <div class="col-md-6 col-sm-6 col-xs-12 form-group has-feedback">
                  <label for="">Estado (Ubicación de tienda)</label><span style="color: red;">*</span>
                  <select id="txt_EstadoSH" class="form-control requiredS" name="txt_EstadoSH"></select>
                </div>

                <div class="col-md-6 col-sm-6 col-xs-12 form-group has-feedback">
                  <label for="">Municipio (Ubicación de tienda)</label><span style="color: red;">*</span>
                  <select id="txt_MunicipioSH" class="form-control requiredS" name="txt_MunicipioSH">
                    <option value="-1">- Seleccione Municipio -</option>
                  </select>
                </div>
            </div>

            <div class="col-md-12 no-pading">
              <div class="col-md-6 col-sm-6 col-xs-6 form-group has-feedback">
                <label for="">Correo Electronico</label><span style="color: red;">*</span>
                <input class="form-control requiredS" id="txt_correoS" name="txt_correoS" placeholder="Ej. micorreo@hotmail.com" type="text">
              </div>

              <div class="col-md-6 col-sm-6 col-xs-6 form-group has-feedback">
                <label for="">Telefono</label><span style="color: red;">*</span>
                <input class="form-control requiredS" id="txt_telefonoS" name="txt_telefonoS" maxlength="10" placeholder="Ej. 3121231234" type="text" onkeypress="return event.charCode >= 48 && event.charCode <= 57">
              </div>
            </div>

            <div class="col-md-12 no-pading">
                <div class="col-md-6 col-sm-6 col-xs-12 form-group has-feedback">
                  <label for="">Estado (Cobertura) </label><span style="color: red;">*</span>
                  <select id="txt_EstadoS" class="form-control requiredS" name="txt_EstadoS"></select>
                </div>

                <div class="col-md-6 col-sm-6 col-xs-12 form-group has-feedback">
                  <label for="">Municipio (Cobertura) </label><span style="color: red;">*</span>
                  <select id="txt_MunicipioS" class="form-control requiredS" name="txt_MunicipioS">
                    <option value="-1">- Seleccione Municipio -</option>
                  </select>
                </div>
            </div>

            <div id="divLocCol" class="col-md-12 no-pading" hidden>
                <div id="localidadeSucursal" class="col-md-6 col-sm-6 col-xs-12 form-group has-feedback tableContainer table-responsive table-bordered divFormStep2" style="padding: 0;height: 140px;"></div>

                <div class="col-md-6 col-sm-6 col-xs-12 form-group has-feedback">
                  <div class="col-md-12">
                    <button id="asignarPoligonos" class="btn btn-success col-md-12"><span class="fa fa-globe"></span> Asignar Poligonos</button>
                  </div>
                  
                  <div class="col-md-12 col-sm-12 col-xs-12 form-group has-feedback">
                    
                  </div>

                  <!-- <div class="col-md-12 col-sm-12 col-xs-12 form-group has-feedback">
                    <label for="">Correo Electronico</label><span style="color: red;">*</span>
                    <input class="form-control requiredS" id="txt_correoS" name="txt_correoS" placeholder="Ej. micorreo@hotmail.com" type="text">
                  </div>

                  <div class="col-md-12 col-sm-12 col-xs-12 form-group has-feedback">
                    <label for="">Telefono</label><span style="color: red;">*</span>
                    <input class="form-control requiredS" id="txt_telefonoS" name="txt_telefonoS" maxlength="10" placeholder="Ej. 3121231234" type="text" onkeypress="return event.charCode >= 48 && event.charCode <= 57">
                  </div> -->
                    
                </div>

            </div>

            <input type="text" name="address" id="address" hidden>
            <input type="text" name="latitud" id="latitud" hidden>
            <input type="text" name="longitud" id="longitud" hidden>

          </div>

        </div>
        <div class="modal-footer">
          <button type="button" id="" class="btn btn-warning col-md-5 a-la-izq" data-dismiss="modal">Cerrar</button>
          <button type="button" id="btnGuardaSucursal" class="btn btn-primary col-md-5 a-la-der">Guardar Sucursal</button>
        </div>

      </div>
    </div>
  </div>

  <!-- MODAL VER SUCURSALES-->
  <div class="modal fade bs-example-modal-lg" id="modalVerSucursales" data-keyboard="false" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">

        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
          </button>
          <h4 class="modal-title" id="modal_titleVerS"></h4>
        </div>
        <div class="modal-body" id="modal_body" style="overflow: auto;">
          <div id="tableContainerB" class="x_content table-responsive">

            <!-- start project list -->
            <table class="table table-striped projects">
                <thead id="theadS"></thead>
                <tbody id="tbodyS"></tbody>
            </table>
            <!-- end project list -->

          </div>

        </div>
        <div class="modal-footer">
          <button type="button" id="" class="btn btn-warning col-md-5 a-la-izq" data-dismiss="modal">Cerrar</button>
          <button type="button" id="btn_nuevaS" class="btn btn-primary col-md-5 a-la-der">Nueva Sucursal</button>
        </div>

      </div>
    </div>
  </div>

  <!-- MODAL MAPA POLIGONOS SUCURSAL -->
  <div class="modal fade bs-example-modal-lg" id="modalPoligonos" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">

        <div class="modal-header">
          <button type="button" class="btn btn-xs btn-danger close" data-dismiss="modal"><span aria-hidden="true">Cerrar</span></button>
          <h4 class="modal-title">Asignar Poligonos a Sucursal</h4>
        </div>
        <div class="modal-body" id="googleMap" style="overflow: auto; height: 500px;">
        </div>
        <!-- <div class="modal-footer">
          <button type="button" id="" class="btn btn-warning col-md-5 a-la-izq" data-dismiss="modal">Cerrar</button>
          <button type="button" id="btnGuardaPoligonos" class="btn btn-primary col-md-5 a-la-der">Guardar Poligonos</button>
        </div> -->

      </div>
    </div>
  </div>

  <!-- MODAL VER TIENDAS-->
  <div class="modal fade bs-example-modal-lg" id="modalVerTiendas" data-keyboard="false" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">

        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
          </button>
          <h4 class="modal-title" id="modal_titleVer">Tiendas</h4>
        </div>
        <div class="modal-body" id="modal_body" style="overflow: auto;">
          <div id="tableContainerT" class="x_content table-responsive">

            <!-- start project list -->
            <table class="table table-striped projects">
                <thead id="theadT"></thead>
                <tbody id="tbodyT"></tbody>
            </table>
            <!-- end project list -->

          </div>

          <!-- <div class="col-md-6" style="float: right;">
            <button class="btn btn-info">Agregar tienda</button>
          </div> -->
        </div>
        <div class="modal-footer">
          <button type="button" id="" class="btn btn-warning col-md-5 a-la-izq" data-dismiss="modal">Cerrar</button>
          <button type="button" id="btn_nuevaT" class="btn btn-primary col-md-5 a-la-der">Nueva tienda</button>
        </div>

      </div>
    </div>
  </div>

  <!-- MODAL TIENDAS-->
  <div class="modal fade bs-example-modal-lg" id="modalTiendas" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">

        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
          </button>
          <h4 class="modal-title" id="modal_titleT">Editar tienda</h4>
        </div>
        <div class="modal-body" id="modal_bodyT" style="overflow: auto;">
          
          <form class="form-horizontal form-label-left input_mask" id="formTiendas">
            
            <input type="text" value="create" id="action" name="action" hidden>
            <input type="text" value="" id="id" name="id" hidden>
            
            <div class="col-md-12 no-pading">
              <div class="col-md-6 col-sm-6 col-xs-12 form-group has-feedback">
                <label for="">Nombre: </label><span style="color: red;">*</span>
                <input class="form-control" id="txt_nombreT" name="txt_nombreT" placeholder="Ej. El bodegón Madero" type="text">
                
              </div>
              <div class="col-md-6 col-sm-6 col-xs-12 form-group has-feedback">
                <label for="">Encargado: </label><span style="color: red;">*</span>
                <input class="form-control" id="txt_encargadoT" name="txt_encargadoT" placeholder="Ej. Manuel Altamirano" type="text">
                
              </div>
            </div>

            <div class="col-md-12 no-pading">
              <div class="col-md-12">
                <hr>
                <h3>Domicilio</h3>
                <hr>
              </div>
            </div>
              
            <div class="col-md-12 no-pading">

              <div style="overflow: auto;">
                <div class="col-md-4 col-sm-4 col-xs-12 form-group has-feedback">
                  <label for="">Código Postal</label><span style="color: red;">*</span>
                  <div class="input-group">
                      <input class="form-control" id="txt_cpT" name="txt_cpT" placeholder="Ej. 28984" type="text">
                      <span class="input-group-btn">
                        <input type="submit" value="Buscar" class="btn btn-success" id="btnBuscaCP">
                          <!-- <button class="btn btn-success" id="btnBuscaCP" type="button">Buscar</button> -->
                      </span>
                  </div>
                  
                </div>

                <div class="col-md-4 col-sm-4 col-xs-12 form-group has-feedback">
                  <label for="">Estado</label><span style="color: red;">*</span>
                  <select name="txt_estadoT" class="form-control" id="txt_estadoT" disabled>
                    <option value="null" selected disabled>Seleccione una opción</option>
                      <?php echo $estadosDomgeo; ?>
                  </select>
                </div>

                <div class="col-md-4 col-sm-4 col-xs-12 form-group has-feedback">
                  <label for="">Municipio</label><span style="color: red;">*</span>
                  <select name="txt_municipioT" class="form-control" id="txt_municipioT" disabled>
                    <option value="null" selected disabled>Seleccione una opción</option>
                  </select>
                </div>
              </div>

              <div style="overflow: auto; margin-bottom: 10px;">
                <div class="col-md-6 col-sm-6 col-xs-12 form-group has-feedback">
                  <label for="">Localidad</label><span style="color: red;">*</span>
                  <select name="txt_localidadT" class="form-control" id="txt_localidadT" disabled>
                    <option value="null" selected disabled>Seleccione una opción</option>
                  </select>
                </div>

                <div class="col-md-6 col-sm-6 col-xs-12 form-group has-feedback">
                  <label for="">Colonia</label><span style="color: red;">*</span>
                  <!-- <select name="txt_coloniaT" class="form-control" id="txt_coloniaT" disabled>
                    <option value="null" selected disabled>Seleccione una opción</option>
                  </select> -->
                  <input class="form-control" id="txt_coloniaT" name="txt_coloniaT" placeholder="Ej. Arboledas del carmen" type="text">
                </div>

              </div>

              <div style="overflow: auto;">
                <div class="col-md-8 col-sm-8 col-xs-12 form-group has-feedback">
                  <label for="">Calle</label><span style="color: red;">*</span>
                  <input class="form-control" id="txt_calleT" name="txt_calleT" placeholder="Ej. Dr. Miguel Galindo" type="text">
                </div>

                <div class="col-md-2 col-sm-2 col-xs-12 form-group has-feedback">
                  <label for="">No. Ext.</label><span style="color: red;">*</span>
                  <input class="form-control" id="txt_noextT" name="txt_noextT" placeholder="Ej. 223" type="text">
                </div>

                <div class="col-md-2 col-sm-2 col-xs-12 form-group has-feedback">
                  <label for="">No. Int.</label>
                  <input class="form-control" id="txt_nointT" name="txt_nointT" placeholder="Ej. 43" type="text">
                </div>
              </div>

              <!-- <div style="overflow: auto;">
                <div class="col-md-12 col-sm-12 col-xs-12 form-group has-feedback">
                  <input type="submit" value="Georeferenciar" class="btn btn-success col-md-12" id="btnShowMap" style="margin-top: 23px;">
                </div>
              </div> -->

            </div>

            <input type="text" name="address" id="address" hidden>
            <input type="text" name="latitud" id="latitud" hidden>
            <input type="text" name="longitud" id="longitud" hidden>

          </form>

        </div>
        <div class="modal-footer">
          <button type="button" id="" class="btn btn-warning col-md-5 a-la-izq" data-dismiss="modal">Cerrar</button>
          <button type="button" id="btnShowMap" class="btn btn-primary col-md-5 a-la-der">Siguiente</button>
        </div>

      </div>
    </div>
  </div>

  <!-- MODAL VER MAPA-->
  <div class="modal fade bs-example-modal-lg" id="modalMapa" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">

        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
          </button>
          <h4 class="modal-title" id="">Ubica tu tienda</h4>
        </div>
        <div class="modal-body" id="" style="overflow: auto;">
          <div id="map" style="width:860px; height:500px;"></div>
        </div>
        <div class="modal-footer">
          <button type="button" id="" class="btn btn-warning col-md-5 a-la-izq" data-dismiss="modal">Regresar</button>
          <button type="button" id="" class="btn btn-primary btnModalT col-md-5 a-la-der">Guardar</button>
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
  <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCTcmQxEiidmYhnAOomATJZqq6yCVykbEE&libraries=geometry,drawing"></script>
  <script src="js/main.js"></script>
  <script src="plugins/CustomAlerts/js/jquery-confirm.js"></script>
  <script src="js/jQueryTablesCustom.js"></script>
  <script src="js/clientes.js"></script>
  <script src="js/editar-trabajos.js"></script>
  <script src="js/tiendas.js"></script>
  <script src="js/spinner.js"></script>

</body>

</html>

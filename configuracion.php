<?php include('includes/header_seguimiento.php');?>
<!DOCTYPE html>
<html lang="es">

<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <!-- Meta, title, CSS, favicons, etc. -->
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <title>Volanteo - Seguimiento</title>
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
  <!-- <link rel="stylesheet" href="http://netdna.bootstrapcdn.com/bootstrap/3.0.2/css/bootstrap.min.css"> -->
  <link rel="stylesheet" href="http://blueimp.github.io/Gallery/css/blueimp-gallery.min.css">


  <script src="js/jquery.min.js"></script>
  <!-- COLLAPSE ESTILOS (NO ESTABAN EN EL TEMPLATE) -->
  <link rel="stylesheet" type="text/css" href="plugins/collapse/css.css">
  <script src="plugins/collapse/js.js" type="text/javascript"></script>

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
    .hide-bullets {
      list-style:none;
      margin-left: -40px;
      margin-top:20px;
    }

    .img-min{
      margin: 5px !important;;
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
            		
            </div>
          </div>

          <div class="clearfix"></div>
          

          <div class="row">
            <div class="col-md-12 col-sm-12 col-xs-12">
              <div class="x_panel">
                <div class="x_title">
                  <h2>Configuracion</h2>
                  <ul class="nav navbar-right panel_toolbox">
                  </ul>
                  <div class="clearfix"></div>
                </div>

                <div id="contenido" class="x_content table-responsive">
                  <h4>Cambiar contraseña</h4>
                      <div class="col-md-4"><div class="input-group">
                          <input id="txtAntPass" type="password" class="form-control pass" placeholder="Coloque la antigua contraseña...">
                          <span class="input-group-btn">
                            <button class="btn btn-default ver" idtxt="txtAntPass" type="button"><span id="txtAntPass_sp" class="fa fa-eye"></span></button>
                          </span>
                        </div>
                      </div>
                      <div class="col-md-4"><div class="input-group">
                          <input id="txtNewPass" type="password" class="form-control pass" placeholder="Coloque la nueva contraseña...">
                          <span class="input-group-btn">
                            <button class="btn btn-default ver" idtxt="txtNewPass" type="button"><span id="txtNewPass_sp" class="fa fa-eye"></span></button>
                          </span>
                        </div>
                      </div>
                      <div class="col-md-4"><div class="input-group">
                          <input id="txtNewPass2" type="password" class="form-control pass" placeholder="Otra vez la nueva contraseña...">
                          <span class="input-group-btn">
                            <button class="btn btn-default ver" idtxt="txtNewPass2" type="button"><span id="txtNewPass2_sp" class="fa fa-eye"></span></button>
                          </span>
                        </div>
                      </div>

                </div>

                <div id="contenido" class="x_content table-responsive">
                  <div class="col-md-5"><button id="guardarPass" class="btn btn-success">Guardar cambios</button></div>
                  <div class="col-md-5"><p></p></div>
                  <div class="col-md-2"><p></p></div>
                </div>

                <div id="contenido" class="x_content table-responsive"><hr></div>

                <div id="contenido" class="x_content table-responsive">
                  <h4>Restablecer contraseña de usuarios</h4>
                  <div class="col-md-4">
                    <select id="tipoUser" class="form-control user">
                      <option value="-1">- Seleccione tipo de usuario -</option>
                      <option cuno="encargado" cdos="idcliente" value="clientes">Clientes</option>
                      <option cuno="encargado" cdos="idbloque" value="bloques">Bloques</option>
                      <option cuno="encargado" cdos="idsucursal" value="sucursales">Sucursales</option>
                      <option cuno="nombre" cdos="idproveedor" value="proveedores">Proveedores</option>
                      <!-- <option cuno="username" cdos="id" value="usuarios">Sistema</option> -->
                    </select>
                  </div>
                  <div class="col-md-4">
                    <select id="nomUser" class="form-control user">
                      <option value="-1">- Seleccione usuario -</option>
                    </select>
                  </div>
                  <div class="col-md-4">
                    <button id="passUser" class="btn btn-primary">Restablecer contraseña</button>
                  </div>
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
  
  <!-- MODAL -->
  <div class="modal fade bs-example-modal-lg" id="modal_lvl2" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">

        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
          </button>
          <h4 class="modal-title" id="title_lvl2">Detalles del servicio </h4>
        </div>
        <div class="modal-body" id="" style="overflow: auto;">
          <div id="accordionDiv"></div>
        </div>
        <div class="modal-footer">
          <button type="button" onclick="showlvl3_todos()" class="btn btn-primary btnModalT col-md-5 a-la-izq">Ver detalle de todos</button>
          <button type="button" id="" class="btn btn-warning col-md-5 a-la-der" data-dismiss="modal">Cerrar</button>
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
  <script src="js/main.js?1.0.0"></script>
  <script src="plugins/CustomAlerts/js/jquery-confirm.js?1.0.0"></script>
  <script src="js/jQueryTablesCustom.js?1.0.0"></script>
  <script src="js/configuracion.js?1.0.0"></script>
  <script src="js/spinner.js?1.0.0"></script>
  <script src="http://blueimp.github.io/Gallery/js/jquery.blueimp-gallery.min.js"></script>

</body>

</html>

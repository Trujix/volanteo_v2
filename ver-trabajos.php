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
    .no-pading{
      padding: 0px;
    }

    .a-la-izq{
      float: left;
    }

    .a-la-der{
      float: right;
    }
    .altaCompleta{
      color: #fff;
      background-color: #87d37C;
      border-color: #87d37C;
    }
    .altaIncompleta{
      color: #fff;
      background-color: #1E824C;
      border-color: #1E824C;
    }
    .enviarMail{
      color: #fff;
      background-color: #D35400;
      border-color: #D35400; 
    }
    .seguimientoCompl{
      color: #fff;
      background-color: #F1A9A0;
      border-color: #F1A9A0; 
    }
    .envioCompleto{
      color: #000000;
      background-color: #F0E3A7;
      border-color: #F0E3A7;
    }
    .propuestaTerminada{
      color: #fff;
      background-color: #663399;
      border-color: #663399;
    }
    .enviarProveedor{
      color: #fff;
      background-color: #663399;
      border-color: #663399;
    }
    .verifRolTrabajo{
      color: #fff;
      background-color: #9A12B3;
      border-color: #9A12B3;
    }
    .rolesEnviados{
      color: #000000;
      background-color: #BE90D4;
      border-color: #BE90D4;
    }
    .trabajoIniciado{
      color: #fff;
      background-color: #87d37C;
      border-color: #87d37C;
    }
    .trabajoTerminado{
      color: #fff;
      background-color: #00B16A;
      border-color: #00B16A;
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
            		<div class="col-md-4 col-sm-6 col-xs-6">
            			<button onclick="llamarEditarTrabajo('NUEVO','-')" id="btn_nuevo" class="btn btn-primary col-md-12 col-sm-12 col-xs-12">NUEVO TRABAJO</button>
            		</div>
            	<!-- </div> -->
            	<div class="col-md-4 col-sm-12 col-xs-12 form-group pull-right top_search margin_search">

                </div>		
            </div>
          </div>

          <div class="clearfix"></div>

          <div class="row">
            <div class="col-md-12 col-sm-12 col-xs-12">
              <div class="x_panel">
                <div class="x_title">
                  <h2>Trabajos</h2>
                  <ul class="nav navbar-right panel_toolbox">
                  </ul>
                  <div class="clearfix"></div>
                </div>
                <div id="tableContainer1" class="x_content table-responsive">

                  <!-- start project list -->
                  <table class="table table-striped projects">
                      <thead id="thead1">
                      </thead>
                      <tbody id="tbody1">
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


  <!-- MODAL NIVEL 2-->
  <div class="modal fade bs-example" id="modalLvl2" data-keyboard="false" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">

        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
          </button>
          <h4 class="modal-title" id="modal_titleLvl2">Bloque que cubrirá</h4>
        </div>
        <div class="modal-body" id="modal_bodyLvl2" style="overflow: auto;">
          <div id="tableContainer2" class="x_content table-responsive">

            <!-- start project list -->
            <table class="table table-striped projects">
                <thead id="thead2"></thead>
                <tbody id="tbody2"></tbody>
            </table>
            <!-- end project list -->

          </div>

          <!-- <div class="col-md-6" style="float: right;">
            <button class="btn btn-info">Agregar tienda</button>
          </div> -->
        </div>
        

      </div>
    </div>
  </div>

  <!-- MODAL NIVEL 3-->
  <div class="modal fade bs-example-modal-lg" id="modalLvl3" data-keyboard="false" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">

        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
          </button>
          <h4 class="modal-title">Detalles de Bloque</h4>
        </div>
        <div class="modal-body" style="overflow: auto;">
          <div id="tableContainer3" class="x_content table-responsive">

            <table class="table table-striped projects">
                <thead id="thead3"></thead>
                <tbody id="tbody3"></tbody>
            </table><br>
            
            <div class="nocubierto">
              <label>Sucursales sin cubrir</label>
              <table class="table table-striped">
                <thead id="thead4"></thead>
                <tbody id="tbody4"></tbody>
              </table>
            </div>
    
          </div>

        </div>

      </div>
    </div>
  </div>

  <!-- MODAL ROLES TRABAJAO -->
  <div class="modal fade bs-example-modal-lg" id="modalRoles" data-keyboard="false" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">

        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
          </button>
          <h4 id="tituloRoles" class="modal-title"></h4>
        </div>
        <div class="modal-body" style="overflow: auto;">
          
          <div id="cuerpoRoles"></div><br>

          <div class="row">
            <div class="col-md-2"></div>
            <div class="col-md-5">
              <button id="guardarRol" class="btn btn-success">Aceptar Rol de proveedor(es)</button>
            </div>
            <div class="col-md-4">
              <button id="cerrarRol" class="btn btn-danger">Cancelar</button>
            </div>
            <div class="col-md-1"></div>
          </div>
        
        </div>

      </div>
    </div>
  </div>
  
  <!-- MODAL CONFIGURAR FECHAS PERIFONEO -->
  <div class="modal fade bs-example-modal-lg" id="modalPerifoneoFechas" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
          </button>
          <h4 id="tituloPerifoneoFechas" class="modal-title"></h4>
        </div>
        <div class="modal-body" style="overflow: auto;">
          <div class="row">
            <div class="col-md-3">
              <label>Tiempo total:&nbsp;<span id="tiempoTotalPerifoneo"></span></label>
            </div>
            <div class="col-md-4">
              <label>Tiempo restante:&nbsp;<span id="tiempoRestantePerifoneo"></span></label>
            </div>
          </div><p></p>
          <div class="row">
            <div class="col-md-1" align="right">
              <label>Fechas:</label>
            </div>
            <div class="col-md-3">
              <select id="periodoTrabajo" class="form-control"></select>
            </div>
            <div class="col-md-1" align="right">
              <label>Hr Inicio:</label>
            </div>
            <div class="col-md-2">
              <input id="iniPerifoneoConfig" class="form-control" type="time" />
            </div>
            <div class="col-md-1" align="right">
              <label>Hr Término</label>
            </div>
            <div class="col-md-2">
              <input id="finPerifoneoConfig" class="form-control" type="time" />
            </div>
            <div class="col-md-2">
              <button id="agregarConfigPerifoneo" class="btn btn-info">Agregar</button>
            </div>
          </div><br><br>
          <div class="row">
            <div class="col-md-12">
              <div class="table-responsive">
                <table class="table">
                  <thead>
                    <tr>
                      <th>Fecha</th>
                      <th>Inicio</th>
                      <th>Fin</th>
                      <th>Minutos</th>
                      <th><span class="glyphicon glyphicon-trash"></span></th>
                    </tr>
                  </thead>
                  <tbody id="tablaPerifoneoConfig"></tbody>
                </table>
              </div>
            </div>
          </div><br><br>
          <div class="row">
            <div id="perifConfigGuardarMailDiv" class="col-md-3">
              <button id="perifConfigGuardarMail" class="btn btn-success"><span class="glyphicon glyphicon-envelope"></span>&nbsp;Guardar y enviar correo</button>
            </div>
            <div id="perifConfigEditarDiv" class="col-md-5">
              <button id="perifConfigEditar" class="btn btn-success">Guardar cambios</button>
            </div>
            <div id="perifConfigGuardarDiv" class="col-md-2">
              <button id="perifConfigGuardar" class="btn btn-warning">Solo Guardar</button>
            </div>
            <div class="col-md-7" align="right">
              <button type="button" class="btn btn-danger" data-dismiss="modal">Cerrar</button>
            </div>
          </div>
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

  <!-- PDFMAKE -->
  <script src="plugins/pdfmake/build/pdfmake.min.js"></script>
  <script src="plugins/pdfmake/build/vfs_fonts.js"></script>

  <!-- Mis scripts -->
  <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAO41NdNRl5wKs_Er7xw-CagvsuZkZXtKY"></script>
  <script src="js/main.js"></script>
  <script src="plugins/CustomAlerts/js/jquery-confirm.js"></script>
  <script src="js/jQueryTablesCustom.js"></script>
  <script src="js/ver-trabajos.js"></script>
  <script src="js/editar-trabajos.js"></script>
  <script src="js/fecha-vigencia.js"></script>
  <script src="js/spinner.js"></script>

</body>

</html>

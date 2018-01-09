<?php include('includes/loginProtect.php');?>
<!DOCTYPE html>
<html lang="es">

<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <!-- Meta, title, CSS, favicons, etc. -->
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <title>Volanteo - Encuestas</title>

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
            	<div class="col-md-4 col-sm-6 col-xs-6">
                  <!-- <a id="btn_nuevo" class="btn btn-primary col-md-12 col-sm-12 col-xs-12">NUEVA ENCUESTA</button> -->
                  <a href="encuesta-proveedores/index.php" target="_blank"  class="btn btn-primary col-md-12 col-sm-12 col-xs-12">NUEVA ENCUESTA</a>
                </div>	
            </div>
          </div>

          <div class="clearfix"></div>

          <div class="row">
            <div class="col-md-12 col-sm-12 col-xs-12">
              <div class="x_panel">
                <div class="x_title">
                  <h2>Resultados</h2>
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
  

  <div class="modal fade" id="Modal_detalles" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title">Datos de preguntas</h4>
          </div>
          <div class="modal-body">
              <div class="row">
                  <div class="col-md-12">
                      <label for="">¿Estás dispuesto a trabajar con una plataforma integral de tecnologías de la información? (Aplicaciones y redes sociales) Con esta plataforma se tiene en tiempo real acceso a los servicios que nos estás prestando.</label><br/>
                  </div>
              </div>
              <div class="row">
                  <div class="col-md-3">
                      <input id="p1" type="text" class="form-control" name="" value=""><br/>
                  </div>
              </div>
              <div class="row">
                  <div class="col-md-12">
                      <label for="">¿Cuántos años tienen de experiencia en el giro de volanteo y/o perifoneo.</label><br/>
                  </div>
              </div>
              <div class="row">
                  <div class="col-md-3">
                      <input id="p2" type="text" class="form-control" name="" value=""><br/>
                  </div>
              </div>
              <div class="row">
                  <div class="col-md-12">
                      <label for="">¿Qué cobertura tienen?</label><br/>
                  </div>
              </div>
              <div class="row">
                  <div class="col-md-3">
                      <input id="p3" type="text" class="form-control" name="" value=""><br/>
                  </div>
              </div>
              <div class="row">
                  <div class="col-md-12">
                      <label for="">¿Emiten facturas por prestación de servicios?</label><br/>
                  </div>
              </div>
              <div class="row">
                  <div class="col-md-3">
                      <input id="p4" type="text" class="form-control" name="" value=""><br/>
                  </div>
              </div>
              <div class="row">
                  <div class="col-md-12">
                      <label for="">¿Cuenta con oficinas?</label><br/>
                  </div>
              </div>
              <div class="row">
                  <div class="col-md-3">
                      <input id="p5" type="text" class="form-control" name="" value=""><br/>
                  </div>
              </div>
              <div class="row">
                  <div class="col-md-12">
                      <label for="">¿Cuentas con personal a tu cargo?</label><br/>
                  </div>
              </div>
              <div class="row">
                  <div class="col-md-3">
                      <input id="p6" type="text" class="form-control" name="" value=""><br/>
                  </div>
              </div>
              <div class="row">
                  <div class="col-md-12">
                      <label for="">¿Cuantas personas trabajan para ti?</label><br/>
                  </div>
              </div>
              <div class="row">
                  <div class="col-md-3">
                      <input id="p7" type="text" class="form-control" name="" value=""><br/>
                  </div>
              </div>
              <div class="row">
                  <div class="col-md-12">
                      <label for="">¿Cuenta con medio de trasporte propio?</label><br/>
                  </div>
              </div>
              <div class="row">
                  <div class="col-md-3">
                      <input id="p8" type="text" class="form-control" name="" value=""><br/>
                  </div>
              </div>
              <div class="row">
                  <div class="col-md-12">
                      <label for="">¿Tienes flexibilidad ante nuevos requerimientos de trabajo?</label><br/>
                  </div>
              </div>
              <div class="row">
                  <div class="col-md-3">
                      <input id="p9" type="text" class="form-control" name="" value=""><br/>
                  </div>
              </div>
              <div class="row">
                  <div class="col-md-12">
                      <label for="">¿Qué valor le da usted, al cumplimiento en tiempo y forma de plazos acordados para la realización de tu sevicio?</label><br/>
                  </div>
              </div>
              <div class="row">
                  <div class="col-md-3">
                      <input id="p10" type="text" class="form-control" name="" value=""><br/>
                  </div>
              </div>
              <div class="row">
                  <div class="col-md-12">
                      <label for="">¿Costo de los servicios?</label><br/>
                  </div>
              </div>
              <div class="row">
                  <div class="col-md-3">
                      <input id="p11" type="text" class="form-control" name="" value=""><br/>
                  </div>
              </div>
              <div class="row">
                  <div class="col-md-12">
                      <label for="">¿Está usted de acuerdo en que la forma de pago es de la siguiente manera?</label><br/>
                  </div>
              </div>
              <div class="row">
                  <div class="col-md-3">
                      <input id="p12" type="text" class="form-control" name="" value=""><br/>
                  </div>
              </div>
              <div class="row">
                  <div class="col-md-12">
                      <label for="">¿Plazo?</label><br/>
                  </div>
              </div>
              <div class="row">
                  <div class="col-md-3">
                      <input id="p13" type="text" class="form-control" name="" value=""><br/>
                  </div>
              </div>
              <div class="row">
                  <div class="col-md-12">
                  </div>
              </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
          </div>
        </div><!-- /.modal-content -->
      </div><!-- /.modal-dialog -->
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
  <script src="plugins/CustomAlerts/js/jquery-confirm.js"></script>
  <script src="js/jQueryTables.js"></script>
  <script src="js/encuestas.js"></script>
  <script src="js/editar-trabajos.js"></script>
  <script src="js/spinner.js"></script>

</body>

</html>

<!DOCTYPE html>
<html lang="es">

<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <!-- Meta, title, CSS, favicons, etc. -->
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <title>Volanteo - Config. Trabajo</title>
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

  <style type="text/css">
    .cuerpo{
      margin-left: -500px;
    }
  </style>

</head>


<body>

  <div class="container body">

      <!-- page content -->
      <div class="right_col" role="main">

        <div class="col-md-12 col-sm-12 col-xs-12">
          <div class="page-title">
            <div class="form-group col-md-12 col-sm-12 col-xs-12 header_tablas">
            	<!-- <div class="col-md-12" > -->
            		<div class="col-md-11 col-sm-11 col-xs-11">
            			<h2 id="encabezado"></h2>
            		</div>
                <div id="todosPoligonosDiv" class="col-md-1 col-sm-1 col-xs-1" align="rigth" hidden>
                  <button id="todosPoligonos" title="Mostrar todos los poligonos" class="btn btn-success"><span class="glyphicon glyphicon-globe"></span></button>
                </div>
            	<!-- </div> -->	
            </div>
          </div>

          <div class="clearfix"></div>

          <div class="row">
            <div class="col-md-12 col-sm-12 col-xs-12">
              <div class="x_panel">
                <div class="x_title">
                  <ul class="nav navbar-right panel_toolbox"></ul>
                  <div id="menu" class="clearfix">
                    
                  </div>
                </div>

                <div id="contenido">
                  <div class="row"><div style="height: 400px" id="googleMap" class="col-md-12 col-sm-12 col-xs-12" hidden></div></div>
                </div>

                

              </div>
            </div>
          </div>

          <!-- footer content -->
          <div class="col-md-12 col-sm-12 col-xs-12">
            <?php include("footer.html"); ?>
          </div>
          <!-- /footer content -->
        </div>

      </div>
      <!-- /page content -->
    

  </div>


  <!-- MODAL -->
  <div class="modal fade bs-example-modal-lg" id="modalLvl3" data-keyboard="false" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">

        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
          </button>
          <h4 class="modal-title">Detalles de la zona</h4>
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
  <script src="js/configTrabajo.js"></script>
  <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCTcmQxEiidmYhnAOomATJZqq6yCVykbEE&libraries=geometry,drawing&callback=iniciarMapa"></script>
  <script src="js/main.js"></script>
  <script src="plugins/CustomAlerts/js/jquery-confirm.js"></script>
  <script src="js/spinner.js"></script>

</body>

</html>

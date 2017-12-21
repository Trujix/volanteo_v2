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
    
    .hide-bullets {
      list-style:none;
      margin-left: -40px;
      margin-top:20px;
    }

    .img-min{
      margin: 5px !important;;
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
            		
            </div>
          </div>

          <div class="clearfix"></div>
          

          <div class="row">
            <div class="col-md-12 col-sm-12 col-xs-12">
              <div class="x_panel">
                <div class="x_title">
                  <h2><?php echo $titulo; ?></h2>
                  <ul class="nav navbar-right panel_toolbox">
                  </ul>
                  <div class="clearfix"></div>
                </div>

                <?php echo $html; ?>
                  
                <div id="blueimp-gallery" class="blueimp-gallery">
                    <!-- The container for the modal slides -->
                    <div class="slides"></div>
                    <!-- Controls for the borderless lightbox -->
                    <h3 class="title"></h3>
                    <a class="prev">‹</a>
                    <a class="next">›</a>
                    <a class="close">×</a>
                    <a class="play-pause"></a>
                    <ol class="indicator"></ol>
                    <!-- The modal dialog, which will be used to wrap the lightbox content -->
                    <div class="modal fade">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <button type="button" class="close" aria-hidden="true">×</button>
                                    <h4 class="modal-title"></h4>
                                </div>
                                <div class="modal-body next"></div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-default pull-left prev">
                                        <i class="glyphicon glyphicon-chevron-left"></i>
                                        Previous
                                    </button>
                                    <button type="button" class="btn btn-primary next">
                                        Next
                                        <i class="glyphicon glyphicon-chevron-right"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
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
  
  <!-- MODAL LVL2-->
  <div class="modal fade bs-example-modal-lg" id="modal_lvl2" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">

        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
          </button>
          <h4 class="modal-title" id="title_lvl2">Detalles del servicio </h4>
        </div>
        <div class="modal-body" id="" style="overflow: auto;">
        <!--iv id="tableContainer2" class="x_content table-responsive">

				<!-- start project list -->
				<!--<table class="table table-striped projects">
					<thead id="thead2">
					</thead>
					<tbody id="tbody2">
					</tbody>
				</table>-->

        
				<!-- end project list -->

			   <!--</div>-->
          <div id="accordionDiv"></div>
        </div>
        <div class="modal-footer">
          <button type="button" onclick="showlvl3_todos()" class="btn btn-primary btnModalT col-md-5 a-la-izq">Ver detalle de todos</button>
          <button type="button" id="" class="btn btn-warning col-md-5 a-la-der" data-dismiss="modal">Cerrar</button>
        </div>

      </div>
    </div>
  </div>

  <!-- MODAL LVL3-->
  <div class="modal fade bs-example-modal-lg" id="modal_lvl3" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">

        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
          </button>
          <h4 class="modal-title" id=""></h4>
        </div>
        <div class="modal-body" id="" style="overflow: auto;">
          <div id="map" style="width:860px; height:500px;"></div>
        </div>
        <div class="modal-footer">
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
  <!-- <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAO41NdNRl5wKs_Er7xw-CagvsuZkZXtKY"></script> -->
  <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBVPhJw-ezET4Hym8X9EMy5QpyZ0WQkMoo&libraries=geometry"></script>


  <script src="js/main.js?1.0.0"></script>
  <script src="plugins/CustomAlerts/js/jquery-confirm.js?1.0.0"></script>
  <script src="js/jQueryTablesCustom.js?1.0.0"></script>
  <script src="js/editar-trabajos.js"></script>
  <script src="js/seguimiento.js?1.0.0"></script>
  <script src="js/mapaSeguimiento.js?1.0.0"></script>
  <script src="js/spinner.js?1.0.0"></script>
  <script src="http://blueimp.github.io/Gallery/js/jquery.blueimp-gallery.min.js"></script>

</body>

</html>

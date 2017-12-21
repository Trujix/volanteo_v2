<?php include('includes/header_clientes.php');?>
<!DOCTYPE html>
<html lang="es">

<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <!-- Meta, title, CSS, favicons, etc. -->
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <title>Volanteo - Poligonos</title>
  <link rel="icon" href="images/logo.ico?v=2" type="image/x-icon" />

  <script src="js/jquery.min.js"></script>
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
  <!-- Toggle personalizado y selector de Color -->
  <link href="plugins/toogle/css/bootstrap-toggle.min.css" rel="stylesheet">
  <script src="plugins/toogle/js/bootstrap-toggle.min.js"></script>
  <link rel="stylesheet" media="screen" type="text/css" href="plugins/color/css/colorpicker.css" />
  <script type="text/javascript" src="plugins/color/js/colorpicker.js"></script>

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
    .input{
      opacity: 0;
      position: absolute;
      z-index: -1; 
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
            	
              <div id="menuOpciones">
              <div class="col-md-3 col-sm-6 col-xs-12">
                  <button id="ImportarPoligonos" class="btn btn-default col-md-12 col-sm-12 col-xs-12">
                    <span class=" fa fa-cloud-upload"></span> Importar
                  </button>
                </div>
            		<div class="col-md-3 col-sm-6 col-xs-12">
                  <button id="borrarPoligonos" class="btn btn-info col-md-12 col-sm-12 col-xs-12">
                    <span class="fa fa-search"></span> Ver Poligonos
                  </button>
            		</div>

                <div class="col-md-3 col-sm-6 col-xs-12">
                  <button id="crearPoligono" class="btn btn-success col-md-12 col-sm-12 col-xs-12">
                    <span class="fa fa-pencil"></span> Crear Poligonos
                  </button>
                </div>

                <div class="col-md-3 col-sm-6 col-xs-12">
                  <button id="editarPoligonos" class="btn btn-primary col-md-12 col-sm-12 col-xs-12">
                    <span class="fa fa-pencil-square-o"></span> Editar Poligonos
                  </button>
                </div>

              </div>

              <div id="menuEstructura" hidden>

                <div id="menuCrearPoligono" hidden>

                  <div class="col-md-3 col-sm-12 col-xs-12">
                    <input id="crearTipoPoligono" type="checkbox" checked data-toggle="toggle" data-onstyle="primary" data-offstyle="info" data-width="100%" data-on="Poligono de Seccion" data-off="Poligono de Zona">
                  </div>

                  <div class="col-md-8 col-sm-12 col-xs-12">

                    <div id="crearPoligonoZona" hidden>

                      <div class="col-md-4 col-sm-6 col-xs-12">
                        <select class="form-control" id="zc_selec_estados"><option value="-1">- Seleccione Estado -</option></select><p></p>
                      </div>
                      <div class="col-md-4 col-sm-6 col-xs-12">
                        <select class="form-control" id="zc_selec_municipio"><option value="-1">- Seleccione Municipios -</option></select><p></p> 
                      </div>
                      <div class="col-md-4 col-sm-6 col-xs-12">
                        <select class="form-control" id="zc_selec_localidad"><option value="-1">- Seleccione Localidad -</option></select><p></p>   
                      </div>

                    </div>

                    <div id="crearPoligonoSeccion" hidden>

                      <div class="col-md-4 col-sm-6 col-xs-12">
                        <select class="form-control" id="sc_selec_estados"><option value="-1">- Seleccione Estado -</option></select><p></p>    
                      </div>
                      <div class="col-md-4 col-sm-6 col-xs-12">
                        <select class="form-control" id="sc_selec_municipio"><option value="-1">- Seleccione Municipios -</option></select><p></p>  
                      </div>
                      <div class="col-md-4 col-sm-6 col-xs-12">
                        <select class="form-control" id="sc_selec_zona"><option value="-1">- Seleccione Zona -</option></select><p></p>   
                      </div>

                    </div>

                  </div>

                  <div class="col-md-1 col-sm-12 col-xs-12">
                    <button name="backOpciones" class="btn btn-warning"><span class="fa fa-mail-reply"></span></button>
                  </div>

                </div>

                <div id="menuEditarPoligono" hidden>

                  <div class="col-md-11 col-sm-12 col-xs-12">

                      <div class="col-md-3 col-sm-6 col-xs-12">
                        <select class="form-control" id="ep_selec_estados"><option value="-1">- Seleccione Estado -</option></select><p></p>
                      </div>
                      <div class="col-md-3 col-sm-6 col-xs-12">
                        <select class="form-control" id="ep_selec_municipio"><option value="-1">- Seleccione Municipios -</option></select><p></p> 
                      </div>
                      <div class="col-md-3 col-sm-6 col-xs-12">
                        <select class="form-control" id="ep_selec_zona"><option value="-1">- Seleccione Zona -</option></select><p></p>   
                      </div>

                      <div class="col-md-3 col-sm-6 col-xs-12">
                        <input id="edAcoplar" data-size="mini" type="checkbox" checked data-toggle="toggle" data-onstyle="success" data-offstyle="default" data-width="100%" data-on="Acoplar Zonas" data-off="Sin Acoplar" /><p></p>
                        <input id="edSeccion" data-size="mini" type="checkbox" checked data-toggle="toggle" data-onstyle="primary" data-offstyle="default" data-width="46%" data-on="Con Seccion" data-off="Sin Seccion" />&nbsp;&nbsp;
                         <input id="edSeleccion" data-size="mini" type="checkbox" checked data-toggle="toggle" data-onstyle="info" data-offstyle="default" data-width="46%" data-on="Selec Multi" data-off="Uno por uno" />
                      </div>

                  </div>

                  <div class="col-md-1 col-sm-12 col-xs-12">
                    <button name="backOpciones" class="btn btn-warning"><span class="fa fa-mail-reply"></span></button>
                  </div>

                </div>

                <div id="menuBorrarPoligono" hidden>

                  <div class="col-md-11 col-sm-12 col-xs-12">

                      <div class="col-md-2 col-sm-6 col-xs-12">
                        <select class="form-control" id="bp_selec_estados"><option value="-1">- Seleccione Estado -</option></select><p></p>
                      </div>
                      <div class="col-md-2 col-sm-6 col-xs-12">
                        <select class="form-control" id="bp_selec_municipio"><option value="-1">- Seleccione Municipios -</option></select><p></p>
                      </div>
                      <div class="col-md-3 col-sm-6 col-xs-12">
                        <select class="form-control" id="bp_selec_localidad"><option value="-1">- Seleccione Localidad -</option></select><p></p>
                      </div>
                      <div class="col-md-2 col-sm-6 col-xs-12">
                        <select class="form-control" id="bp_selec_zona"><option value="-1">- Seleccione Zona -</option></select><p></p>   
                      </div>

                      <div class="col-md-3 col-sm-6 col-xs-12">
                        <input id="borrAcoplar" data-size="mini" type="checkbox" checked data-toggle="toggle" data-onstyle="success" data-offstyle="default" data-width="100%" data-on="Acoplar Zonas" data-off="Sin Acoplar" />
                        <div><input id="borrSeccion" data-size="mini" type="checkbox" checked data-toggle="toggle" data-onstyle="primary" data-offstyle="default" data-width="45%" data-on="Con Seccion" data-off="Sin Seccion" />&nbsp;
                        <span style="width: 10%"></span>&nbsp;
                         <input id="borrSeleccion" data-size="mini" type="checkbox" checked data-toggle="toggle" data-onstyle="info" data-offstyle="default" data-width="45%" data-on="Selec Multi" data-off="Uno por uno" /></div>
                      </div>

                  </div>

                  <div class="col-md-1 col-sm-12 col-xs-12">
                    <button name="backOpciones" class="btn btn-warning"><span class="fa fa-mail-reply"></span></button>
                  </div>

                </div>

              </div>


            </div>
          </div>

          <div class="clearfix"></div>

              <div class="row">
                <div class="col-md-12 col-sm-12 col-xs-12">
                  <div class="x_panel">
                    <div class="x_title">
                      <h2 id="tituloOpcion">Menu Poligonos</h2>
                      <ul class="nav navbar-right panel_toolbox">
                      </ul>
                      <div class="clearfix"></div>
                    </div>

                    <div id="googleMap" class="x_content" style="height: 400px"></div>

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
  <div class="modal fade bs-example-modal-lg" id="modalMapa" data-keyboard="false" tabindex="-1" role="dialog" aria-hidden="true" data-backdrop="static">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">

        <div class="modal-header">
          <h4 class="modal-title" id="tituloModal">Personalizar Poligono</h4>
        </div>
        <div class="modal-body" id="modal_bodyLvl2" style="overflow: auto;">
          <div id="modalContenido" class="x_content">

            <div id="selecsImportar" class="form-group">
              <h5><span class="fa fa-map-marker"></span> Seleccione el lugar de la nueva zona</h5>
              <div class="col-md-4 col-sm-4 col-xs-12">
                <select id="ip_selec_estados" class="form-control"></select><p></p>
              </div>
              <div class="col-md-4 col-sm-4 col-xs-12">
                <select id="ip_selec_municipio" class="form-control"></select><p></p>
              </div>
              <div class="col-md-4 col-sm-4 col-xs-12">
                <select id="ip_selec_localidad" class="form-control"></select><p></p>
              </div>
            </div>

            <!-- start project list -->
            <div class="form-group">
              <div class="col-md-6 col-sm-6 col-xs-6">

                
                <div class="col-md-12 col-sm-12 col-xs-12">
                  <h5><span class="fa fa-bookmark"></span> Datos del Poligono</h5>
                </div>

                <div class="col-md-12 col-sm-12 col-xs-12">
                  <!-- <h5><span class="fa fa-bookmark"></span> Nombre del Poligono:</h5> -->
                  <input id="poligonoNombre" type="text" class="form-control" placeholder="Escriba el nombre del poligono..."><p></p>
                </div>
                <div class="col-md-12 col-sm-12 col-xs-12">
                  <!-- <h5><span class="fa fa-info"></span> Observaciones:</h5> -->
                  <input id="poligonoObserv" type="text" class="form-control" placeholder="Observaciones sobre el poligono..."><p></p>
                </div>

                <div>
                  <!-- <h5><span class="fa fa-info"></span> Observaciones:</h5> -->
                  <div class="col-md-6 col-sm-6 col-xs-6">
                    <input id="numVolantes" type="text" class="form-control" placeholder="Numero de volantes..."><p></p>
                  </div>
                  <div class="col-md-6 col-sm-6 col-xs-6">
                    <input id="hrsPerifoneo" type="text" class="form-control" placeholder="Perifoneo (en mins)..."><p></p>
                  </div>
                </div>

                <div class="col-md-12 col-sm-12 col-xs-12">
                  <br><p></p>
                  <div class="col-md-4 col-sm-4 col-xs-4">
                    <button id="guardarPoligono" class="btn btn-success"><span class="fa fa-upload"></span> Guardar</button>
                  </div>
                  <div class="col-md-4 col-sm-4 col-xs-4">
                    <button id="vpPoligono" class="btn btn-default"><span class="fa fa-search-plus"></span> Vista previa</button>
                  </div>
                  <div class="col-md-4 col-sm-4 col-xs-4">
                    <button id="cancelarPoligono" class="btn btn-warning"><span class="fa fa-remove"></span> Cancelar</button>
                  </div>
                </div>

              </div>
              <div class="col-md-6 col-sm-6 col-xs-6">
                <h5><span class="fa fa-paint-brush"></span> Eliga un color:</h5>
                <div id="colorSelec"></div>
              </div>
            </div><br><br>

            <!-- end project list -->

          </div>
        </div>

      </div>
    </div>
  </div>

  <!-- MODAL VISTA PREVIA -->
  <div data-backdrop="false" id="modalVP" class="modal fade bs-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel">
    <div class="modal-dialog modal-sm" role="document">
      <div class="modal-content">
        <div class="row">
          <div align="center" class="col-md-12 col-sm-12 col-xs-12">
            <p></p><button id="cerrarVP" class="btn btn-primary">Cerrar Vista previa</button><p></p>
          </div>
        </div>
      </div>
    </div>
  </div>

   <!-- MODAL SUBIR ARCHIVO -->
  <div data-backdrop="true" id="modalKML" class="modal fade bs-example" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        
        <div class="modal-header">
          <h4 class="modal-title" id="tituloModal">Importar Poligono</h4>
        </div>
        <div class="modal-body" id="modal_bodyLvl2" style="overflow: auto;">
          <div id="modalContenido" class="x_content">

             <!-- style="padding-top: 50px" -->
            <div class="form-group">
              <div class="col-md-5 col-sm-6 col-xs-12">
                <div>
                  <label for="archKML" class="btn btn-info" role="button"><span class="fa fa-external-link"></span>&nbsp;Seleccionar archivo KML</label>
                  <input id="archKML" class="input" type="file" accept=".kml">
                </div>
              </div>
              <div class="col-md-7 col-sm-6 col-xs-12">
                <p></p>
                <span style="font-size: 15px" class="label label-default" id="nomArchKML">No ha elegido su KML</span><p></p>
              </div>
            </div>

            <div class="form-group" style="padding-top: 20px">
              <hr>
              <div class="col-md-8 col-sm-8 col-xs-12">
                <button id="guardarKML" class="btn btn-lg btn-primary"><span class="fa fa-globe"></span> Importar KML</button>
              </div>
              <div class="col-md-2 col-sm-2 col-xs-12">
                <button id="cerrarKMLModal" class="btn btn-lg btn-danger">Cancelar</button>
              </div>
            </div>

            <!-- end project list -->

          </div>
        </div>

      </div>
    </div>
  </div>



  <!-- MODAL IMPORTAR POLIG COMO ZONA -->
  <div data-backdrop="true" id="modalIPZ" class="modal fade bs-example" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        
        <div class="modal-header">
          <h4 class="modal-title" id="nombrePoligImp"></h4>
        </div>
        <div class="modal-body" id="modal_bodyLvl2" style="overflow: auto;">
          <div id="modalContenido" class="x_content">

             <!-- style="padding-top: 50px" -->
            <div class="form-group">
              <h5><span class="fa fa-map-marker"></span> Seleccione el lugar de la nueva zona</h5>
              <div class="col-md-4 col-sm-4 col-xs-12">
                <select id="iz_selec_estados" class="form-control"></select><p></p>
              </div>
              <div class="col-md-4 col-sm-4 col-xs-12">
                <select id="iz_selec_municipio" class="form-control"></select><p></p>
              </div>
              <div class="col-md-4 col-sm-4 col-xs-12">
                <select id="iz_selec_localidad" class="form-control"></select><p></p>
              </div>
            </div>

            <div class="form-group" style="padding-top: 20px">
              <hr>
              <div class="col-md-8 col-sm-8 col-xs-12">
                <button id="guardarIPZ" class="btn btn-success"><span class="fa fa-cloud-upload"></span> Guardar como Zona</button>
              </div>
              <div class="col-md-2 col-sm-2 col-xs-12">
                <button id="cancelarIPZ" class="btn btn-danger"><span class="fa fa-close"></span> Cancelar</button>
              </div>
            </div>

            <!-- end project list -->

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

  <!-- CARGA DE ARCHIVOS ESPECIALES Y API GOOGLE MAPS -->
  <script type="text/javascript" src="js/geodata.js"></script>
  <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCTcmQxEiidmYhnAOomATJZqq6yCVykbEE&libraries=geometry,drawing&callback=iniciarMapa"></script>
  <!-- Mis scripts -->
  <script src="js/editar-trabajos.js"></script>
  <script src="js/main.js"></script>
  <script src="plugins/CustomAlerts/js/jquery-confirm.js"></script>
  <script src="js/spinner.js"></script>

</body>

</html>

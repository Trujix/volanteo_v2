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
  <link rel="stylesheet" href="css/checkMaterialize.css">
  <link rel="stylesheet" href="./plugins/chosen/css/chosen.css">


  <script src="js/jquery.min.js"></script>

  <style>

    @media (min-width: 992px){
      .header_tablas{
        margin-left: -10px; padding: 0px;
      }
      .margin_search{
        margin-right: -14px;
      }

      /*.txt_otro{
        display: none;
        margin-top: 45px;
      }*/
    }


    @media (max-width: 767px){
      /*.txt_otro{
        display: none;
        margin-top: 20px;
      }*/
    }

    .txt_otro{
      /*display: none;*/
    }

    .radio-mio2{
      margin-top: 23px !important;
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

    .btn-form{
      margin-top: 23px;
    }

    .labelVia{
      margin-bottom: 10px;
    }

    .radio-mio{
      padding-left: 0px;
      /*padding-right: 20px;*/
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

        <?php //include("grid-trabajos.php"); ?>

        <?php include("form-trabajos.php"); ?>

        <?php include("footer.html"); ?>

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

  <!-- <input type="text" id="idcliente" hidden name="idcliente">
  <input type="text" id="trabajo" hidden name="trabajo">
  <input type="text" id="action" hidden name="action"> -->

  <!-- MODAL TRABAJOS-->
  <div class="modal fade bs-example-modal-lg" id="modalTrabajos" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-hidden="true">
  </div>


  <div id="custom_notifications" class="custom-notifications dsp_none">
    <ul class="list-unstyled notifications clearfix" data-tabbed_notifications="notif-group">
    </ul>
    <div class="clearfix"></div>
    <div id="notif-group" class="tabbed_notifications"></div>
  </div>

  <script src="js/bootstrap.min.js"></script>

  <!-- bootstrap progress js -->
  <!-- <script src="js/progressbar/bootstrap-progressbar.min.js"></script> -->
  <script src="js/nicescroll/jquery.nicescroll.min.js"></script>
  <!-- icheck -->
  <!-- <script src="js/icheck/icheck.min.js"></script> -->

  <script src="js/custom.js"></script>

  <!-- pace -->
  <!-- <script src="js/pace/pace.min.js"></script> -->

  <!-- PNotify -->
  <script src="plugins/pnotify/pnotify.custom.min.js"></script>

  <!-- Mis scripts -->
  <script src="js/main.js"></script>
  <script src="plugins/CustomAlerts/js/jquery-confirm.js"></script>
  <script src="js/jQueryTablesCustom.js"></script>
  <script src="js/trabajos.js"></script>
  <script src="js/editar-trabajos.js"></script>
  <script src="js/spinner.js"></script>
  <script src="plugins/chosen/js/chosen.jquery.js"></script>

  <!-- form wizard -->
  <script type="text/javascript" src="js/wizard/jquery.smartWizard.js"></script>

</body>

</html>

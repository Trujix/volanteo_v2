<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <title>Bootstrap 101 Template</title>

    <!-- Bootstrap -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>
  <body>
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <br/>
                <table id="tabla_ver_rutas" class="table table-bordered table-striped table-hover dataTable" role="grid">
                <thead>
                <tr role="row">
                    <th>Empresa</th>
                    <th>Puntos</th>
                    <th>Informacion</th>
                </tr>
                </thead>
                <tbody id="tbody">

                </tbody>
              </table>
            </div>
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

    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
    <script src="js/cargardatos.js"></script>
  </body>
</html>

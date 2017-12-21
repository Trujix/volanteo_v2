
<!DOCTYPE html>
<html lang="en">

<head>
    <!-- Required meta tags always come first -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta http--equiv="x-ua-compatible" content="ie=edge">
    <title>Cuestionario</title>

    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css">

    <link rel="stylesheet" href="MDB/css/bootstrap.css">
	<link rel="stylesheet" href="MDB/css/mdb.css">
	<link rel="stylesheet" href="./MDB/css/style.css">

</head>

<body>

    <!-- Purple Header -->
    <div class="edge-header deep-purple"></div>

    <!-- Main Container -->
    <div class="container free-bird">
        <div class="row">
            <div class="col-xs-10 col-md-8 col-lg-7 mx-auto float-xs-none white z-depth-1 custom-padding">
                <h2 class="h2-responsive"><strong>Datos de la empresa</strong></h2>

                <!-- <p>Encuesta de contratación</p> -->
                <hr class="myhr">

                <div class="card-block">

                    <form action="encuesta2.php" method="post">

                        <h5 class="h5-responsive">Nombre o razón social</h5>

                        <div class="md-form">
                            <input type="text" required id="name" name="name" class="form-control">
                            <label for="name" class="">Ej. Grupo Marines S.A de C.V.</label>
                        </div>

                        <h5 class="h5-responsive">Correo Electronico</h5>
                        <div class="md-form">
                            <i class="fa fa-envelope prefix"></i>
                            <input type="email" required id="email" name="email" class="form-control">
                            <label for="email">Ej. micorreo@hotmail.com</label>
                        </div>

                        <h5 class="h5-responsive">Facebook</h5>
                        <div class="md-form">
                            <i class="fa fa-facebook prefix"></i>
                            <input type="text" id="facebook" name="facebook" class="form-control">
                            <label for="facebook">Ej. http://www.facebook.com/miperfil</label>
                        </div>

                        <h5 class="h5-responsive">Telefono</h5>
                        <div class="md-form">
                            <i class="fa fa-phone prefix"></i>
                            <input type="tel" required id="telefono" name="telefono" class="form-control">
                            <label for="telefono">Ej. (312) 312 91 48</label>
                        </div>

                        <h5 class="h5-responsive">Dómicilio</h5>
                        <div class="md-form">
                            <i class="fa fa-address-card prefix"></i>
                            <input type="text" required id="address" name="address" class="form-control">
                            <label for="address">Ej. Dr. Miguel Galindo 45, Centro, Colima, Colima</label>
                        </div>

                        <div class="div-save row">
							<input type="submit" value="Guardar" id="btn-submit" class="btn btn-success col-12">
				       	</div>
                    </form>

                </div>

            </div>
        </div>
    </div>
    <!-- /.Main Container -->

    <!-- SCRIPTS -->

    <!-- JQuery -->
    <script type="text/javascript" src="MDB/js/jquery-3.1.1.min.js"></script>

    <!-- Tooltips -->
    <script type="text/javascript" src="MDB/js/tether.min.js"></script>

    <!-- Bootstrap core JavaScript -->
    <script type="text/javascript" src="MDB/js/bootstrap.min.js"></script>

    <!-- MDB core JavaScript -->
    <script type="text/javascript" src="MDB/js/mdb.min.js"></script>
    <script src="js/index.js"></script>






</body>

</html>

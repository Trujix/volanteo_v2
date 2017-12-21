<?php require("includes/header_encuesta2.php"); ?>
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
                <h2 class="h2-responsive"><strong>Encuesta de empleo</strong></h2>

                <!-- <p>Encuesta de contratación</p> -->
                <hr class="myhr">

                <div class="card-block">



                    <form  class="row">

                        <?php
                            echo $form;
                            echo $hmtl;
                        ?>

                        <div class="div-save col-md-12">
                            <a id="btn_guardar_encuesta" type="input" class="btn btn-success col-12">Guardar</a>
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

    <script src="js/encuesta2.js"></script>
    <script src="js/pre.js"></script>




</body>

</html>

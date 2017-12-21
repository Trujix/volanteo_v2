<?php require("includes/header_encuesta.php"); ?>
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

                    <form action="inser_encuesta.php" class="row" method="post">
    
                        <input type='text' id='nombre_encuesta' maxlength='50' name='empresa' value='' hidden>
            <input type='text' id='correo' name='correo' value='' hidden>
            <input type='text' id='face_encuesta' name='facebook' value='' hidden>
            <input type='text' id='num_encuesta'  name='telefono' value='' hidden>
            <input type='text' id='dom_encuesta' name='domicilio' value='' hidden><div class='col-12 div-pregunta'><h5 class='card-text' for='1'>¿Estás dispuesto a trabajar con una plataforma integral de tecnologías de la información? (Aplicaciones y redes sociales) Con esta plataforma se tiene en tiempo real acceso a los servicios que nos estás prestando.</h5><div class='btn-group' data-toggle='buttons'><label class='rad0 btn btn-primary mi-radio'>
                     <input autocomplete='off' class='radios' type='radio' name='0' value='1' required>
                     Si
                     </label><label class='rad0 btn btn-primary mi-radio'>
                     <input autocomplete='off' class='radios' type='radio' name='0' value='2' required>
                     No
                     </label></div><hr></div><div class='preA'><div class='col-12 div-pregunta'><h5 class='card-text' for='2'>¿Cuántos años tienen de experiencia en el giro de volanteo y/o perifoneo.</h5><div class='btn-group' data-toggle='buttons'><label class='rad1 btn btn-primary mi-radio'>
                     <input autocomplete='off' class='radios' type='radio' name='1' value='3' required>
                     De 1 año a 3 años
                     </label><label class='rad1 btn btn-primary mi-radio'>
                     <input autocomplete='off' class='radios' type='radio' name='1' value='4' required>
                     De 4 años en adelante 
                     </label></div><hr></div><div class='col-12 div-pregunta'><h5 class='card-text' for='3'>¿Qué cobertura tienen?</h5><div class='btn-group' data-toggle='buttons'><label class='rad2 btn btn-primary mi-radio'>
                     <input autocomplete='off' class='radios' type='radio' name='2' value='5' required>
                     De 1 a 3 localidades
                     </label><label class='rad2 btn btn-primary mi-radio'>
                     <input autocomplete='off' class='radios' type='radio' name='2' value='6' required>
                     De 4 localidades en adelante
                     </label></div><hr></div><div class='col-12 div-pregunta'><h5 class='card-text' for='4'>¿Emiten facturas por prestación de servicios?</h5><div class='btn-group' data-toggle='buttons'><label class='rad3 btn btn-primary mi-radio'>
                     <input autocomplete='off' class='radios' type='radio' name='3' value='7' required>
                     Sí
                     </label><label class='rad3 btn btn-primary mi-radio'>
                     <input autocomplete='off' class='radios' type='radio' name='3' value='8' required>
                     No
                     </label></div><hr></div><div class='col-12 div-pregunta'><h5 class='card-text' for='5'>¿Cuenta con oficinas?</h5><div class='btn-group' data-toggle='buttons'><label class='rad4 btn btn-primary mi-radio'>
                     <input autocomplete='off' class='radios' type='radio' name='4' value='9' required>
                     Si
                     </label><label class='rad4 btn btn-primary mi-radio'>
                     <input autocomplete='off' class='radios' type='radio' name='4' value='10' required>
                     No
                     </label></div><hr></div><div class='col-12 div-pregunta'><h5 class='card-text' for='6'>¿Cuentas con personal a tu cargo?</h5><div class='btn-group' data-toggle='buttons'><label class='rad5 btn btn-primary mi-radio'>
                     <input autocomplete='off' class='radios' type='radio' name='5' value='11' required>
                     Si
                     </label><label class='rad5 btn btn-primary mi-radio'>
                     <input autocomplete='off' class='radios' type='radio' name='5' value='12' required>
                     No
                     </label></div><hr></div><div class='col-12 div-pregunta'><h5 class='card-text' for='7'>¿Cuantas personas trabajan para ti?</h5><div class='btn-group' data-toggle='buttons'><label class='rad6 btn btn-primary mi-radio'>
                     <input autocomplete='off' class='radios' type='radio' name='6' value='13' required>
                     De 1 a 5 personas
                     </label><label class='rad6 btn btn-primary mi-radio'>
                     <input autocomplete='off' class='radios' type='radio' name='6' value='14' required>
                     De 6 personas en adelante
                     </label></div><hr></div><div class='col-12 div-pregunta'><h5 class='card-text' for='8'>¿Cuenta con medio de trasporte propio?</h5><div class='btn-group' data-toggle='buttons'><label class='rad7 btn btn-primary mi-radio'>
                     <input autocomplete='off' class='radios' type='radio' name='7' value='15' required>
                     Con 1 vehículo
                     </label><label class='rad7 btn btn-primary mi-radio'>
                     <input autocomplete='off' class='radios' type='radio' name='7' value='16' required>
                     2 o más vehículos
                     </label></div><hr></div><div class='col-12 div-pregunta'><h5 class='card-text' for='9'>¿Tienes flexibilidad ante nuevos requerimientos de trabajo?</h5><div class='btn-group' data-toggle='buttons'><label class='rad8 btn btn-primary mi-radio'>
                     <input autocomplete='off' class='radios' type='radio' name='8' value='17' required>
                     Si (Situaciones: Reducción de tiempo de trabajo; Cambio de fechas y horarios.)
                     </label><label class='rad8 btn btn-primary mi-radio'>
                     <input autocomplete='off' class='radios' type='radio' name='8' value='18' required>
                     No
                     </label></div><hr></div><div class='col-12 div-pregunta'><h5 class='card-text' for='10'>¿Qué valor le da usted, al cumplimiento en tiempo y forma de plazos acordados para la realización de tu sevicio?</h5><div class='btn-group' data-toggle='buttons'><label class='rad9 btn btn-primary mi-radio'>
                     <input autocomplete='off' class='radios' type='radio' name='9' value='19' required>
                     Es la base principal de todo negocio
                     </label><label class='rad9 btn btn-primary mi-radio'>
                     <input autocomplete='off' class='radios' type='radio' name='9' value='20' required>
                     Sí es importante
                     </label></div><hr></div><div class='col-12 div-pregunta'><h5 class='card-text' for='11'>¿Costo de los servicios?</h5><div class='btn-group' data-toggle='buttons'><label class='rad10 btn btn-primary mi-radio'>
                     <input autocomplete='off' class='radios' type='radio' name='10' value='21' required>
                     PERIFONEO - Si el costo de la hora se ubica entre los $90 y $120
                     </label><label class='rad10 btn btn-primary mi-radio'>
                     <input autocomplete='off' class='radios' type='radio' name='10' value='22' required>
                     PERIFONEO - Si el costo de la hora se ubica entre los $121 en adelante
                     </label><label class='rad10 btn btn-primary mi-radio'>
                     <input autocomplete='off' class='radios' type='radio' name='10' value='23' required>
                     VOLANTEO -  Si el costo del millar de volante se ubica entre $200 y $220
                     </label><label class='rad10 btn btn-primary mi-radio'>
                     <input autocomplete='off' class='radios' type='radio' name='10' value='24' required>
                     VOLANTEO -  Si el costo del millar de volante se ubica entre $221 en adelante
                     </label></div><hr></div><div class='col-12 div-pregunta'><h5 class='card-text' for='12'>¿Está usted de acuerdo en que la forma de pago es de la siguiente manera?</h5><div class='btn-group' data-toggle='buttons'><label class='rad11 btn btn-primary mi-radio'>
                     <input autocomplete='off' class='radios' type='radio' name='11' value='25' required>
                     Si
                     </label><label class='rad11 btn btn-primary mi-radio'>
                     <input autocomplete='off' class='radios' type='radio' name='11' value='26' required>
                     Se puede negociar
                     </label></div><hr></div><div class='col-12 div-pregunta'><h5 class='card-text' for='13'>¿Plazo?</h5><div class='btn-group' data-toggle='buttons'><label class='rad12 btn btn-primary mi-radio'>
                     <input autocomplete='off' class='radios' type='radio' name='12' value='27' required>
                     15 días 
                     </label><label class='rad12 btn btn-primary mi-radio'>
                     <input autocomplete='off' class='radios' type='radio' name='12' value='28' required>
                     7 días
                     </label></div><hr></div></div>
                        <div class="col-12" style="padding: 10px">
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






</body>

</html>
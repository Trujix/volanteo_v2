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
    
                        <?php 
                            echo $form;
                            echo $hmtl; 
                        ?>
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


    <script>
        $('#radioBtn a').on('click', function(){
            var sel = $(this).data('value');
            var tog = $(this).data('toggle');
            $('#'+tog).prop('value', sel);
            
            $('a[data-toggle="'+tog+'"]').not('[data-value="'+sel+'"]').removeClass('active').addClass('notActive').attr('data-check','false');
            $('a[data-toggle="'+tog+'"][data-value="'+sel+'"]').removeClass('notActive').addClass('active').attr('data-check','true');
        })

        $(document).on('click', '#btn', function(e){
            e.preventDefault();
            
            $('#radioBtn .active').each(function(index, el) {
                console.log('VALUE: ',$(el).data('value'), 'CHECK', $(el).data('check'));
            });

        });
    </script>




</body>

</html>
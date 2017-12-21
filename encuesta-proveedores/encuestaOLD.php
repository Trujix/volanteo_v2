<?php require("includes/header_encuesta.php"); ?>
<!DOCTYPE html>
<html lang="es">
<head>

	<meta charset="UTF-8">

	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Cuestionario</title>

	<link rel="stylesheet" href="MDB/css/bootstrap.min.css">
	<link rel="stylesheet" href="MDB/css/mdb.min.css">
	<link rel="stylesheet" href="./MDB/css/style.css">
</head>
<body>

	<div class="card card-primary text-center z-depth-2 header">
        <div class="card-block">
        </div>
    </div>

	<div class="container mi-container">
		<div class="jumbotron mi-card">
			<h1 class="h1-responsive">Encuesta de empleo</h1>
			<hr class="my-2" style="margin-bottom: 50px !important;">


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
	
	<script src="MDB/js/jquery-2.2.3.min.js"></script>
	<script src="MDB/js/mdb.min.js" ></script>
	<script src="MDB/js/tether.min.js" ></script>
	<script src="MDB/js/bootstrap.min.js" ></script>
	<script src="js/encuesta.js"></script>
	
</body>
</html>

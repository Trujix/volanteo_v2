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

	<style>
		.mi-label{
			padding-left: 15px;
		}

	</style>
</head>
<body>

	<div class="card card-primary text-center z-depth-2 header">
        <div class="card-block">
        </div>
    </div>

	<div class="container mi-container">

		<div class="jumbotron mi-card">
		    <h1 class="h1-responsive">Datos de la empresa</h1>

		    <hr class="my-2" style="margin-bottom: 50px !important;">
			
			<form action="encuesta.php" method="post">
			    <div class="md-form row">

		            <div class="col-6">
			            <input type="text" id="name" name="name" class="form-control" required>
			            <label class="mi-label" for="name">Nombre o razón social</label>
		            </div>

		            <div class="col-6">
			            <input type="email" id="email" name="email" class="form-control" required>
			            <label class="mi-label" for="email">Correo electronico</label>
		            </div>

		        </div>

		        <div class="md-form row">

		            <div class="col-6">
			            <input type="text" id="facebook" name="facebook" class="form-control">
			            <label class="mi-label" for="facebook">Facebook</label>
		            </div>

		            <div class="col-6">
			            <input type="number" id="telefono" name="telefono" class="form-control">
			            <label class="mi-label" for="telefono">Telefono</label>
		            </div>

		        </div>

		        <div class="md-form row">

		            <div class="col-12">
			            <input type="text" id="address" name="address" class="form-control">
			            <label class="mi-label" for="address">Direccion</label>
		            </div>

		        </div>


				<div class="div-save row">
					<input type="submit" value="Guardar" id="btn-submit" class="btn btn-success col-12">
		       	</div>
		    </form>

		</div>

	</div>

	
	<script src="MDB/js/jquery-2.2.3.min.js"></script>
	<script src="MDB/js/mdb.min.js" ></script>
	<script src="MDB/js/tether.min.js" ></script>
	<script src="MDB/js/bootstrap.min.js" ></script>
	<script src="js/index.js"></script>
	
</body>
</html>

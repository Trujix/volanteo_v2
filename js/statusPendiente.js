// ECHANDO A ANDAR TODO
$(function(){
	showSpinner();
	var totalHeight = $(document).height() - 310;
	$('#googleMap').css("height", totalHeight+"px");
	setTimeout(function(){
		var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&').toString();
		if(hashes !== window.location.href){
			var fila = hashes.split(";")[0].split("=")[1];
			var idTrabajo = hashes.split(";")[1].split("=")[1];
			if((fila !== undefined && idTrabajo !== undefined)){
				var dataPendiente = {
					row: fila,
					id : idTrabajo
				};
				$.ajax({
					url:'routes/routeStatuspendiente.php',
					type:'post',
					data: {info: dataPendiente, action: 'activarPendiente'},
					dataType:'json',
					error: function(error){
						console.log(error);
						removeSpinner();
					},
					success: function(data){
						console.log(data);
						removeSpinner();
						if(data === false){
							$('#menuMensaje').append(linkRoto);
							removeSpinner();
						}else if(data === "ACTIVADO"){
							$('#menuMensaje').append(linkActivado);
							removeSpinner();
						}else if(data === "EXITO"){
							$('#menuMensaje').append(linkExito);
							removeSpinner();
						}else if(data === "ERRORGUARDAR"){
							$('#menuMensaje').append(linkError);
							removeSpinner();
						}
					}
				});
			}else{
				$('#menuMensaje').append(linkRoto);
				removeSpinner();
			}
		}else{
			$('#menuMensaje').append(linkDenegado);
			removeSpinner();
		}
	}, 1500)
});

var linkActivado = '<div class="col-md-2" style="margin-left: 20%;">'+
				'<img src="images/revision.png" style="width: 100px;height: 100px;">'+
				'</div>'+
				'<div class="col-md-6" style="margin-top: 20px;">'+
				'<h3>Esta actividad pendiente ya fue activada</h3>'+
				'</div>';

var linkExito = '<div class="col-md-2" style="margin-left: 20%;">'+
				'<img src="images/echo.png" style="width: 100px;height: 100px;">'+
				'</div>'+
				'<div class="col-md-6" style="margin-top: 20px;">'+
				'<h3>La actividad fue actualizada con exito.</h3>'+
				'</div>';

var linkError = '<div class="col-md-2" style="margin-left: 20%;">'+
				'<img src="images/warning.png" style="width: 100px;height: 100px;">'+
				'</div>'+
				'<div class="col-md-6" style="margin-top: 20px;">'+
				'<h3>Hubo un error al actualizar la actividad.</h3>'+
				'</div>';

var linkRoto = '<div class="col-md-2" style="margin-left: 20%;">'+
				'<img src="images/link_roto.png" style="width: 100px;height: 100px;">'+
				'</div>'+
				'<div class="col-md-6" style="margin-top: 20px;">'+
				'<h3>La Direccion proporcionada es incorrecta</h3>'+
				'</div>';

var linkDenegado = '<div class="col-md-2" style="margin-left: 20%;">'+
					'<img src="images/denegado.png" style="width: 100px;height: 100px;">'+
					'</div>'+
					'<div class="col-md-6" style="margin-top: 20px;">'+
					'<h3>Acceso denegado a este sitio</h3>'+
					'</div>';
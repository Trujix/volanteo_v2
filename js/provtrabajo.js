// ECHANDO A ANDAR TODO
var idMail;
var keyMail;
var idProv;
var idGen;
var idTrab;
$(function(){
	showSpinner();
	var totalHeight = $(document).height() - 310;
	$('#googleMap').css("height", totalHeight+"px");
	setTimeout(function(){
		var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&').toString();
		if(hashes !== window.location.href){
			idMail = hashes.split(";")[0].split("=")[1];
			keyMail = hashes.split(";")[1].split("=")[1];
			idProv = hashes.split(";")[2].split("=")[1];
			if((idMail !== undefined && keyMail !== undefined && idProv !== undefined)){
				var mailJson = {
					id: idMail,
					url: keyMail,
					prov: idProv
				};
				$.ajax({
					url:'routes/routeProvtrabajo.php',
					type:'post',
					data: {info: mailJson, action: 'consultarMail'},
					dataType:'json',
					error: function(error){
						console.log(error);
						removeSpinner();
					},
					success: function(data){
						removeSpinner();
						if(data === "VERIFICADO"){
							$('#contenido').append(linkVerificado);
						}else if(data === false || data === "LINKERROR"){
							$('#contenido').append(linkRoto);
						}else{
							var cont = 0;
							var llavesEst = [];
							$.each(data, function (key, campo){
								cont++;
								if(key !== 'status' && key !== 'general')
									llavesEst.push(key);
							});
							if(llavesEst < 1){
								$('#contenido').append(linkProverror);
							}else{
								var general = data["general"];
								$.each(general, function (key, gen){
									idGen = gen[0]["id"];
									idTrab = gen[0]["idtrabajo"];
									$('#encabezado').append('<div class="form-group">' +
										'<div class="row"><div class="col-md-4"><label>ID Trabajo:</label>&nbsp;'+gen[0]["idtrabajo"]+'</div><div class="col-md-4"><label>Cliente:</label>&nbsp;'+gen[0]["cliente"]+'</div><div class="col-md-4"><label>Cant. Total:</label>&nbsp;'+gen[0]["cantidad"]+'</div></div>'+
										'<div class="row"><div class="col-md-3"><label>Cant. Tienda:</label>&nbsp;'+gen[0]["cantTienda"]+'</div><div class="col-md-5"><label>Periodo Limite:</label>&nbsp;<span id="tiempoLimite">'+gen[0]["vigencia"]+'</span></div><div class="col-md-4"><label>Tipo:</label>&nbsp;'+gen[0]["tipo"]+'</div></div>'+
									'</div>');
								});
								
								var tablaEst = '<div class="form-group">';
								for(i = 0; i < llavesEst.length; i++){
									tablaEst += '<h4>' + llavesEst[i] + '</h4><div class="table-responsive"><table class="table table-striped">' +
										'<thead><tr><th>Muicipio</th><th>Cantidad</th><th>Ver Mapa</th></tr></thead><tbody>';
									$.each(data[llavesEst[i]], function (key, cliDato){
										tablaEst += '<tr><td>' + cliDato.nommun + '</td><td>' + cliDato.cantidad + '</td><td><button class="btn btn-xs btn-primary"><span class="glyphicon glyphicon-globe"></span></button></td></tr>';
										/*$.each(cliDato, function (key, dato){
											(dato);
										});*/
									});
									tablaEst += '</tbody></table></div>';
								}
								tablaEst += '<div class="row"><div class="panel panel-default"><div class="panel-body"><h4>Coloque la fecha de inicio y témino para este trabajo</h4>'+
									'<div class="col-md-4"><input type="date" id="iniTrab" class="form-control"></div>'+
									'<div class="col-md-4"><input type="date" id="finTrab" class="form-control"></div>'+
									'<div class="col-md-4"><button class="btn btn-success" onclick="guardarConfig()">Guardar configuracion</button></div>'+
									'</div></div></div>';
								$('#contenido').append(tablaEst);
							}
						}
					}
				});
			}else{
				$('#contenido').append(linkRoto);
				removeSpinner();
			}
		}else{
			$('#contenido').append(linkDenegado);
			removeSpinner();
		}
	}, 1500)
});

// VARIABLES DE LLENADO DINAMICO
var linkRoto = '<div class="col-md-2" style="margin-left: 20%;">'+
				'<img src="images/link_roto.png" style="width: 100px;height: 100px;">'+
				'</div>'+
				'<div class="col-md-6" style="margin-top: 20px;">'+
				'<h3>La Direccion proporcionada es incorrecta</h3>'+
				'</div>';

var linkProverror = '<div class="col-md-2" style="margin-left: 20%;">'+
				'<img src="images/errprov.png" style="width: 100px;height: 100px;">'+
				'</div>'+
				'<div class="col-md-6" style="margin-top: 20px;">'+
				'<h3>Existe un error en el link o el proveedor no fue asignado para este trabajo.</h3>'+
				'</div>';

var exitoMsg = '<div class="col-md-2" style="margin-left: 20%;">'+
					'<img src="images/exito.png" style="width: 100px;height: 100px;">'+
					'</div>'+
					'<div class="col-md-6" style="margin-top: 20px;">'+
					'<h3>Configuracion guardada con exito</h3>'+
					'</div>';

var linkVerificado = '<div class="col-md-2" style="margin-left: 20%;">'+
					'<img src="images/revision.png" style="width: 100px;height: 100px;">'+
					'</div>'+
					'<div class="col-md-6" style="margin-top: 20px;">'+
					'<h3>Este trabajo ya fue configurado. Pongase en contacto con el administrador</h3>'+
					'</div>';


// FUNCION GUARDAR LA CONFIGURACION
function guardarConfig(){
	var fechaLimIni = new Date($('#tiempoLimite').text().split(' - ')[0]).getTime();
	var fechaLimIFin = new Date($('#tiempoLimite').text().split(' - ')[1]).getTime();
	var fechaTrabIni = new Date($('#iniTrab').val()).getTime();
	var fechaTrabFin = new Date($('#finTrab').val()).getTime();
	if($('#iniTrab').val() === '' || $('#finTrab').val() === ''){
		toast1("Error: Fechas de trabajo", "Coloque las fechas de inicio y término de trabajo", 8000, "error");
	}else if(fechaTrabFin < fechaTrabIni){
		toast1("Error: Fechas de trabajo", "Las fechas de trabajo son invalidas", 8000, "error");
	}else if(fechaTrabIni > fechaLimIFin || fechaTrabIni < fechaLimIni){
		toast1("Error: Fechas de trabajo", "Las fechas de inicio de trabajo no es valida", 8000, "error");
	}else if(fechaTrabFin > fechaLimIFin || fechaTrabFin < fechaLimIni){
		toast1("Error: Fechas de trabajo", "Las fechas de término de trabajo no es valida", 8000, "error");
	}else{
		infoProv = {
			mail: idMail,
			idTrab: idTrab,
			idConfig: idGen,
			provId: idProv,
			ini: $('#iniTrab').val(),
			fin: $('#finTrab').val()
		};
		$.ajax({
			url:'routes/routeProvtrabajo.php',
			type:'POST',
			data: {info: infoProv, action: 'actTrabajoPorvs'},
			dataType:'JSON',
			error: function(error){
				console.log(error);
			},
			success: function(data){
				if(data === "false"){
					toast1("Error: Alta trabajo", "Ocurrio en errro al guardar.\n\n<b>Intente mas tarde o contacte con el administrador.</b>", 8000, "error");
				}else if(data === "true"){
					$('#contenido').hide(200);
					$('#menu').hide(200);
					$('#encabezado').hide(200);
					setTimeout(function(){
						$('#contenido').html('');
						$('#contenido').append(exitoMsg);
						removeSpinner();
						$('#contenido').show(200);
					}, 400);
				}
			}
		});
	}
}

// ::::::: **************** :::::::::::
// FUNCIONES CON MAPAS
var latitudInicial;
var longitudInicial;
function iniciarMapa(){
	// INICIAMOS MAPA CON LAS COORDENADAS PREV OBTENIDAS
	// ESPERANDO A OBTENER COORDENADAS
	navigator.geolocation.getCurrentPosition(function (pos) {
		latitudInicial = pos.coords.latitude;
		longitudInicial = pos.coords.longitude;
    }, function (error){
        longitudInicial = -103.7314407;
		latitudInicial = 19.237127;
    });

	setTimeout(function(){
		miMapa = {
			center: new google.maps.LatLng(latitudInicial, longitudInicial),
			zoom: 15,
			mapTypeId: google.maps.MapTypeId.TERRAIN,
		};
		// PINTAMOS MAPA
		var mapa = new google.maps.Map(document.getElementById("googleMap"), miMapa);
	},200);
}
// FIN FUNCIONES CON MAPAS
// :::::: **************** ::::::::::::
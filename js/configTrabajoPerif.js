var url = window.location.pathname;
var folder;
$(function(){
	folder = url.substring(0, url.lastIndexOf('/'));
	showSpinner();
	var totalHeight = $(document).height() - 300;
	$('#googleMap').css("height", totalHeight+"px");
	setTimeout(function(){
		var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&').toString();
		if(hashes !== window.location.href){
			var idMail = hashes.split(";")[0].split("=")[1];
			var keyMail = hashes.split(";")[1].split("=")[1];
			var sucs = hashes.split(";")[2].split("=")[1];
			if((idMail !== "" && idMail !== undefined) && (keyMail !== "" && keyMail !== undefined) && (sucs !== "" && sucs !== undefined)){
				var mailJson = {
					id: idMail,
					url : keyMail,
					suc: sucs
				};
				$.ajax({
					url:'routes/routeConfigtrabajo.php',
					type:'post',
					data: {info: mailJson, action: 'consultarMailPerif'},
					dataType:'json',
					error: function(error){
						console.log(error);
						removeSpinner();
					},
					success: function(data){
						//console.log(data);
						if(data === false){
							$('#contenido').append(linkRoto);
							removeSpinner();
						}else if(data["status"] === "CADUCADO"){
							$('#contenido').append(linkCaducado);
							removeSpinner();
						}else if(data["status"] === "ENREVISION"){
							$('#contenido').append(linkRevision);
							removeSpinner();
						}else if(data["status"] === "COMPLETADO"){
							$('#contenido').append(linkCompleto);
							removeSpinner();
						}else if(data["status"] === "VIGENTE"){
							var cliente = data["cliente"];
							var sucursal = data["sucursal"];
							idSucursalGLOBAL = sucursal[0]["idsucursal"];
							idTrabajoGLOBAL = cliente[0]["idtrabajo"];
							idClienteGLOBAL = cliente[0]["idcliente"];
							idMailGLOBAL = idMail;
							urlUserGLOBAL = keyMail;
							$('#encabezado').append("Configurar Trabajo - Bienvenido: <span id='nomCliente' class='label label-primary'>" + cliente[0]["nomsucursal"] + "</span>");

							$('#menu').append('<div class="form-group"><div class="col-md-2 col-sm-2 col-xs-12"><h2><label>Tipo:&nbsp;</label><span id="tipoServ" style="color: #000000">' + cliente[0]["tipo"] + '</span></h2></div>'+
								'<div class="col-md-2 col-sm-2 col-xs-12"><h2><label>Total:&nbsp;&nbsp;</label><span id="cantTotal" style="color: #000000">' + sucursal[0]["cantidad"] + '</span></h2></div>'+
								'<div class="col-md-2 col-sm-2 col-xs-12"><h2><label>Total Rest:&nbsp;&nbsp;</label><span id="totalRest" style="color: #000000">' + sucursal[0]["cantidad"] + '</span></h2></div>'+
								'<div class="col-md-4 col-sm-4 col-xs-12"><h2><label>Vigencia:&nbsp;&nbsp;</label><span id="vigenciaTxt" style="color: #000000">' + cliente[0]["vigencia"] + '</span></h2></div>'/*</div>'*/+
								/*'<div class="form-group"><div class="col-md-3 col-sm-3 col-xs-12"><select onchange="selectMun()" id="estSelect" class="form-control"></select></div>'+
								'<div class="col-md-3 col-sm-3 col-xs-12"><select onchange="selectMunPolig()" id="munsSelect" class="form-control"><option value="-1">- Elige el Municipio -</option></select></div>'+
								'<div class="col-md-3 col-sm-3 col-xs-12"><select onchange="selectZonaPolig()" id="zonaSelect" class="form-control"><option value="-1">- Elige la zona -</option></select></div>'+*/
								'<div class="col-md-1 col-sm-1 col-xs-12"><button onclick="mostrarResumen(this)" id="btnResumen" value="0" class="btn btn-default">Mostrar Tabla Fechas&nbsp;&nbsp;&nbsp;<span class="glyphicon glyphicon-chevron-down"></span></button></div></div>'+
								'<div class="form-group"><div style="max-height: 200px; overflow: scroll;" id="trabajosResumen" class="col-md-12 col-sm-12 col-xs-12" hidden><h2>hhh</h2></div></div>');

							var estadosSelec = "<option value='-1'>- Elige el Estado -</option>";
							domgeoGLOBAL = data["DOMGEO"];
							var edos = [];
							$.each(domgeoGLOBAL, function (key, value){
								edos.push(key);
								estadosSelec += "<option value='" + key.split('-')[1] + "'>" + key.split('-')[0] + "</option>";
							});

							$('#estSelect').append(estadosSelec);

							tablaFechasGLOBAL = data["perifoneo"];
							$(tablaFechasGLOBAL).each(function (key, value){
								idsFechasGLOBAL.push(value.id);
							});
							llenarTablaFechas();
							usuarioLoginLOBAL = data["LOGIN"];
							if(data["LOGIN"] === "ADMIN"){
								btnSAVECONFIG = "Aceptar Propuesta";
							}else if(data["LOGIN"] === "CLIENTE"){
								btnSAVECONFIG = "Guardar Configuracion";
							}

							setTimeout(function(){
								$('#googleMap').show(200);
								iniciarMapa();
								poligonosJSON['elementos'] = [];

								accionGuardarEditar = "GUARDAR";

								if(data["EditVals"].length > 0){
									accionGuardarEditar = "EDITAR";
									$('#totalRest').text('0');
									$.each(data["EditVals"], function (key, arr){
										$.each(arr, function (key2, value){
											var poligData = {
												idjson: value.poligono + "_" + value.idconfig,
												idpolig: parseInt(value.poligono),
												nompolig: value.nompolig,
												idLista: value.idconfig,
												edo: value.estado,
												mun: value.municipio,
												cant: value.cantidad,
												cantReal: value.hrsperifoneo,
												hrini: value.iniconfig,
												hrfin: value.finconfig,
												hrinialta: value.iniconfigalta,
												hrfinalta: value.finconfigalta
											};

											poligonosJSON['elementos'].push(poligData);
										});
									});
									$(tablaFechasGLOBAL).each(function (key, value){
										tablaFechasGLOBAL[key]["minutos"] = "0";
									});
								}
							}, 2000);
							setTimeout(function(){
								dataServerGLOBAL = data;
								todosPoligonos(function(){
									$('#todosPoligonosDiv').show();
									removeSpinner();
								});
							}, 2500);
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
	},1500);
});

// MENSAJES DEPENDIENDO EL RESULTADO
var linkCaducado = '<div class="col-md-2" style="margin-left: 20%;">'+
					'<img src="images/caducado.png" style="width: 100px;height: 100px;">'+
					'</div>'+
					'<div class="col-md-6" style="margin-top: 20px;">'+
					'<h3>El link que ha ingresado ha caducado.</h3>'+
					'</div>';

var linkRoto = '<div class="col-md-2" style="margin-left: 20%;">'+
				'<img src="images/link_roto.png" style="width: 100px;height: 100px;">'+
				'</div>'+
				'<div class="col-md-6" style="margin-top: 20px;">'+
				'<h3>La Direccion proporcionada es incorrecta</h3>'+
				'</div>';

var linkRevision = '<div class="col-md-2" style="margin-left: 20%;">'+
					'<img src="images/revision.png" style="width: 100px;height: 100px;">'+
					'</div>'+
					'<div class="col-md-6" style="margin-top: 20px;">'+
					'<h3>Su trabajo estás siendo revisado. Pongase en contacto con el administrador.</h3>'+
					'</div>';

var linkEditando = '<div class="col-md-2" style="margin-left: 20%;">'+
					'<img src="images/editar.png" style="width: 100px;height: 100px;">'+
					'</div>'+
					'<div class="col-md-6" style="margin-top: 20px;">'+
					'<h3>El cliente esta en proceso de edición del trabajo. Póngase en contacto con el.</h3>'+
					'</div>';

var linkCompleto = '<div class="col-md-2" style="margin-left: 20%;">'+
					'<img src="images/echo.png" style="width: 100px;height: 100px;">'+
					'</div>'+
					'<div class="col-md-6" style="margin-top: 20px;">'+
					'<h3>El trabajo está completamente configurado.</h3>'+
					'</div>';

var linkDenegado = '<div class="col-md-2" style="margin-left: 20%;">'+
					'<img src="images/denegado.png" style="width: 100px;height: 100px;">'+
					'</div>'+
					'<div class="col-md-6" style="margin-top: 20px;">'+
					'<h3>Acceso denegado a este sitio</h3>'+
					'</div>';

var exitoMsg = '<div class="col-md-2" style="margin-left: 20%;">'+
					'<img src="images/exito.png" style="width: 100px;height: 100px;">'+
					'</div>'+
					'<div class="col-md-6" style="margin-top: 20px;">'+
					'<h3>Configuracion guardada con exito</h3>'+
					'</div>';



// ************* FUNCIONES CON LA TABLA DE FECHAS PERIFONEO *************
// FUNCION QUE LLENA LA TABLA DE PERIFONEO
var usuarioLoginLOBAL;
var idSucursalGLOBAL;
var idTrabajoGLOBAL;
var idClienteGLOBAL;
var idMailGLOBAL;
var urlUserGLOBAL;
var idsPoligonosGLOBAL = [];
var poligonosJSON = [];
var btnSAVECONFIG = "";
var tablaFechasGLOBAL;
var idsFechasGLOBAL = [];

function llenarTablaFechas(){
	var contenido = '<div class="table-responsive"><table class="table table-bordered">'+
			'<thead><tr><th>Fecha</th><th>Hr Inicio</th><th>Hr Término</th><th>Cant. (Minutos)</th></tr></thead><tbody id="fechasPerifTabla">';
	$(tablaFechasGLOBAL).each(function (key, value){
		contenido += '<tr id="' + value.id + '" style="cursor: pointer"><td id="fecha_' + value.id + '">' + value.fecha + '</td><td id="ini_' + value.id + '">' + value.iniciohr + '</td><td id="fin_' + value.id + '">' + value.finhr + '</td><td id="cant_' + value.id + '">' + value.minutos + '</td></tr>' +
		'<tr id="trLista_' + value.id + '" hidden><td colspan="4"><div class="table-responsive"><table class="table table-bordered"><table class="table table-bordered"><tbody id="listPerif_' + value.id + '"></tbody></table></td></tr>';
	});
	contenido += "</tbody></table></div><p></p><button onclick='guardarConfig()' class='btn btn-success'><span class='glyphicon glyphicon-floppy-saved'></span>&nbsp;"+btnSAVECONFIG+"</button>";
	$('#trabajosResumen').html('');
	$('#trabajosResumen').append(contenido);

	idFechaPerifSelecGLOBAL = 0;
}
// FUNCION AL DAR CLICK SOBRE UNA FILA DE LA TABLA DE FECHAS PERIFONEO
var idFechaPerifSelecGLOBAL;
$(document).on('click', '#fechasPerifTabla tr', function(){
	restaurarIconosPoligs();
	infoVentana.close();
	$('#fechasPerifTabla tr').each(function(){
		$(this).removeClass('success');
		$('#trLista_' + $(this).attr("id")).hide();
	});
	$(this).addClass('success');
	idFechaPerifSelecGLOBAL = parseInt($(this).attr("id"));
	$('#trLista_' + $(this).attr("id")).show();

	if(idFechaPerifSelecGLOBAL !== NaN && idFechaPerifSelecGLOBAL > 0){
		$('#listPerif_' + idFechaPerifSelecGLOBAL).html('');
		var c = 1;
		$(poligonosJSON.elementos).each(function (key, value){
			if(parseInt(value.idLista) === parseInt(idFechaPerifSelecGLOBAL)){
				$('#listPerif_' + idFechaPerifSelecGLOBAL).append('<tr id="poligList_' + value.idpolig + '" name="' + value.idLista + '" num="' + c + '"><td id="nomPL_' + value.idLista + '">' + value.nompolig + '</td><td id="canPL_' + value.idLista + '">' + value.cant + '</td><td id="iniPL_' + value.idLista + '">' + value.hrini + '</td><td id="finPL_' + value.idLista + '">' + value.hrfin + '</td><td><button class="btn btn-xs btn-danger" onclick="quitarPoligono(' + value.idpolig + ',' + value.cant + ',' + "'" + value.idjson + "'" + ')"><span class="glyphicon glyphicon-trash"></span>&nbsp;Quitar</button></td></tr>');
				banderaPolig["ban_" + value.idpolig].setOptions({
					icon: 'images/banderasPolig/echo2.png'
				});
				c++;
			}
		});
	}
});
// FUNCION QUE DESPLIEGA LA TABLA DE FECHAS DISPONIBLES
function mostrarResumen(id){
	$('#btnResumen').html('');
	if($(id).val() === '0'){
		$(id).val('1');
		$('#trabajosResumen').show(200);
		$('#btnResumen').append('Ocultar Tabla Fechas&nbsp;&nbsp;&nbsp;<span class="glyphicon glyphicon-chevron-up"></span>');
		$('#btnResumen').removeClass('btn btn-default');
		$('#btnResumen').addClass('btn btn-warning');
	}else if($(id).val() === '1'){
		$(id).val('0');
		$('#trabajosResumen').hide(200);
		$('#btnResumen').append('Mostrar Tabla Fechas&nbsp;&nbsp;&nbsp;<span class="glyphicon glyphicon-chevron-down"></span>');
		$('#btnResumen').removeClass('btn btn-warning');
		$('#btnResumen').addClass('btn btn-default');
	}
	restaurarIconosPoligs();
	llenarTablaFechas();
	infoVentana.close();
}
// FUNCION QUE RESTAURA LOS ICONOS DE LOS POLIGONOS
function restaurarIconosPoligs(){
	for(i = 0; i < idsPoligonosGLOBAL.length; i++){
		banderaPolig["ban_" + idsPoligonosGLOBAL[i]].setOptions({
			icon: 'images/banderasPolig/plus.png'
		});
	}	
}
// FUNCION QUE SUMA/RESTA CANTIDAD AL AGREGAR/QUITAR POLIGONO AL ARRAY GLOBAL
function quitarAgregarPerifListaArr(cant, accion){
	if(accion === "sumar"){
		for(a = 0; a < tablaFechasGLOBAL.length; a++){
			if(parseInt(tablaFechasGLOBAL[a]["id"]) === parseInt(idFechaPerifSelecGLOBAL)){
				var cantidad = parseInt(tablaFechasGLOBAL[a]["minutos"]) + parseInt(cant);
				tablaFechasGLOBAL[a]["minutos"] = cantidad;
			}
		}
	}else if(accion === "restar"){
		for(b = 0; b < tablaFechasGLOBAL.length; b++){
			if(parseInt(tablaFechasGLOBAL[b]["id"]) === parseInt(idFechaPerifSelecGLOBAL)){
				var cantidad = parseInt(tablaFechasGLOBAL[b]["minutos"]) - parseInt(cant);
				tablaFechasGLOBAL[b]["minutos"] = cantidad;
			}
		}
	}
}

// ::::::::::::::::::::::::: FUNCION DE GUARDADO :::::::::::::::::::::
function guardarConfig(){
	if(parseInt($('#totalRest').text()) > 0){
		toast1("No puede guardar aún", 'Tiene trabajo por hacer\n<b>Revise "Total Restante"</b>', 8000, "info");
	}else{
		var idsDetalleDELETE = "";
		$(poligonosJSON.elementos).each(function (key, value){
			if(parseInt(key) > 0)
				idsDetalleDELETE += ",";
			idsDetalleDELETE += value.idLista;
		});

		var jsonRESTAURAR = {
			idTrab: idTrabajoGLOBAL,
			idSuc: idSucursalGLOBAL,
			ctdDELETE: idsDetalleDELETE
		};

		restaurarConfigPerif(jsonRESTAURAR, function(result){
			console.log(result);
			if(result === true){
				var jsonAlta = {
					user: usuarioLoginLOBAL,
					idTrab: idTrabajoGLOBAL,
					idSuc: idSucursalGLOBAL,
					idCliente: idClienteGLOBAL,
					mail: idMailGLOBAL,
					url: urlUserGLOBAL,
					poligonos: poligonosJSON.elementos,
					fechas: tablaFechasGLOBAL,
					cantTotal: $('#cantTotal').text(),
					nomCliente: $('#nomCliente').text(),
					cantTienda: 0,
					vigencia: $('#vigenciaTxt').text().replace(" a ", " - "),
					tipo: $('#tipoServ').text()
				}
				console.log(jsonAlta);
				$.ajax({
					url:'routes/routeConfigtrabajo.php',
					type:'post',
					data: {info: jsonAlta, action: 'guardarConfigPerif'},
					dataType:'json',
					error: function(error){
						console.log(error);
						removeSpinner();
					},
					success: function(data){
						console.log(data);
						if(data === true){
							$('#contenido').hide(200);
							$('#menu').hide(200);
							$('#encabezado').hide(200);
							$('#todosPoligonos').hide();
							setTimeout(function(){
								$('#contenido').html('');
								$('#contenido').append(exitoMsg);
								removeSpinner();
								$('#contenido').show(200);

								if(usuarioLoginLOBAL === "CLIENTE"){
									toast1("Configuracion guardada con exito", "\nSu configuracion entrará en proceso de revisión por el administrador.\n\n<b>Si tiene dudas o decea editar su configuración consulte con el administrador del sistema y este le enviará un correo para poder editarlo.</b>", 17000, "success");
								}else if(usuarioLoginLOBAL === "ADMIN"){
									toast1("Configuracion guardada con exito", "\nLa propuesta ha sido guardada y aceptada con exito.\n\n<b>Pongase en contacto con el cliente para coordinar la actividad.</b>", 17000, "success");
								}
							}, 400);
						}else{
							toast1("ERROR", "Ocurrió un error al guardar la configuración", 17000, "error");
							removeSpinner();
						}
					}
				});
			}else{
				toast1("ERROR", "Ocurrió un error al guardar la configuración", 17000, "error");
				removeSpinner();
			}
		});
	}
}
// FUNCION EN CORTO QUE RESTAURA LOS DATOS
function restaurarConfigPerif(json, callback){
	$.ajax({
		url:'routes/routeConfigtrabajo.php',
		type:'post',
		data: {info: json, action: 'restaurarConfigPerif'},
		dataType:'json',
		beforeSend: function(){
			showSpinner();
		},
		error: function(error){
			console.log(error);
			callback(false);
			toast1("ERROR", "Ocurrió un error al guardar la configuración", 17000, "error");
			removeSpinner();
		},
		success: function(data){
			callback(data);
		}
	});
}

var todosPoligsGLOBAL;
function llenarZonasPolig(){
	$.ajax({
		url:'routes/routeConfigtrabajo.php',
		type:'post',
		data: {info: idSucursalGLOBAL, action: 'traerZona'},
		dataType:'json',
		error: function(error){
			console.log(error);
			removeSpinner();
		},
		success: function(zonas){
			console.log(zonas);
			todosPoligsGLOBAL = zonas;
			removeSpinner();
			$('#zonaSelect').html('');
			$('#zonaSelect').append('<option value="-1">- Elige la zona -</option>');
			for(i = 0; i < zonas.length; i++){
				$('#zonaSelect').append('<option value="'+zonas[i].id+'">'+zonas[i].nomtxt+'</option>');
			}
		}
	});
}
// FUNCION INDEPENDIENTE QUE TRAE TODOS LOS POLIGONOS
var dataServerGLOBAL;
function todosPoligonos(callback){
	var c = 0;
	for(var k in dataServerGLOBAL["DOMGEO"]){
		if(c === 0)
			geoDataCompleto = k.split("-")[0];
	}
	/*llenarZonasPolig();
	setTimeout(function(){
		pintarPoligonos(todosPoligsGLOBAL, 8);
		setTimeout(function(){
			callback(true);
		}, 8000);
	}, 10000);*/

	$.ajax({
		url:'routes/routeConfigtrabajo.php',
		type:'post',
		data: {info: idSucursalGLOBAL, action: 'traerZona'},
		dataType:'json',
		error: function(error){
			console.log(error);
			removeSpinner();
		},
		success: function(zonas){
			todosPoligsGLOBAL = zonas;
			pintarPoligonos(todosPoligsGLOBAL, 8);
			setTimeout(function(){
				callback(true);
			}, 1000);
		}
	});
}
$(document).on('click', '#todosPoligonos', function(){
	showSpinner();
	todosPoligonos(function(){
		removeSpinner();
	});
});

// ::::::::::::::::: FUNCIONES DE GOOGLE MAPS ::::::::::::::
// *********************************************************
// VARIABLE DE MAPA GLOBAL
var miMapa;
var miMapaExec;
// MANDAMOS LAS COORDENADAS A LAS VAR GLOBALES LON - LAT
var longitudInicial;
var latitudInicial;

//INICIANDO EL MAPA ************** FUNCION PRINCIPAL
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
		miMapaGlobal = {
			center: new google.maps.LatLng(latitudInicial, longitudInicial),
			zoom: 15,
			mapTypeId: google.maps.MapTypeId.TERRAIN,
		};
		// PINTAMOS MAPA
		 miMapaExec = new google.maps.Map(document.getElementById("googleMap"), miMapaGlobal);
	},200);
}
// FUNCION QUE MUESTRA EL MAPA SIN POLIGONOS (PARA EVITAR ERRORES)
function mapaDefault(zoom, geoData){
	miMapaGlobal = new google.maps.Map(document.getElementById('googleMap'),{zoom: zoom,mapTypeId: google.maps.MapTypeId.TERRAIN,});
	var geoCodigo = new google.maps.Geocoder();
	// SE RECIBE LA VAR GEODATACOMPLETO, RESULTA DE UNIR LOS SELECT
	geoCodigo.geocode({'address': geoData}, function(results, status) {
		if(status === 'OK'){
			miMapaGlobal.setCenter(results[0].geometry.location);
			var marker = new google.maps.Marker({
				map: miMapaGlobal,
			});
		}else{
			alert('Error en la geolocalizacion: ' + status);
		}
		removeSpinner();
	});
}

// EL INFOWINDOW TRABAJA DE FORMA DINAMICA, REQUIERE
// VALORES LEIBLES (COMO EN UNA VARIABLE GLOBAL)
var poligCantsJSON = {};
var cantMunInfoWindow;

	// ******** :::::::::::::::::::::::::: **********
	// ::::::::::: FUNCIONES CON MAPAS ::::::::::::
	var miMapaGlobal;
	var edoMunGlobal;
	function coordsDefaultMapa(zoom){
		miMapaGlobal = new google.maps.Map(document.getElementById('googleMap'),{zoom: zoom,mapTypeId: google.maps.MapTypeId.TERRAIN,fullscreenControl: true,});
		var geoCodigo = new google.maps.Geocoder();
		enviarAddressMapa(geoCodigo, miMapaGlobal);
		edoMunGlobal = $('#estSelect').val() + ':' + $('#munsSelect').val();
	}
	// PINTAMOS POLIGONOS
	var poligonoVer;
	var infoVentana;
	var banderaPolig;
	function pintarPoligonos(polig, zoom){
		coordsDefaultMapa(zoom);
		poligonoVer = {};
		banderaPolig = {};
		var centro;
		$.each(polig, function (p, elem){
			var poligCoords = elem.coords.split(';');
			var colorPolig = "#" + elem.atributos;
			var coordenadas = [];
			for(i = 0; i < poligCoords.length; i++){
				coordenadas.push({
					lat: parseFloat(poligCoords[i].split(',')[0]),
					lng: parseFloat(poligCoords[i].split(',')[1])
				});
			}

			var poligCentro = new google.maps.Polygon({paths: coordenadas});
			centro = centroPoligono(poligCentro);

			idsPoligonosGLOBAL.push(elem.id);
			poligonoVer["pol_" + elem.id] = new google.maps.Polygon({
				paths: coordenadas,                        
				fillColor: colorPolig,
				fillOpacity: 0.5,
				strokeColor: '#0000FF',
				strokeOpacity: 0.8,
				strokeWeight: 3,
				editable: false,
				draggable: false,
				clickable: false,
				id: elem.id,
				nombre: elem.nombre,
				tipo: elem.tipo,
			});

			var imagen;
			var cImg = 0;
			$(poligonosJSON.elementos).each(function (e, value){
				if(parseInt(value.idpolig) === parseInt(elem.id) && parseInt(value.idLista) === parseInt(idFechaPerifSelecGLOBAL))
					cImg++;
			});
			if(cImg < 1)
				imagen = 'images/banderasPolig/plus.png';
			else
				imagen = 'images/banderasPolig/echo2.png';

			// COLOCAMOS SU BANDERA
			banderaPolig["ban_" + elem.id] = new google.maps.Marker({
				position: centro,
				map: miMapaGlobal,
				icon: imagen,
				title: elem.nombre
			});

			// CREAMOS UNA VENTANA DE OPCIONES
			infoVentana = new google.maps.InfoWindow({ content: '' });
			google.maps.event.addListener(banderaPolig["ban_" + elem.id], 'click', (function (bandera, i){
				infoVentana.close();
				return function(){
					var perifVol = 0;
					var perifVolTxt = "";
					if($('#tipoServ').text() === "Volanteo"){
						perifVol = elem.numvolantes;
						perifVolTxt = '<p><span class="text-primary"><b>Num. Volanteo: <b/></span>'+elem.numvolantes+'</p>';
					}else{
						perifVol = elem.hrsperifoneo
						perifVolTxt = '<p><span class="text-primary"><b>Perifoneo(mins): <b/></span>'+elem.hrsperifoneo+'</p>';
					}
					var contenido = '<div id="content"><div id="siteNotice"></div><center><label id="firstHeading">'+elem.nomtxt+'</label></center><br><div id="bodyContent">'+perifVolTxt+'<p><span class="text-primary"><b>Observaciones: <b/></span>'+elem.observaciones+'</p>';
					var cont = 0;
					var idJson = "";
					$(poligonosJSON.elementos).each(function (e, value){
						if(parseInt(value.idpolig) === parseInt(elem.id) && parseInt(value.idLista) === parseInt(idFechaPerifSelecGLOBAL)){
							cont++;
							idJson = value.idjson;
						}
					});

					if(cont < 1){
						contenido += '<button class="btn btn-primary btn-xs" onclick="asignarPoligono('+elem.id+','+"'"+elem.nomtxt+"'"+','+perifVol+')">Elegir zona</button>';
					}else{
						contenido += '<button class="btn btn-warning btn-xs" onclick="quitarPoligono('+elem.id+','+perifVol+','+ "'" +idJson+ "'" +')">Quitar zona</button>';
					}
					contenido += '</div></div>';
					
					infoVentana.setContent(contenido);
					infoVentana.open(miMapaGlobal, bandera);
				}
			})(banderaPolig["ban_" + elem.id], p));

			// PINTAMOS EL POLIGONO EN EL MAPA
			poligonoVer["pol_" + elem.id].setMap(miMapaGlobal);
		});
	}
	// CONTROL DEL BOTON DE FULL SCREEN DEL MAPA
	var zoomGoogleMap = false;
	$(document).on('click', 'button[draggable="false"]', function(){
		if(zoomGoogleMap)
			zoomGoogleMap = false;
		else
			zoomGoogleMap = true;
	});
	function ejecutarZoomGM(){
		if(zoomGoogleMap)
			$('button[draggable="false"]').click();
	}

	var cantGLOBAL = 0;
	var cantPoligGLOBAL = 0;
	function asignarPoligono(idPolig, nomPolig, cant){
		cantPoligGLOBAL = cant;
		if(idFechaPerifSelecGLOBAL > 0 && idFechaPerifSelecGLOBAL !== NaN){
			if(parseInt($('#totalRest').text()) === 0 ||  parseInt($('#cant_' + idFechaPerifSelecGLOBAL).text()) === 0){
				toast1("Error cantidad", "Ha superado la cantidad disponible.", 8000, "error");
			}else if(parseInt(cant) > parseInt($('#cant_' + idFechaPerifSelecGLOBAL).text())){
				ejecutarZoomGM();
				$.confirm({
					title: 'Cantidad insuficiente',
					content: '<b>La cantidad de la zona seleccionada es superior a la restante:</b><br>¿Desea ajustar la cantidad a '+$('#cant_' + idFechaPerifSelecGLOBAL).text()+'?',
					theme: 'light',
					confirm: function(){
						asignarPoligonoTrue(idPolig, nomPolig, parseInt($('#cant_' + idFechaPerifSelecGLOBAL).text()));
					},
					cancel: function(){}
				});
			}else{
				asignarPoligonoTrue(idPolig, nomPolig, cant);
			}
		}else{
			ejecutarZoomGM();
			toast1("Error", "No ha seleccionado fecha.", 6000, "error");	
		}	
	}

	function asignarPoligonoTrue(idPolig, nomPolig, cant){
			//cerrarResumen();
			banderaPolig["ban_" + idPolig].setOptions({
				icon: 'images/banderasPolig/echo2.png'
			});
			var poligData = {
				idjson: idPolig + "_" + idFechaPerifSelecGLOBAL,
				idpolig: idPolig,
				nompolig: nomPolig,
				idLista: idFechaPerifSelecGLOBAL,
				edo: edoMunGlobal.split(':')[0],
				mun: edoMunGlobal.split(':')[1],
				cant: cant,
				cantReal: cantPoligGLOBAL,
				hrini: ajustarHrIniFinPerifoneo(1, idFechaPerifSelecGLOBAL, cant).split("-?-")[0],
				hrfin: ajustarHrIniFinPerifoneo(1, idFechaPerifSelecGLOBAL, cant).split("-?-")[1],
				hrinialta: $('#fecha_' + idFechaPerifSelecGLOBAL).text() + " " + ajustarHrIniFinPerifoneo(1, idFechaPerifSelecGLOBAL, cant).split("-?-")[0],
				hrfinalta: $('#fecha_' + idFechaPerifSelecGLOBAL).text() + " " + ajustarHrIniFinPerifoneo(1, idFechaPerifSelecGLOBAL, cant).split("-?-")[1]
			};
			poligonosJSON['elementos'].push(poligData);
			$('#totalRest').text( parseInt($('#totalRest').text()) - parseInt(cant) );
			
			$('#cant_' + idFechaPerifSelecGLOBAL).text(parseInt($('#cant_' + idFechaPerifSelecGLOBAL).text()) - parseInt(cant));
			quitarAgregarPerifListaArr(parseInt(cant), "restar");
			var c = 1;
			$('#listPerif_' + idFechaPerifSelecGLOBAL + ' tr').each(function(){
				c++;
			});
			$('#listPerif_' + idFechaPerifSelecGLOBAL).append('<tr id="poligList_' + idPolig + '" name="' + idFechaPerifSelecGLOBAL + '" num="' + c + '"><td id="nomPL_' + idFechaPerifSelecGLOBAL + '">' + nomPolig + '</td><td id="canPL_' + idFechaPerifSelecGLOBAL + '">' + cant + '</td><td id="iniPL_' + idFechaPerifSelecGLOBAL + '">' + ajustarHrIniFinPerifoneo(1, idFechaPerifSelecGLOBAL, cant).split("-?-")[0] + '</td><td id="finPL_' + idFechaPerifSelecGLOBAL + '">' + ajustarHrIniFinPerifoneo(1, idFechaPerifSelecGLOBAL, cant).split("-?-")[1] + '</td><td><button class="btn btn-xs btn-danger" onclick="quitarPoligono(' + idPolig + ',' + cant + ','+ "'" + idPolig + "_" + idFechaPerifSelecGLOBAL+ "'"  + ')"><span class="glyphicon glyphicon-trash"></span>&nbsp;Quitar</button></td></tr>');	

			cantGLOBAL = parseInt($('#totalRest').text());
			infoVentana.close();
	}

	// CONJUNTO DE FUNCIONES QUITAR POLIGONO
	function quitarPoligono(idPolig, cant, idJson){
		//cerrarResumen();
		banderaPolig["ban_" + idPolig].setOptions({
			icon: 'images/banderasPolig/plus.png'
		});
		$.each(poligonosJSON.elementos, function (key, value){
			if(parseInt(value.idpolig) === parseInt(idPolig) && parseInt(value.idLista) === parseInt(idFechaPerifSelecGLOBAL)){
				$('#totalRest').text( parseInt($('#totalRest').text()) + parseInt(value.cant) );
				$('#cant_' + idFechaPerifSelecGLOBAL).text(parseInt($('#cant_' + idFechaPerifSelecGLOBAL).text()) + parseInt(value.cant));
				quitarAgregarPerifListaArr(parseInt(value.cant), "sumar");
				$('#poligList_' + value.idpolig).remove();
				cantGLOBAL = parseInt($('#totalRest').text());
			}
		});
		poligonosJSON.elementos.quitarElemento('idjson', idJson);
		infoVentana.close();
		ajustarHrIniFinPerifoneo(2, idFechaPerifSelecGLOBAL, cant);
	}

	// FUNCION QUE AJUSTA LAS HRS DE INICIO Y TERMINO PARA EL PERIFONEO
	function ajustarHrIniFinPerifoneo(accion, id, cant){
		var hrString = "";
		var c = 0;
		if(accion === 1){
			$('#listPerif_' + id + ' tr').each(function(){
				c++;
			});
			if(c > 0){
				var fecha = new Date($('#fecha_' + id).text() + " " + $('tr[name="' + id + '"][num="' + c + '"] td[id="finPL_' + id + '"]').text());
				var fechaNueva = new Date(fecha.setMinutes(fecha.getMinutes() + parseInt(cant))).toString().split(" ")[4].split(":");
				hrString = $('tr[name="' + id + '"][num="' + c + '"] td[id="finPL_' + id + '"]').text() + "-?-" + fechaNueva[0] + ":" + fechaNueva[1];
			}else{
				var fecha = new Date($('#fecha_' + id).text() + " " + $('#ini_' + id).text());
				var fechaNueva = new Date(fecha.setMinutes(fecha.getMinutes() + parseInt(cant))).toString().split(" ")[4].split(":");
				hrString = $('#ini_' + id).text() + "-?-" + fechaNueva[0] + ":" + fechaNueva[1];
			}
			return hrString;
		}else if(accion === 2){
			var num = 1;
			$('#listPerif_' + id + ' tr').each(function(){
				$(this).attr("num", num);
				num++; c++;
			});
			c--;

			var poligsAux = [];
			$(poligonosJSON.elementos).each(function (key, value){
				if(parseInt(value.idLista) === parseInt(id)){
					poligsAux.push(poligonosJSON.elementos[key]);
					$('#cant_' + id).text(parseInt($('#cant_' + id).text()) + parseInt(poligonosJSON.elementos[key]["cant"]));
					$('#totalRest').text(parseInt($('#totalRest').text()) + parseInt(poligonosJSON.elementos[key]["cant"]));
				}
			});
			$(poligsAux).each(function (key, value){
				var fechaNueva;
				var fechaIni;
				var cantNueva = 0;
				if(parseInt(poligsAux[key]["cantReal"]) > parseInt($('#cant_' + id).text())){
					cantNueva = parseInt($('#cant_' + id).text());
				}else{
					cantNueva = parseInt(poligsAux[key]["cantReal"]);
				}
				if(key > 0){
					var fecha = new Date($('#fecha_' + id).text() + " " + poligsAux[key - 1]["hrfin"]);
					fechaNueva = new Date(fecha.setMinutes(fecha.getMinutes() + parseInt(cantNueva))).toString().split(" ")[4].split(":");
					poligsAux[key]["hrini"] = poligsAux[key - 1]["hrfin"];
					poligsAux[key]["hrfin"] = fechaNueva[0] + ":" + fechaNueva[1];
					poligsAux[key]["hrinialta"] = $('#fecha_' + id).text() + " " + poligsAux[key - 1]["hrfin"];
					poligsAux[key]["hrfinalta"] = $('#fecha_' + id).text() + " " + fechaNueva[0] + ":" + fechaNueva[1];
				}else{
					var fecha = new Date($('#fecha_' + id).text() + " " + $('#ini_' + id).text());
					fechaNueva = new Date(fecha.setMinutes(fecha.getMinutes() + parseInt(cantNueva))).toString().split(" ")[4].split(":");
					poligsAux[key]["hrini"] = $('#ini_' + id).text();
					poligsAux[key]["hrfin"] = fechaNueva[0] + ":" + fechaNueva[1];
					poligsAux[key]["hrinialta"] = $('#fecha_' + id).text() + " " + $('#ini_' + id).text();
					poligsAux[key]["hrfinalta"] = $('#fecha_' + id).text() + " " + fechaNueva[0] + ":" + fechaNueva[1];
				}
				poligsAux[key]["cant"] = cantNueva;
				$('#cant_' + id).text(parseInt($('#cant_' + id).text()) - cantNueva);
				$('#totalRest').text(parseInt($('#totalRest').text()) - cantNueva);
			});
			//console.log(poligsAux);
			//removeSpinner();
			$('#' + id).click();
		}
	}

	// FUNCION EXTRA QUE PRIMERO MUESTRA POLIGONO Y DESPUES QUITA EL POLIGONO DE LA LISTA
	function quitarPoligonoList(idPolig, cant, edo, mun){
		$('#estSelect option[value="'+edo+'"]').prop("selected", true);
		setTimeout(function(){
			selectMun();
			$('#munsSelect option[value="'+mun+'"]').prop("selected", true);
		}, 800);
		setTimeout(function(){
			llenarZonasPolig();
		}, 1000);
		setTimeout(function(){
			showSpinner();
			$.ajax({
				url:'routes/routeConfigtrabajo.php',
				type:'post',
				data: {info: idPolig, action: 'traerPolig'},
				dataType:'json',
				error: function(error){
					console.log(error);
				},
				success: function(data){
					geoDataCompleto = $('#estSelect option:selected').text() + ', ' + $('#munsSelect option:selected').text();
					pintarPoligonos(data, 13);
					setTimeout(function(){
						removeSpinner();
						//quitarPoligono(idPolig, cant, idPolig + "_" + idFechaPerifSelecGLOBAL);
					}, 2000);
				}
			});
		}, 1500);
	}

// FUNCION OBTENER EL CENTRO DEL POLIGONO
function centroPoligono(poligono){
	var bajoX, altoX, bajoY, altoY, lats = [], lngs = [], vertices = poligono.getPath();

    for(var i=0; i<vertices.length; i++) {
      lngs.push(vertices.getAt(i).lng());
      lats.push(vertices.getAt(i).lat());
    }
 
    lats.sort(); lngs.sort();
    bajoX = lats[0];
    altoX = lats[vertices.length - 1];
    bajoY = lngs[0];
    altoY = lngs[vertices.length - 1];
    center_x = bajoX + ((altoX-bajoX) / 2);
    center_y = bajoY + ((altoY - bajoY) / 2);
    return (new google.maps.LatLng(center_x, center_y));
}  
// *********************************************************
// :::::::::::::::: FIN DE FUNCIONES DE GOOGLE MAPS ::::::::

// FUNCION PARA REMOVER ELEMENTO DE JSON
	Array.prototype.quitarElemento = function(llave, valor){
	   var array = $.map(this, function(v,i){
	      return v[llave] === valor ? null : v;
	   });
	   this.length = 0;
	   this.push.apply(this, array);
	}
	// MOSTRAR MAPA EN LOCALIZACION POR NOMBRE
	var geoDataCompleto;
	function enviarAddressMapa(geoCoder, mapa) {
		// SE RECIBE LA VAR GEODATACOMPLETO, RESULTA DE UNIR LOS SELECT
		geoCoder.geocode({'address': geoDataCompleto}, function(results, status) {
			if(status === 'OK'){
				mapa.setCenter(results[0].geometry.location);
				var marker = new google.maps.Marker({
					map: mapa,
				});
			}else{
				alert('Error en la geolocalizacion: ' + status);
			}
		});
	}
	function cerrarResumen(){
		var accionBtn = $('#btnResumen').val();
		if(parseInt(accionBtn) > 0){
			$('#btnResumen').click();
			setTimeout(function(){
				$('#btnResumen').click();
			}, 500);
		}
	}
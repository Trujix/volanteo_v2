// ECHAMOS A ANDAR TODO
$(function(){
	// INICIAMOS MAPA
	iniciarMapa();
	var totalHeight = $(document).height() - 340;
	$('#googleMap').css("height", totalHeight+"px");

	// INICIAMOS EL COLORPICKER, LLENAMOS LA VARIABLE GLOB DE COLOR POLIGONO
	// Y COLOREAMOS EL POLIGONO (TODO EN UNO)
    $('#colorSelec').ColorPicker({flat: true}).on('click', function(){colorPoligono = $('.colorpicker_hex input:text').val();poligonoNuevoID.setOptions({fillColor: '#'+colorPoligono});});	
    
    $('#modalVP').on('hidden.bs.modal', function (e) {
    	$('#modalMapa').show();
	});
});
// FUNCION MISCELANEA DE CREACION DE FECHA - HORA
var fechaHora;
function fechaHoraFunc(){
	var d = new Date();
	var mes = d.getMonth() + 1;
	d = d.toString().split(' ');
	fechaHora = d[3] + '-' + mes + '-' + d[2] + ' ' + d[4];
	// FORMATO DE FECHA :: AÑO-MES-DIA HORA EJEM- 2017-05-02 10:05:10
}
var fechaHoraFormato;
function fechaHoraFormatear(fecha){
	var meses = ["*","Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
	var dMes = parseInt(fecha.split(" ")[0].split("-")[1]);
	var dDia = parseInt(fecha.split(" ")[0].split("-")[2]);
	var dYear = parseInt(fecha.split(" ")[0].split("-")[0]);
	fechaHoraFormato = parseInt(dDia) + ' de ' + meses[dMes] + ' del ' + dYear;
}
// FIN FUNCION MISCELANEA DE CREACION DE FECHA - HORA


// REAJUSTANDO EL TAMAÑO DEL DIV MAPA
window.onresize = function(event){
	var totalHeight = $(document).height() - 340;
	$('#googleMap').css("height", totalHeight+"px");
}

// ************************************************************
// :::::::::: ******** FUNCIONES DE MAPA ************ :::::::::
var miMapa;
// MANDAMOS LAS COORDENADAS A LAS VAR GLOBALES LON - LAT
var longitudInicial;
var latitudInicial;

//INICIANDO EL MAPA ************** FUNCION PRINCIPAL
function iniciarMapa(){
	// OBTENEMOS LA POSICION INCIAL
	// PARA ECHAR A ANDAR EL MAPA DE GOOGLE
	showSpinner();
	navigator.geolocation.getCurrentPosition(function (pos) {
		latitudInicial = pos.coords.latitude;
		longitudInicial = pos.coords.longitude;
    }, function (error){
        longitudInicial = -103.7314407;
		latitudInicial = 19.237127;
    });
	// INICIAMOS MAPA CON LAS COORDENADAS PREV OBTENIDAS
	// ESPERANDO A OBTENER COORDENADAS
	setTimeout(function(){
		miMapaGlobal = {
			center: new google.maps.LatLng(latitudInicial, longitudInicial),
			zoom: 14,
			mapTypeId: google.maps.MapTypeId.TERRAIN,
		};
		// PINTAMOS MAPA
		var mapa = new google.maps.Map(document.getElementById("googleMap"), miMapaGlobal);
		removeSpinner();
	},200);
}

var dato_evento;
var poligonoCoord = "";
// VARIABLE JSON MOMENTANEA PARA GUARDAR LOS POLIGONOS
var poligonosJSON = {};
var tipoPoligonoSQL;
var coordenadasNuevo = '';
var colorPoligono;
var poligonoNuevoID;
// VARIABLE MAPA GLOBAL
var miMapaGlobal;
var mapaDibujar;
function preparandoMapa(zoomNum, dibujar, declarado){
	// PREPARANDO LA CONFIG DEL MAPA
	if(declarado === false){
		miMapaGlobal = new google.maps.Map(document.getElementById('googleMap'),{zoom: zoomNum,mapTypeId: google.maps.MapTypeId.TERRAIN,fullscreenControl: true,});
		var geoCodigo = new google.maps.Geocoder();
		enviarAddressMapa(geoCodigo, miMapaGlobal);
	}

	// OPCION SI SE REQUIERE CREAR POLIGONO
	if(dibujar === true){
		mapaDibujar = new google.maps.drawing.DrawingManager({
	        drawingMode: null,
	        drawingControl: true,
	        drawingControlOptions: {
	        	position: google.maps.ControlPosition.TOP_CENTER,
	        	drawingModes: ['polygon']
	        }
		});
		mapaDibujar.setMap(miMapaGlobal);
		// OBTENER COORDENADAS DEL POLIGONO DIBUJADO
		google.maps.event.addListener(mapaDibujar, 'overlaycomplete',function(event){
			var JSONcoord = '';
			if(event.type == google.maps.drawing.OverlayType.POLYGON){
				dato_evento = event;
				JSONcoord = event.overlay.getPath(this);
				poligonoNuevoID = event.overlay;

				coordenadasNuevo = '';
				for(i = 0; i < JSONcoord["b"].length; i++){
					if(i > 0){
						coordenadasNuevo += ';';
					}
					coordenadasNuevo+= JSONcoord["b"][i].lat() + ',' + JSONcoord["b"][i].lng();
				}
				tipoGuardado = 'nuevPolig';
				mapaDibujar.setMap(null);
				$.confirm({
			        title: 'Atencion!',
			        content: '¿Desea guardar este poligono de '+tipoPoligonoSQL+'?',
			        confirm: function(){
			        	$('#selecsImportar').hide();
			        	$('#modalMapa').modal('show');
					},
					cancel: function(){
						borrarPoligono(dato_evento);
						mapaDibujar.setMap(miMapaGlobal);
					}
				});
			}
		});
	}
}
// ::::::::::::::::::::::::::::::::::::::::
// FUNCION AJAX GLOBAL GUARDAR POLIGONO
// ::::::::::::::::::::::::::::::::::::::::
function guardarPoligono(){
	fechaHoraFunc();
	var territorio;
	if(tipoPoligonoSQL === 'zonas'){
		territorio = $('#zc_selec_estados').val()+':'+$('#zc_selec_municipio').val()+':'+$('#zc_selec_localidad').val();
	}else{
		territorio = $('#sc_selec_zona').val();
	}
	
	var jsonPoligono = {
		tipo : tipoPoligonoSQL,
		coordenadas: coordenadasNuevo,
		color: colorPoligono,
		nombre: $('#poligonoNombre').val(),
		observaciones: $('#poligonoObserv').val(),
		numvolantes: $('#numVolantes').val(),
		hrsperifoneo: $('#hrsPerifoneo').val(),
		territorioZona: territorio,
		fecharegistro: fechaHora
	};
	$.ajax({
		url:'routes/routePoligonos.php',
		type:'POST',
		data: {info: jsonPoligono, action: 'altaPoligono'},
		dataType:'JSON',
		beforeSend: function(){
			showSpinner();
		},
		error: function(error){
			console.log(error);
			removeSpinner();
		},
		success: function(data){
			$('#modalMapa').modal('hide');
			borrarPoligono(dato_evento);
			limpiarModalInp();
			if(tipoPoligonoSQL === "zonas"){
				var zona = $('#zc_selec_estados').val()+":"+$('#zc_selec_municipio').val()+":"+$('#zc_selec_localidad').val();
				busquedaZonas(zona, 'getZonasCrear', 'routes/routePoligonos.php', function(valor){
					verPoligono('ver', verPoligonoJSON, true, false, false);
				});
				removeSpinner();
			}else if(tipoPoligonoSQL === "seccion"){
				busquedaZonas($('#sc_selec_zona option:selected').attr("name"), 'getZonasSecciones', 'routes/routePoligonos.php', function(valor){
					verPoligono('ver', verPoligonoJSON, true, false, false);
				});
				PNotify.removeAll();
				setTimeout(function(){
					mostrarNumVolHrsPerif();
					new PNotify({
						title: 'Exito!',
						text: 'Poligono de '+ tipoPoligonoSQL + ' guardado',
						type: 'success',
						delay: 6000
					});
					removeSpinner();
				}, 500);
			}
		}
	});
}
// ::::::::::::::::::::::::::::::::::::::::
// FIN FUNCION AJAX GLOBAL GUARDAR POLIGONO
// ::::::::::::::::::::::::::::::::::::::::

// ********* FUNCIONES CON EL MODAL VISTA PREVIA ********
$('#vpPoligono').on('click', function(){
	$('#modalMapa').modal('hide');
	$('#modalVP').modal('show');
});
$('#cerrarVP').on('click', function(){
	$('#modalMapa').modal('show');
	$('#modalVP').modal('hide');
});

// GAURDAR SATISFACTORIAMENTE EL POLIGONO
var tipoGuardado;
$('#guardarPoligono').on('click', function(e){
	if($('#poligonoNombre').val() === ''){
		$('#poligonoNombre').focus();
	}else if($('#poligonoObserv').val() === ''){
		$('#poligonoObserv').focus();
	}else if($('#numVolantes').val() === ''){
		$('#numVolantes').focus();
	}else if($('#hrsPerifoneo').val() === ''){
		$('#hrsPerifoneo').focus();
	}else if(isNaN($('#numVolantes').val())){
		$('#numVolantes').focus();
		$('#numVolantes').val('');
	}else if(isNaN($('#hrsPerifoneo').val())){
		$('#hrsPerifoneo').focus();
		$('#hrsPerifoneo').val('');
	}else if(parseInt($('#numVolantes').val())  <= 0){
		$('#numVolantes').focus();
		$('#numVolantes').val('');
	}else if(parseInt($('#hrsPerifoneo').val()) <= 0){
		$('#hrsPerifoneo').focus();
		$('#hrsPerifoneo').val('');
	}else{
		e.preventDefault();
		if(tipoGuardado === 'nuevPolig'){
			if(tipoPoligonoSQL === 'seccion'){
				if(parseInt($('#numVolantes').val()) > numVolanteoRest){
					msgAbrir("Cantidad incorrecta", "El numero de volantes asignado es mayor al permitido", "error", 7000);
					$('#numVolantes').focus();
				}else if(parseInt($('#hrsPerifoneo').val()) > hrsPerifoneoRest){
					msgAbrir("Cantidad incorrecta", "El tiempo de perifoneo asignado es mayor al permitido", "error", 7000);
					$('#hrsPerifoneo').focus();
				}else{
					guardarPoligono();
				}
			}else{
				guardarPoligono();
			}
		}else if(tipoGuardado === 'importarPolig'){
			if($('#ip_selec_estados').val() === '-1'){
				msgAbrir("Estado!", "Seleccione estado", "error", 5000);
			}else if($('#ip_selec_municipio').val() === '-1'){
				msgAbrir("Municipio!", "Seleccione el municipio", "error", 5000);
			}else if($('#ip_selec_localidad').val() === '-1'){
				msgAbrir("Localidad!", "Seleccione la localidad", "error", 5000);
			}else{
				guardarPoligImportar();
			}
		}
	}
});
// CANCELAR GUARDAR POLIGONO
$('#cancelarPoligono').on('click', function(e){
	$('#modalMapa').modal('hide');
	e.preventDefault();
	borrarPoligono(dato_evento);
	limpiarModalInp();
	if(tipoGuardado === 'nuevPolig'){
		// COLOCAMOS EL MAPA EN LA POSICION TAL Y COMO ESTA
		if(tipoPoligonoSQL === "zonas"){
			var zona = $('#zc_selec_estados').val()+":"+$('#zc_selec_municipio').val()+":"+$('#zc_selec_localidad').val();
			busquedaZonas(zona, 'getZonasCrear', 'routes/routePoligonos.php', function(valor){
				verPoligono('ver', verPoligonoJSON, true, false, false);
			});
		}else if(tipoPoligonoSQL === "seccion"){
			busquedaZonas($('#sc_selec_zona option:selected').attr("name"), 'getZonasSecciones', 'routes/routePoligonos.php', function(valor){
				verPoligono('ver', verPoligonoJSON, true, false, false);
			});
		}
	}else if(tipoGuardado === 'importarPolig'){
		mapaDibujar.setMap(miMapaGlobal);
	}
});
function limpiarModalInp(){
	$('#poligonoNombre').val('');
	$('#poligonoObserv').val('');
	$('#numVolantes').val('');
	$('#hrsPerifoneo').val('');
}
// ******* FIN FUNCIONES CON EL MODAL ******

// FUNCION PARA EDITAR POLIGONO
/*function editarPoligono(poligono){
	var poligonosCord = poligonosJSON[poligono].split(';');
	var coordenadas = [];
	var centro;
	for(i = 0; i < poligonosCord.length; i++){
		coordenadas.push({
			lat: parseFloat(poligonosCord[i].split(',')[0]),
			lng: parseFloat(poligonosCord[i].split(',')[1])
		});
	}

	// CREAMOS EL CENTRO DEL POLIGONO
	var poligCentro = new google.maps.Polygon({ paths: coordenadas });
	centro = centroPoligono(poligCentro);

	var mapa = new google.maps.Map(document.getElementById('googleMap'),{zoom: 15, center: centro,mapTypeId: google.maps.MapTypeId.TERRAIN,});
	var poligonoEditar = new google.maps.Polygon({
		paths: coordenadas,
		strokeOpacity: 0.8,
		strokeWeight: 2,
		fillOpacity: 0.35,
		editable: true,
		draggable:false,
		clickable:true,
	});

	// OBTENEMOS EL AREA DEL POLIGONO
	var area = google.maps.geometry.spherical.computeArea(poligonoEditar.getPath());
	
	// INSERTAMOS UN MARCADOR EN EL CENTRO
	var marcador = new google.maps.Marker({
		position: centro,
		map: mapa,
		title: poligono.toString()
	});

	// CREAMOS UNA VENTANA DE OPCIONES
	var infoVentana = new google.maps.InfoWindow;
	google.maps.event.addListener(marcador, 'click', (function (marker, i){
		return function(){
			infoVentana.setContent(
				'<div id="content">'+
				'<div id="siteNotice">'+
				'</div>'+
				'<center><label id="firstHeading" class="firstHeading text-success">SECCIÓN</label></center>'+
				'<h4 id="firstHeading" class="firstHeading ">Hola</h4>'+
				'<div id="bodyContent">'+
				'<p><span class="text-success"><b>id Zona: <b/></span>ggg</p>'+
				'<p><span class="text-success"><b>Área: <b/></span>'+area.toFixed(2)+' m2</p>'+
				'<p><span class="text-success"><b>Observaciones: <b/></span>oBSERVACION</p>'+
				'<p><span class="text-success"><b>Fecha de creación: <b/></span>Fecha</p>'+
				'</div>'+
				'</div>'
			);
			infoVentana.open(mapa, marker);
		}
	})(marcador, i));

	poligonoEditar.setMap(mapa);

	// GENERANDO LAS NUEVAS COORDENADAS Y ENVIANDOLAS
	// A LA FUNCION aplicarCambios
	google.maps.event.addListener(poligonoEditar.getPath(), 'set_at', aplicarCambios);
	google.maps.event.addListener(poligonoEditar.getPath(), 'insert_at', aplicarCambios);
	var modiPolVentana = new google.maps.InfoWindow;

	// APLICAR CAMBIOS EDICION DE POLIGONO
	function aplicarCambios(){
		var verticesPol = this["b"];
		var nuevasCoord = "";

		// EVITAR REAPAREZCAN MENSAJES MULTIPLES
		modiPolVentana.close();

		$.each(verticesPol, function(i, value){
			if(i > 0){
				nuevasCoord += ";";
			}
			nuevasCoord += this.lat() + "," + this.lng();
			posicion = {lat : this.lat(), lng : this.lng()};
		});

		modiPolVentana.setContent("<h4>¿Desea modificar las coordenadas del polígono? "+
								"<br><span class='text-primary '><center>"+
								poligono + "</span></center></h4><br><center>"+
								"<button class='btn btn-primary' id='btn_confirmar_actualizar'>Confirmar</button> "+
								"<button class='btn btn-danger' id='btn_cancelar_actualizar'>Cancelar</button></center>");
		modiPolVentana.setPosition(posicion);
		modiPolVentana.open(mapa);

		$("#btn_confirmar_actualizar").on('click',function(){
			poligonosJSON[poligono] = nuevasCoord;
			modiPolVentana.close();
		});
		$("#btn_cancelar_actualizar").on('click',function(){
			modiPolVentana.close(this);
        });

	}
}*/

// EL INFOWINDOW TRABAJA DE FORMA DINAMICA, REQUIERE
// VALORES LEIBLES (COMO EN UNA VARIABLE GLOBAL)
var vistaPoligono = [];
var poligonoVer;
var numVolanteo;
var hrsPerifoneo;
// FUNCION VER POLIGONOS (ACCION, COORDS DEL POLIGONO, SI TRAEMOS LA HERR DIBUJAR, SI VAMOS A EDITAR, SI VAMOS A BORRAR)
function verPoligono(tipo, poligono, dibujar, editar, borrar){
	vistaPoligono = []; //alert(JSON.stringify(poligono))
	poligonoVer = {};

	numVolanteo = [];
	hrsPerifoneo = [];
	seccIncluidas = false;
	$.each(poligono, function(p, value){
		var poligonosCord = poligono[p].coords.split(';');
		var colorPolig = "#" + poligono[p].atributos;
		var coordenadas = [];

		for(i = 0; i < poligonosCord.length; i++){
			coordenadas.push({
				lat: parseFloat(poligonosCord[i].split(',')[0]),
				lng: parseFloat(poligonosCord[i].split(',')[1])
			});
		}

		var poligCentro = new google.maps.Polygon({paths: coordenadas});
		var centro = centroPoligono(poligCentro);
		if(p === 0 && multiSeleccion < 1){
			miMapaGlobal = new google.maps.Map(document.getElementById('googleMap'),{zoom: 14, center: centro,mapTypeId: google.maps.MapTypeId.TERRAIN,fullscreenControl: true,});
			if(multiSeleccBandera === true){
				multiSeleccion++;
			}
		}
		// COLOCAR IMAGEN AL POLIGONO, TIPO DE POLIGONO Y COLOR TEXTO AL INFO
		var imagen, colorTxt, idArray;
		if(editar === true){
			imagen = 'images/banderasPolig/editar.png';
			colorTxt = 'info';
			if(poligono[p].tipo === 'seccion'){
				idArray = poligono[p].territorio;
				seccIncluidas = true;
			}
			else if(poligono[p].tipo === 'zona')
				idArray = poligono[p].id;
		}else{
			if(poligono[p].tipo === 'seccion'){
				imagen = 'images/banderasPolig/seccion.png';
				colorTxt = 'primary';
			}else if(poligono[p].tipo === 'zona'){
				imagen = 'images/banderasPolig/zona.png';
				colorTxt = 'success';
			}
		}

		numVolanteo.push([idArray, poligono[p].numvolantes, poligono[p].tipo, poligono[p].id]);
		hrsPerifoneo.push([idArray, poligono[p].hrsperifoneo, poligono[p].tipo, poligono[p].id]);
		
		poligonoVer["pol" + p] = new google.maps.Polygon({
			paths: coordenadas,                        
			fillColor: colorPolig,
			fillOpacity: 0.5,
			strokeColor: '#0000FF',
			strokeOpacity: 0.8,
			strokeWeight: 3,
			editable: editar,
			draggable:false,
			clickable:editar,
			id: poligono[p].id,
			nombre: poligono[p].nombre,
			tipo: poligono[p].tipo,
		});
		
		// OBTENEMOS EL AREA DEL POLIGONO
		var areaPoligono = google.maps.geometry.spherical.computeArea(poligonoVer["pol" + p].getPath());
		// COLOCAMOS SU BANDERA
		var bandera = new google.maps.Marker({
			position: centro,
			map: miMapaGlobal,
			icon: imagen,
			title: poligono[p].nombre
		});

		vistaPoligono.push({
			colorP: colorTxt,
			area: areaPoligono
		});
		// CREAMOS UNA VENTANA DE OPCIONES
		var infoVentana = new google.maps.InfoWindow({ content: '' });
		google.maps.event.addListener(bandera, 'click', (function (bandera, i){
			return function(){
				PNotify.removeAll();
				//if(borrar === true){
					fechaHoraFormatear(poligono[i].fecha_registro);
					var contenido = '<div id="content">'+
						'<div id="siteNotice">'+
						'</div>'+
						'<center><label id="firstHeading" class="firstHeading text-'+vistaPoligono[i].colorP+'">Poligono de '+poligono[i].tipo+'</label></center>'+
						'<h5 id="firstHeading" class="firstHeading ">'+poligono[i].nombre+'</h5>'+
						'<div id="bodyContent">';
						if(editar === true){
							contenido += '<p><span class="text-'+vistaPoligono[i].colorP+'"><b>Área: <b/></span>'+vistaPoligono[i].area.toFixed(2)+' m2</p>'+
									'<p><span class="text-'+vistaPoligono[i].colorP+'"><b>Observaciones: <b/></span>'+poligono[i].observaciones+'</p>'+
									'<p><span class="text-'+vistaPoligono[i].colorP+'"><b>Num. Volanteo: <b/></span><input type="text"id="Mnvol_'+i+'" value="'+numVolanteo[i][1]+'"></p>'+
									'<p><span class="text-'+vistaPoligono[i].colorP+'"><b>Perifoneo (en mins): <b/></span><input type="text"id="Mhper_'+i+'" value="'+hrsPerifoneo[i][1]+'"></p>'+
									'<p><span class="text-'+vistaPoligono[i].colorP+'"><b>Fecha de creación: <b/></span>'+fechaHoraFormato+'</p></div>';
									if(poligono[i].tipo === 'zona'){
										msgCantdsSticker(poligono[i].id, poligono[i].id);
										contenido += '<div onclick="modiValsPolig('+i+",'"+poligono[i].id+"','"+poligono[i].id+"','"+poligono[i].tipo+"'"+')" align="center"><button class="btn btn-xs btn-success">Guardar cambios</button></div>';
									}else if(poligono[i].tipo === 'seccion'){
										msgCantdsSticker(poligono[i].id, poligono[i].territorio)
										contenido += '<div onclick="modiValsPolig('+i+",'"+poligono[i].id+"','"+poligono[i].territorio+"','"+poligono[i].tipo+"'"+')" align="center"><button class="btn btn-xs btn-success">Guardar cambios</button></div>';
									}
									
						}else{
							contenido += '<p><span class="text-'+vistaPoligono[i].colorP+'"><b>Área: <b/></span>'+vistaPoligono[i].area.toFixed(2)+' m2</p>'+
									'<p><span class="text-'+vistaPoligono[i].colorP+'"><b>Observaciones: <b/></span>'+poligono[i].observaciones+'</p>'+
									'<p><span class="text-'+vistaPoligono[i].colorP+'"><b>Num. Volanteo: <b/></span>'+poligono[i].numvolantes+'</p>'+
									'<p><span class="text-'+vistaPoligono[i].colorP+'"><b>Perifoneo (en mins): <b/></span>'+poligono[i].hrsperifoneo+'</p>'+
									'<p><span class="text-'+vistaPoligono[i].colorP+'"><b>Fecha de creación: <b/></span>'+fechaHoraFormato+'</p></div>';
						}
					contenido += '<hr><div onclick="bajaPoligono('+"'"+poligono[i].id+"','"+poligono[i].tipo+"'"+')" align="center"><button class="btn btn-danger">Dar de Baja?</button></div>'+
						'</div>';
					infoVentana.setContent(contenido);
				/*}else{
					infoVentana.setContent(
						'<div id="content">'+
						'<div id="siteNotice">'+
						'</div>'+
						'<center><label id="firstHeading" class="firstHeading text-'+vistaPoligono[i].colorP+'">Poligono de '+poligono[i].tipo+'</label></center>'+
						'<h5 id="firstHeading" class="firstHeading ">'+poligono[i].nombre+'</h5>'+
						'<div id="bodyContent">'+
						'<p><span class="text-'+vistaPoligono[i].colorP+'"><b>Área: <b/></span>'+vistaPoligono[i].area.toFixed(2)+' m2</p>'+
						'<p><span class="text-'+vistaPoligono[i].colorP+'"><b>Observaciones: <b/></span>'+poligono[i].observaciones+'</p>'+
						'<p><span class="text-'+vistaPoligono[i].colorP+'"><b>Fecha de creación: <b/></span>'+poligono[i].fecha_registro+'</p>'+
						'</div>'+
						'</div>'
					);
				}*/
				infoVentana.open(miMapaGlobal, bandera);
			}
		})(bandera, p));

		// PINTAMOS EL POLIGONO EN EL MAPA
		poligonoVer["pol" + p].setMap(miMapaGlobal);

		// CREAMOS EL ELEMENTO DE EDICION (TRUE)
		if(editar === true){
			// GENERANDO LAS NUEVAS COORDENADAS Y ENVIANDOLAS
			// A LA FUNCION aplicarCambios
			google.maps.event.addListener(poligonoVer["pol" + p].getPath(), 'set_at', aplicarCambios);
			google.maps.event.addListener(poligonoVer["pol" + p].getPath(), 'insert_at', aplicarCambios);
			var modiPolVentana = new google.maps.InfoWindow();

			// APLICAR CAMBIOS EDICION DE POLIGONO
			function aplicarCambios(){
				var verticesPol = this["b"];
				var nuevasCoord = "";
				// EVITAR REAPAREZCAN MENSAJES MULTIPLES
				modiPolVentana.close();
				$.each(verticesPol, function(i, value){
					if(i > 0){
						nuevasCoord += ";";
					}
					nuevasCoord += this.lat() + "," + this.lng();
					posicion = {lat : this.lat(), lng : this.lng()};
				});
				var contenido = "<h4>¿Desea modificar las coordenadas del polígono? "+
								"<br><span class='text-"+vistaPoligono[p].colorP+"'><center>"+poligonoVer["pol" + p].nombre+
								"</span></center></h4><br><center>"+
								"<button name='"+poligonoVer["pol" + p].id+":"+poligonoVer["pol" + p].tipo+"' id='btn_confirmar_actualizar' class='btn btn-primary')'>Confirmar</button> "+
								"<button id='btn_cancelar_actualizar' class='btn btn-danger'>Cancelar</button></center>";
				modiPolVentana.setOptions({
					content: contenido
				});
				modiPolVentana.setPosition(posicion);
				modiPolVentana.open(miMapaGlobal);

				$("#btn_confirmar_actualizar").on('click',function(){
					var poligValores = {
						id : $(this).attr("name").split(':')[0],
						tabla : $(this).attr("name").split(':')[1],
						coords : nuevasCoord
					};
					modiPolVentana.close();
					$.ajax({
						url:'routes/routePoligonos.php',
						type:'POST',
						data: {info: poligValores, action: 'editarPoligono'},
						dataType:'JSON',
						beforeSend: function(){
							showSpinner();
						},
						error: function(error){
							console.log(error);
							removeSpinner();
						},
						success: function(data){
							removeSpinner();
						}
					});
				});
				$("#btn_cancelar_actualizar").on('click',function(){
					modiPolVentana.close(this);
		        });
			}
		}
	});
	// CREAMOS EL PANEL DE DIBUJO (SI ESTA TRUE)
	if(dibujar === true){
		preparandoMapa(15, true, true);
	}
	
}

// FUNCION DE CANCELADO DE DIBUJAR EL POLIGONO
function borrarPoligono(evento){
	evento.overlay.setVisible(false);
	dato_evento = "";
		return true;
}
// FUNCION QUE "ELIMINA" POLIGONO (SOLO LO OCULTA - STATUS = 0)
var accionPoligonos;
function bajaPoligono(idPol, tipo){
	var cont , titulo;
	if(tipo === 'zona'){
		$("#bp_selec_zona option[value='"+idPol+"']").remove();
		titulo = 'Atencion!';
		cont = 'Eliminar esta zona, tambien eliminará las secciones unidas a ella...\n¿Desea continuar?';
		tipo = 'zonas';
	}else if(tipo === 'seccion'){
		titulo = 'Advertencia!';
		cont = '¿Desea dar de baja esta seccion?';
	}
	$.confirm({
		title: titulo,
		content: cont,
		confirm: function(){
			var bajaPolig = {
				id: idPol,
				tabla : tipo
			};
			$.ajax({
				url:'routes/routePoligonos.php',
				type:'POST',
				data: {info: bajaPolig, action: 'bajaPoligono'},
				dataType:'JSON',
				beforeSend: function(){
					showSpinner();
				},
				error: function(error){
					console.log(error);
					removeSpinner();
				},
				success: function(data){
					removeSpinner();
					PNotify.removeAll();
					var bool1 = false, bool2 = false, bool3 = false, verpolig = true;
					if(accionPoligonos === "CREAR"){
						bool1 = true, bool2 = false, bool3 = false;
						if(tipoPoligonoSQL === 'zonas'){
							var zonaBaja = $('#zc_selec_estados').val()+":"+$('#zc_selec_municipio').val()+":"+$('#zc_selec_localidad').val();
							busquedaZonas(zonaBaja, 'getZonasCrear', 'routes/routePoligonos.php', function(valor){
								if(jQuery.isEmptyObject(verPoligonoJSON)){
									geoDataCompleto = $('#zc_selec_localidad option:selected').attr("name").replace("*", ", ");
									preparandoMapa(15, false, false);
									verpolig = false;
								}
							});
						}else if(tipoPoligonoSQL === 'seccion'){
							busquedaZonas($('#sc_selec_zona option:selected').attr("name"), 'getZonasSecciones', 'routes/routePoligonos.php', function(valor){
								if(jQuery.isEmptyObject(verPoligonoJSON)){
									geoDataCompleto = $('#sc_selec_estados option:selected').text() + ', ' + $('#sc_selec_municipio option:selected').text();
									preparandoMapa(15, false, false);
									verpolig = false;
								}
							});
							setTimeout(function(){
								if(verpolig === true)
									mostrarNumVolHrsPerif();
							}, 500);
						}
						setTimeout(function(){
							verPoligono('ver', verPoligonoJSON, bool1, bool2, bool3);
						},300);						
					}else if(accionPoligonos === "EDITAR"){
						// ENVIANDO CONFIG PARA PINTAR EL MAPA PARA MUNICIPIOS
						geoDataCompleto = $('#ep_selec_estados option:selected').text() + ', ' + $('#ep_selec_municipio option:selected').text();
						preparandoMapa(15, false, false);
						var territorio = $('#ep_selec_estados').val() + ':' + $('#ep_selec_municipio').val();
						$.ajax({
							url:'routes/routePoligonos.php',
							type:'POST',
							data: {info: territorio, action: 'getZonas'},
							dataType:'JSON',
							error: function(error){
								console.log(error);
							},
							success: function(data){
								$('#ep_selec_zona').html('');
								$('#ep_selec_zona').append('<option value="-1">- Seleccione Zona -</option>');
								if(jQuery.isEmptyObject(data)){
									new PNotify({
									    title: 'Atencion!',
									    text: 'Este municipio no tiene zonas',
									    type: 'error',
									    delay: 8000
									});
								}else{
									// LLENAMOS EL OPTION DE ZONAS
									zonasOptions = '';
									for(i = 0; i < data.length; i++){
										zonasOptions+= "<option value="+data[i]['id']+" name="+'"'+data[i]['territorio']+':'+data[i]['id']+'"'+">"+data[i]['nombre']+"</option>";
									}
									$('#ep_selec_zona').append(zonasOptions);
									comboZonSeccEditar("ep_selec_zona", "edAcoplar", "edSeccion", "editar");
								}
							}
						});
					}else if(accionPoligonos === "CONSULTA"){
						if(antOptSelect.length > 0){
							var antOprAux = [];
							for(i = 0; i < antOptSelect.length;i++){
								if(antOptSelect[i] !== $('#bp_selec_zona option:selected').attr("name"))
									antOprAux.push(antOptSelect[i]);
							}
							antOptSelect = antOprAux;
						}
						comboZonSeccEditar("bp_selec_zona", "borrAcoplar", "borrSeccion", "borrar");
					}
				}
			});
		},
		cancel: function(){			
		}
	});
}
// FUNCION DE MODIFICAR VALORES DEL POLIGONO (UNICAMENTE NUM VOLANTES Y HR DE PERIFONEO)
function msgCantdsSticker(polig, territorio){
	var volanteoSecc = 0;
	var perifoneoSecc = 0;
	var volanteoZona = 0;
	var perifoneoZona = 0;
	for(i = 0; i < numVolanteo.length; i++){
		if(numVolanteo[i][0] === territorio){
			if(numVolanteo[i][2] === 'seccion'){
				volanteoSecc += parseInt(numVolanteo[i][1]);
				perifoneoSecc += parseInt(hrsPerifoneo[i][1]);
			}else if(numVolanteo[i][2] === 'zona'){
				volanteoZona += parseInt(numVolanteo[i][1]);
				perifoneoZona += parseInt(hrsPerifoneo[i][1]);
			}
		}	
	}
	var numVolanteoRest = volanteoZona - volanteoSecc;
	var hrsPerifoneoRest = perifoneoZona - perifoneoSecc;
	new PNotify({
    	title: 'Valores Totales',
    	text: '<b>Num Volanteo: </b>' + volanteoZona + ' - <b>Perifoneo (en mins): </b>' + perifoneoZona +
    		'\n\n<b>Volantes Restantes: </b>' + numVolanteoRest + '\n<b>Perifoneo Restante: </b>' + hrsPerifoneoRest
    		,
		hide: false,
		type: 'info'
	});
}
var seccIncluidas;
function modiValsPolig(id, polig, territorio, tipo){
	if(seccIncluidas === true || $('#edSeccion').prop("checked") === true){
		//alert(polig)
		var nvolInput = parseInt($('#Mnvol_'+id).val());
		var hperInput = parseInt($('#Mhper_'+id).val());

		var volanteoSecc = 0;
		var perifoneoSecc = 0;
		var volanteoSeccCnt = 0;
		var perifoneoSeccCnt = 0;

		var volanteoZona = 0;
		var perifoneoZona = 0;

		for(i = 0; i < numVolanteo.length; i++){
			if(numVolanteo[i][0] === territorio){
				if(numVolanteo[i][2] === 'seccion'){
					volanteoSecc += parseInt(numVolanteo[i][1]);
					perifoneoSecc += parseInt(hrsPerifoneo[i][1]);
					if(numVolanteo[i][3] === polig){
						volanteoSeccCnt = parseInt(numVolanteo[i][1]);
						perifoneoSeccCnt = parseInt(hrsPerifoneo[i][1]);
					}
				}else if(numVolanteo[i][2] === 'zona'){
					volanteoZona += parseInt(numVolanteo[i][1]);
					perifoneoZona += parseInt(hrsPerifoneo[i][1]);
				}
			}	
		}

		var numVolanteoRest = 0;
		var hrsPerifoneoRest = 0;

		var proceder = false;
		if(isNaN(nvolInput) || nvolInput < 0){
			msgAbrir("Cantidad invalida", "Error en la cantidad colocada", "error", 6000);
			$('#Mnvol_'+id).val('');
			$('#Mnvol_'+id).focus();
		}else if(isNaN(hperInput) || hperInput < 0){
			msgAbrir("Cantidad invalidad", "Error en la cantidad colocada", "error", 6000);
			$('#Mhper_'+id).focus();
			$('#Mhper_'+id).focus();
		}else{
			if(tipo === 'zona'){
				numVolanteoRest = (nvolInput - volanteoZona);
				hrsPerifoneoRest = (hperInput - perifoneoZona);

				if((nvolInput < volanteoSecc && numVolanteoRest < 0) || (hperInput < perifoneoSecc && hrsPerifoneoRest < 0)){
					msgAbrir("Cantidad invalida", "No puede colocar una cantidad inferior a la permitida", "error", 7000);
				}else{
					proceder = true;		
				}
			}else if(tipo === 'seccion'){
				numVolanteoRest = volanteoZona - ((volanteoSecc - volanteoSeccCnt) + nvolInput);
				hrsPerifoneoRest = perifoneoZona - ((perifoneoSecc - perifoneoSeccCnt) + hperInput);
				if((nvolInput > volanteoSeccCnt && numVolanteoRest < 0) || (hperInput > perifoneoSeccCnt && hrsPerifoneoRest < 0)){
					msgAbrir("Cantidad invalida", "No puede colocar una cantidad superior a la permitida", "error", 7000);
				}else{
					proceder = true;		
				}
			}

			if(proceder === true){
				var cantsEdit = {
					id: polig,
					volanteo: nvolInput,
					perifoneo: hperInput,
					tabla: tipo
				};
				$.ajax({
					url:'routes/routePoligonos.php',
					type:'POST',
					data: {info: cantsEdit, action: 'editarPoligonoCants'},
					dataType:'JSON',
					beforeSend: function(){
						showSpinner();
					},
					error: function(error){
						console.log(error);
						removeSpinner();
					},
					success: function(data){
						removeSpinner();
						//alert(JSON.stringify(data))
						for(j = 0; j < numVolanteo.length; j++){
							if(numVolanteo[j][3] === polig && numVolanteo[j][2] === tipo){
								numVolanteo[j][1] = nvolInput;
								hrsPerifoneo[j][1] = hperInput;
							}
						}
						PNotify.removeAll();
						msgCantdsSticker(polig, territorio);
					}
				});
			}

		}
	}else{
		msgAbrir("Advertencia", "Incluya las secciones si desea cambiar las cantidades de volanteo y perifoneo", "warning", 9000);
	}
}

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
// FUNCION OBTENER EL CENTRO DEL POLIGONO
function centroPoligono(poligono){
	var bajoX, altoX, bajoY, altoY, lats = [], lngs = [], vertices = poligono.getPath();

    for(var i = 0; i < vertices.length; i++) {
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
// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// ::::::::: ******* FIN FUNCIONES DE MAPA *********** ::::::::


// ::::::: ********** FUNCION DOMGEO ******* :::::::::::
// ********************************************************
var geodataJSON = {};
function traerGEODATA(id, tipo, callback){
	$.ajax({
		url:'routes/routeDomgeo.php',
		type:'POST',
		data: {info: id, action: tipo},
		dataType:'JSON',
		beforeSend: function(){
			showSpinner();
		},
		error: function(error){
			console.log(error);
			removeSpinner();
			callback(false);
		},
		success: function(data){
			removeSpinner();
			geodataJSON = data;
			callback(true);
		}
	});
}
function traerEstados(callback){
	$.ajax({
		url:'routes/routeDomgeo.php',
		type:'POST',
		data: {action: 'edo'},
		dataType:'JSON',
		beforeSend: function(){
			showSpinner();
		},
		error: function(error){
			console.log(error);
			removeSpinner();
			callback(false);
		},
		success: function(data){
			removeSpinner();
			geodataJSON = data;
			callback(true);
		}
	});
}
// ********************************************************
// ::::::: ******** FIN FUNCIONES GEODATA ***** :::::::::::


// :::::::::::::::: SELECTS DE CREAR POLIGONO :::::::::::
var geoDataCompleto;
// LLENAR SELECT "CREAR POLIGONO ZONA
$('#zc_selec_estados').on('change', function(){
	limpiarSelects("zona");
	var idEstado = $(this).val();
	if(idEstado > 0){
		geoDataCompleto = $('#zc_selec_estados option:selected').text();
		preparandoMapa(8, false, false);
		traerGEODATA(idEstado, 'mun', function(){
			// LLENAMOS EL OPTION DE MUNICIPIOS
			for(i = 0; i < geodataJSON.length; i++){
				$('#zc_selec_municipio').append("<option value="+geodataJSON[i]['cveMpo']+">"+geodataJSON[i]['nomMpo']+"</option>");
			}
		});
	}	
});
// LLENAR SELECT "CREAR POLIGONO SECCION
$('#sc_selec_estados').on('change', function(){
	limpiarSelects("seccion");
	var idEstado = $(this).val();
	if(idEstado > 0){
		geoDataCompleto = $('#sc_selec_estados option:selected').text();
		preparandoMapa(8, false, false);
		traerGEODATA(idEstado, 'mun', function(){
			// LLENAMOS EL OPTION DE MUNICIPIOS
			for(i = 0; i < geodataJSON.length; i++){
				$('#sc_selec_municipio').append("<option value="+geodataJSON[i]['cveMpo']+">"+geodataJSON[i]['nomMpo']+"</option>");
			}
		});
	}	
});
// LLENAR SELECT "CREAR POLIGONO ZONA
$('#zc_selec_municipio').on('change', function(){
	var estMuns = {};
	estMuns["edo"] = $('#zc_selec_estados').val();
	estMuns["mun"] = $(this).val();
	if(estMuns["mun"] > 0){
		// ENVIANDO CONFIG PARA PINTAR EL MAPA PARA MUNICIPIOS
		geoDataCompleto = $('#zc_selec_estados option:selected').text() + ', ' + $('#zc_selec_municipio option:selected').text();
		preparandoMapa(15, false, false);
		traerGEODATA(estMuns, 'loc', function(){
			// LLENAMOS EL OPTION DE MUNICIPIOS
			$('#zc_selec_localidad').html('');
			$('#zc_selec_localidad').append('<option value="-1">- Seleccione Localidad -</option>')
			for(i = 0; i < geodataJSON.length; i++){
				$('#zc_selec_localidad').append("<option value="+geodataJSON[i]['cveLoc']+" name="+'"'+geodataJSON[i]['lat']+'*'+geodataJSON[i]['lon']+'"'+">"+geodataJSON[i]['nomLoc']+"</option>");
			}
		});
	}
});

// LLENAR SELECT "CREAR POLIGONO SECCION
$('#sc_selec_municipio').on('change', function(){
	$('#modalMapa').modal('hide');
	PNotify.removeAll();
	var idMun = $('#sc_selec_municipio').val();
	if(idMun > 0){
		// ENVIANDO CONFIG PARA PINTAR EL MAPA PARA MUNICIPIOS
		geoDataCompleto = $('#sc_selec_estados option:selected').text() + ', ' + $('#sc_selec_municipio option:selected').text();
		preparandoMapa(15, false, false);
		var territorio = $('#sc_selec_estados').val() + ':' + $('#sc_selec_municipio').val();
		$.ajax({
			url:'routes/routePoligonos.php',
			type:'POST',
			data: {info: territorio, action: 'getZonas'},
			dataType:'JSON',
			error: function(error){
				console.log(error);
			},
			success: function(data){
				$('#sc_selec_zona').html('');
				$('#sc_selec_zona').append('<option value="-1">- Seleccione Zona -</option>');
				if(jQuery.isEmptyObject(data)){
					new PNotify({
					    title: 'Atencion!',
					    text: 'Este municipio no tiene zonas',
					    type: 'error',
					    delay: 8000
					});
				}else{
					// LLENAMOS EL OPTION DE MUNICIPIOS
					for(i = 0; i < data.length; i++){
						$('#sc_selec_zona').append("<option value="+data[i]['id']+" name="+'"'+data[i]['territorio']+':'+data[i]['id']+'"'+">"+data[i]['nombre']+"</option>");
					}
				}
			}
		});
	}
});

// FUNCION QUE TRAE DATOS DE CONSULTA A ZONAS
var verPoligonoJSON = {};
function busquedaZonas(zona, accion, ruta, callback){
	$.ajax({
		url:ruta,
		type:'POST',
		data: {info: zona, action: accion},
		dataType:'JSON',
		error: function(error){
			console.log(error);
			callback(false);
		},
		success: function(data){
			verPoligonoJSON = data;
			callback(true);
		}
	});
}

// BUSQUEDA DE ZONA AL CAMBIAR SELECT
$('#zc_selec_localidad').on('change', function(){
	var idZona = $('#zc_selec_estados').val()+":"+$('#zc_selec_municipio').val()+":"+$('#zc_selec_localidad').val();
	var idZona2 = $('#zc_selec_localidad').val();
	if(idZona2 > 0){
		busquedaZonas(idZona, 'getZonasCrear', 'routes/routePoligonos.php', function(valor){
			if(jQuery.isEmptyObject(verPoligonoJSON)){
				// ENVIANDO CONFIG PARA PINTAR EL MAPA PARA LOCALIDADES SI
				// LA CONSULTA ESTA VACIA
				geoDataCompleto = $('#zc_selec_localidad option:selected').attr("name").replace("*", ", ");
				preparandoMapa(15, true, false);
			}else{
				// LLENAMOS POLIGONOS PREVIAMENTE CREADOS
				verPoligono('ver', verPoligonoJSON, true, false, false);
			}
		});
	}
});
// BUSQUEDA DE SECCION AL CAMBIAR SELECT
$('#sc_selec_zona').on('change', function(){
	var idZona = $('#sc_selec_zona option:selected').attr("name");
	var idZona2 = $('#sc_selec_zona').val();
	if(idZona2 > 0){
		busquedaZonas(idZona, 'getZonasSecciones', 'routes/routePoligonos.php', function(valor){
			verPoligono('ver', verPoligonoJSON, true, false, false);
		});
		setTimeout(function(){
			mostrarNumVolHrsPerif();
		}, 500);
	}
});
// FUNCION EXCLUSIVA SELEC ZONA - MUESTRA NUM VOLANTES Y HRS PERIFONEO RESTANTES
var numVol;
var hrsPer;
var numVolanteoRest = 0;
var hrsPerifoneoRest = 0;
function mostrarNumVolHrsPerif(){
	var numVolSecciones = 0;
	var hrsPerSecciones = 0;
	for(v = 0; v < numVolanteo.length; v++){
		if(numVolanteo[v][2] === 'zona')
			numVol = parseInt(numVolanteo[v][1]);
		else
			numVolSecciones += parseInt(numVolanteo[v][1]);
	}
	for(p = 0; p < numVolanteo.length; p++){
		if(hrsPerifoneo[p][2] === 'zona')
			hrsPer = parseInt(hrsPerifoneo[p][1]);
		else
			hrsPerSecciones += parseInt(hrsPerifoneo[p][1]);
	}
	numVolanteoRest = numVol - numVolSecciones;
	hrsPerifoneoRest = hrsPer - hrsPerSecciones;
	new PNotify({
    	title: 'Valores Totales',
    	text: '<b>Volanteo: </b>' + numVol + ' - <b>Perifoneo: </b>' + hrsPer +
    		'\n\n<b>Volantes Restantes: </b>' + numVolanteoRest + '\n<b>Hrs Perifoneo Restantes: </b>' + hrsPerifoneoRest
    		,
		hide: false,
		type: 'info'
	});
}

// VARIABLES Y SWITCHES PARA HACER 
// FUNCIONAR LA MULTISELECCION Y NO PINTE VARIAS VECES
// EL POLIGONO
var zonasOptions;
var multiSeleccion = 0;
var multiSeleccBandera = false;
var antOptSelect = [];
// :::::::::::::::: FUNCIONES DE EDITAR POLIGONO :::::::::::
// BUSQUEDA DE MUNS PARA EDITAR
$('#ep_selec_estados').on('change', function(){
	multiSeleccion = 0;
	antOptSelect = [];
	multiSeleccBandera = false;
	limpiarSelects('editar');
	var idEstado = $(this).val();
	if(idEstado > 0){
		geoDataCompleto = $('#ep_selec_estados option:selected').text();
		preparandoMapa(8, false, false);
		traerGEODATA(idEstado, 'mun', function(){
			// LLENAMOS EL OPTION DE MUNICIPIOS
			for(i = 0; i < geodataJSON.length; i++){
				$('#ep_selec_municipio').append("<option value="+geodataJSON[i]['cveMpo']+">"+geodataJSON[i]['nomMpo']+"</option>");
			}
		});
	}	
});
// BUSQUEDA DE ZONA POR MUNICIPIO PARA EDITAR
$('#ep_selec_municipio').on('change', function(){
	multiSeleccion = 0;
	antOptSelect = [];
	multiSeleccBandera = false;
	$('#edSeleccion').bootstrapToggle('off');
	PNotify.removeAll();
	var idMun = $('#ep_selec_municipio').val();
	if(idMun > 0){
		// ENVIANDO CONFIG PARA PINTAR EL MAPA PARA MUNICIPIOS
		geoDataCompleto = $('#ep_selec_estados option:selected').text() + ', ' + $('#ep_selec_municipio option:selected').text();
		preparandoMapa(15, false, false);
		var territorio = $('#ep_selec_estados').val() + ':' + $('#ep_selec_municipio').val();
		$.ajax({
			url:'routes/routePoligonos.php',
			type:'POST',
			data: {info: territorio, action: 'getZonas'},
			dataType:'JSON',
			error: function(error){
				console.log(error);
			},
			success: function(data){
				$('#ep_selec_zona').html('');
				$('#ep_selec_zona').append('<option value="-1">- Seleccione Zona -</option>');
				if(jQuery.isEmptyObject(data)){
					new PNotify({
					    title: 'Atencion!',
					    text: 'Este municipio no tiene zonas',
					    type: 'error',
					    delay: 8000
					});
				}else{
					// LLENAMOS EL OPTION DE ZONAS
					zonasOptions = '';
					for(i = 0; i < data.length; i++){
						zonasOptions+= "<option value="+data[i]['id']+" name="+'"'+data[i]['territorio']+':'+data[i]['id']+'"'+">"+data[i]['nombre']+"</option>";
					}
					$('#ep_selec_zona').append(zonasOptions);
				}
			}
		});
	}
});
// ENVIO DE POLIGONO PARA EDITAR (DEPENDIENDO LAS OPCIONES DE LOS TOGGLES)
$('#ep_selec_zona').on('change', function(){
	if($('#edAcoplar').prop("checked") === true){
		$('#edAcoplar').bootstrapToggle('off');
		antOptSelect = [];
	}
	var idZona = $('#ep_selec_zona option:selected').attr("name");
	var idZona2 = $('#ep_selec_zona').val();
	if(idZona2 > 0){
		var pasar = true;
		if($('#edSeleccion').prop("checked") === true){
			for(p = 0; p < antOptSelect.length; p++){
				if(idZona2 === antOptSelect[p])
					pasar = false;
			}
		}
		if(pasar === true){
			comboZonSeccEditar("ep_selec_zona", "edAcoplar", "edSeccion", "editar");
			antOptSelect.push(idZona2);
		}
	}
});

// TOGGLE QUE TRAE TODAS LAS ZONAS O NO
$('#edAcoplar').on('change', function(){
	var opcion = $(this).prop("checked");
	if(opcion === true){
		antOptSelect = [];
		$('#edSeleccion').bootstrapToggle('off');
		/*$('#ep_selec_zona option').each(function(){
			if($(this).val() !== '-1')
				antOptSelect.push($(this).val());
		});*/
		$("#ep_selec_zona option[value='-1']").prop('selected',true);
		comboZonSeccEditar("ep_selec_zona", "edAcoplar", "edSeccion", "editar");
	}
});
// TOGGLE QUE DEFINE SI TRAE LAS SECCIONES JUNTO A LAS ZONAS
$('#edSeccion').on('change', function(){
	var opcion = $(this).prop("checked");
	if($('#edSeleccion').prop("checked") === true){
		antOptSelect = [];
		multiSeleccBandera = true;
		multiSeleccion = 0;
		$("#ep_selec_zona option[value='-1']").prop('selected',true);
		if($("#ep_selec_zona").val() > 0){
			geoDataCompleto = $('#ep_selec_estados option:selected').text() + ', ' + $('#ep_selec_municipio option:selected').text();
			preparandoMapa(14, false, false);
		}
	}else{
		comboZonSeccEditar("ep_selec_zona", "edAcoplar", "edSeccion", "editar");
	}
});
// TOGGLE QUE PERMITE SELECCION MULTIPLE ZONAS
$('#edSeleccion').on('change', function(){
	var opc = $(this).prop("checked");
	if(opc === true){
		$('#edAcoplar').bootstrapToggle('off');
		$("#ep_selec_zona option[value='-1']").prop('selected',true);

		geoDataCompleto = $('#ep_selec_estados option:selected').text() + ', ' + $('#ep_selec_municipio option:selected').text();
		preparandoMapa(14, false, false);
		antOptSelect = [];
		multiSeleccBandera = true;
		multiSeleccion = 0;

	}else if(opc === false){
		$('#ep_selec_zona').html('');
		$('#ep_selec_zona').append('<option value="-1">- Seleccione Zona -</option>');
		$('#ep_selec_zona').append(zonasOptions);
		antOptSelect = [];
		multiSeleccion = 0;
		multiSeleccBandera = false;
	}
});


// :::::::::::::::: FUNCIONES DE BORRAR POLIGONO :::::::::::
// BUSQUEDA DE MUNS PARA BORRAR
$('#bp_selec_estados').on('change', function(){
	multiSeleccion = 0;
	antOptSelect = [];
	multiSeleccBandera = false;
	limpiarSelects('borrar');
	var idEstado = $(this).val();
	if(idEstado > 0){
		geoDataCompleto = $('#bp_selec_estados option:selected').text();
		preparandoMapa(8, false, false);
		traerGEODATA(idEstado, 'mun', function(){
			// LLENAMOS EL OPTION DE MUNICIPIOS
			for(i = 0; i < geodataJSON.length; i++){
				$('#bp_selec_municipio').append("<option value="+geodataJSON[i]['cveMpo']+">"+geodataJSON[i]['nomMpo']+"</option>");
			}
		});
	}	
});
// BUSQUEDA DE LOCALIDAD POR MUNS PARA BORRAR
$('#bp_selec_municipio').on('change', function(){
	var estMuns = {};
	estMuns["edo"] = $('#bp_selec_estados').val();
	estMuns["mun"] = $(this).val();
	if(estMuns["mun"] > 0){
		// ENVIANDO CONFIG PARA PINTAR EL MAPA PARA MUNICIPIOS
		geoDataCompleto = $('#bp_selec_estados option:selected').text() + ', ' + $('#bp_selec_municipio option:selected').text();
		preparandoMapa(15, false, false);
		traerGEODATA(estMuns, 'loc', function(){
			// LLENAMOS EL OPTION DE MUNICIPIOS
			$('#bp_selec_localidad').html('');
			$('#bp_selec_localidad').append('<option value="-1">- Seleccione Localidad -</option>')
			for(i = 0; i < geodataJSON.length; i++){
				$('#bp_selec_localidad').append("<option value="+geodataJSON[i]['cveLoc']+" name="+'"'+geodataJSON[i]['lat']+'*'+geodataJSON[i]['lon']+'"'+">"+geodataJSON[i]['nomLoc']+"</option>");
			}
			// FUNCION AUX - TRAE ZONAS AL SELEC MUNS (TODAS)
			// UTIL EN CASO DE HABER POCAS ZONAS EN EL MUN
			setTimeout(function(){
				var terr = $('#bp_selec_estados').val() + ':' + $('#bp_selec_municipio').val();
				$.ajax({
					url:'routes/routePoligonos.php',
					type:'POST',
					data: {info: terr, action: 'getZonas'},
					dataType:'JSON',
					error: function(error){
						console.log(error);
					},
					success: function(data){
						$('#bp_selec_zona').html('');
						$('#bp_selec_zona').append('<option value="-1">- Seleccione Zona -</option>');
						if(jQuery.isEmptyObject(data)){
							new PNotify({
							    title: 'Atencion!',
							    text: 'Este municipio no tiene zonas',
							    type: 'error',
							    delay: 8000
							});
						}else{
							// LLENAMOS EL OPTION DE MUNICIPIOS
							zonasOptions = '';
							for(i = 0; i < data.length; i++){
								zonasOptions+= "<option value="+data[i]['id']+" name="+'"'+data[i]['territorio']+':'+data[i]['id']+'"'+">"+data[i]['nombre']+"</option>";
							}
							$('#bp_selec_zona').append(zonasOptions);
						}
					}
				});
			}, 200);
		});
	}
});
// BUSQUEDA DE ZONAS POR LOCALIDAD PARA BORRAR
$('#bp_selec_localidad').on('change', function(){
	multiSeleccion = 0;
	antOptSelect = [];
	multiSeleccBandera = false;
	PNotify.removeAll();
	var idMun = $('#bp_selec_localidad').val();
	if(idMun > 0){
		// ENVIANDO CONFIG PARA PINTAR EL MAPA PARA MUNICIPIOS
		geoDataCompleto = $('#bp_selec_localidad option:selected').attr("name").replace("*", ", ");
		preparandoMapa(15, false, false);
		var territorio = $('#bp_selec_estados').val() + ':' + $('#bp_selec_municipio').val() + ':' + $('#bp_selec_localidad').val();
		$.ajax({
			url:'routes/routePoligonos.php',
			type:'POST',
			data: {info: territorio, action: 'getZonasExact'},
			dataType:'JSON',
			error: function(error){
				console.log(error);
			},
			success: function(data){
				$('#bp_selec_zona').html('');
				$('#bp_selec_zona').append('<option value="-1">- Seleccione Zona -</option>');
				if(jQuery.isEmptyObject(data)){
					new PNotify({
					    title: 'Atencion!',
					    text: 'Esta localidad no tiene zonas',
					    type: 'error',
					    delay: 8000
					});
				}else{
					// LLENAMOS EL OPTION DE MUNICIPIOS
					zonasOptions = '';
					for(i = 0; i < data.length; i++){
						zonasOptions+= "<option value="+data[i]['id']+" name="+'"'+data[i]['territorio']+':'+data[i]['id']+'"'+">"+data[i]['nombre']+"</option>";
					}
					$('#bp_selec_zona').append(zonasOptions);
				}
			}
		});
	}
});

// ENVIO DE POLIGONO PARA BORRAR (DEPENDIENDO LAS OPCIONES DE LOS TOGGLES)
$('#bp_selec_zona').on('change', function(){
	if($('#borrAcoplar').prop("checked") === true){
		$('#borrAcoplar').bootstrapToggle('off');
		antOptSelect = [];
	}
	var idZona = $('#bp_selec_zona option:selected').attr("name");
	var idZona2 = $('#bp_selec_zona').val();
	if(idZona2 > 0){
		var pasar = true;
		if($('#borrSeleccion').prop("checked") === true){
			for(p = 0; p < antOptSelect.length; p++){
				if(idZona2 === antOptSelect[p])
					pasar = false;
			}
		}
		if(pasar === true){
			comboZonSeccEditar("bp_selec_zona", "borrAcoplar", "borrSeccion", "borrar");
			antOptSelect.push(idZona2);
		}		
	}
});
// TOGGLE QUE TRAE TODAS LAS ZONAS O NO
$('#borrAcoplar').on('change', function(){
	var opcion = $(this).prop("checked");
	if(opcion === true){
		$('#borrSeleccion').bootstrapToggle('off');
		antOptSelect = [];
		/*$('#bp_selec_zona option').each(function(){
			if($(this).val() !== '-1')
				antOptSelect.push($(this).val());
		});*/
		$("#bp_selec_zona option[value='-1']").prop('selected',true);
		comboZonSeccEditar("bp_selec_zona", "borrAcoplar", "borrSeccion", "borrar");
	}
});
// TOGGLE QUE DEFINE SI TRAE LAS SECCIONES JUNTO A LAS ZONAS
$('#borrSeccion').on('change', function(){
	if($('#borrSeleccion').prop("checked") === true){
		antOptSelect = [];
		multiSeleccBandera = true;
		multiSeleccion = 0;
		$("#bp_selec_zona option[value='-1']").prop('selected',true);
		if($("#bp_selec_zona").val() > 0){
			geoDataCompleto = $('#bp_selec_estados option:selected').text() + ', ' + $('#bp_selec_municipio option:selected').text();
			preparandoMapa(14, false, false);
		}
	}else{
		comboZonSeccEditar("bp_selec_zona", "borrAcoplar", "borrSeccion", "borrar");
	}
});
// TOGGLE QUE PERMITE SELECCION MULTIPLE ZONAS
$('#borrSeleccion').on('change', function(){
	var opc = $(this).prop("checked");
	if(opc === true){
		$('#borrAcoplar').bootstrapToggle('off');
		$("#bp_selec_zona option[value='-1']").prop('selected',true);
		geoDataCompleto = $('#bp_selec_estados option:selected').text() + ', ' + $('#bp_selec_municipio option:selected').text();
		preparandoMapa(14, false, false);
		antOptSelect = [];
		multiSeleccBandera = true;
		multiSeleccion = 0;
	}else if(opc === false){
		$('#bp_selec_zona').html('');
		$('#bp_selec_zona').append('<option value="-1">- Seleccione Zona -</option>');
		$('#bp_selec_zona').append(zonasOptions);
		antOptSelect = [];
		multiSeleccion = 0;
		multiSeleccBandera = false;
	}
});

function comboZonSeccEditar(idSel, idToggAcoplar, idTogSeccion, accion){
	// VALIDAR SI EL SELECT ZONAS TIENE VALORES
	// Y POR CONSIGUIENTE, EXISTEN ZONAS EN EL MUNICIPIO
	var contarOptions = $('select#'+idSel+' option').length;
	if(contarOptions > 1){
		var sel = $('#'+idSel).val();
		var acoplar = $('#'+idToggAcoplar).prop("checked");
		var secciones = $('#'+idTogSeccion).prop("checked");

		var jsonEnviar = {
			ids : '*',
			terr : '*',
			consulta : '*'
		};
		var idsZonas = '', territorio = '', tipoConsulta = 'NADA';
		$('#'+idSel+' option').each(function(i, value){
			if($(this).val() !== '-1'){
				if(i > 1){
					idsZonas += ',';
					territorio += ',';
				}
				idsZonas += $(this).attr("value");
				territorio += "'" + $(this).attr("name") + "'";
			}
		});

		if(sel > 0 && secciones === true){
			jsonEnviar["ids"] = $('#'+idSel).val();
			jsonEnviar["terr"] = territorio;
			tipoConsulta = 'ZONAYSECCION';
		}else if(sel > 0 && secciones === false){
			jsonEnviar["ids"] = $('#'+idSel).val();
			jsonEnviar["terr"] = '*';
			tipoConsulta = 'ZONA';
		}else if(acoplar === true && secciones === true){
			jsonEnviar["ids"] = idsZonas;
			jsonEnviar["terr"] = territorio;
			tipoConsulta = 'ZONASYSECCIONES';
		}else if(acoplar === true && secciones === false){
			jsonEnviar["ids"] = idsZonas;
			jsonEnviar["terr"] = '*';
			tipoConsulta = 'ZONAS';
		}
		if(tipoConsulta !== "NADA"){
			jsonEnviar["consulta"] = tipoConsulta;
			$.ajax({
				url:'routes/routePoligonos.php',
				type:'POST',
				data: {info: jsonEnviar, action: 'getEdicion'},
				dataType:'JSON',
				beforeSend: function(){
					showSpinner();
				},
				error: function(error){
					console.log(error);
					removeSpinner();
				},
				success: function(data){
					removeSpinner();
					verPoligonoJSON = data;
					if(accion === 'editar'){
						verPoligono('ver', verPoligonoJSON, false, true, false);
					}else if(accion === 'borrar'){
						verPoligono('ver', verPoligonoJSON, false, false, true);
					}else if(accion === 'ver'){
						verPoligono('ver', verPoligonoJSON, false, false, false);
					}
				}
			});
		}
	}
}
// :::::::::::::::::::: FIN FUNCIONES EDITAR POLIGONOS :::::::

// :::::::::::::::: LLENADO DINAMICO MENU :::::::::::::
// ************ SELECCONAR MENU (SECCION O ZONA) *************
$('#crearTipoPoligono').on('change', function(){
	// LLENANDO SELECT DE ESTADOS
	iniciarMapa();
	var dato = '<option value="-1">- Seleccione Estado -</option>';
	traerEstados(function(){
		// LLENAMOS EL OPTION DE ESTADOS
		for(i = 0; i < geodataJSON.length; i++){
			dato += "<option value="+geodataJSON[i]['cveEnt']+">"+geodataJSON[i]['nombent']+"</option>";
		}

		var opcion = $('#crearTipoPoligono').prop("checked");
		setTimeout(function(){
			if(opcion === true){
				$('#crearPoligonoZona').hide();
				$('#crearPoligonoSeccion').show(200);

				$('#sc_selec_estados').html('');
				$('#sc_selec_estados').append(dato);

				tipoPoligonoSQL = "seccion";
			}else if(opcion === false){
				$('#crearPoligonoZona').show(200);
				$('#crearPoligonoSeccion').hide();

				$('#zc_selec_estados').html('');
				$('#zc_selec_estados').append(dato);

				tipoPoligonoSQL = "zonas";
			}
			limpiarSelects("seccion");
			limpiarSelects("zona");
		}, 500);
	});		
});
function limpiarSelects(tipo){
	if(tipo === "seccion"){
		$('#sc_selec_municipio').html('');
		$('#sc_selec_zona').html('');
		$('#sc_selec_municipio').append('<option value="-1">- Seleccione Municipios -</option>');
		$('#sc_selec_zona').append('<option value="-1">- Seleccione Zona -</option>');
	}else if(tipo === "zona"){
		$('#zc_selec_municipio').html('');
		$('#zc_selec_localidad').html('');
		$('#zc_selec_municipio').append('<option value="-1">- Seleccione Municipios -</option>');
		$('#zc_selec_localidad').append('<option value="-1">- Seleccione Localidad -</option>');
	}else if(tipo === "editar"){
		$('#ep_selec_municipio').html('');
		$('#ep_selec_zona').html('');
		$('#ep_selec_municipio').append('<option value="-1">- Seleccione Municipios -</option>');
		$('#ep_selec_zona').append('<option value="-1">- Seleccione Zona -</option>');
	}else if(tipo === "borrar"){
		$('#bp_selec_municipio').html('');
		$('#bp_selec_localidad').html('');
		$('#bp_selec_zona').html('');
		$('#bp_selec_municipio').append('<option value="-1">- Seleccione Municipios -</option>');
		$('#bp_selec_localidad').append('<option value="-1">- Seleccione Localidad -</option>');
		$('#bp_selec_zona').append('<option value="-1">- Seleccione Zona -</option>');
	}else if(tipo === "importar"){
		$('#ip_selec_municipio').html('');
		$('#ip_selec_localidad').html('');
		$('#ip_selec_zona').html('');
		$('#ip_selec_municipio').append('<option value="-1">- Seleccione Municipios -</option>');
		$('#ip_selec_localidad').append('<option value="-1">- Seleccione Localidad -</option>');
		$('#ip_selec_zona').append('<option value="-1">- Seleccione Zona -</option>');
	}

}

// ********** OPCION CREAR POLIGONO *******************
$('#crearPoligono').on('click',function(){
	accionPoligonos = 'CREAR';
	iniciarMapa();
	$('#menuEstructura').show(200);
	$('#menuOpciones').hide(100);
	$('#menuCrearPoligono').fadeIn(200);
	$('#crearTipoPoligono').bootstrapToggle('on');
	$('#tituloOpcion').html('');$('#tituloOpcion').append('Crear Poligono');
});

// ********** OPCION EDITAR POLIGONO *******************
$('#editarPoligonos').on('click',function(){
	accionPoligonos = 'EDITAR';
	iniciarMapa();
	zonasOptions = '';
	$('#menuEstructura').show(200);
	$('#menuOpciones').hide(100);
	$('#menuEditarPoligono').fadeIn(200);
	$('#tituloOpcion').html('');$('#tituloOpcion').append('Editar Poligono');
	$('#edAcoplar').bootstrapToggle('off');
	$('#edSeccion').bootstrapToggle('off');
	$('#edSeleccion').bootstrapToggle('off');
	var dato = '<option value="-1">- Seleccione Estado -</option>';
	traerEstados(function(){
		// LLENAMOS EL OPTION DE ESTADOS
		for(i = 0; i < geodataJSON.length; i++){
			dato += "<option value="+geodataJSON[i]['cveEnt']+">"+geodataJSON[i]['nombent']+"</option>";
		}
		$('#ep_selec_estados').html('');
		limpiarSelects('editar');
		$('#ep_selec_estados').append(dato);
	});
});

// ********** OPCION BORRAR POLIGONO *******************
$('#borrarPoligonos').on('click',function(){
	accionPoligonos = 'CONSULTA';
	iniciarMapa();
	zonasOptions = '';
	$('#menuEstructura').show(200);
	$('#menuOpciones').hide(100);
	$('#menuBorrarPoligono').fadeIn(200);
	$('#tituloOpcion').html('');$('#tituloOpcion').append('Consultar Poligono');
	$('#borrAcoplar').bootstrapToggle('off');
	$('#borrSeccion').bootstrapToggle('off');
	$('#borrSeleccion').bootstrapToggle('off');
	var dato = '<option value="-1">- Seleccione Estado -</option>';
	traerEstados(function(){
		// LLENAMOS EL OPTION DE ESTADOS
		for(i = 0; i < geodataJSON.length; i++){
			dato += "<option value="+geodataJSON[i]['cveEnt']+">"+geodataJSON[i]['nombent']+"</option>";
		}
		$('#bp_selec_estados').html('');
		limpiarSelects('borrar');
		$('#bp_selec_estados').append(dato);
	});
});

// :::::::::::::::: FUNCIONES IMPORTAR POLIGONO ::::::::::::::
// ************** ABRIR MODAL IMPORTAR *********
$('#ImportarPoligonos').on('click',function(){
	$('#modalKML').modal('show');
	$('#archKML').val('');
	$('#nomArchKML').text('No ha elegido su KML');
	var dato = '<option value="-1">- Seleccione Estado -</option>';
	traerEstados(function(){
		// LLENAMOS EL OPTION DE ESTADOS
		for(i = 0; i < geodataJSON.length; i++){
			dato += "<option value="+geodataJSON[i]['cveEnt']+">"+geodataJSON[i]['nombent']+"</option>";
		}
		$('#ip_selec_estados').html('');
		limpiarSelects('importar');
		$('#ip_selec_estados').append(dato);
	});
});

// ******* SELECC TRAER MUNICIPIOS (IMPORTAR) ****
$('#ip_selec_estados').on('change', function(){
	$('#ip_selec_estados').removeClass('invalid');
	limpiarSelects('importar');
	var idEstado = $(this).val();
	if(idEstado > 0){
		//geoDataCompleto = $('#ip_selec_estados option:selected').text();
		//preparandoMapa(8, false, false);
		traerGEODATA(idEstado, 'mun', function(){
			// LLENAMOS EL OPTION DE MUNICIPIOS
			for(i = 0; i < geodataJSON.length; i++){
				$('#ip_selec_municipio').append("<option value="+geodataJSON[i]['cveMpo']+">"+geodataJSON[i]['nomMpo']+"</option>");
			}
		});
	}	
});

// ******* SELECC TRAER LOCALIDADES (IMPORTAR) ****
$('#ip_selec_municipio').on('change', function(){
	$('#ip_selec_municipio').removeClass('invalid');
	var estMuns = {};
	estMuns["edo"] = $('#ip_selec_estados').val();
	estMuns["mun"] = $(this).val();
	if(estMuns["mun"] > 0){
		// ENVIANDO CONFIG PARA PINTAR EL MAPA PARA MUNICIPIOS
		traerGEODATA(estMuns, 'loc', function(){
			// LLENAMOS EL OPTION DE MUNICIPIOS
			$('#ip_selec_localidad').html('');
			$('#ip_selec_localidad').append('<option value="-1">- Seleccione Localidad -</option>')
			for(i = 0; i < geodataJSON.length; i++){
				$('#ip_selec_localidad').append("<option value="+geodataJSON[i]['cveLoc']+" name="+'"'+geodataJSON[i]['lat']+'*'+geodataJSON[i]['lon']+'"'+">"+geodataJSON[i]['nomLoc']+"</option>");
			}
		});
	}	
});
$('#ip_selec_localidad').on('change', function(){
	if($(this).val() !== '-1'){
		latitudImp = parseFloat($('#ip_selec_localidad option:selected').attr("name").split('*')[0]);
		longitudImp = parseFloat($('#ip_selec_localidad option:selected').attr("name").split('*')[1]);
	}
});

// ********* CERRAR MODAL IMPORTAR ***********
$('#cerrarKMLModal').on('click', function(){
	$('#modalKML').modal('hide');
});

// ********** OPCION IMPORTAR POLIGONO *******************
$('#archKML').on('change', function(){
	var archNom = $(this).val().toString().replace(/C:\\fakepath\\/g, '');
	if(archNom === ''){
		$('#nomArchKML').text('No ha elegido su KML');
	}else{
		if(archNom.split('.')[1] !== 'kml'){
			msgAbrir('Error de formato!','El archivo seleccionado no es KML','error', 6000);
			$(this).val('');
		}else{
			$('#nomArchKML').text(archNom);
		}
	}
});

// ************** GUARDAR EL KML EN SERVIDOR PARA SER LEIDO *********
$('#guardarKML').on('click', function(){
	/*if($('#ip_selec_estados').val() === '-1'){
		$('#ip_selec_estados').addClass('invalid');
	}else if($('#ip_selec_municipio').val() === '-1'){
		$('#ip_selec_municipio').addClass('invalid');
	}else if($('#ip_selec_localidad').val() === '-1'){
		$('#ip_selec_localidad').addClass('invalid');
	}else */if($('#nomArchKML').text() === 'No ha elegido su KML'){
		msgAbrir('Atencion','No ha seleccionado el archivo KML','info', 6000);
	}else{
		var archKML = $('#archKML').prop("files")[0];
		var archNom = $('#nomArchKML').text();

		var data = new FormData();
		data.append("archivo", archKML);
		data.append("nombre", archNom);

		$.ajax({
			url: "clases/importarKML.php",
			type: "POST",
			dataType: 'text',
			contentType: false,
			data: data,
			processData: false,
			cache: false,
			beforeSend: function(){
				showSpinner();
			},
			error: function(error){
				console.log(error);
				removeSpinner();
			},
			success: function(data){
				setTimeout(function(){
					leerKML();
					removeSpinner();
					$('#modalKML').modal('hide');
				}, 2000);
			}
		});
	}
});

// ************* FUNCION QUE LEE EL KML (ANTES DE IMPORTAR) ****************
var poligsImportarJSON;
var markrsImportarJSON;
var namesImportarJSON;
function leerKML(){
	poligsImportarJSON = [];
	markrsImportarJSON = [];
	namesImportarJSON = [];
	var archNom = $('#nomArchKML').text();
	$.ajax({
	    type: "GET" ,
	    url: "kmlfiles/" + archNom,
	    dataType: "xml",
	    success: function(xml){
	    	var linkMapa = 'false';
	    	$(xml).find('NetworkLink').each(function (h, net){
	    		$(net).find('Link').each(function (h, link){
	    			linkMapa = $('href', $(this)).text();
	    		});
	    	});
		    	
			if(linkMapa !== 'false'){
				$.ajax({
				    type: "GET" ,
				    url: linkMapa,
				    dataType: "xml",
				    success: function(mapa){
				    	$(mapa).find('Placemark').each(function (h, mark){	    		
				    		$(mark).find('Polygon').each(function (i, polygon){
					    		$(polygon).find('outerBoundaryIs').each(function (j, outer){
					    			$(outer).find('LinearRing').each(function (k, linear){

					    				namesImportarJSON.push($('name', mark).text());
					    				
					    				var arrsCoord = $('coordinates', $(this)).text().toString();
					    				arrsCoord = arrsCoord.replace(/\t/g, '');
					    				if(arrsCoord.indexOf("\n") === 0){
					    					arrsCoord = arrsCoord.replace(/(?:\r\n|\r|\n)/, '!');
						    				arrsCoord = arrsCoord.replace(/!/, '');
					    				}
					    				arrsCoord = arrsCoord.replace(/(?:\r\n|\r|\n)/g, '');
					    				arrsCoord = arrsCoord.replace(/ /g, '');
					    				arrsCoord = arrsCoord.replace(/,0.0/g, ';');
					    				arrsCoord = arrsCoord.replace(/,0/g, ';');
					    				arrsCoord = arrsCoord.slice(0, -1);
					    				arrsCoord = arrsCoord.split(';');
						    			var coordsJSON = [];
						    			for(i = 0; i < arrsCoord.length - 1; i++){
						    				coordsJSON.push({
						    					lat: parseFloat(arrsCoord[i].split(',')[1]),
						    					lng: parseFloat(arrsCoord[i].split(',')[0])
						    				});
						    			}
						    			poligsImportarJSON.push(coordsJSON);
					    			});
					    		});
					    	});
				    	});
				    }
				});

				// VERIFICAMOS SI LA URL SE PUEDE LEER O NO
		    	if(poligsImportarJSON.length > 0){
			    	ImportarPoligonos(poligsImportarJSON, markrsImportarJSON);
		    	}else{
		    		msgAbrir('Error al leer la direccion del KML','Ocurrió un error al leer el KML\n\n- La dirección contiene un KML corrupto\n- El KML de la dirección no contiene poligonos para leer\n- No tiene <b>permisos</b> para leer este achivo KML','error', 19000);
		    	}
			}else{
				// BUSCAMOS LOS POLIGONOS
		    	$(xml).find('Placemark').each(function (h, mark){	    		
		    		$(mark).find('Polygon').each(function (i, polygon){
			    		$(polygon).find('outerBoundaryIs').each(function (j, outer){
			    			$(outer).find('LinearRing').each(function (k, linear){

			    				namesImportarJSON.push($('name', mark).text());
			    				
			    				var arrsCoord = $('coordinates', $(this)).text().toString();
			    				arrsCoord = arrsCoord.replace(/\t/g, '');
			    				if(arrsCoord.indexOf("\n") === 0){
			    					arrsCoord = arrsCoord.replace(/(?:\r\n|\r|\n)/, '!');
				    				arrsCoord = arrsCoord.replace(/!/, '');
			    				}
			    				arrsCoord = arrsCoord.replace(/(?:\r\n|\r|\n)/g, '');
			    				arrsCoord = arrsCoord.replace(/ /g, '');
			    				arrsCoord = arrsCoord.replace(/,0.0/g, ';');
			    				arrsCoord = arrsCoord.replace(/,0/g, ';');
			    				arrsCoord = arrsCoord.slice(0, -1);
			    				arrsCoord = arrsCoord.split(';');
				    			var coordsJSON = [];
				    			for(i = 0; i < arrsCoord.length - 1; i++){
				    				coordsJSON.push({
				    					lat: parseFloat(arrsCoord[i].split(',')[1]),
				    					lng: parseFloat(arrsCoord[i].split(',')[0])
				    				});
				    			}
				    			poligsImportarJSON.push(coordsJSON);
			    			});
			    		});
			    	});
		    	});

				// VERIFICAMOS SI EL KML TIENE O NO POLIGONOS
		    	if(poligsImportarJSON.length > 0){
			    	ImportarPoligonos(poligsImportarJSON, markrsImportarJSON);
		    	}else{
		    		msgAbrir('Error en el KML','Este archivo no contiene ningun poligono','warning', 8000);
		    	}
			}

	    }      
	});
}

// ************* FUNCION DE IMPORTACION DE POLIGONO ********
var poligonoImp;
var ventanaImp;
var markerImp;
var latitudImp;
var longitudImp;
function ImportarPoligonos(poligs, markers){
	miMapaGlobal = new google.maps.Map(document.getElementById('googleMap'), {
		zoom: 14,
		 mapTypeId: google.maps.MapTypeId.ROADMAP,
		 fullscreenControl: true,
	});
	var cont = 0;
	var centrarMap = Math.round(poligs.length / 2) - 1;
	poligonoImp = {};
	ventanaImp = {};
	markerImp = {};
	var icono = 'images/banderasPolig/config.png';
	dataPoligImportar = [];
	$.each(poligs, function (i, coords){
		if(centrarMap === i)
			miMapaGlobal.setCenter(coords[0]);

		poligonoImp[cont] = new google.maps.Polygon({
          paths: coords,
          strokeColor: '#5F5F5F',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: '#E4E4E4',
          fillOpacity: 0.2
        });

        var poligAux = new google.maps.Polygon({ paths: coords });
	    var hubicMarker = centroPoligono(poligAux);

	    markerImp[cont] = new google.maps.Marker({
			position: hubicMarker,
			map: miMapaGlobal,
			icon: icono
		});

		if(namesImportarJSON[i] !== undefined)
			dataPoligImportar.push([cont,namesImportarJSON[i], '', '', '','8a8a8a','sin-asign']);
		else
			dataPoligImportar.push([cont, '', '', '', '','8a8a8a','sin-asign']);

		ventanaImp = new google.maps.InfoWindow({ content: '' });
		google.maps.event.addListener(markerImp[cont], 'click', (function (marcador, i){
			return function(){
				ventanaImp.close();
				ventanaImp.setContent(
						'<div id="content">'+
						'<div id="siteNotice">'+
						'<input id="tit_'+i+'" class="form-control" type="text" value="'+dataPoligImportar[i][1]+'" placeholder="Nombre Seccion..."><p></p>'+
						'<input id="obs_'+i+'" class="form-control" type="text" value="'+dataPoligImportar[i][2]+'" placeholder="Observaciones..."><p></p>'+
						'<input id="nvol_'+i+'" class="form-control" type="text" value="'+dataPoligImportar[i][3]+'" placeholder="N° Volantes..."><p></p>'+
						'<input id="hper_'+i+'" class="form-control" type="text" value="'+dataPoligImportar[i][4]+'" placeholder="Perifoneo (en mins)..."><p></p>'+
						'<div id="seleColor_'+i+'" name="seleColor" style="border-radius: 50%; width: 25px; height: 25px; background-color: #'+dataPoligImportar[i][5]+';"></div>'+
						'</div><br>'+
						'<div id="bodyContent">'+
						'<button class="btn btn-xs btn-success" onclick="datosImportacion('+i+',1)">Guardar poligono</button>'+
						'<br><button class="btn btn-xs btn-info" onclick="datosImportacion('+i+',2)">Guardar como zona</button>'+
						'<br><br><button class="btn btn-xs btn-danger" onclick="deshacerCambiosImp('+i+')">Limpiar cambios</button>'+
						'</div>'
				);
				ventanaImp.open(miMapaGlobal, marcador);
			}
		})(markerImp[cont], cont));

		poligonoImp[cont].setMap(miMapaGlobal);
		cont++;
	});
	mapaDibujar = new google.maps.drawing.DrawingManager({
		drawingMode: null,
		drawingControl: true,
		drawingControlOptions: {
			position: google.maps.ControlPosition.TOP_CENTER,
			drawingModes: ['polygon']
		},
		polygonOptions: {
			fillColor: "#FFFFFF",
			fillOpacity: 0.35
		}
	});
	mapaDibujar.setMap(miMapaGlobal);
	// OBTENER COORDENADAS DEL POLIGONO DIBUJADO
	google.maps.event.addListener(mapaDibujar, 'overlaycomplete',function(event){
		var JSONcoord = '';
		if(event.type == google.maps.drawing.OverlayType.POLYGON){
			dato_evento = event;
			JSONcoord = event.overlay.getPath(this);
			poligonoNuevoID = event.overlay;

			coordenadasNuevo = '';
			for(i = 0; i < JSONcoord["b"].length; i++){
				if(i > 0){
					coordenadasNuevo += ';';
				}
				coordenadasNuevo+= JSONcoord["b"][i].lat() + ',' + JSONcoord["b"][i].lng();
			}
			mapaDibujar.setMap(null);
			tipoGuardado = 'importarPolig';
			$.confirm({
				title: 'Atencion!',
				content: '¿Desea crear esta zona?',
				confirm: function(){
					validandoImportar();
				},
				cancel: function(){
					mapaDibujar.setMap(miMapaGlobal);
					borrarPoligono(dato_evento);
				}
			});
		}
	});
}
// FUNCION QUE TOMA LOS VALORES DEL FORMULARIO DE CADA POLIGONO
var dataPoligImportar;
function datosImportacion(id, zona){
	if($('#tit_' + id).val() === ""){
		msgAbrir("Atencion", "Coloque el NOMBRE", "error", 6500);
	}else if($('#obs_' + id).val() === ""){
		msgAbrir("Atencion", "Coloque la OBSERVACION", "error", 6500);
	}else if($('#nvol_' + id).val() === ""){
		msgAbrir("Atencion", "Coloque el NUMERO VOLANTES", "error", 6500);
	}else if($('#hper_' + id).val() === ""){
		msgAbrir("Atencion", "Coloque el TIEMPO DE PERIFONEO", "error", 6500);
	}else if(isNaN($('#nvol_' + id).val())){
		msgAbrir("Error cantidad", "Cantidad incorrecta", "error", 6500);
		$('#nvol_' + id).val('');
		$('#nvol_' + id).focus();
	}else if(isNaN($('#hper_' + id).val())){
		msgAbrir("Error cantidad", "Cantidad incorrecta", "error", 6500);
		$('#hper_' + id).val('');
		$('#hper_' + id).focus();
	}else if(parseInt($('#nvol_' + id).val()) <= 0){
		msgAbrir("Error cantidad", "Cantidad incorrecta", "error", 6500);
		$('#nvol_' + id).val('');
		$('#nvol_' + id).focus();
	}else if(parseInt($('#hper_' + id).val()) <= 0){
		msgAbrir("Error cantidad", "Cantidad incorrecta", "error", 6500);
		$('#hper_' + id).val('');
		$('#hper_' + id).focus();
	}else{
		var vacio = true;
		if(zona === 2){
			$.confirm({
				title: 'Atencion!',
				content: '¿Desea guardar este poligono como zona?',
				theme: 'light',
				confirm: function(){
					for(i = 0; i < dataPoligImportar.length; i++){
						if(i === id){
							dataPoligImportar[id][1] = $('#tit_' + id).val();
							dataPoligImportar[id][2] = $('#obs_' + id).val();
							dataPoligImportar[id][3] = parseInt($('#nvol_' + id).val());
							dataPoligImportar[id][4] = parseInt($('#hper_' + id).val());
							dataPoligImportar[id][6] = 'asign';
							vacio = false;
						}
					}
					if(vacio === true){
						dataPoligImportar[id].push([$('#tit_'+id).val(), $('#obs_'+id).val(), $('#nvol_'+id).val(), $('#hper_'+id).val()]);
					}
					poligonoImp[id].setOptions({
						fillColor: "#" + dataPoligImportar[id][5]
					});
					var coords = poligonoImp[id].getPath();
					markerImp[id].setOptions({
						icon: 'images/banderasPolig/echo.png'
					});
					idPoligImp = id;
					$('#nombrePoligImp').text($('#tit_' + id).val());
					$('#modalIPZ').modal('show');
					ventanaImp.close();
				},
				cancel: function(){}
			});
		}else{
			for(i = 0; i < dataPoligImportar.length; i++){
				if(i === id){
					dataPoligImportar[id][1] = $('#tit_' + id).val();
					dataPoligImportar[id][2] = $('#obs_' + id).val();
					dataPoligImportar[id][3] = parseInt($('#nvol_' + id).val());
					dataPoligImportar[id][4] = parseInt($('#hper_' + id).val());
					dataPoligImportar[id][6] = 'asign';
					vacio = false;
				}
			}
			if(vacio === true){
				dataPoligImportar[id].push([$('#tit_'+id).val(), $('#obs_'+id).val(), $('#nvol_'+id).val(), $('#hper_'+id).val()]);
			}
			poligonoImp[id].setOptions({
				fillColor: "#" + dataPoligImportar[id][5]
			});
			var coords = poligonoImp[id].getPath();
			markerImp[id].setOptions({
				icon: 'images/banderasPolig/echo.png'
			});
		}
		//alert(poligonoImp[id].getPath()["b"]);
	}
}
function validandoImportar(){
	var numvolantes = 0;
	var hrsperifoneo = 0;
	var asign = false;
	for(i = 0; i < dataPoligImportar.length; i++){
		if(dataPoligImportar[i][6] === 'asign'){
			numvolantes += parseInt(dataPoligImportar[i][3]);
			hrsperifoneo += parseInt(dataPoligImportar[i][4]);
			asign = true;
		}
	}
	if(asign === true){
		$('#selecsImportar').show();
		$('#modalMapa').modal('show');
		$('#numVolantes').val(numvolantes);
		$('#hrsPerifoneo').val(hrsperifoneo);
	}else{
		msgAbrir("Error", "No tiene configurados ningun poligono importado", "error", 8000);
		mapaDibujar.setMap(miMapaGlobal);
		borrarPoligono(dato_evento);
	}
}
// ALTA DE POLIGONOS IMPORTADOS
function guardarPoligImportar(){
	fechaHoraFunc();
	var territorio = $('#ip_selec_estados').val()+':'+$('#ip_selec_municipio').val()+':'+$('#ip_selec_localidad').val();
	
	var jsonPoligono = [];
	if(colorPoligono === undefined)
		colorPoligono = "FFFFFF";
	
	jsonPoligono.push({
		tipo : 'zona',
		coordenadas: coordenadasNuevo,
		color: colorPoligono,
		nombre: $('#poligonoNombre').val(),
		observaciones: $('#poligonoObserv').val(),
		numvolantes: $('#numVolantes').val(),
		hrsperifoneo: $('#hrsPerifoneo').val(),
		territorioZona: territorio,
		fecharegistro: fechaHora
	});

	for(i = 0; i < dataPoligImportar.length; i++){
		if(dataPoligImportar[i][6] === 'asign'){
			var coordsPolig = poligonoImp[i].getPath();
			var coords = '';
			for(j = 0; j < coordsPolig["b"].length; j++){
				if(j > 0){
					coords += ';';
				}
				coords+= coordsPolig["b"][j].lat() + ',' + coordsPolig["b"][j].lng();
			}

			jsonPoligono.push({
				tipo : 'seccion',
				coordenadas: coords,
				color: dataPoligImportar[i][5],
				nombre: dataPoligImportar[i][1],
				observaciones: dataPoligImportar[i][2],
				numvolantes: dataPoligImportar[i][3],
				hrsperifoneo: dataPoligImportar[i][4],
				territorioZona: '*',
				fecharegistro: fechaHora
			});
		}	
	}
	$.ajax({
		url:'routes/routePoligonos.php',
		type:'POST',
		data: {info: jsonPoligono, action: 'altaPoligonoImp'},
		dataType:'JSON',
		beforeSend: function(){
			showSpinner();
		},
		error: function(error){
			console.log(error);
			removeSpinner();
		},
		success: function(data){
			borrarPoligono(dato_evento);
			limpiarModalInp();
			for(p = 0; p < dataPoligImportar.length; p++){
				if(dataPoligImportar[p][6] === 'asign'){
					poligonoImp[p].setMap(null);
					markerImp[p].setMap(null);
					dataPoligImportar[p][6] === 'sin-asign';
				}
			}
			removeSpinner();
			$('#modalMapa').modal('hide');
			PNotify.removeAll();
			new PNotify({
				title: 'Exito!',
				text: 'Poligonos de guardados',
				type: 'success',
				delay: 6000
			});
			mapaDibujar.setMap(miMapaGlobal);
		}
	});
}
// FUNCION GUARDAR POLIGONO COMO ZONA
function guardarPoligImpZona(){
	fechaHoraFunc();
	var territorio = $('#iz_selec_estados').val()+':'+$('#iz_selec_municipio').val()+':'+$('#iz_selec_localidad').val();
	var coordsPolig = poligonoImp[idPoligImp].getPath();
	var coords = '';
	for(j = 0; j < coordsPolig["b"].length; j++){
		if(j > 0){
			coords += ';';
		}
		coords+= coordsPolig["b"][j].lat() + ',' + coordsPolig["b"][j].lng();
	}

	var jsonPoligono = {
		tipo : 'zonas',
		coordenadas: coords,
		color: dataPoligImportar[idPoligImp][5],
		nombre: dataPoligImportar[idPoligImp][1],
		observaciones: dataPoligImportar[idPoligImp][2],
		numvolantes: dataPoligImportar[idPoligImp][3],
		hrsperifoneo: dataPoligImportar[idPoligImp][4],
		territorioZona: territorio,
		fecharegistro: fechaHora
	};

	$.ajax({
		url:'routes/routePoligonos.php',
		type:'POST',
		data: {info: jsonPoligono, action: 'altaPoligonoImpZona'},
		dataType:'JSON',
		beforeSend: function(){
			showSpinner();
		},
		error: function(error){
			console.log(error);
			removeSpinner();
		},
		success: function(data){
			poligonoImp[idPoligImp].setMap(null);
			markerImp[idPoligImp].setMap(null);
			dataPoligImportar[idPoligImp][6] === 'sin-asign';

			removeSpinner();
			$('#modalIPZ').modal('hide');
			new PNotify({
				title: 'Exito!',
				text: 'Poligonos guardado con exito',
				type: 'success',
				delay: 7000
			});
			mapaDibujar.setMap(miMapaGlobal);
		}
	});
}

// FUNCION QUE ELIMINA LOS CAMBIOS DEL POLIG IMPORTADO
var idPoligImp;
function deshacerCambiosImp(id){
	if(id !== 'NONE')
		idPoligImp = id;

	dataPoligImportar[idPoligImp][2] = "";
	dataPoligImportar[idPoligImp][3] = "";
	dataPoligImportar[idPoligImp][4] = "";
	dataPoligImportar[idPoligImp][5] = "8a8a8a";
	dataPoligImportar[idPoligImp][6] = "sin-asign";

	poligonoImp[idPoligImp].setOptions({
		fillColor: "#E4E4E4"
	});
	markerImp[idPoligImp].setOptions({
		icon: 'images/banderasPolig/config.png'
	});

	if(id !== 'NONE')
		ventanaImp.close();
}

// LLENAR SELECTS AL ABRIR EL MODAL DE IMPORTA POLIG COMO ZONA
$('#modalIPZ').on('shown.bs.modal', function(){
	$('#iz_selec_municipio').html('');
	$('#iz_selec_localidad').html('');
	$('#iz_selec_municipio').append('<option value="-1">- Seleccione Municipios -</option>');
	$('#iz_selec_localidad').append('<option value="-1">- Seleccione Localidad -</option>');
	var dato = '<option value="-1">- Seleccione Estado -</option>';
	traerEstados(function(){
		// LLENAMOS EL OPTION DE ESTADOS
		for(i = 0; i < geodataJSON.length; i++){
			dato += "<option value="+geodataJSON[i]['cveEnt']+">"+geodataJSON[i]['nombent']+"</option>";
		}
		$('#iz_selec_estados').html('');
		limpiarSelects('borrar');
		$('#iz_selec_estados').append(dato);
	});
});
// CANCELAR GUARDAR POLIG COMO ZONA
$('#cancelarIPZ').on('click', function(){
	$('#modalIPZ').modal('hide');
	deshacerCambiosImp('NONE');
});

// FUNCION GUARDAR POLIGONO COMO ZONA
$('#guardarIPZ').on('click', function(){
	if($('#iz_selec_estados').val() === '-1'){
		$('#iz_selec_estados').addClass('invalid');
	}else if($('#iz_selec_municipio').val() === '-1'){
		$('#iz_selec_municipio').addClass('invalid');
	}else if($('#iz_selec_localidad').val() === '-1'){
		$('#iz_selec_localidad').addClass('invalid');
	}else{
		$.confirm({
			title: '<b>Revise los datos</b>',
			content: '<b>Estado: </b>' + $('#iz_selec_estados option:selected').text() + '<br><b>Municipio: </b>' + $('#iz_selec_municipio option:selected').text() + '<br><b>Localidad: </b>' + $('#iz_selec_localidad option:selected').text() + '<br><br>¿Desea guardar este poligono como zona?',
			theme: 'light',
			confirm: function(){
				guardarPoligImpZona();
			},
			cancel: function(){}
		});
	}
});


// ******* SELECC TRAER MUNICIPIOS (IMPORTAR) ****
$('#iz_selec_estados').on('change', function(){
	$('#iz_selec_estados').removeClass('invalid');
	$('#iz_selec_municipio').html('');
	$('#iz_selec_municipio').append('<option value="-1">- Seleccione Municipios -</option>');
	var idEstado = $(this).val();
	if(idEstado > 0){
		traerGEODATA(idEstado, 'mun', function(){
			// LLENAMOS EL OPTION DE MUNICIPIOS
			for(i = 0; i < geodataJSON.length; i++){
				$('#iz_selec_municipio').append("<option value="+geodataJSON[i]['cveMpo']+">"+geodataJSON[i]['nomMpo']+"</option>");
			}
		});
	}	
});
// ******* SELECC TRAER LOCALIDADES (IMPORTAR) ****
$('#iz_selec_municipio').on('change', function(){
	$('#iz_selec_municipio').removeClass('invalid');
	var estMuns = {};
	estMuns["edo"] = $('#iz_selec_estados').val();
	estMuns["mun"] = $(this).val();
	if(estMuns["mun"] > 0){
		// ENVIANDO CONFIG PARA PINTAR EL MAPA PARA MUNICIPIOS
		traerGEODATA(estMuns, 'loc', function(){
			// LLENAMOS EL OPTION DE MUNICIPIOS
			$('#iz_selec_localidad').html('');
			$('#iz_selec_localidad').append('<option value="-1">- Seleccione Localidad -</option>')
			for(i = 0; i < geodataJSON.length; i++){
				$('#iz_selec_localidad').append("<option value="+geodataJSON[i]['cveLoc']+" name="+'"'+geodataJSON[i]['lat']+'*'+geodataJSON[i]['lon']+'"'+">"+geodataJSON[i]['nomLoc']+"</option>");
			}
		});
	}	
});
// SOLO REMOVER EL ESTILO ROJO DEL SELECT
$('#iz_selec_localidad').on('change', function(){
	$('#iz_selec_localidad').removeClass('invalid');
});

// SELECCIONADOR DE COLOR DINAMICO
var divSelecColor;
$(document).on('click', 'div[name="seleColor"]', function(){
	divSelecColor = $(this).attr("id");
	var num = divSelecColor.split("_")[1];
	$(this).ColorPicker({
		color: '#' + dataPoligImportar[num][5],
		onShow: function (colpkr){
			$(colpkr).fadeIn(500);
			return false;
		},
		onHide: function (colpkr){
			$(colpkr).fadeOut(500);
			return false;
		},
		onChange: function (hsb, hex, rgb){
			dataPoligImportar[num][5] = hex;
			$('#'+divSelecColor).css('background-color', '#' + dataPoligImportar[num][5]);
		}
	});
});
/*miMapaKML = new google.maps.Map(document.getElementById('googleMap'), {
		zoom: 13,
		center: {lat: 19.8079687, lng: -104.2254672}
	});
	cargarKML(kml, miMapaKML);

var kml = 'http://201.164.199.90/volanteo/kmlfiles/EL_GRULLO.kml';
var miMapaKML;
function cargarKML(url, mapa){
	var kmlPoligono = new google.maps.KmlLayer(url, {
		suppressInfoWindows: false,
		map: mapa
	});
	google.maps.event.addListener(kmlPoligono, 'click', function(event) {
		/*var content = event.featureData.infoWindowHtml;
		var testimonial = document.getElementById('capture');
		testimonial.innerHTML = content;
		var id = this;
		console.log(id);
		console.log(event)
	});
}*/

// ************ MENSAJES DE ERROR (FUNCION RAPIDA) ******
function msgAbrir(titulo, texto, tipo, tiempo){
	new PNotify({
		title: titulo,
		text: texto,
		type: tipo,
		delay: tiempo
	});
}
// ******** OPCION CERRAR MENU Y VOLVER A OPCIONES *****
$("button[name='backOpciones']").click(function(){
	iniciarMapa();
	$('#menuCrearPoligono').hide();
	$('#crearPoligonoSeccion').hide();
	$('#menuEditarPoligono').hide();
	$('#menuBorrarPoligono').hide();
	$('#menuOpciones').show(200);
	$('#menuEstructura').hide(100);
	$('#menuCrearPoligono').hide();
	$('#tituloOpcion').html('');$('#tituloOpcion').append('Menu Poligonos');
});
// ******* FIN OPCION CREAR POLIGONO ****************
// ECHANDO A ANDAR TODO
var url = window.location.pathname;
var folder;
$(function(){
	folder = url.substring(0, url.lastIndexOf('/'));
	showSpinner();
	var totalHeight = $(document).height() - 310;
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
					data: {info: mailJson, action: 'consultarMail'},
					dataType:'json',
					error: function(error){
						console.log(error);
						removeSpinner();
					},
					success: function(data){
						// OBTENEMOS LA POSICION INCIAL
						// PARA ECHAR A ANDAR EL MAPA DE GOOGLE

						if(data === false){
							$('#contenido').append(linkRoto);
							removeSpinner();
						}else if(data["status"] === "CADUCADO"){
							$('#contenido').append(linkCaducado);
							removeSpinner();
						}else if(data["status"] === "ENREVISION"){
							$('#contenido').append(linkRevision);
							removeSpinner();
						}else if(data["status"] === "EDITANDO"){
							$('#contenido').append(linkEditando);
							removeSpinner();
						}else if(data["status"] === "PROVEEDOR"){
							$('#contenido').append(linkProveedor);
							removeSpinner();
						}else if(data["status"] === "COMPLETADO"){
							$('#contenido').append(linkCompleto);
							removeSpinner();
						}else if(data["status"] === "VIGENTE"){
							idSucursalGLOBAL = data["idsucursal"];
							idTrabajoGlobal = data["idtrabajo"];
							idMailGlobal = data["idmail"];

							if(data["LOGIN"] === "ADMIN"){
								btnSAVECONFIG = "Aceptar Propuesta";
							}else if(data["LOGIN"] === "CLIENTE"){
								btnSAVECONFIG = "Guardar Configuracion";
							}

							$('#encabezado').append("Configurar Trabajo - Bienvenido: <span id='nomCliente' class='label label-primary'>" + data["cliente"] + "</span>");
							
							$('#menu').append('<div class="form-group"><div class="col-md-3 col-sm-3 col-xs-12"><h2><label>Tipo de Servicio:&nbsp;&nbsp;</label><span id="tipoServ" style="color: #000000">' + data["tipo"] + '</span></h2></div>'+
								'<div class="col-md-2 col-sm-2 col-xs-12"><h2><label>Total:&nbsp;&nbsp;</label><span id="cantTotal" style="color: #000000">' + data["cantidad"] + '</span></h2></div>'+
								'<div class="col-md-3 col-sm-3 col-xs-12"><h2><label>Total Rest:&nbsp;&nbsp;</label><span id="totalRest" style="color: #000000">' + data["cantidad"] + '</span></h2></div>'+
								'<div class="col-md-4 col-sm-4 col-xs-12"><h2><label>Vigencia:&nbsp;&nbsp;</label><span id="vigenciaTxt" style="color: #000000">' + data["vigencia"] + '</span></h2></div></div>'+
								'<div class="form-group"><div class="col-md-2 col-sm-2 col-xs-12"><input id="cantTienda" onkeyup="restarCant()" type="text" class="form-control" placeholder="Cantidad en tienda..."></div>'+
								'<div class="col-md-3 col-sm-3 col-xs-12"><select onchange="selectMun()" id="estSelect" class="form-control"></select></div>'+
								'<div class="col-md-3 col-sm-3 col-xs-12"><select onchange="selectMunPolig()" id="munsSelect" class="form-control"><option value="-1">- Elige el Municipio -</option></select></div>'+
								'<div class="col-md-3 col-sm-3 col-xs-12"><select onchange="selectZonaPolig()" id="zonaSelect" class="form-control"><option value="-1">- Elige la zona -</option></select></div>'+
								'<div class="col-md-1 col-sm-1 col-xs-12"><button onclick="mostrarResumen(this)" id="btnResumen" value="0" class="btn btn-default"><span class="glyphicon glyphicon-chevron-down"></span></button></div></div>'+
								'<div class="form-group"><div id="trabajosResumen" class="col-md-12 col-sm-12 col-xs-12" hidden><h2>hhh</h2></div></div>');

							var estadosSelec = "<option value='-1'>- Elige el Estado -</option>";
							domgeoGLOBAL = data["DOMGEO"];
							var edos = [];
							$.each(domgeoGLOBAL, function (key, value){
								edos.push(key);
								estadosSelec += "<option value='" + key.split('-')[1] + "'>" + key.split('-')[0] + "</option>";
							});

							$('#estSelect').append(estadosSelec);
							setTimeout(function(){
								$('#googleMap').show(200);
								iniciarMapa();
								poligonosJSON['elementos'] = [];

								accionGuardarEditar = "GUARDAR";
								var cantTiendaEdit = 0;

								if(data["EditVals"].length > 0){
									accionGuardarEditar = "EDITAR";
									$('#totalRest').text('0');
									$.each(data["EditVals"], function (key, arr){
										$.each(arr, function (key2, value){
											var poligData = {
												idpolig: parseInt(value.poligono),
												nompolig: value.nompolig,
												edo: value.estado,
												mun: value.municipio,
												cant: value.cantidad
											};
											poligonosJSON['elementos'].push(poligData);
											cantTiendaEdit = value.cantTienda;
											idConfigTrabajo = value.idconfig;
										});
									});
									$('#cantTienda').val(cantTiendaEdit);
								}
							}, 2000);
							setTimeout(function(){
								dataServerGLOBAL = data;
								todosPoligonos(function(){
									$('#todosPoligonosDiv').show();
									removeSpinner();

									//$('.right_col').css("width", "100%");
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
	}, 1500)
});
// REAJUSTANDO EL TAMAÑO DEL DIV MAPA
window.onresize = function(event){
	var totalHeight = $(document).height() - 310;
	$('#googleMap').css("height", totalHeight+"px");
}
var idSucursalGLOBAL;
var domgeoGLOBAL = {};
var idTrabajoGlobal = '';
var idMailGlobal = '';
var btnSAVECONFIG = "";

var munsEstadoSelec = [];
var consulTotalPolig = "";

var poligonosJSON = [];
// LLENANDO EL SELECT DE MUNICIPIOS
function selectMun(){
	var val = $('#estSelect').val();
	var munsSel = '<option value="-1">- Elige el Municipio -</option>';
	if(val !== '-1'){
		var geo = $('#estSelect option:selected').text();
		geoDataCompleto = geo;
		$.each(domgeoGLOBAL[geo + "-" + val], function (key, value){
			munsSel += '<option value="'+ value.split('-')[1] +'">'+ value.split('-')[0] +'</option>';
		});
		mapaDefault(8, geo);
	}else{
		iniciarMapa();
	}
	$('#munsSelect').html('');
	$('#munsSelect').append(munsSel);
	$('#zonaSelect').html('');
	$('#zonaSelect').append('<option value="-1">- Elige la zona -</option>');
}
// SELECCIONAMOS EL MUNICIPIO Y TRAEMOS POLIGONOS
function selectMunPolig(){
	$('#cantRestante').text('--');
	$('#zonaSelect').html('');
	$('#zonaSelect').append('<option value="-1">- Elige la zona -</option>');

	if($('#munsSelect').val() !== '-1'){
		$('#cantRestante').text($('#munsSelect option:selected').attr("name"));
		var valEstMuns = $('#estSelect').val() + ':' + $('#munsSelect').val();
		showSpinner();
		geoDataCompleto = $('#estSelect option:selected').text() + ', ' + $('#munsSelect option:selected').text();
		var poligs = {
			suc: idSucursalGLOBAL,
			edo: $('#estSelect').val(),
			mun: $('#munsSelect').val()
		};
		$.ajax({
			url:'routes/routeConfigtrabajo.php',
			type:'post',
			data: {info: poligs, action: 'traerPoligMun'},
			dataType:'json',
			error: function(error){
				console.log(error);
				removeSpinner();
			},
			success: function(data){
				console.log(data);
				if(jQuery.isEmptyObject(data)){
					var geo = $('#estSelect option:selected').text() + ', ' + $('#munsSelect option:selected').text();
					mapaDefault(13, geo);
				}else{
					pintarPoligonos(data, 13);
					llenarZonasPolig();
				}
			}
		});
	}else{
		iniciarMapa();
	}
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
function selectZonaPolig(){
	var valZona = $('#zonaSelect').val();
	if(valZona > 0){
		showSpinner();
		$.ajax({
			url:'routes/routeConfigtrabajo.php',
			type:'post',
			data: {info: valZona, action: 'traerPoligZona'},
			dataType:'json',
			error: function(error){
				console.log(error);
				removeSpinner();
			},
			success: function(data){
				pintarPoligonos(data, 10);
				removeSpinner();
			}
		});
	}
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
		}, 800);
	}, 1000);*/

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


// RESTAR CANTIDAD AL COLOCAR CANTIDAD EN INPUT
function restarCant(){
	var restante = parseInt($('#totalRest').text());
	var total = parseInt($('#cantTotal').text());
	var sumatoria = 0;
	var cant = parseInt($('#cantTienda').val());

	$.each(poligonosJSON.elementos, function(i, data){
		sumatoria += parseInt(data.cant);
	});

	var tot = total - (sumatoria + cant);
	$('#totalRest').text(tot);

	if(isNaN(tot)){
		tot = total - (sumatoria + 0);
		$('#totalRest').text(tot);
	}else if(parseInt($('#totalRest').text()) < 0){
		tot = total - (sumatoria + 0);
		$('#totalRest').text(tot);
		$('#cantTienda').val('');
		toast1("Cantidad Incorrecta!", 'La cantidad supera la disponible', 8000, "error");
	}
}

function mostrarResumen(id){
	$('#btnResumen').html('');
	if($(id).val() === '0'){
		$(id).val('1');
		$('#trabajosResumen').show(200);
		$('#btnResumen').append('<span class="glyphicon glyphicon-chevron-up"></span>')
	}else if($(id).val() === '1'){
		$(id).val('0');
		$('#trabajosResumen').hide(200);
		$('#btnResumen').append('<span class="glyphicon glyphicon-chevron-down"></span>')
	}

	var sumatoria = 0;
	var contenido = '<div class="table-responsive"><table class="table table-striped">'+
			'<thead><th>Nombre Seccion</th><th>Cantidad</th><th>Editar</th></thead><tbody>';
	$.each(poligonosJSON.elementos, function(i, data){
		if(data.cant > 0){
			sumatoria += parseInt(data.cant);
			contenido += '<tr><td>'+data.nompolig+'</td><td>'+data.cant+'</td>'+
						'<td><button class="btn btn-xs btn-danger" onclick="quitarPoligonoList('+data.idpolig+','+data.cant+','+data.edo+','+data.mun+')"><span class="fa fa-edit"></span>Quitar</button></td></tr>';
		}
	});
	contenido += "</tbody></table></div><p></p><button onclick='guardarConfig()' class='btn btn-success'><span class='glyphicon glyphicon-floppy-saved'></span>&nbsp;"+btnSAVECONFIG+"</button>";
	if(sumatoria === 0){
		contenido = '<div align="center"><img src="images/sintrabajos.png?' + new Date().getTime() + '">&nbsp;&nbsp;'+
				'<label style="font-size: 20px;">No tiene cantidades asignadas a las secciones.</label></div>';
	}
	$('#trabajosResumen').html('');
	$('#trabajosResumen').append(contenido);
}
// FUNCION DE GUARDADO CONFIG
var accionGuardarEditar;
var configGuardar;
function guardarConfig(){
	if(isNaN($('#cantTienda').val()) || $('#cantTienda').val() === ""){
		$('#cantTienda').val('0');
	}
	var titulo;
	if(accionGuardarEditar === "GUARDAR")
		titulo = 'Decea guardar su configuracion?';
	else if(accionGuardarEditar === "EDITAR")
		titulo = 'Decea guardar los cambios?';

	if(parseInt($('#totalRest').text()) > 0){
		toast1("No puede guardar aún", 'Tiene trabajo por hacer\n<b>Revise "Total Restante"</b>', 8000, "info");
	}else{
		showSpinner();
		configGuardar = {};
		$.confirm({
			title: 'Atencion!',
			content: titulo,
			confirm: function(){
				editarConfig(function(){
					
					var canTienda = $('#cantTienda').val();
					configGuardar = {
						mail: idMailGlobal,
						trabajo: idTrabajoGlobal,
						sucursal: idSucursalGLOBAL,
						cliente: $('#nomCliente').text(),
						cant: $('#cantTotal').text(),
						cantTienda: canTienda,
						vigencia: $('#vigenciaTxt').text(),
						tipo: $('#tipoServ').text(),
						poligs: poligonosJSON.elementos
					};
					
					$.ajax({
						url:'routes/routeConfigtrabajo.php',
						type:'post',
						data: {info: configGuardar, action: 'guardarConfig'},
						dataType:'json',
						error: function(error){
							console.log(error);
							removeSpinner();
						},
						success: function(data){
							$('#contenido').hide(200);
							$('#menu').hide(200);
							$('#encabezado').hide(200);
							$('#todosPoligonos').hide();
							setTimeout(function(){
								$('#contenido').html('');
								$('#contenido').append(exitoMsg);
								removeSpinner();
								$('#contenido').show(200);

								/*if(idConfigTrabajo === ''){
									toast1("Configuracion guardada con exito", "\nSe ha enviado a su correo un enlace con el cual podrá usted editar su trabajo\n\n<b>Si tiene dudas consulte con el administrador del sistema</b>", 17000, "success");
								}*/
								if(data === "CLIENTE"){
									toast1("Configuracion guardada con exito", "\nSu configuracion entrará en proceso de revisión por el administrador.\n\n<b>Si tiene dudas o decea editar su configuración consulte con el administrador del sistema y este le enviará un correo para poder editarlo.</b>", 17000, "success");
								}else if(data === "ADMIN"){
									toast1("Configuracion guardada con exito", "\nLa propuesta ha sido guardada y aceptada con exito.\n\n<b>Pongase en contacto con el cliente para coordinar la actividad.</b>", 17000, "success");
								}
							}, 400);
						}
					});
				});
			},
			cancel: function(){
				removeSpinner();
			}
		});
	}
}
// UTILIZADA UNICAMENTE SI EL TRABAJO SE VA A EDITAR
var idConfigTrabajo = '';
function editarConfig(callback){
	if(accionGuardarEditar === "EDITAR"){
		$.ajax({
			url:'routes/routeConfigtrabajo.php',
			type:'post',
			data: {info: idConfigTrabajo, action: 'restConfig'},
			dataType:'json',
			error: function(error){
				console.log(error);
				removeSpinner();
				callback(false);
			},
			success: function(data){
				callback(true);
			}
		});
	}else{
		callback(true);
	}
}
// FUNCION DE EDICION DE CANTIDAD
function editarCant(id){
	showSpinner();
	$('#estSelect option[value="-1"]').prop("selected", true);
	$('#munsSelect option[value="-1"]').prop("selected", true);
	
	var editarCant = {};
	var dato = [];
	var estado, municipio;
	$.each(poligCantsJSON, function (i, data){
		if(parseInt(data.polig) === parseInt(id)){
			dato.push({
				id: data.polig,
				nombre: data.nombre,
				coords: data.coords,
				atributos: data.atributos,
				observaciones: data.observaciones,
				fecha_registro: data.fecha_registro,
				tipo: data.tipo
			});
			estado = data.est;
			municipio = data.mun;
		}
	});
	$('#estSelect option[value="'+estado+'"]').prop("selected", true);
	
	selectMun();
	$('#munsSelect option[value="'+municipio+'"]').prop("selected", true);
	
	var jsonZonas = $('#estSelect').val() + ':' + $('#munsSelect').val();
	llenarZonasPolig(jsonZonas);

	setTimeout(function(){
		$('#zonaSelect option[value="'+id+'"]').prop("selected", true);
		selectZonaPolig();
	}, 500);

	setTimeout(function(){
		$('#cantRestante').text($('#munsSelect option:selected').attr("name"));
		removeSpinner();
	}, 600);
}

// ::::::::::: FUNCION REENVIO MAIL CLIENTE :::::::}
var url = window.location.pathname;
var folder;

var correoForm = '<!DOCTYPE html>'+
					'<html>'+
					'<head>'+
						'<title>.: - Mail-Format -:.</title>'+
					'</head>'+
					'<body>'+
						'<div style="width: 450px;">'+
							'<div style="background:#fff; border:1px solid #ddd; box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2); margin: 15px 0; overflow:hidden;border-radius:7px;border-color: #428bca;">'+
								'<div style="border-color: transparent #428bca transparent transparent;border-color: rgba(255,255,255,0) #428bca rgba(255,255,255,0) rgba(255,255,255,0);">'+
								'</div>'+
								'<div style="padding:0 20px 10px;">'+
									'<h3 style="font: 21px Helvetica Neue,Helvetica,Arial,sans-serif;">*TITULO*</h3>'+
									'<p style="font: 15px Helvetica Neue,Helvetica,Arial,sans-serif;">*MENSAJE*</p>'+
									'<p style="font: 15px Helvetica Neue,Helvetica,Arial,sans-serif;"><a href="*URL*" style="text-decoration: none;display: inline-block;padding: 5px 9px;padding-top: 5px;margin-bottom: 0;font-size: 12px;line-height: 8px;color: #5e5e5e;text-align: center;vertical-align: middle;cursor: pointer;background-color: #d1dade;-webkit-border-radius: 3px;-webkit-border-radius: 3px;-webkit-border-radius: 3px;background-image: none;border: none;text-shadow: none;box-shadow: none;transition: all 0.12s linear 0s;font: 14px/20px Helvetica Neue,Helvetica,Arial,sans-serif;text-shadow: 0 -1px 0 rgba(0,0,0,0.2);-webkit-box-shadow: inset 0 1px 0 rgba(255,255,255,0.15),0 1px 1px rgba(0,0,0,0.075);box-shadow: inset 0 1px 0 rgba(255,255,255,0.15),0 1px 1px rgba(0,0,0,0.075);*COLOR*" role="button">*ACCION_TRABAJO*</a></p>'+
								'</div>'+
							'</div>'+
						'</div>'+
					'</body>'+
					'</html>';
					
function reenvioMailCliente(id){
	var mensaje = correoForm;
	mensaje = mensaje.replace("*TITULO*", "Apreciable *CLIENTE*");
	mensaje = mensaje.replace("*MENSAJE*", "Se ha estimado que su trabajo requiere ajustes para continuar; contacte con el administrador para recibir instruciones de cuales son los valores que requieren edición. Podrá acceder a editar su trabajo dando click al siguiente botón...");
	mensaje = mensaje.replace("*COLOR*", "color: #fff;background-color: #f0ad4e;border-color: #eea236;");
	mensaje = mensaje.replace("*URL*", "http://" + window.location.hostname + folder + "/configTrabajo.php?user=*IDMAIL*;key=*URL*");
	mensaje = mensaje.replace("*ACCION_TRABAJO*", "Editar Trabajo");

	
	var contMail = {
		cliente: id,
		contenido: mensaje
	};
	$.ajax({
		url:'routes/routeConfigtrabajo.php',
		type:'post',
		data: {info: contMail, action: 'edicionMailCliente'},
		dataType:'json',
		error: function(error){
			console.log(error);
		},
		success: function(data){}
	});
}

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

var linkProveedor = '<div class="col-md-2" style="margin-left: 20%;">'+
					'<img src="images/proveedor.png" style="width: 100px;height: 100px;">'+
					'</div>'+
					'<div class="col-md-6" style="margin-top: 20px;">'+
					'<h3>El trabajo esta siendo configurado por el proveedor.</h3>'+
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

// FUNCION ADICIONAL QUE CONVIERTE LA FECHA DE BD
// EN UNA MAS RECONOCIBLE
var fechaHoraFormato;
function fechaHoraFormatear(fecha){
	var meses = ["*","Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
	var dMes = parseInt(fecha.split(" ")[0].split("-")[1]);
	var dDia = parseInt(fecha.split(" ")[0].split("-")[2]);
	var dYear = parseInt(fecha.split(" ")[0].split("-")[0]);
	fechaHoraFormato = parseInt(dDia) + ' de ' + meses[dMes] + ' del ' + dYear;
}

// ::::::::::::::::: FUNCIONES DE GOOGLE MAPS ::::::::::::::
// *********************************************************
// VARIABLE DE MAPA GLOBAL
var miMapa;
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
		miMapa = {
			center: new google.maps.LatLng(latitudInicial, longitudInicial),
			zoom: 15,
			mapTypeId: google.maps.MapTypeId.TERRAIN,
		};
		// PINTAMOS MAPA
		var mapa = new google.maps.Map(document.getElementById("googleMap"), miMapa);
	},200);
}
// FUNCION QUE MUESTRA EL MAPA SIN POLIGONOS (PARA EVITAR ERRORES)
function mapaDefault(zoom, geoData){
	miMapa = new google.maps.Map(document.getElementById('googleMap'),{zoom: zoom,mapTypeId: google.maps.MapTypeId.TERRAIN,});
	var geoCodigo = new google.maps.Geocoder();
	// SE RECIBE LA VAR GEODATACOMPLETO, RESULTA DE UNIR LOS SELECT
	geoCodigo.geocode({'address': geoData}, function(results, status) {
		if(status === 'OK'){
			miMapa.setCenter(results[0].geometry.location);
			var marker = new google.maps.Marker({
				map: miMapa,
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
				if(parseInt(value.idpolig) === parseInt(elem.id))
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
						perifVolTxt = '<p><span class="text-primary"><b>Perifoneo: (mins)<b/></span>'+elem.hrsperifoneo+'</p>';
					}
					var contenido = '<div id="content"><div id="siteNotice"></div><center><label id="firstHeading">'+elem.nomtxt+'</label></center><br><div id="bodyContent">'+perifVolTxt+'<p><span class="text-primary"><b>Observaciones: <b/></span>'+elem.observaciones+'</p>';
					var cont = 0;
					$(poligonosJSON.elementos).each(function (e, value){
						if(parseInt(value.idpolig) === parseInt(elem.id))
							cont++;
					});

					if(cont < 1){
						contenido += '<button class="btn btn-primary btn-xs" onclick="asignarPoligono('+elem.id+','+"'"+elem.nomtxt+"'"+','+perifVol+')">Elegir zona</button>';
					}else{
						contenido += '<button class="btn btn-warning btn-xs" onclick="quitarPoligono('+elem.id+','+perifVol+')">Quitar zona</button>';
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

	var cantGLOBAL = 0;
	function asignarPoligono(idPolig, nomPolig, cant){
		if(parseInt($('#totalRest').text()) === 0){
			toast1("Error cantidad", "Ha superado la cantidad disponible.", 8000, "error");
		}else if(parseInt(cant) > parseInt($('#totalRest').text())){
			$.confirm({
				title: 'Cantidad insuficiente',
				content: '<b>La cantidad de la zona seleccionada es superior a la restante:</b><br>¿Desea ajustar la cantidad a '+$('#totalRest').text()+'?',
				theme: 'light',
				confirm: function(){
					asignarPoligonoTrue(idPolig, nomPolig, parseInt($('#totalRest').text()));
				},
				cancel: function(){}
			});
		}else{
			asignarPoligonoTrue(idPolig, nomPolig, cant);
		}
	}

	function asignarPoligonoTrue(idPolig, nomPolig, cant){
		cerrarResumen();
		banderaPolig["ban_" + idPolig].setOptions({
			icon: 'images/banderasPolig/echo2.png'
		});
		var poligData = {
			idpolig: idPolig,
			nompolig: nomPolig,
			edo: edoMunGlobal.split(':')[0],
			mun: edoMunGlobal.split(':')[1],
			cant: cant
		};
		poligonosJSON['elementos'].push(poligData);
		$('#totalRest').text( parseInt($('#totalRest').text()) - parseInt(cant) );
		cantGLOBAL = parseInt($('#totalRest').text());
		infoVentana.close();
	}

	// CONJUNTO DE FUNCIONES QUITAR POLIGONO
	function quitarPoligono(idPolig, cant){
		cerrarResumen();
		banderaPolig["ban_" + idPolig].setOptions({
			icon: 'images/banderasPolig/plus.png'
		});
		$.each(poligonosJSON.elementos, function (key, value){
			if(parseInt(value.idpolig) === parseInt(idPolig)){
				$('#totalRest').text( parseInt($('#totalRest').text()) + parseInt(value.cant) );
				cantGLOBAL = parseInt($('#totalRest').text());
			}
		});
		poligonosJSON.elementos.quitarElemento('idpolig', idPolig);
		infoVentana.close();
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
						quitarPoligono(idPolig, cant);
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
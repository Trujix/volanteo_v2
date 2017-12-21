// VARIABLES INICIALES GLOBALES DE URL (CONFIGURACION DE TRABAJO)
var url = window.location.pathname;
var folder;
var idUser;
var tipoUser;
var keyUser;
$(function(){
	// TRAER LOS CATALOGOS leerCatalogos(2);
	showSpinner();
	folder = url.substring(0, url.lastIndexOf('/'));

	var param1 = leerCookie('alterego');
	var param2 = leerCookie('key');

	// LLENADO DE VARIABLES GLOBALES DE DATOS DE LOGIN
	keyUser = param2;
	idUser = leerCookie('idusuario');
	tipoUser = leerCookie('tipo');
	if(param1 !== undefined && param2 !== undefined){
		$('#headerClientes').html('');
		$('#headerClientes').text('Historial de Trabajos');

		$('#contenidoWeb').html('');
		$('#contenidoWeb').append();

		param1 = param1.replace('%40', '@');
		llenarData(idUser, tipoUser);
	}else{
		document.cookie = "alterego=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/";
		document.cookie = "key=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/";
		window.location = 'index.php';
	}
});

// FUNCIONES CON BOTONES 
$(document).on('click', '#configuracion', function(){
	$('#headerClientes').html('');
	$('#headerClientes').text('Configuracion');

	$('#contenidoWeb').html('');
	$('#contenidoWeb').append(llenadoConfig);
});

$(document).on('click', '#trabajos', function(){
	$('#headerClientes').html('');
	$('#headerClientes').text('Historial de Trabajos');

	$('#contenidoWeb').html('');
	if(tipoUser === "clientes"){
		listadoTrabajoCliente();
	}else if(tipoUser === "bloques"){
		listadoTrabajoBloque();
	}else if(tipoUser === "sucursales"){
		listadoTrabajoSucursal();
	}else if(tipoUser === "proveedores"){
		listadoTrabajoProvs();
	}
});

$(document).on('click', '#cerrarRol', function(){
	$('#modalRoles').modal('hide');
});
// FIN DE FUNCION DE BOTONES


// FUNCION PRINCIPAL SI ES CORRECTO LOS DATOS DE INICIO DE SESION
var idClienteGLOBAL;
function llenarData(usuario, tipo){
	idClienteGLOBAL = usuario;
	var campo = "";
	if(tipo === "clientes"){
		campo = "idcliente";
	}else if(tipo === "bloques"){
		campo = "idbloque";
	}else if(tipo === "sucursales"){
		campo = "idsucursal";
	}else if(tipo === "proveedores"){
		campo = "idproveedor";
	}
	var dataCliente = {
		id: usuario,
		tipo: tipo,
		campo: campo
	};
	$.ajax({
		url:'routes/routeFormcliente.php',
		type:'post',
		data: {action: 'traerData', info: dataCliente},
		dataType:'json',
		error: function(error){
			toast1("Error!", "Ocurrió un error, intentelo mas tarde o pongase en contacto con el administrador", 4000, "error")
			removeSpinner();
		},
		success: function(data){
			//console.log(data);
			var persona = "encargado";
			removeSpinner();
			if(tipo === "clientes"){
				listadoTrabajoCliente();
			}else if(tipo === "bloques"){
				listadoTrabajoBloque();
			}else if(tipo === "sucursales"){
				listadoTrabajoSucursal();
			}else if(tipo === "proveedores"){
				listadoTrabajoProvs();
				persona = "nombre";
			}
			$('#clienteNom').append(data[0][persona]);
		}
	});
}

// :::::::: ************* NUEVOS LISTADOS AGREGADOS (CLIENTES - BLOQUES - SUCURSAL)
function listadoTrabajoCliente(){
	$.ajax({
		url:'routes/routeFormcliente.php',
		type:'post',
		data: {action: 'clientesTrabs', info: idClienteGLOBAL},
		dataType:'json',
		error: function(error){
			toast1("Error!", "Ocurrió un error, intentelo mas tarde o pongase en contacto con el administrador", 4000, "error");
			// $.dreamAlert.close()
		},
		success: function(data){
			console.log(data);
			if(data != ""){
				var acordeon = '<div id="accordion" role="tablist" aria-multiselectable="true">';
				for (var i = 0; i < data.length; i++) {
					var text = "";
					var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
					for(var r = 0; r < 6; r++) {
					    text += possible.charAt(Math.floor(Math.random() * possible.length));
					}
					acordeon += '<div class="card">'+
							    '<div align="left" class="card-header" role="tab" id="heading'+text+'">'+
							      '<h4 class="mb-0">'+
							        '<a data-toggle="collapse" data-parent="#accordion" onclick="mostrarSucursales('+ "'" + text + "'" +','+data[i].idtrabajo+')" href="#collapse'+text+'" aria-expanded="false" aria-controls="collapse'+text+'">'+
							          "Trabajo N° " + data[i].idtrabajo + " - " + data[i].alias + " - " + data[i].nombre + 
								        '</a>'+
								      '</h4>'+
								    '</div>'+
								    '<div id="collapse'+text+'" class="collapse" role="tabpanel" aria-labelledby="heading'+text+'">'+
								      '<div class="card-block">'+
								      	'<div id="tablaSucs'+text+'" class="table-responsive"></div>'+
								      '</div>'+
								    '</div>'+
							  '</div>';
				}
				acordeon += '</div>';
				$('#contenidoWeb').html('');
				$('#contenidoWeb').append(acordeon);
			}else{
				$('#contenidoWeb').empty();
				toast1("Atencion!", "No hay datos para mostrar", 8000, "error");
			}
		}
	});
}
// :::::::: ************* NUEVOS LISTADOS AGREGADOS (CLIENTES - BLOQUES - SUCURSAL)
function listadoTrabajoBloque(){
	$.ajax({
		url:'routes/routeFormcliente.php',
		type:'post',
		data: {action: 'clientesBloques', info: idClienteGLOBAL},
		dataType:'json',
		error: function(error){
			toast1("Error!", "Ocurrió un error, intentelo mas tarde o pongase en contacto con el administrador", 4000, "error");
			// $.dreamAlert.close()
		},
		success: function(data){
			console.log(data);
			if(data != ""){
				var acordeon = '<div id="accordion" role="tablist" aria-multiselectable="true">';
				for (var i = 0; i < data.length; i++) {
					var text = "";
					var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
					for(var r = 0; r < 6; r++) {
					    text += possible.charAt(Math.floor(Math.random() * possible.length));
					}
					acordeon += '<div class="card">'+
							    '<div align="left" class="card-header" role="tab" id="heading'+text+'">'+
							      '<h4 class="mb-0">'+
							        '<a data-toggle="collapse" data-parent="#accordion" onclick="mostrarSucursales('+ "'" + text + "'" +','+data[i].idtrabajo+')" href="#collapse'+text+'" aria-expanded="false" aria-controls="collapse'+text+'">'+
							          "Trabajo N° " + data[i].idtrabajo + " - " + data[i].alias +
								        '</a>'+
								      '</h4>'+
								    '</div>'+
								    '<div id="collapse'+text+'" class="collapse" role="tabpanel" aria-labelledby="heading'+text+'">'+
								      '<div class="card-block">'+
								      	'<div id="tablaSucs'+text+'" class="table-responsive"></div>'+
								      '</div>'+
								    '</div>'+
							  '</div>';
				}
				acordeon += '</div>';
				$('#contenidoWeb').html('');
				$('#contenidoWeb').append(acordeon);
			}else{
				$('#contenidoWeb').empty();
				toast1("Atencion!", "No hay datos para mostrar", 8000, "default");
			}
		}
	});
}
// :::::::: ************* NUEVOS LISTADOS AGREGADOS (CLIENTES - BLOQUES - SUCURSAL)
function listadoTrabajoSucursal(){
	$.ajax({
		url:'routes/routeFormcliente.php',
		type:'post',
		data: {action: 'clientesSucursales', info: idClienteGLOBAL},
		dataType:'json',
		error: function(error){
			toast1("Error!", "Ocurrió un error, intentelo mas tarde o pongase en contacto con el administrador", 4000, "error");
			// $.dreamAlert.close()
		},
		success: function(data){
			console.log(data);
			var tabla = "";
			$.each(data, function (val, key){
				var accionBtn = "";
				if(key.tipo === "Perifoneo")
					accionBtn = "accionTrabPerif";
				else
					accionBtn = "accionTrab";

				var estilo = "";
				var boton = "";
				if(key.status === "1" || key.status === "3"){
					estilo = "success";
					boton = '<button onclick="accionTrab(' + key.idtrabajo+ ',' + key.idsucursal + ','+ "'configurarTrab'" + ')" class="btn btn-xs btn-default">&nbsp;<span class="glyphicon glyphicon-cog"></span>&nbsp;Config/Editar Trabajo&nbsp;</button>';
				}else if(key.status === "6"){
					estilo = "success";
					boton = '<button class="btn btn-xs btn-success" onclick="verEstadistica('+key.idtrabajo+',' + key.idsucursal + ')"><span class="fa fa-area-chart"></span> Trab. Iniciado</button>';
				}else if(key.status === "7"){
					estilo = "active";
					boton = '<button class="btn btn-xs btn-primary">Completado</button>';
				}else{
					estilo = "warning";
					boton = '<button class="btn btn-xs btn-warning">En Revisión</button>';
				}
				tabla += '<tr class="' + estilo + '"><td>' + key.idtrabajo + '</td><td>' + key.alias + '</td><td id="tipo_' + key.idtrabajo + '">' + key.tipo + '</td><td>' + key.vigencia + '</td><td>' + boton + '</td><td><button class="btn btn-xs btn-primary" onclick="' + accionBtn + '(' + key.idtrabajo + ',' + key.idsucursal + ',' + "'detallesTrab'" + ')">Detalle</button></td><td><button class="btn btn-xs btn-info" onclick="showLvl2(' + key.idtrabajo + ',' + key.idsucursal + /*',' + "'detallesTrab'" + */')">Seguimiento</button></td></tr>';
			});
			$('#contenidoWeb').html('');
			$('#contenidoWeb').append(llenadoTrabajos);
			$('#tbody2').append(tabla);
		}
	});
}


// FUNCION QUE MUESTRA LAS SUCURSALES - (EXCLUSIVO DE CLIENTES)
function mostrarSucursales(id, idTrabajo){
	$('.collapse').collapse('hide');
	$('#collapse'+id).collapse('show');

	$.ajax({
		url:'routes/routeFormcliente.php',
		type:'post',
		async: true,
		data: {info: idTrabajo, action: 'sucursalesCliente'},
		dataType:'JSON',
		beforeSend: function(){
			$('#tablaSucs'+id).html('');
			$('#tablaSucs'+id).hide();
			var tabla = tablaSucursales.replace("*ID*", id);
			$('#tablaSucs'+id).append(tabla);
		},
		error: function(error){
			console.log(error);
			toast1("Error!", ajaxError, 8000, "error");
		},
		success: function(data){
			console.log(data);
			if(data != ""){
				var tabla = "";
				$.each(data, function (val, key){
					var accionBtn = "";
					if(key.tipo === "Perifoneo")
						accionBtn = "accionTrabPerif";
					else
						accionBtn = "accionTrab";

					var estilo = "";
					var boton = "";
					if(key.status === "1" || key.status === "3"){
						estilo = "success";
						boton = '<button onclick="accionTrab(' + key.idtrabajo+ ',' + key.idsucursal + ','+ "'configurarTrab'" + ')" class="btn btn-xs btn-default">&nbsp;<span class="glyphicon glyphicon-cog"></span>&nbsp;Config/Editar Trabajo&nbsp;</button>';
					}else if(key.status === "6"){
						estilo = "success";
						boton = '<button class="btn btn-xs btn-success" onclick="verEstadistica('+key.idtrabajo+',' + key.idsucursal +')"><span class="fa fa-area-chart"></span> Trab. Iniciado</button>';
					}else if(key.status === "7"){
						estilo = "active";
						boton = '<button class="btn btn-xs btn-primary">Completado</button>';
					}else{
						estilo = "warning";
						boton = '<button class="btn btn-xs btn-warning">En Revisión</button>';
					}
					tabla += '<tr class="' + estilo + '"><td>' + key.nombre + '</td><td>' + key.cantidad + '</td><td id="tipo_' + key.idtrabajo + '">' + key.tipo + '</td><td>' + key.vigencia + '</td><td>' + boton + '</td><td><button class="btn btn-xs btn-primary" onclick="' + accionBtn + '(' + key.idtrabajo + ',' + key.idsucursal + ',' + "'detallesTrab'" + ')">Detalle</button></td><td><button class="btn btn-xs btn-info" onclick="showLvl2(' + key.idtrabajo + ',' + key.idsucursal + /*',' + "'detallesTrab'" + */')">Seguimiento</button></td></tr>';
				});
				$('#sucs'+id).html('');
				$('#sucs'+id).append(tabla);
				setTimeout(function(){
					$('#tablaSucs'+id).show(200);
				}, 200);
			}else{
				toast1("Atencion!", "No hay datos para mostrar\n\n<b>Pongase en contacto con el administrador para revisar el avanze de este trabajo.</b>", 8000, "default");
			}
		}
	});
}



// FUNCION MANDAR CONDIGURAR TRABAJO
var rolesJSON;
function accionTrab(id, suc, accion){
	showSpinner();
	rolesJSON = {};
	impresionDetalleIDTRAB = id;
	impresionDetalleIDSUC = suc;
	var datTrab = {
		trab: id,
		suc: suc
	};
	$.ajax({
		url:'routes/routeFormcliente.php',
		type:'post',
		data: {action: accion, info: datTrab},
		dataType:'json',
		error: function(error){
			toast1("Error!", "Ocurrió un error, intentelo mas tarde o pongase en contacto con el administrador", 4000, "error")
			removeSpinner();
			// $.dreamAlert.close()
		},
		success: function(data){
			console.log(data);
			/*if(data.length > 0){
				
			}else{
				toast1("Atención!", "Aún no puede configurar su trabajo.\n<b>Consulte con el administrador para más información.</b>\n\nDetalle: <b>Faltan sucursales por configurar<b>", 12000, "info");
			}*/
			if(accion === 'configurarTrab'){
				if($('#tipo_' + id).text() === "Volanteo"){
					window.open('http://' + window.location.hostname + folder + '/configTrabajo.php?user='+data[0].id+';key='+data[0].url + ';sucId=' + suc, '_blank');
				}else if($('#tipo_' + id).text() === "Perifoneo"){
					window.open('http://' + window.location.hostname + folder + '/configTrabajoPerif.php?user='+data[0].id+';key='+data[0].url + ';sucId=' + suc, '_blank');
				}
				removeSpinner();
			}else if(accion === 'detallesTrab'){
				if(data === "SINCONFIGURAR"){
					toast1("Atención!", "El trabajo no ha sido configurado aún", 6000, "info");
					removeSpinner();
				}else{
					rolesJSON = data;

					// CONTENIDO DE MODAL
					var cuerpoRol = "";

					var clienteJSON = rolesJSON["cliente"];
					var detallesJSON = rolesJSON["detalles"];
					var horariosJSON = rolesJSON["horarios"];
					for(c = 0; c < clienteJSON.length; c++){
						// CREACION DE ELEMENTOS DINAMICOS PARA MODAL
						cuerpoRol += '<div class="row">'+
						'<div class="col-md-3"><b>Cliente: </b>' + clienteJSON[c]["encargado"] + '</div>'+
						'<div class="col-md-3"><b>Alias: </b>' + clienteJSON[c]["alias"] + '</div>'+
						'<div class="col-md-3"><b>Cant. Tienda: </b>' + clienteJSON[c]["cantTienda"] + '</div>'+
						'<div class="col-md-3"><b>Cant. Total: </b>' + clienteJSON[c]["cantidad"] + '</div>'+
						'</div>'+
						'<div class="row">'+
						'<div class="col-md-3"><b>Tipo: </b>' + clienteJSON[c]["tipo"] + '</div>'+
						'<div class="col-md-9"><b>Vigencia: </b>' + clienteJSON[c]["vigencia"] + '</div>'+
						'</div>';
					}

					cuerpoRol += '<h4>Detalles de Trabajo</h4><div class="table-responsive"><table class="table table-bordered"><thead>'+
							'<tr><th>Cant.</th><th>Estado</th><th>Municipio</th><th>Nom. Zona</th><th>Proveedor(es)</th></tr><tbody>';

					for(d = 0; d < detallesJSON.length; d++){
						cuerpoRol += '<tr><td>' + detallesJSON[d]["cantidad"] + '</td>'+
						'<td>' + detallesJSON[d]["Estado"] + '</td>'+
						'<td>' + detallesJSON[d]["Municipio"] + '</td>'+
						'<td>' + detallesJSON[d]["Localidad"] + '</td>'+
						'<td>' + detallesJSON[d]["NomProvs"] + '</td></tr>';
					}
					cuerpoRol += '</tbody></table></div><h4>Propuesta de proveedor(es)</h4>'+
							'<div class="table-responsive"><table class="table table-bordered"><thead>'+
							'<tr><th>Proveedor</th><th>Fecha Inicio</th><th>Fecha término</th></tr><tbody>';

					for(h = 0; h < horariosJSON.length; h++){
						cuerpoRol += '<tr><td>' + horariosJSON[h]["NomProv"] + '</td>'+
						'<td>' + horariosJSON[h]["inicio"] + '</td>'+
						'<td>' + horariosJSON[h]["fin"] + '</td>';
					}

					cuerpoRol += '</tbody></table></div>';

					$('#cuerpoRoles').html('');
					$('#cuerpoRoles').append(cuerpoRol);
					$('#tituloRoles').html('');
					$('#tituloRoles').append('Descripcion de Trabajo - N°: '+ id);
					PNotify.removeAll();
					removeSpinner();
					$('#modalRoles').modal('show');
				}
			}
		}
	});
}

// PROPIEDADES DE CLIENTE
// LOGOFF
$(document).on('click', '#logoff', function(){
	document.cookie = "alterego=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/";
	document.cookie = "key=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/";
	window.location = 'index.php';
});

function leerCookie(nombre){
  var value = "; " + document.cookie;
  var parts = value.split("; " + nombre + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}

// *****::::::::::::: REVISION DE ESTADISTICAS DE TRABAJO
function verEstadistica(idTrab, idSuc){
	var contenido = "";
	var est = {
		serv: idTrab,
		suc: idSuc
	};
	showSpinner();
	$.ajax({
		url:'routes/routeFormcliente.php',
		type:'post',
		data: {info: est ,action: 'getEstadistica'},
		dataType:'json',
		error: function(error){
			console.log(error);
			removeSpinner();
		},
		success: function(data){
			console.log(data)
			var porcentaje = 100 / data.length;
			var valorBarra = 0;
			var tabla = "";
			// CREACION DECORATIVA DEL COLOR DE LA BARRA
			var estilo = "";
			var num = Math.floor((Math.random() * 5) + 1);
			if(parseInt(num) === 1)
				estilo = "success";
			else if(parseInt(num) === 2)
				estilo = "info";
			else if(parseInt(num) === 3)
				estilo = "primary";
			else if(parseInt(num) === 4)
				estilo = "warning";
			else if(parseInt(num) === 5)
				estilo = "danger";

			$.each(data, function (val, key){
				tabla += '<tr><td>' + key.nombre + '</td><td>' + key.txtsucursal + '</td>';
				if(parseInt(key.status) === 0){
					valorBarra += parseFloat(porcentaje);
					tabla += '<td><span class="label label-success">Terminado</span></td>';
				}else if(parseInt(key.status) === 1){
					tabla += '<td><span class="label label-default">Sin terminar</span></td></tr>';
				}else if(parseInt(key.status) === 2){
					tabla += '<td><span class="label label-info">En proceso</span></td></tr>';
				}
			});
			contenido = '<div class="panel panel-default">'+
							'<div class="panel-body">'+
								'<p><b>NOTA: </b>Los valores mostrados estan sujetos a cambios conforme los proveedores vayan iniciando las labores de entrega de volanteo/perifoneo. Consulte con el administrador para más información.</p>'+
								'<div class="table-responsive">'+
									'<table class="table table-bordered">'+
										'<thead><tr><th>Proveedor</th><th>Sucursal</th><th>Status</th></tr></thead>'+
										'<tbody>'+tabla+'</tbody>'+
									'</table>'+
								'</div>'+
								'<p><b>Porcentaje de progreso: </b>'+valorBarra.toFixed(2)+'%</p>'+
								'<div class="progress">'+
									'<div class="progress-bar progress-bar-'+estilo+' progress-bar-striped active" role="progressbar" aria-valuenow="'+parseFloat(valorBarra)+'" aria-valuemin="0" aria-valuemax="100" style="width: '+parseFloat(valorBarra)+'%"></div>'+
								'</div>'+
								'<button onclick="cerrarEstadistica()" class="btn btn-xs btn-primary">Cerrar ventana</button>'+
							'</div>'+
						'</div>';

			PNotify.removeAll();
			new PNotify({
			    title: 'Progreso de trabajo N° ' + idTrab,
			    text: contenido,
			    hide: false,
			    width: '600px'
			});
			removeSpinner();
		}
	});
}
function cerrarEstadistica(){
	PNotify.removeAll();
}

// :::::::::::::::::::::::::::::::::: ********* :::::::::::::::
//            FUNCIONES DE SEGUIMIENTO                      :::
// :::::::::::::::::::::************** ::::::::::::::::::::::::

	var ajaxError = "Ocurrió un error, intentelo mas tarde o pongase en contacto con el administrador";


	function showPhotos(id_service){
		window.location = "formCliente.php?opt=evidencias&serv="+id_service;
	}


	function showLvl1(idTabla){
		$.ajax({
			url:'routes/routeFormcliente.php',
			type:'post',
			async: true,
			data: {info: idClienteGLOBAL, action: 'lvl1'},
			dataType:'JSON',
			beforeSend: function(){
				showSpinner();
			},
			error: function(error){
				console.log(error);
				toast1("Error!", ajaxError, 8000, "error");
				removeSpinner();
			},
			success: function(data){
				removeSpinner();
				if(data != ""){
					var tbody = '';
					for (var i = 0; i < data.length; i++) {
						tbody += '<tr>'+
									'<td>' + data[i].id_service + '</td>'+
									'<td>' + data[i].nombre + '</td>'+
									'<td>' + data[i].periodoini + ' - ' + data[i].periodofin + '</td>'+
									'<td>'+
										'<a href="#" onclick="showLvl2(' + data[i].id_service + ')" class="btn btn-info btn-xs">'+
											'<i class="fa fa-eye"></i> Ver detalle '+
										'</a>'+
									'</td>'+
									'<td>'+
										'<a href="#" onclick="showPhotos(' + data[i].id_service + ')" class="btn btn-info btn-xs">'+
											'<i class="fa fa-eye"></i> Ver detalle '+
										'</a>'+
									'</td>'+
								  '</tr>';
					}
					$('#segu'+idTabla).empty();
					$('#segu'+idTabla).append(tbody);
				}
				else{
					$('#segu'+idTabla).empty();
					$('#segu'+idTabla).empty();
					toast1("Atencion!", "No hay datos para mostrar", 8000, "error");
				}
			}
		}); //fin ajax

	}

	function showLvl2(idTrab, idSuc){
		var lvl2Data = {
			trab: idTrab,
			suc: idSuc
		};
		$.ajax({
			url:'routes/routeFormcliente.php',
			type:'post',
			async: true,
			data: {info: lvl2Data, action: 'lvl2'},
			dataType:'JSON',
			beforeSend: function(){
				showSpinner();
			},
			error: function(error){
				console.log(error);
				toast1("Error!", ajaxError, 8000, "error");
				removeSpinner();
			},
			success: function(data){
				removeSpinner();
				if(data != ""){
					var acordeon = '<div id="accordion" role="tablist" aria-multiselectable="true">';
					for (var i = 0; i < data.length; i++) {
						var text = "";
						var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
						for(var r = 0; r < 6; r++) {
						    text += possible.charAt(Math.floor(Math.random() * possible.length));
						}
						acordeon += '<div class="card">'+
									    '<div align="center" class="card-header" role="tab" id="heading'+text+'">'+
									      '<h4 class="mb-0">'+
									        '<a data-toggle="collapse" data-parent="#accordion" onclick="showLvl2_2('+ "'" + text + "'" +','+data[i].id_proveedor+','+idSuc+')" href="#collapse'+text+'" aria-expanded="false" aria-controls="collapse'+text+'">'+
									          data[i].proveedor +
									        '</a>'+
									      '</h4>'+
									    '</div>'+
									    '<div id="collapse'+text+'" class="collapse" role="tabpanel" aria-labelledby="heading'+text+'">'+
									      '<div class="card-block">'+
									      	'<div id="tablaProvs'+text+'" class="table-responsive"></div>'+
									      '</div>'+
									    '</div>'+
									  '</div>';
					}
					acordeon += '</div>';

					$('#title_lvl2').html('Proveedores del servicio no. '+idTrab);
					$('#accordionDiv').html('');
					$('#accordionDiv').append(acordeon);
				}else{
					$('#accordionDiv').empty();
					toast1("Atencion!", "No hay datos para mostrar", 8000, "info");
				}

				$('#modal_lvl2').modal('show');
			}
		});
	}

	function showLvl2_2(id, idProv, idSuc){
		$('.collapse').collapse('hide');
		$('#collapse'+id).collapse('show');

		idlvl2 = {
			prov: idProv,
			serv: $('#title_lvl2').text().split('no. ')[1],
			suc: idSuc
		};
		$.ajax({
			url:'routes/routeFormcliente.php',
			type:'post',
			async: true,
			data: {info: idlvl2, action: 'showLvl2_2'},
			dataType:'JSON',
			beforeSend: function(){
				$('#tablaProvs'+id).html('');
				$('#tablaProvs'+id).hide();
				idProvTodos = "";
				idServiceTodos = "";
			},
			error: function(error){
				console.log(error);
				toast1("Error!", ajaxError, 8000, "error");
			},
			success: function(data){
				idProvTodos = idProv;
				if(data != ""){
					var tabla = '<table class="table table-striped"><thead>'+
						'<tr><th><span class="fa fa-tablet"></span> DISPOSITIVO</th><th>OPCIONES</th></tr><tbody>';
					for(i = 0; i < data.length; i++){
						idServiceTodos = data[i].id_service;
						tabla += '<tr>'+
									'<td>' + data[i].id_device + '</td>'+
									'<td>'+
										'<a href="#" onclick="showLvl3(\'' + data[i].id_device + '\', \'' + data[i].id_service + '\')" class="btn btn-info btn-xs">'+
											'<i class="fa fa-tablet"></i> Ver detalle '+
										'</a>'+
									'</td>'+
								  '</tr>';
					}
					tabla += '</tbody></table>';
					$('#tablaProvs'+id).append(tabla);
					setTimeout(function(){
						$('#tablaProvs'+id).show(200);
					}, 200);
				}else{
					toast1("Atencion!", "No hay datos para mostrar", 8000, "info");
				}
			}
		});
	}

	function showLvl3(id_device, id_service){
		showMap(id_device, id_service, 'map', 'lvl3');
	}

	var idProvTodos = "";
	var idServiceTodos = "";
	function showlvl3_todos(){
		if(idProvTodos !== '' && idServiceTodos !== ''){
			var servicio = $('#title_lvl2').text().split('no. ')[1];
			showMap(idProvTodos, servicio, 'map', 'lvl3_todos');
		}else{
			toast1("Atencion!", "Despliegue un supervisor para mostrar sus dispositivos.", 8000, "error");
		}
	}

// :::::::::::: ****** MAPA ****** ::::::::::::::::::::::
var map;
	var pinColor;
	var markers = new Array();
	var lineas;
	var poligonos= new Array(); //sirve para guardar vertices de un poligono
	var clasepoligono;
	var polig_rojo;
	var error = "Ocurrió un error inesperado, por favor intentelo mas tarde o pongase en contacto con el administrador";

	var puntos_adentro;
	
	function showMap(id_device, id_service, idMap, accion) {
		var latlng;
		// OBTENCIÓN DE LOS GEOPUNTOS
		$.ajax({
			url:'routes/routeFormcliente.php',
			type:'post',
			async: false,
			data: {info: {id_device: id_device, id_service: id_service}, action: accion},
			dataType:'JSON',
			beforeSend: function(){
				showSpinner();
			},
			error: function(error){
				console.log(error);
				toast1("Error!", error, 8000, "error");
				removeSpinner();
			},
			success: function(data){
				console.log(data)
				removeSpinner();
				if(data.length > 0){

					if(data.length > 1)
						var puntoMedio = Math.round(data.length / 2);
					else
						var puntoMedio = 0;

					console.log(data[puntoMedio].latitud+','+data[puntoMedio].longitud);
					latlng = new google.maps.LatLng(data[puntoMedio].latitud,data[puntoMedio].longitud);

					//Opciones del mapa
			        var options = {
			        	zoom: 13, 
			        	scrollwheel: true, 
			        	center: latlng,
			        	mapTypeId: google.maps.MapTypeId.TERRAIN
			        };
			        //Creación del mapa
					map = new google.maps.Map(document.getElementById(idMap), options);

					///LINEAS
					lineas = new google.maps.Polyline({
					  strokeOpacity: 1.0,
					  strokeWeight: 3
					});

					lineas.setMap(map);

					addMarkers(data);
				}
				else{
					$('#map').append('<div class="col-md-12">'+
					                    '<div class="col-md-2" style="margin-left: 20%;">'+
					                      '<img src="images/folder2.png" style="width: 100px;height: 100px;">'+
					                    '</div>'+
					                    '<div class="col-md-6" style="margin-top: 20px;">'+
					                      '<h3>No encontramos ninguna geopunto asignada a este cliente</h3>'+
					                    '</div>'+
					                 '</div>');
				}

			}
		}); //fin ajax

		$('#modal_lvl3').modal('show');
		$("#modal_lvl3").on("shown.bs.modal", function () {
			google.maps.event.trigger(map, "resize");
			map.setCenter(latlng);

		});
	}

	function deleteMarkers() {
		clearMarkers();
		markers = [];
	}

	function addMarkers(data){

		var latLng;
	  	var path_ = lineas.getPath();
		deleteMarkers();
		path_.clear();
		
		var color="#"+((1<<24)*Math.random()|0).toString(16);

		for (var i = 0; i < data.length; i++) {

			if(data[i].latitud != "" && data[i].longitud != "")
				latLng = new google.maps.LatLng(parseFloat(data[i].latitud),parseFloat(data[i].longitud));	

				// console.log(data[i].latitud,data[i].longitud);
				// console.log(latLng);
			
			var marker = new google.maps.Marker({
				position: latLng,
				map: map,
				// icon: 'http://maps.google.com/mapfiles/dir_84.png'
				icon:'http://maps.google.com/mapfiles/kml/shapes/placemark_circle_highlight.png'
			});
			markers.push(marker);

			lineas.setOptions({strokeColor:color});	

			path_.push(latLng);
		}
	
	}

	// Removes the markers from the map, but keeps them in the array.
	function clearMarkers() {
		setMapOnAll(null);
	}

	// Sets the map on all markers in the array.
	function setMapOnAll(map) {
		for (var i = 0; i < markers.length; i++) {
		    markers[i].setMap(map);
		}
	}


// ::::::::: ************************ :::::::::::
//                VALORES DINAMICOS          ::::
// ::::::::::: ***************** ::::::::::::::::
var llenadoSeguimiento = '<div id="tableContainer" class="x_content table-responsive">'+
					'<table class="table table-striped projects">'+
                     ' <thead id="thead">'+
                       ' <tr>'+
                          '<th>NO. TRABAJADOR</th>'+
                          '<th>CLIENTE</th>'+
                          '<th>VIGENCIA</th>'+
                          '<th>OPCIONES</th>'+
                        '</tr>'+
                      '</thead>'+
                      '<tbody id="tbody">'+
                      '</tbody>'+
                  	'</table>'+
                 '</div>';

var llenadoTrabajos = '<div id="tableContainer" class="x_content table-responsive">'+
					'<table class="table table-striped projects">'+
                     ' <thead id="thead">'+
                       ' <tr>'+
                          '<th>ID TRAB.</th>'+
                          '<th>DESCRIP.</th>'+
                          '<th>TIPO</th>'+
                          '<th>VIGENCIA</th>'+
                          '<th>STATUS</th>'+
                          '<th>&nbsp;&nbsp;&nbsp;<span class="glyphicon glyphicon-zoom-in"></span></th>'+
                        '</tr>'+
                      '</thead>'+
                      '<tbody id="tbody2">'+
                      '</tbody>'+
                  	'</table>'+
                 '</div>';

var tablaSucursales = '<div id="tableContainer" class="x_content table-responsive">'+
					'<table class="table table-striped projects">'+
                     ' <thead id="thead">'+
                       ' <tr>'+
                          '<th>SUCUR.</th>'+
                          '<th>CANT.</th>'+
                          '<th>TIPO</th>'+
                          '<th>VIGENCIA</th>'+
                          '<th>STATUS</th>'+
                          '<th>&nbsp;&nbsp;&nbsp;<span class="fa fa-reorder"></span></th>'+
                          '<th>&nbsp;&nbsp;&nbsp;<span class="fa fa-globe"></span></th>'+
                        '</tr>'+
                      '</thead>'+
                      '<tbody id="sucs*ID*">'+
                      '</tbody>'+
                  	'</table>'+
                 '</div>';

var tablaSeguimiento = '<div id="tableContainer" class="x_content table-responsive">'+
					'<table class="table table-striped projects">'+
                     ' <thead id="thead">'+
                       ' <tr>'+
                          '<th>ID</th>'+
                          '<th>SUCUR.</th>'+
                          '<th>VIGENCIA</th>'+
                          '<th>OPCIONES</th>'+
                        '</tr>'+
                      '</thead>'+
                      '<tbody id="segu*ID*">'+
                      '</tbody>'+
                  	'</table>'+
                 '</div>';

var tablaProvs = '<div id="tableContainer" class="x_content table-responsive">'+
					'<table class="table table-striped projects">'+
                     ' <thead id="thead">'+
                       ' <tr>'+
                          '<th>SUCUR.</th>'+
                          '<th>CANT.</th>'+
                          '<th>TIPO</th>'+
                          '<th>VIGENCIA</th>'+
                          '<th>CONFIG</th>'+
                          '<th>&nbsp;&nbsp;&nbsp;<span class="fa fa-reorder"></span></th>'+
                          '<th>&nbsp;&nbsp;&nbsp;<span class="fa fa-globe"></span></th>'+
                        '</tr>'+
                      '</thead>'+
                      '<tbody id="sucs*ID*">'+
                      '</tbody>'+
                  	'</table>'+
                 '</div>';

var llenadoConfig = '<div id="tableContainer" class="x_content table-responsive">'+
						'<h4>Cambiar contraseña</h4>'+
						'<div class="col-md-4"><div class="input-group">'+
					      '<input id="txtAntPass" type="password" class="form-control pass" placeholder="Coloque la antigua contraseña...">'+
					      '<span class="input-group-btn">'+
					        '<button class="btn btn-default ver" idtxt="txtAntPass" type="button"><span id="txtAntPass_sp" class="fa fa-eye"></span></button>'+
					     ' </span>'+
					    '</div></div>'+
						'<div class="col-md-4"><div class="input-group">'+
					      '<input id="txtNewPass" type="password" class="form-control pass" placeholder="Coloque la nueva contraseña...">'+
					      '<span class="input-group-btn">'+
					        '<button class="btn btn-default ver" idtxt="txtNewPass" type="button"><span id="txtNewPass_sp" class="fa fa-eye"></span></button>'+
					      '</span>'+
					    '</div></div>'+
						'<div class="col-md-4"><div class="input-group">'+
					      '<input id="txtNewPass2" type="password" class="form-control pass" placeholder="Coloque otra vez la nueva contraseña...">'+
					      '<span class="input-group-btn">'+
					        '<button class="btn btn-default ver" idtxt="txtNewPass2" type="button"><span id="txtNewPass2_sp" class="fa fa-eye"></span></button>'+
					      '</span>'+
					    '</div></div>'+
					'</div>'+
					'<div id="tableContainer" class="x_content table-responsive">'+
					'<div class="col-md-5"><button id="guardarPass" class="btn btn-success">Guardar cambios</button></div>'+
						'<div class="col-md-5"><p></p></div>'+
						'<div class="col-md-2"><p></p></div>'+
					'</div>';
// :::::::::::::: ***************** PROVEEDORES *********** ::::::::::
// FUNCION DE MOSTRAR LOS TRABAJOS
function listadoTrabajoProvs(){
	$.ajax({
		url:'routes/routeFormcliente.php',
		type:'post',
		data: {action: 'provsTrabs', info: idClienteGLOBAL},
		dataType:'json',
		error: function(error){
			toast1("Error!", "Ocurrió un error, intentelo mas tarde o pongase en contacto con el administrador", 4000, "error");
			// $.dreamAlert.close()
		},
		success: function(data){
			if(data != ""){
				var acordeon = '<div id="accordion" role="tablist" aria-multiselectable="true">';
				for (var i = 0; i < data.length; i++) {
					var text = "";
					var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
					for(var r = 0; r < 6; r++) {
					    text += possible.charAt(Math.floor(Math.random() * possible.length));
					}
					acordeon += '<div class="card">'+
							    '<div align="left" class="card-header" role="tab" id="heading'+text+'">'+
							      '<h4 class="mb-0">'+
							        '<a data-toggle="collapse" data-parent="#accordion" onclick="mostrarSucursalesProvs('+ "'" + text + "'" +','+data[i].idtrabajo+')" href="#collapse'+text+'" aria-expanded="false" aria-controls="collapse'+text+'">'+
							          "Trabajo N° " + data[i].idtrabajo + " - " + data[i].alias + " - " + data[i].nombre + 
								        '</a>'+
								      '</h4>'+
								    '</div>'+
								    '<div id="collapse'+text+'" class="collapse" role="tabpanel" aria-labelledby="heading'+text+'">'+
								      '<div class="card-block">'+
								      	'<div id="tablaSucs'+text+'" class="table-responsive"></div>'+
								      '</div>'+
								    '</div>'+
							  '</div>';
				}
				acordeon += '</div>';
				$('#contenidoWeb').html('');
				$('#contenidoWeb').append(acordeon);
			}else{
				$('#contenidoWeb').empty();
				toast1("Atencion!", "No hay datos para mostrar", 8000, "error");
			}
		}
	});
}

// FUNCION MOSTRAR SUCURSALES DE PROVEEDORES (SEGUN TRABAJO)
function mostrarSucursalesProvs(id, idTrabajo){
	$('.collapse').collapse('hide');
	$('#collapse'+id).collapse('show');

	var provData = {
		trab: idTrabajo,
		idprov: idClienteGLOBAL
	}
	$.ajax({
		url:'routes/routeFormcliente.php',
		type:'post',
		async: true,
		data: {info: provData, action: 'sucursalesProv'},
		dataType:'JSON',
		beforeSend: function(){
			$('#tablaSucs'+id).html('');
			$('#tablaSucs'+id).hide();
			var tabla = tablaProvs.replace("*ID*", id);
			$('#tablaSucs'+id).append(tabla);
		},
		error: function(error){
			console.log(error);
			toast1("Error!", ajaxError, 8000, "error");
		},
		success: function(data){
			if(data != ""){
				var tabla = "";
				$.each(data, function (val, key){
					var accionBtn = "";
					if(key.tipo === "Perifoneo")
						accionBtn = "accionTrabPerif";
					else
						accionBtn = "accionTrab";

					var estilo = "";
					var boton = "";
					if(key.status === "4"){
						estilo = "success";
						boton = '<button onclick="configFechas(' + key.idtrabajo+ ',' + key.idsucursal + ')" class="btn btn-xs btn-default">&nbsp;<span class="glyphicon glyphicon-cog"></span>&nbsp;Config/Editar Trabajo&nbsp;</button>';
					//}else if(key.status === "6"){
						//estilo = "success";
						//boton = '<button class="btn btn-xs btn-success" onclick="verEstadistica('+key.idsucursal+')"><span class="fa fa-area-chart"></span> Trab. Iniciado</button>';
					}else if(key.status === "7"){
						estilo = "active";
						boton = '<button class="btn btn-xs btn-primary">Completado</button>';
					}else{
						estilo = "warning";
						boton = '<button class="btn btn-xs btn-warning">En Revisión</button>';
					}
					tabla += '<tr class="' + estilo + '"><td>' + key.nombre + '</td><td>' + /*key.cantidad*/ key.cantprov + '</td><td id="tipo_' + key.idtrabajo + '">' + key.tipo + '</td><td>' + key.vigencia + '</td><td>' + boton + '</td><td><button class="btn btn-xs btn-primary" onclick="' + accionBtn + '(' + key.idtrabajo + ',' + key.idsucursal + ',' + "'detallesTrab'" + ')">Detalle</button></td><td><button class="btn btn-xs btn-info" onclick="zonasSucursal('+ key.idsucursal +')">Zonas</button></td></tr>';
				});
				$('#sucs'+id).html('');
				$('#sucs'+id).append(tabla);
				setTimeout(function(){
					$('#tablaSucs'+id).show(200);
				}, 200);
			}else{
				toast1("Atencion!", "No hay datos para mostrar\n\n<b>Pongase en contacto con el administrador para revisar el avanze de este trabajo.</b>", 8000, "default");
			}
		}
	});
}

// FUNCION QUE ESTABLECE LAS FECHAS DEL TRABAJO
var periodoInicio = "";
var periodoFin = "";
var idTrabPERIODO = "";
var idSucPERIODO = "";
function configFechas(trab, suc){
	var fecha = {
		trab: trab,
		suc: suc,
		prov: idClienteGLOBAL
	};
	idSucPERIODO = suc;
	$.ajax({
		url:'routes/routeFormcliente.php',
		type:'post',
		async: true,
		data: {info: fecha, action: 'configFecha'},
		dataType:'JSON',
		beforeSend: function(){
			showSpinner();
		},
		error: function(error){
			console.log(error);
			toast1("Error!", ajaxError, 8000, "error");
			removeSpinner();
		},
		success: function(data){
			console.log(data);
			removeSpinner();
			if(data[0]['inicio'] === '1111-11-11' || data[0]['fin'] === '1111-11-11'){
				periodoInicio = data[0]['periodoini'];
				periodoFin = data[0]['periodofin'];
				var cuerpo = '<div class="row">'+
								'<div class="col-md-12"><h4>Periodo</h4><p><b>Inicio: </b>'+periodoInicio+' - <b>Termino: </b>'+periodoFin+'</p></div>'+
							'</div><hr>'+
							'<div class="row">'+
								'<div class="col-md-2"><p><b>Fecha Inicio: </b></p></div>'+
								'<div class="col-md-4"><input type="date" class="form-control" id="inicioTxt"></div>'+
								'<div class="col-md-2"><p><b>Fecha Término: </b></p></div>'+
								'<div class="col-md-4"><input type="date" class="form-control" id="terminoTxt"></div>'+
							'</div>';
				idTrabPERIODO = data[0]['idtrabajo'];
				$('#cuerpoPeriodo').html('');
				$('#tituloPeriodo').html('');
				$('#cuerpoPeriodo').append(cuerpo);
				$('#tituloPeriodo').append(data[0]['nombre']);
				$('#modalPeriodo').modal('show');
			}else{
				toast1("Actividad no permitida", "Esta sucursal ya fue configurada\n\n<b>Inicio: </b>" + data[0]['inicio'] + " - <b>Término: </b>" + data[0]['fin'] + "\n\n<b>Es posible que falte un proveedor de configurar su trabajo en esta misma sucursal (Ver 'Detalle').<br>Pongase en contacto con el administrador si decea cambiar esta opción.</b>", 11000, "info");
			}
		}
	});
}

// FUNCION GUARDADO DE LAS FECHAS DE INICIO Y FIN
$(document).on('click', '#guardarPeriodo', function (){
	var limiteInicio = new Date(periodoInicio).getTime();
	var limiteFin = new Date(periodoFin).getTime();
	var inicio = new Date($('#inicioTxt').val()).getTime();
	var fin = new Date($('#terminoTxt').val()).getTime();
	if($('#inicioTxt').val() === '' || $('#terminoTxt').val() === ''){
		toast1("Error: Fechas de trabajo", "Coloque las fechas de inicio y término de trabajo", 8000, "error");
	}else if(fin < inicio){
		toast1("Error: Fechas de trabajo", "Las fechas de trabajo son invalidas", 8000, "error");
	}else if(inicio > limiteFin || inicio < limiteInicio){
		toast1("Error: Fechas de trabajo", "La fechas de inicio de trabajo no es valida", 8000, "error");
	}else if(fin > limiteFin || fin < limiteInicio){
		toast1("Error: Fechas de trabajo", "La fechas de término de trabajo no es valida", 8000, "error");
	}else{
		var provAlta = {
			trab: idTrabPERIODO,
			suc: idSucPERIODO,
			prov: idClienteGLOBAL,
			ini: $('#inicioTxt').val(),
			fin: $('#terminoTxt').val()
		};
		$.ajax({
			url:'routes/routeFormcliente.php',
			type:'post',
			async: true,
			data: {info: provAlta, action: 'altaPropuestaProv'},
			dataType:'JSON',
			beforeSend: function(){
				showSpinner();
			},
			error: function(error){
				console.log(error);
				toast1("Error!", ajaxError, 8000, "error");
				removeSpinner();
			},
			success: function(data){
				removeSpinner();
				console.log(data);
				$('#modalPeriodo').modal('hide');
				if(data === "EXITO"){
					toast1("Exito", "Fecha de trabajo actualizada.", 8000, "success");
				}else if(data === "ERRORACT"){
					toast1("Error!", "Ocurrio un error inesperado. Consulte con el administrador.", 8000, "error");
				}
			}
		});
	}
});

// FUNCION QUE MUESTRA LAS ZONAS DE COBERTURA DE LA SUCURSAL
function zonasSucursal(suc){
	$.ajax({
		url:'routes/routeFormcliente.php',
		type:'post',
		async: true,
		data: {info: suc, action: 'zonasPoligonos'},
		dataType:'JSON',
		beforeSend: function(){
			showSpinner();
		},
		error: function(error){
			console.log(error);
			toast1("Error!", ajaxError, 8000, "error");
			removeSpinner();
		},
		success: function(data){
			removeSpinner();
			console.log(data);
			pintarPoligonos(data);
		}
	});
}

	// PINTAMOS POLIGONOS
	var miMapaGlobal;
	var poligonoVer;
	var infoVentana;
	var banderaPolig;
	function pintarPoligonos(polig){
		poligonoVer = {};
		banderaPolig = {};
		var centro;
		var c = 1;
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
			
			if(c < 2){
				miMapaGlobal = new google.maps.Map(document.getElementById('zonasMapa'),{zoom: 13, center: centro,mapTypeId: google.maps.MapTypeId.TERRAIN,fullscreenControl: true,});
				c++;
			}

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

			var imagen = 'images/banderasPolig/asignado.png';

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
					var contenido = '<div id="content"><div id="siteNotice"></div><center><label id="firstHeading">'+elem.nomtxt+'</label></center></div><div id="bodyContent"><p><span class="text-primary"><b>Num. Volanteo: <b/></span>'+elem.cantidad+'</p><p></div></div>';
					infoVentana.setContent(contenido);
					infoVentana.open(miMapaGlobal, bandera);
				}
			})(banderaPolig["ban_" + elem.id], p));

			// PINTAMOS EL POLIGONO EN EL MAPA
			poligonoVer["pol_" + elem.id].setMap(miMapaGlobal);
		});

		$('#zonasSucs').modal('show');
		$("#zonasSucs").on("shown.bs.modal", function () {
			google.maps.event.trigger(miMapaGlobal, "resize");
			miMapaGlobal.setCenter(centro);
		});
		removeSpinner();
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

// FUNCION DE GUARDADO DE NUEVA CONTRASEÑA
$(document).on('click', '#guardarPass', function(){
	if($('#txtAntPass').val() === ""){
		$('#txtAntPass').addClass(' invalid');
		toast1("Error", "Coloque la antigua contraseña.", 5000, "error");
	}else if($('#txtNewPass').val() === ""){
		$('#txtNewPass').addClass(' invalid');
		toast1("Error", "Coloque la nueva contraseña.", 5000, "error");
	}else if($('#txtNewPass').val().length < 5){
		$('#txtNewPass').addClass(' invalid');
		toast1("Error", "La contraseña debe ser un minimo de 5 caracteres", 7000, "error");
	}else if($('#txtNewPass2').val() === ""){
		$('#txtNewPass2').addClass(' invalid');
		toast1("Error", "Coloque otra vez la contraseña", 5000, "error");
	}else if($('#txtNewPass').val() != $('#txtNewPass2').val()){
		$('#txtNewPass').addClass(' invalid');
		$('#txtNewPass2').addClass(' invalid');
		toast1("Error", "Las contraseñas no son iguales", 5000, "error");
	}else{
		var passData = {
			id: idUser,
			antPass: keyUser,
			antPass2: $('#txtAntPass').val(),
			newPass: $('#txtNewPass').val(),
			tipo: tipoUser
		};
		$.ajax({
			url:'routes/routeFormcliente.php',
			type:'post',
			async: true,
			data: {info: passData, action: 'editPassword'},
			dataType:'JSON',
			beforeSend: function(){
				showSpinner();
			},
			error: function(error){
				console.log(error);
				toast1("Error!", ajaxError, 8000, "error");
				removeSpinner();
			},
			success: function(data){
				removeSpinner();
				console.log(data);
				if(data === 'ERRANTPASS'){
					$('#txtAntPass').addClass(' invalid');
					toast1("Error", "LA ANTIGUA CONTRASEÑA ES INCORRECTA", 6000, "error");
				}else if(data === 'EXITO'){
					toast1("Exito", "Su contraseña ha sido actualizada...", 6000, "success");
					$('#txtAntPass').removeClass('fa fa-eye-slash');
					$('#txtNewPass').removeClass('fa fa-eye-slash');
					$('#txtNewPass2').removeClass('fa fa-eye-slash');

					$('#txtAntPass').val('');
					$('#txtNewPass').val('');
					$('#txtNewPass2').val('');
				}
			}
		});
	}
});
// QUITAMOS EL COLOR ROJO AL INPUT TEXT PASSWORDS
$(document).on('click', '.pass', function(){
	$(this).removeClass('invalid');
});

// FUNCION MOSTRAR PASSWORDS
$(document).on('click', '.ver', function (){
	var id = $(this).attr("idtxt");
	var estado = $('#'+id).attr('type');
	if(estado === 'password'){
		$('#'+id).attr('type', 'text');
		$('#'+id+'_sp').removeClass('fa fa-eye');
		$('#'+id+'_sp').addClass('fa fa-eye-slash');
	}else if(estado === 'text'){
		$('#'+id).attr('type', 'password');
		$('#'+id+'_sp').removeClass('fa fa-eye-slash');
		$('#'+id+'_sp').addClass('fa fa-eye');
	}
	$('#'+id).focus();
});


// :::::::::::::::: ACCION ESPECIAL DE PERIFONEO ::::::::::::::::::::::::::
var impresionDetalleIDTRAB = "";
var impresionDetalleIDSUC = "";
$(document).on('click', '#imprimirRol', function(){
	console.log($('#tipo_' + impresionDetalleIDTRAB).text());
	if($('#tipo_' + impresionDetalleIDTRAB).text() === "Volanteo"){
		traerDataVolanteoImprimir(impresionDetalleIDTRAB, impresionDetalleIDSUC);
	}else if($('#tipo_' + impresionDetalleIDTRAB).text() === "Perifoneo"){
		traerDataPerifoneo(impresionDetalleIDTRAB, impresionDetalleIDSUC, 1);
	}
});

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// ********** IMPRESION DE ROLES DE TRABAJO VOLANTEO ************
function traerDataVolanteoImprimir(idTrab, idSuc){
	rolesJSON = {
		trab: idTrab,
		suc: idSuc
	};
	$.ajax({
		url:'routes/routeTrabajos.php',
		type:'post',
		data: {info: rolesJSON ,action: 'mostrarRoles'},
		dataType:'json',
		beforeSend: function(){
			showSpinner();
		},
		error: function(error){
			removeSpinner();
			console.log(error);
		},
		success: function(data){
			imprimirVolanteo(data);
			removeSpinner();
		}
	});
}
function imprimirVolanteo(json){
	var cliente = json["cliente"];
	var detalles = json["detalles"];
	var horarios = json["horarios"];

	var encTrabajo = [
		{text: 'Cant.', style: 'tituloTabla2', fillColor: '#CCCCCC'},
		{text: 'Estado', style: 'tituloTabla2', fillColor: '#CCCCCC'},
		{text: 'Municipio', style: 'tituloTabla2', fillColor: '#CCCCCC'},
		{text: 'Localidad', style: 'tituloTabla2', fillColor: '#CCCCCC'},
		{text: 'Proveedor(es)', style: 'tituloTabla2', fillColor: '#CCCCCC'}
	];
	var trabajoDATA = [];
	trabajoDATA.push(encTrabajo);
	$(detalles).each(function (key, value){
		var detalle = [
			{text: value.cantidad, style: 'textoTabla2'},
			{text: value.Estado, style: 'textoTabla2'},
			{text: value.Municipio, style: 'textoTabla2'},
			{text: value.Localidad, style: 'textoTabla2'},
			{text: value.NomProvs.replace(/<br>/gi, "\n"), style: 'textoTabla2'}
		];
		trabajoDATA.push(detalle);
	});

	var encProvs = [
		{text: 'Proveedor', style: 'tituloTabla2', fillColor: '#CCCCCC'},
		{text: 'Fecha Inicio', style: 'tituloTabla2', fillColor: '#CCCCCC'},
		{text: 'Fecha Término', style: 'tituloTabla2', fillColor: '#CCCCCC'}
	];
	var provsDATA = [];
	provsDATA.push(encProvs);
	$(horarios).each(function (key, value){
		var horario = [
			{text: value.NomProv, style: 'textoTabla2'},
			{text: value.inicio, style: 'textoTabla2'},
			{text: value.fin, style: 'textoTabla2'}
		];
		provsDATA.push(horario);
	});

	var doc = {
		pageSize: 'LETTER',
		pageOrientation: 'portrait',
		pageMargins: [25, 25, 35, 25],
		content: [
			{
				text: '\nTrábajo N°: ' + cliente[0]["idtrabajo"] + '  - Sucursal: ' + cliente[0]["nombre"] + "\n\n\n",
				style: 'titulo'
			},
			{
				table: {
					widths: ['*', '*', '*', '*'],
					body: [
						[
							{text: [{ text: 'Encargado: ', style: 'tituloTabla1' },{ text: cliente[0]["encargado"], style: 'textoTabla1' }], border: [false, false, false, false]},
							{text: [{ text: 'Alias: ', style: 'tituloTabla1' },{ text: cliente[0]["alias"], style: 'textoTabla1' }], border: [false, false, false, false]},
							{text: [{ text: 'Cant. Tienda: ', style: 'tituloTabla1' },{ text: cliente[0]["cantTienda"], style: 'textoTabla1' }], border: [false, false, false, false]},
							{text: [{ text: 'Cant. Total: ', style: 'tituloTabla1' },{ text: cliente[0]["cantidad"], style: 'textoTabla1' }], border: [false, false, false, false]}
						],
						[
							{text: [{ text: 'Tipo: ', style: 'tituloTabla1' },{ text: cliente[0]["tipo"], style: 'textoTabla1' }], border: [false, false, false, false]},
							{text: [{ text: 'Vigencia: ', style: 'tituloTabla1' },{ text: cliente[0]["vigencia"], style: 'textoTabla1' }], border: [false, false, false, false], colSpan: 3},
							{},
							{}
						]
					]
				}
			},
			{
				text: '\n\nDetalles de Trabajo\n',
				style: 'titulo'
			},
			{
				table: {
					widths: ['auto', '*', '*', '*', '*'],
					body: trabajoDATA
				}
			},
			{
				text: '\n\nPropuesta de proveedor(es)\n',
				style: 'titulo'
			},
			{
				table: {
					widths: ['*', '*', '*'],
					body: provsDATA
				}
			},
			{
				text: '\n\nObservaciones\n',
				style: 'tituloObs'
			},
			{
				table: {
					widths: ['*'],
					body: [
						['\n\n\n\n']
					]
				}
			}
		],
		styles: {
			titulo: {
				fontSize: 12,
				bold: true,
				alignment: 'center'
			},
			tituloTabla1: {
				fontSize: 10,
				bold: true
			},
			textoTabla1: {
				fontSize: 10,
				bold: false
			},
			tituloTabla2: {
				fontSize: 10,
				bold: true
			},
			textoTabla2: {
				fontSize: 10,
				bold: false
			},
			tituloObs: {
				fontSize: 10,
				bold: true,
				alignment: 'left'
			},
			espaciado: {
				fontSize: 10
			}
		}
	};
	pdfMake.createPdf(doc).open();
}

// ACCION CON EL BOTO DE DETALLE PARA PERIFONEO
function accionTrabPerif(idTrab, idSuc, accion){
	impresionDetalleIDTRAB = idTrab;
	impresionDetalleIDSUC = idSuc;
	traerDataPerifoneo(idTrab, idSuc, 2);
}

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// ********** IMPRESION DE ROLES DE TRABAJO VOLANTEO ************
function traerDataPerifoneo(idTrab, idSuc, accion){
	$.ajax({
		url:'routes/routeTrabajos.php',
		type:'post',
		data: {info: {trab: idTrab, suc: idSuc}, action: 'traerDetallePerifoneo'},
		dataType:'json',
		error: function(error){
			console.log(error);
			toast1("Error!", "Ocurrió un error inesperado.", 8000, "error");
		},
		success: function(data){
			if(accion === 1){
				imprimirPerifoneo(data);
			}else{
				modalTrabajoPerifoneo(data);
			}
		}
	});
}
function modalTrabajoPerifoneo(json){
	var cuerpoRol = "";
	clienteJSON = json["cliente"];
	configJSON = json["config"];
	var verifCont = 0;

	// CREACION DE ELEMENTOS DINAMICOS PARA MODAL
	cuerpoRol += '<div class="row">'+
	'<div class="col-md-3"><b>Cliente: </b>' + clienteJSON["encargado"] + '</div>'+
	'<div class="col-md-3"><b>Alias: </b>' + clienteJSON["alias"] + '</div>'+
	'<div class="col-md-3"><b>Cant. Tienda: </b>0</div>'+
	'<div class="col-md-3"><b>Cant. Total: </b>' + clienteJSON["cantidad"] + '</div>'+
	'</div>'+
	'<div class="row">'+
	'<div class="col-md-3"><b>Tipo: </b>' + clienteJSON["tipo"] + '</div>'+
	'<div class="col-md-9"><b>Vigencia: </b>' + clienteJSON["vigencia"] + '</div>'+
	'</div><h4>Detalles de Trabajo</h4>';

					
/*
					for(d = 0; d < detallesJSON.length; d++){
						cuerpoRol += '<tr><td>' + detallesJSON[d]["cantidad"] + '</td>'+
						'<td>' + detallesJSON[d]["Estado"] + '</td>'+
						'<td>' + detallesJSON[d]["Municipio"] + '</td>'+
						'<td>' + detallesJSON[d]["Localidad"] + '</td>'+
						'<td>' + detallesJSON[d]["NomProvs"] + '</td></tr>';
					}
					cuerpoRol += '</tbody></table></div><h4>Propuesta de proveedor(es)</h4>'+
							'<div class="table-responsive"><table class="table table-bordered"><thead>'+
							'<tr><th>Proveedor</th><th>Fecha Inicio</th><th>Fecha término</th></tr><tbody>';

					for(h = 0; h < horariosJSON.length; h++){
						cuerpoRol += '<tr><td>' + horariosJSON[h]["NomProv"] + '</td>'+
						'<td>' + horariosJSON[h]["inicio"] + '</td>'+
						'<td>' + horariosJSON[h]["fin"] + '</td>';
					}

					cuerpoRol += '</tbody></table></div>';*/

					
	$(configJSON).each(function (key, value){
		cuerpoRol += '<div class="table-responsive"><table class="table table-bordered"><thead>'+
			'<tr class="active"><th>Fecha: ' + value.fecha + '</th><th>Hr Inicio: ' + value.inicio.split(" ")[1].split(":")[0] + ":" + value.inicio.split(" ")[1].split(":")[1] + '</th><th>Hr Término: ' + value.fin.split(" ")[1].split(":")[0] + ":" + value.fin.split(" ")[1].split(":")[1] + '</th><th>Proveedor(es): ' + value.proveedores.replace(/,/gi, "<br>") + '</th><th>Cant(mins): ' + value.minutos + '</th></tr></thead><tbody><tr><td colspan="5">' +
			'<div class="table-responsive"><table class="table table-striped"><thead><tr><th>Localidad</th><th>Estado</th><th>Municipio</th><th>Hr Inicio</th><th>Hr Término</th><th>Cant (mins)</th></tr></thead><tbody>';
		$(json[value.id]).each(function (key, value2){
			cuerpoRol += '<tr><td>' + value2.nombre + '</td><td>' + value2.estadotxt + '</td><td>' + value2.municipiotxt + '</td><td>' + value2.inicio.split(" ")[1].split(":")[0] + ":" + value2.inicio.split(" ")[1].split(":")[1] + '</td><td>' + value2.fin.split(" ")[1].split(":")[0] + ":" + value2.fin.split(" ")[1].split(":")[1] + '</td><td>' + value2.cantidad + '</td></tr>';
			verifCont++;
		});
		cuerpoRol += '</tbody></table></div></td></tr></tbody></table></div>';
	});


	if(verifCont > 0){
		console.log(json);
		$('#cuerpoRoles').html('');
		$('#cuerpoRoles').append(cuerpoRol);
		$('#tituloRoles').html('');
		$('#tituloRoles').append('Descripcion de Trabajo - N°: '+ impresionDetalleIDTRAB);
		PNotify.removeAll();
		removeSpinner();
		$('#modalRoles').modal('show');
	}else{
		toast1("Atención!", "El trabajo no ha sido configurado aún", 6000, "info");
	}
}
function imprimirPerifoneo(json){
	var cliente = json["cliente"];
	var config = json["config"];

	var docPerif = [
			{
				text: '\nTrábajo N°: ' + cliente["idtrabajo"] + '  - Sucursal: ' + cliente["nombre"] + "\n\n\n",
				style: 'titulo'
			},
			{
				table: {
					widths: ['*', '*', '*', '*'],
					body: [
						[
							{text: [{ text: 'Encargado: ', style: 'tituloTabla1' },{ text: cliente["encargado"], style: 'textoTabla1' }], border: [false, false, false, false]},
							{text: [{ text: 'Alias: ', style: 'tituloTabla1' },{ text: cliente["alias"], style: 'textoTabla1' }], border: [false, false, false, false]},
							{text: [{ text: 'Cant. Tienda: ', style: 'tituloTabla1' },{ text: '0', style: 'textoTabla1' }], border: [false, false, false, false]},
							{text: [{ text: 'Cant. Total: ', style: 'tituloTabla1' },{ text: cliente["cantidad"], style: 'textoTabla1' }], border: [false, false, false, false]}
						],
						[
							{text: [{ text: 'Tipo: ', style: 'tituloTabla1' },{ text: cliente["tipo"], style: 'textoTabla1' }], border: [false, false, false, false]},
							{text: [{ text: 'Vigencia: ', style: 'tituloTabla1' },{ text: cliente["vigencia"], style: 'textoTabla1' }], border: [false, false, false, false], colSpan: 3},
							{},
							{}
						]
					]
				}
			},
			{
				text: '\n\nDetalles de Trabajo\n',
				style: 'titulo'
			}
	];

	$(config).each(function (key, value){
		var tablaInternaData = [
			[
				{text: 'Localidad', style: 'tituloTabla2', fillColor: '#E0E0E0'},
				{text: 'Estado', style: 'tituloTabla2', fillColor: '#E0E0E0'},
				{text: 'Municipio', style: 'tituloTabla2', fillColor: '#E0E0E0'},
				{text: 'Hr Inicio', style: 'tituloTabla2', fillColor: '#E0E0E0'},
				{text: 'Hr Término', style: 'tituloTabla2', fillColor: '#E0E0E0'},
				{text: 'Cant (mins)', style: 'tituloTabla2', fillColor: '#E0E0E0'}
			]
		];
		ordenarJSON(json[value.id], 'id', 'asc');
		$(jsonORDENADO).each(function (key, value2){
			var data = [
				{text: value2.nombre, style: 'textoTabla3'},
				{text: value2.estadotxt, style: 'textoTabla3'},
				{text: value2.municipiotxt, style: 'textoTabla3'},
				{text: value2.inicio.split(" ")[1], style: 'textoTabla3'},
				{text: value2.fin.split(" ")[1], style: 'textoTabla3'},
				{text: value2.cantidad, style: 'textoTabla3'}
			];
			tablaInternaData.push(data);
		});
		var tablaInterna = [
			{
				table: {
					widths: ['*', '*', '*', 'auto', 'auto', 'auto'],
					body: tablaInternaData
				}, colSpan: 5
			},
			{},{},{},{}
		];
		docPerif.push(
			{
				table: {
					widths: ['auto', 'auto', 'auto', '*', 'auto'],
					body: [
						[
							{text: 'Fecha: ' + value.fecha, style: 'tituloTabla2', fillColor: '#BEBEBE'},
							{text: 'Hr inicio: ' + value.inicio.split(" ")[1].split(":")[0] + ":" + value.inicio.split(" ")[1].split(":")[1], style: 'tituloTabla2', fillColor: '#BEBEBE'},
							{text: 'Hr Término: ' + value.fin.split(" ")[1].split(":")[0] + ":" + value.fin.split(" ")[1].split(":")[1], style: 'tituloTabla2', fillColor: '#BEBEBE'},
							{text: 'Proveedor(es): ' + value.proveedores.replace(/,/gi, "\n"), style: 'tituloTabla2', fillColor: '#BEBEBE'},
							{text: 'Cant(mins): ' + value.minutos, style: 'tituloTabla2', fillColor: '#BEBEBE'}
						],
						tablaInterna
					]
				}
			},
			{
				text: '\n'
			}
		);
	});

	docPerif.push(
			{
				text: '\n\nObservaciones\n',
				style: 'tituloObs'
			},
			{
				table: {
					widths: ['*'],
					body: [
						['\n\n\n\n']
					]
				}
			}
	);
	var doc = {
		pageSize: 'LETTER',
		pageOrientation: 'portrait',
		pageMargins: [25, 25, 35, 25],
		content: docPerif,
		styles: {
			titulo: {
				fontSize: 12,
				bold: true,
				alignment: 'center'
			},
			tituloTabla1: {
				fontSize: 10,
				bold: true
			},
			textoTabla1: {
				fontSize: 10,
				bold: false
			},
			tituloTabla2: {
			fontSize: 9,
				bold: true
			},
			textoTabla2: {
			fontSize: 10,
				bold: false
			},
			textoTabla3: {
			fontSize: 8,
				bold: false
			},
			tituloObs: {
			fontSize: 10,
				bold: true,
				alignment: 'left'
			},
			espaciado: {
				fontSize: 10
			}
		}
	};
	pdfMake.createPdf(doc).open();
}


// ****************** FUNCIONES MISCELANEAS *********************************
// FUNCION QUE CREA CADENA ALEATORIA (LONGITUD QUE SE NECESITE)
function cadAleatoria(lng) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789";
    for (var r = 0; r < lng; r++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

// FUNCION QUE ORDENA UN JSON
var jsonORDENADO;
function ordenarJSON(json, prop, tipo) {
    jsonORDENADO = json.sort(function (a, b) {
        if (tipo === "asc") {
            return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
        } else {
            return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
        }
    });
}
// ===============  EVENTOS PARA MODULO DE 	CLIENTES ===========================================
// ================================================================================================
	var url = window.location.pathname;
	var folder;
	$('document').ready(function(){
		verLvl1();

		/*setInterval(function(){
			// RECARGADO CADA 15 MIUNUTOS
			location.reload();
		}, 500000);*/

		folder = url.substring(0, url.lastIndexOf('/'));
	});

	$(document).on('click', '#btn_nuevo', function(e){
		window.location = 'trabajos.php';
	});


	function verLvl1(){

		$.ajax({
			url:'routes/routeTrabajos.php',
			type:'post',
			data: {action: 'showNivel1'},
			dataType:'json',
			error: function(error){
				toast1("Error!", error, 8000, "error");
			},
			success: function(data){
				
				if(data != ""){
					var headers = ["NO.", "CLIENTE", "SERVICIO", "PETICION", "PERIODO", "CANT/MIN", "STATUS", "OPCIONES"];
					jQueryTableTrabajos("tableContainer1", headers, data, 8, "450px", "Trabajo", "Lvl2");
				  //jQueryTable(id_container, headers, data, LimitRow, maxHeight, NameFunc);
				}
				else{
					$('tbody').empty();
					toast1("Atencion!", "No hay trabajos para mostrar", 8000, "error");
				}
			}
		}); //fin ajax

	}

	function verLvl2(id){

		$.ajax({
			url:'routes/routeTrabajos.php',
			type:'POST',
			async: false,
			data: {info: id, action: "showNivel2"},
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
				removeSpinner();

				
				if(data != ""){
	
					var tbody, thead;
					thead = '<tr>'+
							  '<th>BLOQUE</th>'+
							  '<th>CANTIDAD</th>'+
							  '<th>STATUS</th>'+
							  '<th>OPCIONES</th>'+
							'</tr>';

					$('#thead2').empty();
					$('#thead2').append(thead);
					$('#tbody2').empty();

					for (var i = 0; i < data.length; i++) {
						
						tbody = '<tr>'+
								  '<td>'+data[i].edo+'</td>'+
								  '<td>'+data[i].cantidad+'</td>'+
								  '<td id="row_status'+i+'">sdfsdfs</td>'+
								  '<td>'+
								  	'<a href="#" onclick="verLvl3('+data[i].id+','+data[i].idEdo+')" class="btn btn-warning btn-xs">'+
								  		'<i class="fa fa-eye"></i> '+
								  		'Ver detalle '+
								  	'</a>'+
								 '</td>'+
								'</tr>';

						$('#tbody2').append(tbody);

						// console.log(tbody);

						if(data[i].status === '2')
							$('#row_status'+i+'').html('<button type="button" class="btn btn-danger btn-xs">&nbsp;&nbsp;&nbsp;Incompleto&nbsp;&nbsp;&nbsp;</button>');
						else
							$('#row_status'+i+'').html('<button type="button" class="btn btn-success btn-xs">&nbsp;&nbsp;&nbsp;Completo&nbsp;&nbsp;&nbsp;</button>')
						
					}
					

					$('#modalLvl2').modal('show');
				}
				else{
					$('#tbody2').empty();
					toast1("Atencion!", "Ocurrió un error, intentelo mas tarde o pongase en contacto con el adminsitrador", 8000, "error");
				}

			}
		});
	
	}

	function verLvl3(id, edo){
		$.ajax({
			url:'routes/routeTrabajos.php',
			type:'POST',
			async: false,
			data: {info: {id:id,edo:edo}, action: "showNivel3"},
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
				removeSpinner();

				if(data != ""){
	
					var tbody, thead = '';
					thead = '<tr>'+
							  '<th>PROVEEDOR</th>'+
							  '<th>CANT TOTAL</th>'+
							  '<th>CANT SUCURSAL</th>'+
							  '<th>SUCURSALES</th>'+
							'</tr>';

					$('#thead3').empty();
					$('#thead3').append(thead);
					$('#tbody3').empty();
					
					for (var i = 0; i < data.length; i++) {
						var muns = data[i].municipios;
						var options = '';

						tbody = '<tr>'+
								  '<td>'+data[i].nombre+'</td>'+
								  '<td>'+data[i].cantidad+'</td>'+
								  '<td id="cantmun'+i+'"> -- </td>'+
								  '<td>'+
								  	'<select onchange="mostCantMun('+i+')" id="select_muns'+i+'" class="form-control">'+
								  		'<option value="null">-- Ver sucursales --</option>'+
								  	'</select>'+
								  '</td>'+
								'</tr><br>';

						$('#tbody3').append(tbody);

						for(var j = 0; j < muns.length; j++){
							console.log(muns);
							options = '<option value="'+muns[j].canMpo+'">'+muns[j].nomMpo+'</option>';
							$("#select_muns"+i).append(options);
						}
					}
					
					var thead2, tbody2 = '';
					thead2 = '<tr>'+
							  '<th>SUCURSAL</th>'+
							  '<th>CANTIDAD</th>'+
							'</tr>';

					$('#thead4').empty();
					$('#thead4').append(thead2);
					$('#tbody4').empty();

					var nocub = data[0].nocubiertos;
					for(no = 0; no < nocub.length; no++){
						if(nocub[no].cveMpo !== '0'){
							tbody2+= '<tr>'+
										 '<td>'+nocub[no].nomMpo+'</td>'+
										 '<td>'+nocub[no].canMpo+'</td>'+
									'</tr><br>';
						}
					}

					$('#tbody4').append(tbody2);

					$('#modalLvl3').modal('show');
				}else{
					$('#tbody3').empty();
					toast1("Atencion!", "Este Bloque no tiene proveedores para cubrir sus sucursales", 9000, "error");
				}
			}
		});
	
	}
		// FUNCION AUXILIAR QUE MUESTRA LA CANT
		// POR MUNICIPIO
		function mostCantMun(id){
			$('#cantmun'+id).html('');
			var can = $('#select_muns'+id).val();
			if(can === 'null'){
				$('#cantmun'+id).append(' -- ');
			}else{
				$('#cantmun'+id).append(can);
			}
		}

// ******************::::::: CONFIGURAR TRABAJO :::::::******************
function opcSeguimiento(idTrab, status){
	if(parseInt(status) === 1){
		$.confirm({
			title: 'Iniciar Seguimiento Trab: '+ idTrab,
			content: '¿Decea comenzar seguimiento de este trabajo?',
			theme: 'light',
			confirm: function(){
				$.ajax({
					url:'routes/routeTrabajos.php',
					type:'post',
					data: {info: idTrab ,action: 'comenzarSeguimiento'},
					dataType:'json',
					error: function(error){
						console.log(error);
					},
					success: function(data){
						if(data === "EXITO"){
							location.reload();
						}else{
							toast1("Error!", "Hubo un error al iniciar seguimiento", 9000, "error");
						}
					}
				});
			},
			cancel: function(){}
		});
	}else if(parseInt(status) === 3){
		$.ajax({
			url:'routes/routeTrabajos.php',
			type:'post',
			data: {info: idTrab ,action: 'pendientesNivel3'},
			dataType:'json',
			error: function(error){
				console.log(error);
			},
			success: function(data){
				var verSums, sumsCom, provs, sumsEnt;
				for(i = 0; i < data.length; i++){
					verSums = data[i]["verifsumin"];
					sumsCom = data[i]["sumincompleto"];
					provs = data[i]["llamarprovs"];
					sumsEnt = data[i]["suminentregados"];
				}
				seguimientoNivel3(idTrab, verSums, sumsCom, provs, sumsEnt);
			}
		});
	}else if(parseInt(status) === 4){
		$.confirm({
			title: 'Config. cliente de trabajo: '+ idTrab,
			content: '¿Desea continuar con la configuración del trabajo de este cliente?',
			theme: 'light',
			confirm: function(){
				$.ajax({
					url:'routes/routeTrabajos.php',
					type:'post',
					data: {info: idTrab ,action: 'configCliente'},
					dataType:'json',
					error: function(error){
						console.log(error);
					},
					success: function(data){
						if(data === "EXITO"){
							location.reload();
						}else{
							toast1("Error!", "Hubo un error al iniciar config. cliente", 9000, "error");
						}
					}
				});
			},
			cancel: function(){}
		});
	}
}

// LLAMADO DE SEGUIMIENTO - STATUS NUM 3
function seguimientoNivel3(id, verSums, sumsCom, provs, sumsEnt){
	var btn1, btn2, btn3, btn4;
	if(parseInt(verSums) > 0){btn1 = "btn-success";}else{btn1 = "btn-default";}
	if(parseInt(sumsCom) > 0){btn2 = "btn-success";}else{btn2 = "btn-default";}
	if(parseInt(provs) > 0){btn3 = "btn-success";}else{btn3 = "btn-default";}
	if(parseInt(sumsEnt) > 0){btn4 = "btn-success";}else{btn4 = "btn-default";}

	PNotify.removeAll();
	new PNotify({
		title: 'Opcs. de seguimiento N°: ' + id,
		text: 'Presione el botón que determine que actividad fue cubierta totalmente:\n\n\n',
		icon: 'glyphicon glyphicon-question-sign',
		hide: false,
		type: 'info',
		styling: 'bootstrap3',
		confirm: {
			confirm: true,
			buttons: [{
				text: 'Verificar suministros',
				addClass: btn1 + ' btn-xs',
				click: function(notice) {
					if(parseInt(verSums) < 1){
						cambiarStatusNvl3(id, 'verifsumin', '¿Decea indicar que: LOS SUMINISTROS ESTÁN VERIFICADOS?');
					}
				}
			}, {
				text: 'Suministros completos',
				addClass: btn2 + ' btn-xs',
				click: function(notice) {
					if(parseInt(sumsCom) < 1){
						cambiarStatusNvl3(id, 'sumincompleto', '¿Decea indicar que: LOS SUMINISTROS ESTÁN COMPLETOS?');
					}
				}
			}, {
				text: 'Llamar proveedores',
				addClass: btn3 + ' btn-xs',
				click: function(notice) {
					if(parseInt(provs) < 1){
						cambiarStatusNvl3(id, 'llamarprovs', '¿Decea indicar que: LLAMÓ A LOS PROVEEDORES?');
					}
				}
			}, {
				text: 'Suministros entregados',
				addClass: btn4 + ' btn-xs',
				click: function(notice) {
					if(parseInt(sumsEnt) < 1){
						cambiarStatusNvl3(id, 'suminentregados', '¿Decea indicar que: LOS SUMINISTROS HAN SIDO ENTREGADOS?');
					}
				}
			}]
		},
		buttons: {
			closer: true,
			sticker: false
		},
		history: {
			history: false
		}
	});
}
// FUNCION CAMBIAR STATUS PENDIENTES NIVEL 3
function cambiarStatusNvl3(idTrab, accion, mensaje){
	$.confirm({
		title: 'Marcar pendiente',
		content: mensaje,
		theme: 'light',
		confirm: function(){
			idStatusLvl3 = {
				id: idTrab,
				fila: accion
			};
			$.ajax({
				url:'routes/routeTrabajos.php',
				type:'post',
				data: {info: idStatusLvl3 ,action: 'cambiarStatusNvl3'},
				dataType:'json',
				error: function(error){
					console.log(error);
					PNotify.removeAll();
				},
				success: function(data){
					if(parseInt(data) < 4){
						PNotify.removeAll();
					}else{
						location.reload();
					}
				}
			});
		},
		cancel: function(){}
	});
}

// ************ :::::::: GUARDADO DE ROL DE TRABAJO :::::::::*************
var sucRolesGLOBAL = "";
$(document).on('click', '#guardarRol', function(){
	if(guardarRolACCION === true){
		var idTrab = $('#tituloRoles').text().split(': ')[1];

		var rolJSON = {
			trab : idTrab,
			suc: sucRolesGLOBAL,
			mensaje: cuerpoCorreoPHP
		};
		$.confirm({
			title: 'Guardar Rol Proveedores Trab: '+ idTrab,
			content: '¿Desea guardar la propuesta de proveedores y enviar al cliente?',
			theme: 'light',
			confirm: function(){
				$.ajax({
					url:'routes/routeTrabajos.php',
					type:'post',
					data: {info: rolJSON ,action: 'guardarRoles'},
					dataType:'json',
					beforeSend: function(){
						showSpinner();
					},
					error: function(error){
						console.log(error);
						removeSpinner();
					},
					success: function(data){
						if(data === "EXITO"){
							removeSpinner();
							$('#modalRoles').modal('hide');
							imprimirRoles(imprimirRolesDATAGLOBAL);
							setTimeout(function(){
								location.reload();
							}, 500);
						}else{
							toast1("Error!", "Hubo un error al iniciar config. cliente", 9000, "error");
						}
					}
				});
			},
			cancel: function(){}
		});
	}else{
		toast1("Propuesta modificada", "Este trabajo no puede ser guardado. Faltan propuestas de proveedores.", 10000, "error");
	}
});

$(document).on('click', '#cerrarRol', function(){
	$('#modalRoles').modal('hide');
});

// *********** ::::::::: FUNCION MOSTRAR ROLES DE PROVEEDORES ::::::*****
var rolesJSON;
var cuerpoCorreoPHP;
var provsCant;
var guardarRolACCION;
function mostrarRoles(idTrab, idSuc){
	imprimirRolesDATAGLOBAL = {};
	provsCant = 0;
	sucRolesGLOBAL = idSuc;
	rolesJSON = {
		trab: idTrab,
		suc: idSuc
	};
	$.ajax({
		url:'routes/routeTrabajos.php',
		type:'post',
		data: {info: rolesJSON ,action: 'mostrarRoles'},
		dataType:'json',
		error: function(error){
			console.log(error);
		},
		success: function(data){
			imprimirRolesDATAGLOBAL = data;
			rolesJSON = data;

			// CONTENIDO DE MODAL
			var cuerpoRol = "";
			// CONTENIDO DE CORREO
			var cuerpoCorreo = "";

			var clienteJSON = rolesJSON["cliente"];
			var detallesJSON = rolesJSON["detalles"];
			var horariosJSON = rolesJSON["horarios"];
			for(c = 0; c < clienteJSON.length; c++){
				// CREACION DE ELEMENTOS DINAMICOS PARA MODAL
				cuerpoRol += '<div class="row">'+
				'<div class="col-md-3"><b>Encargado: </b>' + clienteJSON[c]["encargado"] + '</div>'+
				'<div class="col-md-3"><b>Alias: </b>' + clienteJSON[c]["alias"] + '</div>'+
				'<div class="col-md-3"><b>Cant. Tienda: </b>' + clienteJSON[c]["cantTienda"] + '</div>'+
				'<div class="col-md-3"><b>Cant. Total: </b>' + clienteJSON[c]["cantidad"] + '</div>'+
				'</div>'+
				'<div class="row">'+
				'<div class="col-md-3"><b>Tipo: </b>' + clienteJSON[c]["tipo"] + '</div>'+
				'<div class="col-md-9"><b>Vigencia: </b>' + clienteJSON[c]["vigencia"] + '</div>'+
				'</div>';

				// CORREO
				cuerpoCorreo += '<h4>- Datos Generales -</h4>'+
						'<p><b>Sucursal: </b>' + clienteJSON[c]["nombre"] + '</p>'+
						'<p><b>Encargado: </b>' + clienteJSON[c]["encargado"] + '</p>'+
						'<p><b>Vigencia: </b>' + clienteJSON[c]["vigencia"] + '</p>'+
						'<p><b>Tipo: </b>' + clienteJSON[c]["tipo"] + '</p>'+
						'<p><b>Cnt. Total: </b>' + clienteJSON[c]["cantidad"] + '</p>'+
						'<p><b>Cnt. Tienda: </b>' + clienteJSON[c]["cantTienda"] + '</p>';

			}

			cuerpoRol += '<h4>Detalles de Trabajo</h4><div class="table-responsive"><table class="table table-bordered"><thead>'+
					'<tr><th>Cant.</th><th>Estado</th><th>Municipio</th><th>Localidad</th><th>Proveedor(es)</th></tr><tbody>';
			// CORREO
			cuerpoCorreo += '<br><h4>- Detalles de Trabajo -</h4>';

			for(d = 0; d < detallesJSON.length; d++){
				cuerpoRol += '<tr><td>' + detallesJSON[d]["cantidad"] + '</td>'+
				'<td>' + detallesJSON[d]["Estado"] + '</td>'+
				'<td>' + detallesJSON[d]["Municipio"] + '</td>'+
				'<td>' + detallesJSON[d]["Localidad"] + '</td>'+
				'<td>' + detallesJSON[d]["NomProvs"] + '</td></tr>';

				// CORREO
				if(d > 0){
					cuerpoCorreo += '<hr>';
				}
				cuerpoCorreo += '<p><b>Cantidad: </b>' + detallesJSON[d]["cantidad"] + '</p>'+
						'<p><b>Estado: </b>' + detallesJSON[d]["Estado"] + '</p>'+
						'<p><b>Municipio: </b>' + detallesJSON[d]["Municipio"] + '</p>'+
						'<p><b>Localidad: </b>' + detallesJSON[d]["Localidad"] + '</p>'+
						'<p><b>Proveedores: </b>' + detallesJSON[d]["NomProvs"] + '</p>';
			}
			cuerpoRol += '</tbody></table></div><h4>Propuesta de proveedor(es)</h4>'+
					'<div class="table-responsive"><table class="table table-bordered"><thead>'+
					'<tr><th>Proveedor</th><th>Fecha Inicio</th><th>Fecha término</th><th><span class="fa fa-pencil"></span></th></tr><tbody>';
			// CORREO
			cuerpoCorreo += '<br><h4>- Propuesta de proveedor(es) -</h4>';

			for(h = 0; h < horariosJSON.length; h++){
				cuerpoRol += '<tr><td>' + horariosJSON[h]["NomProv"] + '</td>'+
				'<td>' + horariosJSON[h]["inicio"] + '</td>'+
				'<td>' + horariosJSON[h]["fin"] + '</td>'+
				'<td><button onclick="eliminarPropProv('+idTrab+','+idSuc+','+horariosJSON[h]["idproveedor"]+')" class="btn btn-xs btn-danger"><span class="fa fa-trash-o"></span></button></td>';

				// CORREO
				if(h > 0){
					cuerpoCorreo += '<hr>';
				}
				cuerpoCorreo += '<p><b>Proveedor: </b>' + horariosJSON[h]["NomProv"] + '</p>'+
						'<p><b>Inicia: </b>' + horariosJSON[h]["inicio"] + '</p>'+
						'<p><b>Termina: </b>' + horariosJSON[h]["fin"] + '</p>';
				provsCant++;
			}

			cuerpoRol += '</tbody></table></div>';
			cuerpoCorreoPHP = cuerpoCorreo;

			$('#cuerpoRoles').html('');
			$('#cuerpoRoles').append(cuerpoRol);
			$('#tituloRoles').html('');
			$('#tituloRoles').append('Rol de Trabajo - N°: '+ idTrab);
			PNotify.removeAll();
			$('#modalRoles').modal('show');
		}
	});
}
// FUNCION QUE ELIMINA PROPUESTA DE PROVEEDOR
function eliminarPropProv(trab, suc, prov){
	var propProv = {
		trab: trab,
		suc: suc,
		prov: prov
	}
	$.confirm({
		title: 'ELIMINAR PROPUESTA DE PROVEEDOR',
		content: '¿Desea eliminar la propuesta del proveedor?',
		theme: 'light',
		confirm: function(){
			$.ajax({
				url:'routes/routeTrabajos.php',
				type:'post',
				data: {info: propProv ,action: 'eliminarPorpProv'},
				dataType:'json',
				beforeSend: function(){
					showSpinner();
				},
				error: function(error){
					console.log(error);
					removeSpinner();
				},
				success: function(data){
					console.log(data);
					console.log(provsCant);
					removeSpinner();
					if(data === "EXITO"){
						provsCant = provsCant - 1;
						console.log(provsCant);
						toast1("Exito", "Propuesta eliminada con exito\n\n<b>Se le ha enviado un correo al proveedor informándole. Le recomendamos contactarlo para que realize una nueva propuesta.</b>", 10000, "success");
						$('#modalRoles').modal('hide');
						guardarRolACCION = false;
						if(parseInt(provsCant) > 0){
							showSpinner();
							setTimeout(function(){
								removeSpinner();
								mostrarRoles(trab, suc);
							}, 2000);
							setTimeout(function(){
								toast1("Atencion!", "Ha eliminado una o mas propuestas de proveedores por lo cual no podrá guardarla.<b>Si cierra esta ventana ya no podrá editarla, por lo que, si decea eliminar otra propuesta de proveedor, hágalo ahora.</b>", 10000, "default");
							}, 3000);
						}
					}else{
						toast1("Error inesperado", "Codigo error: " + data, 6000, "error");
					}
				}
			});
		},
		cancel: function(){}
	});
}

// .......... ENVIO DE MAIL DE ROLES ............
function reenvioRolPropuesta(idTrab, idSuc){
	$.confirm({
		title: 'REENVIO DE ROLES DE TRABAJO (PROPUESTA)',
		content: '¿Desea reenviar por correo la propuesta al cliente y a utd. administrador?',
		theme: 'light',
		confirm: function(){
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
					PNotify.removeAll();
					showSpinner();
				},
				error: function(error){
					console.log(error);
					removeSpinner();
				},
				success: function(data){
					rolesJSON = data;

					var cuerpoCorreo = "";

					var clienteJSON = rolesJSON["cliente"];
					var detallesJSON = rolesJSON["detalles"];
					var horariosJSON = rolesJSON["horarios"];
					for(c = 0; c < clienteJSON.length; c++){
						cuerpoCorreo += '<h4>- Datos Generales -</h4>'+
								'<p><b>Sucursal: </b>' + clienteJSON[c]["nombre"] + '</p>'+
								'<p><b>Encargado: </b>' + clienteJSON[c]["encargado"] + '</p>'+
								'<p><b>Vigencia: </b>' + clienteJSON[c]["vigencia"] + '</p>'+
								'<p><b>Tipo: </b>' + clienteJSON[c]["tipo"] + '</p>'+
								'<p><b>Cnt. Total: </b>' + clienteJSON[c]["cantidad"] + '</p>'+
								'<p><b>Cnt. Tienda: </b>' + clienteJSON[c]["cantTienda"] + '</p>';

					}
					cuerpoCorreo += '<br><h4>- Detalles de Trabajo -</h4>';

					for(d = 0; d < detallesJSON.length; d++){
						if(d > 0){
							cuerpoCorreo += '<hr>';
						}
						cuerpoCorreo += '<p><b>Cantidad: </b>' + detallesJSON[d]["cantidad"] + '</p>'+
								'<p><b>Estado: </b>' + detallesJSON[d]["Estado"] + '</p>'+
								'<p><b>Municipio: </b>' + detallesJSON[d]["Municipio"] + '</p>'+
								'<p><b>Localidad: </b>' + detallesJSON[d]["Localidad"] + '</p>'+
								'<p><b>Proveedores: </b>' + detallesJSON[d]["NomProvs"] + '</p>';
					}
					cuerpoCorreo += '<br><h4>- Propuesta de proveedor(es) -</h4>';

					for(h = 0; h < horariosJSON.length; h++){
						if(h > 0){
							cuerpoCorreo += '<hr>';
						}
						cuerpoCorreo += '<p><b>Proveedor: </b>' + horariosJSON[h]["NomProv"] + '</p>'+
								'<p><b>Inicia: </b>' + horariosJSON[h]["inicio"] + '</p>'+
								'<p><b>Termina: </b>' + horariosJSON[h]["fin"] + '</p>';
					}

					var rolJSON = {
						id : idTrab,
						mensaje: cuerpoCorreo
					};
					$.ajax({
						url:'routes/routeTrabajos.php',
						type:'post',
						data: {info: rolJSON ,action: 'reenvioRoles'},
						dataType:'json',
						error: function(error){
							console.log(error);
							removeSpinner();
						},
						success: function(data){
							removeSpinner();
							if(data === "EXITO"){
								toast1("Exito", "Correo enviado con exito", 6000, "success");
							}else{
								toast1("Error!", "Hubo un error al enviar propuesta de trabajo.", 9000, "error");
							}
						}
					});
				}
			});
		},
		cancel: function(){}
	});
}

// *****::::::::::::: REVISION DE ESTADISTICAS DE TRABAJO
function verEstadistica(idTrab){
	var contenido = "";
	showSpinner();
	$.ajax({
		url:'routes/routeTrabajos.php',
		type:'post',
		data: {info: idTrab ,action: 'getEstadistica'},
		dataType:'json',
		error: function(error){
			console.log(error);
			toast1("Error", "Hubo un error al enviar el correo", 6000, "error");
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

// ************* ::::::: ENVIAR MAIL AL CLIENTE :::::::::::::************
var fechaHora;
function fechaHoraFunc(){
	var d = new Date();
	var mes = d.getMonth() + 1;
	d = d.toString().split(' ');
	var dia;
	if(parseInt(mes) < 10){
		mes = '0' + mes;
	}
	fechaHora = d[3] + '-' + mes + '-' + d[2];
	// FORMATO DE FECHA :: AÑO-MES-DIA
}

// BOTON QUE ACTIVA SI LA ACCION DE MAILTRABAJO VIENE DEL TABLERO O CONFIG PERIFONEO
var tablaPagPrincipal = false;
$(document).on('click', '.envioCompleto, .enviarMail', function(){
	tablaPagPrincipal = true;
});

function mailTrabajo(id, btn){
	showSpinner();

	fechaHoraFunc();
	var idCliente = id;
	var periodoVar = $('#periodo_'+id).text().split(' -a- ')[1];
	var tipoTrabajo = $('#tipoTrab_' + id).text();
	periodoVar = periodoVar.replace(/-/g, '/');

	var fechaTrab = new Date(periodoVar).getTime();
	var fechaHoy = new Date(fechaHora).getTime();

	if(parseInt(fechaTrab) > parseInt(fechaHoy)){
		$.ajax({
			url:'routes/routeTrabajos.php',
			type:'post',
			data: {info: id ,action: 'verifMail'},
			dataType:'json',
			error: function(error){
				console.log(error);
				removeSpinner();
			},
			success: function(data){
				if(data === "SIN ENVIAR"){
					if(tipoTrabajo === "Perifoneo" && tablaPagPrincipal === true){
						verifSucursalesPerifoneoP1(id);
					}else{
						$.confirm({
							title: 'Enviar correo',
							content: '¿Desea enviar correo al cliente?',
							confirm: function(){
								enviarMailTrabajo(id, "NUEVO");
							},
							cancel: function(){}
						});
					}
				}else if(data === "VIGENTE"){
					if(tipoTrabajo === "Perifoneo" && tablaPagPrincipal === true){
						verifSucursalesPerifoneoP1(id);
					}else{
						$.confirm({
							title: 'Correo ya enviado al cliente',
							content: '¿Desea reenviar correo al cliente?',
							theme: 'light',
							confirm: function(){
								enviarMailTrabajo(id, "REENVIAR");
							},
							cancel: function(){}
						});
					}
				}else{
					$.ajax({
						url:'routes/routeTrabajos.php',
						type:'post',
						data: {info: idCliente ,action: 'sucsData'},
						dataType:'json',
						error: function(error){
							console.log(error);
						},
						success: function(data){
							console.log(data);
							var tabla = '';
							$.each(data, function (key, value){
								var txtCliente, btnCliente, txtPorveedor, btnProveedor;
								var btnReenvio = "Enviar mail cliente; editar trabajo";
								if(parseInt(value.status) <= 3){
									txtCliente = 'Verif Propuesta cliente';
									btnCliente = 'btn-primary';
								}else{
									txtCliente = 'Propuesta trab. terminada';
									btnCliente = 'btn-info';
								}

								if(parseInt(value.status) <= 4){
									txtPorveedor = 'Enviar a proveedor(es)';
									btnProveedor = 'enviarProveedor';
								}else if(parseInt(value.status) === 5){
									txtPorveedor = 'Verificar Rol de Trabajo';
									btnProveedor = 'verifRolTrabajo';
								}else if(parseInt(value.status) === 6){
									txtPorveedor = 'Roles trabajo enviados';
									btnProveedor = 'rolesEnviados';
									btnReenvio = "Reenviar roles a cliente";
								}

								tabla += '<button onclick="accionSucursal(' + idCliente + ','+value.idsucursal+ ',' + "'" + txtCliente + "','" + btnCliente + "','" + txtPorveedor + "','" + btnProveedor + "','" + value.nombre + "','" + btnReenvio + "'" + ')" class="btn btn-xs btn-success">' + value.nombre + '</button>&nbsp;&nbsp;';
							});

							PNotify.removeAll();
							contenido = '<div class="panel panel-default"><div class="panel-body"><h4>Eliga una sucursal:</h4>'+tabla+'</div></div>';
							new PNotify({
							    title: 'Configuración en Proceso',
							    text: contenido,
							    hide: false,
							    width: '600px'
							});
						}
					});
				}
				console.log(data);
				removeSpinner();
			}
		});
	}else{
		removeSpinner();
		toast1("Error", "El periodo de este trabajo ha expirado", 8000, "error");
	}
}
// FUNCION DE MENSAJE DE SUCURSAL
function accionSucursal(idTrab, idSuc, txtCliente, btnCliente, txtPorveedor, btnProveedor, nomSuc, reenvio){
	PNotify.removeAll();
	var printBtn = '';
	if(txtPorveedor === "Roles trabajo enviados"){
		printBtn = '<span class="glyphicon glyphicon-pencil"></span>';
	}
	new PNotify({
	    title: 'Configuracion en proceso',
	    text: '</b>Sucursal: <b>'+ nomSuc +'\n\n¿Que desea hacer?',
	    icon: 'glyphicon glyphicon-question-sign',
	    hide: false,
	    type: 'success',
		styling: 'bootstrap3',
	    confirm: {
        confirm: true,
        buttons: [{
            text: txtCliente,
            addClass: btnCliente+' btn-xs',
            click: function(notice) {
            	$.ajax({
					url:'routes/routeTrabajos.php',
					type:'post',
					data: {info: idTrab ,action: 'traerMail'},
					dataType:'json',
					error: function(error){
						console.log(error);
					},
					success: function(data){
						if(btnCliente === 'btn-primary'){
							PNotify.removeAll();
							window.open('http://' + window.location.hostname + folder + '/configTrabajo.php?user='+data[0].id+';key='+data[0].url+';sucId='+idSuc, '_blank');
						}
					}
				});
            }
        }, {
        	text: txtPorveedor,
        	addClass: 'btn-xs '+btnProveedor,
        		click: function(notice) {
        			if(btnCliente === 'btn-primary'/*parseInt(btn) < 8*/){
							toast1("Paso incorrecto", "Se requiere que la propuesta del cliente esté verificada", 12000, "info");
					}else{
						if(btnProveedor === 'enviarProveedor'){
							$.confirm({
								title: 'ADVERTENCIA!',
								content: 'Tanto el adm. como el cliente ya no podrán acceder a la configuracion de este trabajo. <br>¿Desea enviar informacion a proveedor?',
								confirm: function(){
									enviarMailProveedor(idTrab, idSuc);
								},
								cancel: function(){}
							});
						}else if(btnProveedor === 'verifRolTrabajo'){
							mostrarRoles(idTrab, idSuc);
							guardarRolACCION = true;
						}else if(btnProveedor === 'rolesEnviados'){
							traerRolesImprimir(idTrab, idSuc);
						}
					}
				}
			}, {
			text: reenvio,
			addClass: 'btn-default btn-xs',
				click: function(notice) {
					if(btnCliente === 'btn-primary'){
						reenvioMailCliente(idTrab, idSuc);
					}else if(btnProveedor === 'rolesEnviados'){
						reenvioRolPropuesta(idTrab, idSuc);
					}else{
						toast1("Accion no válida", "No tiene ninguna actividad programada<br><br><b>Enviar config. cliente</b><br><b>Enviar roles al cliente</b>", 12000, "info");
					}
				}
			}]
		},
		buttons: {
			closer: true,
			sticker: false
		},
		history: {
			history: false
		}
	});
}

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

function enviarMailTrabajo(id, reenviar){
	showSpinner();
	var mensaje = correoForm;
	mensaje = mensaje.replace("*TITULO*", "Apreciable *CLIENTE*");
	mensaje = mensaje.replace("*MENSAJE*", "Por medio de este correo, el equipo de Heraldos pone a su dispocisión la herramienta de personalización de trabajos. Podrá acceder a dicha herramienta dando click en el siguiente botón...");
	mensaje = mensaje.replace("*COLOR*", "color: #fff;background-color: #5bc0de;border-color: #46b8da;");
	mensaje = mensaje.replace("*URL*", "http://" + window.location.hostname + folder + "/configTrabajo.php?user=*IDMAIL*;key=*URL*");
	mensaje = mensaje.replace("*ACCION_TRABAJO*", "Configurar Trabajo");

	var mailData = {
		idCliente: id,
		contenido: mensaje,
		accion: reenviar
	};
	$.ajax({
		url:'routes/routeTrabajos.php',
		type:'post',
		data: {info: mailData ,action: 'generarMail'},
		dataType:'json',
		error: function(error){
			console.log(error);
			toast1("Error", "Hubo un error al enviar el correo", 6000, "error");
			removeSpinner();
		},
		success: function(data){
			console.log(data);
			toast1("Exito", "Correo enviado con exito", 6000, "success");
			removeSpinner();
			if(reenviar === "NUEVO"){
				setTimeout(function(){
					location.reload();
				}, 2000);
			}
		}
	});
}

// ::::::::::: FUNCION REENVIO MAIL CLIENTE :::::::}
function reenvioMailCliente(idTrab, idSuc){
	$.confirm({
		title: 'ENVIAR CORREO A CLIENTE PARA EDITAR',
		content: '¿Desea habilitar la opcion para que el cliente edite su trabajo?',
		theme: 'light',
		confirm: function(){
			showSpinner();
			var contMail = {
				trab: idTrab,
				suc: idSuc
			};
			$.ajax({
				url:'routes/routeTrabajos.php',
				type:'post',
				data: {info: contMail, action: 'edicionMailCliente'},
				dataType:'json',
				error: function(error){
					toast1("Error", "Hubo un error al reenviar el correo", 6000, "error");
					console.log(error);
					removeSpinner();
				},
				success: function(data){
					console.log(data);
					removeSpinner();
					if(data === "EXITO"){
						toast1("Exito", "Se ha habilitado la opcion para que el cliente edite su propuesta.<br><br><b>Le recomendamos ponerse en contacto con el para coordinar la actividad.</b>", 6000, "success");
					}else{
						toast1("Error", "Hubo un error al reenviar el correo", 6000, "error");
					}
				}
			});
		},
		cancel: function(){}
	});
}


// FUNCION DE MAIL DE PROVEEDORES
function enviarMailProveedor(idTrab, idSuc){
	PNotify.removeAll();
	showSpinner();
	var dataMailProv = {
		cliente: idTrab,
		suc: idSuc
	};
	$.ajax({
		url:'routes/routeTrabajos.php',
		type:'post',
		data: {info: dataMailProv, action: 'enviarMailProveedor'},
		dataType:'json',
		error: function(error){
			console.log(error);
		},
		success: function(data){
			console.log(data);
			if(data === "ENVIADO"){
				toast1("Exito", "Correo enviado con exito", 6000, "success");
			}else if(data === "COMPLETADO"){
				toast1("Trabajo completo", "El status muestra que el trabajo está completamente configurado", 8000, "info");
			}else if(data === "EDITANDO"){
				toast1("Atención!", "El status de este trabajo muestra que el cliente esta en proceso de edición.\n<b>Pongase en contacto con el cliente.</b>", 8000, "info");
			}
			removeSpinner();
		}
	});
}

// :::::::::::::::::::::::::: [ 18/11/2017 ] :::::::::::::::::::::::::::::::
// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// ************ FUNCIONES AGREGADAS PARA ACTUALIZAR PERIFONEO **************
function verifSucursalesPerifoneoP1(idTrab){
	$.ajax({
		url:'routes/routeTrabajos.php',
		type:'post',
		data: {info: idTrab ,action: 'verifSucursalesPerifoneoP1'},
		dataType:'json',
		beforeSend: function(){
			showSpinner();
		},
		error: function(error){
			toast1("Error", "Hubo un error al enviar el correo", 6000, "error");
			removeSpinner();
		},
		success: function(data){
			console.log(data);
			var tabla = '';
			$.each(data, function (key, value){
				var btn = "";
				var pop = "";
				if(value.status > 0){
					btn = "btn-success";
				}else{
					btn = "btn-default";
				}

				tabla += '<button class="configPerifoneoBTN btn btn-xs ' + btn + '" idsuc="' + value.idSuc + '" sucursal="' + value.nomSuc + '" cliente="' + value.cliente + '" cant="' + value.cantidad + '" trab="' + value.idTrab + '" estatus="' + value.status + '" popmenu="' + value.statusbtn + '">' + value.nomSuc + '</button>&nbsp;&nbsp;';
			});

			PNotify.removeAll();
			var contenido = '<div class="panel panel-default"><div class="panel-body"><h4>Configurar sucursal:</h4>'+tabla+'</div></div>';
			new PNotify({
			    title: 'Configuración fechas de <b>Perifoneo</b>',
			    text: contenido,
			    hide: false,
			    width: '600px'
			});

			$('.configPerifoneoBTN').each(function(){
				if(parseInt($(this).attr("estatus")) > 0){
					var popTxt = "";
					if(parseInt($(this).attr("popmenu")) > 0){
						popTxt = '<div align="center"><button class="impTrabPerifoneo btn btn-xs rolesEnviados" trab="' + $(this).attr("trab") + '" suc="' + $(this).attr("idsuc") + '" cant="' + $(this).attr("cant") + '" cliente="' + $(this).attr("cliente") + '" sucursal="' + $(this).attr("sucursal") + '" style="margin-bottom: 15px;"><span class="glyphicon glyphicon-print"></span>&nbsp;Ver Detalle</button><br><button class="mailTrabPerifoneo btn btn-xs btn-default"  trab="' + $(this).attr("trab") + '" suc="' + $(this).attr("idsuc") + '" cant="' + $(this).attr("cant") + '" cliente="' + $(this).attr("cliente") + '" sucursal="' + $(this).attr("sucursal") + '"><span class="glyphicon glyphicon-envelope"></span>&nbsp;Enviar detalle</button></div>'
					}else{
						popTxt = '<div align="center"><button class="configTrabPerifoneo btn btn-xs btn-default" trab="' + $(this).attr("trab") + '" suc="' + $(this).attr("idsuc") + '" cant="' + $(this).attr("cant") + '" cliente="' + $(this).attr("cliente") + '" sucursal="' + $(this).attr("sucursal") + '" style="margin-bottom: 15px;"><span class="glyphicon glyphicon-cog"></span>&nbsp;Configurar</button><br><button trab="' + $(this).attr("trab") + '" suc="' + $(this).attr("idsuc") + '" cant="' + $(this).attr("cant") + '" cliente="' + $(this).attr("cliente") + '" sucursal="' + $(this).attr("sucursal") + '" class="editTrabPerifoneo btn btn-xs btn-info" style="margin-bottom: 15px;"><span class="glyphicon glyphicon-pencil"></span>&nbsp;Editar Config.</button><br><button name="' + $(this).attr("trab") + '" namedos="' + $(this).attr("idsuc") + '" nametres="' + $(this).attr("cliente") + '" class="enviarMailPerifoneo btn btn-xs btn-warning" style="margin-bottom: 35px;"><span class="glyphicon glyphicon-envelope"></span>&nbsp;Enviar correo</button><br><button class="btn btn-xs btn-danger">Cerrar</button></div>';
					}

					$(this).attr("data-toggle", "popover");
					$(this).attr("data-trigger", "focus");
					$(this).attr("data-original-title", "Opciones");
					$(this).attr("data-placement", "bottom");
					$(this).attr("data-html", "true");
					$(this).attr("data-content", popTxt);
					$('[data-toggle="popover"]').popover();
				}
			});
		}
	});
}

// ABRIR MODAL PARA CONFIGURAR SUCURSAL
$(document).on('click', '.configPerifoneoBTN', function(){
	var status = parseInt($(this).attr("estatus"));
	if(status === 0){
		PNotify.removeAll();
		var periodoFechas = $('#periodo_' + $(this).attr("trab")).text().split(" -a- ");
		$('#tituloPerifoneoFechas').text('Trabajo N° ' + $(this).attr("trab") + ' - ' + $(this).attr("sucursal"));
		$('#tiempoTotalPerifoneo').text($(this).attr("cant"));
		$('#tiempoRestantePerifoneo').text($(this).attr("cant"));

		$('#iniPerifoneoConfig').val('');
		$('#finPerifoneoConfig').val('');
		$('#tablaPerifoneoConfig').html('');

		$('#perifConfigGuardarMail').attr("name", $(this).attr("trab"));
		$('#perifConfigGuardar').attr("name", $(this).attr("trab"));
		$('#perifConfigGuardarMail').attr("namedos", $(this).attr("idsuc"));
		$('#perifConfigGuardar').attr("namedos", $(this).attr("idsuc"));
		$('#perifConfigGuardarMail').attr("nametres", $(this).attr("cliente"));
		$('#perifConfigGuardar').attr("nametres", $(this).attr("cliente"));

		$('#perifConfigGuardarMailDiv').show();
		$('#perifConfigGuardarDiv').show();
		$('#perifConfigEditarDiv').hide();

		var iniPeriodo = new Date(periodoFechas[0].replace(/-/gi, "/")), finPeriodo = new Date(periodoFechas[1].replace(/-/gi, "/"));
		$('#periodoTrabajo').html('');
		while(iniPeriodo <= finPeriodo){
			var fechaForm = iniPeriodo.toString().split(" ")[3] + "/" + obtenerMesNumero(iniPeriodo.toString().split(" ")[1]) + "/" + iniPeriodo.toString().split(" ")[2];
			$('#periodoTrabajo').append('<option value="' + fechaForm + '">' + fechaForm + '</option>');
			iniPeriodo.setDate(iniPeriodo.getDate() + 1);
		}

		$('#modalPerifoneoFechas').modal('show');
	}
});

// BOTON QUE TRAE LA INFO DE LA CONFIGURACION DE PERIFONEO
$(document).on('click', '.editTrabPerifoneo', function(){
	PNotify.removeAll();
	var periodoFechas = $('#periodo_' + $(this).attr("trab")).text().split(" -a- ");
	$('#tituloPerifoneoFechas').text('Trabajo N° ' + $(this).attr("trab") + ' - ' + $(this).attr("sucursal"));
	$('#tiempoTotalPerifoneo').text($(this).attr("cant"));
	$('#tiempoRestantePerifoneo').text('0');

	$('#iniPerifoneoConfig').val('');
	$('#finPerifoneoConfig').val('');
	$('#tablaPerifoneoConfig').html('');

	$('#perifConfigEditar').attr("name", $(this).attr("trab"));
	$('#perifConfigEditar').attr("namedos", $(this).attr("suc"));
	$('#perifConfigEditar').attr("nametres", $(this).attr("cliente"));

	$('#perifConfigGuardarMailDiv').hide();
	$('#perifConfigGuardarDiv').hide();
	$('#perifConfigEditarDiv').show();

	var iniPeriodo = new Date(periodoFechas[0].replace(/-/gi, "/")), finPeriodo = new Date(periodoFechas[1].replace(/-/gi, "/"));
	$('#periodoTrabajo').html('');
	while(iniPeriodo <= finPeriodo){
		var fechaForm = iniPeriodo.toString().split(" ")[3] + "/" + obtenerMesNumero(iniPeriodo.toString().split(" ")[1]) + "/" + iniPeriodo.toString().split(" ")[2];
		$('#periodoTrabajo').append('<option value="' + fechaForm + '">' + fechaForm + '</option>');
		iniPeriodo.setDate(iniPeriodo.getDate() + 1);
	}
	var confPerif = {
		idTrab: $(this).attr("trab"),
		idSuc: $(this).attr("suc")
	};
	$.ajax({
		url:'routes/routeTrabajos.php',
		type:'post',
		data: {info: confPerif, action: 'traerConfigPerifoneo'},
		dataType:'json',
		beforeSend: function(){
			showSpinner();
		},
		error: function(error){
			toast1("Error", "Hubo un error inesperado.", 6000, "error");
			removeSpinner();
		},
		success: function(data){
			$(data).each(function (key, value){
				var id = cadAleatoria(5);
				$('#tablaPerifoneoConfig').append('<tr name="' + id + '" id="tr_' + id + '"><td id="fecha_' + id + '">' + value.fecha + '</td><td id="ini_' + id + '">' + value.inicio.split(" ")[1] + '</td><td id="fin_' + id + '">' + value.fin.split(" ")[1] + '</td><td id="cnt_' + id + '">' + value.minutos + '</td><td><button name="' + id + '" class="quitarPerifConfig btn btn-xs btn-danger"><span class="glyphicon glyphicon-remove"></span></button></td></tr>');
			});
			removeSpinner();
			verifSucTrabajoStatus(parseInt(confPerif["idTrab"]), parseInt(confPerif["idSuc"]), function(status){
				if(parseInt(status) > 2){
					toast1("Atención!", "Ya no puede realizar la acción", 6000, "error");
				}else{
					$('#modalPerifoneoFechas').modal('show');
					setTimeout(function(){
						toast1("Atención!", "Es posible que su cliente haya configurado este trabajo.<br><b>Le recomendamos consultar con el, antes de realizar cualquier cambio en la configuración.</b>", 12000, "info");
					}, 500);
				}
			});
		}
	});
});

// BOTON QUE AGREGA LA FEHCA A LA LISTA DE CONFIGURACION DE PERIFIONEO
$(document).on('click', '#agregarConfigPerifoneo', function(){
	var fechaTotal = $('#periodoTrabajo').val() + " " + $('#iniPerifoneoConfig').val() + " " + $('#finPerifoneoConfig').val();
	var duplicada = false;
	$('#tablaPerifoneoConfig tr').each(function(){
		var id = $(this).attr("name");
		var fechaVerif = $("#fecha_" + id).text() + " " + $("#ini_" + id).text() + " " + $("#fin_" + id).text();
		if(fechaTotal === fechaVerif)
			duplicada = true;
	});

	if(duplicada === false){
		var fechaHrInicio = new Date($('#periodoTrabajo').val() + " " + $('#iniPerifoneoConfig').val()).getTime(), fechaHrFin = new Date($('#periodoTrabajo').val() + " " + $('#finPerifoneoConfig').val()).getTime();
		if(fechaHrFin > fechaHrInicio){
			var minutos = (fechaHrFin - fechaHrInicio) / 60000;
			if(minutos <= parseInt($('#tiempoRestantePerifoneo').text())){
				var id = cadAleatoria(5);
				$('#tablaPerifoneoConfig').append('<tr name="' + id + '" id="tr_' + id + '"><td id="fecha_' + id + '">' + $('#periodoTrabajo').val() + '</td><td id="ini_' + id + '">' + $('#iniPerifoneoConfig').val() + '</td><td id="fin_' + id + '">' + $('#finPerifoneoConfig').val() + '</td><td id="cnt_' + id + '">' + minutos + '</td><td><button name="' + id + '" class="quitarPerifConfig btn btn-xs btn-danger"><span class="glyphicon glyphicon-remove"></span></button></td></tr>');
				$('#tiempoRestantePerifoneo').text(parseInt($('#tiempoRestantePerifoneo').text()) - minutos);
			}else{
				toast1("Error Horas", "Los <b>MINUTOS</b> proporcionadas son mayores al restante", 8000, "error");
			}

			console.log((fechaHrFin - fechaHrInicio) / 60000);
		}else{
			toast1("Error Horas", "Los <b>MINUTOS</b> proporcionadas generan fechas incongruentes", 8000, "default");
		}
	}else{
		toast1("Atención!", "Ya <b>EXISTE LA CONFIGURACIÓN</b> colocada", 8000, "default");
	}
});

// FUNCION QUE QUITA CONFIGURACION DE LA LISTA DE PERIFONEO
$(document).on('click', '.quitarPerifConfig', function(){
	$('#tiempoRestantePerifoneo').text(parseInt($('#tiempoRestantePerifoneo').text()) + parseInt($('#cnt_' + $(this).attr("name")).text()));
	$('#tr_' + $(this).attr("name")).remove();
});

// BOTON QUE GUARDA Y ENVIA MAIL AL GUARDAR CONFIGURACION DE PERIFONEO DE SUCURSAL
$(document).on('click', '#perifConfigGuardarMail', function(){
	altaConfigPerifoneo(parseInt($(this).attr("name")), parseInt($(this).attr("namedos")), parseInt($(this).attr("nametres")), true, true);
});
// BOTON QUE GUARDA SOLAMENTE LA CONFIGURACION DE PERIFONEO DE SUCURSAL
$(document).on('click', '#perifConfigGuardar', function(){
	altaConfigPerifoneo(parseInt($(this).attr("name")), parseInt($(this).attr("namedos")), parseInt($(this).attr("nametres")), true, false);
});
// BOTON QUE EDITA LA CONFIGURACION DE PERIFONEO DE SUCURSAL
$(document).on('click', '#perifConfigEditar', function(){
	editarConfigPerifoneo(parseInt($(this).attr("name")), parseInt($(this).attr("namedos")));
});
// BOTON QUE ENVIA CORREO DESDE EL PNOTIFY (MENU EMERGENTE DE CONFIG PERIFONEO) SIN GUARDAR
$(document).on('click', '.enviarMailPerifoneo', function(){
	var trab = parseInt($(this).attr("name")), suc = parseInt($(this).attr("namedos")), cliente = parseInt($(this).attr("nametres"));
	verifSucTrabajoStatus(trab, suc, function(status){
		if(parseInt(status) > 2){
			toast1("Atención!", "Ya no puede realizar la acción", 6000, "error");
		}else{
			$.confirm({
				title: 'ENVIAR CORREO A CLIENTE PARA EDITAR',
				content: '¿Desea habilitar la opcion para que el cliente edite su trabajo?',
				theme: 'light',
				confirm: function(){
					altaConfigPerifoneo(trab, suc, cliente, false, true);
				},
				cancel: function(){}
			});
		}
	});
});
// BOTON QUE MANDA A IMPRIMIR EL DETALLE DEL PERIFONEO
$(document).on('click', '.impTrabPerifoneo', function(){
	traerDetallePerifoneo($(this).attr("trab"), $(this).attr("suc"), 1);
});
// BOTON QUE MANDA EL MAIL CON EL DETALLE DEL PERIFONEO
$(document).on('click', '.mailTrabPerifoneo', function(){
	traerDetallePerifoneo($(this).attr("trab"), $(this).attr("suc"), 2);
});

// BOTON QUE LLAMA NUEVA PESTAÑA PARA CONFIGURAR TRABAJO DE PERIFONEO
$(document).on('click', '.configTrabPerifoneo', function(){
	var trab = parseInt($(this).attr("trab")), suc = parseInt($(this).attr("suc")), cliente = parseInt($(this).attr("cliente"));
	verifSucTrabajoStatus(trab, suc, function(status){
		if(parseInt(status) > 2){
			toast1("Atención!", "Ya no puede configurar este trabajo", 6000, "error");
		}else{
			accionTrab2(trab, suc, cliente);
		}
	});
})

// FUNCION QUE GUARDA LA CONFIG DE PERIFONEO (ENVIA MAIL DEPENDIENDO LO QUE EL USUARIO ELIGA)
function altaConfigPerifoneo(idTrab, idSuc, idCliente, alta, mail){
	var perifJson = [];
	var cont = 0;
	$('#tablaPerifoneoConfig tr').each(function(){
		var id = $(this).attr("name");
		cont++;
		var config = {
			fecha: $("#fecha_" + id).text(),
			hrinicio: $("#fecha_" + id).text() + " " + $("#ini_" + id).text(),
			hrfin: $("#fecha_" + id).text() + " " + $("#fin_" + id).text(),
			minutos: $("#cnt_" + id).text()
		};
		perifJson.push(config);
	});
	if(cont > 0 && parseInt($('#tiempoRestantePerifoneo').text()) === 0 || alta === false){
		var info = {
			idTrab: idTrab,
			idSuc: idSuc,
			cliente: idCliente,
			json: perifJson,
			alta: alta,
			mail: mail,
			cantidad: parseInt($('#tiempoTotalPerifoneo').text())
		};
		$.ajax({
			url:'routes/routeTrabajos.php',
			type:'post',
			data: {info: info, action: 'configPerifoneo'},
			dataType:'json',
			beforeSend: function(){
				showSpinner();
			},
			error: function(error){
				toast1("Error", "Hubo un error inesperado.", 6000, "error");
				removeSpinner();
			},
			success: function(data){
				if(data === true){
					if(mail === true){
						toast1("Éxito", "Guardado y mail enviado con éxito", 6000, "success");
					}else if(mail === false){
						toast1("Éxito", "Guardado con éxito", 6000, "success");
					}
					$('#modalPerifoneoFechas').modal('hide');
				}else{
					toast1("Error", "Hubo un error al guardar configuración perifoneo", 6000, "error");
				}
				removeSpinner();
			}
		});
	}else{
		if(cont === 0){
			toast1("Atención!", "<b>La lista de configuración de horas está vacia</b>", 8000, "error");
		}else if(parseInt($('#tiempoRestantePerifoneo').text()) > 0){
			toast1("Atención!", "Falta tiempo <b>RESTANTE</b> por asignar", 8000, "error");
		}
	}
}

// FUNCION QUE EDITA LA CONFIGURACION DE PERIFONEO
function editarConfigPerifoneo(idTrab, idSuc){
	var perifJson = [];
	var cont = 0;
	$('#tablaPerifoneoConfig tr').each(function(){
		var id = $(this).attr("name");
		cont++;
		var config = {
			fecha: $("#fecha_" + id).text(),
			hrinicio: $("#fecha_" + id).text() + " " + $("#ini_" + id).text(),
			hrfin: $("#fecha_" + id).text() + " " + $("#fin_" + id).text(),
			minutos: $("#cnt_" + id).text()
		};
		perifJson.push(config);
	});
	if(cont > 0 && parseInt($('#tiempoRestantePerifoneo').text()) === 0){
		var info = {
			idTrab: idTrab,
			idSuc: idSuc,
			json: perifJson,
			cantidad: parseInt($('#tiempoTotalPerifoneo').text())
		};
		$.ajax({
			url:'routes/routeTrabajos.php',
			type:'post',
			data: {info: info, action: 'editarConfigPerifoneo'},
			dataType:'json',
			beforeSend: function(){
				showSpinner();
			},
			error: function(error){
				toast1("Error", "Hubo un error inesperado.", 6000, "error");
				removeSpinner();
			},
			success: function(data){
				if(data === true){
					toast1("Éxito", "Guardado con éxito", 6000, "success");
					$('#modalPerifoneoFechas').modal('hide');
				}else{
					toast1("Error", "Hubo un error al guardar configuración perifoneo", 6000, "error");
				}
				removeSpinner();
			}
		});
	}else{
		if(cont === 0){
			toast1("Atención!", "<b>La lista de configuración de horas está vacia</b>", 8000, "error");
		}else if(parseInt($('#tiempoRestantePerifoneo').text()) > 0){
			toast1("Atención!", "Falta tiempo <b>RESTANTE</b> por asignar", 8000, "error");
		}
	}
}

// FUNCION QUE MANDA LLAMAR LA CONFIGURACION DEL TRABAJO DE PERIFONEO
function accionTrab2(idTrab, idSuc, idCliente){
	$.ajax({
		url:'routes/routeTrabajos.php',
		type:'post',
		data: {info: {trab: idTrab, suc: idSuc, cliente: idCliente}, action: 'configTrabajoPerifoneo'},
		dataType:'json',
		beforeSend: function(){
			showSpinner();
		},
		error: function(error){
			console.log(error);
			removeSpinner();
		},
		success: function(data){
			removeSpinner();
			if(data.length > 0){
				var link = "";
				$(data).each(function (key, value){
					link = 'http://' + window.location.hostname + folder + '/configTrabajoPerif.php?user='+value.id+';key='+value.url + ';sucId=' + idSuc
				});
				window.open(link, '_blank');
			}else{
				toast1("Atención!", "Faltan <b>SUCURSALES</b> por configurar.", 8000, "info");
			}
		}
	});
}

// FUNCION DE USO GENERAL PARA VERIFICAR EL STATUS DEL TRABAJO (DE MOMENTO, SOLO PARA PERIFONEO)
function verifSucTrabajoStatus(idTrab, idSuc, callback){
	$.ajax({
		url:'routes/routeTrabajos.php',
		type:'post',
		data: {info: {trab: idTrab, suc: idSuc}, action: 'verifSucTrabajoStatus'},
		dataType:'json',
		error: function(error){
			console.log(error);
			callback(false);
		},
		success: function(data){
			callback(data);
		}
	});
}

// ************** MAS ACCIONES DE PERIFONEO ********************
// FUNCION QUE TRAE LA INFORMACION DEL PERIFONEO
function traerDetallePerifoneo(idTrab, idSuc, accion){
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
			console.log(data);
			if(accion === 1){
				imprimirPerifoneo(data);
			}else{
				mailTrabajoPerifoneo(idTrab, data);
			}
		}
	});
}
// FUNCION QUE ENVIA CORREO DE DETALLE TRABAJO PERIFONEO
function mailTrabajoPerifoneo(idTrab, json){
	PNotify.removeAll();
	showSpinner();
	var cuerpoCorreo = "";

	var clienteJSON = json["cliente"];
	var configJSON = json["config"];

	cuerpoCorreo += '<h4>- Datos Generales -</h4>'+
		'<p><b>Sucursal: </b>' + clienteJSON["nombre"] + '</p>'+
		'<p><b>Encargado: </b>' + clienteJSON["encargado"] + '</p>'+
		'<p><b>Vigencia: </b>' + clienteJSON["vigencia"] + '</p>'+
		'<p><b>Tipo: </b>' + clienteJSON["tipo"] + '</p>'+
		'<p><b>Cnt. Total: </b>' + clienteJSON["cantidad"] + '</p>'+
		'<p><b>Cnt. Tienda: </b>0</p>';

	cuerpoCorreo += '<br><h4>- Detalles de Trabajo -</h4>';
	$(configJSON).each(function (key, value){
		cuerpoCorreo += '<p><b>Fecha: </b>' + value.fecha + '</p>'+
		'<p><b>Hr Inicio: </b>' + value.inicio.split(" ")[1] + '</p>'+
		'<p><b>Hr Término: </b>' + value.fin.split(" ")[1] + '</p>'+
		'<p><b>Proveedor(es): </b>' + value.proveedores + '</p>'+
		'<p><b>Cant (mins): </b>' + value.minutos + '</p>';
		ordenarJSON(json[value.id], 'id', 'asc');
		$(jsonORDENADO).each(function (key, value2){
			cuerpoCorreo += '<p>► ' + value2.nombre + ' - ' + value2.inicio.split(" ")[1].split(":")[0] + ":" + value2.inicio.split(" ")[1].split(":")[1] + ' - ' + value2.fin.split(" ")[1].split(":")[0] + ":" + value2.fin.split(" ")[1].split(":")[1] + ' - ' + value2.cantidad + '</p>'
		});
		cuerpoCorreo += '<hr><br>';
	});

	var rolJSON = {
		id : idTrab,
		mensaje: cuerpoCorreo
	};
	
	$.ajax({
		url:'routes/routeTrabajos.php',
		type:'post',
		data: {info: rolJSON ,action: 'reenvioRoles'},
		dataType:'json',
		error: function(error){
			console.log(error);
			removeSpinner();
		},
		success: function(data){
			removeSpinner();
			if(data === "EXITO"){
				toast1("Exito", "Correo enviado con exito", 6000, "success");
			}else{
				toast1("Error!", "Hubo un error al enviar propuesta de trabajo.", 9000, "error");
			}
		}
	});
	
}

// **************************************************************
// :::::::::::::: FUNCIONES MISCELANEAS AUXILIARES ::::::::::::::
function obtenerMesNumero(mes){
	if(mes === "Jan")
		return "01";
	else if(mes === "Feb")
		return "02";
	else if(mes === "Mar")
		return "03";
	else if(mes === "Apr")
		return "04";
	else if(mes === "May")
		return "05";
	else if(mes === "Jun")
		return "06";
	else if(mes === "Jul")
		return "07";
	else if(mes === "Aug")
		return "08";
	else if(mes === "Sep")
		return "09";
	else if(mes === "Oct")
		return "10";
	else if(mes === "Nov")
		return "11";
	else if(mes === "Dec")
		return "12";
}

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// *************** IMPRESION DE ROLES DE TRABAJO ****************
function traerRolesImprimir(idTrab, idSuc){
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
			imprimirRoles(data);
			removeSpinner();
		}
	});
}
var imprimirRolesDATAGLOBAL = {};
function imprimirRoles(json){
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
			{text: fechaFormatoCompleto(value.inicio), style: 'textoTabla2'},
			{text: fechaFormatoCompleto(value.fin), style: 'textoTabla2'}
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
							{text: [{ text: 'Vigencia: ', style: 'tituloTabla1' },{ text: fechaFormatoCompleto(cliente[0]["vigencia"].split(" a ")[0]) + " a " + fechaFormatoCompleto(cliente[0]["vigencia"].split(" a ")[1]), style: 'textoTabla1' }], border: [false, false, false, false], colSpan: 3},
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

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// ******* IMPRESION DE DETALLES DE TRABAJO PERIFONEO ***********
function imprimirPerifoneo(json){
	console.log(json);
	var cliente = json["cliente"];
	var config = json["config"];
console.log(config);
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
							{text: [{ text: 'Vigencia: ', style: 'tituloTabla1' },{ text: fechaFormatoCompleto(cliente["vigencia"].split(" a ")[0]).toString() + " a " + fechaFormatoCompleto(cliente["vigencia"].split(" a ")[1]).toString(), style: 'textoTabla1' }], border: [false, false, false, false], colSpan: 3},
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
							{text: 'Fecha: ' + fechaFormatoCompleto(value.fecha), style: 'tituloTabla2', fillColor: '#BEBEBE'},
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

// FUNCION NUEVA 08-03-2018
// CREACION DE NUEVA FEHCA FORMATO "Miercoles 20 de Febrero de 2018"
function fechaFormatoCompleto(fecha){
	var f = new Date(fecha).adicionarDia(1).toString().split(" "), dia = "", mes = "";
    // GENERAR EL DIA
    if(f[0] === "Mon"){
    	dia = "Lunes";
    }else if(f[0] === "Tue"){
    	dia = "Martes";
    }else if(f[0] === "Wed"){
    	dia = "Miercoles";
    }else if(f[0] === "Thu"){
    	dia = "Jueves";
    }else if(f[0] === "Fri"){
    	dia = "Viernes";
    }else if(f[0] === "Sat"){
    	dia = "Sabado";
    }else if(f[0] === "Sun"){
    	dia = "Domingo";
    }
    // GENERAR EL MES
    if(f[1] === "Jan"){
    	mes = "Enero";
    }else if(f[1] === "Feb"){
    	mes = "Febrero";
    }else if(f[1] === "Mar"){
    	mes = "Marzo";
    }else if(f[1] === "Apr"){
    	mes = "Abril";
    }else if(f[1] === "May"){
    	mes = "Mayo";
    }else if(f[1] === "Jun"){
    	mes = "Junio";
    }else if(f[1] === "Jul"){
    	mes = "Julio";
    }else if(f[1] === "Aug"){
    	mes = "Agosto";
    }else if(f[1] === "Sep"){
    	mes = "Septiembre";
    }else if(f[1] === "Oct"){
    	mes = "Octubre";
    }else if(f[1] === "Nov"){
    	mes = "Noviembre";
    }else if(f[1] === "Dic"){
    	mes = "Diciembre";
    }
    return dia + " " + f[2] + " de " + mes + " de " + f[3];
}
// FUNCION QUE ADICIONA UN DIA - POR ERROR LA FECHA MOSTRADA POR JAVASCRIPT ES UN DIA antes
Date.prototype.adicionarDia = function(days) {
  var dat = new Date(this.valueOf());
  dat.setDate(dat.getDate() + days);
  return dat;
}
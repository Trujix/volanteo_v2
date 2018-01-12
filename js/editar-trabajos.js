
//------------------------------- FUNCIONES DE EDICION Y ELIMINACION DE TRABAJOS

//------------------------------ EDITAR TRABAJO --------------
  function llamarEditarTrabajo(accion, id){
 	var dato = accion + ':' + id;
 	$.ajax({
		url:'routes/routeTrabajos.php',
		type:'POST',
		async: false,
		data: {info: dato, action: "accionTrabajos"},
		dataType:'JSON',
		error: function(error){
			console.log(error);
			toast1("Error!", error, 8000, "error");
		},
		success: function(data){
			console.log('exito');
			window.location = 'trabajos.php';
		}
	});
 }
  function editarTrabajo(id){
 	$.ajax({
		url:'routes/routeTrabajos.php',
		type:'POST',
		async: false,
		data: {info: id, action: "editarTrabajo"},
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
            
			var paso1 = data.PASO1;
			var paso2 = data.PASO2;
			var paso3 = data.PASO3;
			var domgeoDATA = data.DOMGEO;

			idsConjunto = '';
			for(c = 0; c < paso2.length; c++){
				if(c > 0){idsConjunto+=',';}
				idsConjunto += paso2[c]['id'];
			}

			var via, otro, status1;
			if(paso1[0]['recibido_via'] === "Email" || paso1[0]['recibido_via'] === "WhatApp" || paso1[0]['recibido_via'] === "SMS"){
				via = paso1[0]['recibido_via'];
				otro = 'NA';
			}else{
				via = 'Otro';
				otro = paso1[0]['recibido_via'];
			}

			if(parseInt(paso1[0]['status']) === 1 || parseInt(paso1[0]['status']) > 2){
				status1 = 1;
			}else{
				status1 = 2;
			}

			// LLENANDO LOS VALORES DE LA VAR
			// GLOBAL STEP1 CORRESP AL PASO 1
			step1 = {
            	txt_cliente  	:  paso1[0].idcliente,
            	txt_fecha 	 	:  paso1[0].fechasolicitud,
            	txt_hora 	 	:  paso1[0].hora,
            	txt_detalles 	:  paso1[0].detalles,
            	txt_alias	 	:  paso1[0].alias,
            	select_via 	 	:  via,
            	txt_otro 	 	:  via == 'Otro' ?  otro : '-',
            	txt_vigencia 	:  paso1[0].vigencia,
            	txt_periodoini 	:  paso1[0].periodoini,
            	txt_periodofin  :  paso1[0].periodofin,
            	select_servicio :  paso1[0].tipo,
            	txt_cantidadP1 	:  paso1[0].cantidad,
            	status			:  status1
            };
            inputCantidadDinamico(paso1[0].tipo);

            // LLENANDO LOS VALORES DE LA VAR
			// GLOBAL STEP2 CORRESP AL PASO 2
            //step2 = {};
            for(i = 0; i < paso2.length; i++){
            	step2[paso2[i].idEdo] = {
            		nombEdo	:  paso2[i].edo,
            		cantidad : paso2[i].cantidad
            	};

            	var municips;
            	var munsLista = '';
            	var llenarNo = true;

            	var cont = 0;
            	for(j = 0; j < paso3.length; j++){
            		if(paso3[j].Zona === paso2[i].idEdo){
            			if(cont > 0){munsLista += ',';}
            			munsLista += paso3[j].municipios;
            			if(llenarNo === true){
            				munsLista += ',' + paso3[j].nocubiertos;
            				llenarNo = false;
            			}
            			cont++;
            		}
            	}
            	munsLista = munsLista.toString().split(',');
            	munsLista.sort();

            	var munsIdLista = [];
            	for(mu = 0 ; mu < munsLista.length; mu++){
            		munsIdLista.push(munsLista[mu].split(':')[0]);
            	}

            	municips = [];
            	
            	var contIds = 0;
            	var intercambio = [];
            	$.each(munsIdLista, function(val, el){
            		if($.inArray(el, intercambio) === -1){
            			if(el !== '0'){
            				intercambio.push(el);
            				municips.push(munsLista[val]);
            				contIds++;
            			}
            		}else{
            			var suma = parseInt(munsLista[val].split(':')[1]) + parseInt(munsLista[val - 1].split(':')[1]);
            			municips[contIds - 1] = munsIdLista[val] + ':' + suma;
            		}
            	});
            	//alert(municips)

            	var bloquesArr = {};
            	var checksArr = {};

            	var bloques = [];
            	var checks = [];
            	for(t = 0; t < municips.length; t++){
            		bloquesArr = {
            			idBloque : paso2[i].idEdo,
            			cantidad : municips[t].split(':')[1],
            			idSucrusal : municips[t].split(':')[0],
            			nomSucursal : ' - '
            		};
            		checksArr = {
            			idEdo : paso2[i].idEdo,
            			cantidad : municips[t].split(':')[1],
            			idMun : municips[t].split(':')[0],
            			nombEdo : ' - '
            		};

            		bloques.push(bloquesArr);
            		checks.push(checksArr);
            	}
            	step2[paso2[i].idEdo]['bloques'] = bloques;
            	step2[paso2[i].idEdo]['checks'] = checks;

            	// ::::::: **** [22/07/2017] ***** :::::::::
	            // AGREGADO VALORES DOMGEO (EN SUSTITUCION POR QUE LA CONSULTA TRAE SUCURSALES, NO DOMGEO)
	            var infoArr = {};
	            var muns = [];
	            console.log(domgeoDATA);
	            for(d = 0; d < domgeoDATA.length; d++){
	            	infoArr = {
	            		cantidad:  domgeoDATA[d].cantidad,
				        idEdo	:  domgeoDATA[d].idEdo,
				        idMun	:  domgeoDATA[d].idMun,
				        nombEdo	:  domgeoDATA[d].nombEdo
	            	};
	            	muns.push(infoArr);
	            }
	            step2[paso2[i].idEdo]['info'] = muns;
            }
            areas = step2;
            bloquesJSON = step2;


            // LLENANDO LOS VALORES DE LA VAR
			// GLOBAL STEP3 CORRESP AL PASO 3
            step3 = {
            	txt_cliente  	:  paso1[0].idcliente,
            	txt_fecha 	 	:  paso1[0].fechasolicitud,
            	txt_hora 	 	:  paso1[0].hora,
            	txt_detalles 	:  paso1[0].detalles,
            	txt_alias	 	:  paso1[0].alias,
            	select_via 	 	:  via,
            	txt_otro 	 	:  via == 'Otro' ?  otro : '-',
            	txt_vigencia 	:  paso1[0].vigencia,
            	txt_periodoini 	:  paso1[0].periodoini,
            	txt_periodofin  :  paso1[0].periodofin,
            	select_servicio :  paso1[0].tipo,
            	txt_cantidadP1 	:  paso1[0].cantidad,
            	status			:  status1
            };

            var p3Arr = {};
            for(e = 0; e < paso2.length; e++){
            	p3Arr[paso2[e].idEdo] = {
            		idedo		: paso2[e].idEdo,
			        edo			: paso2[e].edo,
			        status		: paso2[e].status,
			        cantidad	: paso2[e].cantidad
            	};

            	var p3ArrMuns = {};
            	var bloquesArrMun = {};
            	var checksArrMun = {};

            	var p3ArrMunsAux = [];
            	var bloquesArrMunsAux = [];
            	var checksArrMunsAux = [];
            	for(j = 0; j < paso3.length; j++){
            		if(paso3[j].Zona === paso2[e].idEdo){
            			var cub = paso3[j].municipios.split(',');
            			var nocub = paso3[j].nocubiertos.split(',');
            			p3ArrMuns = {
            				proveedor 	: paso3[j].idProveedor,
			               	cantidad 	: paso3[j].cantidad,
			               	municipios	: cub,
			               	nocubiertos	: nocub
            			}

            			bloquesArrMun = {
            				idBloque : paso2[e].idEdo,
            				cantidad : paso3[j].cantidad,
            				idMun : cub,
            				nombEdo : ' - '
            			};

            			checksArrMun = {
            				idEdo : paso2[e].idEdo,
            				cantidad : paso3[j].cantidad,
            				idScurusal : cub,
            				nomSucursal : ' - '
            			};
            			p3ArrMunsAux.push(p3ArrMuns);
            			bloquesArrMunsAux.push(bloquesArrMun);
            			checksArrMunsAux.push(checksArrMun);
            		}
            	}
            	p3Arr[paso2[e].idEdo]['info'] = p3ArrMunsAux;
            	p3Arr[paso2[e].idEdo]['bloques'] = p3ArrMunsAux;
            	p3Arr[paso2[e].idEdo]['checks'] = checksArrMunsAux;
            }

            step3['zonas'] = p3Arr;

            /*alert(JSON.stringify(step1));
            alert(JSON.stringify(step2));
			alert(JSON.stringify(step3));*/

			// LLENADO DE LOS PASOS
			
			// PASO 1
            $('#txt_cliente').val(paso1[0].idcliente);
            $('#txt_fecha').val(paso1[0].fechasolicitud);
            $('#txt_hora').val(paso1[0].hora);
            $('#txt_detalles').val(paso1[0].detalles);
            $('#txt_alias').val(paso1[0].alias);
            $('#select_via').val(via);
            $('#txt_otro').val(otro);
            $('#txt_vigencia').val(paso1[0].vigencia.split(' a ')[0]);
            $('#txt_vigenciafin').val(paso1[0].vigencia.split(' a ')[1]);
            $('#txt_periodoini').val(paso1[0].periodoini);
            $('#txt_periodofin').val(paso1[0].periodofin);
            $('#select_servicio').val(paso1[0].tipo);
            var cantidadTipo;
            if(paso1[0].tipo === "Perifoneo"){
            	cantidadTipo = parseFloat(paso1[0].cantidad)/* / 60*/;
            }else{
            	cantidadTipo = parseInt(paso1[0].cantidad);
            }
            $('#txt_cantidadP1').val(cantidadTipo);
            
            // PASO 2
            $('#txt_sumatoria').val('0');
            $('#txt_diferencia').val('0');
            $('#txt_diferencia_total').val('0');
            console.log(step2);
            // PASO 3
            $.ajax({
            	url:'routes/routeTrabajos.php',
            	type:'POST',
            	data: {info: step2, action: "step3"},
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
            		console.log(data);

            		if(jQuery.isEmptyObject(data)){
            			toast1("Error!", "Gaurde al menos un trabajo", 8000, "error");
            			return false;
            		}else{
            			// funcion $.each
            			$('#step-3').empty();
            			// ARRODILLENSE ANTE EL DIOS DE LOS
            			// CONTADORES LOGICOS
            			var cont = 0;
								
						var idjson = 0;
								
						// :: VARIABLES AGREGADAS POR TRUJIX
						repetidosProv = [];
						noCubiertos = [];
						munsProv = [];
						cantProv = [];
						var idc3ids;
						var c3idsAux = '[';
						var contIds = 0;
						var cant;
						// :: FIN VARIABLES AGREGADAS POR TRUJIX

						$.each(data, function(index, val){
							cont++;

							var header = "Zona "+cont+" -- "+step2[index]['nombEdo']+" -- "+step2[index]['cantidad'];
							var html = "";

							cant = header.split(" -- ");
							cant = cant[2];

							// llenado auxiliar de JSON para validacion
							idc3ids = '{ "id":"'+idjson+'", "cant":"'+cant+'"';

						    html += '<div name="panelX" class="x_panel">'+
						    		'<div class="x_title">'+
						    		'<h2 id="header_'+cont+'">'+header+'</h2>'+
						    		'<ul class="nav navbar-right panel_toolbox" style="min-width: 0px">'+
						    		'<li><a class="collapse-link"><i class="fa fa-chevron-down"></i></a>'+
						    		'</li>'+
						    		'</ul>'+
						    		'<div class="clearfix"></div>'+
						    		'</div>'+
						    		'<div id="" class="x_content table-responsive" style="display: none">'+
						    		'<input type="text" id="txt_status'+cont+'" hidden>'+
						    		'<table class="table table-striped projects">'+
						    		'<thead id="theadStep3Z'+cont+'"></thead>'+
						    		'<tbody id="tbodyStep3Z'+cont+'"></tbody>'+
						    		'</table>'+
						    		'<div class="col-md-12" hidden id="div_hidden_'+cont+'" style="margin-bottom: 30px;">'+
						    		'</div>'+
						    		'<div class="col-xs-12 no-pading">'+
						    		'<div class="col-xs-6" style="padding-left: 0;">'+
						    		'  <label for="" style="font-size: 15px;">Municipios cubiertos</label>'+
						    		'  <table class="table table-striped table-bordered">'+
						    		'    <thead>'+
						    		'      <tr>'+
						    		'		<th>Nombre</th>'+
						    		'		<th>Cantidad</th>'+
						    		'      </tr>'+
						    		'    </thead>'+
						    		'    <tbody id="tbodyActual_'+cont+'">'+
						    		'    </tbody>'+
						    		'  </table>'+
						    		'</div>'+
						    		'<div class="col-xs-6" style="padding-rigth: 0;">'+
						    		'  <label for="" style="font-size: 15px;">Municipios faltantes de cubrir</label>'+
						    		'  <table class="table table-striped table-bordered">'+
						    		'    <thead>'+
						    		'      <tr>'+
						    		'		 <th>Nombre</th>'+
						    		'		 <th>Cantidad</th>'+
						    		'      </tr>'+
						    		'    </thead>'+
						    		'    <tbody id="tbodyFaltantes_'+cont+'">'+
						    		'    </tbody>'+
						    		'  </table>'+
						    		'</div>'+
						    		'</div>'+
						    		'</div>'+
						    		'</div>';


							$('#step-3').append(html);

							var si = data[index][0];
							var no = data[index][1];
							var munsCubiertos = data[index][2];
							console.log(munsCubiertos);

							var thead = "", tbody = "";
							var munCubiertos = ""; 

										
							if(no.length < 1){
								//step1['status'] = 1;
								$('#txt_status'+cont).val(1);
							}else{
								step1['status'] = 0;
								$('#txt_status'+cont).val(0);
							}

							var siAux = si.length - 1;
							var idJsonAux;
							if(si.length > 0){
										
								for (var i = 0; i < si.length; i++) {
									thead = '<tr>'+
											'<th style="width: 20%">Proveedor</th>'+
											'<th style="width: 20%">Telefono</th>'+
											'<th style="width: 20%">Cantidad</th>'+
											'<th style="width: 30%">Cobertura</th>'+
											'<th style="width: 10%">Seleccionar</th>'+
											'</tr>';

									for (var i = 0; i < si.length; i++) {
										var proveedor = si[i].nombreProv;
										var tel = si[i].tel;
										var idprov = si[i].idProveedor;
										var municipios = si[i].sucursales;

										var htmlMuns = '';

										for (var j = 0; j < municipios.length; j++){
											var value = municipios[j].cantidad+'_'+municipios[j].id;
											htmlMuns += '<option value="'+value+'" name="' + municipios[j].nombre +'">'+municipios[j].nombretxt+'</option>';
											//htmlMuns += '<option value="'+value+'">'+municipios[j].nombre+'</option>';
									    				
									    	// LLENADO DE ARRAYS AUXILIARES PARA DELIMITAR
									    	// MUNICIPIOS REPETIDOS
									    	munsProv.push(municipios[j].nombre);
									    	cantProv.push(municipios[j].cantidad);
									    }
									    munCubiertos += htmlMuns;

									    id = idJsonAux = idprov+'_Z'+index;

									    if(contIds > 0){
									    	c3idsAux+= ',';
									    }

									    c3idsAux+= idc3ids+', "input":"txt_cant'+idJsonAux+'", "check":"ch'+idJsonAux+'" }';
									    contIds++;

									    tbody += '<tr>'+
									    		'<td>'+proveedor+'</td>'+
									    		'<td>'+tel+'</td>'+
									    		'<td>'+
									    		'<input readonly type="text" class="form-control txtCantP3" id="txt_cant'+id+'" style="width: 60%" placeholder="Ej. 500">'+
									    		'</td>'+
									    		'<td>'+
									    		'<select  data-placeholder="Cobertura del proveedor" id="select_muns'+id+'" data="" multiple class="col-xs-12 chosen-select form-control select-in-table">'+
									    		htmlMuns+
									    		'</select>'+
									    		'</td>'+
									    		'<td style="padding: 15px 0px 0px 35px;">'+
									    		'<input name="checkMun" type="checkbox" class="filled-in check_Z'+index+'" id="ch'+id+'" value="'+idprov+'" />'+
									    		'<label for="ch'+id+'"></label>'+
									    		'</td>'+
									    		'</tr>';
								    }
								}
							}else{
								idJsonAux = 'none'+contIds+'_Z'+index;

								if(contIds > 0){
									c3idsAux+= ',';
								}

								c3idsAux+= idc3ids+', "input":"txt_cant'+idJsonAux+'", "check":"ch'+idJsonAux+'" }';
								contIds++;

								$("#div_hidden_"+cont).append('<div class="col-md-2" style="margin-left: 20%;">'+
																'<img src="images/folder2.png" style="width: 100px;height: 100px;">'+
															'</div>'+
															'<div class="col-md-6" style="margin-top: 20px;">'+
																'<h3>No encontramos ningun proveedor para atender esta zona</h3>'+
															'</div>');

								$("#div_hidden_"+cont).attr('hidden', false);
							}


							// $('#tbodyFaltantes_'+cont).empty();
							for (var i = 0; i < no.length; i++) {
								if(no.length > 3){
									$('#tableContainer_'+cont).css({
										"overflow-y": "scroll"
									});
								}

								$('#tbodyFaltantes_'+cont).append('<tr>'+
										'<td>'+no[i].municipio+'</td>'+
										'<td>'+no[i].cantidad+'</td>'+
										'</tr>');
								var cantTemp = cant;
								cant = cant - no[i].cantidad;
								//c3ids.replace(/'"cant":"'+cantTemp+'"'/g, '"cant":"'+cant+'"');
								c3idsAux = c3idsAux.replace(new RegExp('{ "id":"'+idjson+'", "cant":"'+cantTemp+'"', 'g'), '{ "id":"'+idjson+'", "cant":"'+cant+'"');
											
								//ARRAY AUXILIAR DE FALTANTES
								noCubiertos.push([idprov,index,no[i].cantidad,no[i].idmun,cont]);
							}

							// $('#tbodyActual_'+cont).empty();
							for (var i = 0; i < munsCubiertos.length; i++) {
								if(munsCubiertos.length > 3){
									$('#tableContainer_'+cont).css({
										"overflow-y": "scroll"
									});
								}

								$('#tbodyActual_'+cont).append('<tr>'+
									'<td>'+munsCubiertos[i].nomMpo+'</td>'+
									'<td>'+munsCubiertos[i].cantidad+'</td>'+
									'</tr>');
							}
					

							$('#theadStep3Z'+cont).empty();
							$('#tbodyStep3Z'+cont).empty();
							$('#theadStep3Z'+cont).append(thead);
							$('#tbodyStep3Z'+cont).append(tbody);
							$(".chosen-select").chosen({
								no_results_text: "No hay resultados",
								width: "95%"
							});

							idjson = idjson + 1;
						});
						c3idsAux+= ']';
						//return true;
					}

					c3ids = $.parseJSON(c3idsAux);
					console.log(c3ids);
					console.log(noCubiertos);

					//COMPLEJO PROCESO DE DELIMITACION D
					// MUNICIPIOS REPETIDO
					var munsProvaux = []
					var cantProvaux = [];

					var repetidos = [];
					var unico = [];
					var unicoAux = [];
					$.each(munsProv, function(i, el){
						if($.inArray(el, unico) === -1){unico.push(el)}else{repetidos.push(el);cantProvaux.push(cantProv[i])};
					});

					unico = [];
					$.each(repetidos, function(i, el){
					    if($.inArray(el, unico) === -1){unico.push(el);unicoAux.push([el,cantProvaux[i],0]);}
					});
					for(rep = 0;rep < unicoAux.length;rep++){
						repetidosProv.push(unicoAux[rep]);
					}
					console.log(repetidosProv);
					console.log(step2);
				}
			});
			// LLENAR LOS ELEMENTOS DEL PASO 3
			setTimeout(function(){
				for(w = 0; w < paso3.length; w++){
					var optsChosen = [];
					var optsChosenYa = [];
					if(parseInt(paso3[w].idProveedor) !== 0){
						var suma = 0;
						var munCant = paso3[w].municipios.split(',');
						// TRAER LOS IDS DEL SELECT (SE AGREGAN LOS ORIGINALES)
						$('#select_muns'+paso3[w].idProveedor+'_Z'+paso3[w].Zona+' option').each(function(){
							optsChosenYa.push($(this).val());
						});
						for(m = 0; m < munCant.length; m++){
							suma += parseInt(munCant[m].split(':')[1]);
							optsChosen.push(munCant[m].split(':')[1]+'_'+munCant[m].split(':')[0]);
							// INTERCAMBIO DEL VALUE ANTERIOR DE LOS OPTIONS
							// POR EL SELECCIONADO PREV POR EL USUARIO
							$('#select_muns'+paso3[w].idProveedor+'_Z'+paso3[w].Zona+" option[value='"+optsChosenYa[m]+"']").prop('value', optsChosen[m]);
						}

						$('#select_muns'+paso3[w].idProveedor+'_Z'+paso3[w].Zona).val(optsChosen).trigger("chosen:updated");
						$('#txt_cant'+paso3[w].idProveedor+'_Z'+paso3[w].Zona).val(suma);
						$('#ch'+paso3[w].idProveedor+'_Z'+paso3[w].Zona).prop("checked", true);
					}
				}

				// FUNCION AGREGADA PARA VALIDAR CUANDO CAMBIAN LA ESTRUCT DE SUCURSALES, PROVEEDORES ETC.
				var cantTotal = parseInt($('div[class="x_title"] h2').text().split(" -- ")[2]);
				var cantSuma = 0;
				$('.txtCantP3').each(function(){
					cantSuma += parseInt($(this).val());
				});

				if(cantSuma < cantTotal){
					toast1("Atención!", "Al parecer hubo cambios en sucursales y/o proveedores.\n\n<b>Los valores del PASO 2 se han reiniciado.</b>", 8000, "info");
					$('#wizard').smartWizard('disableStep', 3);
					$('#wizard').smartWizard('disableStep', 4);
					bloquesJSON = {};
					$('#txt_diferencia_total').val($('#txt_cantidad_total').val());
					advertMsg = false;
				}
				console.log(cantTotal + " - " + cantSuma);
				removeSpinner();
			},1500);

 		}
 	});
 }

//------------------------------ ELIMINAR TRABAJO --------------
 function eliminarTrabajo(id){
 	$.confirm({
        title: 'Atencion!',
        content: '¿Decea dar de baja este trabajo?',
        confirm: function(){
        	$.ajax({
				url:'routes/routeTrabajos.php',
				type:'POST',
				async: false,
				data: {info: id, action: "eliminarTrabajo"},
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
					window.location = 'ver-trabajos.php';
		 		}
		 	});
		},
		cancel: function(){
			// console.log('false');
		}
	});
 }
// ------------- FUNCION AUXILIAR------------
 function limpiarAccion(){
 	$.ajax({
		url:'routes/routeTrabajos.php',
		type:'POST',
		async: false,
		data: {info: "NUEVO:-", action: "accionTrabajos"},
		dataType:'JSON',
		error: function(error){
			console.log(error);
		}
	});
 }
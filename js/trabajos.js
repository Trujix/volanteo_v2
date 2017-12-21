// ===============  EVENTOS PARA MODULO DE TRABAJOS =====================
	var accionTrabajos;
	var idsConjunto;
	var idPrinc;
	var editStep3;
	$(document).ready(function() {
		//accionTrabajos = 'NUEVO'
		$.ajax({
			url:'routes/routeTrabajos.php',
			type:'POST',
			async: true,
			data: {info: 'accion', action: "traerAccionTrabajos"},
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
				accionTrabajos = data.split(':')[0];
				idPrinc = data.split(':')[1];
				if(accionTrabajos === 'EDITAR'){
					console.log(accionTrabajos);
					setTimeout(function(){
						getClientes(1);
						editarTrabajo(idPrinc);
						buscarCliente();
						editStep3 = false;
						$('#wizard').smartWizard({
				        	onLeaveStep:leaveAStepCallback,
				        	onFinish:onFinishCallback,
				        	enableAllSteps:true
				    	});
				    	sucursalLLENA = true;

				    	removeSpinner();
				    	limpiarAccion();
					},3000);
				}else{
					$('#wizard').smartWizard({
				        onLeaveStep:leaveAStepCallback,
				        onFinish:onFinishCallback,
				    });
				    editStep3 = true;
				    sucursalLLENA = false;
				    getClientes(1);
				}
			}
		});

	});

	var step1 = {};
	var step2 = {};
	var step3 = {};

	var areas = {};

	var edoSelected = $('#txt_estadoT').val();
	var nombEdo = $('#txt_estadoT option:selected').text();
	var step1, step2, spet3;
	var sumaCantidaTotal = 0;
	var sumaCantidadArea = 0;

	var error = "Ocurrió un error, intentelo mas tarde o pongase en contacto con el administrador";
	var success = "La acción se ralizó con exito";
	var validaCampos = "Debe llenar todos los campos para poder guardar";

	$(document).on('change', '#editCliente, #newCliente, #btn_next', function(e){
		e.preventDefault();
	});


// Eventos Paso 1 -------------------------------------------------------
	
	$(document).on('change', '#txt_cliente', function(e){
		buscarCliente();
	});

	function buscarCliente(){
		var idCliente = $('#txt_cliente').val();
		$('#editCliente').attr('onclick', 'editCliente('+idCliente+')');

		$.ajax({
			url:'routes/routeClientes.php',
			type:'POST',
			data: {info: idCliente, action: "get"},
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

				var telefonos = data[0]['tel1']+" | "+data[0]['tel2'];
				$('#p_nombre').html(data[0]['encargado']);
				$('#p_rfc').html(data[0]['rfc']);
				$('#p_tel').html(telefonos);
				$('#p_email').html(data[0]['ctacorreo']);
				
			}
		});
	}

	$(document).on('change', '#select_servicio', function(){
		if($(this).val() === "Perifoneo"){
			toast1("Atencion!", "La cantidad de perifoneo debe ser asignada en <b>MINUTOS</b>.", 8000, "default");
		}else{
			PNotify.removeAll();
		}
	});
// Eventos Paso 2 -------------------------------------------------------
	
	$(document).on('click', '.checksMuns', function(e){
		calculaDiferencia();
		$('#tableContainerMuns, #txt_cantidadP2, #txt_sumatoria').removeClass('invalid');

		var contador = 0;
		$('.checksMuns:checked').each(function(){
			if($(this).prop('checked'))
				contador++;
		});

		if(contador > 0){
			$('#txt_estadoT').attr('disabled','disabled');
			$('#btn_nuevaArea').removeAttr('disabled');
		}
		else{
			$('#btn_nuevaArea').attr('disabled','disabled');
			$('#txt_estadoT').removeAttr('disabled');
		}
	
	});

	$(document).on('click', '#btn_nuevaArea', function(e){

		var cantidadArea = $('#txt_cantidadP2').val();
		var sumatoria = $('#txt_sumatoria').val();
		var diferencia = $('#txt_diferencia').val();
		var alertas = {
			edo: 'No se ha seleccionado sucursal',
			cantidad: 'Antes de continuar debe especificar la cantidad que se utilizara para la sucursal selecionada',
			area: 'Falta definir la cantidad en algúna sucursal seleccionada',
			sumatoria: 'La sumatoria de las unidades asignadas a cada sucursal no coincide con el total seleccionado para el bloque',
			diferencia: 'La diferencia entre las unidades asignadas al bloque y las seleccionadas para las sucursales siempre debe ser cero. Por favor revise de nuevo.'
		};

		if(edoSelected == null){
			$('#txt_estadoT').addClass('invalid');
			customAlert('Atención!',alertas.edo);
		}
		else if(cantidadArea == "0" || cantidadArea == ""){
			$('#txt_cantidadP2').addClass('invalid');
			customAlert('Atención!',alertas.cantidad);
		}
		else if(!addArea(edoSelected, nombEdo)){
			$('#tableContainerMuns').addClass('invalid');
			customAlert('Atención!',alertas.area);
		}
		else if(cantidadArea != sumatoria){
			$('#txt_sumatoria').addClass('invalid');
			$('#txt_cantidadP2').addClass('invalid');
			customAlert('Atención!',alertas.sumatoria);
			calculaDiferencia();
		}
		else if(diferencia != "0"){ // Creo que nunca va a entrar aquí pues entrará primero a la anterior
			$('#txt_diferencia').addClass('invalid');
			customAlert('Atención!',alertas.diferencia);
		}	
		else{
			$('#txt_estadoT').removeAttr('disabled');
			$('#txt_cantidadP2').val('');
			$('#txt_sumatoria').val('');
			$('#txt_diferencia').val('0');
			$('#txt_estadoT').val(0);

			$('#tbody2').empty();
			sucursalLLENA = true;
		}

	});

	$(document).on('keyup', '#txt_cantidadP2, .txt_cantidadMun', function(e){
		
		if($(this).val() == "")
			$(this).val(0);
		
		var currentVal = $(this).val();

		if(currentVal.length == 2){
			// currentVal = currentVal.toString();
			currentVal = currentVal.split('');

			if(currentVal[0] == '0')
				currentVal = currentVal[1];
			else 
				currentVal = currentVal[0]+currentVal[1];


			$(this).val(currentVal);
		}

		calculaDiferencia();

	});

	// **************** CAMBIO [22/07/2017] ***************
	// ESTA FUNCION SE MODIFICO PARA AGREGAR SUCURSALES NE LUGAR DE MUNICIPIOS (PASO 2)
	function traerBloques(){
		$.ajax({
			url:'routes/routeTrabajos.php',
			type:'POST',
			data: {info: $('#txt_cliente').val(), action: "traerBloques"},
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
				var opciones = '<option value="0" selected disabled>Seleccione una opción</option>';
				for(i = 0; i < data.length; i++){
					opciones += '<option value="'+data[i]['idbloque']+'">' + data[i]['nombre'] + '</option>';
				}
				$('#txt_estadoT').html('');
				$('#txt_estadoT').append(opciones);
			}
		});
	}

	// **************** CAMBIO [22/07/2017] ***************
	// ESTA FUNCION SE MODIFICO PARA AGREGAR SUCURSALES NE LUGAR DE MUNICIPIOS (PASO 2)
	var bloquesJSON = {};
	var sucursalLLENA;
	$(document).on('change', '#txt_estadoT', function(e){
		edoSelected = $('#txt_estadoT').val();
		nombEdo = $('#txt_estadoT option:selected').text();
		if(sucursalLLENA === true && jQuery.isEmptyObject(bloquesJSON[edoSelected])){
			bloquesJSON = {};
			sucursalLLENA = false;
			$('#txt_diferencia_total').val($('#txt_cantidad_total').val());
			$('#wizard').smartWizard('disableStep', 3);
			$('#wizard').smartWizard('disableStep', 4);
		}

		$.ajax({
			url:'routes/routeTrabajos.php',
			type:'POST',
			data: {info: edoSelected, action: "traerSucursales"},
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
				$('#tbody2').empty();

				if(data != ""){
					var tbody = '';
					for (var i = 0; i < data.length; i++) {
						tbody += '<tr>'+
			                        '  <td style="padding: 17px 0px 0px 17px;">'+
			                        '	   <input type="checkbox" class="filled-in checksMuns" id="ch_'+data[i].idsucursal+'" value="'+data[i].idsucursal+'" />'+
      								'	   <label for="ch_'+data[i].idsucursal+'"></label>'+
			                        '  </td>'+
			                        '  <td style="width: 73%">'+
			                        '    <center>'+
			                        '      <label id="labelMun_'+data[i].idsucursal+'" style="margin-top: 15px;">'+
			                        '			'+data[i].nombre+
			                        '      </label>'+
			                        '    </center>'+
			                        '  </td>'+
			                        '  <td>'+
			                        '    <input type="text" id="txt_cantidadMun_'+data[i].idsucursal+'" class="form-control txt_cantidadMun" value="0" style="margin-top: 5px;">'+
			                        '  </td>'+
			                        '</tr>';
					}

					$('#tbody2').append(tbody);

					$.each(bloquesJSON, function(index, value){	
						if(index == edoSelected){
							showAlert();

							$('#txt_cantidadP2').val(bloquesJSON[index].cantidad);
							
							for (var i = 0; i <  value['checks'].length; i++) {
								var idMun = value['checks'][i]['idMun'];
								var cantidad = value['checks'][i]['cantidad'];
								$('#ch_'+idMun).prop('checked', 'checked');
								$('#txt_cantidadMun_'+idMun).val(cantidad);
							}
							calculaDiferencia();
							// $('#txt_diferencia_total').val(parseInt($('#txt_cantidad_total').val()) - parseInt(areas[index].cantidad));

						}
					})

				}
				
			}
		});
	
	});	


// Eventos Paso 3 -------------------------------------------------------
	$(document).on('change', '.select-in-table', function(e, params){
		
		var selectId = $(this).attr('id').toString();
		var optSelec = params.selected || params.deselected;

		//alert($('#'+selectId+" option[value='"+optSelec+"']").text());

		var selectTxt = selectId.split('select_muns')[1];
    	var suma = $('#txt_cant'+selectTxt).val();
    	if(suma === ''){suma = 0;}

	    var cantidad = 0;
	    
	    var dupli = false;
	    var mun, cant, rest, indexArr;
	    for(j = 0; j < repetidosProv.length; j++){
	    	if($('#'+selectId+" option[value='"+optSelec+"']").attr("name") === repetidosProv[j][0]){
	    		dupli = true;
	    		mun = repetidosProv[j][0]; cant = repetidosProv[j][1]; rest = repetidosProv[j][2]; indexArr = j;
	    	}
	    }

	    if(dupli === true){
	    	if(params.selected){
	    		/*var accion = '';
		    	if(params.selected){accion = 'sumar';}else if(params.deselected){accion = 'borrar';}*/
		    	toastPreg(mun, rest, selectId, optSelec, 'txt_cant'+selectTxt, indexArr, optSelec);
	    	}else if(params.deselected){
	    		repetidosProv[indexArr][2] = parseInt(repetidosProv[indexArr][2]) + parseInt(optSelec.toString().split('_')[0]);
	    		
	    		cantidad = optSelec.toString().split('_')[0];
	    		suma = parseInt(suma) - parseInt(cantidad);
	    		$('#txt_cant'+selectTxt).val(suma);
	    	}
	    }else if(dupli === false){
	    	cantidad = optSelec.toString().split('_')[0];

	    	if(params.selected){
		    	suma = parseInt(suma) + parseInt(cantidad);
		    }else if(params.deselected){
		    	suma = parseInt(suma) - parseInt(cantidad);
		    }

	    	$('#txt_cant'+selectTxt).val(suma);
	    }
    });

// Eventos paso 4 -------------------------------------------------------
	$(document).on('click', '#ver_trabajos', function(e){
		var cantidadP1;
		if($('#select_servicio').val() === "Perifoneo"){
            cantidadP1 = parseFloat($('#txt_cantidadP1').val());
        }else{
        	cantidadP1 = parseInt($('#txt_cantidadP1').val());
        }

		if(parseInt(step1['txt_cantidadP1']) !== cantidadP1/* || parseInt(step3['txt_cantidadP1']) !== parseInt($('#txt_cantidadP1').val())*/){
			$('#wizard').smartWizard('goToStep', 3);
			setTimeout(function(){
				$('#wizard').smartWizard('goToStep', 2);
				/*toast1(
					'Cantidad incorrecta',
					'Antigua cantidad: '+step3['txt_cantidadP1']+'\n\n'+'Ha agregado una nueva cantidad que no coincide con las cantidades de los municipios seleccionados',
					9000,
					'notice'
				);*/
				toast1('Cantidad incorrecta', 'Las cantidades no coinciden',8000, 'error');
				calculaDiferencia();
				$('#txt_cantidad_total').addClass('invalid');
				$('#txt_diferencia_total').addClass('invalid');
			},400);
		}else{
			step3['txt_cliente'] = $('#txt_cliente').val();
			step3['txt_fecha'] =  $('#txt_fecha').val();
			step3['txt_hora'] =  $('#txt_hora').val();
			step3['txt_detalles'] =  $('#txt_detalles').val();
			step3['select_via'] =  $('#select_via').val();
			step3['txt_alias'] =  $('#txt_alias').val();
			step3['txt_otro'] =  $('#select_via').val() == 'Otro' ?  $('#txt_otro').val() : '-';
			step3['txt_vigencia'] =  $('#txt_vigencia').val() + ' a ' + $('#txt_vigenciafin').val();
			step3['txt_periodoini'] =  $('#txt_periodoini').val();
			step3['txt_periodofin'] =  $('#txt_periodofin').val();
			step3['select_servicio'] =  $('#select_servicio').val();
			step3['txt_cantidadP1'] =  cantidadP1;
			step3['status'] = step1['status'];
			var acc;
			if(accionTrabajos === 'EDITAR'){
				acc = "edit";
				step3['idPrinc'] = idPrinc;
				step3['idsN2'] = idsConjunto;
			}else{acc = "create"}
			$.ajax({
	    		url:'routes/routeTrabajos.php',
	    		type:'POST',
	    		async: false,
	    		data: {info: step3, action: acc},
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
	    			console.log(data);
	    			removeSpinner();

	    			window.location = "ver-trabajos.php";
	    		}
	    	});
		}
  		// window.location = "ver-trabajos.php";
	});


// Eventos para cambiar de color campos incompletos o vacios ------------
   
    // Paso 1

    $(document).on('keyup', '.txtFormStep1', function(e){

    	if ($(this).val() != "")
    		$(this).removeClass('invalid');
    	
    });

    $(document).on('change', '.txtFormStep1', function(e){
 
    	if ($(this).val() != "")
    		$(this).removeClass('invalid');
    	
    });

    $(document).on('change', '.selectFormStep1', function(e){
    	
    	if ($(this).val() != null)
    		$(this).removeClass('invalid');

    });


    // Paso 2

    $(document).on('keyup', '.txtFormStep2', function(e){

    	if ($(this).val() != "0" && $(this).val() != "")
    		$(this).removeClass('invalid');
    	
    });

    $(document).on('keyup', '.txt_cantidadMun', function(e){

    	if ($(this).val() != "0" && $(this).val() != "")
    		$('#tableContainerMuns, #txt_cantidadP2, #txt_sumatoria').removeClass('invalid');
    	
    });

	$(document).on('change', '.selectFormStep2', function(e){
    	
    	if ($(this).val() != null)
    		$(this).removeClass('invalid');

    });


// Eventos y funciones para creación y edición de clientes --------------
	$(document).on('click', '#btn_nuevo', function(e){
		e.preventDefault();
		$('#modalTrabajos').modal('show');

	});

	$(document).on('click', '#btnAdd, #btnEdit', function(){

		var bandera = true;
		$('.required').each(function(index, element) {
			if (element.value == "" || element.value == "null"){
				bandera = false;
				element.className += ' invalid';
			}
		});

		if(bandera == true){
			if (validarEmail($('#txt_correo').val())) {
				$.ajax({
					url:'routes/routeClientes.php',
					type:'post',
					data: serializeForm('formNuevo'),
					dataType:'json',
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
						if(data == 1){
							$('#modalClientes').modal('hide');
							toast1("Felicidades!", success, 8000, "success");
						}
						else if(data == 2){
							$('#txt_rfc').addClass('invalid');
							toast1("Error!", 'El RFC que intenta ingresó ya existe', 8000, "error");
						}
						else
							toast1("Error!", ajaxError, 8000, "error");

						//showClientes();
					}
				}); //fin ajax

				var idCliente = $('#txt_cliente').val();
				getClientes(1);
				
				if($(this).attr('id') == 'btnEdit'){
					$('#txt_cliente').val(idCliente);
					$('#txt_cliente').trigger('change');
				}
			}else{
				$('#txt_correo').addClass('invalid');
				customAlert('Atención!', 'El formato del correo electronico capturado es incorrecto, intente nuevamente. Ej micorreo@midominio.com');
			}

				
		}else{
			customAlert('Atención!', validaCampos);
		}
			
	});

	$(document).on('change', '#select_via', function(e){
		if($(this).val() == 'Otro'){
			$('#div_txt_otro').slideDown();
		}
		else{
			$('#div_txt_otro').slideUp();
		}
	
	});

	function AddCliente(){
		resetForm('formNuevo');
		$('.btnModalClientes').attr('id','btnAdd');
		$('#modal_title').html('Nuevo cliente');
		$('#modalClientes').modal('show');
	
	}

	function editCliente(id){
		resetForm('formNuevo');
		$('.btnModal').attr('id','btnEdit');
		$('#modal_title').html('Editar cliente');
		$('.required').removeClass('invalid');

		$.ajax({
			url:'routes/routeClientes.php',
			type:'post',
			data: {"info": id, action: 'get'},
			dataType:'json',
			beforeSend: function(){
				showSpinner();
			},
			error: function(error){
				toast1("Error!", ajaxError, 8000, "error");
				removeSpinner();
			},
			success: function(data){
				console.log(data);
				removeSpinner();
				if(data != ""){
					$('#id').val(data[0].idcliente);
					$('#action').val('update');

					$('#txt_nombre').val(data[0].nombre);
					$('#txt_rfc').val(data[0].rfc);
					$('#txt_encargado').val(data[0].encargado);
					$('#txt_calle').val(data[0].calle); 
				    $('#txt_noext').val(data[0].noext); 
				    $('#txt_int').val(data[0].noint); 
				    $('#txt_colonia').val(data[0].colonia);
					$('#txt_cp').val(data[0].cp); 
				    $('#txt_pais').val(data[0].pais);
				    $('#txt_ciudad').val(data[0].ciudad);
				    $('#txt_tel1').val(data[0].tel1); 
				    $('#txt_tel2').val(data[0].tel2); 
					$('#txt_correo').val(data[0].ctacorreo);
					$('#txt_web').val(data[0].sitioweb);


					$('#txt_estado').val(data[0].estado);

					$('#txt_municipio').empty();
					$('#txt_municipio').append('<option value="0">Seleccione una opción</option>');
					for (var i = 1; i < data.length; i++){
						if(data[i].idcliente == data[0].municipio){
							$('#txt_municipio').append('<option value="'+data[i].idcliente+'" selected>'+data[i].nombre+'</option>');
						}
						else{
							$('#txt_municipio').append('<option value="'+data[i].idcliente+'">'+data[i].nombre+'</option>');
						}
					}

					$('#modalClientes').modal('show');

					// console.log($('#id').val());
					// console.log($('#action').val());
				}
			}
		}); //fin ajax

	}


// Funciones Paso 1 -----------------------------------------------------
	function getClientes(status){

		$.ajax({
			url:'routes/routeClientes.php',
			type:'POST',
			async: false,
			data: {info: status, action: "read"},
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

				$('#txt_cliente').empty();
				var options = '<option value="0" selected disabled>Seleccione un cliente</option>';
					
				if(data != ""){
					for (var i = 0; i < data.length; i++) {
						options += '<option value="'+data[i][0]+'">'+data[i][1]+'</option>';
					}
				}
				else{
					toast1("Atención", 'No hay cleintes registrados aún', 8000, "warning");
				}

				$('#txt_cliente').append(options);
			}
		});

	}


// Funciones Paso 2 -----------------------------------------------------
	
	function closealert(){
		$('#alert-edit').slideUp();
		$('#tbody2').html('');
		$("#txt_estadoT option[value='0']").prop('selected', true);

		$('#txt_cantidadP2').val('0');
		$('#txt_diferencia').val('0');
		$('#txt_diferencia_total').val('0');
		$('#txt_cantidadP2').removeAttr('disabled');
	}

	function edit(){
		$('#alert-edit').slideUp();
		$('#txt_cantidadP2').removeAttr('disabled');
		$('.txt_cantidadMun').removeAttr('disabled');
		$('.checksMuns').removeAttr('disabled');
		delete bloquesJSON[$('#txt_estadoT').val()];
		calculaDiferencia();
		editStep3 = true;
		$('#wizard').smartWizard('disableStep', 4);	
	}

	function showAlert(){
		$('#alert-edit').slideDown();
		$('#txt_cantidadP2').attr('disabled', 'disabled');
		$('.txt_cantidadMun').attr('disabled', 'disabled');
		$('.checksMuns').attr('disabled', 'disabled');
	}


	function addArea(edo, nombEdo){

		var idMun, nameMun, cantidad, temp, temp2, bandera = true;
		var json = [];
		var bloquesData = [];

		var domgeoVals = "";
		$('.checksMuns:checked').each(function (e, valor){
			idMun = $(this).val();
			if(e > 0)
				domgeoVals += ',';
			domgeoVals += idMun;

			nameMun = $('#labelMun_'+idMun).html();
			cantidad = $('#txt_cantidadMun_'+idMun).val();

			if($(this).prop('checked') == true && (cantidad != "0" && cantidad != "")){
				temp = {"idEdo": edo, "nombEdo": nombEdo, "idMun": idMun, "cantidad": cantidad};
				json.push(temp);

				temp2 = {"idBloque": edo, "idSucrusal": idMun, "nomSucursal": nameMun, "cantidad": cantidad};
				bloquesData.push(temp2);
			}
			else{
				bandera = false;
			}
		});

		traerDomgeoSucursal(domgeoVals, function(){
			bloquesJSON[edo] = {
				"nombEdo": nombEdo, 
				"cantidad":  $('#txt_cantidadP2').val(),
				"checks": json,
				"bloques": bloquesData,
				"info": domgeoDataSucursales
			}
			/*areas[edo] = {
				"nombEdo": nombEdo, 
				"cantidad":  $('#txt_cantidadP2').val(),
				"info": domgeoDataSucursales
			};*/
		});

		return bandera;

	}

	// **************** CAMBIO [22/07/2017] ***************
	// FUNCION QUE TRAE LOS DATOS DE DOMGEO (YA TRITURADOS EDO - MUN) DELAS SUCURSALES
	var domgeoDataSucursales = [];
	function traerDomgeoSucursal(data, callback){
		domgeoDataSucursales = [];
		$.ajax({
			url:'routes/routeTrabajos.php',
			type:'POST',
			async: false,
			data: {info: data, action: "domgeoSucursales"},
			dataType:'JSON',
			beforeSend: function(){
				showSpinner();
			},
			error: function(error){
				toast1("Error!", error, 8000, "error");
				removeSpinner();
				callback(false);
			},
			success: function(data){
				console.log(data);
				for(i = 0; i < data.length; i++){
					var temp;
					temp = {"idEdo": data[i]['estado'], "nombEdo": data[i]['estado'], "idMun": data[i]['municipio'], "cantidad": data[i]['estado']};
					domgeoDataSucursales.push(temp);
				}
				removeSpinner();
				callback(true);
			}
		});
	}

	function calculaDiferencia(){
		var totalArea = $('#txt_cantidadP2').val();
		var totalTrabajo = $('#txt_cantidad_total').val();

		var sumatoria = 0;
		var sumatoriaAreas = 0;

		$('.txt_cantidadMun').each(function(){
			var idMun = $(this).attr('id');
			idMun = idMun.split('txt_cantidadMun_')[1];

			if($('#ch_'+idMun).is(":checked")){
				sumatoria += parseInt($(this).val());
			}

		});

		// Solo entra aqui si existe algún registro dentro de la variable "areas"
		console.log(bloquesJSON);
		$.each(bloquesJSON, function(index, value){
			for (var i = 0; i < value['bloques'].length; i++) {
				sumatoriaAreas += parseInt(value['bloques'][i].cantidad);
			}
		});

		var diferenciaTotal = (totalTrabajo - sumatoriaAreas) - sumatoria;
		$('#txt_diferencia_total').val(diferenciaTotal);
		$('#txt_sumatoria').val(sumatoria);
		$('#txt_diferencia').val(parseInt(totalArea)-sumatoria);

	}

// Funciones Paso 3 -----------------------------------------------------
	function AgrgCantMun(tit, can, chosen, txt, txtTot, arrIn, val, selVal){
		if((parseInt(val) > parseInt(can)) || isNaN(val) || val === '' || val === undefined){
			PNotify.removeAll();
			toastPreg(tit, can, chosen, txt, txtTot, arrIn, selVal);
		}else{		
			var cantAnt;
			if($('#'+txtTot).val() === ''){cantAnt = 0;}else{cantAnt = $('#'+txtTot).val();}
			var suma = parseInt(cantAnt) + parseInt(val);

			$('#'+txtTot).val(suma);
			repetidosProv[arrIn][2] = parseInt(can) - parseInt(val);
			$('#'+chosen+" option[value='"+txt+"']").prop('value', val + '_' + selVal.split('_')[1]);
		}
	}
	function cancelarAgrgCantMun(chosen, txt){
		$('#'+chosen+" option[value='"+txt+"']").prop('selected', false);
		$('#'+chosen).trigger("chosen:updated");
	}

// Funciones Wizard -----------------------------------------------------

	function leaveAStepCallback(obj, context){
        // alert("Leaving step " + context.fromStep + " to go to step " + context.toStep);
        return validateSteps(context.fromStep, context.toStep); // return false to stay on step and true to continue navigation 
    }

    function onFinishCallback(objs, context){
        return true;
    }

    // Your Step validation logic
    var c3ids;
    var noCubiertos;
    var repetidosProv = [];
    var advertMsg = true;
    // variable para llenado de valores repetidos
    var munsProv = [];
    var cantProv = [];

    function validateSteps(from, to){
        var isStepValid = true;
// municipios
        /*var cantidadP1;
        if($('#select_servicio').val() === "Perifoneo"){
        	cantidadP1 = parseFloat($('#txt_cantidadP1').val()) * 60;
        }else{
        	cantidadP1 = parseInt($('#txt_cantidadP1').val());
        }*/

        switch(from) {
            case 1:
            		step1 = {
	            		txt_cliente  	:  $('#txt_cliente').val(),
	            		txt_fecha 	 	:  $('#txt_fecha').val(),
	            		txt_hora 	 	:  $('#txt_hora').val(),
	            		txt_detalles 	:  $('#txt_detalles').val(),
	            		select_via 	 	:  $('#select_via').val(),
	            		txt_alias		:  $('#txt_alias').val(),
	            		txt_otro 	 	:  $('#select_via').val() == 'Otro' ?  $('#txt_otro').val() : '-',
	            		txt_vigencia 	:  $('#txt_vigencia').val() + ' a ' + $('#txt_vigenciafin').val(),
	            		txt_periodoini	:  $('#txt_periodoini').val(),
	            		txt_periodofin  :  $('#txt_periodofin').val(),
	            		select_servicio :  $('#select_servicio').val(),
	            		txt_cantidadP1 	:  $('#txt_cantidadP1').val()
	            	};

				var bandera = true;

				if($('#txt_vigencia').val() === ""){
					$('#txt_vigencia').addClass('invalid');
					bandera = false;
				}else{
					$('#txt_vigencia').removeClass('invalid');
				}

				if($('#txt_vigenciafin').val() === ""){
					$('#txt_vigenciafin').addClass('invalid');
					bandera = false;
				}else{
					$('#txt_vigenciafin').removeClass('invalid');
				}

            	$.each(step1, function(index, element) {
            		if(index != 'status' && index != "txt_vigencia"){
            			var type = $('#'+index)[0].type;
	            		
	            		if (type == 'select-one') {
	            			if(element == null){
		            			$('#'+index).addClass('invalid');
		            			bandera = false;
		            		}
		            		else{
		            			$('#'+index).removeClass('invalid');
		            		}
	            		}else{
	            			if(element == ""){
		            			$('#'+index).addClass('invalid');
		            			bandera = false;
		            		}else{
		            			$('#'+index).removeClass('invalid');
		            		}
	            		}
            		}
            	});

            	var vigencia = $('#txt_vigencia').val().split('-')[1]+'-'+$('#txt_vigencia').val().split('-')[2]+'-'+$('#txt_vigencia').val().split('-')[0];
	            var vigenciafin = $('#txt_vigenciafin').val().split('-')[1]+'-'+$('#txt_vigenciafin').val().split('-')[2]+'-'+$('#txt_vigenciafin').val().split('-')[0];
            	if((i = new Date(vigencia).getTime()) > (f = new Date(vigenciafin).getTime())){
            		toast1("Atencion!", "Las fechas de <b>VIGENCIA</b> son incongruentes.", 8000, "warning");
            		bandera = false;
            		$('#txt_vigencia').addClass('invalid');
            		$('#txt_vigenciafin').addClass('invalid');
            	}

            	var periodoini = $('#txt_periodoini').val().split('-')[1]+'-'+$('#txt_periodoini').val().split('-')[2]+'-'+$('#txt_periodoini').val().split('-')[0];
	            var periodofin = $('#txt_periodofin').val().split('-')[1]+'-'+$('#txt_periodofin').val().split('-')[2]+'-'+$('#txt_periodofin').val().split('-')[0];
            	if((i = new Date(periodoini).getTime()) > (f = new Date(periodofin).getTime())){
            		toast1("Atencion!", "Las fechas de <b>PERIODO</b> son incongruentes.", 8000, "warning");
            		bandera = false;
            		$('#txt_periodoini').addClass('invalid');
            		$('#txt_periodofin').addClass('invalid');
            	}
				/*if($('#select_servicio').val() === "Perifoneo"){
				    toast1("Cantidad convertida", "La cantidad colocada <b>"+$('#txt_cantidadP1').val()+" hrs.</b> fue convertida a minutos: \n\n <b>"+ (parseFloat($('#txt_cantidadP1').val()) * 60) +" minutos</b> \n\n(se muestra en 'Cantidad/mins total(es)')", 10000, "info");
        		}*/

            	//sumaCantidaTotal = step1.txt_cantidadP1;
            	$('#txt_cantidad_total').val($('#txt_cantidadP1').val());

            	if(accionTrabajos === 'EDITAR' && to === 2){
            		calculaDiferencia();
            		if(advertMsg === true){
            			toast1("Atencion!", "Cualquier cambio en PASO 2, reiniciará los valores del PASO 3", 8000, "warning");
            			advertMsg = false;
            		}
            	}

            	// ******* CAMBIO [22/07/2017] **********
            	// FUNCION TRAER BLOQUES (ESTA SUPLE ESTADOS POR BLOQUES EN STEP 2)
            	traerBloques();
            	
            	step1['status'] = 1;
            	return bandera;

                break;
            case 2:
            	if(to == 1)
            		return true;

            	if(accionTrabajos !== 'EDITAR'){
            		step2 = bloquesJSON;
            	}

            	var bandera = false;
            	var banderaAreas = false;

            	$.each(step2, function(){
            		banderaAreas = true;
            	});

            	var diferencia = parseInt($('#txt_diferencia').val());
            	var diferenciaTotal = parseInt($('#txt_diferencia_total').val());

            	if(diferencia == 0 && diferenciaTotal == 0){
            		bandera = true;
            	}
            	else {
            		$('#txt_diferencia').addClass('invalid');
					$('#txt_diferencia_total').addClass('invalid');
					customAlert('Error!', 'La cantidades son incorrectas');
					calculaDiferencia();
            	}

            	if((bandera && banderaAreas) == true){
            		if(editStep3 === true){
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
									toast1("Error!", "Guarde al menos un trabajo", 8000, "error");
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

										var header = "Bloque "+edoSelected+" -- "+step2[index]['nombEdo']+" -- "+step2[index]['cantidad'];
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
										                    '  <label for="" style="font-size: 15px;">Sucursales cubiertas</label>'+
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
										                    '  <label for="" style="font-size: 15px;">Sucursales faltantes de cubrir</label>'+
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
											step1['status'] = 2;
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
										}
										else{
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

								//COMPLEJO PROCESO DE DELIMITACION DE
								// MUNICIPIOS REPETIDOS
								var munsProvaux = [];
								var cantProvaux = [];

								var repetidos = [];
								var unico = [];
								var unicoAux = [];
								$.each(munsProv, function(i, el){
								    if($.inArray(el, unico) === -1){unico.push(el)}else{repetidos.push(el);cantProvaux.push(cantProv[i])};
								});

								unico = [];
								$.each(repetidos, function(i, el){
								    if($.inArray(el, unico) === -1){unico.push(el);unicoAux.push([el,cantProvaux[i],cantProvaux[i]]);}
								});
								for(rep = 0;rep < unicoAux.length;rep++){
									repetidosProv.push(unicoAux[rep]);
								}
								console.log(repetidosProv);
								console.log(step2);
							}
						});
						editStep3 = false;
	            		return true;
            		}else{
            			return true;
            		}
            	}else{

            		toast1("Error!", "Existen cambios sin guardar o las cantidades son incorrectas", 8000, "error");
            		return false;
            	}

				
            	//return (bandera && banderaAreas) ? true : false;
            	// return true;

                break;
            case 3:
            	if(to == 2){
            		return true;
            	}

            	if(accionTrabajos !== 'EDITAR'){
            		step3 = step1;
            	}

            	console.log(step3);

            	var contador = 0;
            	var zonas = {};

            	var checkRevisar = [];
            	$("div[name='panelX'").each(function(){
            		checkRevisar.push($(this).find("input[name='checkMun']").length);
            	});

            	$.each(step2, function(index, val){
            		contador++;

            		var t = {
            			idedo: index,
            			edo: val.nombEdo, 
            			status: $('#txt_status'+contador).val(), 
            			cantidad: step2[index]['cantidad'],
            			info: ""
            		};

            		var vec = [];
            		
            		var temp = {};

            		var idprov;
					var cantAgregar;
            		var values;

            		var nocub = [];
            		if(noCubiertos.length > 0){
						for(n = 0; n < noCubiertos.length; n++){
							if(noCubiertos[n][4] === contador){
								nocub.push(noCubiertos[n][3]+':'+noCubiertos[n][2]);
							}
						}
					}else{nocub = ['0:0'];}

					if(nocub.length === 0){
						nocub.push('0:0');
					}

            		if(checkRevisar[contador - 1] > 0){
            			$('.check_Z'+index).each(function(){
							if($(this).prop('checked')){
								idprov = $(this).val();
								var id = idprov+'_Z'+index;
								cantAgregar = $('#txt_cant'+id).val();
								var valueSelect = $('#select_muns'+id).val();
								values = [];
								var cantMuns = [];

								for (var i = 0; i < valueSelect.length; i++){
									values.push(valueSelect[i].toString().split('_')[1]+':'+valueSelect[i].toString().split('_')[0]);
								}
								
								temp = {
									proveedor: idprov,
									cantidad: cantAgregar,
									municipios: values,
									nocubiertos: nocub
								};
								vec.push(temp);
							}
						});
            		}else{
            			idprov = 0;
						cantAgregar = 0;
						values = ['0:0'];

						temp = {
							proveedor: idprov,
							cantidad: cantAgregar,
							municipios: values,
							nocubiertos: nocub
						};
						vec.push(temp);
            		}

            		t['info'] = vec;
            		zonas[index] = t;

            	});

            	step3['zonas'] = zonas;

            	// FUNCION DE VALIDACION
				var sumas = [['cant', 0]];
				var cont = 0;

				$.each(c3ids, function(dat, value){
					if(parseInt(c3ids[dat]["id"]) === cont){
						sumas[cont][0] = c3ids[dat]["cant"];
						if($('#'+c3ids[dat]["check"]).prop("checked") === true && parseInt(sumas[cont][0]) > 0){
							sumas[cont][1]+= parseInt($('#'+c3ids[dat]["input"]).val());
						}
					}else{
						cont++;
						sumas.push(['cant',0]);
						sumas[cont][0] = c3ids[dat]["cant"];
						if($('#'+c3ids[dat]["check"]).prop("checked") === true && parseInt(sumas[cont][0]) > 0){
							sumas[cont][1]+= parseInt($('#'+c3ids[dat]["input"]).val());
						}
					}
					console.log(c3ids[dat]["id"] +'-'+ c3ids[dat]["input"] +'-'+c3ids[dat]["check"] +'-'+c3ids[dat]["cant"]);
				});
				
				var ind = 0;
				for(e = 0; e < sumas.length; e++){
					if(sumas[e][0] != sumas[e][1]){
						ind = ind + 1;
					}
				}

				console.log(step3);

				if(parseInt(ind) === 0){
					return true;
				}else{
					toast1("Error!", "Tiene sucursales sin asignar cantidad", 8000, "error");
					return false;
				}

                break;
            case 4:

            	if(to == 3)
            		return true;
                break;
        }

    }

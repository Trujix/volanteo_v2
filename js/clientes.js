// ===============  EVENTOS PARA MODULO DE 	CLIENTES ===========================================
// ================================================================================================
	$('document').ready(function(){
		$('#select_ac_in').val(1);
		$('#buscar').val("");
		showClientes();
	});

	var ajaxError = "Ocurrió un error, intentelo mas tarde o pongase en contacto con el administrador";
	var success = "La acción se ralizó con exito";
	var validaCampos = "Debe llenar todos los campos para poder guardar";

	$(document).on('change', '#select_ac_in', function(){
		showClientes();
	});

	$(document).on('change', '#txt_estado', function(){

		$.ajax({
			url:'routes/routeDomgeo.php',
			type:'post',
			data: {action: 'mun', info: $('#txt_estado').val()},
			dataType:'json',
			error: function(error){
				toast1("Error!", ajaxError, 8000, "error");
			},
			success: function(data){
				if(data != ""){
					$('#txt_municipio').empty();
					$('#txt_municipio').append('<option value="0" selected disabled>Seleccione una opción</option>');
					for (var i = 0; i < data.length; i++) {
						$('#txt_municipio').append('<option value="'+data[i].cveMpo+'">'+data[i].nomMpo+'</option>');
					}
				}
				else
					toast1("Error!", ajaxError, 8000, "error");

			}
		}); //fin ajax

	});

	$(document).on('click', '#btn_nuevo', function(){
		AddCliente();
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

						showClientes();
					}
				}); //fin ajax
			}
			else{
				$('#txt_correo').addClass('invalid');
				customAlert('Atención!', 'El formato del correo electronico capturado es incorrecto, intente nuevamente. Ej micorreo@midominio.com');
			}

				
		}else{
			customAlert('Atención!', validaCampos);
		}
			
	});


	// =========== Funciones CRUD  ========================================

	function AddCliente(){
		resetForm('formNuevo');
		$('.btnModal').attr('id','btnAdd');
		$('#modal_title').html('Nuevo cliente');
		$('#modalClientes').modal('show');
		$('.required').removeClass('invalid');

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

	function reactivaCliente(id){

		$.confirm({
            title: 'Atencion!',
            content: '¿Esta seguro que desea reactivar este cliente?',
            confirm: function(){
                $.ajax({
					url:'routes/routeClientes.php',
					type:'post',
					data: {'info': id, action: 'reactiva'},
					dataType:'json',
					error: function(error){
						toast1("Error!", ajaxError, 8000, "error");
					},
					success: function(data){
						if(data == 1){
							toast1("Felicidades!", success, 8000, "success");
						}
						else{
							toast1("Error!", ajaxError, 8000, "error");
						}

						showClientes();
					}
				}); //fin ajax
            },
            cancel: function(){
                // console.log('false');
            }
        });

	}

	function deleteCliente(id){
		$.confirm({
            title: 'Atencion!',
            content: '¿Esta seguro que desea dar de baja a este cliente?',
            confirm: function(){
                $.ajax({
					url:'routes/routeClientes.php',
					type:'post',
					data: {'info': id, action: 'delete'},
					dataType:'json',
					error: function(error){
						toast1("Error!", ajaxError, 8000, "error");
					},
					success: function(data){
						if(data == 1){
							toast1("Felicidades!", success, 8000, "success");
						}
						else{
							toast1("Error!", error+'1', 8000, "error");
						}

						showClientes();
					}
				}); //fin ajax
            },
            cancel: function(){
                // console.log('false');
            }
        });

	}

	function eliminarCliente(id){
		$.confirm({
            title: 'Atencion!',
            content: '<b>Esta acción eliminará los bloques y sucursales anexados a este cliente</b><br>¿Esta seguro que desea <b>ELIMINAR</b> a este cliente?',
            confirm: function(){
                $.ajax({
					url:'routes/routeClientes.php',
					type:'post',
					data: {'info': id, action: 'eliminarCliente'},
					dataType:'json',
					error: function(error){
						toast1("Error!", ajaxError, 8000, "error");
					},
					success: function(data){
						if(data == 1){
							toast1("Felicidades!", success, 8000, "success");
						}
						else{
							toast1("Error!", error+'1', 8000, "error");
						}
						showClientes();
					}
				}); //fin ajax
            },
            cancel: function(){
                // console.log('false');
            }
        });
	}

	function showClientes(){
		var option = $('#select_ac_in').val();

		$.ajax({
			url:'routes/routeClientes.php',
			type:'post',
			data: {info: option, action: 'read'},
			dataType:'json',
			error: function(error){
				toast1("Error!", ajaxError, 8000, "error");
			},
			success: function(data){

				if(data != ""){
					var headers = ["NO.", "CLIENTE", "RFC", "TELEFONOS", "CORREO", "Status", "Opciones"];
					jQueryTable("tableContainer", headers, data, 8, "450px", "Cliente", "Bloques");
				  //jQueryTable(id_container, headers, data, LimitRow, maxHeight, NameFunc);
				}
				else{
					$('tbody').empty();
					toast1("Atencion!", "No hay clientes para mostrar", 8000, "error");
				}
			}
		}); //fin ajax

	}


// ============ VALIDACION DE CLIENTES ====================================
	validaCampoLength("txt_nombre", 100);
	validaCampoLength("txt_rfc", 100);
	validaCampoLength("txt_calle", 100);
	validaCampoLength("txt_noext", 5);
	validaCampoLength("txt_noint", 5);
	validaCampoLength("txt_colonia", 50);
	validaCampoLength("txt_cp", 5);
	validaCampoLength("txt_pais", 50);
	validaCampoLength("txt_ciudad", 50);
	validaCampoLength("txt_tel1", 50);
	validaCampoLength("txt_tel2", 50);
	validaCampoLength("txt_correo", 50);
	validaCampoLength("txt_web", 50);


	validaOnlyNumbers("txt_tel1");
	validaOnlyNumbers("txt_tel2");
	validaOnlyNumbers("txt_noext");
	// validaOnlyNumbers("txt_noint");
	validaOnlyNumbers("txt_cp");



	validaCampoLength("txt_nombreT", 100);
	validaCampoLength("txt_encargadoT", 100);
	// validaCampoLength("txt_estadoT", 100);
	// validaCampoLength("txt_municipioT", 5);
	// validaCampoLength("txt_localidadT", 5);
	// validaCampoLength("txt_coloniaT", 50);
	// validaCampoLength("txt_cpT", 5);
	validaCampoLength("txt_calleT", 50);
	validaCampoLength("txt_noextT", 5);
	validaCampoLength("txt_nointT", 5);

	validaOnlyNumbers("txt_noextT");
	validaOnlyNumbers("txt_nointT");
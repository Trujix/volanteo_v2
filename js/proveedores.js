// ===============  EVENTOS PARA MODULO DE PROVEEDORES ===========================================
// ================================================================================================
	$('document').ready(function(){
		$('#select_ac_in').val(2);
		$('#buscar').val("");
		showProveedores();

		$('#data_gen').attr('style', 'display: block;');

		$(".chosen-select").chosen({width: "100%", height: "200px"});
		$(".chosen-choices").attr('style', 'height: 100px; overflow: auto;');
		$('.default').attr('style', 'width: 150px;');

		$('#txt_tarjeta').popover({
		 	placement: 'top'
		 });  

		$('#txt_claveBanco').popover({
		 	placement: 'top'
		 });  
	})

	var ajaxError = "Ocurrió un error, intentelo mas tarde o pongase en contacto con el administrador";
	var success = "La acción se ralizó con exito";
	var validaCampos = "Debe llenar todos los campos para poder guardar";

	// Función definida en main.js
	// validaOnlyNumbers('txt_tel')

	$(document).on('change', '#select_ac_in', function(){
		showProveedores();
	});

	$(document).on('click', '.header_acordeon', function(e){
		var id = $(this).attr('id');
		id = id.split('h_')[1];
		console.log(id);

		
		if($('#'+id).attr('style') == 'display: block;'){
			$('.acordeon').slideUp();
			$('#'+id).slideUp();
		}
		else{
			$('.acordeon').slideUp();
			$('#'+id).slideDown();
		}

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

	var switchMuncicipio = 0;
	$(document).on('change', '#txt_estadoF', function(){

		$.ajax({
			url:'routes/routeDomgeo.php',
			type:'post',
			data: {action: 'mun', info: $('#txt_estadoF').val()},
			dataType:'json',
			error: function(error){
				toast1("Error!", ajaxError, 8000, "error");
			},
			success: function(data){
				if(data != ""){
					$('#txt_municipioF').empty();
					$('#txt_municipioF').append('<option value="0" selected disabled>Seleccione una opción</option>');
					for (var i = 0; i < data.length; i++) {
						$('#txt_municipioF').append('<option value="'+data[i].cveMpo+'">'+data[i].nomMpo+'</option>');
					}
					setTimeout(function(){
						if(switchMuncicipio > 0){
							$('#txt_municipioF').val(switchMuncicipio);
							switchMuncicipio = 0;
						}
					}, 500);
				}
				else
					toast1("Error!", ajaxError, 8000, "error");

			}
		}); //fin ajax

	});


	$(document).on('click', '#btn_nuevo', function(){
		AddProveedor();
	});


	$(document).on('click', '#btnAdd, #btnEdit', function(){

		$('#txt_paisF').val('Mexico');
		$('#txt_pais').val('Mexico');
		$('.required').removeClass('invalid');
		$('.required_no').removeClass('invalid');

		var bandera = true;
		$('.required').each(function(index, element) {
			if (element.value == "" || element.value == "null"){
				bandera = false;
				element.className += ' invalid';
			}
		});

		// Validacion de campos vacios
		if(bandera == true){

			bandera = validaTarjetas();

			// Validacion de longitud de caracteres en datos bancarios
			if(bandera == true){

				if (validarEmail($('#txt_correo').val())) {

					$.ajax({
						url:'routes/routeProveedores.php',
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
							console.log(data);
							removeSpinner();
							$('.required').removeClass('invalid');
							$('.required_no').removeClass('invalid');

							if(data == 1){
								$('#modalProveedores').modal('hide');
								toast1("Felicidades!", success, 8000, "success");
							}else if(data == 2){
								$('#txt_rfc').addClass('invalid');
								toast1("Error!", 'El RFC que intenta ingresar ya existe', 8000, "error");
							}else if(data == 3){
								$('#txt_correo').addClass('invalid');
								toast1("Error!", 'Ya existe un registro con este correo electrónico', 8000, "error");
							}else{
								toast1("Error!", "Ocurrio un error al editar", 8000, "error");
							}

							showProveedores();
						}
					}); //fin ajax
				}
				else{
					$('#txt_correo').addClass('invalid');
					customAlert('Atención!', 'El formato del correo electronico capturado es incorrecto, intente nuevamente. Ej micorreo@midominio.com');
				}

			}
			else
				customAlert('Atención!', 'Revise el formato y/o longitud de los campos');
				

		}
		else{
			customAlert('Atención!', validaCampos);
		}
			
	})

	var validaTarjetas = function(){

		var claveBanco = $('#txt_claveBanco').val();
		var tarjeta  = $('#txt_tarjeta').val();
		var bandera = true;

		if(claveBanco != "")
			if(claveBanco.length != 18){
				bandera = false;
				$('#txt_claveBanco').addClass('invalid');
				// $('#txt_tarjeta').popover('show');
			}

		if(tarjeta != "")
			if(tarjeta.length != 16){
				bandera = false;
				$('#txt_tarjeta').addClass('invalid');
				// $('#txt_tarjeta').popover('show');
			}

		return bandera;


	};


	function serializeForm(idForm){
		var form = $('#'+idForm)[0];
		var action = form[0].value;
		var info = '[{';

		for(var i = 1; i < form.length; i++){
			var key = form[i].name;
			info += '"'+key+'":"'+form[i].value+'",';
		}

		info = info.substring(0, info.length-1);
		info += '}]';

		return {'info': info, 'action': action};
	
	}

	// =========== Funciones CRUD  ========================================

	function AddProveedor(){
		resetForm('formNuevo');
		$('.btnModal').attr('id','btnAdd');
		$('#modal_title').html('Nuevo proveedor');
		$('#modalProveedores').modal('show');
		$('.required').removeClass('invalid');
		$('.required_no').removeClass('invalid');

	}

	function editProveedor(id){
		resetForm('formNuevo');
		$('.btnModal').attr('id','btnEdit');
		$('#modal_title').html('Editar proveedor');
		$('.required').removeClass('invalid');
		$('.required_no').removeClass('invalid');

		$.ajax({
			url:'routes/routeProveedores.php',
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
					$('#id').val(data[0].idproveedor);
					$('#action').val('update');

					// Rellenando seccion de Datos generales del formulario
					$('#txt_nombre').val(data[0].nombre);
					$('#txt_rfc').val(data[0].rfc);
					$('#txt_calle').val(data[0].calle);
				    $('#txt_noext').val(data[0].noext); 
				    $('#txt_int').val(data[0].noint); 
				    $('#txt_colonia').val(data[0].colonia); 
					$('#txt_cp').val(data[0].cp); 
				    $('#txt_pais').val(data[0].pais);
				    $('#txt_ciudad').val(data[0].ciudad);
				    $('#txt_estado').val(data[0].estado);

				    // Rellenando seccion de Datos de Facturación del formulario
				    $('#txt_nombreF').val(data[0].nombre_f);
					$('#txt_rfcF').val(data[0].rfc_f);
					$('#txt_calleF').val(data[0].calle_f);
				    $('#txt_noextF').val(data[0].noext_f); 
				    $('#txt_intF').val(data[0].noint_f); 
				    $('#txt_coloniaF').val(data[0].colonia_f); 
					$('#txt_cpF').val(data[0].cp_f); 
				    $('#txt_paisF').val(data[0].pais_f);
				    $('#txt_ciudadF').val(data[0].ciudad_f);
				    $('#txt_estadoF').val(data[0].estado_f);

				    // Rellenando seccion de Datos Bancarios del formulario
				    $('#txt_tel1').val(data[0].tel1);
				    $('#txt_tel2').val(data[0].tel2);
				    $('#txt_tel3').val(data[0].tel3);
					$('#txt_correo').val(data[0].ctacorreo);
					$('#txt_banco').val(data[0].banco);
					$('#txt_claveBanco').val(data[0].clavebanco);
					$('#txt_nosucursal').val(data[0].nosucursal);
					$('#txt_nocuenta').val(data[0].nocuenta);
					$('#txt_tarjeta').val(data[0].tarjeta);


					// Rellenando los catalogos de municipios de las 2 primera secciones del formulario
					$('#txt_municipio').empty();
					$('#txt_municipio').append('<option value="0">Seleccione una opción</option>')
					$('#txt_municipioF').empty();
					$('#txt_municipioF').append('<option value="0">Seleccione una opción</option>');

					for (var i = 1; i < data.length; i++){

						// Hace referencia al catalogo de los municipios de la primer sección del formulario (Datos Generales)
						if(data[i].info == 'm1'){
							
							// Según el resultado el idproveedor es igual al id de municipio del catalogo de municipios
							if(data[i].idproveedor == data[0].municipio)
								$('#txt_municipio').append('<option value="'+data[i].idproveedor+'" selected>'+data[i].nombre+'</option>');
							
							else
								$('#txt_municipio').append('<option value="'+data[i].idproveedor+'">'+data[i].nombre+'</option>');
						
						} // Hace referencia al catalogo de los municipios de la segunjda sección del formulario (Datos de facturación)
						else if(data[i].info == 'm2'){

							// Según el resultado el idproveedor es igual al id de municipio del catalogo de municipios
							if(data[i].idproveedor == data[0].municipio_f)
								$('#txt_municipioF').append('<option value="'+data[i].idproveedor+'" selected>'+data[i].nombre+'</option>');
							
							else
								$('#txt_municipioF').append('<option value="'+data[i].idproveedor+'">'+data[i].nombre+'</option>');

						}

							
						
					}
				

					$('#modalProveedores').modal('show');

					// console.log($('#id').val());
					// console.log($('#action').val());
				}
			}
		}); //fin ajax

	}

	function reactivaProveedor(id){

		$.confirm({
            title: 'Atencion!',
            content: '¿Esta seguro que desea reactivar este proveedor?',
            confirm: function(){
                $.ajax({
					url:'routes/routeProveedores.php',
					type:'post',
					data: {'info': id, action: 'reactiva'},
					dataType:'json',
					error: function(error){
						toast1("Error!", ajaxError, 8000, "error");
					},
					success: function(data){
						/*if(data == 1)
							toast1("Felicidades!", success, 8000, "success");
						else
							toast1("Error!", ajaxError, 8000, "error");*/

						toast1("Felicidades!", success, 8000, "success");
						showProveedores();
					}
				}); //fin ajax
            },
            cancel: function(){
                console.log('false');
            }
        });

	}

	function deleteProveedor(id){
		$.confirm({
            title: 'Atencion!',
            content: '¿Esta seguro que desea dar de baja a este proveedor?',
            confirm: function(){
                $.ajax({
					url:'routes/routeProveedores.php',
					type:'post',
					data: {'info': id, action: 'delete'},
					dataType:'json',
					error: function(error){
						toast1("Error!", ajaxError, 8000, "error");
					},
					success: function(data){
						/*if(data == 1)
							toast1("Felicidades!", success, 8000, "success");
						else
							toast1("Error!", error+'1', 8000, "error");*/

						toast1("Felicidades!", success, 8000, "success");
						showProveedores();
					}
				}); //fin ajax
            },
            cancel: function(){
                console.log('false');
            }
        });

	}

	function eliminarProveedor(id){
		$.confirm({
            title: 'Atencion!',
            content: '¿Esta seguro que desea ELIMINAR DEFINITIVAMENTE a este proveedor?',
            confirm: function(){
                $.ajax({
					url:'routes/routeProveedores.php',
					type:'post',
					data: {'info': id, action: 'eliminarProveedor'},
					dataType:'json',
					error: function(error){
						toast1("Error!", ajaxError, 8000, "error");
					},
					success: function(data){
						/*if(data == 1)
							toast1("Felicidades!", success, 8000, "success");
						else
							toast1("Error!", error+'1', 8000, "error");*/

						toast1("Felicidades!", success, 8000, "success");
						showProveedores();
					}
				}); //fin ajax
            },
            cancel: function(){
                console.log('false');
            }
        });
	}

	function showProveedores(){
		var option = $('#select_ac_in').val();

		$.ajax({
			url:'routes/routeProveedores.php',
			type:'post',
			data: {info: option, action: 'read'},
			dataType:'json',
			error: function(error){
				toast1("Error!", ajaxError, 8000, "error");
			},
			success: function(data){

				if(data != ""){
					var headers = ["NO.", "NOMBRE", "RFC", "TELEFONO", "CORREO", "Status", "Opciones"]
					jQueryTable("tableContainer", headers, data, 8, "450px", "Proveedor", "Zonas");
				  //jQueryTable(id_container, headers, data, LimitRow, maxHeight, NameFunc)
				}
				else{
					$('tbody').empty();
					toast1("Atencion!", "No hay proveedores para mostrar", 8000, "error");
				}
			}
		}); //fin ajax

	}


// ============ VALIDACION DE PROVEEDORES ====================================
	validaCampoLength("txt_nombre", 100);
	validaCampoLength("txt_nombreF", 100);

	validaCampoLength("txt_rfc", 100);
	validaCampoLength("txt_rfcF", 100);

	validaCampoLength("txt_calle", 100);
	validaCampoLength("txt_calleF", 100);

	validaCampoLength("txt_noext", 5);
	validaCampoLength("txt_noextF", 5);

	validaCampoLength("txt_noint", 5);
	validaCampoLength("txt_nointF", 5);

	validaCampoLength("txt_colonia", 50);
	validaCampoLength("txt_coloniaF", 50);

	validaCampoLength("txt_cp", 5);
	validaCampoLength("txt_cpF", 5);

	validaCampoLength("txt_pais", 50);

	validaCampoLength("txt_ciudad", 50);
	validaCampoLength("txt_ciudadF", 50);

	validaCampoLength("txt_banco", 50);
	validaCampoLength("txt_claveBanco", 18);
	validaCampoLength("txt_tarjeta", 16);
	validaCampoLength("txt_nosucursal", 10)
	validaCampoLength("txt_nocuenta", 50);
	validaCampoLength("txt_tel1", 13);
	validaCampoLength("txt_tel2", 13);
	validaCampoLength("txt_tel3", 13);
	validaCampoLength("txt_correo", 50);
	validaCampoLength("txt_domPersonal", 200);
	

	validaOnlyNumbers("txt_tel1");
	validaOnlyNumbers("txt_tel2");
	validaOnlyNumbers("txt_tel3");

	validaOnlyNumbers("txt_cp");
	validaOnlyNumbers("txt_cpF");

	validaOnlyNumbers("txt_noext");
	validaOnlyNumbers("txt_noextF");

	validaOnlyNumbers("txt_nocuenta");
	validaOnlyNumbers("txt_claveBanco");
	validaOnlyNumbers("txt_tarjeta");
	

// Modal de zonas asignadas a los provedores --------------------------
	validaCampoLength("txt_costoserv", 50);
	validaCampoLength("txt_costosad", 50);


// ---------------- 08/03/2018 ---------------
// ::::::::::::: FUNCIONES NUEVAS ::::::::::::
$(document).on('click', '#datGen2DatFact', function(){
	$('#txt_nombreF').val($('#txt_nombre').val());
	$('#txt_rfcF').val($('#txt_rfc').val());
	$('#txt_calleF').val($('#txt_calle').val());
	$('#txt_coloniaF').val($('#txt_colonia').val());
	$('#txt_noextF').val($('#txt_noext').val());
	$('#txt_nointF').val($('#txt_noint').val());
	$('#txt_cpF').val($('#txt_cp').val());
	$('#txt_ciudadF').val($('#txt_ciudad').val());

	$('#txt_estadoF').val($('#txt_estado').val());
	switchMuncicipio = parseFloat($('#txt_municipio').val());
	$('#txt_estadoF').change();
});
// ===============  EVENTOS PARA MODULO DE TIENDAS ===========================================
// ================================================================================================
	var bandera = false;
	var ajaxError = "Ocurrió un error, intentelo mas tarde o pongase en contacto con el administrador";
	var success = "La acción se ralizó con exito";
	var validaCampos = "Debe llenar todos los campos para poder guardar";

	$(document).on('click', '#btn_nuevaT', function(){
		AddTienda();
	})

	$(document).on('click', '#btnAddT, #btnEditT', function(){

		var nombre    = $("#txt_nombreT").val();
		var encargado = $("#txt_encargadoT").val();
		var edo 	  = $('#txt_estadoT').val();
		var mun 	  = $('#txt_municipioT').val();
		var loc 	  = $('#txt_localidadT').val();
		var col 	  = $('#txt_coloniaT').val();
		var cp	 	  = $('#txt_cpT').val();
		var calle 	  = $("#txt_calleT").val();
		var noint 	  = $("#txt_nointT").val();
		var noext 	  = $("#txt_noextT").val();
		var lat 	  = $("#latitud").val();
		var lng 	  = $("#longitud").val();

		if(this.id == 'btnAddT'){
			var id = $('#idcliente').val();
		}
		else{
			var id = $('#idtienda').val();
		}

		// console.log("edo", edo);
		// console.log("mun", mun);
		// console.log("loc", loc);
		// console.log("col", col);
		// console.log("cp", cp);
		// console.log("calle", calle);
		// console.log("noext", noext);
		// console.log("lat", lat);
		// console.log("lng", lng);

		if(edo != null && mun != null && loc != null && 
		   col != "" && cp != "" && calle != "" && 
		   noext != "" && lat != "" && lng != ""){

			$.ajax({
				url:'routes/routeTiendas.php',
				type:'POST',
				data: {
					info: {
						nombre: nombre,
						encargado: encargado,
						edo: edo,
						mun: mun,
						loc: loc,
						col: col,
						cp: cp,
						calle: calle,
						noint: noint,
						noext: noext,
						lat: lat,
						lng: lng,
						id: id // Cuando es add se usa el id de cliente y cuando es edit se usa el id de la tienda
					}, 
					action: $('#action').val()
				},
				dataType:'JSON',
				beforeSend: function(){
					showSpinner();
				},
				error: function(error){
					toast1("Error!", ajaxError, 8000, "error");
					removeSpinner();
				},
				success: function(data){
					removeSpinner();

					if(data == 1){
						
						$('#modalTiendas').modal('hide');
						$('#modalMapa').modal('hide');
						resetForm('formTiendas');
						toast1("Felicidades!", success, 8000, "success");

						verTiendas($('#idcliente').val());
					}
					else
						toast1("Error!", ajaxError, 8000, "error");
				}
			});

		}
		else{
			toast1("Atención!", validaCampos, 8000, "warning");		
		}

	})

	$(document).on('click', '#btnBuscaCP', function(e){
		e.preventDefault();

		var cp = $('#txt_cpT').val();

		$.ajax({
			url:'routes/routeDomgeo.php',
			type:'post',
			data: {info: cp, action: "getinfo"},
			dataType:'JSON',
			beforeSend: function(){
				showSpinner();
			},
			error: function(error){
				toast1("Error!", ajaxError, 8000, "error");
				removeSpinner();
			},
			success: function(data){
				removeSpinner();

				if (data != "") {

					var edos = '<option value="0" disabled>Seleccione un estado</option>'; 
					var muns = '<option value="0" disabled>Seleccione un municipio</option>'; 
					var locs = '<option value="0" disabled>Seleccione una localidad</option>';
					var asens = '<option value="0" disabled>Seleccione una colonia</option>';
					var edo, mun, loc;

					for (var i = 0; i < data.length; i++) {

						switch(data[i].iden) {
						    case "ListEdo":
						        edos += '<option class="" id="" value="'+data[i].clave+'">'+data[i].nombre+'</option>';
						        break;
						    case "Edo":
						        edo = data[i].clave;
						        break;
						    case "ListMun":
						        muns += '<option class="" id="" value="'+data[i].clave+'">'+data[i].nombre+'</option>';
						        break;
						    case "Mun":
						        mun = data[i].clave;
						        break;
						    case "ListLoc":
						        locs += '<option class="" id="" value="'+data[i].clave+'">'+data[i].nombre+'</option>';
						        break;
						    case "Loc":
						        loc = data[i].clave;
						        break;
						}

					}
					
					var length = (data.length)-1;
					if(data[length].iden !== 'Loc')
						loc = 0;

					$('#txt_estadoT').empty();
					$('#txt_estadoT').append(edos);
					$('#txt_estadoT').val(edo);
					$("#txt_estadoT").prop('disabled', false);

					$('#txt_municipioT').empty();
					$('#txt_municipioT').append(muns);
					$('#txt_municipioT').val(mun);
					$("#txt_municipioT").prop('disabled', false);

					$('#txt_localidadT').empty();
					$('#txt_localidadT').append(locs);
					$('#txt_localidadT').val(loc);
					$("#txt_localidadT").prop('disabled', false);

					$('#txt_coloniaT').empty();
					$('#txt_coloniaT').append(asens);
					$("#txt_coloniaT").prop('disabled', false);

				}
				else{
					toast1("Error!", ajaxError, 8000, "error");
				}
				
			}
		})
	
	})

	$(document).on('click', '#btnShowMap', function(e){
		e.preventDefault();

		bandera = true;

		var edo = $('#txt_estadoT option:selected').text();
		var mun = $('#txt_municipioT option:selected').text();
		var col = $('#txt_coloniaT option:selected').text();
		var calle = $('#txt_calleT').val();
		var noext = $('#txt_noextT').val();

		var lat = $('#latitud').val();
		var lng = $('#longitud').val();

		if(lat != "" && lng != ""){
			var address = lat+','+lng;
		}
		else{
			var address = calle+' '+noext+' '+col+' '+mun+' '+edo;
		}


		$('#address').val(address);
		showMap(address);

		// console.log(address);
	
	})

	// $(document).on('click', '#txt_estadoT, #txt_municipioT, #txt_localidadT, #txt_coloniaT', function(e){
	// })
	
	$(document).on('change', '#txt_coloniaT, #txt_calleT, #txt_nointT, #txt_noextT', function(e){	
		
		if(bandera){
			$('#longitud').val('');
			$('#latitud').val('');
			$('#address').val('');
		}

	})



	$(document).on('change', '#txt_estadoT', function(){

		var estado = $('#txt_estadoT').val();

		$.ajax({
			url:'routes/routeDomgeo.php',
			type:'post',
			data: {info: estado, action: "mun"},
			dataType:'JSON',
			beforeSend: function(){
				showSpinner();
			},
			error: function(error){
				toast1("Error!", error, 8000, "error");
				removeSpinner();
			},
			success: function(data){

				removeSpinner();

				if (data != "") {

					var lon = data.length;
					$("#txt_municipioT").empty();
					$("#txt_municipioT").append('<option class="" id="" value="0" disabled selected>Seleccione una opción</option>');

					for (var i = 0; i < lon; i++) {
						var id = data[i].cveMpo;
						var nombre = utf8_decode(data[i].nomMpo);
						$("#txt_municipioT").append(
							'<option value="'+id+'">'+nombre+'</option>'
						);
					}
					
					$("#txt_municipioT").prop('disabled', false);

				}
				else
					toast1("Error!", error, 8000, "error");
				
			}
		});
	});

	$(document).on('change', '#txt_municipioT', function(){

		var municipio = $('#txt_municipioT').val();
		var estado = $('#txt_estadoT').val();
		
		$.ajax({
			url:'routes/routeDomgeo.php',
			type:'post',
			data: {info: {"edo": estado, "mun": municipio}, action: "loc"},
			dataType:'json',
			beforeSend: function(){
				showSpinner();
			},
			error: function(error){
				toast1("Error!", error, 8000, "error");
				removeSpinner();
			},
			success: function(data){
				
				removeSpinner();

				if (data != "") {
					var lon = data.length;
					$("#txt_localidadT").empty();
					$("#txt_localidadT").append('<option class="" id="" value="0" disabled selected>Seleccione una opción</option>');

					for (var i = 0; i < lon; i++) {

						var id = data[i].cveLoc;
						var nombre = utf8_decode(data[i].nomLoc);
						$("#txt_localidadT").append(
							'<option value="'+id+'">'+nombre+'</option>'
						);
					}

					$("#txt_localidadT").prop('disabled', false);

				}
				else
					toast1("Error!", error, 8000, "error");

			}
		});
	
	});

	// $(document).on('change', '#txt_localidadT', function(){

	// 	var municipio = $('#txt_municipioT').val();
	// 	var estado    = $('#txt_estadoT').val();
	// 	var localidad = $('#txt_localidadT').val();
		
	// 	$.ajax({
	// 		url:'routes/routeDomgeo.php',
	// 		type:'post',
	// 		data: {info: {"edo": estado, "mun": municipio, "loc": localidad}, action: "col"},
	// 		dataType:'json',
	// 		beforeSend: function(){
	// 			showSpinner();
	// 		},
	// 		error: function(error){
	// 			toast1("Error!", error, 8000, "error");
	// 			removeSpinner();
	// 		},
	// 		success: function(data){
				
	// 			removeSpinner();

	// 			if (data != "") {
	// 				var lon = data.length;
	// 				$("#txt_coloniaT").empty();
	// 				$("#txt_coloniaT").append('<option class="" id="" value="0" disabled selected>Seleccione una colonia</option>');

	// 				for (var i = 0; i < lon; i++) {

	// 					var id = data[i].cve_asen;
	// 					var nombre = utf8_decode(data[i].nom_asen);
	// 					$("#txt_coloniaT").append(
	// 						'<option value="'+id+'">'+nombre+'</option>'
	// 					);
	// 				}

	// 				$("#txt_coloniaT").prop('disabled', false);

	// 			}
	// 			else
	// 				toast1("Error!", error, 8000, "error");

	// 		}
	// 	});
	
	// })

	// $(document).on('change', '#txt_coloniaT', function(){

	// 	var municipio = $('#txt_municipioT').val()
	// 	var estado = $('#txt_estadoT').val()
		
	// 	$.ajax({
	// 		url:'routes/routeDomgeo.php',
	// 		type:'post',
	// 		data: {info: {"edo": estado, "mun": municipio}, action: "cp"},
	// 		dataType:'json',
	// 		beforeSend: function(){
	// 			showSpinner()
	// 		},
	// 		error: function(error){
	// 			toast1("Error!", error, 8000, "error")
	// 			removeSpinner()
	// 		},
	// 		success: function(data){
				
	// 			removeSpinner()

	// 			if (data != "") {
	// 				var lon = data.length
	// 				$("#txt_cpT").empty()
	// 				$("#txt_cpT").append('<option class="" id="" value="0" disabled selected>Seleccione una opción</option>')

	// 				for (var i = 0; i < lon; i++) {

	// 					var id = i
	// 					var nombre = utf8_decode(data[i].codigo)
	// 					$("#txt_cpT").append(
	// 						'<option value="'+id+'">'+nombre+'</option>'
	// 					)
	// 				}

	// 				$("#txt_cpT").prop('disabled', false)

	// 			}
	// 			else
	// 				toast1("Error!", error, 8000, "error")

	// 		}
	// 	})
	
	// })

	

	// =========== Funciones CRUD  ========================================

	function editTiendas(id){
		resetForm('formTiendas');
		$('#modalTiendas').modal('show');
		$('#action').val('update');
		$('.btnModalT').attr('id','btnEditT');
		$('#idtienda').val(id);
		bandera = true;

		$.ajax({
			url:'routes/routeTiendas.php',
			type:'POST',
			data: {info: id, action: 'get'},
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
				// console.log(data);
				removeSpinner();

				if (data != "") {

					var infoTienda = data[0];
					var infoGen = data[1];
				
					var edos = "", muns = "", locs = "", asens = "";
					var edo, mun, loc, asen;

					for (var i = 0; i < infoGen.length; i++) {

						switch(infoGen[i].iden) {
						    case "ListEdo":
						        edos += '<option class="" id="" value="'+infoGen[i].clave+'">'+infoGen[i].nombre+'</option>';
						        break;
						    case "Edo":
						        edo = infoGen[i].clave;
						        break;
						    case "ListMun":
						        muns += '<option class="" id="" value="'+infoGen[i].clave+'">'+infoGen[i].nombre+'</option>';
						        break;
						    case "Mun":
						        mun = infoGen[i].clave;
						        break;
						    case "ListLoc":
						        locs += '<option class="" id="" value="'+infoGen[i].clave+'">'+infoGen[i].nombre+'</option>';
						        break;
						    case "Loc":
						        loc = infoGen[i].clave;
						        break;
						    // case "ListAsen":
						    //     asens += '<option class="" id="" value="'+infoGen[i].clave+'">'+infoGen[i].nombre+'</option>';
						    //     break;
						    // case "Asen":
						    //     asen = infoGen[i].clave;
						    //     break;

						}

					}

					// console.log('Variables edo -- '+edo+' mun -- '+mun+' loc -- '+loc+' asen -- '+asen);

					$('#txt_nombreT').val(infoTienda[0].nombre);
					$('#txt_encargadoT').val(infoTienda[0].encargado);
					$('#txt_calleT').val(infoTienda[0].calle);
					$('#txt_noextT').val(infoTienda[0].noext);
					$('#txt_nointT').val(infoTienda[0].noint);
					$('#latitud').val(infoTienda[0].lat);
					$('#longitud').val(infoTienda[0].lng);

					$('#txt_coloniaT').val(infoTienda[0].colonia);
					$("#txt_coloniaT").prop('disabled', false);


					$('#txt_cpT').val(infoTienda[0].cp);

					$('#txt_estadoT').empty();
					$('#txt_estadoT').append(edos);
					$('#txt_estadoT').val(edo);
					$("#txt_estadoT").prop('disabled', false);

					$('#txt_municipioT').empty();
					$('#txt_municipioT').append(muns);
					$('#txt_municipioT').val(mun);
					$("#txt_municipioT").prop('disabled', false);

					$('#txt_localidadT').empty();
					$('#txt_localidadT').append(locs);
					$('#txt_localidadT').val(loc);
					$("#txt_localidadT").prop('disabled', false);

					// $('#txt_coloniaT').empty();
					// $('#txt_coloniaT').append(asens);
					// $('#txt_coloniaT').val(asen);
					// $("#txt_coloniaT").prop('disabled', false);

				}
				else{
					toast1("Error!", ajaxError, 8000, "error");
				}
				
			}
		});
	
	}

	function verTiendas(id){

		$('#modal_titleVer').html('Tiendas');
		
		$('#idcliente').val(id);

		$.ajax({
			url:'routes/routeTiendas.php',
			type:'post',
			data: {info: id, action: "read"},
			dataType:'JSON',
			beforeSend: function(){
				showSpinner();
			},
			error: function(error){
				toast1("Error!", ajaxError, 8000, "error");
				removeSpinner();
			},
			success: function(data){
				
				removeSpinner();

				if(data != ""){
					var headers = ["No.", "Tienda", "Dirección", "Encargado", "Opciones"];
					jQueryTableCustom2("tableContainerT", headers, data, 8, "450px", "Tiendas");
				  //jQueryTable(id_container, headers, data, LimitRow, maxHeight, NameFunc)
				}
				else{
					$('#tbodyT').empty();
					$('#theadT').empty();
					$('#tbodyT').append('<div class="col-md-12">'+
						                    '<div class="col-md-2" style="margin-left: 20%;">'+
						                      '<img src="images/folder2.png" style="width: 100px;height: 100px;">'+
						                    '</div>'+
						                    '<div class="col-md-6" style="margin-top: 20px;">'+
						                      '<h3>No encontramos ningun bloque asignado a este cliente</h3>'+
						                    '</div>'+
						                 '</div>');
					// toast1("Atencion!", "Aún no hay zonas asignadas a este proveedor", 8000, "error");
				}

				$('#modalVerTiendas').modal('show');
				
			}
		})

	}

	function AddTienda(){
		// resetForm('formTiendas')
		$('.btnModalT').attr('id','btnAddT')
		$('#modal_titleT').html('Nueva Tienda')
		$('#modalTiendas').modal('show')

		$('#action').val('create');

	}



	// ======= MAPAS ====================================================================================


    function showMap(direccion){

        var uri = "https://maps.googleapis.com/maps/api/geocode/json?address="+direccion;
        var lng, lat;

        $.getJSON(uri, function(data) {

        	if(data.status == "OK"){

        		lat = data.results[0].geometry.location.lat;
	            lng = data.results[0].geometry.location.lng;
	            latlng = new google.maps.LatLng(lat, lng);

	            $('#latitud').val(lat);
	            $('#longitud').val(lng);

	            drawMap(lat, lng, latlng, 'map');

        	}
        	else
        		toast1("Atencion!", "Por favor revise que la colonia y calle que introdujo existan y/o estén correctamente escritas", 11000, "warning");
	            
            
        });

    }

    function drawMap(lat, lng, latlng, idMap){

        //Opciones del mapa
        var options = {zoom: 15, scrollwheel: true, center: latlng}
        //Creación del mapa
        map = new google.maps.Map(document.getElementById(idMap), options)
        
        var marker = new google.maps.Marker({
            position: latlng,
            map: map,
            draggable: true,
            title: 'Prueba',
            domicilio: 'Prueba'
        })

        marker.setMap(map);

        google.maps.event.addListener(marker, 'dragend', function (event) {
                             
            var myLatLng = event.latLng;
            var lat = myLatLng.lat();
            var lng = myLatLng.lng();

            //alert(lat+' -- '+lng)
             
            document.getElementById("latitud").value = lat;
            // console.log(lat)
            document.getElementById("longitud").value = lng;
            // console.log(lng)
           
       	});

       	$('#modalMapa').modal('show');

		$("#modalMapa").on("shown.bs.modal", function () {
			google.maps.event.trigger(map, "resize");
			map.setCenter(latlng);

			// setTimeout(function() {
			//     mapModal.setCenter(latlng);
			// }, 100)
		});

    } // Fin función

// :::::::::::::::::::::::::  [19/07/2017] ::::::::::::::::::::::::::::::
// ************************ NUEVAS FUNCIONES ****************************
	
	// FUNCIONES INICIALES
	$(function (){
		$('#modalPoligonos').on('hidden.bs.modal', function (e) {
			msotrarPoligonosLista();
		});
	})
	// :::::::::: BLOQUES :::::::::::::::::::::::::::::::
	var idClienteGlobal;
	var idBloqueGlobal;
	var idSucursalGlobal;
	function verBloques(id){
		idClienteGlobal = id;
		$('#modal_titleVer').html('Bloques de Sucursales');
		$('#idcliente').val(id);

		$.ajax({
			url:'routes/routeTiendas.php',
			type:'post',
			data: {info: id, action: "readBloques"},
			dataType:'JSON',
			beforeSend: function(){
				showSpinner();
			},
			error: function(error){
				toast1("Error!", ajaxError, 8000, "error");
				removeSpinner();
			},
			success: function(data){
				removeSpinner();

				if(data != ""){
					var headers = ["No.", "Nombre", "Encargado", "Opciones"];
					jQueryTableCustom2("tableContainerT", headers, data, 8, "450px", "Bloques");
				}
				else{
					$('#tbodyB').empty();
					$('#theadB').empty();
					$('#tbodyB').append('<div class="col-md-12">'+
						                    '<div class="col-md-2" style="margin-left: 20%;">'+
						                      '<img src="images/folder2.png" style="width: 100px;height: 100px;">'+
						                    '</div>'+
						                    '<div class="col-md-6" style="margin-top: 20px;">'+
						                      '<h3>No encontramos ningun bloque asignado a este cliente</h3>'+
						                    '</div>'+
						                   '</div>');
				}
				$('#modalVerBloques').modal('show');
			}
		});
	}

	// ALTA / EDICION DE BLOQUE
	$(document).on('click', '#btnGuardaBloque', function (){
		var accion = $('#btnGuardaBloque').attr('accion');

		var bandera = true;
		$('.requiredB').each(function(index, element) {
			if (element.value == "" || element.value == "null"){
				bandera = false;
				element.className += ' invalid';
			}else{
				$(this).removeClass('invalid');
			}
		});
		if(!validarCorreo($('#txt_correoB').val())){
			bandera = false;
			$('#txt_correoB').addClass(' invalid');
			$('#txt_correoB').focus();
			toast1("Correo erroneo", "Formaro de correo incorrecto", 5000, "error");
		}

		if(bandera === true){
			var bloque = {
				idbloque: idBloqueGlobal,
				cliente: idClienteGlobal,
				nombre: $('#txt_nombreB').val(),
				encargado: $('#txt_encargadoB').val(),
				correo: $('#txt_correoB').val(),
				celular: $('#txt_celularB').val(),
				oficina: $('#txt_teloficinaB').val(),
				whatsapp: $('#txt_whatsappB').val()
			};
			$.ajax({
				url:'routes/routeTiendas.php',
				type:'post',
				data: {info: bloque, action: accion},
				dataType:'JSON',
				beforeSend: function(){
					showSpinner();
				},
				error: function(error){
					toast1("Error!", ajaxError, 8000, "error");
					removeSpinner();
				},
				success: function(data){
					removeSpinner();
					if(data === true){
						$('#modalBloques').modal('hide');
						verBloques(idClienteGlobal);
						toast1("Felicidades!", success, 8000, "success");
					}else if(data === "MAILERROR"){
						toast1("Correo Duplicado", "<b>Ya existe un registro con ese correo.</b>", 8000, "error");
					}else{
						toast1("Error!", ajaxError, 8000, "error");
					}
				}
			});
		}
	});

	// BAJA DE BLOQUES
	function deleteBloques(idBloque){
		$.confirm({
            title: 'Eliminar Bloque!',
            content: '<b>NOTA: Esta accion eliminará también las sucursales anexadas a este bloque:</b>\n\n¿Esta seguro que desea continuar?',
            confirm: function(){
                $.ajax({
					url:'routes/routeTiendas.php',
					type:'post',
					data: {'info': idBloque, action: 'deleteBloque'},
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
						verBloques(idClienteGlobal);
					}
				});
            },
            cancel: function(){}
        });
	}

	// AGREGAR NUEVO BLOQUE (LLAMAR MODAL)
	$(document).on('click', '#btn_nuevaB', function(){
		altaEditarBloque('nuevoBloque');
	});
	// EDITAR BLOQUE (LLAMAR MODAL)
	function editBloques(id){
		idBloqueGlobal = id;
		altaEditarBloque('editarBloque');
	}

	// FUNCION ALTA O EDICION DE BLOQUE DE SUCURSALES 
	function altaEditarBloque(accion){
		$('#btnGuardaBloque').attr('accion', accion);
		if(accion === 'nuevoBloque'){
			$('.requiredB').each(function(){
				$(this).val('');
			});
			$('#txt_whatsappB').val('+52 ');
			$('#modal_titleB').text('Nuevo Bloque de Sucursal');
			$('#btnGuardaBloque').text('Guardar Bloque');
		}else if(accion === 'editarBloque'){
			$.ajax({
				url:'routes/routeTiendas.php',
				type:'post',
				data: {info: idBloqueGlobal, action: 'editarBloqueInfo'},
				dataType:'JSON',
				beforeSend: function(){
					showSpinner();
				},
				error: function(error){
					toast1("Error!", ajaxError, 8000, "error");
					removeSpinner();
				},
				success: function(data){
					removeSpinner();
					$('#txt_nombreB').val(data[0][2]);
					$('#txt_encargadoB').val(data[0][3]);
					$('#txt_correoB').val(data[0][4]);
					$('#txt_celularB').val(data[0][5]);
					$('#txt_teloficinaB').val(data[0][6]);
					$('#txt_whatsappB').val(data[0][7]);

					$('#modal_titleB').text('Editar Bloque de Sucursal');
					$('#btnGuardaBloque').text('Editar Bloque');
				}
			});
		}
		$('#modalBloques').modal('show');
	}

	// :::::::::: SUCURSALES :::::::::::::::::::::::::::::::
	// FUNCIONES DE BOTONES

	// ******** ESTADOS (SOLO HUBICACION SUCURSAL) ******
	$(document).on('change', '#txt_EstadoSH', function(){
		var opcion = '<option value="-1">- Seleccione Municipio -</option>';
		domgeoAJAX($(this).val(), 'traerMunicipio', function(){
			$('#txt_MunicipioSH').html('');
			for(i = 0; i < domgeoJSON.length; i++){
				opcion += '<option value="' + domgeoJSON[i]['cveMpo'] + '">' + domgeoJSON[i]['nomMpo'] + '</option>';
			}
			$('#txt_MunicipioSH').append(opcion);
			removeSpinner();
		});
	});

	// ******** ESTADOS ******
	$(document).on('change', '#txt_EstadoS', function(){
		$('#divLocCol').fadeOut('slow');
		var opcion = '<option value="-1">- Seleccione Municipio -</option>';
		domgeoAJAX($(this).val(), 'traerMunicipio', function(){
			$('#txt_MunicipioS').html('');
			for(i = 0; i < domgeoJSON.length; i++){
				opcion += '<option value="' + domgeoJSON[i]['cveMpo'] + '">' + domgeoJSON[i]['nomMpo'] + '</option>';
			}
			$('#txt_MunicipioS').append(opcion);
			removeSpinner();
		});
	});

	// ********** MUNICIPIOS *****
	$(document).on('change', '#txt_MunicipioS', function(){
		msotrarPoligonosLista();
	});

	// ********** ASIGNAR POLIGONOS ********
	$(document).on('click', '#asignarPoligonos', function(){
		var edo = $('#txt_EstadoS').val();
		var mun = $('#txt_MunicipioS').val();
		if(parseInt(edo) > 0 && parseInt(mun) > 0){

			$.ajax({
				url:'routes/routeTiendas.php',
				type:'post',
				data: {info: edo + ':' + mun + ':', action: 'traerPoligono'},
				dataType:'JSON',
				beforeSend: function(){
					showSpinner();
				},
				error: function(error){
					toast1("Error!", ajaxError, 8000, "error");
					removeSpinner();
				},
				success: function(data){
					pintarPoligonos(data);
				}
			});
		}
	});

	// ******** CHECKBOX DE LOCALIDADES ******
	$(document).on('click', '.checksMuns', function (){
		var check = $(this).prop('checked');
		var idChek = $(this).attr('id');
		var domgeo = idChek.split('-');
		if(check === true){
			var elemns = {
				id: idChek,
				edo: domgeo[0].split('_')[1],
				mun: domgeo[1].split('_')[1],
				loc: domgeo[2].split('_')[1]
			};
			localidadesJSON['elementos'].push(elemns);
		}else if(check === false){
			localidadesJSON.elementos.quitarElemento('id', idChek);
		}
		console.log(localidadesJSON);
	})

	// FUNCION DE MOSTRAR EL DIV DE LOCALIDADES Y COLONIAS
	function msotrarPoligonosLista(){
		if(parseInt($('#txt_EstadoS').val()) > 0 && parseInt($('#txt_MunicipioS').val()) > 0){
			$('#divLocCol').fadeIn('slow');
			$('#localidadeSucursal').html('');
			if(poligonosJSON.elementos.length < 1){
				$('#localidadeSucursal').append('<div align="center"><br><img src="images/folder2.png" style="width: 50px;height: 50px;"><p></p><label>No ha asignado poligonos a esta sucursal</label></div>');
			}else{
				var lista = '';
				$.each(poligonosJSON.elementos, function (e, value){
					lista += '<a href="#" class="list-group-item"><button onclick="quitarPoligLista('+value.idpolig+')" class="btn btn-xs btn-danger"><span class="fa fa-trash"></span></button>&nbsp;&nbsp;' + value.nompolig + '</a>';
				});
				$('#localidadeSucursal').append('<div class="list-group">' + lista + '</div>');
			}
		}else{
			$('#divLocCol').fadeOut('slow');
		}
	}

	// FUNCION QUITAR ELEMENTO POLIGONO DE LA LISTA
	function quitarPoligLista(id){
		poligonosJSON.elementos.quitarElemento('idpolig', id);
		msotrarPoligonosLista();
	}

	// FUNCION ABRIR MODAL PARA AGREGAR SUCURSAL
	var localidadesJSON = [];
	var poligonosJSON = [];
	function nuevaSucursal(id){
		localidadesJSON['elementos'] = [];
		poligonosJSON['elementos'] = [];

		idBloqueGlobal = id;
		$('#txt_MunicipioS').html('');
		$('#txt_MunicipioS').append('<option value="-1">- Seleccione Municipio -</option>');
		$('#divLocCol').hide();
		$('#modal_titleS').text('Agregar Nueva Sucursal');
		$('#btnGuardaSucursal').text('Guardar Sucursal');
		$('#btnGuardaSucursal').attr('accion', 'nuevaSucursal');

		$('#txt_nombreS').val('');
		$('#txt_encargadoS').val('');
		$('#txt_correoS').val('');
		$('#txt_telefonoS').val('');

		var opcion = '<option value="-1">- Seleccione Estado -</option>';
		domgeoAJAX('', 'traerEstados', function(){
			$('#txt_EstadoS').html('');
			$('#txt_EstadoSH').html('');
			for(i = 0; i < domgeoJSON.length; i++){
				opcion += '<option value="' + domgeoJSON[i]['cveEnt'] + '">' + domgeoJSON[i]['nombent'] + '</option>';
			}
			$('#txt_EstadoS').append(opcion);
			$('#txt_EstadoSH').append(opcion);
			removeSpinner();
			$('#modalSucursales').modal('show');
		});
	}
	// FUNCION PARA ABRIR MODAL PARA EDITAR SUCURSAL
	function editarSucursal(id){
		localidadesJSON["elementos"] = [];
		poligonosJSON["elementos"] = [];
		$.ajax({
			url:'routes/routeTiendas.php',
			type:'post',
			data: {info: id, action: 'editarSucursalInfo'},
			dataType:'JSON',
			beforeSend: function(){
				showSpinner();
			},
			error: function(error){
				toast1("Error!", ajaxError, 8000, "error");
				removeSpinner();
			},
			success: function(data){
				idSucursalGlobal = data[0]["idsucursal"];
				idBloqueGlobal = data[0]["idbloque"];
				$('#txt_nombreS').val(data[0]["nombre"]);
				$('#txt_encargadoS').val(data[0]["encargado"]);
				$('#txt_correoS').val(data[0]["ctacorreo"]);
				$('#txt_telefonoS').val(data[0]["telefono"]);
				var edoHubic = data[0]["estado"];
				var munHubic = data[0]["municipio"];

				var localidades = data[0]["localidades"];
				var edoSelect;
				var munSelect;
				$(localidades).each(function (e, valor){
					if(e < 1){
						edoSelect = valor.estado;
						munSelect = valor.municipio;
					}

					var locData = {
						id: "edo_" + valor.estado + "-mun_" + valor.municipio + "-loc_" + valor.localidad,
						edo: valor.estado,
						mun: valor.municipio,
						loc: valor.localidad
					};
					localidadesJSON['elementos'].push(locData);
				});

				var perifoneo = data[0]["poligonos"];
				$(perifoneo).each(function (e, valor){
					var poligData = {
						nompolig: valor.nombrepolig,
						idpolig: parseInt(valor.idpoligono),
						edo: valor.estado,
						mun: valor.municipio
					};
					poligonosJSON["elementos"].push(poligData);
				});

				$('#modal_titleS').text('Editar Sucursal');
				$('#btnGuardaSucursal').text('Guardar cambios');
				$('#btnGuardaSucursal').attr('accion', 'editarSucursal');
				var opcion = '<option value="-1">- Seleccione Estado -</option>';
				domgeoAJAX('', 'traerEstados', function(){
					$('#txt_EstadoS').html('');
					$('#txt_EstadoSH').html('');
					for(i = 0; i < domgeoJSON.length; i++){
						opcion += '<option value="' + domgeoJSON[i]['cveEnt'] + '">' + domgeoJSON[i]['nombent'] + '</option>';
					}
					$('#txt_EstadoS').append(opcion);
					$('#txt_EstadoSH').append(opcion);

					$("#txt_EstadoS option[value='"+edoSelect+"']").prop('selected', true);
					$("#txt_EstadoSH option[value='"+edoHubic+"']").prop('selected', true);
					opcion = '<option value="-1">- Seleccione Municipio -</option>';
					domgeoAJAX(edoSelect, 'traerMunicipio', function(){
						$('#txt_MunicipioS').html('');
						$('#txt_MunicipioSH').html('');
						for(i = 0; i < domgeoJSON.length; i++){
							opcion += '<option value="' + domgeoJSON[i]['cveMpo'] + '">' + domgeoJSON[i]['nomMpo'] + '</option>';
						}
						$('#txt_MunicipioS').append(opcion);

						$("#txt_MunicipioS option[value='"+munSelect+"']").prop('selected', true);

						opcion = '<option value="-1">- Seleccione Municipio -</option>';
						domgeoAJAX(edoHubic, 'traerMunicipio', function(){
							for(i = 0; i < domgeoJSON.length; i++){
								opcion += '<option value="' + domgeoJSON[i]['cveMpo'] + '">' + domgeoJSON[i]['nomMpo'] + '</option>';
							}
							$('#txt_MunicipioSH').append(opcion);

							$("#txt_MunicipioSH option[value='"+munHubic+"']").prop('selected', true);

							setTimeout(function(){
								msotrarPoligonosLista();
								removeSpinner();
								$('#modalVerSucursales').modal('hide');
								$('#modalSucursales').modal('show');
							}, 1000);
						});
					});
				});
			}
		});
	}

	// FUNCION PARA MOSTRAR EL LISTADO DE SUCURSALES
	function mostrarSucursales(id, eliminar){
		idBloqueGlobal = id;
		$('#modal_titleVerS').text('Lista de Sucursales - ' + $('#bloque_' + id).text());
		$.ajax({
			url:'routes/routeTiendas.php',
			type:'post',
			data: {info: id, action: "readSucursales"},
			dataType:'JSON',
			beforeSend: function(){
				showSpinner();
			},
			error: function(error){
				toast1("Error!", ajaxError, 8000, "error");
				removeSpinner();
			},
			success: function(data){
				removeSpinner();

				if(data != ""){
					var headers = ["No.", "Nombre", "Encargado", "Opciones"];
					jQueryTableCustom3("tableContainerT", headers, data, 8, "450px", "Bloques");
				}
				else{
					$('#tbodyS').empty();
					$('#theadS').empty();
					$('#tbodyS').append('<div class="col-md-12">'+
						                    '<div class="col-md-2" style="margin-left: 20%;">'+
						                      '<img src="images/folder2.png" style="width: 100px;height: 100px;">'+
						                    '</div>'+
						                    '<div class="col-md-6" style="margin-top: 20px;">'+
						                      '<h3>No encontramos ninguna sucursal asignada a este bloque</h3>'+
						                    '</div>'+
						                   '</div>');
				}
				if(eliminar === false)
					$('#modalVerSucursales').modal('show');
			}
		});
	}

	// FUNCION DE GUARDAR / EDITAR SUCURSAL
	$(document).on('click', '#btnGuardaSucursal', function (){
		var continuar = true;
		$('.requiredS').each(function(index, element) {
			if(element.value == "" || element.value == "null" || parseInt(element.value) < 1){
				continuar = false;
				element.className += ' invalid';
			}else{
				$(this).removeClass('invalid');
			}
		});

		if(!validarCorreo($('#txt_correoS').val())){
			continuar = false;
			$('#txt_correoB').addClass(' invalid');
			toast1("Correo erroneo", "Formaro de correo incorrecto", 5000, "error");
		}

		/*if(localidadesJSON.elementos.length < 1){
			continuar = false;
			toast1("Localidades!",'No ha seleccionado localidades', 6000, "error");
		}*/
		if(poligonosJSON.elementos.length < 1){
			continuar = false;
			toast1("Poligonos!", 'No ha asignado poligonos', 6000, "error");
		}

		if(continuar === true){
			var accion = $('#btnGuardaSucursal').attr('accion');
			var sucursalJSON = {
				idsucursal: idSucursalGlobal,
				idbloque: idBloqueGlobal,
				nombre: $('#txt_nombreS').val(),
				encargado: $('#txt_encargadoS').val(),
				correo: $('#txt_correoS').val(),
				telefono: $('#txt_telefonoS').val(),
				estado: $('#txt_EstadoSH').val(),
				municipio: $('#txt_MunicipioSH').val(),
				localidades: poligonosJSON.elementos,
				poligonos: poligonosJSON.elementos
			};

			$.ajax({
				url:'routes/routeTiendas.php',
				type:'post',
				data: {info: sucursalJSON, action: accion},
				dataType:'JSON',
				beforeSend: function(){
					showSpinner();
				},
				error: function(error){
					toast1("Error!", ajaxError, 8000, "error");
					removeSpinner();
				},
				success: function(data){
					removeSpinner();
					if(data === true){
						$('#modalSucursales').modal('hide');
						toast1("Felicidades!", success, 8000, "success");
					}else if(data === "MAILERROR"){
						toast1("Correo Duplicado", "<b>Ya existe un registro con ese correo.</b>", 8000, "error");
					}else{
						toast1("Error!", ajaxError, 8000, "error");
					}
				}
			});
		}
	});

	// FUNCION PARA ELIMINAR SUCURSAL
	function eliminarSucursal(id){
		$.confirm({
            title: 'Eliminar Sucursal!',
            content: '¿Desea eliminar esta sucursal?',
            confirm: function(){
            	$.ajax({
					url:'routes/routeTiendas.php',
					type:'post',
					data: {info: id, action: 'eliminarSucursal'},
					dataType:'JSON',
					beforeSend: function(){
						showSpinner();
					},
					error: function(error){
						toast1("Error!", ajaxError, 8000, "error");
						removeSpinner();
					},
					success: function(data){
						console.log(data);
						mostrarSucursales(idBloqueGlobal, true);
						toast1("Felicidades!", success, 8000, "success");
					}
				});
            },
            cancel: function(){}
        });
	}

	// FUNCION NUEVA SUCURSAL (DESDE EL MODAL)
	$(document).on('click', '#btn_nuevaS', function (){
		$('#modalVerSucursales').modal('hide');
		nuevaSucursal(idBloqueGlobal);
	});

	// CERRADO DE MODALS (POR SI ACASO)
	$(document).on('click', '#cerrarModals', function (e){
		$('.modal').each(function (){
			$(this).modal('hide');
		});
	});

	// ******** :::::::::::::::::::::::::: **********
	// ::::::::::: FUNCIONES CON MAPAS ::::::::::::
	var miMapaGlobal;
	var edoMunGlobal;
	function coordsDefaultMapa(){
		geoDataCompleto = $('#txt_EstadoS option:selected').text() + ', ' + $('#txt_MunicipioS option:selected').text();
		miMapaGlobal = new google.maps.Map(document.getElementById('googleMap'),{zoom: 13,mapTypeId: google.maps.MapTypeId.TERRAIN,fullscreenControl: true,});
		var geoCodigo = new google.maps.Geocoder();
		enviarAddressMapa(geoCodigo, miMapaGlobal);
		edoMunGlobal = $('#txt_EstadoS').val() + ':' + $('#txt_MunicipioS').val();
	}
	// PINTAMOS POLIGONOS
	var poligonoVer;
	var infoVentana;
	var banderaPolig;

	var todosPoligonosJSON = [];
	function pintarPoligonos(polig){
		coordsDefaultMapa();
		poligonoVer = {};
		banderaPolig = {};
		todosPoligonosJSON = [];
		var centro;
		$.each(polig, function (p, elem){
			// LLENAR TODOS LOS POLIGONOS - PARA USARSE EN CASO DE QUERER ASIGNAR TODOS LOS POLIGONOS
			todosPoligonosJSON.push({
				idPolig: elem.id,
				nomPolig: elem.nomtxt
			});

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
				imagen = 'images/banderasPolig/disponible.png';
			else
				imagen = 'images/banderasPolig/asignado.png';

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
					var contenido = '<div id="content"><div id="siteNotice"></div><center><label id="firstHeading">'+elem.nomtxt+'</label></center><br><div id="bodyContent"><p><span class="text-primary"><b>Num. Volanteo: <b/></span>'+elem.numvolantes+'</p><p><span class="text-primary"><b>Perifoneo: <b/></span>'+elem.hrsperifoneo+'</p><p><span class="text-primary"><b>Observaciones: <b/></span>'+elem.observaciones+'</p>';
					var cont = 0;
					$(poligonosJSON.elementos).each(function (e, value){
						if(parseInt(value.idpolig) === parseInt(elem.id))
							cont++;
					});
					if(cont < 1){
						contenido += '<button class="btn btn-primary btn-xs" onclick="asignarPoligono('+elem.id+','+"'"+elem.nomtxt+"'"+')">Agregar a sucursal</button>';
					}else{
						contenido += '<button class="btn btn-warning btn-xs" onclick="quitarPoligono('+elem.id+')">Quitar</button>';
					}
					contenido += '</div></div>';
					
					infoVentana.setContent(contenido);
					infoVentana.open(miMapaGlobal, bandera);
				}
			})(banderaPolig["ban_" + elem.id], p));

			// PINTAMOS EL POLIGONO EN EL MAPA
			poligonoVer["pol_" + elem.id].setMap(miMapaGlobal);
		});

		$('#modalPoligonos').modal('show');
		$("#modalPoligonos").on("shown.bs.modal", function () {
			google.maps.event.trigger(miMapaGlobal, "resize");
			miMapaGlobal.setCenter(centro);
		});
		removeSpinner();
	}

	function asignarPoligono(idPolig, nomPolig){
		banderaPolig["ban_" + idPolig].setOptions({
			icon: 'images/banderasPolig/asignado.png'
		});
		var poligData = {
			idpolig: idPolig,
			nompolig: nomPolig,
			edo: edoMunGlobal.split(':')[0],
			mun: edoMunGlobal.split(':')[1]
		};
		poligonosJSON['elementos'].push(poligData);
		infoVentana.close();
	}

	function quitarPoligono(idPolig){
		banderaPolig["ban_" + idPolig].setOptions({
			icon: 'images/banderasPolig/disponible.png'
		});
		poligonosJSON.elementos.quitarElemento('idpolig', idPolig);
		infoVentana.close();
	}

	// FUNCION NUEVA 08/03/2018
	// ASIGNAR TODOS LOS POLIGONOS EN PANTALLA
	$(document).on('click', '#selectTodosPoligs', function(){
		$.confirm({
			title: 'Seleccionar todos los poligonos',
			content: '¿Desea continuar?',
			confirm: function(){
				showSpinner();
				var hecho = [];
				poligonosJSON.elementos.quitarElemento('mun', edoMunGlobal.split(':')[1]);
				$(todosPoligonosJSON).each(function (key, value){
					poligonosJSON['elementos'].push({
						idpolig: value.idPolig,
						nompolig: value.nomPolig,
						edo: edoMunGlobal.split(':')[0],
						mun: edoMunGlobal.split(':')[1]
					});
					hecho.push($.ajax({}));
				});
				$.when.apply($, hecho).done(function () {
					$('#modalPoligonos').modal('hide');
					removeSpinner();
				});
			},
			cancel: function(){			
			}
		});
	});


	// ********* FUNCIONES MISCELANEAS ***********
	// VALIDACION DE NUMERO DE WHATSAPP
	$(document).on('keyup', '#txt_whatsappB', function (){
		var num = $(this).val();
		num = num.split('+52 ');

		var tel = "";
		if(num[1] !== undefined)
			tel = num[1];

		$(this).val('');
		$(this).val('+52 ' + tel);
	});
	// FUNCION DE VALIDACION DE CORREO ELECTRONICO
	function validarCorreo(correo){
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    	return re.test(correo);
	}

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

	// FUNCION AJAX MULTIUSOS (TRAER ESTADOS, MUNICIPIOS Y LOCALIDAD)
	var domgeoJSON;
	function domgeoAJAX(idData, accion, callback){
		domgeoJSON = {};
		$.ajax({
			url:'routes/routeTiendas.php',
			type:'post',
			data: {info: idData, action: accion},
			dataType:'JSON',
			beforeSend: function(){
				showSpinner();
			},
			error: function(error){
				toast1("Error!", ajaxError, 8000, "error");
				removeSpinner();
				callback(false);
			},
			success: function(data){
				domgeoJSON = data;
				callback(true);
			}
		});
	}

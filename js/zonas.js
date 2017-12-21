// ===============  EVENTOS PARA MODULO DE ZONAS ===========================================
// ================================================================================================
	
	var ajaxError = "Ocurrió un error, intentelo mas tarde o pongase en contacto con el administrador.";
	var success = "La acción se ralizó con exito.";
	var validaCampos = "Por favor ingrese todos los campos marcados con un asterisco * para poder continuar.";

	$(document).on('click', '#btn_nuevaZ', function(){
		AddZona();
	});

	$(document).on('click', '#btnAddZ, #btnEditZ', function(){

		var municipios = $("#txt_municipioZ").val();
		var estado 	   = $('#txt_estadoZ option:selected').text();
		var idestado   = $("#txt_estadoZ").val();
		var costoserv  = $("#txt_costoserv").val();
		var costosad   = $("#txt_costosad").val();

		if(this.id == 'btnAddZ')
			var id = $('#idprov').val();
		else
			var id = $('#idzona').val();

		if(idestado != "" && municipios != null && costoserv != "" && costosad != ""){

			$.ajax({
				url:'routes/routeZonas.php',
				type:'POST',
				data: {
					info: {
						idestado: idestado, 
						edo: estado,
						mun: municipios,
						costoserv: costoserv,
						costosad: costosad,
						id: id // Cuando es add se usa el id de proveedor y cuando es edit se usa el id de la zona
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
						
						$('#modalZonas').modal('hide');
						$("#txt_municipioZ").chosen("destroy");
						$("#txt_municipioZ").removeAttr('disabled');
						$("#txt_municipioZ").empty();
						resetForm('formZonas');
						$("#txt_municipioZ").chosen({width: "100%"});
						$(".chosen-choices").attr('style', 'height: 100px; overflow: auto;');

						toast1("Felicidades!", success, 8000, "success");

						verZonas($('#idprov').val());
					}
					else
						toast1("Error!", ajaxError, 8000, "error");
				}
			});

		}
		else
			toast1("Atención!", validaCampos, 8000, "warning");		

	})

	$(document).on('change', '#txt_estadoZ', function(){

		var estado = $('#txt_estadoZ').val();

		$.ajax({
			url:'routes/routeDomgeo.php',
			type:'post',
			data: {info: estado, action: "mun"},
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
					$("#txt_municipioZ").removeAttr('disabled');
					$("#txt_municipioZ").chosen("destroy");

					var lon = data.length;
					$("#txt_municipioZ").empty();
					$("#txt_municipioZ").append('<option class="" id=""  value="0" disabled>Seleccione una opción</option>');

					for (var i = 0; i < lon; i++) {
						var id = data[i].cveMpo;
						var nombre = data[i].nomMpo;
						$("#txt_municipioZ").append(
							'<option value="'+id+'">'+nombre+'</option>'
						);
					}

					$("#txt_municipioZ").chosen({width: "100%"});
					$(".chosen-choices").attr('style', 'height: 100px; overflow: auto;');


				}
				else
					toast1("Error!", ajaxError, 8000, "error");
				
			}
		});
	
	});


	// =========== Funciones CRUD  ========================================

	function editZona(id){
		resetForm('formZonas');
		$('#idzona').val(id);

		$.ajax({
			url:'routes/routeZonas.php',
			type:'POST',
			async: false,
			data: {info: id, action: 'get'},
			dataType:'JSON',
			beforeSend: function(){
				showSpinner();
			},
			error: function(error){
				toast1("Error!", ajaxError, 8000, "error");
				removeSpinner();
			},
			success: function(response){

				var zona = response[0][0];
				var municipios = response[1];
				var idEdo = zona.idEdo;

				console.log(zona);
				console.log(municipios);

				$.ajax({
					url:'routes/routeDomgeo.php',
					type:'post',
					async: false,
					data: {info: idEdo, action: "mun"},
					dataType:'JSON',
					error: function(error){
						toast1("Error!", ajaxError, 8000, "error");
					},
					success: function(data){

						removeSpinner();

						if (data != "") {
							$("#txt_municipioZ").removeAttr('disabled');
							$("#txt_municipioZ").chosen("destroy");

							var lon = data.length
							$("#txt_municipioZ").empty();
							$("#txt_municipioZ").append('<option class="" id=""  value="0" disabled>Seleccione una opción</option>');

							for (var i = 0; i < lon; i++) {
								var id = data[i].cveMpo;
								var nombre = data[i].nomMpo;
								$("#txt_municipioZ").append(
									'<option value="'+id+'">'+nombre+'</option>'
								);
							}

						}
						else
							toast1("Error!", ajaxError, 8000, "error");

						
					}
				})


				$("#txt_estadoZ").val(idEdo);
				$("#txt_costoserv").val(zona.costoservicio);
				$("#txt_costosad").val(zona.costosadicionales);


				for (var i = 0; i < municipios.length; i++) {
					$("#txt_municipioZ option[value='" + municipios[i].mun + "']").prop("selected", true);
				}
				// $.each(values.split("|"), function(index, value){
				//     $("#txt_municipioZ option[value='" + value + "']").prop("selected", true);
				// });


				$("#txt_municipioZ").chosen({width: "100%"});
				$(".chosen-choices").attr('style', 'height: 100px; overflow: auto;');
			}
		})

		$('.btnModalZ').attr('id','btnEditZ');
		$('#modal_titleZ').html('Editar Zona de cobertura');
		$('#modalZonas').modal('show');
		$('#action').val('update');

	}

	function deleteZona(id){
		
		$.confirm({
            title: 'Atencion!',
            content: '¿Esta seguro que desea eliminar esta zona de cobertura?',
            confirm: function(){
				$.ajax({
					url:'routes/routeZonas.php',
					type:'POST',
					data: {info: id, action: "delete"},
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

						if(data == "true"){

							toast1("Felicidades!", success, 8000, "success");
							// alert($('#idprov').val())
							verZonas($('#idprov').val());
						}
						
					}
				});
			},
            cancel: function(){
                console.log('false');
            }
        });
				
	}

	function verZonas(id){

		$('#idprov').val(id);

		// $('#modalVerZonas').removeData()

		$.ajax({
			url:'routes/routeZonas.php',
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
					var headers = ["No.", "Zona", "Costo servicio", "Costos adicionales", "Opciones"];
					jQueryTableCustom("tableContainerZ", headers, data, 8, "450px", "Zona");
				  //jQueryTable(id_container, headers, data, LimitRow, maxHeight, NameFunc)
				}
				else{
					$('#tbodyZ').empty();
					$('#theadZ').empty();
					$('#tbodyZ').append('<div class="col-md-12">'+
						                    '<div class="col-md-2" style="margin-left: 20%;">'+
						                      '<img src="images/folder2.png" style="width: 100px;height: 100px;">'+
						                    '</div>'+
						                    '<div class="col-md-6" style="margin-top: 20px;">'+
						                      '<h3>No encontramos ninguna zona asignada a este proveedor</h3>'+
						                    '</div>'+
						                 '</div>');
					// toast1("Atencion!", "Aún no hay zonas asignadas a este proveedor", 8000, "error");
				}

				$('#modalVerZonas').modal('show');
				
			}
		})

		// $('#modalVerZonas').modal('refresh');
	}

	function show(id){

		$.ajax({
			url:'routes/routeZonas.php',
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
					// alert("!=''")
					var headers = ["No.", "Zona", "Costo servicio", "Costos adicionales", "Opciones"];
					jQueryTableCustom("tableContainerZ", headers, data, 8, "450px", "Zona");
				  //jQueryTable(id_container, headers, data, LimitRow, maxHeight, NameFunc)
				}
				else{
					// alert("==''")
					$('tbodyZ').empty();
					toast1("Atencion!", "Aún no hay zonas asignadas a este proveedor", 8000, "error");
				}
				
			}
		})

	}

	function AddZona(){
		$('.btnModalZ').attr('id','btnAddZ');
		$('#modal_titleZ').html('Nueva zona de cobertura');
		$('#modalZonas').modal('show');
		$('#action').val('create');

	}

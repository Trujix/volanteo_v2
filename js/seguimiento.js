	$(document).ready(function(){

		$('#myCarousel').carousel({
                interval: 5000
        });
 
        //Handles the carousel thumbnails
        $('[id^=carousel-selector-]').click(function () {
	        var id_selector = $(this).attr("id");
	        try {
	            var id = /-(\d+)$/.exec(id_selector)[1];
	            console.log(id_selector, id);
	            $('#myCarousel').carousel(parseInt(id));
	        } catch (e) {
	            console.log('Regex failed!', e);
	        }
    	});

        // When the carousel slides, auto update the text
        $('#myCarousel').on('slid.bs.carousel', function (e) {
            var id = $('.item.active').data('slide-number');
            $('#carousel-text').html($('#slide-content-'+id).html());
        });

        //showLvl1();
		
	});

	var ajaxError = "Ocurrió un error, intentelo mas tarde o pongase en contacto con el administrador";


	function showPhotos(id_service){
		window.location = "seguimiento.php?opt=evidencias&serv="+id_service;
	}


	function showLvl1(id = null){

		$.ajax({
			url:'routes/routeSeguimiento.php',
			type:'post',
			async: true,
			data: {info: id, action: 'lvl1'},
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
					
					var thead = '<tr>'+
									'<th>NO. TRABAJO</th>'+
									'<th>CLIENTE</th>'+
									'<th>PERIODO</th>'+
									'<th>OPCIONES</th>'+
								'</tr>';

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


					$('#thead').empty();
					$('#thead').append(thead);
					$('#tbody').empty();
					$('#tbody').append(tbody);
				}
				else{
					$('#thead').empty();
					$('#tbody').empty();
					toast1("Atencion!", "No hay datos para mostrar", 8000, "error");
				}
			}
		}); //fin ajax

	}

	function showLvl2(id_service){

		$.ajax({
			url:'routes/routeSeguimiento.php',
			type:'post',
			async: true,
			data: {info: id_service, action: 'lvl2'},
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

					/*var thead = '<tr>'+
									'<th>DISPOSITIVO</th>'+
									'<th>PROVEEDOR</th>'+
									'<th>OPCIONES</th>'+
								'</tr>';
					

					var tbody = '';
					for (var i = 0; i < data.length; i++) {
						tbody += '<tr>'+
									'<td>' + data[i].id_device + '</td>'+
									'<td>' + data[i].proveedor + '</td>'+
									'<td>'+
										'<a href="#" onclick="showLvl3(\'' + data[i].id_device + '\', \'' + id_service + '\')" class="btn btn-info btn-xs">'+
											'<i class="fa fa-tablet"></i> Ver detalle '+
										'</a>'+
									'</td>'+
								  '</tr>';*/
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
									        '<a data-toggle="collapse" data-parent="#accordion" onclick="showLvl2_2('+ "'" + text + "'" +','+data[i].id_proveedor+',' + id_service + ')" href="#collapse'+text+'" aria-expanded="false" aria-controls="collapse'+text+'">'+
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

					$('#title_lvl2').html('Proveedores del servicio no. '+id_service);
					/*$('#thead2').empty();
					$('#thead2').append(thead);
					$('#tbody2').empty();
					$('#tbody2').append(tbody);*/
					$('#accordionDiv').html('');
					$('#accordionDiv').append(acordeon);
				}else{
					/*$('#thead2').empty();
					$('#tbody2').empty();*/
					$('#accordionDiv').empty();
					toast1("Atencion!", "No hay datos para mostrar", 8000, "error");
				}

				$('#modal_lvl2').modal('show');
			}
		}); //fin ajax

	}

	function showLvl2_2(id, idProv, idService){
		$('.collapse').collapse('hide');
		$('#collapse'+id).collapse('show');

		var lvl2_2 = {
			idProv: idProv,
			idService: idService
		}
		$.ajax({
			url:'routes/routeSeguimiento.php',
			type:'post',
			async: true,
			data: {info: lvl2_2, action: 'showLvl2_2'},
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
					toast1("Atencion!", "No hay datos para mostrar", 8000, "error");
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
			showMap(idProvTodos, idServiceTodos, 'map', 'lvl3_todos');
		}else{
			toast1("Atencion!", "Despliegue un supervisor para mostrar sus dispositivos.", 8000, "error");
		}
	}
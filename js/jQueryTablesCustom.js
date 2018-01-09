
function jQueryTable(id_container, headers, data, LimitRow, maxHeight, NameFunc, Ver) {

	var thead = '<tr id="cabecera">';

	for (var i = 0; i < headers.length; i++){
		thead += '<th>'+headers[i]+'</th>';
	}
	thead += '</tr>';

	$('#thead').empty();
	$('#thead').append(thead);

	var tbody = "";
	var indices = data[0].length;

	for (var i = 0; i < data.length; i++) {
		tbody += '<tr data-toggle="tooltip" title="" id="row_'+data[i][0]+'">'
		for (var j = 0; j < indices; j++) {
			if(j == (indices-1))
				if(data[i][j] == "Activo")
					tbody += '<td><button type="button" class="btn btn-success btn-xs">&nbsp&nbsp&nbsp'+data[i][j]+'&nbsp&nbsp&nbsp</button></td>';
				else
					tbody += '<td><button type="button" class="btn btn-danger btn-xs">&nbsp&nbsp&nbsp'+data[i][j]+'&nbsp&nbsp&nbsp</button></td>';
			else
				tbody += '<td>'+data[i][j]+'</td>';
		}

		if(data[i][data[i].length-1] == "Activo"){
			tbody += '<td>'+
						'<a href="#" onclick="edit'+NameFunc+'('+data[i][0]+')" class="btn btn-info btn-xs">'+
							'<i class="fa fa-pencil"></i> Editar '+
						'</a>'+
						'<a href="#" onclick="delete'+NameFunc+'('+data[i][0]+')" class="btn btn-danger btn-xs">'+
							'<i class="fa fa-trash-o"></i> Desactivar '+
						'</a>'+
						'<a href="#" onclick="ver'+Ver+'('+data[i][0]+')" class="btn btn-warning btn-xs">'+
							'<i class="fa fa-bars"></i> '+Ver+' '+
						'</a>'+
					'</td>';
		}else{
			tbody += '<td>'+
						'<a href="#" onclick="reactiva'+NameFunc+'('+data[i][0]+')" class="btn btn-success btn-xs">'+
							'<i class="fa fa-recycle"></i> Reactivar '+
						'</a>' +
						'<a href="#" onclick="eliminar'+NameFunc+'('+data[i][0]+')" class="btn btn-warning btn-xs">'+
							'<i class="fa fa-trash-o"></i> Eliminar '+NameFunc +
						'</a>'+
					 '</td>';
			/*if(NameFunc === "Cliente"){
				tbody += '<a href="#" onclick="eliminar'+NameFunc+'('+data[i][0]+')" class="btn btn-warning btn-xs">'+
								'<i class="fa fa-trash-o"></i> Eliminar Cliente '+
							'</a>'+
						 '</td>';
			}*/
		}


		tbody += '</tr>';

		if(i == LimitRow){
			$('#'+id_container).css({
	            "overflow-y":"scroll",
	            "max-height":maxHeight
	        });
        }
	}
	$('#tbody').empty();
	$('#tbody').append(tbody);

}

function jQueryTableTrabajos(id_container, headers, data, LimitRow, maxHeight, NameFunc, Ver) {

	var nivel = Ver.split('Lvl')[1];
	nivel = parseInt(nivel)-1;

	var thead = '<tr id="cabecera">';

	for (var i = 0; i < headers.length; i++){
		if(i === 4)
			thead += '<th align="center">'+headers[i]+'</th>';
		else
			thead += '<th>'+headers[i]+'</th>';
	}
	thead += '</tr>';

	$('#thead'+nivel).empty();
	$('#thead'+nivel).append(thead);
console.log(data)
	var tbody = "";
	var indices = data[0].length;
	for (var i = 0; i < data.length; i++) {
		tbody += '<tr data-toggle="tooltip" title="" id="row_'+data[i][0]+'">';
		for (var j = 0; j < indices; j++) {
			if(j == (indices-1)){
				if(data[i][j] == "1"){
					tbody += '<td><button name="ejemplo" class="btn btn-xs altaCompleta" onclick="opcSeguimiento('+data[i][0]+', ' + data[i][j] + ')">&nbsp&nbspAlta Completa&nbsp&nbsp</button></td>';
				}else if(data[i][j] == "2"){
					tbody += '<td><span class="label altaIncompleta status">&nbsp&nbspAlta Incompleta&nbsp&nbsp</span></td>';
				}else if(data[i][j] == "3"){
					tbody += '<td><button class="btn btn-xs btn-danger" onclick="opcSeguimiento('+data[i][0]+', ' + data[i][j] + ')">&nbsp&nbspSeguimiento&nbsp&nbsp</button></td>';
				}else if(data[i][j] == "4"){
					tbody += '<td><button name="ejemplo" class="btn btn-xs seguimientoCompl" onclick="opcSeguimiento('+data[i][0]+', ' + data[i][j] + ')">Seguimiento completo</button></td>';
				}else if(data[i][j] == "5"){
					tbody += '<td><button class="btn btn-xs enviarMail" onclick="mailTrabajo('+data[i][0]+', '+data[i][j]+')">&nbsp&nbsp<span class="fa fa-envelope"></span>&nbspEnviar Mail&nbsp</button></td>';
				}else if(parseInt(data[i][j]) > 5 && parseInt(data[i][j]) < 12){
					tbody += '<td><button class="btn btn-xs envioCompleto" onclick="mailTrabajo('+data[i][0]+', '+data[i][j]+')">&nbsp&nbsp<span class="fa fa-envelope"></span>&nbspEnvio Completo&nbsp</button></td>';
				}else if(data[i][j] === '12'){
					tbody += '<td><button class="btn btn-xs trabajoIniciado" onclick="verEstadistica('+data[i][0]+')"><span class="fa fa-area-chart"></span>&nbsp;Trabajo Iniciado</button></td>';
				}else if(data[i][j] === '13'){
					tbody += '<td><button class="btn btn-xs trabajoTerminado">&nbsp&nbspTrabajo Terminado&nbsp</button></td>';
				}
			}else if(j !== 2 && j !== 5){
				if(j === 6){
					tbody += '<td name="vigencia" id="periodo_'+data[i][0]+'">'+data[i][j]+' -a- '+data[i][j+1]+'</td>';
					j = j + 1;
				}else if(j === 1){
					tbody += '<td id="nombreClt_'+data[i][0]+'" style="cursor: pointer;" data-toggle="tooltip" data-container="body" data-placement="top" title="'+data[i][2]+'">'+data[i][j]+'</td>';
				}else if(j === 3){
					tbody += '<td id="tipoTrab_'+data[i][0]+'">'+data[i][j]+'</td>';
				}else if(j === 8){
					tbody += '<td id="clt_'+data[i][0]+'">'+data[i][j]+'</td>';
				}else{
					tbody += '<td>'+data[i][j]+'</td>';
				}
			}
		}

		
		tbody += '<td>';

		if(nivel == 1){
			tbody += '<button onclick="llamarEditarTrabajo('+"'EDITAR'"+','+data[i][0]+')" class="btn btn-info btn-xs">'+
						'<i class="fa fa-pencil"></i> Editar '+
					 '</button>';
		}

		tbody += '<button onclick="ver'+Ver+'('+data[i][0]+')" class="btn btn-default btn-xs">'+
					'<i class="fa fa-eye"></i> Ver detalle '+
				 '</button>';

		tbody += '<button onclick="eliminarTrabajo('+data[i][0]+')" class="btn btn-warning btn-xs">'+
					'<i class="fa fa-trash-o"></i> Dar de baja'+
				 '</button>';
		
		tbody += '</td></tr>';

		if(i == LimitRow){
			$('#'+id_container).css({
	            "overflow-y":"scroll",
	            "max-height":maxHeight
	        });
        }
	}
	$('#tbody'+nivel).empty();
	$('#tbody'+nivel).append(tbody);

	$('td[data-toggle="tooltip"]').tooltip();
}

function jQueryTableCustom(id_container, headers, data, LimitRow, maxHeight, NameFunc) {

	var thead = '<tr id="cabecera">';

	for (var i = 0; i < headers.length; i++){
		thead += '<th>'+headers[i]+'</th>';
	}
	thead += '</tr>';

	$('#theadZ').empty();
	$('#theadZ').append(thead);

	var tbody = "";
	var indices = data[0].length;

	for (var i = 0; i < data.length; i++) {
		
		tbody += '<tr data-toggle="tooltip" title="" id="row_'+data[i][0]+'">';
		
		for (var j = 0; j < indices; j++){
			tbody += '<td>'+data[i][j]+'</td>';
		}
		

		tbody += '<td>'+
					'<a href="#" onclick="edit'+NameFunc+'('+data[i][0]+')" class="btn btn-info btn-xs">'+
						'<i class="fa fa-pencil"></i> Editar '+
					'</a>'+
					'<a href="#" onclick="delete'+NameFunc+'('+data[i][0]+')" class="btn btn-danger btn-xs">'+
						'<i class="fa fa-trash-o"></i> Eliminar '+
					'</a>'+
				 '</td>';


		tbody += '</tr>';

		if(i == LimitRow){
			$('#'+id_container).css({
	            "overflow-y":"scroll",
	            "max-height":maxHeight
	        });
        }
	}
	$('#tbodyZ').empty();
	$('#tbodyZ').append(tbody);

}


function jQueryTableCustom2(id_container, headers, data, LimitRow, maxHeight, NameFunc) {

	var thead = '<tr id="cabecera">';

	for (var i = 0; i < headers.length; i++){
		thead += '<th>'+headers[i]+'</th>';
	}
	thead += '</tr>';

	$('#theadB').empty();
	$('#theadB').append(thead);

	var tbody = "";
	var indices = data[0].length;

	for (var i = 0; i < data.length; i++) {
		
		tbody += '<tr data-toggle="tooltip" title="" id="row_'+data[i][0]+'">';
		
		for (var j = 0; j < indices; j++){
			if(j === 1)
				tbody += '<td id="bloque_'+data[i][0]+'">'+data[i][j]+'</td>';
			else
				tbody += '<td>'+data[i][j]+'</td>';
		}
		

		tbody += '<td>'+
					'<a href="#" onclick="edit'+NameFunc+'('+data[i][0]+')" class="btn btn-info btn-xs">'+
						'<i class="fa fa-pencil"></i> Editar '+
					'</a>'+
					'<a href="#" onclick="mostrarSucursales('+data[i][0]+', false)" class="btn btn-default btn-xs">'+
						'<i class="fa fa-search"></i> Sucursales '+
					'</a>'+
					'<a href="#" onclick="nuevaSucursal('+data[i][0]+')" class="btn btn-success btn-xs">'+
						'<i class="fa fa-pencil-square-o"></i> Agr. Sucursal '+
					'</a>'+
					'<a href="#" onclick="delete'+NameFunc+'('+data[i][0]+')" class="btn btn-danger btn-xs">'+
						'<i class="fa fa-trash-o"></i> Eliminar '+
					'</a>'+
				 '</td>';


		tbody += '</tr>';

		if(i == LimitRow){
			$('#'+id_container).css({
	            "overflow-y":"scroll",
	            "max-height":maxHeight
	        });
        }
	}
	$('#tbodyB').empty();
	$('#tbodyB').append(tbody);

}

function jQueryTableCustom3(id_container, headers, data, LimitRow, maxHeight, NameFunc) {
	var thead = '<tr id="cabecera">';
	for (var i = 0; i < headers.length; i++){
		thead += '<th>'+headers[i]+'</th>';
	}
	thead += '</tr>';

	$('#theadS').empty();
	$('#theadS').append(thead);

	var tbody = "";
	var indices = data[0].length;

	for (var i = 0; i < data.length; i++) {
		
		tbody += '<tr data-toggle="tooltip" title="" id="row_'+data[i][0]+'">';
		
		for (var j = 0; j < indices; j++){
			tbody += '<td>'+data[i][j]+'</td>';
		}
		

		tbody += '<td>'+
					'<a href="#" onclick="editarSucursal('+data[i][0]+')" class="btn btn-info btn-xs">'+
						'<i class="fa fa-pencil"></i> Editar '+
					'</a>'+
					'<a href="#" onclick="eliminarSucursal('+data[i][0]+')" class="btn btn-danger btn-xs">'+
						'<i class="fa fa-trash-o"></i> Eliminar '+
					'</a>'+
				 '</td>';


		tbody += '</tr>';

		if(i == LimitRow){
			$('#'+id_container).css({
	            "overflow-y":"scroll",
	            "max-height":maxHeight
	        });
        }
	}
	$('#tbodyS').empty();
	$('#tbodyS').append(tbody);

}
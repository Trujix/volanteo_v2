

function jQueryTable(id_container, headers, data, LimitRow, maxHeight) {

	var thead = '<tr id="cabecera">';

	for (var i = 0; i < headers.length; i++){
		thead += '<th>'+headers[i]+'</th>'
	}
	

	$('#thead').empty()
	$('#thead').append(thead)

	var tbody = "";
	var indices = data[0].length;

	for (var i = 0; i < data.length; i++) {
		tbody += '<tr>'
		
		for (var j = 0; j < indices-1; j++) {
		
			tbody += '<td>'+data[i][j]+'</td>'
			
			if (j==1) {
				tbody += '<td> <a> Detalle </a>  </td>'	
				tbody += '<td><a href="mailto:'+data[i][2]+'">'+data[i][2]+'</a>  </td>'	
			}	

		}
	
		if(i == LimitRow){
			$('#'+id_container).css({
	            "overflow-y":"scroll",
	            "max-height":maxHeight
	        });
		}
	}

	$('#tbody').empty()
	$('#tbody').append(tbody)

}

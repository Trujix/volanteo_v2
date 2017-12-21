// ===============  EVENTOS PARA MODULO DE CREDITOS ===========================================
// ================================================================================================
	$('document').ready(function(){
		$('#select_ac_in').val(2)
		load_tabla()
	})


	$(document).on('change', '#select_ac_in', function(){
		load_tabla()
	})

	function load_tabla(){
		var option = $('#select_ac_in').val()

		$.ajax({
			url:'server/getCreditos.php',
			type:'post',
			data: {option: option},
			dataType:'json',
			success: function(data){
				console.log(data)
				if(data != ""){
					var headers = ["Cliente", "Monto", "Fecha", "Abono", "Status"]
					jQueryTableNormal("tableContainer", headers, data, 8, "505px")
				  	//jQueryTable(id_container, headers, data, LimitRow, maxHeight)
			  	}
			  	else{
					$('tbody').empty()
					toast1("Atencion!", "No hay adeudos para mostrar", 4000, "error")
				}
			}
		}); //fin ajax

	}
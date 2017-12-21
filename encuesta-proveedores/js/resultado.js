$(document).ready(function(){
	cargar_info();
});



function cargar_info(){
	$.ajax({
		url: 'rutas/resultado.php',
		type:'POST',
		async: false,
		data: {action: "select"},
		dataType:'JSON',
		beforeSend: function(){
		},
		error: function(error){
		console.log(error);
			//console.log(error);
		},
		success: function(data){


			if(data != ""){
				var headers = [
					"Empresa", "Puntos", "Detalle", "Contacto"
				];
				jQueryTable("tableContainer", headers, data, 8, "480px");

			}
			
		}
	});

};

$(document).ready(function(){
	cargar_info();
});


function cargar_info(){
	$.ajax({
		url: 'routes/routeEncuestas.php',
		type:'POST',
		async: false,
		data: {action: "read"},
		dataType:'JSON',
		beforeSend: function(){
			showSpinner();
		},
		error: function(error){
			console.log(error);
			removeSpinner();
		},
		success: function(data){
			removeSpinner();

			if(data != ""){
				var headers = ["Empresa", "Puntos", "Detalle", "Contacto"];
				jQueryTableEncuesta("tableContainer", headers, data, 8, "480px");

			}
			
		}
	});

};

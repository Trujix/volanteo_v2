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

function cargar_detalles(id){
    $.ajax({
        type: "POST",
        url: "routes/routeEncuestas.php",
        data: {action: "cargar_respuestas",info: id},
        dataType: "json",
        success: function (data) {
            console.log(data);
            $('#p1').val(data[0].respuesta);
            $('#p2').val(data[1].respuesta);
            $('#p3').val(data[2].respuesta);
            $('#p4').val(data[3].respuesta);
            $('#p5').val(data[4].respuesta);
            $('#p6').val(data[5].respuesta);
            $('#p7').val(data[6].respuesta);
            $('#p8').val(data[7].respuesta);
            $('#p9').val(data[8].respuesta);
            $('#p10').val(data[9].respuesta);
            $('#p11').val(data[10].respuesta);
            $('#p12').val(data[11].respuesta);
            $('#p13').val(data[12].respuesta);
        },
        error: function (data) {
        	console.log(data);
            alert("Error");
        }
    });
}
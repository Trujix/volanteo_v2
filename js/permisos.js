// FUNCION GLOBAL QUE TRAE EL PERMISO
function obtenerPermiso(clave, callback){
	$.ajax({
		url:'routes/routeConfiguracion.php',
		type:'post',
		data: {info: clave, action: 'verifUsuarioPermiso'},
		error: function(error){
			console.log(error);
		},
		success: function(data){
			if(parseInt(data) === 1)
				callback(true);
			else{
				callback(false);
				toast1("Atención!", "No tienes permiso para realizar la acción", 8000, "error");
			}
		}
	});
}

/* -------------  EJEMPLO DE COMO USARLO --------------------

		obtenerPermiso("CLI01", function(si){
			if(si){
				REALIZAR LOS PROCEDIMIENTOS
			}
		});

---------------------- **** ---------------------------------- */
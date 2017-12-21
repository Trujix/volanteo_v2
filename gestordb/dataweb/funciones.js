// FUNCIONES GENERALES
$(document).on('click', '#probrarCon', function(){
	ejecutarSQL('probarConn');
});

$(document).on('click', '#ejecutarSql', function(){
	ejecutarSQL('ejecutarSQLSPS');
});

$(document).on('click', '#consultaSQL', function(){
	ejecutarSQL('consultaSQL');
});

$(document).on('click', '#limpiarlog', function(){
	$('#log').html('');
});

// EJECUCION DE SQL QUERY
function ejecutarSQL(accion){
	sqlJson = {
		db: $('#dbname').val(),
		user: $('#dbuser').val(),
		pass: $('#dbpass').val(),
		server: $('#dbserver').val()
	};
	var sqlQuery = $('#sqlQuery').val();
	$.ajax({
		url:'server.php',
		type:'POST',
		data: {info: sqlJson, accion: accion, sql: sqlQuery},
		dataType:'JSON',
		error: function(error){
			$('#log').append('<p>' + error.responseText + '</p>');
			console.log(error);
		},
		success: function(data){
			$('#log').append('<p>' + data.responseText + '</p>');
			console.log(data);
		}
	});
}
// FIN FUNCIONES GENEERALES
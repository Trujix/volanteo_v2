// FUNCION SELECCIONAR EL USUARIO
$(document).on('change', '#tipoUser', function (){
	var opciones = '<option value="-1">- Seleccione usuario -</option>';
	$('#nomUser').html('');
	$('#nomUser').append(opciones);
	if($(this).val() !== "-1"){
		var userData = {
			tabla: $(this).val(),
			campo1: $('#tipoUser option:selected').attr("cuno"),
			campo2: $('#tipoUser option:selected').attr("cdos")
		};
		$.ajax({
			url:'routes/routeConfiguracion.php',
			type:'post',
			async: true,
			data: {info: userData, action: 'traerUsers'},
			dataType:'JSON',
			beforeSend: function(){
				showSpinner();
			},
			error: function(error){
				console.log(error);
				toast1("Error!", "Ocurrio un error inesperado", 8000, "error");
				removeSpinner();
			},
			success: function(data){
				removeSpinner();
				opciones = "";
				$.each(data, function (key, value){
					opciones += '<option value="' + value.id + '">' + value.user + '</option>';
				});
				$('#nomUser').append(opciones);
			}
		});
	}
});

// FUNCION QUE TRAER EL CORREO DEL USUARIO
var correoUser = "";
$(document).on('change', '#nomUser', function (){
	if($(this).val() !== "-1"){
		var userData = {
			id: $(this).val(),
			campo1: $('#tipoUser option:selected').attr("cdos"),
			tabla: $('#tipoUser').val()
		};
		$.ajax({
			url:'routes/routeConfiguracion.php',
			type:'post',
			async: true,
			data: {info: userData, action: 'traerMail'},
			dataType:'JSON',
			beforeSend: function(){
				showSpinner();
			},
			error: function(error){
				console.log(error);
				toast1("Error!", "Ocurrio un error inesperado", 8000, "error");
				removeSpinner();
			},
			success: function(data){
				removeSpinner();
				correoUser = data[0]['ctacorreo'];
			}
		});
	}
});

// FUNCION QUE RESTABLECE EL CORREO DEL USUARIO
$(document).on('click', '#passUser', function (){
	if($('#tipoUser').val() === "-1"){
		$('#tipoUser').addClass(' invalid');
		toast1("Error", "Seleccione tipo usuario...", 5000, "error");
	}else if($('#nomUser').val() === "-1"){
		toast1("Error", "Seleccione nombre usuario...", 5000, "error");
		$('#nomUser').addClass(' invalid');
	}else{
		var userData = {
			id: $('#nomUser').val(),
			mail: correoUser,
			tabla: $('#tipoUser').val(),
			nombre: $('#nomUser option:selected').text()
		};
		$.ajax({
			url:'routes/routeConfiguracion.php',
			type:'post',
			async: true,
			data: {info: userData, action: 'resetUserPass'},
			dataType:'JSON',
			beforeSend: function(){
				showSpinner();
			},
			error: function(error){
				console.log(error);
				toast1("Error!", "Ocurrio un error inesperado", 8000, "error");
				removeSpinner();
			},
			success: function(data){
				removeSpinner();
				if(data === "EXITO"){
					toast1("Exito!", "Se le ha enviado la nueva contraseña al correo del usuario...", 8000, "success");
				}else{
					toast1("Error!", "Ocurrio un error inesperado", 8000, "error");
				}
			}
		});
	}
});


// FUNCION DE GUARDADO DE NUEVA CONTRASEÑA
$(document).on('click', '#guardarPass', function(){
	if($('#txtAntPass').val() === ""){
		$('#txtAntPass').addClass(' invalid');
		toast1("Error", "Coloque la antigua contraseña.", 5000, "error");
	}else if($('#txtNewPass').val() === ""){
		$('#txtNewPass').addClass(' invalid');
		toast1("Error", "Coloque la nueva contraseña.", 5000, "error");
	}else if($('#txtNewPass').val().length < 5){
		$('#txtNewPass').addClass(' invalid');
		toast1("Error", "La contraseña debe ser un minimo de 5 caracteres", 7000, "error");
	}else if($('#txtNewPass2').val() === ""){
		$('#txtNewPass2').addClass(' invalid');
		toast1("Error", "Coloque otra vez la contraseña", 5000, "error");
	}else if($('#txtNewPass').val() != $('#txtNewPass2').val()){
		$('#txtNewPass').addClass(' invalid');
		$('#txtNewPass2').addClass(' invalid');
		toast1("Error", "Las contraseñas no son iguales", 5000, "error");
	}else{
		var passData = {
			antPass: $('#txtAntPass').val(),
			newPass: $('#txtNewPass').val()
		};
		$.ajax({
			url:'routes/routeConfiguracion.php',
			type:'post',
			async: true,
			data: {info: passData, action: 'resetUserAdm'},
			dataType:'JSON',
			beforeSend: function(){
				showSpinner();
			},
			error: function(error){
				console.log(error);
				toast1("Error!", "Error inesperado", 8000, "error");
				removeSpinner();
			},
			success: function(data){
				removeSpinner();
				console.log(data);
				if(data === 'ERRANTPASS'){
					$('#txtAntPass').addClass(' invalid');
					toast1("Error", "LA ANTIGUA CONTRASEÑA ES INCORRECTA", 6000, "error");
				}else if(data === 'EXITO'){
					toast1("Exito", "Su contraseña ha sido actualizada...", 6000, "success");
					$('#txtAntPass').removeClass('fa fa-eye-slash');
					$('#txtNewPass').removeClass('fa fa-eye-slash');
					$('#txtNewPass2').removeClass('fa fa-eye-slash');

					$('#txtAntPass').val('');
					$('#txtNewPass').val('');
					$('#txtNewPass2').val('');
				}else{
					toast1("Error!", "Error al actualizar la contraseña...", 8000, "error");
				}
			}
		});
	}
});
// QUITAMOS EL COLOR ROJO AL INPUT TEXT PASSWORDS
$(document).on('click', '.pass', function(){
	$(this).removeClass('invalid');
});

// QUITAMOS EL COLOR ROJO AL SELECT PASSWORDS
$(document).on('click', '.user', function(){
	$(this).removeClass('invalid');
});

// FUNCION MOSTRAR PASSWORDS
$(document).on('click', '.ver', function (){
	var id = $(this).attr("idtxt");
	var estado = $('#'+id).attr('type');
	if(estado === 'password'){
		$('#'+id).attr('type', 'text');
		$('#'+id+'_sp').removeClass('fa fa-eye');
		$('#'+id+'_sp').addClass('fa fa-eye-slash');
	}else if(estado === 'text'){
		$('#'+id).attr('type', 'password');
		$('#'+id+'_sp').removeClass('fa fa-eye-slash');
		$('#'+id+'_sp').addClass('fa fa-eye');
	}
	$('#'+id).focus();
});
// CARGANDO LA PAGINA DE INICIO
$(function(){
	$.ajax({
		url:'routes/routeConfiguracion.php',
		type:'post',
		data: {action: 'verifUsuario'},
		dataType:'JSON',
		beforeSend: function(){
			showSpinner();
		},
		error: function(error){
			console.log(error);
			toast1("Error!", "Ocurrio un error al cargar pagina", 8000, "error");
			removeSpinner();
		},
		success: function(data){
			removeSpinner();
			if(data === "Administrador"){
				$('#adminUsuariosDiv').show();
				$('#passUsuariosDiv').show();
				$('#adminUsuariosHR').show();
			}
		}
	});
});
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


// :::::::::::::::::::::::::::::::::::::::::::::::::::::
// ********************* USUARIOS **********************
// :::::::::::::::::::::::::::::::::::::::::::::::::::::

// ------------------------- BOTONES ------------------------------
// *************** BOTON QUE ABRE MODAL NUEVO USUARIO *************
$(document).on('click', '#btnNuevoUsuario', function(){
	$('#modalUsuarios').modal('show');

	$('#confUsuarioNombre').val('');
	$('#confUsuarioCorreo').val('');
});
// ************ BOTON QUE ABRE MODAL PERMISOS USUARIO ************
$(document).on('click', '#btnModifPermisos', function(){
	$('#modalUsersPermisos').modal('show');

	$('#usuarioSelectPermiso').html('');
	$('#usuarioCorreoPermiso').val('');

	$('#permisosUsuarioChecksDiv').hide();

	$.ajax({
		url:'routes/routeConfiguracion.php',
		type:'post',
		data: {action: 'traerUsuariosSistema'},
		dataType:'JSON',
		beforeSend: function(){
			showSpinner();
		},
		error: function(error){
			console.log(error);
			toast1("Error!", "Ocurrio un error al cargar usuarios", 8000, "error");
			removeSpinner();
		},
		success: function(data){
			removeSpinner();
			var options = '<option value="-1">- Seleccione el usuario -</option>';
			$(data["USUARIOS"]).each(function (key, value){
				options += '<option value="' + value.id + '">' + value.username + '</option>';
			});
			pintarChecksPermisos(data["CHECKS"]);
			$('#usuarioSelectPermiso').append(options);
		}
	});
});

// ******* BOTON QUE DA ALTA DE USUARIO *******
$(document).on('click', '#confAltaUsuario', function(){
	if($('#confUsuarioNombre').val() === ""){
		toast1("Error!", "Coloque el NOMBRE", 8000, "default");
		$('#confUsuarioNombre').focus();
	}else if($('#confUsuarioCorreo').val() === ""){
		toast1("Error!", "Es necesario un CORREO ELECTRONICO", 8000, "default");
		$('#confUsuarioCorreo').focus();
	}else if(!validarEmail($('#confUsuarioCorreo').val())){
		toast1("Error!", 'El formato del correo electronico capturado es incorrecto, intente nuevamente. Ej micorreo@midominio.com', 8000, "default");
		$('#confUsuarioCorreo').focus();
	}else if($('#confUsuarioNombre').val().toUpperCase() === "ADMINISTRADOR"){
		toast1("Error!", "Nombre de usuario invalido", 8000, "error");
		$('#confUsuarioNombre').focus();
	}else{
		var usuario = {
			nombre: $('#confUsuarioNombre').val(),
			correo: $('#confUsuarioCorreo').val()
		};
		PNotify.removeAll();
		$.confirm({
			title: 'Alta de usuario',
			content: '¿Desea guardar este usuario?',
			theme: 'light',
			confirm: function(){
				$.ajax({
					url:'routes/routeConfiguracion.php',
					type:'post',
					data: {info: usuario ,action: 'altaUsuario'},
					dataType:'json',
					beforeSend: function(){
						showSpinner();
					},
					error: function(error){
						console.log(error);
						removeSpinner();
					},
					success: function(data){
						console.log(data);
						if(data["INFO"] === "EXITO"){
							$('#confUsuarioNombre').val('');
							$('#confUsuarioCorreo').val('');
							if(data["MAIL"] !== "EXITO"){
								toast1("Atención!", "La información ha sido <b>almacenada correctamente</b>, pero al parecer hubo un error al enviar correo al usuario. Por favor, tome nota de la contraseña que el sistema creó para el\n\n<b>Contraseña: </b>" + data["MAIL"], 40000, "info");
							}else{
								toast1("Éxito!", "Usuario creado con éxito", 9000, "success");
							}
							$('#modalUsuarios').modal('hide');
						}else{
							toast1("Error!", "Hubo un error al guardar usuario", 9000, "error");
						}
						removeSpinner();
					}
				});
			},
			cancel: function(){}
		});
	}
});


// :::::::::::::::::::::::::::::::::::::::::::::::::::::
// ********************* PERMISOS **********************
// :::::::::::::::::::::::::::::::::::::::::::::::::::::

// ******** CARGAR DATOS AL SELECCIONAR USUARIO
$(document).on('change', '#usuarioSelectPermiso', function(){
	if(parseInt($(this).val()) > 0){
		$.ajax({
			url:'routes/routeConfiguracion.php',
			type:'post',
			data: {info: parseInt($(this).val()), action: 'traerUsuarioInfo'},
			dataType:'JSON',
			beforeSend: function(){
				showSpinner();
			},
			error: function(error){
				console.log(error);
				toast1("Error!", "Ocurrio un error al cargar usuarios", 8000, "error");
				removeSpinner();
			},
			success: function(data){
				removeSpinner();
				$('#usuarioCorreoPermiso').val(data["CORREO"]);
				$('#permisosUsuarioChecksDiv').show();

				if(data["CHECKS"].length > 0){
					$(data["CHECKS"]).each(function (key, value){
						var onOff = "off";
						if(parseInt(value.status) === 1)
							onOff = 'on';

						$('#' + value.permisoclave).bootstrapToggle(onOff);
					});
				}else{
					$('.permisos').each(function(){
						$(this).bootstrapToggle('off');
					});
				}
			}
		});
	}else{
		$('#usuarioCorreoPermiso').val('');
		$('#permisosUsuarioChecksDiv').hide();
	}
});

// ************ FUNCION QUE PINTA LOS CHECKS EN EL DIV DE PERMISOS DESDE LA BD ************
// FUNCION QUE TRAE LA LISTA DE MODULOS DEL SISTEMA
function traerListaModulos(callback){
	$.ajax({
		url:'routes/routeConfiguracion.php',
		type:'post',
		data: {action: 'traerListaModulos'},
		dataType:'JSON',
		error: function(error){
			console.log(error);
			callback(false);
		},
		success: function(data){
			var arr = [];
			$(data).each(function (key, value){
				arr.push(value.modulo);
			});
			callback(arr);
		}
	});
}
// FUNCION QUE PINTA LOS CHECKS UNA VES OBTENIDOS LOS MODULOS
function pintarChecksPermisos(json){
	traerListaModulos(function(arrModulos){
		var jsonChecks = {};
		for(i = 0; i < arrModulos.length; i++){
			jsonChecks[arrModulos[i]] = '<div class="panel panel-default"><div class="panel-heading"><h3 class="panel-title">' + cadConvertirOracion(arrModulos[i]) + '</h3></div><div class="panel-body">';
		}
		$(json).each(function (key, value){
			jsonChecks[value.modulo] += '<div class="col-md-3"><input class="permisos" id="' + value.clave + '" permiso="' + value.idpermiso + '" type="checkbox" data-toggle="toggle" data-on="Si" data-off="No" data-onstyle="success" data-offstyle="default" data-size="mini">&nbsp;' + value.nombre + '</div>';
		});

		$('#usuariosChecksDiv').html('');
		$.each(jsonChecks, function (key, value){
			jsonChecks[key] += '</div></div>';
			$('#usuariosChecksDiv').append(value);
		});

		$('#modalUsersPermisos').on('shown.bs.modal', function (e) {
	  		$('input[type="checkbox"]').each(function(){
	  			$(this).bootstrapToggle();
	  		});
		});
	});
}

// ************ BOTON QUE EDITA LOS PERMISOS DE USUARIO ********
$(document).on('click', '#editarUsuarioDatos', function(){
	if(parseInt($('#usuarioSelectPermiso').val()) > 0){
		var checks = [];
		$('.permisos').each(function(){
			var val = {
				idpermiso: $(this).attr("permiso"),
				permisoclave: $(this).attr("id"),
				status: $(this).prop("checked")
			};
			checks.push(val);
		});
		var usuario = {
			id: parseInt($('#usuarioSelectPermiso').val()),
			correo: $('#usuarioCorreoPermiso').val(),
			checks: checks
		};
		$.ajax({
			url:'routes/routeConfiguracion.php',
			type:'post',
			data: {info: usuario, action: 'editarPermisosUsuario'},
			dataType:'JSON',
			beforeSend: function(){
				showSpinner();
			},
			error: function(error){
				console.log(error);
				toast1("Error!", "Ocurrio un error al guardar información de usuario", 8000, "error");
				removeSpinner();
			},
			success: function(data){
				removeSpinner();
				if(data === "EXITO"){
					toast1("Éxito!", "información actualizada", 3000, "success");
				}else if(data === "ERRORPERMISOS"){
					toast1("Error!", "Ocurrio un error al guardar permisos", 8000, "error");
				}else if(data === "ERRORMAIL"){
					toast1("Error!", "Ocurrio un error al actualizar correo", 8000, "error");
				}
			}
		});
	}
});

// *********** FUNCIONES MISCELANEAS *******************
// FUNCION QUE CONVIERTE CADENA EN TIPO ORACION
function cadConvertirOracion(str){
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}
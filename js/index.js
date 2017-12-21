$(function(){
	// TRAER LOS CATALOGOS leerCatalogos(2);
	var param1 = leerCookie('alterego');
	var param2 = leerCookie('key');
	if(param1 !== undefined && param2 !== undefined){
		param1 = param1.replace('%40', '@');
		loginFuncion(param1, param2, 'cookie');
	}else{
		document.cookie = "alterego=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/";
		document.cookie = "key=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/";
	}
});

$(document).on('click', '#btn_login', function(event){
	event.preventDefault();

	if ($('#user').val() == "" || $('#pass').val() == "")
		toast1("Error!", "Debe llenar ambos campos antes de continuar", 4000, "error")
	else{
		loginFuncion($('#user').val(), $('#pass').val(), 'formulario');
	}
})

function loginFuncion(usuario, clave, accion){
	var info = {user: usuario, password: clave}
	$.ajax({
		url:'routes/routeUser.php',
		type:'post',
		data: {action: 'Login', info: info},
		dataType:'json',
		beforeSend: function(){
			$.dreamAlert({
				'type': 'loading',
				'message': 'Loading...',
				'position': 'center',
			});
		},
		error: function(error){
			toast1("Error!", "Ocurrió un error, intentelo mas tarde o pongase en contacto con el administrador", 4000, "error")
			// $.dreamAlert.close()
		},
		success: function(loggedIn){
			console.log(loggedIn);
			// $.dreamAlert.close()
			if(loggedIn === "false"){
				//Limpia el campo de texto de la contraseña
				$('#password').val("");
				//Carga el texto de la alerta
				toast1("Atención!", "Datos incorrectos, vuelve a intentarlo.", 4000, "warning");
				if(accion === 'cookie'){
					document.cookie = "alterego=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/";
					document.cookie = "key=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/";
				}
			}else if(loggedIn === "desactivado"){
				toast1("Atención!", "<b>Su cuenta ha sido desactivada. Consulte con el administrador.</b>", 7000, "info");
				if(accion === 'cookie'){
					document.cookie = "alterego=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/";
					document.cookie = "key=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/";
				}
			}else{
				if(loggedIn === "admin"){
					window.location = 'clientes.php';
				}else if(loggedIn === "proveedores"){
					window.location = 'trabajoProveedor.php';
				}else{
					window.location = 'formCliente.php';
				}
			}
		}
	}); //fin ajax
}
// PROPIEDADES DE CLIENTE
// LOGOFF
$(document).on('click', '#logoff', function(){
	document.cookie = "alterego=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/";
	document.cookie = "key=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/";
	location.reload();
});

function leerCookie(nombre){
  var value = "; " + document.cookie;
  var parts = value.split("; " + nombre + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}
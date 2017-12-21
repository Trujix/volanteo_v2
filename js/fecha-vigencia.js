
// ------------------ VARIABLES GLOBALES ---------------------
	var correoHeraldos = "admvolanteo@gmail.com";
// ------------------- FUNCION AUTOMATICA DE PRUEBA QUE PINTA EN LOG FECHA ------------
	var diasVigenciaLimit = 3;
	$(function(){
		// EJECUTAMOS DE PRIMERA MANO
		/*setTimeout(function(){
			verifVigencia();
		}, 500);
		setInterval(function(){
			// LO HACEMOS CADA CIERTO TIEMPO (EN ESTE CASO 5 MINUTOS)
			//verifVigencia();
			location.reload();
		}, 500000);*/
	});

// ----------------------------- FUNCION DE VERIFICACION DE VIGENCIA Y ENVIO DE ALERTAS ---
	var idsTabla = [];
	var envioAlerta;
	function verifVigencia(){
		obtenerFecha();
		var fechaInfo = {
			fecha: fechaDia,
			hora: horaDia
		};
		$.ajax({
			url:'routes/routeVigencia.php',
			type:'POST',
			data: {info: fechaInfo, action: 'statusDia'},
			dataType:'JSON',
			error: function(error){
				console.log(error);
			},
			success: function(data){
				console.log(data);
			}
		});
	}

// ------------------- CADENA ALEATORIA - FUNCION MISCELANEA ----------------------
	var cadAleatoria;
	function cadenaRandom(lng){
		cadAleatoria = "";
	    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	    for( var i=0; i < lng; i++ )
	        cadAleatoria += possible.charAt(Math.floor(Math.random() * possible.length));
	    return cadAleatoria;
	}
// ------------------- FUNCIONES AUXILIARES DE SUBSTRACCION DE FECHAS -------------
	var fechaDia;
	var horaDia;
	function obtenerFecha(){
		var dia = new Date().getDate();
		var mes = new Date().getMonth() + 1;
		var year = new Date().getFullYear();
		horaDia = new Date().getHours();
		fechaDia = dia + '/0' + mes + '/' + year;
	}

// ------------------- FUNCIONES AUXILIARES DE SUBSTRACCION DE FECHAS -------------
	var fechaTope;
	var diasRestantes;
	function vigenciaDiasFunc(dias, fechafin){
		//var ini = fechainicio.split('-');
		var fin = fechafin.split('-');

		//ini = ini[1]+'-'+ini[2]+'-'+ini[0];
		fin = fin[1]+'-'+fin[2]+'-'+fin[0];

		var d = new Date();
		var hoy = (parseInt(d.getMonth()) + 1)+'-'+d.getDate()+'-'+d.getFullYear();
		var dHoy = new Date(hoy);

		//var dIni = new Date(ini);
		var dFin = new Date(fin);
		diasRestantes = parseInt((parseInt(dFin.getTime()) - parseInt(dHoy.getTime())) / 86400000);
		
		// ENVIAMOS EL RESULTADO
		if(diasRestantes <= dias){
			fechaTope = true;
		}else{
			fechaTope = false;
		}
	}
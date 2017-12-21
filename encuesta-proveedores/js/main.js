

var error = "Ocurrió un error insesperado en el sitio, por favor intentelo mas tarde o pongase en contacto con su administrador.";


// =========== ALERTAS =============================================================================

	// https://github.com/scottoffen/jquery.toaster
	function toast2(tipo, titulo, msj, time){ //necesita el archivo jquery.toaster.js 
	    $.toaster({ 
	        priority : tipo, 
	        title : titulo, 
	        message : msj, 
	        settings:{
	            timeout: time,
	        }
	    });

	}

	// https://github.com/scottoffen/jquery.toaster
	var cont = 0;
	function toast(tipo, msj, time){ //necesita el archivo jquery.toaster.js 
		$('html, body').animate( { scrollTop : 0 }, 800 );

		if(cont != 0)
			$toaster.remove();

	    $.toaster({ 
	        priority : tipo, 
	        // title : titulo, 
	        message : msj, 
	        settings:{
	            timeout: time,
	            toaster:{
	            	id: 'toaster',
	        		container: 'body',
	            	template: '<div></div>',
		            class: 'toaster',
			        css: {
			        	'position' : 'fixed',
			            'top'      : '0px',
			            'right'    : '0px',
			            'width'    : '100%',
			            'zIndex'   : 50000
			        }
	            }
		            
	        }
	    });

	    cont++;

	}

	// https://sciactive.com/pnotify/
	function toast1(title, body, delay, type){
		new PNotify({
			title: title,
			text: body,
			delay: delay,
			type: type,
			mobile: {
				styling: false
			},
			animate: {
		        animate: true,
		        in_class: 'bounceInRight',
		        out_class: 'bounceInLeft'
		    },
		    mobile: {
		        styling: false
		    }
		});

	}

	//Necesita el script DreamAlert
	function customAlert(title, content){
		$.alert({
	        title: title,
	        content: content,
	        // theme: 'black',
	        animation: 'left',
	        closeAnimation: 'right',
	        icon: 'fa fa-warning',
	        keyboardEnabled: true,
	        confirm: function(){
	            // $.alert('Confirmed!'); // shorthand.
	        }
	    });

	}

// =========== VALIDACION DE CAMPOS ================================================================

	// validaCampoLength("txt_destino_viaje", 100)
	function validaCampoLength(idCampo, length){

		var contenido = "";
		$(document).on('keyup', '#'+idCampo, function(event){ 					
																			
			var caracteres = $(this).val();									
																			
			if (caracteres.length > length){			
				// toast1("Error!", "No se pueden agregar mas de "+length+" caracteres", 4000, "error");							
				//toast('danger','Error',"No se pueden agregar mas de "+length+" caracteres", 8000);	
				$(this).val(contenido);
			}else{								
				contenido = $(this).val();
			}																					
																																								
		});	

	}

	// validaOnlyNumbers("txt_cont_d_unid_edit")
	function validaOnlyNumbers(idCampo, length){

		var contenido = "";
		$(document).on('keyup', '#'+idCampo, function(event){ 					
																			
			var caracteres = $(this).val();									
																			
			if (caracteres.match(/[^1234567890]/g) ){
				// toast1("Error!", "Solo se admiten numeros", 4000, "error");	
				// toast2('danger','Error',"Solo se admiten numeros", 4000);
				
				$(this).val(contenido);
			}else{								
				contenido = $(this).val();
			}																					
																			
																								
		});	

	}

	// validaCampoNum("txt_numero_unid", 2147483647)
	function validaCampoNum(idCampo, val){

		var contenido = "";
		$(document).on('keyup', '#'+idCampo, function(event){ 					
																			
			var caracteres = $(this).val();									
																			
			if (caracteres > val){	
				// toast1("Error!", "No se puede ingresar un valor tan grande, intente con uno mas pequeño", 4000, "error");								
				toast('danger','Error',"No se puede ingresar un valor tan grande, intente con uno mas pequeño", 8000)	
				$(this).val(contenido);
			}else{								
				contenido = $(this).val();
			}																					
																																								
		});	

	}

	//

  function soloLetras(e){
       key = e.keyCode || e.which;
       tecla = String.fromCharCode(key).toLowerCase();
       letras = " áéíóúabcdefghijklmnñopqrstuvwxyz";
       especiales = "8-37-39-46";

       tecla_especial = false
       for(var i in especiales){
            if(key == especiales[i]){
                tecla_especial = true;
                break;
            }
        }

        if(letras.indexOf(tecla)==-1 && !tecla_especial){
            return false;
        }
    }
	//


// =========== OTRAS FUNCIONES =====================================================================
	function resetForm(id){
		$('#'+id).each (function(){
		  this.reset();
		});

	}

	function hoy(){
		var d = new Date();

		var month = d.getMonth()+1;
		var day = d.getDate();

		var output = (day<10 ? '0' : '') + day + '/' + (month<10 ? '0' : '') + month + '/' + d.getFullYear()

		return output;

	} 

	function redondeo(val, num){

		val = val.toString();
		val = val.split('.');
		
		if(val.length  > 1){
			val = val[0]+'.'+val[1].substring(0,num);
		}

		return val;

	}

// ================= Validacion de Email =============================================================

	var extenciones = [".aero", ".am", ".biz", ".cc", ".com", ".fm",
					   ".info", ".jobs", ".mobi", ".museum", ".name",
					   ".net", ".org", ".tel", ".tm", ".travel", ".tv",
					   ".ws",".edu",".web", ".com.ai", ".ai", ".aq", ".ag", 
					   ".com.ag", ".net.ag", ".org.ag", ".co.ag", ".com.an", 
					   ".com.ar", ".aw", ".com.bs", ".bs", ".com.bb", ".bb", 
					   ".bz", ".com.bz", ".net.bz", ".bo", ".com.bo", 
					   ".org.bo", ".net.bo", ".com.br", ".tv.br", ".net.br", 
					   ".org.br", ".ca", ".cl", ".com.co", ".net.co", ".nom.co", 
					   ".co", ".co.cr", ".cr", ".cu", ".com.cu", ".dm", ".ec", 
					   ".com.ec", ".info.ec", ".net.ec", ".fm.ec", ".com.sv", 
					   ".us", ".gs", ".gd", ".com.gp", ".gp", ".gy", ".ht", 
					   ".com.ht", ".net.ht", ".hn", ".com.hn", ".net.hn", ".tc", 
					   ".vg", ".com.vi", ".co.vi", ".com.jm", ".mx", ".com.mx", 
					   ".org.mx", ".ms", ".com.ni", ".co.ni", ".info.ni", 
					   ".web.ni", ".com.pa", ".com.py", ".net.py", ".edu.py", 
					   ".pe", ".com.pe", ".net.pe", ".pr", ".com.pr", ".net.pr", 
					   ".org.pr", ".biz.pr", ".info.pr", ".isla.pr", ".com.do", 
					   ".do", ".kn", ".lc", ".com.lc", ".co.lc", ".vc", ".com.vc", 
					   ".sr", ".tt", ".com.tt", ".co.tt", ".com.uy", ".net.uy", 
					   ".org.uy", ".com.ve", ".co.ve", ".info.ve", ".net.ve", 
					   ".org.ve", ".web.ve"]

	function validarEmail(email){

		var ext = "";
		var patronArroba = /[@]/;
		var patronPunto = /[.]/;
		var resultado = false;

		if (patronArroba.test(email)) { //reviso que exista una @

			var emailCompleto = email.split("@"); //divido donde halla una @

			// emailCompleto -> array(email, dominio);
			
			if (patronPunto.test(emailCompleto[1])) { //reviso que exista un punto dentro del dominio completo del email

				dominio = emailCompleto[1].split("."); //divido donde este el punto

				for (var i = 1; i < dominio.length; i++) { //recorro el array del dominio pero leyendo
															//solo apartir de la posision 1 (osea desde l extencion)
					ext = ext+"."+dominio[i]; //aplico los puntos correspondientes a la extencion
				};

				for (var i = 0; i < extenciones.length; i++) {
					if (extenciones[i] == ext) { //compruebo que la extencion sea valida comparandola con mi array de extenciones
						resultado = true;
					}
				}

			}		
			
		}

		return resultado;
	//http://www.webusable.com/ExtensionsTable.htms

	}

// =========== ESTA EN DESARROLLO AÚN ==============================================================
	function msgClose(id){
		$('#'+id).slideUp();
	}

	function msgAlert(id, tipo, texto){
		$('#'+id).slideUp();

		$('#'+id).html('');
		$('#'+id).attr({
			"hidden": true,
			"class": "alert alert-"+tipo
		});
		$('#'+id).html('<button type="button" class="close" aria-label="Close" onclick="msgClose(\'' + id + '\')"><span aria-hidden="true">&times;</span></button>'+texto);

		$('html, body').animate( { scrollTop : 0 }, 800 );
		$('#'+id).slideDown(function(){
			// setInterval(function(){ msgClose(id)}, 8000);
		});

		// var myVar = setInterval(function(){ msgClose(id)}, 8000);
		// clearInterval(myVar);

	}


$(document).on('click', '#logout', function(e){
	e.preventDefault();

	$.confirm({
        title: 'Atencion!',
        content: '¿Esta seguro que desea cerrar sesión?',
        confirm: function(){

        	$.ajax({
				url:'routes/routeUsuario.php',
				type:'POST',
				data:{action: 'logout'},
				dataType:'JSON',
				beforeSend: function(){
					showSpinner();
				},
				error: function(error){
					console.log(error)
					toast('danger',error, 8000);	
					removeSpinner();
				},
				success: function(data){
					// console.log(data);
					removeSpinner();

					if(data == true){
						window.location = "index.php";
					}
					else{
						toast('danger',error, 8000);
					}
				}
			});

		},
        cancel: function(){
            // console.log('false');
        }
    });

			
});

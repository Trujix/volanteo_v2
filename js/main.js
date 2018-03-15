function serializeForm(idForm){
	var form = $('#'+idForm)[0];
	var action = form[0].value;
	var info = '[{';

	for(var i = 1; i < form.length; i++){
		var key = form[i].name;
		info += '"'+key+'":"'+form[i].value+'",';
	}

	info = info.substring(0, info.length-1);
	info += '}]';

	return {'info': info, 'action': action};

}

function capitalize(str) {
	return str.replace(/^(.)|\s(.)/g, function($1){ 
		return $1.toUpperCase( ); 
	});

}

function toast(type, msg, time, position){

	$.dreamAlert({
	  'base_path' :   'source/',
	  'type'      :   type,
	  'message'   :   msg,
	  'summary'   :   '',
	  'icon'      :   '',
	  'position'  :   position, // or center
	  'message_id':   1,
	  'duration'  :   time,
	  'id'        :   0
	});

}

function toastLoader(){
	new PNotify({
        text: "Please Wait",
        type: 'info',
        icon: 'fa fa-spinner fa-spin',
        hide: false,
        buttons: {
            closer: false,
            sticker: false
        },
        opacity: .75,
        shadow: false,
        width: "170px"
    });

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
	        in_class: 'zoomInLeft',
	        out_class: 'hinge'
	    },
	    mobile: {
	        styling: false
	    }
	});

}

var cantAgregar = 0;
function toastPreg(titulo, cant, idchosen, idtxt, txtTotal, arrIndex, selValue, tipo){
	var cantTxt = '';
	var sizeDiv = '';
	var divHrsMins = '';
	if(tipo === 'Perifoneo'){
		cantTxt = cant + ' mins. - ' + (parseFloat(cant)/60).toString() + ' hrs.';
		sizeDiv = '9';
		divHrsMins = '<div class="col-md-3"><select class="formatoProvPaso3 form-control"><option value="1">Min</option><option value="2">Hrs</option></select></div>';
	}else{
		cantTxt = cant;
		sizeDiv = '12';
	}

	contenido = '<div class="panel panel-default"><div class="panel-body"><h5>Cantidad limite: ' + cantTxt + '</h5><div class="row"><div class="col-md-' + sizeDiv + '"><input type="text" class="cantProvPaso3 form-control" autofocus></div>' + divHrsMins + '</div><p></p><div class="row"><div class="col-md-6" align="left"><button class="btn btn-sm btn-info" onclick="internalFuncAgrgCantMun(' + "'" + titulo + "','" + cant + "','" + idchosen + "','" +  idtxt + "','" +  txtTotal + "','" +  arrIndex + "','" + selValue + "','" + tipo + "'" + ')">Agregar cantidad</button></div><div class="col-md-6" align="right"><button class="btn btn-danger" onclick="cancelarAgrgCantMun(' + "'" + idchosen + "','" + idtxt + "'" + ')">Cancelar</button></div></div></div>';
	new PNotify({
	    title: 'Agregar a ' + titulo,
	    text: contenido,
	    hide: false,
	    width: '450px',
	    addclass: 'stack-modal',
        stack: {'dir1': 'down', 'dir2': 'right', 'modal': true},
        buttons: {
	    	closer: false,
	        sticker: false,
	        cancel: false,
	    },
	    history: {
	        history: false
	    }
	});
	setTimeout(function(){
		$('.cantProvPaso3').focus();
	}, 500);

		/*(new PNotify({
	    title: 'Agregar a ' + titulo,
	    text: 'Cantidad limite: ' + cantTxt,
	    icon: 'glyphicon glyphicon-question-sign',
	    type: 'warning',
	    hide: false,
	    confirm: {
	        prompt: true,
	        buttons: [{
	        	text: 'Agregar'
	        }]
	    },
	    buttons: {
	    	closer: false,
	        sticker: false,
	        cancel: false,
	    },
	    history: {
	        history: false
	    },
	    addclass: 'stack-modal',
        stack: {'dir1': 'down', 'dir2': 'right', 'modal': true}
	})).get().on('pnotify.confirm', function(e, notice, val){
	    notice.cancelRemove().update({
	        delay: 1,
	        hide: true
	    });
	    AgrgCantMun(titulo, cant, idchosen, idtxt, txtTotal, arrIndex, val, selValue);
	}).on('pnotify.cancel', function(e, notice) {
	    notice.cancelRemove().update({
	        delay: 1,
	        hide: true
	    });
	    cancelarAgrgCantMun(idchosen, idtxt);
	});*/
}
function internalFuncAgrgCantMun(titulo, cant, idchosen, idtxt, txtTotal, arrIndex, selValue, tipo){
	var val = '';
	if(tipo === "Perifoneo"){
		if(!isNaN($('.cantProvPaso3').val())){
			if(parseInt($('.formatoProvPaso3').val()) > 1){
				val = parseFloat($('.cantProvPaso3').val()) * 60;
			}else{
				val = parseInt($('.cantProvPaso3').val());
			}
		}
	}else{
		val = $('.cantProvPaso3').val();
	}
	AgrgCantMun(titulo, cant, idchosen, idtxt, txtTotal, arrIndex, val, selValue);
}


function resetForm(id){
	$('#'+id).each (function(){
	  this.reset();
	});

}

function customAlert(title, content){
	$.alert({
        title: title,
        content: content,
        theme: 'black',
        animation: 'left',
        closeAnimation: 'right',
        icon: 'fa fa-warning',
        keyboardEnabled: true,
        confirm: function(){
            // $.alert('Confirmed!'); // shorthand.
        }
    });

}


function utf8_decode(str_data) {
  //  discuss at: http://phpjs.org/functions/utf8_decode/
  // original by: Webtoolkit.info (http://www.webtoolkit.info/)
  //    input by: Aman Gupta
  //    input by: Brett Zamir (http://brett-zamir.me)
  // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // improved by: Norman "zEh" Fuchs
  // bugfixed by: hitwork
  // bugfixed by: Onno Marsman
  // bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // bugfixed by: kirilloid
  //   example 1: utf8_decode('Kevin van Zonneveld');
  //   returns 1: 'Kevin van Zonneveld'

  var tmp_arr = [],
    i = 0,
    ac = 0,
    c1 = 0,
    c2 = 0,
    c3 = 0,
    c4 = 0;

  str_data += '';

  while (i < str_data.length) {
    c1 = str_data.charCodeAt(i);
    if (c1 <= 191) {
      tmp_arr[ac++] = String.fromCharCode(c1);
      i++;
    } else if (c1 <= 223) {
      c2 = str_data.charCodeAt(i + 1);
      tmp_arr[ac++] = String.fromCharCode(((c1 & 31) << 6) | (c2 & 63));
      i += 2;
    } else if (c1 <= 239) {
      // http://en.wikipedia.org/wiki/UTF-8#Codepage_layout
      c2 = str_data.charCodeAt(i + 1);
      c3 = str_data.charCodeAt(i + 2);
      tmp_arr[ac++] = String.fromCharCode(((c1 & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
      i += 3;
    } else {
      c2 = str_data.charCodeAt(i + 1);
      c3 = str_data.charCodeAt(i + 2);
      c4 = str_data.charCodeAt(i + 3);
      c1 = ((c1 & 7) << 18) | ((c2 & 63) << 12) | ((c3 & 63) << 6) | (c4 & 63);
      c1 -= 0x10000;
      tmp_arr[ac++] = String.fromCharCode(0xD800 | ((c1 >> 10) & 0x3FF));
      tmp_arr[ac++] = String.fromCharCode(0xDC00 | (c1 & 0x3FF));
      i += 4;
    }
  }

  return tmp_arr.join('');

}


// validaCampoLength("txt_destino_viaje", 100);
function validaCampoLength(idCampo, length){

	var contenido = "";
	$(document).on('keyup', '#'+idCampo, function(event){ 					
																		
		var caracteres = $(this).val();									
																		
		if (caracteres.length > length){			
			toast1("Error!", "No se pueden agregar mas de "+length+" caracteres", 4000, "error")							
			//toast('danger','Error',"No se pueden agregar mas de 100 caracteres", 4000)	
			$(this).val(contenido);
		}else{								
			contenido = $(this).val();
		}																					
																																							
	});	

}

// validaOnlyNumbers("txt_cont_d_unid_edit");
function validaOnlyNumbers(idCampo){

	var contenido = "";
	$(document).on('keyup', '#'+idCampo, function(event){ 					
																		
		var caracteres = $(this).val();									
																		
		if (caracteres.match(/[^1234567890]/g) ){
			toast1("Error!", "Solo se admiten numeros", 4000, "error")	
			//toast1("Error!", "Solo se admiten numeros", 4000, "error")
			$(this).val(contenido);
		}else{								
			contenido = $(this).val();
		}																					
																		
																							
	});	

}

// validaCampoNum("txt_numero_unid", 2147483647);
function validaCampoNum(idCampo, val){

	var contenido = "";
	$(document).on('keyup', '#'+idCampo, function(event){ 					
																		
		var caracteres = $(this).val();									
																		
		if (caracteres > val){	
			toast1("Error!", "No se puede ingresar un valor tan grande, intente con uno mas pequeño", 4000, "error")								
			//toast('danger','Error',"No se puede ingresar un valor tan grande, intente con uno mas pequeño", 4000)	
			$(this).val(contenido);
		}else{								
			contenido = $(this).val();
		}																					
																																							
	});	

}


//funcion para convertir a mayusculas todos los campos necesarios
function conMayusculas(field) {
    field.value = field.value.toUpperCase()
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
				   ".org.ve", ".web.ve"];

// validarEmail($('#mail').val());
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
	//console.log(resultado);
	return resultado;
//http://www.webusable.com/ExtensionsTable.htms

}
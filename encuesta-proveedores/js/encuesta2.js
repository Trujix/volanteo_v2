$('#radioBtn a').on('click', function(){
    var sel = $(this).data('value');
    var tog = $(this).data('toggle');
    $('#'+tog).prop('value', sel);

    $('a[data-toggle="'+tog+'"]').not('[data-value="'+sel+'"]').removeClass('active').addClass('notActive').attr('data-check','false');
    $('a[data-toggle="'+tog+'"][data-value="'+sel+'"]').removeClass('notActive').addClass('active').attr('data-check','true');
});

var totalPreguntas = $('#total').val();

$(document).on('click','#btn_guardar_encuesta', function(e){

    var nombre_empresa = $('#nombre_encuesta').val();
    var email_empresa = $('#correo').val();
    var face_empresa = $('#face_encuesta').val();
    var telefono_empresa = $('#num_encuesta').val();
    var domicilio_empresa = $('#dom_encuesta').val();

    var respuestas = "";
    var preguntas = "";
    var puntos = "";

    $('.div-pregunta a[data-check = true]').each(function(){
        preguntas += $(this).data('toggle')+"-";
    });

    $('.div-pregunta a[data-check = true]').each(function(){
        respuestas += $(this).data('value')+"-";
    });

    $('.div-pregunta a[data-check = true]').each(function(){
        puntos += $(this).data('puntos')+"-";
    });



    var info = [nombre_empresa,email_empresa,face_empresa,telefono_empresa,domicilio_empresa,preguntas,respuestas,puntos,];

    $.ajax({
        type: "POST",
        url: "rutas/routeEncuestas.php",
        data: {action: "guardar_info",info:info},
        dataType: "json",
        success: function (data) {
            if(data == true){
                window.location = "final.php";
            }
            else{
                alert("No puedes dejar preguntas sin contestar");
            }
        },
        error: function (data) {
            alert("Error");
        }
    });

});

$(document).ready(function(){
    var info = "";
    $.ajax({
        type: "POST",
        url: "rutas/routeEncuestas.php",
        data: {action: "cargar_detalles",info:info},
        dataType: "json",
        success: function (data) {
            var datos = data;
            var tbody="";
            $('#tbody').empty();
            for(var i = 0; i < datos.length; i++){
                tbody=
                '<tr role="row" class="odd">'+
                  '<td>'+datos[i].nombre+'</td>'+
                  '<td>'+datos[i].puntos+'</td>'+
                  '<td>'+
                      '<center>'+
                          '<a data-toggle="modal" data-target="#Modal_detalles" onclick="cargar_detalles('+datos[i].id_empresa+')" id="btn_detalles" class="btn btn-primary btn-flat">Detalles</a>'+
                      '</center>'+
                  '</td>'+
                '</tr>';
                $('#tbody').append(tbody);
            }
        },
        error: function (data) {
            alert("Error");
        }
    });
});

function cargar_detalles(id){
    var info = id;
    $.ajax({
        type: "POST",
        url: "rutas/routeEncuestas.php",
        data: {action: "cargar_respuestas",info:info},
        dataType: "json",
        success: function (data) {
            var datos = data;
            console.log(datos);
            $('#p1').val(datos[0].respuesta);
            $('#p2').val(datos[1].respuesta);
            $('#p3').val(datos[2].respuesta);
            $('#p4').val(datos[3].respuesta);
            $('#p5').val(datos[4].respuesta);
            $('#p6').val(datos[5].respuesta);
            $('#p7').val(datos[6].respuesta);
            $('#p8').val(datos[7].respuesta);
            $('#p9').val(datos[8].respuesta);
            $('#p10').val(datos[9].respuesta);
            $('#p11').val(datos[10].respuesta);
            $('#p12').val(datos[11].respuesta);
            $('#p13').val(datos[12].respuesta);
        },
        error: function (data) {
            alert("Error");
        }
    });
}

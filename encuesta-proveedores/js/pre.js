$(document).ready(function(){
    var empresa = $('#nombre_encuesta').val();
    var correo = $('#correo').val();
    var telefono = $('#num_encuesta').val();
    var domicilio = $('#dom_encuesta').val();

    if(empresa == "" && correo == "" && telefono == "" && domicilio == ""){
        window.location = "index.php";
    }
});

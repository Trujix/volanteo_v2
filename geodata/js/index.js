$(document).ready(function(){

initMap();

	var selector;
	var valor_tipo_polig;
	var datos;


//++++++++++++++++++++EVENTO MENÚ LATERAL ++++++++++++++++++++++++++++++++++++++++
    $("#menu-toggle").click(function(e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
    });
//++++++++++++++++++++ EVENTOS MENÚ SUPERIOR++++++++++++++++++++++++++++++++++++++++    
    $(".nav_menu_opcion_nav").click(function(e){
    	e.preventDefault();
    	
    	selector=$(this).attr('name');
    	
    	accionMenu(selector);
    	
    	$("#menu_nav").attr('hidden',true);
	    $("#titulo_navbar").attr('hidden',true);
  		$("#menu-toggle").attr('hidden',false);
		  $("#menu_sidebar").attr('hidden',false);
		
    })	

//++++++++++++++++++++BTN CONFIRMAR DIBUJO POLIGONO ++++++++++++++++++++++++++++++++++++++++        
    $("#btn_confirmar").on('click',function(){

      $( ".chk_opcion_crear" ).each(function() {
        if($(this).is(":checked")){ $("#valor_tipo_poligono").val($(this).val());}
      });

         $("#valor_entidad").val($("#slc_estado_crear").val());
         $("#valor_municipio").val($("#slc_municipio_crear").val());
         $("#valor_localidad").val($("#slc_localidad_crear").val());
         $("#valor_zona").val($("#slc_zona_crear").val());
        
        $('#mdl_confirmacion').modal('toggle')
        $('#mdl_form_poligono').modal('show')
      })
//++++++++++++++++++++BTN DESCARTAR POLIGONO ++++++++++++++++++++++++++++++++++++++++        

    $("#btn_descartar").on('click',function(){
         cancelaTrazo(metadata_evento);
    })
//++++++++++++++++++++ BTN GUARDAR POLIGONO++++++++++++++++++++++++++++++++++++++++        

    $("#btn_guardar_poligono").on('click',function(e){
        e.preventDefault()
        form_data=$("#frm_info_poligono").serialize();
         
        $.ajax({
            url:'resources/guardar_poligonos.php',
            type:'post',
            data:form_data,
            dataType:'json',
            success: function(data){
              $('#mdl_form_poligono').modal('toggle')
              $("#body_modal_mensajes").html("<h3 class='text-primary'>Polígono guardado correctamente</h3>");
              $("#mdl_mensajes").modal('show');
            },
            error:function(){
              alert("hay un error con la inserción")
            }
        })//fin ajax guardar en base de datos
      
    }); //fin click guardar poligono


//***##############COMPORTAMIENTO SELECTS##################################****************************

  //++++++++++++++++++++SLC  CREAR++++++++++++++++++++++++++++++++++++++++
  	$("#slc_estado_crear").change(function(){

            var valor=$(this).val();

            $.ajax({
              url:'municipios.php',
              type:'post',
              data: {"entidad": valor},
              success: function(data){

                $("#slc_municipio_crear").empty();
                $("#slc_municipio_crear").append("<option value=-1>Elija un Municipio</option>");
                //$("#slc_municipio_crear").append("<option value=0>Toda la entidad</option>");
                $("#slc_municipio_crear").append(data);
                
                
              }
            }); //fin ajax
      })//fin change menu municipios
  	
  	$("#slc_municipio_crear").change(function(){

            var valor=$(this).val();

            $.ajax({
              url:'localidades.php',
              type:'post',
              data: {"municipio": valor},
              success: function(data){

                $("#slc_localidad_crear").empty();
                $("#slc_localidad_crear").append("<option value=-1>Elija una localidad</option>");
                //$("#slc_localidad_crear").append("<option value=0>Todas las localidades</option>");
                $("#slc_localidad_crear").append(data);
                
                
              }
            }); //fin ajax

            //&&&&&&&&&&&&&& PARA HABILITAR SELECT DE ZONAS
            valor=$("#slc_estado_crear").val()+"\:"+valor;

            $.ajax({
              url:'zonas.php',
              type:'post',
              data: {"localidad": valor,selector: "crear"},
              dataType:'JSON',
              success: function(data){

                $("#slc_zona_crear").empty();
                $("#slc_zona_crear").append("<option value=-1>Elija una zona</option>");
                //$("#slc_zona_crear").append("<option value=0>Todas las zonas</option>");
                $("#slc_zona_crear").append(data);
                for (var i = 0; i < data.length; i++) {
                  
                    if(i==0){
                      $("#slc_zona_crear").append("<option value="+data[i].id+">"+data[i].nombre+"</option>");
                    }//no se hace nada en la primera vuelta
                    else
                    {
                      if(data[i-1].nombre==data[i].nombre){

                      }
                      else
                      {
                        $("#slc_zona_crear").append("<option value="+data[i].id+">"+data[i].nombre+"</option>");

                      }
                    }

                }
                
                
              }
            }); //fin ajax
      })//fin change menu municipios

      $("#slc_localidad_crear").change(function(){
        crearPoligonos();//INICIAMOS EL PANEL DE DIBUJO
       
      })

    $("#slc_zona_crear").change(function(){
      crearPoligonos();//INICIAMOS EL PANEL DE DIBUJO
      var valor="condicion="+$(this).val();
      verPoligonos("crear",valor,"zona");
    })

  //++++++++++++++++++++SLC ESTADO, MUNICIPIO, LOCALIDAD, ZONA  VER++++++++++++++++++++++++++++++++++++++++
    $("#slc_estado").change(function(){

      var valor=$(this).val();

      $.ajax({
        url:'municipios.php',
        type:'post',
        data: {"entidad": valor},
        success: function(data){

          $("#slc_municipio").empty();
          $("#slc_municipio").append("<option value=-1>Elija un Municipio</option>");
          //$("#slc_municipio").append("<option value=0>Toda la entidad</option>");
          $("#slc_municipio").append(data);
          
          
        }
      }); //fin ajax
    })//fin change menu municipios
    
    $("#slc_municipio").change(function(){

      var valor=$(this).val();

      $.ajax({
        url:'localidades.php',
        type:'post',
        data: {"municipio": valor},
        success: function(data){

          $("#slc_localidad").empty();
    
          $("#slc_localidad").append("<option value=-1>Elija una localidad</option>");
          
          //$("#slc_localidad_crear").append("<option value=0>Todas las localidades</option>");
          
          $("#slc_localidad").append(data);
          
          
        }
      }); //fin ajax
      
      valor="condicion="+$("#slc_estado").val()+"\:"+valor+"&&todos=si";
      verPoligonos("ver",valor,"ver");
    })//fin change menu municipios

    $("#slc_localidad").change(function(){

      var valor=$("#slc_estado").val()+"\:"+$("#slc_municipio").val()+"\:"+$(this).val();

      $.ajax({
        url:'zonas.php',
        type:'post',
        data: {"localidad": valor,selector:"ver"},
        dataType:'JSON',
        success: function(data){

          $("#slc_zona").empty();
          $("#slc_zona").append("<option value=-1>Elija una zona</option>");
          //$("#slc_zona").append("<option value=0>Todas las zonas</option>");
          for (var i = 0; i < data.length; i++) {
            
    
                  $("#slc_zona").append("<option value="+data[i].id+">"+data[i].nombre+"</option>");


          }
          
        }//fin success
      }); //fin ajax
     var valor="condicion="+valor+"";
      verPoligonos("ver",valor,"zonas");


    })//fin change menu localidad

    $("#slc_zona").change(function(){
      var valor="condicion="+$(this).val()+"&&todos=si";
      verPoligonos("ver",valor,"ver_secciones");
    })




  //++++++++++++++++++++SLC ENTIDAD, MUNICIPIO, LOCALIDAD EDITAR++++++++++++++++++++++++++++++++++++++++

    $("#slc_estado_editar").change(function(){

            var valor=$(this).val();

            $.ajax({
              url:'municipios.php',
              type:'post',
              data: {"entidad": valor},
              success: function(data){

                $("#slc_municipio_editar").empty();
                $("#slc_municipio_editar").append("<option value=-1>Elija un Municipio</option>");
                //$("#slc_municipio_editar").append("<option value=0>Toda la entidad</option>");
                $("#slc_municipio_editar").append(data);
                
                
              }
            }); //fin ajax
      })//fin change menu municipios
    
    $("#slc_municipio_editar").change(function(){

            var valor=$("#slc_estado_editar").val()+"\:"+$(this).val()+"\:";

         

            $.ajax({
              url:'zonas.php',
              type:'post',
              data: {"localidad": valor,selector: "crear"},
              dataType:'JSON',
              success: function(data){

                $("#slc_zona_editar").empty();
                $("#slc_zona_editar").append("<option value=-1>Elija una zona</option>");
                //$("#slc_zona_editar").append("<option value=0>Todas las zonas</option>");
                $("#slc_zona_editar").append(data);
                for (var i = 0; i < data.length; i++) {
                  
                    if(i==0){
                      $("#slc_zona_editar").append("<option value="+data[i].id+">"+data[i].nombre+"</option>");
                    }//no se hace nada en la primera vuelta
                    else
                    {
                      if(data[i-1].nombre==data[i].nombre){

                      }
                      else
                      {
                        $("#slc_zona_editar").append("<option value="+data[i].id+">"+data[i].nombre+"</option>");

                      }
                    }

                }
              }
            })
            var valor=$("#slc_estado_editar").val()+"\:"+$(this).val();
            valor="condicion="+valor+"";
            editarPoligonos(valor,"zonas");
      })//fin change menu municipios

    $("#slc_zona_editar").change(function(){
       var valor="condicion="+$(this).val()+"&&todos=si";
      editarPoligonos(valor,"secciones");


       
    })

//*****###########FIN COMPORTAMIENTO SELECTS##############################******************************

//++++++++++++++++++++CHECK BOX CREAR POLIGONOS++++++++++++++++++++++++++++++++++++++++


  $(".chk_opcion_crear").on('click',function(){
    $(this).prop('checked',true); //siempre lo deja checado cuando se da click sobre el check, evitando que desaparezca la palomita
     initMap();
     $(".slc_crear").each(function(){$(this).prop('selectedIndex', 0);})
    var opcion=$(this).attr('name');

    if(opcion=="crear_zona"){
      $('#chk_crear_seccion').prop('checked', false); //le quita el check al otro elemento(seccion)
      $("#div_territorio_crear").attr('hidden',false)
      $("#div_zona_crear").attr('hidden',true)//se esconde la zona pues es la que se va a crear
      $("#div_localidad_crear").attr('hidden',false)

    }

    if(opcion=="crear_seccion"){
      $('#chk_crear_zona').prop('checked', false); //le quita el check al otro elemento(zona)
      $("#div_territorio_crear").attr('hidden',false)
      $("#div_localidad_crear").attr('hidden',true)
      $("#div_zona_crear").attr('hidden',false)
    }
     
  })
  
//==============FUNCIONES====================================================================	


 	var map;
 	var drawingManager=new google.maps.drawing.DrawingManager();
 	var metadata_evento=""; // servirá como copia del objeto event cachado en la funcion overlaycomplete de la clase drawingmanager
 	var infoWindow="";
 	
  function initMap(){
    map = new google.maps.Map(document.getElementById('map'), {
	          zoom: 14,
	          center: {lat:19.2311932,lng:-103.7243722},
	          mapTypeId: google.maps.MapTypeId.TERRAIN
	  });

	}
  //var src = 'https://developers.google.com/maps/documentation/javascript/examples/kml/westcampus.kml';
  //var src = "C:\\Users\\Angel\\Downloads\\EL GRULLO, JALISCO.kml";
  var src = "C:/Users/Angel/Downloads/EL GRULLO, JALISCO.kml";
  var kmlLayer = new google.maps.KmlLayer(src, {
    suppressInfoWindows: true,
    preserveViewport: false,
    map: map
  });
  //++++++++++++++++++++FX VER POLIGONOS ++++++++++++++++++++++++++++++++++++++++    
    function verPoligonos(selector,datos,valor_tipo_polig) {
    
       	if (selector=="ver") 
      	{
      		
          if(valor_tipo_polig=="ver")
          {
            initMap();
            $.ajax({
              url:'resources/control.php', 
              type:  'post',
              data: {clase:'crud_poligonos',selector:'ver',data:datos},
              dataType:'JSON',
              success: function(data){                         
                            
                var arreglo_poligonos=[];
                var poligonos=[];
                var centro_poligono;
                $.each(data, function(i, value) { 
                  poligonos=[];
              
                  $.each(data[i].coords, function(key, value2) { 
                   var lati=parseFloat(data[i].coords[key][0]);
                   var lngi=parseFloat(data[i].coords[key][1]);
                   poligonos.push({lat:lati,lng:lngi});
                  });
                arreglo_poligonos.push(poligonos);

                var polygon_center = new google.maps.Polygon({ //poligonos temporales para obtener su centro
                       paths: poligonos,                        
                       fillColor:data[0].atributos,
                       fillOpacity: 0.5,
                       strokeColor: '#0000FF',
                         strokeOpacity: 0.8,
                         strokeWeight: 3,
                       editable: false,
                       draggable:false,
                       clickable:false,
                });

                polygon_center.setMap(map);

                centro_poligono= polygonCenter(polygon_center);
              })
            },  
            error: function(){
                alert("error en la consulta de información");
              }
            })//fin ajax 

          }//fin if ver
          //#################################
          if(valor_tipo_polig=="ver_secciones") //si los poligonos solicitados fueron de zonq
          {
            if ($("#chk_ver").is(":checked")) { //no reinicia el mapa para que no sea acumulativo

            }
            else{
              initMap();
            }
            var valor="condicion="+$("#slc_zona").val();
            verPoligonos("crear",valor,"zona");
            $.ajax({
                url:'resources/control.php', 
                type:  'post',
                data: {clase:'crud_poligonos',selector:'ver_secciones',data:datos}, //traemos las coordenadas para la zona de poligonos solicitados
                dataType:'JSON',
                success: function(data){

                    
                    var poligonos=[];
                    var json={};
                    var centro_poligono;
                    var posicion;
                    $.each(data, function(i, value) { 
                      poligonos=[];
                      $.each(data[i].coords, function(key, value2) { 
                        var lati=parseFloat(data[i].coords[key][0]);
                        var lngi=parseFloat(data[i].coords[key][1]);
                        poligonos.push({lat:lati,lng:lngi});
                      });
                 
                      json["json" + i] =  new google.maps.Polygon({ //se hace un json con los poligonos construidos
                                           paths: poligonos,
                                           strokeOpacity: 0.8,
                                           strokeWeight: 2,
                                           fillColor: data[i].atributos,
                                           fillOpacity: 0.35,
                                           editable: false,
                                           draggable:false,
                                           clickable:false,
                                           id_poligono:data[i].id,
                                           nombre_poligono:data[i].nombre,

                                          });
                       var polygon_center = new google.maps.Polygon({ //poligonos temporales para obtener su centro
                              paths: poligonos                        
                            });

                            centro_poligono= polygonCenter(polygon_center);
                          
                          var area = google.maps.geometry.spherical.computeArea(json["json" + i].getPath());

                          var marker = new google.maps.Marker({
                            position: centro_poligono,
                            map: map,
                            title:data[i].nombre
                          });
                          var infowindow = new google.maps.InfoWindow({
                          content: ''
                          });
                          
                          google.maps.event.addListener(marker, 'click', (function (marker, i) {

                                return function () {
                                  infowindow.setContent(
                                            '<div id="content">'+
                                              '<div id="siteNotice">'+
                                              '</div>'+
                                             '<center><label id="firstHeading" class="firstHeading text-success">SECCIÓN</label></center>'+
                                             '<h4 id="firstHeading" class="firstHeading ">'+data[i].nombre+'</h4>'+
                                              '<div id="bodyContent">'+
                                                  '<p><span class="text-success"><b>id Zona: <b/></span>'+data[i].zona+'</p>'+
                                                  '<p><span class="text-success"><b>Área: <b/></span>'+area.toFixed(2)+'m2</p>'+
                                                  '<p><span class="text-success"><b>Observaciones: <b/></span>'+data[i].observaciones+'</p>'+
                                                  '<p><span class="text-success"><b>Fecha de creación: <b/></span>'+data[i].fecha_registro+'</p>'+
                                              '</div>'+
                                            '</div>'                                  

                                    ); 
                                  
                                  infowindow.open(map, marker);
                                } 

                            })(marker, i));

                               
                       
                        json["json" + i].setMap(map);
                    
                      
                             
                   
                    }); //fin each principal
                     
                  
                   
                 
                    //------------------------------//
                  

                }, 
                error:function(){
                    alert("error en la consulta de información")
                }
            })//fin ajax 
           
          }//fin if secciones 

          if(valor_tipo_polig=="zonas") //si los poligonos solicitados fueron de zonq
          {
            $.ajax({
                url:'resources/control.php', 
                type:  'post',
                data: {clase:'crud_poligonos',selector:'ver_zonas',data:datos}, //traemos las coordenadas para la zona de poligonos solicitados
                dataType:'JSON',
                success: function(data){

                    
                    var poligonos=[];
                    var json={};
                    var centro_poligono;
                    var posicion;
                    $.each(data, function(i, value) { 
                      poligonos=[];
                      $.each(data[i].coords, function(key, value2) { 
                        var lati=parseFloat(data[i].coords[key][0]);
                        var lngi=parseFloat(data[i].coords[key][1]);
                        poligonos.push({lat:lati,lng:lngi});
                      });
                 
                      json["json" + i] =  new google.maps.Polygon({ //se hace un json con los poligonos construidos
                                           paths: poligonos,
                                           strokeOpacity: 0.8,
                                           strokeWeight: 2,
                                           fillColor: data[i].atributos,
                                           fillOpacity: 0.35,
                                           editable: false,
                                           draggable:false,
                                           clickable:false,
                                           id_poligono:data[i].id,
                                           nombre_poligono:data[i].nombre,

                                          });
                       var polygon_center = new google.maps.Polygon({ //poligonos temporales para obtener su centro
                              paths: poligonos                        
                            });

                            centro_poligono= polygonCenter(polygon_center);
                          
                          var area = google.maps.geometry.spherical.computeArea(json["json" + i].getPath());

                          var marker = new google.maps.Marker({
                            position: centro_poligono,
                            map: map,
                            title:data[i].nombre
                          });
                          var infowindow = new google.maps.InfoWindow({
                          content: ''
                          });
                          
                          google.maps.event.addListener(marker, 'click', (function (marker, i) {

                                return function () {
                                  infowindow.setContent(
                                            '<div id="content">'+
                                              '<div id="siteNotice">'+
                                              '</div>'+
                                             '<center><label id="firstHeading" class="firstHeading text-primary">ZONA</label></center>'+
                                             '<h4 id="firstHeading" class="firstHeading ">'+data[i].nombre+'</h4>'+
                                              '<div id="bodyContent">'+
                                                  '<p><span class="text-primary"><b>id Zona: <b/></span>'+data[i].zona+'</p>'+
                                                  '<p><span class="text-primary"><b>Área: <b/></span>'+area.toFixed(2)+'m2</p>'+
                                                  '<p><span class="text-primary"><b>Observaciones: <b/></span>'+data[i].observaciones+'</p>'+
                                                  '<p><span class="text-primary"><b>Fecha de creación: <b/></span>'+data[i].fecha_registro+'</p>'+
                                              '</div>'+
                                            '</div>'                                  

                                    ); 
                                  
                                  infowindow.open(map, marker);
                                }   

                            })(marker, i));

                               
                       
                        json["json" + i].setMap(map);
                    
                       
                      
                                   
                   
                    }); //fin each principal
                     
                  
                   
                 
                    //------------------------------//
                  

                }, 
                error:function(){
                    alert("error en la consulta de información")
                }
            })//fin ajax 
            map.setZoom(14);
          }//fin if zonas
          
          if(valor_tipo_polig=="ver"){
            map.setZoom(14);
          }
          
          if(valor_tipo_polig=="todos"){
            map.setZoom(14);
          }
      		
        } //fin if ver-------------

      	if (selector=="crear") //esta opcion es para desplegar los poligonos pero como referencia
      	{
          if ($("#chk_crear_acumular").is(":checked")||$("#chk_ver").is(":checked")) { //no reinicia el mapa para que no sea acumulativo

          }
          else{
            initMap(); // reinicia el mapa para que no sean acumuladas las capas
            crearPoligonos();
          }
      			$.ajax({
	              url:'resources/control.php', 
   			        type:  'post',
    			      data: {clase:'crud_poligonos',selector:'crear',data:datos},
                dataType:'JSON',
    	          success: function(data){
    	            	if(valor_tipo_polig=="zona"){
    	
                      var arreglo_poligonos=[];
                      var poligonos=[];
                      var polygon_center;
                      var centro_poligono;
                      $.each(data, function(i, value) { 
                      	poligonos=[];
                      	$.each(data[i].coords, function(key, value2) { 
                      		var lati=parseFloat(data[i].coords[key][0]);
                      		var lngi=parseFloat(data[i].coords[key][1]);
                      		poligonos.push({lat:lati,lng:lngi});
                      	});

                      	arreglo_poligonos.push(poligonos);
                        polygon_center = new google.maps.Polygon({ //poligonos temporales para obtener su centro
                          paths: poligonos                        
                        });

                        centro_poligono= polygonCenter(polygon_center);
                        var polygon = new google.maps.Polygon({
                                     paths: arreglo_poligonos,
                                     strokeColor:"#0000ff",
                                     strokeOpacity: 0.8,
                                     strokeWeight: 3,
                                     fillColor:data[i].atributos,
                                     fillOpacity: 0.35,
                                     editable: false,
                       });
                        polygon.setMap(map);
                      });
                      map.setCenter(centro_poligono);
                      

                      

    		          	}
    	            	//------------------------------//
    	            	if(valor_tipo_polig=="libres"){

    	            	}

    	             },	
    	          error:function(){
    	              alert("error en la consulta de información")
    	          }
        	  })//fin ajax 
      	}
    } 
    //++++++++fin funcion verPoligonos

  //++++++++++++++++++++FX CREAR POLIGONOS++++++++++++++++++++++++++++++++++++++++    
    function crearPoligonos(){
      initMap(); // reinicia el mapa para que no sea acumulativo
      var drawingManager = new google.maps.drawing.DrawingManager({
          drawingMode: null, //indica que iniciar no se asignara ninguna forma predeterminada para dibujar
          //drawingMode: google.maps.drawing.OverlayType.POLYGON,
          drawingControl: true,
          drawingControlOptions: {
            position: google.maps.ControlPosition.TOP_CENTER,
            drawingModes: [
             
              google.maps.drawing.OverlayType.POLYGON,
              //google.maps.drawing.OverlayType.RECTANGLE
            ]
          },
          polygonOptions:{clickable: false,
            editable: false}
        });
        
        drawingManager.setMap(map);
        
                
        google.maps.event.addListener(drawingManager, 'overlaycomplete',function(event) 
        {
          var coords;
          if(event.type == google.maps.drawing.OverlayType.POLYGON) {
           
            metadata_evento=event;
            coords = event.overlay.getPath(this);
           
            var coords_string="";
                     
            for (var i =0; i < coords.getLength(); i++) {
              
              var xy = coords.getAt(i);
              
              coords_string+=xy.lat() +","+xy.lng();
              
              
              if(i+1<=coords.getLength()-1){
                coords_string+=";"
              }
              
       
              console.log(coords_string);
            } //fin iteracion de vertices para poligono
           $("#coordenadas").val(coords_string);
           $('#mdl_confirmacion').modal('show')
           
          }
        });// listener overlaycomplete

    }

  //++++++++++++++++++++FX EDITAR POLIGONOS ++++++++++++++++++++++++++++++++++++++++    
  function editarPoligonos(datos,valor_tipo_polig) {
    
       
      if ($("#chk_editar_acumular").is(":checked")) { //no reinicia el mapa para que sea acumulativo

      }
      else{
            initMap(); // reinicia el mapa para que no sea acumulativo
      }
      if(valor_tipo_polig=="secciones") //si los poligonos solicitados fueron de zonq
      {
        $.ajax({
            url:'resources/control.php', 
            type:  'post',
            data: {clase:'crud_poligonos',selector:'ver_secciones',data:datos}, //traemos las coordenadas para la zona de poligonos solicitados
            dataType:'JSON',
            success: function(data){

                
                var poligonos=[];
                var json={};
                var centro_poligono;
                var posicion;
                $.each(data, function(i, value) { 
                  poligonos=[];
                  $.each(data[i].coords, function(key, value2) { 
                    var lati=parseFloat(data[i].coords[key][0]);
                    var lngi=parseFloat(data[i].coords[key][1]);
                    poligonos.push({lat:lati,lng:lngi});
                  });
             
                  json["json" + i] =  new google.maps.Polygon({ //se hace un json con los poligonos construidos
                                       paths: poligonos,
                                       strokeOpacity: 0.8,
                                       strokeWeight: 2,
                                       fillColor: data[i].atributos,
                                       fillOpacity: 0.35,
                                       editable: true,
                                       draggable:false,
                                       clickable:true,
                                       id_poligono:data[i].id,
                                       nombre_poligono:data[i].nombre,

                                      });
                   var polygon_center = new google.maps.Polygon({ //poligonos temporales para obtener su centro
                          paths: poligonos                        
                        });

                        centro_poligono= polygonCenter(polygon_center);
                      
                      var area = google.maps.geometry.spherical.computeArea(json["json" + i].getPath());

                      var marker = new google.maps.Marker({
                        position: centro_poligono,
                        map: map,
                        title:data[i].nombre
                      });
                      var infowindow = new google.maps.InfoWindow({
                      content: ''
                      });
                      
                      google.maps.event.addListener(marker, 'click', (function (marker, i) {

                             return function () {
                                  infowindow.setContent(
                                            '<div id="content">'+
                                              '<div id="siteNotice">'+
                                              '</div>'+
                                             '<center><label id="firstHeading" class="firstHeading text-success">SECCIÓN</label></center>'+
                                             '<h4 id="firstHeading" class="firstHeading ">'+data[i].nombre+'</h4>'+
                                              '<div id="bodyContent">'+
                                                  '<p><span class="text-success"><b>id Zona: <b/></span>'+data[i].zona+'</p>'+
                                                  '<p><span class="text-success"><b>Área: <b/></span>'+area.toFixed(2)+'m2</p>'+
                                                  '<p><span class="text-success"><b>Observaciones: <b/></span>'+data[i].observaciones+'</p>'+
                                                  '<p><span class="text-success"><b>Fecha de creación: <b/></span>'+data[i].fecha_registro+'</p>'+
                                              '</div>'+
                                            '</div>'                                  

                                    ); 
                                  
                                  infowindow.open(map, marker);
                                }    

                        })(marker, i));

                           
                   
                    json["json" + i].setMap(map);
                
                    google.maps.event.addListener(json["json" + i].getPath(), 'set_at', polygonChanged);
                    google.maps.event.addListener(json["json" + i].getPath(), 'insert_at', polygonChanged);
                    var infoWindow = new google.maps.InfoWindow;
                  
                    function polygonChanged(){
                      
                      var vertices = this['b'];
                      var coords_string="";
                     
                      
                      infoWindow.close( );

                      $.each(vertices, function(i, value) { 
                        coords_string+=this.lat() +","+this.lng()+";";
                        posicion={lat:this.lat(),lng:this.lng()};
                      })
                      
                              
                      $("#coordenadas").val(coords_string.slice(0, -1)); 
                      
                      infoWindow.setContent("<h4>¿Desea actualizar las coordenadas del polígono? <br><span class='text-primary '><center>"+json["json" + i].nombre_poligono+"</span></center></h4><br><center><button class='btn btn-primary' id='btn_confirmar_actualizar'>Confirmar</button> <button class='btn btn-danger' id='btn_cancelar_actualizar'>Cancelar</button></center>");
                      infoWindow.setPosition(posicion);
                      infoWindow.open(map);

                      $("#btn_confirmar_actualizar").on('click',function(){
                          var datos="condicion=s&&id_poligono="+json["json" + i].id_poligono+"&&coords="+$("#coordenadas").val();

                          $.ajax({
                                url:'resources/control.php', 
                                type:  'post',
                                data: {clase:'crud_poligonos',selector:'actualizar',data:datos}, //traemos las coordenadas para la zona de poligonos solicitados
                                dataType:'JSON',
                                success: function(data){
                                 
                                  if(data==true){infoWindow.close(this);}
                                  else{alert("Error en la insercion"+data);}

                                }, 
                                error:function(){
                                    alert("error en la consulta de información")
                                }
                          })//fin ajax 
                      })
                      $("#btn_cancelar_actualizar").on('click',function(){
                        infoWindow.close(this);
                      })


                    }//fin fx polygonChanged             
               
                }); //fin each principal
                 
              
               
             
                //------------------------------//
              

            }, 
            error:function(){
                alert("error en la consulta de información")
            }
        })//fin ajax 
       
      }//fin if secciones
      if(valor_tipo_polig=="zonas") //si los poligonos solicitados fueron de zonq
      {
        if ($("#chk_ver").is(":checked")) { //no reinicia el mapa para que no sea acumulativo

        }
        else{
          initMap();
        }
        var valor="condicion="+$("#slc_zona_editar").val();
        verPoligonos("crear",valor,"zona");
        $.ajax({
            url:'resources/control.php', 
            type:  'post',
            data: {clase:'crud_poligonos',selector:'ver_zonas',data:datos}, //traemos las coordenadas para la zona de poligonos solicitados
            dataType:'JSON',
            success: function(data){

                
                var poligonos=[];
                var json={};
                var centro_poligono;
                var posicion;
                $.each(data, function(i, value) { 
                  poligonos=[];
                  $.each(data[i].coords, function(key, value2) { 
                    var lati=parseFloat(data[i].coords[key][0]);
                    var lngi=parseFloat(data[i].coords[key][1]);
                    poligonos.push({lat:lati,lng:lngi});
                  });
             
                  json["json" + i] =  new google.maps.Polygon({ //se hace un json con los poligonos construidos
                                       paths: poligonos,
                                       strokeOpacity: 0.8,
                                       strokeWeight: 2,
                                       fillColor: data[i].atributos,
                                       fillOpacity: 0.35,
                                       editable: true,
                                       draggable:false,
                                       clickable:false,
                                       id_poligono:data[i].id,
                                       nombre_poligono:data[i].nombre,

                                      });
                   var polygon_center = new google.maps.Polygon({ //poligonos temporales para obtener su centro
                          paths: poligonos                        
                        });

                        centro_poligono= polygonCenter(polygon_center);
                      
                      var area = google.maps.geometry.spherical.computeArea(json["json" + i].getPath());

                      var marker = new google.maps.Marker({
                        position: centro_poligono,
                        map: map,
                        title:data[i].nombre
                      });
                      var infowindow = new google.maps.InfoWindow({
                      content: ''
                      });
                      
                      google.maps.event.addListener(marker, 'click', (function (marker, i) {

                            return function () {
                                  infowindow.setContent(
                                            '<div id="content">'+
                                              '<div id="siteNotice">'+
                                              '</div>'+
                                             '<center><label id="firstHeading" class="firstHeading text-primary">ZONA</label></center>'+
                                             '<h4 id="firstHeading" class="firstHeading ">'+data[i].nombre+'</h4>'+
                                              '<div id="bodyContent">'+
                                                  '<p><span class="text-primary"><b>id Zona: <b/></span>'+data[i].zona+'</p>'+
                                                  '<p><span class="text-primary"><b>Área: <b/></span>'+area.toFixed(2)+'m2</p>'+
                                                  '<p><span class="text-primary"><b>Observaciones: <b/></span>'+data[i].observaciones+'</p>'+
                                                  '<p><span class="text-primary"><b>Fecha de creación: <b/></span>'+data[i].fecha_registro+'</p>'+
                                              '</div>'+
                                            '</div>'                                  

                                    ); 
                                  
                                  infowindow.open(map, marker);
                                }    

                        })(marker, i));

                           
                   
                    json["json" + i].setMap(map);
                
                    google.maps.event.addListener(json["json" + i].getPath(), 'set_at', polygonChanged);
                    google.maps.event.addListener(json["json" + i].getPath(), 'insert_at', polygonChanged);
                    var infoWindow = new google.maps.InfoWindow;
                  
                    function polygonChanged(){
                      
                      var vertices = this['b'];
                      var coords_string="";
                     
                      
                      infoWindow.close( );

                      $.each(vertices, function(i, value) { 
                        coords_string+=this.lat() +","+this.lng()+";";
                        posicion={lat:this.lat(),lng:this.lng()};
                      })
                      
                              
                      $("#coordenadas").val(coords_string.slice(0, -1)); 
                      
                      infoWindow.setContent("<h4>¿Desea actualizar las coordenadas del polígono? <br><span class='text-primary '><center>"+json["json" + i].nombre_poligono+"</span></center></h4><br><center><button class='btn btn-primary' id='btn_confirmar_actualizar'>Confirmar</button> <button class='btn btn-danger' id='btn_cancelar_actualizar'>Cancelar</button></center>");
                      infoWindow.setPosition(posicion);
                      infoWindow.open(map);

                      $("#btn_confirmar_actualizar").on('click',function(){
                          var datos="condicion=z&&id_poligono="+json["json" + i].id_poligono+"&&coords="+$("#coordenadas").val();

                          $.ajax({
                                url:'resources/control.php', 
                                type:  'post',
                                data: {clase:'crud_poligonos',selector:'actualizar',data:datos}, //traemos las coordenadas para la zona de poligonos solicitados
                                dataType:'JSON',
                                success: function(data){
                                 
                                  if(data==true){infoWindow.close(this);}
                                  else{alert("Error en la insercion"+data);}

                                }, 
                                error:function(){
                                    alert("error en la consulta de información")
                                }
                          })//fin ajax 
                      })
                      $("#btn_cancelar_actualizar").on('click',function(){
                        infoWindow.close(this);
                      })


                    }//fin fx polygonChanged             
               
                }); //fin each principal
                 
              
               
             
                //------------------------------//
              

            }, 
            error:function(){
                alert("error en la consulta de información")
            }
        })//fin ajax 
       
      }//fin if zonas

  } 
  //++++++++fin funcion editarPoligonos

  //++++++++++++++++++++ FX CANCELAR TRAZO ++++++++++++++++++++++++++++++++++++++++
	function cancelaTrazo(data_evento){// la variable data_evento es una copia del objeto event cachado en la funcion overlaycomplete de la clase drawingmanager
  	data_evento.overlay.setVisible(false); //propiedad heredada del objeto poligono en la clase overlay
  	metadata_evento="";// restablecemos el valor de la variable para futuros usos.
  	
  	
  	return true;
	}

  //++++++++++++++++++++ ++++++++++++++++++++++++++++++++++++++++
	function accionMenu(selector){

		$(".menu_nav_opcion").each(function(){//PERMITE  MOSTRAR EL MENÚ EN LA NAVBAR PARA OPCIÓN ELEGIDA
			if($(this).attr('id')=="menu_"+selector)
			{$(this).attr('hidden',false);}
			else{$(this).attr('hidden',true);}
			$("#li_mas_opciones").attr('hidden',false);
		})
		
		//------------SE TOMA LA DECICISION A PARTIR DE LA OPCIÓN ELEGIDA EN EL MENÚ
  		
  		if (selector=="ver") 
  		{
  			drawingManager.setOptions({
  				drawingControl: false
			  });

  			$("#txt_opcion_elegida").text('Ver polígonos');
      	$(".slc_ver").each(function(){$(this).prop('selectedIndex', 0);})   
    	}
    	if (selector=="crear") 
    	{
    		$("#txt_opcion_elegida").text('Crear polígonos');
    	  $(".slc_crear").each(function(){$(this).prop('selectedIndex', 0);})
    			
    	}
    	if (selector=="editar") 
    	{
    		$("#txt_opcion_elegida").text('Editar polígonos');
        $(".slc_editar").each(function(){$(this).prop('selectedIndex', 0);}) 
    	}
    	if (selector=="importar") 
    	{
    		
    	}
    	if (selector=="borrar") 
    	{
    		
    	}
	}

//++++++++++++++++++++ ++++++++++++++++++++++++++++++++++++++++
      
  function polygonCenter(poly) {
    var lowx,
        highx,
        lowy,
        highy,
        lats = [],
        lngs = [],
        vertices = poly.getPath();

    for(var i=0; i<vertices.length; i++) {
      lngs.push(vertices.getAt(i).lng());
      lats.push(vertices.getAt(i).lat());
    }

    lats.sort();
    lngs.sort();
    lowx = lats[0];
    highx = lats[vertices.length - 1];
    lowy = lngs[0];
    highy = lngs[vertices.length - 1];
    center_x = lowx + ((highx-lowx) / 2);
    center_y = lowy + ((highy - lowy) / 2);
    return (new google.maps.LatLng(center_x, center_y));
  }     

   
      
}) //******//fin on ready



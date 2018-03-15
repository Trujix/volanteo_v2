var map;
	var pinColor;
	var markers = new Array();
	var lineas;
	var poligonos= new Array(); //sirve para guardar vertices de un poligono
	var clasepoligono;
	var polig_rojo;
	var error = "Ocurrió un error inesperado, por favor intentelo mas tarde o pongase en contacto con el administrador";

	var puntos_adentro;
	
	function showMap(id_device, id_service, idMap, accion) {
		var latlng;
		// OBTENCIÓN DE LOS GEOPUNTOS
		$.ajax({
			url:'routes/routeSeguimiento.php',
			type:'post',
			async: false,
			data: {info: {id_device: id_device, id_service: id_service}, action: accion},
			dataType:'JSON',
			beforeSend: function(){
				showSpinner();
				$('#map').empty();
			},
			error: function(error){
				console.log(error);
				toast1("Error!", error, 8000, "error");
				removeSpinner();
			},
			success: function(data){
				//console.log(data)
				removeSpinner();
				if(data.geo.length > 0){

					if(data.geo.length > 1)
						var puntoMedio = Math.round(data.geo.length / 2);
					else
						var puntoMedio = 0;

					//console.log(data[puntoMedio].latitud+','+data[puntoMedio].longitud);
					latlng = new google.maps.LatLng(data.geo[puntoMedio].latitud,data.geo[puntoMedio].longitud);

					//Opciones del mapa
			        var options = {
			        	zoom: 13, 
			        	scrollwheel: true, 
			        	center: latlng,
			        	mapTypeId: google.maps.MapTypeId.TERRAIN
			        };
			        //Creación del mapa
					map = new google.maps.Map(document.getElementById(idMap), options);

					///LINEAS
					lineas = new google.maps.Polyline({
					  strokeOpacity: 1.0,
					  strokeWeight: 3
					});

					lineas.setMap(map);

					generarPrimerUltimoIDS(data.ids, function(){
						addMarkers(data.geo);
					});
				}
				else{

					$('#map').append('<div class="col-md-12">'+
					                    '<div class="col-md-2" style="margin-left: 20%;">'+
					                      '<img src="images/folder2.png" style="width: 100px;height: 100px;">'+
					                    '</div>'+
					                    '<div class="col-md-6" style="margin-top: 20px;">'+
					                      '<h3>No encontramos ninguna geopunto asignada a este cliente</h3>'+
					                    '</div>'+
					                 '</div>');
				}

			}
		}); //fin ajax

		$('#modal_lvl3').modal('show');
		$("#modal_lvl3").on("shown.bs.modal", function () {
			google.maps.event.trigger(map, "resize");
			map.setCenter(latlng);

		});
	}

	function deleteMarkers() {
		clearMarkers();
		markers = [];
	}

	function addMarkers(data){
		//console.log(data);
		var latLng;
	  	var path_ = lineas.getPath();
		deleteMarkers();
		path_.clear();
		
		var color="#"+((1<<24)*Math.random()|0).toString(16);

		for (var i = 0; i < data.length; i++) {

			if(data[i].latitud != "" && data[i].longitud != "")
				latLng = new google.maps.LatLng(parseFloat(data[i].latitud),parseFloat(data[i].longitud));	

				// console.log(data[i].latitud,data[i].longitud);
				// console.log(latLng);
			var hora = data[i].date_time.split(" ")[1], icono = '';
			if(parseFloat(data[i].id) === primerID){
				icono = 'images/banderasPolig/inicio.png';
			}else if(parseFloat(data[i].id) === ultimoID){
				icono = 'images/banderasPolig/fin.png';
			}else{
				icono = 'http://maps.google.com/mapfiles/kml/shapes/placemark_circle_highlight.png';
			}

			var marker = new google.maps.Marker({
				position: latLng,
				map: map,
				// icon: 'http://maps.google.com/mapfiles/dir_84.png'
				icon: icono,
				title: hora
			});
			markers.push(marker);

			lineas.setOptions({strokeColor:color});	

			path_.push(latLng);
		}
	
	}

	// Removes the markers from the map, but keeps them in the array.
	function clearMarkers() {
		setMapOnAll(null);
	}

	// Sets the map on all markers in the array.
	function setMapOnAll(map) {
		for (var i = 0; i < markers.length; i++) {
		    markers[i].setMap(map);
		}
	}
	var primerID = 0, ultimoID = 0;
	function generarPrimerUltimoIDS(data, callback){
		/*$(data).each(function (key, value){
			primerID = parseFloat(value.Primero);
			ultimoID = parseFloat(value.Ultimo);
		});*/
		primerID = parseFloat(data[1].id);
		ultimoID = parseFloat(data[0].id);
		callback(true);
	}
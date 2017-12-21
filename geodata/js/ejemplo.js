$(document).ready(function(){
	
var id=-1;
get_datos_tabla(-1);// el -1 sirve para indicar que se deben listar todos

/////////////////////////////////////	

	var i = 1

  	var timer = setTimeout(function(id) {
	    get_datos_tabla(id);
	    timer = setTimeout(arguments.callee, 2000)
  	}, 5000)



/////////////////

 	  var map;
      var pinColor;
      var markers = new Array();
      var lineas;
      var poligonos= new Array(); //sirve para guardar vertices de un poligono
      var clasepoligono;
	  var polig_rojo;

	  var puntos_adentro;
      function initialize() {
        map = new google.maps.Map(document.getElementById('map'), {
          zoom: 14,
          center: new google.maps.LatLng(19.2311932,-103.7243722),
          mapTypeId: google.maps.MapTypeId.TERRAIN
        });
		///LINEAS
        lineas = new google.maps.Polyline({
		  strokeOpacity: 1.0,
		  strokeWeight: 3
		});

		lineas.setMap(map);
		///
		///POLIGONOS
		var poligono_rojo = [
	      	{lng:-103.7622845519235, lat:19.27728818101545},
			{lng:-103.7594471393462, lat:19.28453782668122},
			{lng:-103.7600689733687, lat:19.2847230585154},
			{lng:-103.7617138556641, lat:19.28519161155681},
			{lng:-103.7661670714928, lat:19.27878708689471},
			{lng:-103.7622845519235, lat:19.27728818101545}
	  	];
		var poligono_topo = [
			{lng:-103.7582223197829, lat:19.2591777172012},
			{lng:-103.7535442778761, lat:19.25686571757021},
			{lng:-103.747595166954, lat:19.27090231483719},
			{lng:-103.7517186254479, lat:19.27310238220198},
			{lng:-103.7582223197829, lat:19.2591777172012}
	    ];

	    var poligono_pablo = [
			{lng:-103.7624535805809,lat:19.25009500071512},
			{lng:-103.7583027630203,lat:19.24490545448732},
			{lng:-103.7537921345323,lat:19.25663645873225},
			{lng:-103.7584721660784,lat:19.25884117507363},
			{lng:-103.7624535805809,lat:19.25009500071512}
	    ];


 
		poligonos.push(poligono_rojo,poligono_topo) // los dos poligonos pertenecen al mismo grupo

		  // Construct the polygon.
		polig_rojo = new google.maps.Polygon({
		    paths: poligonos,
		    strokeColor: '#FF0000',
		    strokeOpacity: 0.8,
		    strokeWeight: 3,
		    fillColor: '#FF0000',
		    fillOpacity: 0.35
		});
		
		var polig_amarillo = new google.maps.Polygon({
		    paths: poligono_pablo,
		    strokeColor: '#000FFF',
		    strokeOpacity: 0.8,
		    strokeWeight: 3,
		    fillColor: '#000FFF',
		    fillOpacity: 0.35
		});

		polig_rojo.setMap(map);

		polig_rojo.addListener('click', showArrays);

		polig_amarillo.setMap(map);

		polig_amarillo.addListener('click', showArrays);
		infoWindow = new google.maps.InfoWindow;

		function showArrays(event) {
		// Since this polygon has only one path, we can call getPath() to return the
		// MVCArray of LatLngs.
		var vertices = this.getPath();

		var contentString = '<b>POLIGONO X</b><br>' +
		      'valor del punto clic: <br>' + event.latLng.lat() + ',' + event.latLng.lng() +
		      '<br>';

		  // Iterate over the vertices.
		for (var i =0; i < vertices.getLength(); i++) {
			  var xy = vertices.getAt(i);
		    	contentString += '<br>' + 'Coordenadas marco del poligono' + i + ':<br>' + xy.lat() + ',' +
		        xy.lng();
		}

		// Replace the info window's content and position.
		infoWindow.setContent(contentString+"<br><h5>PUNTOS DEL TRACK DENTRO DEL POLIGONO: ?</h5>");
		infoWindow.setPosition(event.latLng);

		infoWindow.open(map);

		}

		///
		///
      }

  ////////////////////////////////////////////////////////////////////

      function addMarker(id) 
      {

      	var latLng;
      	var path_ = lineas.getPath();
	      $.ajax({
			url:'resources/get_geoinfo.php',
			type:'post',
			data:{"id":id},
			dataType:'json',
			success: function(data){
				
				deleteMarkers();
	    		path_.clear();
	    		
	    		var color="#"+((1<<24)*Math.random()|0).toString(16);
				for (var i = 0; i < data.length; i++) {
					if(data[i].latitud!="" && data[i].longitud!="")
					latLng= new google.maps.LatLng(data[i].latitud,data[i].longitud);	
					
					var marker = new google.maps.Marker({
				   	 position: latLng,
				   	 map: map,
				   	 icon:'http://maps.google.com/mapfiles/kml/shapes/placemark_circle_highlight.png'
				  	});
				  	markers.push(marker);

				  	lineas.setOptions({strokeColor:color});	
				  	
				  	path_.push(latLng);
				}

				get_datos_tabla(id);
			}
		  }); //fin ajax
	  }

	  function deleteMarkers() {
		 
		  clearMarkers();
		  markers = [];
	  }

	  // Sets the map on all markers in the array.
	  function setMapOnAll(map) {
		for (var i = 0; i < markers.length; i++) {
		    markers[i].setMap(map);
		}
	  }
	  
	  // Removes the markers from the map, but keeps them in the array.
	  function clearMarkers() {
		  setMapOnAll(null);
	  }
									
	 
	  $(document).on('click', '.agrega_puntos', function(e){
		e.preventDefault();
		
	   var id_=$(this).attr("id");
        id=id_;
		$("#span_id_elegido").html("IDENTIFICADOR: "+id_);

		addMarker(id);

	  })    
   

      initialize();
      
      addMarker(-1);

var app = {
  inicio: function() {
    this.iniciaFastClick();

  },

  iniciaFastClick: function () {
    FastClick.attach(document.body);
  },

  dispositivoListo: function(){
    //navigator.geolocation.getCurrentPosition(app.pintaCoordenadasEnMapa, app.errorAlSolicitarLocalizacion);


    // Options: throw an error if no update is received every 3 seconds.
    //
    var watchID =navigator.geolocation.watchPosition(app.pintaCoordenadasEnMapa, app.errorAlSolicitarLocalizacion, { timeout: 1000, enableHighAccuracy: true });
  },
  
  // geolocationSuccess Callback
  //   This method accepts a `Position` object, which contains
  //   the current GPS coordinates
  //
  /*geolocationSuccess: function(position) {
    app.pintaCoordenadasEnMapa(position);
  },*/


  pintaCoordenadasEnMapa: function(position){
    var miMapa = L.map('map').setView([position.coords.latitude, position.coords.longitude], 13);

    L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZ29vdHlmZXIiLCJhIjoiY2l1MGlrb2M3MDAwMDJ6bXAxY3dlOXdkYiJ9.RBfUsuzHfLrofEyMR8IVlA', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18
    }).addTo(miMapa);

    //Añadimos icono personalizado
    var LeafIcon = L.Icon.extend({
        options: {
            shadowUrl: './img/leaf-shadow.png',
            iconSize:     [38, 95],
            shadowSize:   [50, 64],
            iconAnchor:   [22, 94],
            shadowAnchor: [4, 62],
            popupAnchor:  [-3, -76]
        }
    });
    var greenIcon = new LeafIcon({iconUrl: './img/leaf-green.png'});
    L.marker([41.65, -4.71], {icon: greenIcon}).addTo(miMapa).bindPopup("Hola Luis");

    //Añadimos circulo personalizado
    var circle = L.circle([position.coords.latitude, position.coords.longitude], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 1000
    }).addTo(miMapa);

    app.pintaMarcador([position.coords.latitude, position.coords.longitude], '¡Estoy aquí!', miMapa);

    miMapa.on('click', function(evento){
      var texto = 'Marcador en l(' + evento.latlng.lat.toFixed(2) + ') y L(' + evento.latlng.lng.toFixed(2) + ')';
      app.pintaMarcador(evento.latlng, texto, miMapa);
    });
  },

  pintaMarcador: function(latlng, texto, mapa){
    var marcador = L.marker(latlng).addTo(mapa);
    marcador.bindPopup(texto).openPopup();
  },

  // geolocationError Callback receives a PositionError object
  //
  errorAlSolicitarLocalizacion: function(error){
    console.log(error.code + ': ' + error.message);
    navigator.geolocation.clearWatch(watchID);

  }

};

if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function() {
    app.inicio();
  }, false);
  document.addEventListener('deviceready', function() {
    app.dispositivoListo();
  }, false);
}

//make connection

var socket = io.connect('http://localhost:4000');
console.log("u skripti");

//inicijalizacija mape
var map = L.map('mapid').setView([ 45.7859482,15.9531818], 13);
var bounds_group = new L.featureGroup([]);
function setBounds() {
}
L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
maxZoom: 18,
minZoom: 13,
attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
    '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
    'Imagery © <a href="http://mapbox.com">Mapbox</a>',
id: 'examples.map-i86knfo3'
}).addTo(map);

//ikona za user position
var covjek = L.icon({
    iconUrl: 'covjek.png',

    iconSize:     [27, 45], // size of the icon
    shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [18, 45], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

//funkcija za pronalazak usera
var covjek = L.icon({
    iconUrl: 'covjek.png',

    iconSize:     [27, 45], // size of the icon
    shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [18, 45], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

var markerCovjek = L.marker([0,0], {icon:covjek}).bindPopup('Vaša pozicija');
var stateChangingButton = L.easyButton({
    states: [{
            stateName: 'aktivno',
            icon:      'fa-bullseye',
            title:     'Pronađi me !',
            onClick: function(btn, map) {
                map.locate({setView: true, watch: true})
                .on('locationfound', function(e){
                latlng = L.latLng([e.latitude, e.longitude]);
                markerCovjek.setLatLng(latlng);
                map.addLayer(markerCovjek);
                });
                btn.state('neaktivno');    // change state on click!
            }
        }, {
            stateName: 'neaktivno',
            icon:      'fa-user-times',
            title:     'Makni lokaciju',
            onClick: function(btn, map) {
                map.stopLocate();
                markerCovjek.remove();
                btn.state('aktivno');
            }
    }]
});
stateChangingButton.addTo(map);



//layeri za linije
function style_etiri_11_0() {//cetvorka sm-dubec
         return {
             pane: 'pane_etiri_11',
             opacity: 0.5,
             color: 'rgba(232,113,141,1.0)',
             dashArray: '',
             lineCap: 'square',
             lineJoin: 'bevel',
             weight: 5.0,
             fillOpacity: 0,
         }
     }
     map.createPane('pane_etiri_11');
     map.getPane('pane_etiri_11').style.zIndex = 411;
     map.getPane('pane_etiri_11').style['mix-blend-mode'] = 'normal';
     var layer_etiri_11 = new L.geoJson(json_etiri_11, {
         attribution: '',
         pane: 'pane_etiri_11',
         onEachFeature: pop_etiri_11,
         style: style_etiri_11_0,
     });
     bounds_group.addLayer(layer_etiri_11);
     map.addLayer(layer_etiri_11);

     function pop_etiri_11(feature, layer) {
         var popupContent = "Tramvaj 4 => Savski most - Dubec";
         layer.bindPopup(popupContent, {maxHeight: 400});
     }

     function style_etiri2_10_0() {//cetvorka dubec-sm
                 return {
                     pane: 'pane_etiri2_10',
                     opacity: 0.5,
                     color: 'rgba(245,143,169,1.0)',
                     dashArray: '',
                     lineCap: 'square',
                     lineJoin: 'bevel',
                     weight: 5.0,
                     fillOpacity: 0,
                 }
             }
             map.createPane('pane_etiri2_10');
             map.getPane('pane_etiri2_10').style.zIndex = 410;
             map.getPane('pane_etiri2_10').style['mix-blend-mode'] = 'normal';
             var layer_etiri2_10 = new L.geoJson(json_etiri2_10, {
                 attribution: '',
                 pane: 'pane_etiri2_10',
                 onEachFeature: pop_etiri2_10,
                 style: style_etiri2_10_0,
             });
             bounds_group.addLayer(layer_etiri2_10);
             map.addLayer(layer_etiri2_10);

             function pop_etiri2_10(feature, layer) {
                  var popupContent = "Tramvaj 4 => Dubec - Savski most";
                  layer.bindPopup(popupContent, {maxHeight: 400});
              }

              function pop_Osam_3(feature, layer) {
                  var popupContent = "Tramvaj 8 => Zapruđe - Mihaljevac";
                  layer.bindPopup(popupContent, {maxHeight: 400});
              }
        function style_Osam_3_0() {
             return {
                 pane: 'pane_Osam_3',
                 opacity:0.5,
                 color: 'rgba(0,254,254,1.0)',
                 dashArray: '',
                 lineCap: 'square',
                 lineJoin: 'bevel',
                 weight: 5.0,
                 fillOpacity: 0,
             }
         }
         map.createPane('pane_Osam_3');
         map.getPane('pane_Osam_3').style.zIndex = 403;
         map.getPane('pane_Osam_3').style['mix-blend-mode'] = 'normal';
         var layer_Osam_3 = new L.geoJson(json_Osam_3, {
             attribution: '',
             pane: 'pane_Osam_3',
             onEachFeature: pop_Osam_3,
             style: style_Osam_3_0,
         });
         bounds_group.addLayer(layer_Osam_3);
         map.addLayer(layer_Osam_3);


         function pop_osam2_1(feature, layer) {
             var popupContent = "Tramvaj 8 => Mihaljevac - Zapruđe";
             layer.bindPopup(popupContent, {maxHeight: 400});
         }

        function style_osam2_1_0() {
            return {
                pane: 'pane_osam2_1',
                opacity: 1,
                color: 'rgba(45,179,155,1.0)',
                dashArray: '',
                lineCap: 'square',
                lineJoin: 'bevel',
                weight: 5.0,
                fillOpacity: 0,
            }
        }
        map.createPane('pane_osam2_1');
        map.getPane('pane_osam2_1').style.zIndex = 401;
        map.getPane('pane_osam2_1').style['mix-blend-mode'] = 'normal';
        var layer_osam2_1 = new L.geoJson(json_osam2_1, {
            attribution: '',
            pane: 'pane_osam2_1',
            onEachFeature: pop_osam2_1,
            style: style_osam2_1_0,
        });
        bounds_group.addLayer(layer_osam2_1);
        map.addLayer(layer_osam2_1);
        var baseMaps = {};
//stanice

function pop_stanice_1(feature, layer) {
            var popupContent = "Stanica: " + feature.properties['name'];
            layer.bindPopup(popupContent, {maxHeight: 400});
        }

        function style_stanice_1_0() {
            return {
                pane: 'pane_stanice_1',
                radius: 4.0,
                opacity: 1,
                color: 'rgba(35,35,35,1.0)',
                dashArray: '',
                lineCap: 'butt',
                lineJoin: 'miter',
                weight: 1,
                fill: true,
                fillOpacity: 1,
                fillColor: 'rgba(0,0,0,1.0)',
            }
        }
        map.createPane('pane_stanice_1');
        map.getPane('pane_stanice_1').style.zIndex = 412;
        map.getPane('pane_stanice_1').style['mix-blend-mode'] = 'normal';
        var layer_stanice_1 = new L.geoJson(json_stanice_1, {
            attribution: '',
            pane: 'pane_stanice_1',
            onEachFeature: pop_stanice_1,
            pointToLayer: function (feature, latlng) {
                var context = {
                    feature: feature,
                    variables: {}
                };
                return L.circleMarker(latlng, style_stanice_1_0(feature));
            },
        });
        bounds_group.addLayer(layer_stanice_1);
        map.addLayer(layer_stanice_1);
        var baseMaps = {};

        function pop_staniceosam2_1(feature, layer) {
                    var popupContent =
                             "Stanica: " + feature.properties['name'];
                    layer.bindPopup(popupContent, {maxHeight: 400});
                }

                function style_staniceosam2_1_0() {
                    return {
                        pane: 'pane_staniceosam2_1',
                        radius: 4.0,
                        opacity: 1,
                        color: 'rgba(35,35,35,1.0)',
                        dashArray: '',
                        lineCap: 'butt',
                        lineJoin: 'miter',
                        weight: 1,
                        fill: true,
                        fillOpacity: 1,
                        fillColor: 'rgba(0,0,0,1.0)',
                    }
                }
                map.createPane('pane_staniceosam2_1');
                map.getPane('pane_staniceosam2_1').style.zIndex = 412;
                map.getPane('pane_staniceosam2_1').style['mix-blend-mode'] = 'normal';
                var layer_staniceosam2_1 = new L.geoJson(json_staniceosam2_1, {
                    attribution: '',
                    pane: 'pane_staniceosam2_1',
                    onEachFeature: pop_staniceosam2_1,
                    pointToLayer: function (feature, latlng) {
                        var context = {
                            feature: feature,
                            variables: {}
                        };
                        return L.circleMarker(latlng, style_staniceosam2_1_0(feature));
                    },
                });
                bounds_group.addLayer(layer_staniceosam2_1);
                map.addLayer(layer_staniceosam2_1);
                var baseMaps = {};

                function pop_stanicecetiri1_1(feature, layer) {
            var popupContent =
                      "Stanica: " + feature.properties['name'];
            layer.bindPopup(popupContent, {maxHeight: 400});
        }

        function style_stanicecetiri1_1_0() {
            return {
                pane: 'pane_stanicecetiri1_1',
                radius: 4.0,
                opacity: 1,
                color: 'rgba(35,35,35,1.0)',
                dashArray: '',
                lineCap: 'butt',
                lineJoin: 'miter',
                weight: 1,
                fill: true,
                fillOpacity: 1,
                fillColor: 'rgba(0,1,2,1.0)',
            }
        }
        map.createPane('pane_stanicecetiri1_1');
        map.getPane('pane_stanicecetiri1_1').style.zIndex = 412;
        map.getPane('pane_stanicecetiri1_1').style['mix-blend-mode'] = 'normal';
        var layer_stanicecetiri1_1 = new L.geoJson(json_stanicecetiri1_1, {
            attribution: '',
            pane: 'pane_stanicecetiri1_1',
            onEachFeature: pop_stanicecetiri1_1,
            pointToLayer: function (feature, latlng) {
                var context = {
                    feature: feature,
                    variables: {}
                };
                return L.circleMarker(latlng, style_stanicecetiri1_1_0(feature));
            },
        });
        bounds_group.addLayer(layer_stanicecetiri1_1);
        map.addLayer(layer_stanicecetiri1_1);
        var baseMaps = {};

        function pop_stanicecetiri2_1(feature, layer) {
            var popupContent =
                       "Stanica: "+ feature.properties['name'];
            layer.bindPopup(popupContent, {maxHeight: 400});
        }

        function style_stanicecetiri2_1_0() {
            return {
                pane: 'pane_stanicecetiri2_1',
                radius: 4.0,
                opacity: 1,
                color: 'rgba(35,35,35,1.0)',
                dashArray: '',
                lineCap: 'butt',
                lineJoin: 'miter',
                weight: 1,
                fill: true,
                fillOpacity: 1,
                fillColor: 'rgba(0,1,2,1.0)',
            }
        }
        map.createPane('pane_stanicecetiri2_1');
        map.getPane('pane_stanicecetiri2_1').style.zIndex = 412;
        map.getPane('pane_stanicecetiri2_1').style['mix-blend-mode'] = 'normal';
        var layer_stanicecetiri2_1 = new L.geoJson(json_stanicecetiri2_1, {
            attribution: '',
            pane: 'pane_stanicecetiri2_1',
            onEachFeature: pop_stanicecetiri2_1,
            pointToLayer: function (feature, latlng) {
                var context = {
                    feature: feature,
                    variables: {}
                };
                return L.circleMarker(latlng, style_stanicecetiri2_1_0(feature));
            },
        });
        bounds_group.addLayer(layer_stanicecetiri2_1);
        map.addLayer(layer_stanicecetiri2_1);
        var baseMaps = {};

//ikone
var slika4 = L.icon({
    iconUrl: 'marker4.png',

    iconSize:     [45, 45], // size of the icon
    shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [22, 44], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

var slika8 = L.icon({
    iconUrl: 'marker8.png',

    iconSize:     [45, 45], // size of the icon
    shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [22, 44], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

var slika21 = L.icon({
    iconUrl: 'marker4.png',

    iconSize:     [45,45 ], // size of the icon
    shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [22, 44], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

var slika25 = L.icon({
    iconUrl: 'marker8.png',

    iconSize:     [45, 45], // size of the icon
    shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [22, 44], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

var markeri = {
  cetiri1 : [],
  cetiri2 : [],
  osam1 : [],
  osam2 : []
}
var layeri = {
  cetiri1 :  L.featureGroup([layer_etiri_11, layer_stanicecetiri1_1]),
  cetiri2 : L.featureGroup([layer_etiri2_10, layer_stanicecetiri2_1]),
  osam1 : L.featureGroup([layer_Osam_3, layer_stanice_1]),
  osam2 : L.featureGroup([layer_osam2_1, layer_staniceosam2_1])
};



var baseMaps = {};
L.control.layers(baseMaps,{'<img src="legend/etiri_11.png" /> 4 => Savski most - Dubec': layeri.cetiri1, '<img src="legend/etiri2_10.png" /> 4 => Dubec - Savski most': layeri.cetiri2,
                            '<img src="legend/Osam_3.png" /> 8 => Zapruđe - Mihaljevac': layeri.osam1, '<img src = "legend/osam2_1.png"/> 8 => Mihaljevac - Zapruđe' : layeri.osam2 }).addTo(map),
setBounds();

socket.on('pocetak',function(koordinateLinija) {
  if (koordinateLinija.cetiri1.length == 0 && koordinateLinija.cetiri2.length == 0 && koordinateLinija.osam1.length == 0 && koordinateLinija.osam2.length == 0)
    return;


  for (var key in koordinateLinija) {
    if (koordinateLinija.hasOwnProperty(key)) {
      for (i = 0;i<koordinateLinija[key].length;i++) {
        if (key == "cetiri1") {
          marker = L.marker(koordinateLinija[key][i],{icon: slika4}).bindPopup("Tramvaj 4 => Savski most - Dubec").addTo(map);
        }
        if (key == "cetiri2") {
          marker = L.marker(koordinateLinija[key][i],{icon: slika4}).bindPopup("Tramvaj 4 => Dubec - Savski most").addTo(map);
        }
        if(key == "osam1") {
          marker = L.marker(koordinateLinija[key][i],{icon: slika8}).bindPopup("Tramvaj 8 => Zapruđe - Mihaljevac").addTo(map);
        }
        if (key == "osam2") {
          marker = L.marker(koordinateLinija[key][i],{icon: slika8}).bindPopup("Tramvaj 8 => Mihaljevac - Zapruđe").addTo(map);
        }
        markeri[key].push(marker);
        layeri[key].addLayer(marker);
      }
    }
  }


    for (var key in koordinateLinija) {
      if (koordinateLinija.hasOwnProperty(key)) {
      console.log(koordinateLinija[key].length);
      if (koordinateLinija[key].length) {
      if (koordinateLinija[key][0][2] == true) {
            layeri[key].removeLayer(markeri[key][0]);
            markeri[key][0].removeFrom(map);
            markeri[key].splice(0,1);
          }
        }
      }
  }

});

//listen for events
socket.on('myData',function(koordinateLinija) {
//console.log(koordinateLinija);
for(var key in koordinateLinija){
  console.log(key + " : " + koordinateLinija[key]);
}
if (koordinateLinija.cetiri1.length == 0 && koordinateLinija.cetiri2.length == 0 && koordinateLinija.osam1.length == 0 && koordinateLinija.osam2.length)
  return;


for (var key in koordinateLinija) {
  if (koordinateLinija.hasOwnProperty(key)) {
    if(koordinateLinija[key].length>markeri[key].length) {
      if (key == "cetiri1")
        marker = L.marker(koordinateLinija[key][koordinateLinija[key].length-1],{icon: slika4}).bindPopup("Tramvaj 4 => Savski most - Dubec").addTo(map);
      if (key == "cetiri2")
        marker = L.marker(koordinateLinija[key][koordinateLinija[key].length-1],{icon: slika21}).bindPopup("Tramvaj 4 => Dubec - Savski most").addTo(map);
      if(key == "osam1")
        marker = L.marker(koordinateLinija[key][koordinateLinija[key].length-1],{icon: slika8}).bindPopup("Tramvaj 8 => Zapruđe - Mihaljevac").addTo(map);
      if(key == "osam2")
        marker = L.marker(koordinateLinija[key][koordinateLinija[key].length-1],{icon: slika25}).bindPopup("Tramvaj 8 => Mihaljevac - Zapruđe").addTo(map);
      markeri[key].push(marker);
      layeri[key].addLayer(marker);
    }
  }
}



  for (var key in markeri) {
    if (markeri.hasOwnProperty(key)) {
      for(i = 0;i<markeri[key].length;i++) {
        marker = markeri[key][i];
        var latlng = L.latLng(koordinateLinija[key][i]);
        marker.slideTo(	latlng, {
        duration: 2000,
        keepAtCenter: false
      });
    }
  }
}


  for (var key in koordinateLinija) {
    if (koordinateLinija.hasOwnProperty(key)) {
    if (koordinateLinija[key].length) {
    if (koordinateLinija[key][0][2] == true) {//je li koordinata zadnja koordinata rute
          layeri[key].removeLayer(markeri[key][0]);
          markeri[key][0].removeFrom(map);
          markeri[key].splice(0,1);
        }
      }
    }
}


  });

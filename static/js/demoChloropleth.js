// Chloropleth over time

//console.log("Hi")
var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
});

var demoMap = L.map('demoMap', {
  center: [41.8781, -87.6298],
  zoom: 12,
  layers: [streetmap],
  'messagebox': true
});
demoMap.messagebox.options.timeout=5000;
grabGeoJSON();
demo_updateMap(2010);

var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 10, 25, 40, 55, 70, 85, 100],
        labels = [];
    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};

legend.addTo(demoMap);


// Initialize the chloropleth 
function parseGeoJSON(featureCollection) {
  var features = featureCollection.features;
  for (var i = 0; i < features.length; i++) {
    var feature = features[i];
    var geoJsonLayer = L.geoJSON(feature, {
      style: function (feature) {
        return {color: '#000000',
                weight: 1,
                opacity: 0.8}
      }
    }).addTo(demoMap);
    geoJsonLayer.eachLayer(function (layer) {
      layer._path.id = feature.properties.name10;
    });
  }
};

function grabGeoJSON(response) {
  var geoJSON = '/censustracts';
  d3.json(geoJSON, parseGeoJSON)
}

function getColor(d) {
  return d > 100 ? '#ff0000' :
         d > 85  ? '#ff4b00' :
         d > 70  ? '#ff6e00' :
         d > 55  ? '#ff8a00' :
         d > 40  ? '#ffa200' :
         d > 25  ? '#ffba00' :
         d > 10  ? '#ffd100' :
                   '#ffe900' ;
}

function demo_jsonCallback(response) {
  for (var i = 0; i < response.length; i++) {
    var _tract = response[i];
    var tract_id = _tract['Census Tract']
    var pcnt_white = _tract['% White']
    var path = document.getElementById(tract_id)
    if (path) {
      path.setAttribute('fill', getColor(pcnt_white));
      path.setAttribute('fill-opacity', 0.7);
    };
    };
};

function demo_updateMap(yearint) {
  var dataSource = `/demographics/${yearint}`;
  d3.json(dataSource, demo_jsonCallback);
};
// Declare initial global variable to track map update
update_counter1 = 0;


L.control.liveupdate ({
  update_map: function() {
    var year_array1 = ['2010','2011','2012','2013','2014','2015','2016'];
    var current_year1 = year_array1[update_counter1];
    if (update_counter1) {
      demoMap.messagebox.show(`The current year displayed is: ${current_year1}`)
    }
    console.log(`Now displaying data for year ${current_year1}`)
    demo_updateMap(current_year1);
    update_counter1 += 1;
    if (update_counter1 === year_array1.length) {
      update_counter1 = 0;
      console.log("WE ROLLIN OVER!");
    }
  },
  position: 'topleft',
  interval: 5000
}).addTo(demoMap).startUpdating();

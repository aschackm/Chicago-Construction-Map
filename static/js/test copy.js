// Map of TIF Projects and Boundaries

// Store our API endpoint inside queryUrl
var projectData = "../data/tifProjects.geojson";
// Perform a GET request to the query URL
d3.json("/tifdata", function(data) {
  // Once we get a response, send the data.features object to the createFeatures function
  tifProjects = createFeatures(data.features);
  console.log(tifProjects)
  // data.features.map(dt => {
  //   if(dt.geometry.coordinates.length == 2)  
  //     console.log(dt.geometry);
  // });
  createMap(tifProjects);
});


function createFeatures(tifData) {
  tifProjects = L.geoJSON(tifData.feature, {
      pointToLayer: function (feature, latlng) {
          return new L.circleMarker(latlng, {
            radius: 5*(Math.log10(feature.properties.APPROVED_AMOUNT)),
            fillColor: "red",
            color: "black",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.8
          })
      },
      onEachFeature: function (feature, layer) {
          layer.bindPopup(`<h3> ${feature.properties.PROJECT_NAME} </h3><h4> ${feature.properties.APPROVED_AMOUNT} </h4><hr><p> ${feature.properties.PROJECT_DESCRIPTION} </p>`);
      }
});
return tifProjects;
}


function createMap(tifProjects) {
  //var sliderControl = null
  // Define streetmap and darkmap layers
  var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  });
  // Define a baseMap object to hold our base layers
  var baseMap = {"Street Map": streetmap};

  // Create overlay object to hold our overlay layer
  var overlayMaps = {"TIF Projects": tifProjects};

  // Create our map, giving it the streetmap and tifProjects layers to display on load
  var myMap = L.map("permitMap", {
    center: [41.8781, -87.6298],
    zoom: 10,
    layers: [streetmap,tifProjects]
  });

  // Create a layer control
  // Pass in our baseMap and overlayMaps
  // Add the layer control to the map
  L.control.layers(baseMap, overlayMaps, {
    collapsed: false
  }).addTo(myMap);


  // sliderControl = L.control.sliderControl({position: "topright", layer: overlayMaps});
  // // add slider to map
  // myMap.addControl(sliderControl);
  // // initialize slider
  // sliderControl.startSlider();

};
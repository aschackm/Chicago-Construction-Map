// Map of TIF Projects and Boundaries

// Parsing  Project Data
tifData = "../data/tifProjects.geojson"  /* INSERT FLASK JSON HERE */
d3.json(tifData, function(data) {
  createProjectFeatures(data.features);
});
// Parsing  Boundary Data
boundData = "../data/tif_boundaries.geojson"  /* INSERT FLASK JSON HERE */
d3.json(boundData, function(data) {
  createBoundaryFeatures(data.features);
});

// Binding popups, adding markers, calling create map function
function createProjectFeatures(tifData) {

  function onEachFeature(feature, layer) {
    layer.bindPopup(`<h3> ${feature.properties.PROJECT_NAME} </h3><h4> ${feature.properties.APPROVED_AMOUNT} </h4><hr><p> ${feature.properties.PROJECT_DESCRIPTION} </p>`);
  }

  var projects = L.geoJSON(tifData, {
    onEachFeature: onEachFeature
  });

  markers.addLayer(projects);
  
  createMap(projects);
};
// Binding popups, adding polygons, calling create map function
function createBoundaryFeatures(boundData) {

  function onEachFeature(feature, layer) {
    layer.bindPopup(`<h3> ${feature.properties.name} </h3>`);
  }

  var boundaries = L.geoJSON(boundData, {
    onEachFeature: onEachFeature
  });

  markers.addLayer(boundaries); /* THIS IS MOST LIKEY WRONG */
  createMap(boundaries); /* NOT SURE IF THIS SHOULS BE CALLED AGAIN */
};

function createMap(projects, boundaries) {

  // Define streetmap and darkmap layers
  var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.dark",
    accessToken: API_KEY
  });

  // Define a baseMaps object to hold our base layers
  var baseMaps = {
    "Street Map": streetmap,
    "Dark Map": darkmap
  };

  var overlayMaps = {
    Projects: projects, 
    Boundaries: boundaries
  };

  var myMap = L.map("map", {
    center: [41.8781, -87.6298],
    zoom: 13,
    layers: [streetmap, projects]
  })};

// STILL NEEDS HEATMAP AND SLIDER




// L.heatLayer(latlngs, options)

// tifProjects = tifData.map(function (p) { return [p[1], p[2]]; });
// var a=L.heatLayer(tifProjects,{max: getCost(tifData,’Median Annual Household Income’), minOpacity: 0.05,
// maxZoom: 18,
// radius: 25,
// blur: 15,
// gradient: {
// 0.2: ‘green’,
// 0.60: ‘yellow’,
// 1.0: ‘red’},maxZoom:14}).addTo(map);



// var marker = L.circle(locations, { opacity: 0.01 }).bindTooltip(income+”,”+name , {className: ‘myCSSClass’}).addTo(map);
// }


// var myMap = L.map('map', {
//     center: [41.8781, -87.6298],
//     zoom: 13
//   });
  
//   L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
//     attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
//     maxZoom: 18,
//     id: 'mapbox.streets',
//     accessToken: API_KEY
//   }).addTo(myMap);



// for (var i = 0; i < tifData.length; i++) {
//   var a = tifData[i];
//   var name=a[0];
//   var income=a[3];
//   }
  
  
//   var maximum;
//   function getCost(arr, prop) {
//   for (var i=0 ; i<tifData.length ; i++) {
//   if (!maximum || parseInt(tifData[i][prop]) > parseInt(maximum[prop]))
//   maximum = tifData[i];
//   }
//   return maximum;
//   }
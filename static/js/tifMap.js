dataSource = "/tifdata";
d3.json(dataSource, function(data) {
  createProjectMarkers(data["features"]);
  //console.log(data);
});

function createProjectMarkers(dataStuffs) {
  var marker_array = [];
  var _Map = createMap();
  dataStuffs.forEach(function(feature) {
    //console.log(feature)
    
      var lon = feature.geometry.coordinates[0];
      var lat = feature.geometry.coordinates[1];
      //console.log(lon);

  //     try{
         var latLng = L.latLng(lat,lon);
  //     }
  //     catch(e) {console.log("skipping over nans");
  //       return;
  //     };
       //console.log(latLng);
      var Cost = parseInt(feature.properties.APPROVED_AMOUNT);
      var logCost = Math.log10(Cost);
      var costRadius = (Math.pow(logCost,2))*.25
      //console.log(costRadius);
      var marker = L.circleMarker(latLng, {
        radius: costRadius,
        fillColor: "red",
        color: "black",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
      });
      marker.bindPopup(`<h3> ${feature.properties.PROJECT_NAME} </h3><h4> Approved for $${feature.properties.APPROVED_AMOUNT} </h4><hr><p> ${feature.properties.PROJECT_DESCRIPTION} </p>`,{'maxHeight':'250'});
      marker_array.push(marker);
  L.featureGroup(marker_array).addTo(_Map);
  })};


  function createMap(projects) {

    // Define streetmap and darkmap layers
  
    var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 18,
      id: "mapbox.streets",
      accessToken: API_KEY
    });
  
    var myMap = L.map("tifMap", {
      center: [41.8781, -87.6298],
      zoom: 13,
      layers: [streetmap]
    })
    return myMap
  };

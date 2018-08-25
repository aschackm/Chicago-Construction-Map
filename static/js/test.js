// Map of Building Permits

console.log("Hi")

var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
});

var permitMap = L.map('permitMap', {
  center: [41.8781, -87.6298],
  zoom: 12,
  layers: [streetmap]
});

var dataSource = "/building_permits/08";

window.setTimeout(d3.json(dataSource, function(response){
  //console.log(response);
    var heatArray = [];
    for (var i = 0; i < response.length; i++) {
      var location = response[i]
      if (location) {
        heatArray.push([location.LATITUDE, location.LONGITUDE])
      }
    }
    console.log(heatArray);
    var heat = L.heatLayer(heatArray, {
      radius: 20,
      blur: 35
    }).addTo(permitMap)
  }),
  1000);
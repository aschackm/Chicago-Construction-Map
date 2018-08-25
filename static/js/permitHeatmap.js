// Map of Building Permits

console.log("Hi")
var heat;
var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
});

var permitMap = L.map('permitMap', {
  center: [41.8781, -87.6298],
  zoom: 12,
  layers: [streetmap],
  'messagebox': true
});
permitMap.messagebox.options.timeout=5000;
// Initialize the heatmap by calling udpateMap with the first year's value
updateMap('06');

function jsonCallback(response) {
  if (heat) {
    heat.remove();
  }
  var heatArray = [];
    for (var i = 0; i < response.length; i++) {
      var location = response[i]
      if (location) {heatArray.push([location.LATITUDE, location.LONGITUDE])}
    };
    heat = L.heatLayer(heatArray, {
      radius: 20,
      blur: 35
    });
    heat.addTo(permitMap);
};

function updateMap(yearint) {
  var dataSource = `/building_permits/${yearint}`;
  d3.json(dataSource, jsonCallback);
};
// Declare initial global variable to track map update
update_counter = 0;


L.control.liveupdate ({
  update_map: function() {
    var year_array = ['06','07','08','09','10','11','12','13','14','15','16','17'];
    var current_year = year_array[update_counter];
    if (update_counter) {
      permitMap.messagebox.show(`The current year displayed is: 20${current_year}`)
    }
    console.log(`Now displaying data for year 20${current_year}`)
    updateMap(current_year);
    update_counter += 1;
    if (update_counter === year_array.length) {
      update_counter = 0;
      console.log("WE ROLLIN OVER!");
    }
  },
  position: 'topleft',
  interval: 5000
}).addTo(permitMap).startUpdating();

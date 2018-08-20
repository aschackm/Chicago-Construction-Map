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



  
  // var tifProjects = omnivore.csv('../data/tif_projects.csv');
  
  // d3.json(tifProjects, function(response){
  
  //   console.log(response);
  
  //   var heatArray = [];
  
  //   for (var i = 0; i < response.length; i++) {
  //     var location = response[i].location;
  
  //     if (location) {
  //       heatArray.push([location.latitude, location.longitude])
  //     }
  //   }
  
  //   var heat = L.heatLayer(heatArray, {
  //     radius: 20,
  //     blur: 35
  //   }).addTo(myMap)
  
  // });

  // L.mapbox.accessToken = "pk.eyJ1Ijoia3VsaW5pIiwiYSI6ImNpeWN6bjJ0NjAwcGYzMnJzOWdoNXNqbnEifQ.jEzGgLAwQnZCv9rA6UTfxQ";
  // var map = L.mapbox.map('map', 'mapbox.streets')
  //     .setView([41.8781, -87.6298], 13);


  //     omnivore.csv('../data/tif_projects.csv').addTo(map);
tifData = /* INSERT FLASK JSON HERE */

for (var i = 0; i < tifData.length; i++) {
  var a = tifData[i];
  var name=a[0];
  var income=a[3];
  }
  
  
  var maximum;
  function getMax(arr, prop) {
  for (var i=0 ; i<tifData.length ; i++) {
  if (!maximum || parseInt(tifData[i][prop]) > parseInt(maximum[prop]))
  maximum = tifData[i];
  }
  return maximum;
  }


L.heatLayer(latlngs, options)

addressPoints = tifData.map(function (p) { return [p[1], p[2]]; });
var a=L.heatLayer(addressPoints,{max: getMax(tifData,’Median Annual Household Income’), minOpacity: 0.05,
maxZoom: 18,
radius: 25,
blur: 15,
gradient: {
0.2: ‘green’,
0.60: ‘yellow’,
1.0: ‘red’},maxZoom:14}).addTo(map);



var marker = L.circle(locations, { opacity: 0.01 }).bindTooltip(income+”,”+name , {className: ‘myCSSClass’}).addTo(map);
}
// Set the width and height of the SVG container
const width = 800;
const height = 600;
// HALLOOO Canada is not in the US
// Create an SVG container
const svg = d3.select("#teams_map")
  .attr("width", width)
  .attr("height", height);

// Load the map data (e.g., GeoJSON)
d3.json("https://raw.githubusercontent.com/iamspruce/intro-d3/main/data/countries-110m.geojson").then(function (mapData) {
  // Create a projection
  const projection = d3.geoMercator()
    .fitSize([width, height], mapData);

  // Create a path generator
  const path = d3.geoPath()
    .projection(projection);

  // Draw the map
  svg.selectAll("path")
    .data(mapData.features)
    .enter()
    .append("path")
    .attr("d", path)
    .attr("fill", "lightgray");

  // Draw city points
  svg.selectAll("circle")
    .data(season_2014.teams)
    .enter()
    .append("circle")
    .attr("cx", function (d) {
      return projection([d.longitude, d.latitude])[0];
    })
    .attr("cy", function (d) {
      return projection([d.longitude, d.latitude])[1];
    })
    .attr("r", 5)
    .attr("fill", "red");
});
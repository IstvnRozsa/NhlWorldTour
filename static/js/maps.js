function drawMap() {
    let svgToRemove = d3.select("#teams_map").select("svg");
    svgToRemove.remove();

// Set the width and height of the SVG container
    const width = 500;
    const height = 300;
// Create an SVG container
    const svg = d3.select("#teams_map")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

// Load the map data (e.g., GeoJSON)
    d3.json("https://raw.githubusercontent.com/iamspruce/intro-d3/main/data/countries-110m.geojson").then(function (mapData) {
        // Create a projection

        let projection = d3.geoMercator()
            .center([-80, 45])
            .scale(300)
            .translate([width / 2, (height - 100) / 2]);

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
            .data(selectedSeason.teams)
            .enter()
            .append("circle")
            .attr("cx", function (d) {
                return projection([d.longitude, d.latitude])[0];
            })
            .attr("cy", function (d) {
                return projection([d.longitude, d.latitude])[1];
            })
            .attr("r", 4)
            .attr("fill", "blue")
            .attr("id", function (d) {
                return d.abbreviation;
            })
            .on("mouseover", function (d) {
                handleMouseOver(this.id);
            })
        //.on("mouseover", function (d) {
        // Show city name label
        //console.log(d);
        //console.log(d.target.id);
        //console.log(d.target.classList[0] + " " + d.target.classList[1]);
        //selectTeam(d.target.id);
        //})


    });
    console.log("Draw Map");
}

drawMap();

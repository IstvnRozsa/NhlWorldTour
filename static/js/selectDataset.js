//Default value = the first year
selectedSeason = seasons["seasons"][0];

statistics = Object.keys(selectedSeason.teams[0].teamStats[0].splits[0].stat);

// Do something with the selected value
console.log('Selected season:', selectedSeason);
console.log('Stats:', statistics);

// Get a reference to the combobox element
let combobox = d3.select('#combobox');

// Populate the combobox with values from the list
combobox.selectAll('option')
    .data(seasons["seasons"])
    .enter()
    .append('option')
    .text(function (d) {
        return d.year;
    });

function selectSeasonByYear(objects, year) {
    for (let i = 0; i < objects.length; i++) {
        if (objects[i].year === year) {
            return objects[i];
        }
    }
    return null; // Return null if no match found
}

// Handle the change event of the combobox
combobox.on('change', function () {
    // Get the selected value
    let selectedYear = d3.select(this).property('value');
    selectedSeason = selectSeasonByYear(seasons["seasons"], selectedYear);
    console.log(selectedYear, selectedSeason);
    drawMap();
    drawBarchart();
});

var previousTeam = "Winnipeg Jets";

function selectTeam(team) {
    d3.select("#selected_team")
        .text(team);
    //change the selected points to red
    console.log("circle#" + team);
    var circles = d3.selectAll("circle");
    circles.style("fill", "blue").attr("r", 4);
    let selectedCircle = circles.filter(function (d) {
        return d3.select(this).attr("id") === team;
    });
    selectedCircle.style("fill", "red").attr("r", 10);

    //change the selected bars to red
    var bar = d3.select("#chart");
    bar.selectAll("#" + team).style("fill", "red");
    console.log(bar);

}

function handleMouseOver(id, element) {
    let svg_map = d3.select("#teams_map");
    let svg_chart = d3.select("#chart");

    let circleID = "circle#" + id;
    let rectID = "rect#" + id + ".bar";
    console.log("Circle");
    svg_map.selectAll("circle").style("fill", "green").attr("r", 4);
    svg_map.select(circleID).attr("r", 10).style("fill", "red");

    console.log("rect");
    svg_chart.selectAll(".bar").attr("fill", "blue");
    svg_chart.select(rectID).attr("fill", "red");
}

function handleMouseOut() {
    console.log("Mouse Out")
}
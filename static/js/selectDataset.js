//Default value = the first year
selectedSeason = seasons["seasons"][0];

// Do something with the selected value
console.log('Selected season:', selectedSeason);

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

function handleMouseOver(name, element) {
    let circleID = "circle#" + name;
    let rectID = "rect#" + name + ".bar";
    // if (element.tagName === "rect") {
    //     d3.selectAll(".bar").attr("fill", "blue");
    //     d3.select(element).attr("fill", "red");
    //     console.log("rect");
    //     // d3.selectAll(".bar").attr("fill", "blue");
    // } else if (element.tagName === "circle") {
    //     console.log("Circle");
    //     d3.selectAll("circle").style("fill", "blue").attr("r", 4);
    //     d3.select(element).attr("r", 10).style("fill", "red");
    //
    // }
    console.log("rect");
    console.log(rectID);
    d3.selectAll(".bar").attr("fill", "blue");
    d3.select(element.id).attr("fill", "red");
    console.log("Circle");
    console.log(circleID);
    console.log(element.id);
    d3.selectAll("circle").style("fill", "blue").attr("r", 4);
    d3.select(circleID).attr("r", 10).style("fill", "red");

    // d3.selectAll(".bar").attr("fill", "blue");
    // d3.select(element).attr("fill", "red");
    // console.log(name);


    // var svg = d3.select("#chart")
    // svg.selectAll(".bar").attr("fill", "blue");
    // svg.select("rect.bar#"+name).attr("fill", "red");
    // console.log(name);
}

function handleMouseOut() {
    console.log("Mouse Out")
}
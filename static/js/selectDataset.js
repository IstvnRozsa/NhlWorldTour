//Default value = the first year
selectedSeason = seasons["seasons"][0];

statistics = Object.keys(selectedSeason.teams[0].teamStats[0].splits[0].stat);

// Do something with the selected value
console.log('Selected season:', selectedSeason);

// Get a reference to the combobox element
let combobox = d3.select('#combobox');
let combobox_stats = d3.select('#combobox_stats');

// Populate the combobox with values from the list
combobox.selectAll('option')
    .data(seasons["seasons"])
    .enter()
    .append('option')
    .text(function (d) {
        return d.year;
    });

combobox_stats.selectAll('option')
    .data(statistics)
    .enter()
    .append('option')
    .text(function (d) {
        return d;
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
    drawBarchart2();
});

var previousTeamId = "NJD";
var previousTeam = selectedSeason["teams"].find(function (obj) {
        return obj.abbreviation === previousTeamId;
    });

console.log(previousTeam);


function handleMouseOver(id) {
    var selectedTeam = selectedSeason["teams"].find(function (obj) {
        return obj.abbreviation === id;
    });
    previousTeam = selectedTeam;
    console.log(previousTeam);

    d3.select("#selected_team").text(selectedTeam.name);

    let svg_map = d3.select("#teams_map");
    let svg_ppg_chart = d3.select("#pp_goals_chart");
    let svg_gpg_chart = d3.select("#goals_p_game_chart");

    let circleID = "circle#" + id;
    let rectID = "rect#" + id;

    svg_map.selectAll("circle").style("fill", "blue").attr("r", 4);
    svg_map.select(circleID).attr("r", 10).style("fill", "red");

    svg_ppg_chart.selectAll(".bar").attr("fill", "blue");
    svg_ppg_chart.select(rectID).attr("fill", "red");

    svg_gpg_chart.selectAll(".bar").attr("fill", "blue");
    svg_gpg_chart.select(rectID).attr("fill", "red");
}

function handleMouseOut() {
    console.log("Mouse Out")
}
//Default value = the first year
selectedSeason = seasons["seasons"][0];

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
    drawMap();
    drawBarchart();
    drawBarchart2();
});


var previousTeamId = "NJD";
var previousTeam = selectedSeason["teams"].find(function (obj) {
    return obj.abbreviation === previousTeamId;
});

function handleMouseOver(id) {
    var selectedTeam = selectedSeason["teams"].find(function (obj) {
        return obj.abbreviation === id;
    });
    previousTeam = selectedTeam;
    previousTeamId = id;

    d3.select("#selected_team").text(selectedTeam.name);
    d3.select("#team1list").text(selectedTeam.name);

    let svg_map = d3.select("#teams_map");
    let svg_ppg_chart = d3.select("#pp_goals_chart");
    let svg_gpg_chart = d3.select("#goals_p_game_chart");

    let circleID = "circle#" + id;
    let rectID = "rect#" + id;

    svg_map.selectAll("circle").style("fill", "#007bff").attr("r", 4);
    svg_map.select(circleID).attr("r", 10).style("fill", "#fd6464");

    svg_ppg_chart.selectAll(".bar").attr("fill", "#007bff");
    svg_ppg_chart.select(rectID).attr("fill", "#fd6464");

    svg_gpg_chart.selectAll(".bar").attr("fill", "#007bff");
    svg_gpg_chart.select(rectID).attr("fill", "#fd6464");

    updateLinePlot(selectTeamData());
    updateLinePlot(selectTeamData(), "powerPlayPercentage", "#line_plot_percentage");
    updateLinePlot(selectTeamData(), "powerPlayGoalsAgainst", "#line_plot_against");
    updateLinePlot(selectTeamData(), "powerPlayOpportunities", "#line_plot_opportunities");
}
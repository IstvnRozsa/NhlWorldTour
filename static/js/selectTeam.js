let combobox_teams = d3.select('#combobox_teams');

combobox_teams.selectAll('option')
    .data(teamNames)
    .enter()
    .append('option')
    .text(function (d) {
        return d['name'];
    });



let previousSelectedTeamFromCB = null;

function selectTeamData() {
    let dataTeam1 = [];
    let dataTeam2 = [];
    for (let i = 0; i < teams.length; i++) {
        if (teams[i].name === previousSelectedTeamFromCB) {
            dataTeam2.push(teams[i]);
        } else if (teams[i].abbreviation === previousTeamId) {
            dataTeam1.push(teams[i]);
        }

    }
    console.log(previousTeamId);
    console.log(dataTeam1);
    console.log(dataTeam2);
    return [dataTeam1, dataTeam2];
    // return null; // Return null if no match found
}

combobox_teams.on('change', function () {
    // Get the selected value
    previousSelectedTeamFromCB = d3.select(this).property('value');
    console.log("XXX: ");
    console.log(teams);
    let selectedTeams = selectTeamData();
    console.log("stats" + previousSelectedTeamFromCB + ": " + selectedTeams[0]);
    console.log(selectedTeams[0])
    updateLinePlot(selectedTeams);
    updateLinePlot(selectedTeams, "powerPlayPercentage", "#line_plot_percentage");
    updateLinePlot(selectedTeams, "powerPlayGoalsAgainst", "#line_plot_against");
    updateLinePlot(selectedTeams, "powerPlayOpportunities", "#line_plot_opportunities");
});
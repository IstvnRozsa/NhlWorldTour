let combobox_teams = d3.select('#combobox_teams');

combobox_teams.selectAll('option')
    .data(teamNames)
    .enter()
    .append('option')
    .text(function (d) {
        return d['name'];
    });

function selectTeamData(objects, name) {
    let dataTeam1 = [];
    let dataTeam2 = [];
    for (let i = 0; i < objects.length; i++) {
        if (objects[i].name === name) {
            console.log("obj: ");
            console.log(objects[i]);
            dataTeam2.push(objects[i].teamStats[0].splits[0].stat);
        } else if (objects[i].abbreviation === previousTeamId) {
            dataTeam1.push(objects[i].teamStats[0].splits[0].stat);
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
    let selected = d3.select(this).property('value');
    let selectedTeams = selectTeamData(teams, selected);
    console.log("stats" + selected + ": " + selectedTeams[0]);
    console.log(selectedTeams[0])
    updateLinePlot(selectedTeams);
});
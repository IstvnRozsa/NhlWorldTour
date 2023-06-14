let combobox_stats = d3.select('#combobox_stats');

combobox_stats.selectAll('option')
    .data(statistics)
    .enter()
    .append('option')
    .text(function (d) {
        return d;
    });
function selectStatisticalData(objects, name) {
    let data = [];
    for (let i = 0; i < objects.length; i++) {
        if (objects[i].abbreviation === previousTeamId) {
            data.push(objects[i].teamStats[0].splits[0].stat[name]);
            // return objects[i];
        }
    }
    console.log(data);
    return data;
    // return null; // Return null if no match found
}

combobox_stats.on('change', function () {
    // Get the selected value
    let selectedStat = d3.select(this).property('value');
    selectedStatistic = selectStatisticalData(teams, selectedStat);
    console.log("stats" + selectedStat, selectedStatistic);
    updateLinePlot(selectedStatistic);
});
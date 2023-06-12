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
});


function selectTeam(team) {
    d3.select("#selected_team")
        .text(team);
    console.log(team);
}
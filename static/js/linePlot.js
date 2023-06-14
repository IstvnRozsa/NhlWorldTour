function drawLineChart() {
    updateLinePlot(teams);
}

// Create a function that takes a dataset as input and update the plot:
function updateLinePlot(data) {
    if (data == null) {
        return;
    }
    team1 = data[0];
    team2 = data[1];
    console.log("data for linePlot are: ");
    console.log(team1);
    margin = {top: 20, right: 20, bottom: 60, left: 60};
    width = 500 - margin.left - margin.right;
    height = 400 - margin.top - margin.bottom;
    console.log("draw LinePlot");

    linePlotSvg = d3.select("#line_plot")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // Initialise X axis:
    const x = d3.scaleLinear().range([0, width]);
    const xAxis = d3.axisBottom().scale(x);
    linePlotSvg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .attr("class", "myXaxis")

    // Initialize Y axis
    const y = d3.scaleLinear().range([height, 0]);
    const yAxis = d3.axisLeft().scale(y);
    linePlotSvg.append("g")
        .attr("class", "myYaxis")

    // Create the X axis:


    x.domain([d3.min(team1, function (d) {
        return d["from"];
    }), d3.max(team1, function (d) {
        return d["from"];
    })]);
    linePlotSvg.selectAll(".myXaxis").transition()
        .duration(3000)
        .call(xAxis);

    // create the Y axis
    y.domain([d3.min(team1, function (d) {
        return 0;
    }), d3.max(team1, function (d) {
        return d.teamStats[0].splits[0].stat["powerPlayGoals"];
    })]);
    linePlotSvg.selectAll(".myYaxis")
        .transition()
        .duration(3000)
        .call(yAxis);

    // Create an update selection: bind to the new data
    const u = linePlotSvg.selectAll(".lineTest")
        .data([team1], function (d) {
            return d["from"];
        });

    // Updata the line
    u
        .join("path")
        .attr("class", "lineTest")
        .transition()
        .duration(3000)
        .attr("d", d3.line()
            .x(function (d) {
                return x(d["from"]);
            })
            .y(function (d) {
                return y(d.teamStats[0].splits[0].stat["powerPlayGoals"]);
            }))
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 2.5)
}

// At the beginning, I run the update function on the first dataset:
updateLinePlot(null);
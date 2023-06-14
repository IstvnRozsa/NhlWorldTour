function drawLineChart() {
    updateLinePlot(teams);
}

// Create a function that takes a dataset as input and update the plot:
function updateLinePlot(data) {
    margin = {top: 20, right: 20, bottom: 60, left: 60};
    width = 500 - margin.left - margin.right;
    height = 400 - margin.top - margin.bottom;
    console.log("draw LinePlot");
    linePlotSvg = d3.select("#line_plot")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // Initialise a X axis:
    const x = d3.scaleLinear().range([0, width]);
    const xAxis = d3.axisBottom().scale(x);
    linePlotSvg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .attr("class", "myXaxis")

// Initialize an Y axis
    const y = d3.scaleLinear().range([height, 0]);
    const yAxis = d3.axisLeft().scale(y);
    linePlotSvg.append("g")
        .attr("class", "myYaxis")

    // Create the X axis:
    console.log(data);
    x.domain([d3.min(data, function (d) {
        console.log("year" + d.year.split("-").at(0));
        return d.year.split("-").at(0)
    }), d3.max(data, function (d) {
        return d.year.split("-").at(0)
    })]);
    linePlotSvg.selectAll(".myXaxis").transition()
        .duration(3000)
        .call(xAxis);

    // create the Y axis
    y.domain([d3.min(data, function (d) {
        return d.feature
    }), d3.max(data, function (d) {
        return d.feature
    })]);
    linePlotSvg.selectAll(".myYaxis")
        .transition()
        .duration(3000)
        .call(yAxis);

    // Create a update selection: bind to the new data
    const u = linePlotSvg.selectAll(".lineTest")
        .data([data], function (d) {
            return d.year.split("-").at(0)
        });

    // Updata the line
    u
        .join("path")
        .attr("class", "lineTest")
        .transition()
        .duration(3000)
        .attr("d", d3.line()
            .x(function (d) {
                return x(d.year);
            })
            .y(function (d) {
                return y(d.feature);
            }))
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 2.5)
}

// At the beginning, I run the update function on the first dataset:
updateLinePlot(teams);
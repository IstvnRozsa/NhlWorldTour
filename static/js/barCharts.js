function drawBarchart() {
// Sample dataset with JSON objects
    let dataset = [
        {label: "A", value: 10},
        {label: "B", value: 20},
        {label: "C", value: 15},
        {label: "D", value: 8},
        {label: "E", value: 12}
    ];

// Set the dimensions and margins of the chart
    let width = 500;
    let height = 300;
    let margin = {top: 10, right: 0, bottom: 30, left: 40};

// Calculate the inner width and height
    let innerWidth = width - margin.left - margin.right;
    let innerHeight = height - margin.top - margin.bottom;

// Create the SVG element
    let svg = d3.select("#chart")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

// Create the chart group and translate it to account for margins
    let chart = svg.append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

// Create a scale for the x-axis
    let xScale = d3.scaleBand()
        .domain(selectedSeason["teams"].slice(0, 5).map(d => d.name))
        .range([0, innerWidth])
        .padding(0.2);

// Create a scale for the y-axis
    let yScale = d3.scaleLinear()
        .domain([0, d3.max(selectedSeason["teams"].slice(0, 5), d => d["teamStats"][0]["splits"][0]["stat"]["powerPlayGoals"])])
        .range([innerHeight, 0]);

// Create the bars
    let bars = chart.selectAll(".bar")
        .data(selectedSeason["teams"].slice(0, 5))
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("fill", "blue")
        .attr("id", d => d.name)
        .attr("x", d => xScale(d.name))
        .attr("y", d => yScale(d["teamStats"][0]["splits"][0]["stat"]["powerPlayGoals"]))
        .attr("width", xScale.bandwidth())
        .attr("height", d => innerHeight - yScale(d["teamStats"][0]["splits"][0]["stat"]["powerPlayGoals"]))
        .on("mouseover", function (d) {
            handleMouseOver(this.id, this)
        })
        .on("mouseout", handleMouseOut);

    chart.selectAll(".bar-label")
        .data(selectedSeason["teams"].slice(0, 5))
        .enter()
        .append("text")
        .attr("class", "bar-label")
        .attr("x", d => xScale(d.name) + xScale.bandwidth() / 2)
        .attr("y", d => yScale(d["teamStats"][0]["splits"][0]["stat"]["powerPlayGoals"]) - 5) // Adjust the vertical position
        .attr("text-anchor", "middle") // Center the text horizontally
        .text(d => d["teamStats"][0]["splits"][0]["stat"]["powerPlayGoals"]);


// Create the x-axis
    chart.append("g")
        .attr("transform", `translate(0,${innerHeight})`)
        .call(d3.axisBottom(xScale));

// Create the y-axis
    chart.append("g")
        .call(d3.axisLeft(yScale));
}

drawBarchart();

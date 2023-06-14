function drawBarchart() {
    //sort the dataset based on the feature
    selectedSeason["teams"].sort(function (a, b) {
        return b["teamStats"][0]["splits"][0]["stat"]["powerPlayGoals"] - a["teamStats"][0]["splits"][0]["stat"]["powerPlayGoals"];
    });

    let svgToRemove = d3.select("#pp_goals_chart").select("svg");
    svgToRemove.remove();

// Set the dimensions and margins of the chart
    let width = 500;
    let height = 300;
    let margin = {top: 20, right: 0, bottom: 30, left: 40};

// Calculate the inner width and height
    let innerWidth = width - margin.left - margin.right;
    let innerHeight = height - margin.top - margin.bottom;

// Create the SVG element
    let svg = d3.select("#pp_goals_chart")
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
        .attr("id", d => d.abbreviation)
        .attr("x", d => xScale(d.name))
        .attr("y", d => yScale(d["teamStats"][0]["splits"][0]["stat"]["powerPlayGoals"]))
        .attr("width", xScale.bandwidth())
        .attr("height", d => innerHeight - yScale(d["teamStats"][0]["splits"][0]["stat"]["powerPlayGoals"]))
        .on("mouseover", function (d) {
            handleMouseOver(this.id)
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
        .call(d3.axisBottom(xScale))
        .selectAll("text")
        .attr("transform", "rotate(-7)");

// Create the y-axis
    chart.append("g")
        .call(d3.axisLeft(yScale));
    console.log("Draw barchart");
}

function drawBarchart2() {
    //sort the dataset based on the feature
    selectedSeason["teams"].sort(function (a, b) {
        return b["teamStats"][0]["splits"][0]["stat"]["goalsPerGame"] - a["teamStats"][0]["splits"][0]["stat"]["goalsPerGame"];
    });

    let svgToRemove = d3.select("#goals_p_game_chart").select("svg");
    svgToRemove.remove();

// Set the dimensions and margins of the chart
    let width = 500;
    let height = 300;
    let margin = {top: 20, right: 10, bottom: 30, left: 40};

// Calculate the inner width and height
    let innerWidth = width - margin.left - margin.right;
    let innerHeight = height - margin.top - margin.bottom;

// Create the SVG element
    let svg = d3.select("#goals_p_game_chart")
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
        .domain([0, d3.max(selectedSeason["teams"].slice(0, 5), d => d["teamStats"][0]["splits"][0]["stat"]["goalsPerGame"])])
        .range([innerHeight, 0]);

// Create the bars
    let bars = chart.selectAll(".bar")
        .data(selectedSeason["teams"].slice(0, 5))
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("fill", "blue")
        .attr("id", d => d.abbreviation)
        .attr("x", d => xScale(d.name))
        .attr("y", d => yScale(d["teamStats"][0]["splits"][0]["stat"]["goalsPerGame"]))
        .attr("width", xScale.bandwidth())
        .attr("height", d => innerHeight - yScale(d["teamStats"][0]["splits"][0]["stat"]["goalsPerGame"]))
        .on("mouseover", function (d) {
            handleMouseOver(this.id)
        })
        .on("mouseout", handleMouseOut);

    chart.selectAll(".bar-label")
        .data(selectedSeason["teams"].slice(0, 5))
        .enter()
        .append("text")
        .attr("class", "bar-label")
        .attr("x", d => xScale(d.name) + xScale.bandwidth() / 2)
        .attr("y", d => yScale(d["teamStats"][0]["splits"][0]["stat"]["goalsPerGame"]) - 5) // Adjust the vertical position
        .attr("text-anchor", "middle") // Center the text horizontally
        .text(d => d["teamStats"][0]["splits"][0]["stat"]["goalsPerGame"]);


// Create the x-axis
    chart.append("g")
        .attr("transform", `translate(0,${innerHeight})`)
        .call(d3.axisBottom(xScale))
        .selectAll("text")
        .attr("transform", "rotate(-7)");

// Create the y-axis
    chart.append("g")
        .call(d3.axisLeft(yScale));
    console.log("Draw barchart");
}

drawBarchart();
drawBarchart2();

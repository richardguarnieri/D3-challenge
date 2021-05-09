// @TODO= YOUR CODE HERE!


// Variables
const width = 825;
const height = 500;

const chartTitleMargin = 50; // Margins for the labels
const xAxisMargin = 50; // Margins for the labels
const yAxisMargin = 50; // Margins for the labels

const margin = {
    top: 25 + chartTitleMargin,
    right: 25,
    bottom: 25 + xAxisMargin,
    left: 25 + yAxisMargin
};

const innerWidth = width - margin.right - margin.left;
const innerHeight = height - margin.top - margin.bottom;

const charTitle = 'Title Test';

const xValue = d => d.poverty; //
const xAxisLabel = 'In Poverty (%)';

const yValue = d => d.healthcare; //
const yAxisLabel = 'Lacks Healthcare (%)';

const tipValue = d => d.state; //

const circleRadius = 10; //

// Create Render Function
const render = data => {

    // Step 2: Create SVG Element
    const svg = d3.select('#scatter')
        .append('svg')
            .attr('width', width)
            .attr('height', height);

    // Step 3: Create chartGroup "Element"
    const chartGroup = svg.append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`)
        .attr('id', 'chartGroup');

    // Step 4: Create Scale Functions
    const xScale = d3.scaleLinear()
        .domain(d3.extent(data, xValue))
        .range([0, innerWidth]);

    const yScale = d3.scaleLinear()
        .domain(d3.extent(data, yValue))
        .range([innerHeight, 0]);

    // Step 5: Create Axis Functions
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    // Step 6: Create Axis Groups and Labels and Append to ChartGroup
    const xAxisGroup = chartGroup.append('g')
        .call(xAxis)
            .attr('transform', `translate(0, ${innerHeight})`)
            .attr('id', 'xAxisGroup')
        .append('text')
            .text(xAxisLabel) // #### MAKE RESPONSIVE
            .attr("transform", `translate(${innerWidth / 2}, ${xAxisMargin})`)
            .attr("class", "aText");

    const yAxisGroup = chartGroup.append('g')
        .call(yAxis)
            .attr('id', 'yAxisGroup')
        .append('text')
            .text(yAxisLabel) // #### MAKE RESPONSIVE
            .attr("transform", "rotate(-90)")
            .attr("x", -innerHeight / 2)
            .attr("y", -yAxisMargin)
            .attr("class", "aText");
    
    // Step 7: Initialize toolTip
    const toolTip = d3.tip()
        .attr('class', 'd3-tip')
        .html(d => {
            const xValueName = Object.keys(d).find(key => d[key] === xValue(d)); // Extracts the key name when value matches xValue(d)
            const yValueName = Object.keys(d).find(key => d[key] === yValue(d)); // Extracts the key name when value matches yValue(d)
            return `${tipValue(d)}<br>${xValueName}: ${xValue(d)}%<br>${yValueName}: ${yValue(d)}%`;
        });
    
    // Step 8: Invoke toolTip in the chartGroup
    chartGroup.call(toolTip);

    // Step 9: Create Chart Title Group
    const chartTitleGroup = chartGroup.append('g')
        .attr('id', 'chartTitleGroup')
        .append('text')
            .text(charTitle)
            .attr("transform", `translate(${innerWidth / 2}, ${-chartTitleMargin})`)
            .attr("class", "aText");

    // Step 10: Create scatterPlot Group
    const scatterPlot = chartGroup.append('g')
        .attr('id', 'scatterPlot');
    
    //####################################################################
    // PRIMARY SOLUTION - CON: CIRCLE AND TEXT ELEMENTS ARE NOT GROUPED //
    //####################################################################

    // // Step 11: Append Circles and Text Elements to scatterGroup
    // scatterPlot.selectAll('circle')
    //     .data(data)
    //     .enter()
    //     .append('circle')
    //         .classed('stateCircle', true)
    //         .attr('r', circleRadius)
    //         .attr('cx', d => xScale(xValue(d)))
    //         .attr('cy', d => yScale(yValue(d)))

    // scatterPlot.selectAll('text')
    //     .data(data)
    //     .enter()
    //     .append('text')
    //         .classed('stateText inactive', true)
    //         .text(d => d.abbr)
    //         .attr('font-size', circleRadius / 1.5)
    //         .attr('x', d => xScale(xValue(d)))
    //         .attr('y', d => yScale(yValue(d)))
    //         .on('mouseover', toolTip.show)
    //         .on('mouseout', toolTip.hide)
       
    //###################################################################
    // SECONDARY SOLUTION - PRO: CIRCLE AND TEXT ELEMENTS ARE  GROUPED //
    //###################################################################

    // Step 11: Create scatterGroup to group each Circle and Text Element together
    const scatterGroup = scatterPlot.selectAll('g').data(data)
        .enter().append('g')
            .attr('class', 'scatterPoint')
            .on('mouseover', toolTip.show)
            .on('mouseout', toolTip.hide);

    // Step 12: Append Circle and Text Elements to each scatterGroup element
    scatterGroup.each(function() {
        const selection = d3.select(this);

        // Append Circles
        selection.append("circle")
            .classed('stateCircle', true)
            .attr('r', circleRadius)
            .attr('cx', d => xScale(xValue(d)))
            .attr('cy', d => yScale(yValue(d)));
        
        // Append Texts
        selection.append("text")
            .classed('stateText', true)
            .text(d => d.abbr)
            .attr('font-size', circleRadius / 1.5)
            .attr('x', d => xScale(xValue(d)))
            .attr('y', d => yScale(yValue(d)));
    });

};







// Step 1: Read CSV and Parse Data (if required) as Numbers
const csvPath = "assets/data/data.csv"
d3.csv(csvPath).then(response => {

    response.forEach(d => {
        d.age = +d.age;
        d.ageMoe = +d.ageMoe;
        d.healthcare = +d.healthcare;
        d.healthcareHigh = +d.healthcareHigh;
        d.healthcareLow = +d.healthcareLow;
        d.income = +d.income;
        d.incomeMoe = +d.incomeMoe;
        d.obesity = +d.obesity;
        d.obesityHigh = +d.obesityHigh;
        d.obesityLow = +d.obesityLow;
        d.poverty = +d.poverty;
        d.povertyMoe = +d.povertyMoe;
        d.smokes = +d.smokes;
        d.smokesHigh = +d.smokesHigh;
        d.smokesLow = +d.smokesLow;
    });

    console.log(response);

    render(response);

}).catch(e => {
    console.log(e)});

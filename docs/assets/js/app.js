// @TODO= YOUR CODE HERE!


// Variables
const width = 825;
const height = 500;

const chartTitleMargin = 50; // Margins for the labels
const xAxisMargin = 100; // Margins for the labels
const yAxisMargin = 100; // Margins for the labels

const margin = {
    top: 25 + chartTitleMargin,
    right: 25,
    bottom: 25 + xAxisMargin,
    left: 25 + yAxisMargin
};

const innerWidth = width - margin.right - margin.left;
const innerHeight = height - margin.top - margin.bottom;

const charTitle = 'US Census Bureau Data (2014)';

const xValue_1 = 'poverty';
const xValue_2 = 'age';
const xValue_3 = 'income';
const xAxisLabel_1 = 'In Poverty (%)';
const xAxisLabel_2 = 'Age (Median)';
const xAxisLabel_3 = 'Household Income (Median)';

const yValue_1 = 'healthcare';
const yValue_2 = 'smokes';
const yValue_3 = 'obesity';
const yAxisLabel_1 = 'Lacks Healthcare (%)';
const yAxisLabel_2 = 'Smokes (%)';
const yAxisLabel_3 = 'Obese (%)';

const labelWidth = 25;

const tipValue = d => d.state; //

const circleRadius = 10; //

let chosenXValue = xValue_1;
let chosenYValue = yValue_1;

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
    let xScale = d3.scaleLinear()
        .domain(d3.extent(data, d => d[chosenXValue]))
        .range([0, innerWidth]);

    let yScale = d3.scaleLinear()
        .domain(d3.extent(data, d => d[chosenYValue]))
        .range([innerHeight, 0]);

    // Step 5: Create Axis Functions
    let xAxis = d3.axisBottom(xScale);
    let yAxis = d3.axisLeft(yScale);

    // Step 6: Create Axis Groups and Labels and Append to ChartGroup
    const xAxisGroup = chartGroup.append('g')
        .call(xAxis)
            .attr('transform', `translate(0, ${innerHeight})`)
            .attr('id', 'xAxisGroup')

        // Create Multiple xAxis Labels
        const xAxis_1 = xAxisGroup.append('text') // xAxis Label 1
            .text(xAxisLabel_1)
            .attr("transform", `translate(${innerWidth / 2}, ${xAxisMargin - labelWidth * 2})`)
            .attr('value', xValue_1)
            .classed("active", true);
        const xAxis_2 = xAxisGroup.append('text') // xAxis Label 2
            .text(xAxisLabel_2)
            .attr("transform", `translate(${innerWidth / 2}, ${xAxisMargin - labelWidth})`)
            .attr('value', xValue_2)
            .classed("inactive", true);
        const xAxis_3 = xAxisGroup.append('text') // xAxis Label 3
            .text(xAxisLabel_3)
            .attr("transform", `translate(${innerWidth / 2}, ${xAxisMargin})`)
            .attr('value', xValue_3)
            .classed("inactive", true);

    const yAxisGroup = chartGroup.append('g')
        .call(yAxis)
            .attr('id', 'yAxisGroup')

        // Create Multiple yAxis Labels
        const yAxis_1 = yAxisGroup.append('text') // yAxis Label 1
            .text(yAxisLabel_1)
            .attr("transform", "rotate(-90)")
            .attr("x", -innerHeight / 2)
            .attr("y", -yAxisMargin + labelWidth * 2)
            .attr('value', yValue_1)
            .classed("active", true);
        const yAxis_2 = yAxisGroup.append('text') // yAxis Label 2
            .text(yAxisLabel_2)
            .attr("transform", "rotate(-90)")
            .attr("x", -innerHeight / 2)
            .attr("y", -yAxisMargin + labelWidth)
            .attr('value', yValue_2)
            .classed("inactive", true);
        const yAxis_3 = yAxisGroup.append('text') // yAxis Label 3
            .text(yAxisLabel_3)
            .attr("transform", "rotate(-90)")
            .attr("x", -innerHeight / 2)
            .attr("y", -yAxisMargin)
            .attr('value', yValue_3)
            .classed("inactive", true);
    
    // Step 7: Initialize toolTip
    let toolTip = d3.tip()
        .attr('class', 'd3-tip')
        .html(d => {
            const xValueName = Object.keys(d).find(key => d[key] === d[chosenXValue]); // Extracts the key name when value matches xValue(d)
            const yValueName = Object.keys(d).find(key => d[key] === d[chosenYValue]); // Extracts the key name when value matches yValue(d)
            return `${tipValue(d)}<br>${xValueName}: ${d[chosenXValue]}%<br>${yValueName}: ${d[chosenYValue]}%`;
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
    let scatterGroup = scatterPlot.selectAll('g').data(data)
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
            .attr('cx', d => xScale(d[chosenXValue]))
            .attr('cy', d => yScale(d[chosenYValue]));
        
        // Append Texts
        selection.append("text")
            .classed('stateText', true)
            .text(d => d.abbr)
            .attr('font-size', circleRadius / 1.5)
            .attr('x', d => xScale(d[chosenXValue]))
            .attr('y', d => yScale(d[chosenYValue]));
    });
   
    // Bonus Part *** Note that the X and Y functions can be grouped together into one, effectively refactoring the code to be more efficient. Decided to leave as-is. ***

        const toolTipFunc = (chosenXValue, chosenYValue, chartGroup) => {
            let xLabel;
            let yLabel;
            let xLabelSign;

            if (chosenXValue === xValue_1) {
                xLabel = "Poverty: "; xLabelSign = '%';
            }
            else if (chosenXValue === xValue_2) {
                xLabel = "Age:"; xLabelSign = '';
            }
            else if (chosenXValue === xValue_3) {
                xLabel = "Income:"; xLabelSign = '';
            }

            if (chosenYValue === yValue_1) {
                yLabel = "Healthcare: ";
            }
            else if (chosenYValue === yValue_2) {
                yLabel = "Smokes:";
            }
            else if (chosenYValue === yValue_3) {
                yLabel = "Obesity:";
            }

            toolTip
                .html(d => `${tipValue(d)}<br>${xLabel} ${d[chosenXValue]}${xLabelSign}<br>${yLabel} ${d[chosenYValue]}%`);
    
            chartGroup.call(toolTip);        
        };

    // xAxis Functions and Event Listener
    // xAxis Functions
        // function used for updating x-scale upon click on axis label
        const xScaleFunc = (data, chosenXValue) => {
            const xScale = d3.scaleLinear()
                .domain(d3.extent(data, d => d[chosenXValue]))
                .range([0, innerWidth]);
            return xScale;
        };
        // function used for updating xAxis upon click on axis label
        const xAxisFunc = (xScale, xAxisGroup) => {
            const xAxis = d3.axisBottom(xScale);
            xAxisGroup.transition()
                .duration(500)
                .call(xAxis)
        };
        // function used for updating circles and text with a transition
        const scatterGroupFuncX = (xScale, chosenXValue) => {
            d3.selectAll('.stateCircle').transition()
            .duration(1000)
            .attr("cx", d => xScale(d[chosenXValue]));
            d3.selectAll('.stateText').transition()
            .duration(1000)
            .attr("x", d => xScale(d[chosenXValue]));
        };
        // xAxis Labels Event Listener
        xAxisGroup.selectAll('text')
        .on('click', function() {
            let value = d3.select(this).attr('value')
            if (value !== chosenXValue) {
                // replaces chosenXValue with new value
                chosenXValue = value;
                // updates xScale for new data
                xScale = xScaleFunc(data, chosenXValue);
                // updates xAxis with new value and transitions
                xAxisFunc(xScale, xAxisGroup);
                // updates circles and text with new values and transitions
                scatterGroupFuncX(xScale, chosenXValue);
                // updates tooltips with new info
                toolTipFunc(chosenXValue, chosenYValue, chartGroup);
                // changes classes to change bold text
                if (chosenXValue === xValue_2) {
                    xAxis_1
                        .classed("active", false)
                        .classed("inactive", true);
                    xAxis_2
                        .classed("active", true)
                        .classed("inactive", false);
                    xAxis_3
                        .classed("active", false)
                        .classed("inactive", true);
                } else if (chosenXValue === xValue_3) {
                    xAxis_1
                        .classed("active", false)
                        .classed("inactive", true);
                    xAxis_2
                        .classed("active", false)
                        .classed("inactive", true);
                    xAxis_3
                        .classed("active", true)
                        .classed("inactive", false);
                } else {
                    xAxis_1
                        .classed("active", true)
                        .classed("inactive", false);
                    xAxis_2
                        .classed("active", false)
                        .classed("inactive", true);
                    xAxis_3
                        .classed("active", false)
                        .classed("inactive", true);
                }
            };
        })

    // yAxis Functions and Event Listener
    // yAxis Functions
        // function used for updating y-scale upon click on axis label
        const yScaleFunc = (data, chosenYValue) => {
            const yScale = d3.scaleLinear()
                .domain(d3.extent(data, d => d[chosenYValue]))
                .range([innerHeight, 0]);
            return yScale;
        };
        // function used for updating yAxis upon click on axis label
        const yAxisFunc = (yScale, yAxisGroup) => {
            const yAxis = d3.axisLeft(yScale);
            yAxisGroup.transition()
                .duration(500)
                .call(yAxis)
        };
        // function used for updating circles and text with a transition
        const scatterGroupFuncY = (yScale, chosenYValue) => {
            d3.selectAll('.stateCircle').transition()
            .duration(1000)
            .attr("cy", d => yScale(d[chosenYValue]));
            d3.selectAll('.stateText').transition()
            .duration(1000)
            .attr("y", d => yScale(d[chosenYValue]));
        };
        // yAxis Labels Event Listener
        yAxisGroup.selectAll('text')
        .on('click', function() {
            let value = d3.select(this).attr('value')
            if (value !== chosenYValue) {
                // replaces chosenYValue with new value
                chosenYValue = value;
                // updates yScale for new data
                yScale = yScaleFunc(data, chosenYValue);
                // updates yAxis with new value and transitions
                yAxisFunc(yScale, yAxisGroup);
                // updates circles and text with new values and transitions
                scatterGroupFuncY(yScale, chosenYValue);
                // updates tooltips with new info
                toolTipFunc(chosenXValue, chosenYValue, chartGroup);
                // changes classes to change bold text
                if (chosenYValue === yValue_2) {
                    yAxis_1
                        .classed("active", false)
                        .classed("inactive", true);
                    yAxis_2
                        .classed("active", true)
                        .classed("inactive", false);
                    yAxis_3
                        .classed("active", false)
                        .classed("inactive", true);
                } else if (chosenYValue === yValue_3) {
                    yAxis_1
                        .classed("active", false)
                        .classed("inactive", true);
                    yAxis_2
                        .classed("active", false)
                        .classed("inactive", true);
                    yAxis_3
                        .classed("active", true)
                        .classed("inactive", false);
                } else {
                    yAxis_1
                        .classed("active", true)
                        .classed("inactive", false);
                    yAxis_2
                        .classed("active", false)
                        .classed("inactive", true);
                    yAxis_3
                        .classed("active", false)
                        .classed("inactive", true);
                }
            };
        })


};

// Step 1: Read CSV and Parse Data (if required)
const csvPath = "assets/data/data.csv"
d3.csv(csvPath).then(response => {

    // Parse Data
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

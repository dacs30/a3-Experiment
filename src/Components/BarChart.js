import React from 'react'; 
import * as d3 from 'd3';
import useD3 from '../hooks/useD3';

function BarChart() {

    const generateRandomData = () => {
        const data = [];
        for (let i = 0; i < 10; i++) {
            data.push(Math.floor(Math.random() * 100));
        }
        return data;
    }

    const ref = useD3(
        (svg) => {

            let w = 480,
                h = 225,
                maxValue = 100;

            let dataset = generateRandomData()

            
                svg.attr("width", w)
                .attr("height", h)
                .attr("stroke", "black")
                .attr("stroke-width", "2px");

            let xScale = d3.scaleBand()
                .domain(d3.range(dataset.length))
                .rangeRound([0, w])
                .paddingInner(0.1);

            let yScale = d3.scaleLinear()
                .domain([0, d3.max(dataset)])
                .range([0, h]);

            svg.selectAll('rect')
                .data(dataset)
                .enter()
                .append('rect')
                .attr('x', function (d, i) {
                    return xScale(i);
                })
                .attr('y', function (d) {
                    return h - yScale(d);
                })
                .attr('width', xScale.bandwidth())
                .attr('height', function (d) {
                    return yScale(d);
                })
                .attr('fill', function (d) {
                    return 'rgb(255, 255,255)';
                });

        }, []);


    return (
        <svg id='bar-chart' ref={ref}></svg>
    )
}

export default BarChart
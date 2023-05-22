const Dummy_Data = [ 
    { id: 'd1', region: 'India', value: 10 },
    { id: 'd1', region: 'England', value: 9 },
    { id: 'd1', region: 'America', value: 6 },
    { id: 'd1', region: 'Dubai', value: 8 },
];

const MARGINS = {top: 20};
const CHART_WIDTH = 600;
const CHART_HEIGHT = 400 - MARGINS.top - MARGINS.bottom;

let selectedData = Dummy_Data;

const x = d3.scaleBand().rangeRound([0, CHART_WIDTH]).padding(0.1);
const y = d3.scaleLinear().range([CHART_HEIGHT, 0]);

const chartContainer = d3
    .select('svg')
    .attr('width', CHART_WIDTH)
    .attr('height', CHART_HEIGHT + MARGINS.top + MARGINS.bottom);

x.domain(Dummy_Data.map((d) => d.region));
y.domain([0, d3.max(Dummy_Data, (d) => d.value) + 3]);

const chart = chartContainer.append('g');

chart
    .append('g')
    .call(d3.axisBottom(x).tickSizeOuter(0))
    .attr('transform', `translate(0, ${CHART_HEIGHT})`)
    .attr('color', '#4f009e');
function renderChart() {


chart
    .selectAll('.bar')
    .data(selectedData, data =>data.id)
    .enter()
    .append('rect')
    .classed('bar', true)
    .attr('width', x.bandwidth())
    .attr('height', (data) => CHART_HEIGHT - y(data.value))
    .attr('x', (data) => x(data.region))
    .attr('y', (data) => y(data.region));

chart.selectAll('.bar').data(selectedData).exit().remove();

chart 
    .selectAll('.label')
    .data(selectedData, data =>data.id)
    .enter()
    .append('text')
    .text((data) => data.value)
    .attr('x', (data) => x(data.region) + x.bandwidth() / 2)
    .attr('text-anchor', 'middle')
    .classed('label', true);

    chart.selectAll('.label').data(selectedData).exit().remove();
}

renderChart();

let unselectedIds = [];

const listItems = d3
    .select('#data')
    .select('ul')
    .selectAll('li')
    .data(Dummy_Data)
    .enter()
    .append('li');

listItems.append('span').text(data => data.region);

listItems
    .append('input')
    .attr('type', 'checkbox')
    .attr('checked', true)
    .on('change', (data) => {
        if (unselectedIds.indexOf(data.id) === -1) {
            unselectedIds.push(data.id);
        } else {
            unselectedIds = unselectedIds.filter((id) => id !==data.id);
        }
       selectedData = Dummy_Data.filter((d) => unselectedIds.indexOf(d.id) ===-1);
       console.log(selectedData);
       renderChart();
    });
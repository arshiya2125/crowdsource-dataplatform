const { calculateTime, formatTime } = require('./utils');

function constructChart(responseData, xAxisLabel, yAxisLabel, type) {
  const chartReg = {};
  const chart = am4core.create("speakers_hours_chart", am4charts.XYChart);
  chartReg["chart"] = chart;
  let response = [...responseData];
  if (xAxisLabel === "total_speakers") {
    response = response.sort((a, b) => Number(a.total_speakers) < Number(b.total_speakers) ? -1 : 1);
  } 
  if (xAxisLabel !== "total_speakers") {
    response.forEach((ele) => {
      const { hours, minutes, seconds } = calculateTime(
        Number(ele.total_contributions) * 60 * 60,
        true
      );
      ele.total_contributions_text = type == "suno" || type == "bolo" ? formatTime(hours, minutes, seconds) :  type == "dekho" ? ((ele.total_contribution_count).toString() + " images") : ((ele.total_contribution_count).toString() + " translations");
    });
  }
  chart.data = response;
  const categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
  categoryAxis.dataFields.category = yAxisLabel;
  categoryAxis.renderer.grid.template.location = 0;
  categoryAxis.renderer.cellStartLocation = 0.2;
  categoryAxis.renderer.cellEndLocation = 0.8;
  categoryAxis.renderer.grid.template.strokeWidth = 0;
  const valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
  valueAxis.renderer.grid.template.strokeWidth = 0;
  valueAxis.renderer.labels.template.disabled = true;
  if(type == "likho" || type == "dekho") {
    const maxValue = Math.max.apply(Math, chart.data.map(function(o) { return Number(o.total_contribution_count); })) + 50;
    valueAxis.min = 0;
    valueAxis.max = maxValue > 100 ? maxValue : 100;
  } else {
    const maxValue = Math.max.apply(Math, chart.data.map(function(o) { return Number(o.total_contributions); })) + 0.05;
    valueAxis.min = 0;
    valueAxis.max =  maxValue > 0.1 ? maxValue : 0.1;
  }
  valueAxis.strictMinMax = true; 
  categoryAxis.renderer.minGridDistance = 25;
  const series = chart.series.push(new am4charts.ColumnSeries());
  series.dataFields.valueX = xAxisLabel;
  series.dataFields.categoryY = yAxisLabel;

  const valueLabel = series.bullets.push(new am4charts.LabelBullet());
  valueLabel.label.text =
    xAxisLabel == "total_speakers"
      ? "{total_speakers}"
      : "{total_contributions_text}";
  valueLabel.label.fontSize = 14;
  valueLabel.label.horizontalCenter = "left";
  valueLabel.label.dx = 10;
  valueLabel.label.truncate = false;
  valueLabel.label.hideOversized = false;

  const cellSize = 35;
  chart.events.on("datavalidated", function (ev) {
    const chart = ev.target;
    const categoryAxis = chart.yAxes.getIndex(0);
    const adjustHeight = chart.data.length * cellSize - categoryAxis.pixelHeight;
    const targetHeight = chart.pixelHeight + adjustHeight;
    chart.svgContainer.htmlElement.style.height = targetHeight + "px";
  });
}

module.exports = {
  constructChart
};
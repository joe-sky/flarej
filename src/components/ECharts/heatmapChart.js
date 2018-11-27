import { Component } from 'react';
import PropTypes from 'prop-types';
import { registerComponent } from 'nornj';
import EChartsEnhance from './EChartsEnhance';
import 'echarts/lib/chart/heatmap';
import template from './ECharts.t.html';

class HeatMapChart extends Component {
  static propTypes = {
    type: PropTypes.string
  };

  static defaultProps = {
    type: 'heatmap'
  };

  render() {
    return template.chart(this);
  }
}

const ecHeatMapChart = EChartsEnhance(HeatMapChart);
registerComponent({ 'ec-HeatMapChart': ecHeatMapChart });
export default ecHeatMapChart;

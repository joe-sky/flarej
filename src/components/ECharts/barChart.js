import { Component } from 'react';
import PropTypes from 'prop-types';
import { registerComponent } from 'nornj';
import EChartsEnhance from './EChartsEnhance';
import 'echarts/lib/chart/bar';
import template from './ECharts.t.html';

class BarChart extends Component {
  static propTypes = {
    type: PropTypes.string
  };

  static defaultProps = {
    type: 'bar'
  };

  render() {
    return template.chart(this);
  }
}

const ecBarChart = EChartsEnhance(BarChart);
registerComponent({ 'ec-BarChart': ecBarChart });
export default ecBarChart;

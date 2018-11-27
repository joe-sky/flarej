import { Component } from 'react';
import PropTypes from 'prop-types';
import { registerComponent } from 'nornj';
import EChartsEnhance from './EChartsEnhance';
import 'echarts/lib/chart/line';
import template from './ECharts.t.html';

class LineChart extends Component {
  static propTypes = {
    type: PropTypes.string
  };

  static defaultProps = {
    type: 'line'
  };

  render() {
    return template.chart(this);
  }
}

const ecLineChart = EChartsEnhance(LineChart);
registerComponent({ 'ec-LineChart': ecLineChart });
export default ecLineChart;

import { Component } from 'react';
import PropTypes from 'prop-types';
import { registerComponent } from 'nornj';
import EChartsEnhance from './EChartsEnhance';
import 'echarts/lib/chart/gauge';
import template from './ECharts.t.html';

class GaugeChart extends Component {
  static propTypes = {
    type: PropTypes.string
  };

  static defaultProps = {
    type: 'gauge'
  };

  render() {
    return template.chart(this);
  }
}

const ecGaugeChart = EChartsEnhance(GaugeChart);
registerComponent({ 'ec-GaugeChart': ecGaugeChart });
export default ecGaugeChart;

import { Component } from 'react';
import PropTypes from 'prop-types';
import { registerComponent } from 'nornj';
import EChartsEnhance from './EChartsEnhance';
import 'echarts/lib/chart/map';
import template from './ECharts.t.html';

class MapChart extends Component {
  static propTypes = {
    type: PropTypes.string
  };

  static defaultProps = {
    type: 'map'
  };

  render() {
    return template.chart(this);
  }
}

const ecMapChart = EChartsEnhance(MapChart);
registerComponent({ 'ec-MapChart': ecMapChart });
export default ecMapChart;

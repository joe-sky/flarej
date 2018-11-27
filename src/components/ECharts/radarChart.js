import { Component } from 'react';
import PropTypes from 'prop-types';
import { registerComponent } from 'nornj';
import EChartsEnhance from './EChartsEnhance';
import 'echarts/lib/chart/radar';
import template from './ECharts.t.html';

class RadarChart extends Component {
  static propTypes = {
    type: PropTypes.string
  };

  static defaultProps = {
    type: 'radar'
  };

  render() {
    return template.chart(this);
  }
}

const ecRadarChart = EChartsEnhance(RadarChart);
registerComponent({ 'ec-RadarChart': ecRadarChart });
export default ecRadarChart;

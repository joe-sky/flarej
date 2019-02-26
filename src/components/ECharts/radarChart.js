import React, { Component } from 'react';
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

  constructor(props) {
    super(props);
    this.chart = React.createRef();
  }

  render() {
    return template.chart(this);
  }
}

const ecRadarChart = EChartsEnhance(RadarChart);
registerComponent({ 'ec-RadarChart': ecRadarChart });
export default ecRadarChart;

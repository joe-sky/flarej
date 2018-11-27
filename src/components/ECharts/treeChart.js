import { Component } from 'react';
import PropTypes from 'prop-types';
import { registerComponent } from 'nornj';
import EChartsEnhance from './EChartsEnhance';
import 'echarts/lib/chart/tree';
import template from './ECharts.t.html';

class TreeChart extends Component {
  static propTypes = {
    type: PropTypes.string
  };

  static defaultProps = {
    type: 'tree'
  };

  render() {
    return template.chart(this);
  }
}

const ecTreeChart = EChartsEnhance(TreeChart);
registerComponent({ 'ec-TreeChart': ecTreeChart });
export default ecTreeChart;

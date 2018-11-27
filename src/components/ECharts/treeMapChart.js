import { Component } from 'react';
import PropTypes from 'prop-types';
import { registerComponent } from 'nornj';
import EChartsEnhance from './EChartsEnhance';
import 'echarts/lib/chart/treemap';
import template from './ECharts.t.html';

class TreeMapChart extends Component {
  static propTypes = {
    type: PropTypes.string
  };

  static defaultProps = {
    type: 'treemap'
  };

  render() {
    return template.chart(this);
  }
}

const ecTreeMapChart = EChartsEnhance(TreeMapChart);
registerComponent({ 'ec-TreeMapChart': ecTreeMapChart });
export default ecTreeMapChart;

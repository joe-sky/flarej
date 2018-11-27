import { Component } from 'react';
import PropTypes from 'prop-types';
import { registerComponent } from 'nornj';
import EChartsEnhance from './EChartsEnhance';
import 'echarts/lib/chart/graph';
import template from './ECharts.t.html';

class GraphChart extends Component {
  static propTypes = {
    type: PropTypes.string
  };

  static defaultProps = {
    type: 'graph'
  };

  render() {
    return template.chart(this);
  }
}

const ecGraphChart = EChartsEnhance(GraphChart);
registerComponent({ 'ec-GraphChart': ecGraphChart });
export default ecGraphChart;

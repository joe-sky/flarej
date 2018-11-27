import { Component } from 'react';
import PropTypes from 'prop-types';
import { registerComponent } from 'nornj';
import EChartsEnhance from './EChartsEnhance';
import 'echarts/lib/chart/scatter';
import 'echarts/lib/component/grid';
import template from './ECharts.t.html';

class ScatterChart extends Component {
  static propTypes = {
    type: PropTypes.string
  };

  static defaultProps = {
    type: 'scatter'
  };

  render() {
    return template.chart(this);
  }
}

const ecScatterChart = EChartsEnhance(ScatterChart);
registerComponent({ 'ec-ScatterChart': ecScatterChart });
export default ecScatterChart;

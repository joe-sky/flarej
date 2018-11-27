import { Component } from 'react';
import PropTypes from 'prop-types';
import { registerComponent } from 'nornj';
import EChartsEnhance from './EChartsEnhance';
import 'echarts/lib/chart/funnel';
import template from './ECharts.t.html';

class FunnelChart extends Component {
  static propTypes = {
    type: PropTypes.string
  };

  static defaultProps = {
    type: 'funnel'
  };

  render() {
    return template.chart(this);
  }
}

const ecFunnelChart = EChartsEnhance(FunnelChart);
registerComponent({ 'ec-FunnelChart': ecFunnelChart });
export default ecFunnelChart;

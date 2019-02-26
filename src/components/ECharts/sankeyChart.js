import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { registerComponent } from 'nornj';
import EChartsEnhance from './EChartsEnhance';
import 'echarts/lib/chart/sankey';
import template from './ECharts.t.html';

class SankeyChart extends Component {
  static propTypes = {
    type: PropTypes.string
  };

  static defaultProps = {
    type: 'sankey'
  };

  constructor(props) {
    super(props);
    this.chart = React.createRef();
  }

  render() {
    return template.chart(this);
  }
}

const ecSankeyChart = EChartsEnhance(SankeyChart);
registerComponent({ 'ec-SankeyChart': ecSankeyChart });
export default ecSankeyChart;

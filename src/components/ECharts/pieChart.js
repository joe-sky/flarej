import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { registerComponent } from 'nornj';
import EChartsEnhance from './EChartsEnhance';
import 'echarts/lib/chart/pie';
import template from './ECharts.t.html';

class PieChart extends Component {
  static propTypes = {
    type: PropTypes.string
  };

  static defaultProps = {
    type: 'pie'
  };

  constructor(props) {
    super(props);
    this.chart = React.createRef();
  }

  render() {
    return template.chart(this);
  }
}

const ecPieChart = EChartsEnhance(PieChart);
registerComponent({ 'ec-PieChart': ecPieChart });
export default ecPieChart;

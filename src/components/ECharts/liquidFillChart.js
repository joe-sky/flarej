import { Component } from 'react';
import PropTypes from 'prop-types';
import { registerComponent } from 'nornj';
import EChartsEnhance from './EChartsEnhance';
import 'echarts-liquidfill';
import template from './ECharts.t.html';

class LiquidFillChart extends Component {
    static propTypes = {
        type: PropTypes.string
    };

    static defaultProps = {
        type: 'liquidFill'
    };

    render() {
        return template.chart(this);
    }
}

const ecLiquidFillChart = EChartsEnhance(LiquidFillChart);
registerComponent({ 'ec-LiquidFillChart': ecLiquidFillChart });
export default ecLiquidFillChart;

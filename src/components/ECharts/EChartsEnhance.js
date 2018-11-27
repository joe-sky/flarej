import { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import merge from 'lodash/merge';
import { bind, clear } from 'size-sensor';
import {
  initOption,
  createChart,
  updateChart
} from '../../utils/ecConfig';
import '../../styles/echarts';
import '../grid';
import template from './ECharts.t.html';

const EChartsEnhance = (ComposedComponent) => {
  return class EcComponent extends Component {
    static propTypes = {
      update: PropTypes.bool,
      name: PropTypes.string,
      option: PropTypes.object,
      data: PropTypes.array,
      title: PropTypes.string,
      subTitle: PropTypes.string,
      expandOption: PropTypes.object,
      theme: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
      ]),
      showLoading: PropTypes.bool,
      loadingOption: PropTypes.object,
      onChartReady: PropTypes.func,
      autoResize: PropTypes.bool
    };

    static defaultProps = {
      update: true,
      showLoading: false,
      autoResize: true
    };

    constructor(props) {
      super(props);
      this.component = null;
    }

    createOption() {
      const { option, title, subTitle } = this.props;
      return merge(initOption(this.component.props.type, title, subTitle), option);
    }

    createChart() {
      this.chartOption = this.createOption();
      this.chart = createChart(this.component.refs.chart.wrap, this.props.data, this.chartOption, this.props.expandOption, this.props.theme);
    }

    componentDidMount() {
      this.createChart();

      const { onChartReady, autoResize } = this.props;
      const wrap = this.component.refs.chart.wrap;
      if (autoResize && wrap) {
        bind(wrap, () => {
          this.chart.resize();
        });
      }

      onChartReady && onChartReady(this.chart);
    }

    componentDidUpdate() {
      const { update } = this.props;
      if (!update) {
        return;
      }

      const {
        data,
        option,
        title,
        subTitle,
        showLoading,
        loadingOption
      } = this.props;

      updateChart(this.chart, data, Object.assign({}, this.chartOption, merge({
        title: {
          text: title,
          subtext: subTitle
        },
        tooltip: {
          trigger: 'axis'
        }
      }, option)));

      if (showLoading) {
        this.chart.showLoading(loadingOption);
      }
      else {
        this.chart.hideLoading();
      }
    }

    componentWillUnmount() {
      const wrap = this.component.refs.chart.wrap;
      if (wrap) {
        const { autoResize } = this.props;
        if (autoResize) {
          try {
            clear(wrap);
          } catch (ex) {
            console.warn(ex);
          }
        }

        this.chart && this.chart.dispose(wrap);
      }
    }

    render() {
      const {
        className,
        style,
        width,
        height,
        ...others
      } = this.props;

      const classes = classNames({
        'fj-area-chart-area': true,
        [className]: className
      });

      let styles = {};
      if (width != null) {
        styles.width = width;
      }
      if (height != null) {
        styles.height = height;
      }
      if (style) {
        Object.assign(styles, style);
      }

      return template.enhance(this.state, {
        ComposedComponent,
        ref: c => this.component = c,
        classes,
        styles,
        props: others
      });
    }
  };
};

export default EChartsEnhance;

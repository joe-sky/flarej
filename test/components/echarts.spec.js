import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });
import jasmineEnzyme from 'jasmine-enzyme';
import nj, { template as t } from 'nornj';
import '../../src/components/ECharts';

const options = {
  title: {
    text: 'ECharts 入门示例'
  },
  tooltip: {},
  legend: {
    data: ['销量']
  },
  xAxis: {
    data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
  },
  yAxis: {},
  series: [{
    name: '销量',
    type: 'bar',
    data: [5, 20, 36, 10, 10, 20]
  }]
};

describe('ECharts spec', function () {
  beforeEach(() => {
    jasmineEnzyme();
  });

  it('default props', () => {
    const component = mount(t`
      <ec-chart option=${options} />
    `);

    expect(component.exists()).toBe(true);
    expect(component.getDOMNode().className).toEqual('fj-area-chart-area');
    expect(component.props().showLoading).toEqual(false);
    expect(component.props().autoResize).toEqual(true);
  });

  it('override props', () => {
    const onChartReady = jasmine.createSpy('onChartReady');
    const component = mount(t`
      <ec-chart option=${options}
                height={300}
                theme="test_theme"
                showLoading
                onChartReady=${onChartReady} />
    `);

    expect(component.getDOMNode().style.height).toEqual('300px');
    expect(component.props().theme).toEqual('test_theme');
    expect(component.props().showLoading).toEqual(true);
    expect(onChartReady).toHaveBeenCalled();
  });
});
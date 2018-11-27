import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });
import jasmineEnzyme from 'jasmine-enzyme';
import nj from 'nornj';
import { Affix } from '../../src/components/antd/affix';
import '../../src/components/antd/alert';
import '../../src/components/antd/breadcrumb';
import '../../src/components/antd/button';
import '../../src/components/antd/calendar';
import '../../src/components/antd/card';
import '../../src/components/antd/cascader';
import '../../src/components/antd/checkbox';
import '../../src/components/antd/collapse';
import '../../src/components/antd/datePicker';
import '../../src/components/antd/form';
import '../../src/components/antd/icon';
import '../../src/components/antd/input';
import '../../src/components/antd/menu';
import { Message } from '../../src/components/antd/message';
import '../../src/components/antd/modal';
import '../../src/components/antd/notification';
import '../../src/components/antd/pagination';
import '../../src/components/antd/popover';
import '../../src/components/antd/progress';
import '../../src/components/antd/radio';
import '../../src/components/antd/select';
import '../../src/components/antd/slider';
import '../../src/components/antd/switch';
import '../../src/components/antd/table';
import '../../src/components/antd/tabs';
import '../../src/components/antd/tooltip';
import '../../src/components/antd/transfer';
import '../../src/components/antd/tree';
import '../../src/components/antd/treeSelect';
import '../../src/components/antd/upload';

describe('Antd spec', function () {
  beforeEach(() => {
    jasmineEnzyme();
  });

  describe('default', () => {
    const defaultWrapper1 = mount(nj`<ant-Affix/>`());

    it('should be div tag by default', () => {
      expect(defaultWrapper1.find('div').exists()).toBe(true);
    });
  });

  describe('default', () => {
    const defaultWrapper1 = shallow(nj`<ant-Alert message="Success Text" type="success"/>`());

    it('should be div tag with class name "ant-alert"', () => {
      expect(defaultWrapper1.find('div').at(0)).toHaveClassName('ant-alert');
    });
  });

  describe('default', () => {
    const defaultWrapper1 = shallow(nj`<ant-Breadcrumb><ant-BreadcrumbItem>Home</ant-BreadcrumbItem></ant-Breadcrumb>`());

    it('should be div tag by default', () => {
      expect(defaultWrapper1).toHaveTagName('div');
    });

    it('and should have class name "ant-breadcrumb"', () => {
      expect(defaultWrapper1).toHaveClassName('ant-breadcrumb');
    });
  });

  describe('default', () => {
    const defaultWrapper1 = mount(nj`<ant-Button>Default</ant-Button>`());

    it('should be button tag by default', () => {
      expect(defaultWrapper1.find('button').at(0)).toHaveClassName('ant-btn');
    });
  });

  describe('default', () => {
    const defaultWrapper1 = mount(nj`<ant-Calendar/>`());

    it('should be div tag by default', () => {
      expect(defaultWrapper1.find('div').at(0)).toHaveClassName('ant-fullcalendar-fullscreen');
    });
  });

  describe('default', () => {
    const defaultWrapper1 = shallow(nj`<ant-Card><p>Card content</p></ant-Card>`());

    it('should be div tag by default', () => {
      expect(defaultWrapper1).toHaveTagName('div');
    });

    it('and should have class name "ant-card"', () => {
      expect(defaultWrapper1).toHaveClassName('ant-card');
    });
  });

  describe('default', () => {
    const defaultWrapper1 = mount(nj`<ant-Cascader />`());

    it('should be span tag with class name "ant-cascader-picker" by default', () => {
      expect(defaultWrapper1.find('span').at(0)).toHaveClassName('ant-cascader-picker');
    });
  });

  describe('default', () => {
    const defaultWrapper1 = shallow(nj`<ant-Checkbox>Checkbox</ant-Checkbox>`());

    it('should be label tag by default', () => {
      expect(defaultWrapper1).toHaveTagName('label');
    });
  });

  describe('default', () => {
    const defaultWrapper1 = mount(nj`<ant-Collapse />`());

    it('should be div tag with class name "ant-collapse" by default', () => {
      expect(defaultWrapper1.find('div').at(0)).toHaveClassName('ant-collapse');
    });
  });

  describe('default', () => {
    const defaultWrapper1 = mount(nj`<ant-DatePicker />`());

    it('should be span tag with class name "ant-calendar-picker" by default', () => {
      expect(defaultWrapper1.find('span').at(0)).toHaveClassName('ant-calendar-picker');
    });
  });

  describe('default', () => {
    const defaultWrapper1 = shallow(nj`<ant-Form><ant-FormItem>
          <!--{getFieldDecorator('userName', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <ant-Input placeholder="Username" />
          )}-->
        </ant-FormItem></ant-Form>` ());

    it('should be form tag by default', () => {
      expect(defaultWrapper1).toHaveTagName('form');
    });
  });

  describe('default', () => {
    const defaultWrapper1 = shallow(nj`<ant-Icon type="link"/>`());

    it('should be i tag by default', () => {
      expect(defaultWrapper1).toHaveTagName('i');
    });
  });

  describe('default', () => {
    const defaultWrapper1 = shallow(nj`<ant-Input />`());

    it('should be input tag by default', () => {
      expect(defaultWrapper1).toHaveTagName('input');
    });
  });

  describe('default', () => {
    const defaultWrapper1 = mount(nj`<ant-Menu />`());

    it('should be ul tag with class name "ant-menu" by default', () => {
      expect(defaultWrapper1.find('ul').at(0)).toHaveClassName('ant-menu');
    });
  });

  describe('default', () => {
    var message = jasmine.createSpyObj('Message', ['info', 'error', 'success', 'warning']);

    message.info('This is a normal message');

    it('should be called', () => {
      expect(message.info).toHaveBeenCalled();
    });
  });

  describe('default', () => {
    const defaultWrapper1 = mount(nj`<ant-Modal visible={true}/>`());
    console.log(5, defaultWrapper1.html());
    it('its props visible equal to true', () => {
      expect(defaultWrapper1.props().visible).toEqual(true);
    });
  });

  describe('default', () => {
    var notification = jasmine.createSpyObj('Notification', ['info', 'error', 'success', 'warning']);

    notification.info({
      message: 'Notification Title',
      description: 'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
    });

    it('should be called', () => {
      expect(notification.info).toHaveBeenCalled();
    });
  });

  describe('default', () => {
    const defaultWrapper1 = mount(nj`<ant-Pagination />`());

    it('should be ul tag with class name "ant-pagination" by default', () => {
      expect(defaultWrapper1.find('ul').at(0)).toHaveClassName('ant-pagination');
    });
  });

  describe('default', () => {
    const defaultWrapper1 = mount(nj`<ant-Popover />`());

    it('should be span tag by default', () => {
      expect(defaultWrapper1.find('span').exists()).toBe(true);
    });
  });

  describe('default', () => {
    const defaultWrapper1 = shallow(nj`<ant-Progress />`());

    it('should be div tag by default', () => {
      expect(defaultWrapper1).toHaveTagName('div');
    });
  });

  describe('default', () => {
    const defaultWrapper1 = shallow(nj`<ant-Radio />`());

    it('should be label tag by default', () => {
      expect(defaultWrapper1).toHaveTagName('label');
    });
  });

  describe('default', () => {
    const defaultWrapper1 = mount(nj`<ant-Select />`());

    it('should be div tag with class name "ant-select" by default', () => {
      expect(defaultWrapper1.find('div').at(0)).toHaveClassName('ant-select');
    });
  });

  describe('default', () => {
    const defaultWrapper1 = mount(nj`<ant-Slider />`());

    it('should be div tag with class name "ant-slider" by default', () => {
      expect(defaultWrapper1.find('div').at(0)).toHaveClassName('ant-slider');
    });
  });

  describe('default', () => {
    const defaultWrapper1 = mount(nj`<ant-Switch />`());

    it('should be span tag with class name "ant-switch" by default', () => {
      expect(defaultWrapper1.find('span').at(0)).toHaveClassName('ant-switch');
    });
  });

  describe('default', () => {
    const defaultWrapper1 = shallow(nj`<ant-Table />`());

    it('should be div tag by default', () => {
      expect(defaultWrapper1).toHaveTagName('div');
    });
  });

  describe('default', () => {
    const defaultWrapper1 = mount(nj`<ant-Tabs />`());

    it('should be div tag with class name "ant-tabs" by default', () => {
      expect(defaultWrapper1.find('div').at(0)).toHaveClassName('ant-tabs');
    });
  });

  describe('default', () => {
    const defaultWrapper1 = shallow(nj`<ant-Tooltip />`());

    it('should be span tag by default', () => {
      expect(defaultWrapper1.find('span').exists()).toBe(true);
    });
  });

  describe('default', () => {
    const defaultWrapper1 = mount(nj`<ant-Transfer />`());

    it('should be div tag by default', () => {
      expect(defaultWrapper1.find('div').at(0)).toHaveClassName('ant-transfer');
    });
  });

  describe('default', () => {
    const defaultWrapper1 = mount(nj`<ant-Tree />`());

    it('should be ul tag with class name "ant-tree" by default', () => {
      expect(defaultWrapper1.find('ul').at(0)).toHaveClassName('ant-tree');
    });
  });

  describe('default', () => {
    const defaultWrapper1 = mount(nj`<ant-TreeSelect />`());

    it('should be span tag with class name "ant-select" by default', () => {
      expect(defaultWrapper1.find('span').at(0)).toHaveClassName('ant-select');
    });
  });

  describe('default', () => {
    const defaultWrapper1 = shallow(nj`<ant-Upload />`());

    it('should be span tag by default', () => {
      expect(defaultWrapper1).toHaveTagName('span');
    });
  });
});
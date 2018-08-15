import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });
import jasmineEnzyme from 'jasmine-enzyme';
import nj from 'nornj';
import '../../src/components/antd-mobile/accordion';
import { ActionSheet } from '../../src/components/antd-mobile/actionSheet';
import '../../src/components/antd-mobile/activityIndicator';
import '../../src/components/antd-mobile/badge';
import '../../src/components/antd-mobile/button';
import '../../src/components/antd-mobile/calendar';
import '../../src/components/antd-mobile/card';
import '../../src/components/antd-mobile/carousel';
import '../../src/components/antd-mobile/checkbox';
import '../../src/components/antd-mobile/datePicker';
import '../../src/components/antd-mobile/datePickerView';
import '../../src/components/antd-mobile/drawer';
import '../../src/components/antd-mobile/flex';
import '../../src/components/antd-mobile/grid';
import '../../src/components/antd-mobile/icon';
import '../../src/components/antd-mobile/imagePicker';
import '../../src/components/antd-mobile/inputItem';
import '../../src/components/antd-mobile/list';
import '../../src/components/antd-mobile/modal';
import '../../src/components/antd-mobile/navBar';
import '../../src/components/antd-mobile/noticeBar';
import '../../src/components/antd-mobile/pickerView';
import '../../src/components/antd-mobile/pagination';
import '../../src/components/antd-mobile/progress';
import '../../src/components/antd-mobile/pullToRefresh';
import '../../src/components/antd-mobile/result';
import '../../src/components/antd-mobile/searchBar';
import '../../src/components/antd-mobile/swipeAction';
import '../../src/components/antd-mobile/tabBar';
import '../../src/components/antd-mobile/tag';

describe('antd mobile spec', function () {
  beforeEach(() => {
    jasmineEnzyme();
  });

  describe('default', () => {
    const defaultWrapper1 = mount(nj`<antm-Accordion><antm-AccordionPanel></antm-AccordionPanel></antm-Accordion>`());

    it('should be div tag with class name "am-accordion" by default', () => {
      expect(defaultWrapper1.find("div").at(0)).toHaveClassName('am-accordion');
    });

    it('should have child div tag with class name "am-accordion-item"', () => {
      expect(defaultWrapper1.find("div").at(1)).toHaveClassName('am-accordion-item');
    });
  });

  describe('default', () => {
    var actionSheet = jasmine.createSpyObj('ActionSheet', ['showActionSheetWithOptions', 'showShareActionSheetWithOptions', 'showShareActionSheetWithOptions', 'close']);
    const BUTTONS = ['Operation1', 'Operation2', 'Operation2', 'Delete', 'Cancel'];
    const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
    let wrapProps;
    if (isIPhone) {
      wrapProps = {
        onTouchStart: e => e.preventDefault()
      };
    }
    actionSheet.showActionSheetWithOptions({
      options: BUTTONS,
      cancelButtonIndex: BUTTONS.length - 1,
      destructiveButtonIndex: BUTTONS.length - 2,
      message: 'I am description, description, description',
      maskClosable: true,
      'data-seed': 'logId',
      wrapProps
    },
      (buttonIndex) => {
        this.setState({ clicked: BUTTONS[buttonIndex] });
      });

    it('actionSheet.showActionSheetWithOptions should be called', () => {
      expect(actionSheet.showActionSheetWithOptions).toHaveBeenCalled();
    });
  });

  describe('default', () => {
    const defaultWrapper1 = shallow(nj`<antm-ActivityIndicator animating/>`());

    it('should be div tag with class name "am-activity-indicator" by default', () => {
      expect(defaultWrapper1.find("div").at(0)).toHaveClassName('am-activity-indicator');
    });
  });

  describe('default', () => {
    const defaultWrapper1 = shallow(nj`<antm-Badge text='new' style="margin-left:12"/>`());

    it('should be span tag with class name "am-badge" by default', () => {
      expect(defaultWrapper1.find("span").at(0)).toHaveClassName('am-badge');
    });
  });

  describe('default', () => {
    const defaultWrapper1 = shallow(nj`<antm-Button>Default</antm-Button>`());
    it('should be a tag with class name "am-buttom" by default', () => {
      expect(defaultWrapper1.find("a").at(0)).toHaveClassName('am-button');
    });
  });

  describe('default', () => {
    const defaultWrapper1 = mount(nj`<antm-Calendar />`());
    it('should be div tag with class name "am-calendar" by default', () => {
      expect(defaultWrapper1.find('div').at(0)).toHaveClassName('am-calendar');
    });
  });

  describe('default', () => {
    const defaultWrapper1 = shallow(nj`<antm-Card>
      <antm-CardHeader
        title="This is title"
        extra={<span>this is extra</span>}
      />
      <antm-CardBody>
        <div>This is content of \`Card\`</div>
      </antm-CardBody>
      <antm-CardFooter content="footer content" extra={<div>extra footer content</div>} />
    </antm-Card>` ());

    it('should be div tag by default', () => {
      expect(defaultWrapper1).toHaveTagName('div');
    });

    it('and should have class name "am-card"', () => {
      expect(defaultWrapper1).toHaveClassName('am-card');
    });
  });

  describe('default', () => {
    const defaultWrapper1 = mount(nj`<antm-Carousel><img/></antm-Carousel>`());

    it('should be div tag with class name "am-carousel" by default', () => {
      expect(defaultWrapper1.find('div').at(0)).toHaveClassName('am-carousel');
    });
  });

  describe('default', () => {
    const defaultWrapper1 = mount(nj`<antm-CheckboxItem key="test">test</antm-CheckboxItem>`());

    it('should be div tag with class name "am-checkbox-item" by default', () => {
      expect(defaultWrapper1.find("div").at(0)).toHaveClassName('am-checkbox-item');
    });
  });

  describe('default', () => {
    const defaultWrapper1 = mount(nj`<antm-DatePicker><antm-ListItem arrow="horizontal">Datetime</antm-ListItem></antm-DatePicker>`());

    it('should be div tag with class name "am-list-item" by default', () => {
      expect(defaultWrapper1.find('div').at(1)).toHaveClassName('am-list-item');
    });
    // defaultWrapper1.find('div').at(0).simulate('click');
  });

  describe('default', () => {
    const defaultWrapper1 = mount(nj`<antm-DatePickerView />`());
    it('should be div tag with class name "am-picker" by default', () => {
      expect(defaultWrapper1.find('div').at(0)).toHaveClassName('am-picker');
    });
  });

  describe('default', () => {
    const sidebar = nj`<antm-List><antm-List.Item key="0">Category</antm-List.Item><antm-List.Item key="1">Category2</antm-List.Item></antm-List>`();
    const defaultWrapper1 = mount(nj`<antm-Drawer sidebar=${sidebar}>Click upper-left corner</antm-Drawer>`());

    it('should be div tag with class name "am-drawer" by default', () => {
      expect(defaultWrapper1.find('div').at(0)).toHaveClassName('am-drawer');
    });
  });

  describe('default', () => {
    const defaultWrapper1 = shallow(nj`<antm-Flex>
      <antm-FlexItem></antm-FlexItem>
      <antm-FlexItem></antm-FlexItem>
    </antm-Flex>` ());

    it('should be div tag with class name "am-flexbox" by default', () => {
      expect(defaultWrapper1.find('div').at(0)).toHaveClassName('am-flexbox');
    });
  });

  describe('default', () => {
    const defaultWrapper1 = shallow(nj`<antm-Grid/>`());

    it('should be div tag by default', () => {
      expect(defaultWrapper1).toHaveTagName('div');
    });
  });

  describe('default', () => {
    const defaultWrapper1 = shallow(nj`<antm-Icon type="link"/>`());

    it('should be svg tag by default', () => {
      expect(defaultWrapper1).toHaveTagName('svg');
    });
  });

  describe('default', () => {
    const defaultWrapper1 = shallow(nj`<antm-ImagePicker />`());

    it('should be div tag with class name "am-image-picker" by default', () => {
      expect(defaultWrapper1.find('div').at(0)).toHaveClassName('am-image-picker');
    });
  });

  describe('default', () => {
    const defaultWrapper1 = mount(nj`<antm-InputItem
            type="phone"
            placeholder="phone number"
            clear
          >phone</InputItem>` ());
    it('should contain input tag with "tel" type', () => {
      expect(defaultWrapper1.find('input[type="tel"]').exists()).toBe(true);
    });
  });

  describe('default', () => {
    const defaultWrapper1 = mount(nj`<antm-Modal visible={true}/>`());

    it('its props visible equal to true', () => {
      expect(defaultWrapper1.props().visible).toEqual(true);
    });
  });

  describe('default', () => {
    const defaultWrapper1 = shallow(nj`<antm-NavBar mode="dark" leftContent="Back">NavBar</antm-NavBar>`());

    it('should be div tag by default', () => {
      expect(defaultWrapper1).toHaveTagName('div');
    });
  });

  describe('default', () => {
    const defaultWrapper1 = shallow(nj`<antm-NoticeBar marqueeProps=${{ loop: true }}>
    Notice: The arrival time of incomes and transfers of Yu &#39;E Bao will be delayed during National Day.
  </antm-NoticeBar>` ());
    it('should be div tag by default', () => {
      expect(defaultWrapper1).toHaveTagName('div');
    });
  });

  describe('default', () => {
    const defaultWrapper1 = shallow(nj`<antm-Pagination total=${5} current=${1} locale=${{
      prevText: 'Prev',
      nextText: 'Next',
    }}/>`());

    it('should be div tag with class name "am-pagination" by default', () => {
      expect(defaultWrapper1.find('div').at(0)).toHaveClassName('am-pagination');
    });
  });

  describe('default', () => {
    const defaultWrapper1 = shallow(nj`<antm-Progress percent=${40} position="normal" appearTransition />`());

    it('should be div tag with class name "am-progress-outer" by default', () => {
      expect(defaultWrapper1.find('div').at(0)).toHaveClassName('am-progress-outer');
    });
  });

  describe('default', () => {
    const seasons = [
      [
        {
          label: '2013',
          value: '2013',
        },
        {
          label: '2014',
          value: '2014',
        },
      ],
      [
        {
          label: '春',
          value: '春',
        },
        {
          label: '夏',
          value: '夏',
        },
      ],
    ];
    const defaultWrapper1 = mount(nj`<antm-PickerView data=${seasons} cascade=${false} />`());
    console.log(defaultWrapper1);
    it('should be div tag with class name "am-picker" by default', () => {
      expect(defaultWrapper1.find('div').at(0)).toHaveClassName('am-picker');
    });
  });

  describe('default', () => {
    const defaultWrapper1 = shallow(nj`<antm-Result />`());

    it('should be div tag with class name "am-result" by default', () => {
      expect(defaultWrapper1.find('div').at(0)).toHaveClassName('am-result');
    });
  });

  describe('default', () => {
    const defaultWrapper1 = shallow(nj`<antm-SearchBar plaseholder="search" maxLenght=${8}/>`());

    it('should be form tag with class name "am-search" by default', () => {
      expect(defaultWrapper1.find('form').at(0)).toHaveClassName('am-search');
    });
  });

  describe('default', () => {
    const defaultWrapper1 = mount(nj`<antm-TabBar>
        <antm-TabBar.Item title="Life" key="Life"></antm-TabBar.Item>
        <antm-TabBar.Item title="Wine" key="Wine"></antm-TabBar.Item>
      </antm-TabBar>`());

    it('should be div tag with class name "am-tab-bar" by default', () => {
      expect(defaultWrapper1.find('div').at(0)).toHaveClassName('am-tab-bar');
    });
  });

  describe('default', () => {
    const defaultWrapper1 = shallow(nj`<antm-Tag selected>selected</antm-Tag>`());

    it('should be div tag with class name "am-tag" by default', () => {
      expect(defaultWrapper1.find('div').at(0)).toHaveClassName('am-tag');
    });
  });
});
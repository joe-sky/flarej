import { registerComponent } from 'nornj';
import Radio from 'antd/lib/radio';
import 'antd/lib/radio/style/index';

registerComponent({
  'ant-Radio': Radio,
  'ant-RadioButton': Radio.Button,
  'ant-RadioGroup': {
    component: Radio.Group,
    options: {
      hasEventObject: true
    }
  }
});

export {
  Radio
};

export default Radio;
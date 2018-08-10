import { registerComponent } from 'nornj';
import Switch from 'antd/lib/switch';
import 'antd/lib/switch/style/index';

registerComponent({
  'ant-Switch': {
    component: Switch,
    options: {
      valuePropName: 'checked'
    }
  }
});

export {
  Switch
};

export default Switch;
import { registerComponent } from 'nornj';
import Checkbox from 'antd/lib/checkbox';
import 'antd/lib/checkbox/style/index';
const CheckboxGroup = Checkbox.Group;

registerComponent({
  'ant-Checkbox': {
    component: Checkbox,
    options: {
      hasEventObject: true,
      valuePropName: 'checked',
      targetPropName: 'checked'
    }
  },
  'ant-CheckboxGroup': {
    component: CheckboxGroup,
    options: {
      needToJS: true
    }
  }
});

export {
  Checkbox,
  CheckboxGroup
};

export default Checkbox;
import { registerComponent } from 'nornj';
import Checkbox from 'antd-mobile/lib/checkbox/index';

registerComponent({
  'antm-Checkbox': Checkbox,
  'antm-CheckboxItem': Checkbox.CheckboxItem,
  'antm-CheckboxAgreeItem': Checkbox.AgreeItem
});

export default Checkbox;
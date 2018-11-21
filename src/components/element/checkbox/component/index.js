import { registerComponent } from 'nornj';
import Checkbox from 'element-react/dist/npm/es5/src/checkbox';

registerComponent({
  'el-Checkbox': {
    component: Checkbox,
    options: {
      valuePropName: 'checked'
    }
  },
  'el-CheckboxGroup': {
    component: Checkbox.Group,
    options: {
      needToJS: true
    }
  }
});

export default Checkbox;
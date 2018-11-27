import { registerComponent } from 'nornj';
import Cascader from 'element-react/dist/npm/es5/src/cascader';

registerComponent({
  'el-Cascader': {
    component: Cascader,
    options: {
      needToJS: true
    }
  }
});

export default Cascader;
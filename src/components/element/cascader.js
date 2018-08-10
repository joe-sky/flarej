import { registerComponent } from 'nornj';
import Cascader from 'element-react/dist/npm/es5/src/cascader';
import 'element-theme-default/lib/icon.css';
import 'element-theme-default/lib/cascader.css';

registerComponent({
  'el-Cascader': {
    component: Cascader,
    options: {
      needToJS: true
    }
  }
});

export {
  Cascader
};

export default Cascader;
import { registerComponent } from 'nornj';
import Cascader from 'antd/lib/cascader';
import 'antd/lib/cascader/style/index';

registerComponent({
  'ant-Cascader': {
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
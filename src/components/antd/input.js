import { registerComponent } from 'nornj';
import Input from 'antd/lib/input';
import 'antd/lib/input/style/index';

registerComponent({
  'ant-Input': {
    component: Input,
    options: {
      hasEventObject: true
    }
  },
  'ant-InputGroup': Input.Group,
  'ant-TextArea': {
    component: Input.TextArea,
    options: {
      hasEventObject: true
    }
  },
  'ant-Search': Input.Search
});

export {
  Input
};

export default Input;

import { registerComponent } from 'nornj';
import List from 'antd-mobile/lib/list/index';

registerComponent({
  'antm-List': List,
  'antm-ListItem': List.Item
});

export default List;
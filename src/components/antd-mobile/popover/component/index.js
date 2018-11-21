import { registerComponent } from 'nornj';
import Popover from 'antd-mobile/lib/popover/index';

registerComponent({
  'antm-Popover': Popover,
  'antm-PopoverItem': Popover.Item
});

export default Popover;
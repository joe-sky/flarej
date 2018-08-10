import { registerComponent } from 'nornj';
import {
  DatePicker,
  DateRangePicker,
  TimeSelect,
  TimePicker,
  TimeRangePicker
} from 'element-react/dist/npm/es5/src/date-picker';
import 'element-theme-default/lib/icon.css';
import 'element-theme-default/lib/date-picker.css';
import 'element-theme-default/lib/time-select.css';
import 'element-theme-default/lib/time-picker.css';

registerComponent({
  'el-DatePicker': DatePicker,
  'el-DateRangePicker': {
    component: DateRangePicker,
    options: {
      needToJS: true
    }
  },
  'el-TimeSelect': TimeSelect,
  'el-TimePicker': TimePicker,
  'el-TimeRangePicker': {
    component: TimeRangePicker,
    options: {
      needToJS: true
    }
  }
});

export {
  DatePicker,
  DateRangePicker,
  TimeSelect,
  TimePicker,
  TimeRangePicker
};

export default DatePicker;
import { registerComponent } from 'nornj';
import {
  DatePicker,
  DateRangePicker,
  TimeSelect,
  TimePicker,
  TimeRangePicker
} from 'element-react/dist/npm/es5/src/date-picker';

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

DatePicker.DateRangePicker = DateRangePicker;
DatePicker.TimeSelect = TimeSelect;
DatePicker.TimePicker = TimePicker;
DatePicker.TimeRangePicker = TimeRangePicker;

export default DatePicker;
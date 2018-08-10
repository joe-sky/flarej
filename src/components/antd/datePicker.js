import { registerComponent } from 'nornj';
import DatePicker from 'antd/lib/date-picker';
import 'antd/lib/date-picker/style/index';

registerComponent({
  'ant-DatePicker': DatePicker,
  'ant-MonthPicker': DatePicker.MonthPicker,
  'ant-WeekPicker': DatePicker.WeekPicker,
  'ant-RangePicker': {
    component: DatePicker.RangePicker,
    options: {
      needToJS: true
    }
  }
});

export {
  DatePicker
};

export default DatePicker;

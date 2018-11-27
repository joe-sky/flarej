## Element-React

为`Element-React`组件的分模块引入，以及与`NornJ`模板的结合做的一个简单的封装。使用方法如下：

```js
import 'flarej/lib/components/element/form';  //按`flarej/lib/components/element/组件名`引入组件
import 'flarej/lib/components/element/select';
import 'flarej/lib/components/element/input';
...

class DemoPage extends React.Component {
  ...
  render() {  //在nj模板中，用"el-*"为组件名使用即可。各组件的用法请参考Element-React官网
    return nj`
      <el-Form model={formModel} {rules} style="width:300px;" ref="form" labelWidth="100">
        <el-Form.Item label="密码" prop="pass">
          <el-Input type="textarea" :#mobx-model="inputRole" autoComplete="off" />
        </el-Form.Item>
        <el-Form.Item label="区域" prop="region">
          <el-Select placeholder="请选择活动区域" :#mobx-model="selectValue">
            <el-Select.Option label="区域一" value="shanghai"></el-Select.Option>
            <el-Select.Option label="区域二" value="beijing"></el-Select.Option>
          </el-Select>
        </el-Form.Item>
      </el-Form>
    `();
  }
}
```

### 支持的组件目录

* el-Form
* el-Input
* el-Select
* el-Checkbox
* el-Radio
* el-Cascader
* el-Switch
* el-DatePicker
* el-DateRangePicker
* el-TimeSelect
* el-TimePicker
* el-TimeRangePicker
* 与Element-React官方文档支持的组件保持同步更新，目前还未全部引入。如果需要使用还没引入的组件，可以按照[这里的方式](https://github.com/joe-sky/nornj-cli/blob/master/docs/guides/antDesign.md#%E5%8F%AF%E8%83%BD%E4%BC%9A%E9%81%87%E5%88%B0%E7%9A%84%E9%97%AE%E9%A2%98)手动引入即可。
* 各组件的详细使用方式请看[Element-React 官方文档](https://eleme.github.io/element-react/#/zh-CN/quick-start)
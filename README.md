# FlareJ

```
   ___      __
 /\  __\   /\_\
 \_\ \_/_  \/\ \
/\___  __\  \ \ \
\/__/\ \_/  _\ \ \
    \_\ \  /\ \_\ \ (Component, {
   /\___/  \ \____/   ...responsiveSettings
   \/__/    \/___/  });

```

`FlareJ`是一个基于`React`和[NornJ模板引擎](https://github.com/joe-sky/nornj)的UI组件库。

> [FlareJ的前身](https://github.com/joe-sky/flarej-jquery)是一个基于jQuery的UI组件库，在2011-2015年曾服务于`jd.com`内部多个PC及移动端系统中。

[![NPM Version][npm-image]][npm-url]
<a href="https://travis-ci.org/joe-sky/flarej"><img src="https://travis-ci.org/joe-sky/flarej.svg?branch=master" alt="Travis CI Status"/></a>
<a href="https://codecov.io/gh/joe-sky/flarej"><img src="https://codecov.io/gh/joe-sky/flarej/branch/master/graph/badge.svg" alt="Codecov" /></a>
[![NPM Downloads][downloads-image]][npm-url]

## 组件

目前已有的组件(点击查看示例或文档)：

### 原创组件

* [Pagination(分页)](https://github.com/joe-sky/flarej/blob/master/examples/pagination.html)
  * [PageCount](https://github.com/joe-sky/flarej/blob/master/src/components/pagination/pagination.js#L288)
  * [PageDataCount](https://github.com/joe-sky/flarej/blob/master/src/components/pagination/pagination.js#L332)
  * [PageSize](https://github.com/joe-sky/flarej/blob/master/src/components/pagination/pagination.js#L369)
* [Grid(栅格)](https://github.com/joe-sky/flarej/blob/master/examples/grid.html)
  * [Row](https://github.com/joe-sky/flarej/blob/master/src/components/grid/grid.js#L12)
  * [RowLeft](https://github.com/joe-sky/flarej/blob/master/src/components/grid/grid.js#L101)
  * [RowRight](https://github.com/joe-sky/flarej/blob/master/src/components/grid/grid.js#L113)
  * [Col](https://github.com/joe-sky/flarej/blob/master/src/components/grid/grid.js#L125)
  * [Clearfix](https://github.com/joe-sky/flarej/blob/master/src/components/grid/grid.js#L182)
* [Gesture(手势)](https://github.com/joe-sky/flarej/blob/master/examples/gesture.html)

可以使用[babel-plugin-import](https://github.com/ant-design/babel-plugin-import)按需引入以上组件，`.babelrc`配置：

```js
{
  "plugins": [
    ["import", {
      "libraryName": "flarej",
      "libraryDirectory": "lib/components",
      "style": true
    }]
  ]
}
```

引入组件：

```js
import { Row, Col, Pagination } from 'flarej';
```

### 高阶组件

* [Responsive(使组件状态支持响应式)](https://github.com/joe-sky/flarej/blob/master/src/higherOrders/responsive.js)

使用`Responsive`高阶组件，可创建各属性值支持按响应式条件变化的组件。使用方法如下，可以用`fj`变量作为`Responsive`的别名：

```js
import fj from 'flarej/lib/higherOrders/responsive';
//或 import fj from 'flarej';
import EChart from 'flarej/lib/components/ECharts';

//创建响应式组件
const FjEChart = fj(EChart, {
  responsive: false,          //是否开启响应式
  responsiveDelay: 70,        //响应式执行后修改组件属性值延迟时间
  responsiveOnlyWidth: true,  //只在页面宽度改变时执行响应式
  defaultResponsiveParam: {   //默认响应式参数
    '(max-width: 1350px)': {  //响应式条件，与css媒体查询语法一致
      state: {                //组件各属性值
        width: 200
      }
    },
    '(min-width: 1351px)': {
      state: {
        width: 'auto'
      }
    }
  }
});

ReactDOM.render(
  <FjEChart autoResize={false}
            responsive={true}
            responsiveParam={{  //可在使用组件时继续传入其他响应式参数，会在defaultResponsiveParam后面执行
              '(max-width: 1350px)': {
                state: {
                  width: 200
                }
              }
            }}
  />,
document.body);
```

#### 使用Responsive高阶组件创建的组件

* [Pagination(分页)](https://github.com/joe-sky/flarej/blob/master/examples/pagination.html)

### 第三方组件

* [Ant Design](https://github.com/joe-sky/flarej/blob/master/docs/antd.md)
* [Ant Design Mobile](https://github.com/joe-sky/flarej/blob/master/docs/antd-mobile.md)
* [Echarts](https://github.com/joe-sky/flarej/blob/master/docs/echarts.md)
* [Element-React](https://github.com/joe-sky/flarej/blob/master/docs/element-react.md)

## 依赖的项目

* [NornJ](https://github.com/joe-sky/nornj)
* [Font-Awesome](https://github.com/FortAwesome/Font-Awesome)
* [react-fontawesome](https://github.com/danawoodman/react-fontawesome)
* [core-decorators.js](https://github.com/jayphelps/core-decorators.js)
* [classnames](https://github.com/JedWatson/classnames)
* [fecha](https://github.com/taylorhakes/fecha)
* [querystring](https://github.com/Gozala/querystring)
* [size-sensor](https://github.com/hustcc/size-sensor)

## 安装

使用npm安装:

```sh
npm install flarej
```

## 浏览器支持

所有现代浏览器以及Internet Explorer 9+。

## License

MIT

[npm-image]: http://img.shields.io/npm/v/flarej.svg
[downloads-image]: http://img.shields.io/npm/dm/flarej.svg
[npm-url]: https://www.npmjs.org/package/flarej
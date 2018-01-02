import { Component } from 'react';
import PropTypes from 'prop-types';
import { registerComponent } from 'nornj';
import { registerTmpl } from 'nornj-react';
import classNames from 'classnames';
import * as regExp from '../../utils/regexp';
import autobind from 'core-decorators/lib/autobind';
import responsive from '../../higherOrders/responsive';
import tmpl from './carousel.t.html';

/**
 * 轮播图
 */
class Carousel extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props);
    return tmpl.carousel(this.state, this.props, this,{
      listItem: this.props.children,
    });
  }
}
registerComponent({ 'fj-Carousel': Carousel });




export default Carousel;
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
  static defaultProps = {
    arrows: true, //默认显示左右箭头
    dots: true, //默认显示分页
    effect: 'fade', //默认效果：fade
    infinite: false, //默认是否无限循环：false
  }

  state = {
    current: 0,
  }

  constructor(props) {
    super(props);
    this.state.arrows = props.arrows;
    this.state.dots = props.dots;
    this.state.effect = props.effect;
    this.state.infinite = props.infinite;
  }

  //点击向右箭头
  @autobind
  goRight(){
    console.log(this.props);
    const type = this.props.effect;
    if(type == 'fade'){
      this.goRightFade();
    }
  }

  //点击向右箭头-fade效果
  goRightFade(){
    console.log('right');
  }

  getType(){
    const type = this.props.effect;
    let classType = '';
    if(type == 'fade'){
      classType = 'carousel-fade';
    }
    return classType;
  }

  getDots(){
    const children = this.props.children;
    const current = this.state.current;
    const dots = children.map((item,index)=>{
      const val = {};
      if(index == current){
        val.active = 'active';
      }
      return val;
    });
    return dots;
  }

  componentDidMount(){
    //判断children数量，控制是否显示dots
    // const children = this.props.children;
    // if(children.length <= 1){
    //   this.setState({
    //     dots: false
    //   });
    // }
  }

  render() {
    return tmpl.carousel(this.state, this.props, this,{
      listItem: this.props.children,
      classType: this.getType(),
      dotsItem: this.getDots(),
    });
  }
}
registerComponent({ 'fj-Carousel': Carousel });




export default Carousel;
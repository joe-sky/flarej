import { Component, Children } from 'react';
import PropTypes from 'prop-types';
import nj from 'nornj';
import { registerTmpl } from 'nornj-react';
import { isMobile } from '../../utils/browsers';
import { lazyDo } from '../../utils/delayOperate';
import { on, off } from '../../utils/domEvent';
import tmpl from './gesture.t.html';
import autobind from 'core-decorators/lib/autobind';

@registerTmpl('fj-Gesture')
export default class Gesture extends Component {
  static propTypes = {
    onTapStart: PropTypes.func, //触摸开始
    onTap: PropTypes.func, //轻触
    onPan: PropTypes.func, //平移
    onTapEnd: PropTypes.func, //触摸结束
    onTapHold: PropTypes.func, //长按
    onSwipe: PropTypes.func, //扫动
    onSwipeLeft: PropTypes.func, //左扫动
    onSwipeRight: PropTypes.func, //右扫动
    onSwipeTop: PropTypes.func, //上扫动
    onSwipeBottom: PropTypes.func, //下扫动
    onScrollEnd: PropTypes.func, //滚动结束
    onPinch: PropTypes.func, //双指缩放
    onRotate: PropTypes.func, //双指旋转
    onShake: PropTypes.func //摇动
  };

  static defaultProps = {
    multiTapStart: false, //是否执行多点触控的tapStart事件
    preventScroll: true, //是否阻止滚动
    preventClick: true, //是否阻止点击
    scrollElemV: null, //滚动条所在元素(纵向)
    scrollElemH: null, //滚动条所在元素(横向)
    durationLimitH: 300, //触摸交互时间如果长于该值则视作按住
    durationLimitS: 150, //触摸交互时间如果长于该值则不视作扫动
    distanceLimitH: 30, //扫动水平位移必须大于该值
    distanceLimitV: 75, //扫动垂直位移必须大于该值
    scrollMaxX: null, //纵向平移时如x轴位移不大于该值则视为视为满足滚动条件之一,如为null则不发生滚动
    scrollMaxY: null, //横向平移时如y轴位移不大于该值则视为视为满足滚动条件之一,如为null则不发生滚动
    scrollMinX: 10, //横向平移时如x轴位移不小于该值则视为视为满足滚动条件之一,另一个条件为scrollMaxY
    scrollMinY: 5, //纵向平移时如y轴位移不小于该值则视为视为满足滚动条件之一,另一个条件为scrollMaxX
    scalePinchClose: 0.05, //缩小时比例必须小于该阀值
    scalePinchOpen: 0.05, //放大时比例必须大于该阀值
    durationPinch: 100, //每次缩放间隔时间
    durationRotate: 100, //每次旋转间隔时间
    durationPan: null, //每次平移间隔时间
    rotationCcw: 5, //顺时间旋转时角度必须大于该阀值
    rotationCw: 5, //逆时间旋转时角度必须大于该阀值
    tapDuration: 350, //触摸时间不超过该阀值则视为轻触
    tapLimitX: 0,
    tapLimitY: 0,
    holdLimitX: 1, //检测长按移动x轴距离阀值
    holdLimitY: 1, //检测长按移动y轴距离阀值
    shakeLimit: 0.23, //摇动速度超过该阀值则视为摇动
    shakeDuration: 100, //每次检测摇动间隔时间
    shakeFreezeDelay: 800 //解除冻结摇动延迟时间
  };

  constructor(props) {
    super(props);

    if (isMobile) {
      this.startPosX = 0; //起始触摸点x轴坐标
      this.lastPosX = 0; //最后触摸点x轴坐标
      this.startPosY = 0; //起始触摸点y轴坐标
      this.lastPosY = 0; //最后触摸点y轴坐标
      this.dx = 0; //触摸x轴移动距离
      this.dy = 0; //触摸y轴移动距离
      this.lastPinchTime = 0; //最后缩放时间
      this.lastScale = 0; //最后一次缩放的比例值
      this.lastPanTime = 0; //最后一次平移时间
      this.lastRotateTime = 0; //最后旋转时间
      this.lastRotation = 0; //最后一次旋转的角度变化值
      this.preventScroll = props.preventScroll;

      //滚动条所在元素
      if (props.onTapHold) {
        if (props.scrollElemV) {
          this.scrollElemV = props.scrollElemV;
        } else {
          this.scrollElemV = document.body;
        }
        if (!props.scrollElemH) {
          this.scrollElemH = this.scrollElemV;
        }
      }

      //是否支持摇动
      this.supportShake = 'DeviceMotionEvent' in window;
      if (this.supportShake && this.props.onShake) { //记录上一次检测的摇动值
        this.lastShakeX = 0;
        this.lastShakeY = 0;
        this.lastShakeZ = 0;
        this.lastTime = 0;
        this.freezeShake = false;

        on('devicemotion', this.deviceMotion, window);
      }
    }
  }

  //触摸开始
  @autobind
  touchStart(e) {
    let props = this.props,
      posAll = this.getTouchPos(e),
      pos = posAll[0],
      x = pos[0],
      y = pos[1],
      tl = posAll.length,
      ret = { e, x: x, y: y, fingers: tl },
      scrollElemV = null,
      scrollElemH = null;

    //记录触摸手指数
    this.tapFingers = tl;

    //起始与结束点坐标
    this.startPosX = x;
    this.lastPosX = x;
    this.startPosY = y;
    this.lastPosY = y;

    if (tl == 1) {
      //各参数初始化
      this.duration = Date.now();
      this.isScroll = null;
      this.scale = null;
      this.lastScale = 0;
      this.isPinch = false;
      this.rotation = null;
      this.lastRotation = 0;
      this.isRotate = false;
      this.dx = 0;
      this.dy = 0;

      //如注册长按事件则需检测滚动条位
      if (props.onTapHold) {
        this.scrollElemTop = this.scrollElemV.scrollTop;
        this.scrollElemLeft = this.scrollElemH.scrollLeft;
      }

      props.onTapStart && props.onTapStart.call(this, ret);

      //触摸交互时长大于阀值并没有发生位移,则视为长按
      if (props.onTapHold) {
        this.timeoutH = lazyDo(() => {
          if (!this.isPinch && !this.isRotate && this.dx <= props.holdLimitX && this.dy <= props.holdLimitY && this.scrollElemTop == this.scrollElemV.scrollTop && this.scrollElemLeft == this.scrollElemH.scrollLeft) {
            ret.fingers = this.tapFingers;
            props.onTapHold.call(this, ret);
          }
        }, props.durationLimitH);
      }
    } else {
      if (tl == 2) {
        let pos1 = posAll[0],
          pos2 = posAll[1];

        //计算两指触摸点间初始距离
        this.fingerDistS = this.getPosDistance(pos1, pos2);

        //计算两指触摸点间初始角度
        this.fingerRotateS = this.getPosAngle(pos1, pos2);
      }

      //多点tapStart事件
      if (props.multiTapStart) {
        props.onTapStart && props.onTapStart.call(this, ret);
      }
    }
  }

  //触摸移动
  @autobind
  touchMove(e) {
    let props = this.props,
      posAll = this.getTouchPos(e),
      pos = posAll[0],
      x = pos[0],
      y = pos[1],
      mx = props.scrollMaxX,
      my = props.scrollMaxY,
      ix = props.scrollMinX,
      iy = props.scrollMinY,
      tl = posAll.length,
      twoFingers = tl === 2 && (props.onPinch || props.onRotate);

    this.lastPosX = x;
    this.dx = this.lastPosX - this.startPosX;
    this.lastPosY = y;
    this.dy = this.lastPosY - this.startPosY;

    if (twoFingers) { //缩放时禁止默认滚动
      e.preventDefault();
    }

    if (this.isScroll) { //如果在上次触发的touchMove事件中执行了滚动,则本次也视作为滚动
      return;
    }
    if (this.isScroll == null) {
      if (mx != null && Math.abs(this.dy) >= iy && Math.abs(this.dx) <= mx) { //如果垂直发生过位移且大于阀值,并且水平位移在滚动阀值内则视为滚动
        this.isScroll = true;
        return;
      }
      if (my != null && Math.abs(this.dx) >= ix && Math.abs(this.dy) <= my) { //如果水平发生过位移且大于阀值,并且垂直位移在滚动阀值内则视为滚动
        this.isScroll = true;
        return;
      }
    }

    //如果非滚动,则本次触摸一直为平移
    if (this.preventScroll) {
      e.preventDefault(); //阻止默认滚动
    }
    this.isScroll = false;

    //移动方向
    let dir = this.getMoveDir(),
      curTime = Date.now();

    if (twoFingers) {
      let diffTime = curTime - this.lastPinchTime;

      //双指缩放
      if (diffTime > props.durationPinch) { //每隔一定时间检测
        this.lastPinchTime = curTime;
        this.isPinch = true;

        //计算缩放比例
        let scale = this.getPosScale(posAll[0], posAll[1]),
          dirS = null;

        if (scale != this.lastScale) { //比例有变化时才执行缩放
          this.lastScale = scale;

          if (((scale < 1) && (scale % 1) < (1 - props.scalePinchClose)) || ((scale > 1) && (scale % 1) > props.scalePinchOpen)) { //大于缩放阀值时执行事件
            dirS = scale < 1 ? -1 : 1;
            this.scale = scale;

            this.preventScroll = true; //缩放时阻止滚动
            props.onPinch && props.onPinch.call(this, { e, scale: scale, dir: dirS });
          }
        }
      }

      diffTime = curTime - this.lastRotateTime;

      //双指旋转
      if (diffTime > props.durationRotate) { //每隔一定时间检测
        this.lastRotateTime = curTime;
        this.isRotate = true;

        //计算旋转角度变化值
        let rotation = this.getPosRotation(posAll[0], posAll[1]),
          dirS = null;

        if (rotation != this.lastRotation) { //旋转角度有变化时才执行旋转
          this.lastRotation = rotation;

          if (((rotation < 1) && (-1 * (rotation) > props.rotationCcw)) || ((rotation > 1) && (rotation > props.rotationCw))) { //大于旋转阀值时执行事件
            dirS = rotation < 1 ? -1 : 1;
            this.rotation = rotation;

            this.preventScroll = true; //缩放时阻止滚动
            props.onRotate && props.onRotate.call(this, { e, rotation: rotation, dir: dirS });
          }
        }
      }
    }

    //平移
    if (props.durationPan == null || curTime - this.lastPanTime > props.durationPan) {
      this.lastPanTime = curTime;
      props.onPan && props.onPan.call(this, { e, x: x, y: y, dx: this.dx, dy: this.dy, dirX: dir[0], dirY: dir[1], fingers: tl, touchId: this.getTouchIndex(e) });
    }
  }

  //触摸结束
  @autobind
  touchEnd(e) {
    let props = this.props,
      isScroll = this.isScroll;

    if (e.touches.length > 0) {
      return;
    }

    //清除长按检测
    if (this.timeoutH) {
      clearTimeout(this.timeoutH);
      this.timeoutH = null;
    }

    if (this.isScroll) {
      props.onScrollEnd && props.onScrollEnd.call(this, { e });
      return;
    }

    let dir = this.getMoveDir(), //移动方向
      ret = { e, x: this.lastPosX, y: this.lastPosY, dx: this.dx, dy: this.dy, dirX: dir[0], dirY: dir[1], fingers: this.tapFingers }, //返回参数对象
      gtH = Math.abs(this.dx) > props.distanceLimitH,
      gtV = Math.abs(this.dy) > props.distanceLimitV,
      cTime = Date.now(),
      duration = cTime - this.duration;

    //如触摸交互时长小于阀值则视作扫动
    if (duration <= props.durationLimitS) {
      let dirS = '';
      if (gtH) {
        if (dir[0] == 'l') {
          dirS += 'l';
          props.onSwipeLeft && props.onSwipeLeft.call(this, ret);
        } else {
          dirS += 'r';
          props.onSwipeRight && props.onSwipeRight.call(this, ret);
        }
      }
      if (gtV) {
        if (dir[1] == 't') {
          dirS += 't';
          props.onSwipeTop && props.onSwipeTop.call(this, ret);
        } else {
          dirS += 'b';
          props.onSwipeBottom && props.onSwipeBottom.call(this, ret);
        }
      }
      if (gtH || gtV) {
        ret.dirS = dirS; //扫动方向
        props.onSwipe && props.onSwipe.call(this, ret);
      }
    }

    //如果触摸交互时长小于阀值且没有发生位移,则视为轻触
    if (duration <= props.tapDuration && this.dx <= props.tapLimitX && this.dy <= props.tapLimitY) {
      if (props.preventClick) {
        e.preventDefault();
      }

      props.onTap && props.onTap.call(this, ret);
    }

    //是否缩放过
    if (this.scale != null) {
      ret.scale = this.scale;
    }

    //是否旋转过
    if (this.rotation != null) {
      ret.rotation = this.rotation;
    }

    props.onTapEnd && props.onTapEnd.call(this, ret);
  }

  //设备摇动侦测
  @autobind
  deviceMotion(e) {
    let props = this.props,
      acceleration = e.accelerationIncludingGravity, //获取含重力的加速度
      curTime = Date.now(),
      diffTime = curTime - this.lastTime, //获取当前时间和最后检测时间间隔
      ret = { e };

    //每隔一定时间检测一次
    if (diffTime > props.shakeDuration) {
      this.lastTime = curTime;
      let x = acceleration.x,
        y = acceleration.y,
        z = acceleration.z,
        speed = Math.abs(x + y + z - this.lastShakeX - this.lastShakeY - this.lastShakeZ) / diffTime;

      if (speed > props.shakeLimit) { //摇动速度超过阀值
        if (!this.freezeShake) {
          this.freezeShake = true; //为防止同一次摇动中多次摇中,此处设置如果摇中一次,则本次摇动中不可能再次摇中
          props.onShake(ret);
        }

        lazyDo(() => {
          this.freezeShake = false;
        }, props.shakeFreezeDelay, 'gesture_shake', this);
      }

      this.lastShakeX = x;
      this.lastShakeY = y;
      this.lastShakeZ = z;
    }
  }

  //计算触摸点坐标值
  getTouchPos(e) {
    let touches = e.touches,
      osLeft = this.wrapper.offsetLeft,
      osTop = this.wrapper.offsetTop,
      ts = null,
      ret = [];

    for (let i = 0, l = touches.length; i < l; i++) {
      ts = touches[i];
      ret[ret.length] = [ts.pageX - osLeft, ts.pageY - osTop]; //参数依次为:x轴坐标、y轴坐标、触摸点唯一标识
    }

    return ret;
  }

  //计算触摸移动方向
  getMoveDir() {
    let dirX, dirY;
    if (this.dx > 0) {
      dirX = "r";
    } else {
      dirX = "l";
    }
    if (this.dy > 0) {
      dirY = "b";
    } else {
      dirY = "t";
    }

    return [dirX, dirY];
  }

  //获取触摸点索引
  getTouchIndex(e) {
    let targetTouch = e.targetTouches[0],
      touches = e.touches;

    for (let i = 0, l = touches.length; i < l; i++) {
      if (touches[i].identifier === targetTouch.identifier) {
        return i;
      }
    }
  }

  //计算两点间距离
  getPosDistance(pos1, pos2) {
    let x = pos1[0] - pos2[0],
      y = pos1[1] - pos2[1];

    return Math.sqrt(
      Math.pow(x, 2) + Math.pow(y, 2)
    );
  }

  //计算缩放比例
  getPosScale(pos1, pos2) {
    return this.getPosDistance(pos1, pos2) / this.fingerDistS;
  }

  //计算两点间角度
  getPosAngle(pos1, pos2) {
    let x = pos1[0] - pos2[0],
      y = pos1[1] - pos2[1];

    return Math.atan2(y, x) * 180 / Math.PI;
  }

  //计算旋转角度
  getPosRotation(pos1, pos2) {
    return this.getPosAngle(pos1, pos2) - this.fingerRotateS;
  }

  componentWillUnmount() {
    if (isMobile && this.supportShake && this.props.onShake) {
      off("devicemotion", this.deviceMotion, window);
    }
  }

  render() {
    const childrenOnly = Children.only(this.props.children);
    let { style } = childrenOnly.props;
    if (isMobile) {
      style = Object.assign({}, style, { touchAction: 'none' });
    }

    return tmpl({
      isMobile,
      ref: c => this.wrapper = c,
      children: childrenOnly,
      style
    }, this);
  }
}
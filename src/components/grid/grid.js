import fj from '../../core';
import { Component } from 'react';
import nj from 'nornj';
import { registerTmpl } from 'nornj-react';
import classNames from 'classnames';
import '../../njHelpers';
import tmpls from './grid.t.html';

/**
 * Grid row
 */
@registerTmpl('fj-Row')
export class Row extends Component {
  render() {
    const {
      className,
      style,
      left,
      right,
      gutter,
      children,
      ...others
    } = this.props;

    const classes = classNames({
      'fj-row': true,
      [className]: className
    });

    let styles = {},
      mLeft = 0,
      mRight = 0;

    if (gutter && gutter > 0) {
      mLeft += gutter / -2;
      mRight += gutter / -2;
    }
    if (left) {
      mLeft += parseInt(left, 10);
    }
    if (right) {
      mRight += parseInt(right, 10);
    }
    if(mLeft !== 0) {
      styles.marginLeft = mLeft;
    }
    if(mRight !== 0) {
      styles.marginRight = mRight;
    }
    if (style) {
      Object.assign(styles, style);
    }

    return tmpls.row({
      props: others,
      classes,
      styles,
      gutter,
      children,
      wrap: c => this.wrap = c
    });
  }
}

function _createRowRender(context, compClass) {
  return function() {
    const {
      className,
      style,
      width,
      children,
      ...others
    } = this.props;

    const classes = classNames({
      [compClass]: true,
      [className]: className
    });

    let styles = {};
    if (style) {
      Object.assign(styles, style);
    }
    if (width) {
      styles.width = parseInt(width, 10);
    }

    return tmpls.row({
      props: others,
      classes,
      styles,
      children,
      wrap: c => this.wrap = c
    });
  }.bind(context);
}

/**
 * Grid row left container
 */
@registerTmpl('fj-RowLeft')
export class RowLeft extends Component {
  constructor(props) {
    super(props);

    this.render = _createRowRender(this, 'fj-row-left');
  }
}

Row.Left = RowLeft;

/**
 * Grid row right container
 */
@registerTmpl('fj-RowRight')
export class RowRight extends Component {
  constructor(props) {
    super(props);

    this.render = _createRowRender(this, 'fj-row-right');
  }
}

Row.Right = RowRight;

/**
 * Grid col
 */
@registerTmpl('fj-Col')
export class Col extends Component {
  render() {
    const {
      className,
      l,
      m,
      s,
      xs,
      push,
      pull,
      offset,
      pushM,
      pullM,
      offsetM,
      pushS,
      pullS,
      offsetS,
      pushXs,
      pullXs,
      offsetXs,
      children,
      ...others
    } = this.props;

    const classes = classNames({
      ['fj-col' + l]: l != null,
      ['fj-col-m' + m]: m != null,
      ['fj-col-s' + s]: s != null,
      ['fj-col-xs' + xs]: xs != null,
      ['fj-col-push' + push]: push != null,
      ['fj-col-pull' + pull]: pull != null,
      ['fj-col-offset' + offset]: offset != null,
      ['fj-col-push-m' + pushM]: pushM != null,
      ['fj-col-pull-m' + pullM]: pullM != null,
      ['fj-col-offset-m' + offsetM]: offsetM != null,
      ['fj-col-push-s' + pushS]: pushS != null,
      ['fj-col-pull-s' + pullS]: pullS != null,
      ['fj-col-offset-s' + offsetS]: offsetS != null,
      ['fj-col-push-xs' + pushXs]: pushXs != null,
      ['fj-col-pull-xs' + pullXs]: pullXs != null,
      ['fj-col-offset-xs' + offsetXs]: offsetXs != null,
      [className]: className
    });

    return tmpls.col({
      props: others,
      classes,
      children,
      wrap: c => this.wrap = c
    });
  }
}

/**
 * Clear the float style
 */
@registerTmpl('fj-Clearfix')
export class Clearfix extends Component {
  render() {
    const {
      className,
      l,
      m,
      s,
      xs,
      ...others
    } = this.props;

    const classes = classNames({
      'fj-clearfix': l != null || (m == null && s == null && xs == null),
      'fj-clearfix-m': m != null,
      'fj-clearfix-s': s != null,
      'fj-clearfix-xs': xs != null,
      [className]: className
    });

    return tmpls.clearFix({
      props: others,
      classes,
      wrap: c => this.wrap = c
    });
  }
}

Object.assign(fj, {
  Row,
  RowLeft,
  RowRight,
  Col,
  Clearfix
});

export default {
  Row,
  RowLeft,
  RowRight,
  Col,
  Clearfix
};
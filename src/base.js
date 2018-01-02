import fj from './core';
import config from './config';
import * as regexp from './utils/regexp';
import * as sort from './utils/sort';
import * as math from './utils/math';
import * as date from './utils/date';
import responsive from './higherOrders/responsive';
import Pagination from './components/pagination';
import Gesture from './components/gesture';
import Carousel from './components/carousel';

Object.assign(fj, {
  config,
  responsive,
  Pagination,
  Gesture,
  Carousel
});

const _global = typeof self !== 'undefined' ? self : global;
_global.FlareJ = _global.fj = fj;

export * from './utils/browsers';
export * from './utils/common';
export * from './utils/page';
export * from './utils/delayOperate';
export * from './utils/domEvent';
export * from './components/grid';
export {
  responsive,
  Pagination,
  Gesture,
  regexp,
  sort,
  math,
  date,
  Carousel
};
export default fj;
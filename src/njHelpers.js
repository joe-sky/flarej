﻿import React, { cloneElement, Children } from 'react';
import nj, {
  registerFilter,
  registerExtension,
  registerComponent
} from 'nornj';
import FontAwesome from 'react-fontawesome';
import { isWebkit } from './utils/browsers';
import tmpls from './njHelpers.t.html';

registerFilter({
  fixIconSize: val => val + (!isWebkit ? ' fj-fixsize' : '')
});

registerExtension({
  emptyElem: () => tmpls.emptyElem(),

  cloneElem: options => cloneElement(options.children(), options.props),

  childrenEach: (children, options) => Children.map(children, child => options.children({
    data: [{ '@child': child }]
  })),

  assign: options => Object.assign(options.children(), options.props.from)
});

registerComponent('fa', FontAwesome);
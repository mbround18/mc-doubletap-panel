import Vue from 'vue';
import {get} from 'lodash';

const toasted =
  get(Vue, 'prototype.$toasted') ?? get(Vue, 'toasted') ?? get(Vue, '$toasted');

export default toasted;

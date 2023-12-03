import { animate } from './core';

import type { AnimateParams } from './core'

export default {
  in: (params: AnimateParams) => {
    // 生成一个anime的实例对象
    return animate({ opacity: [0, 1], ...params })
  },
  out: (params: AnimateParams) => {
    animate({ opacity: [1, 0], ...params })
  }
}
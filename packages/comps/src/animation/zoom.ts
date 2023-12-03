import { animate, type AnimateParams } from "./core";

export const anti = (direction: 'row' | 'column') =>
  direction === 'row' ? 'column' : 'row';

export default {
  "center-in": (params: AnimateParams) => {
    return animate({
      scale: [0.5, 1],
      opacity: [1, 1],
      begin: anim => {
        debugger
        anim.animatables.forEach(e => {
          // todo center的origin怎么写？
          e.target.style.transformOrigin = 'row'
        });
      },
      ...params,
    })
  },
  "center-out": (params: AnimateParams) => {
    return animate({
      scale: [1, 0],
      opacity: [1, 0],
      begin: anim => {
        debugger
        anim.animatables.forEach(e => {
          // todo center的origin怎么写？
          e.target.style.transformOrigin = 'row'
        });
      },
      ...params,
    })
  }
}
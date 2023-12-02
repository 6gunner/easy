import { animate, type AnimateParams } from "./core";

export default {
  "center-in": (params: AnimateParams) => {
    return animate({
      scale: [0.5, 1],
      opacity: [1, 1],
      begin: anim => {
        anim.animatables.forEach(e => {
          // todo center的origin怎么写？
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
        anim.animatables.forEach(e => {
          // todo center的origin怎么写？
        });
      },
      ...params,
    })
  }
}
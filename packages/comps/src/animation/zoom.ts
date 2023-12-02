import { animate, type AnimateParams } from "./core";

export default {
  "zoom-in": (params: AnimateParams) => {
    return animate({
      scale: [0.5, 1],
      opacity: [1, 1],
      begin: anim => {
        debugger;
        anim.animatables.forEach(e => {
          // todo center的origin怎么写？
        });
      },
      ...params,
    })
  },
  "zoom-out": (params: AnimateParams) => {
    return animate({
      scale: [1, 0],
      opacity: [1, 0],
      begin: anim => {
        debugger;
        anim.animatables.forEach(e => {
          // todo center的origin怎么写？
        });
      },
      ...params,
    })
  }
}
import { zoom, fade } from '../animation';

/**
 * 以动画的效果来控制dom的显、隐藏
 * @param visible 
 * @param dom 
 */
const animateToggle = (visible: boolean, dom: HTMLElement) => {
  // FIXME: 用自定义的className
  const modal = dom.querySelector('.modal') as HTMLElement;
  const key = visible ? 'in' : 'out';
  const mask = modal.querySelector(".modal-mask") as HTMLElement

  // 调用zoom动画
  zoom[`center-${key}`]({ targets: modal });
  // 调用fade动画
  fade[key]({
    target: mask,
    easing: 'linear',
    duration: 100,
    begin: instance => {
      console.log(instance);
    },
    complete: instance => {
      console.log(instance);
      instance.animatables;
    }
  })



}

export default {
  animate: animateToggle
}
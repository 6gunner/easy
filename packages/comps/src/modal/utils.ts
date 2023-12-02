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

  // 调用zoom动画
  zoom[`center-${key}`]({ targets: modal });
  // 调用fade动画
  fade[key]({
    target: dom,
    easing: 'linear',
    duration: 100,
    begin: instance => {
      // 开始动画的回调
      console.log(instance);
    },
    complete: instance => {
      // 结束动画的回调
      console.log(instance);
      instance.animatables;
    }
  })
}

export default {
  animateToggle
}
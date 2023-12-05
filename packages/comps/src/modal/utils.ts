import { zoom, fade } from '../animation';

/**
 * 以动画的效果来控制dom的显、隐藏
 * @param visible 
 * @param dom 
 */
const animateToggle = (visible: boolean, dom: HTMLElement) => {
  // FIXME: 用自定义的tag-name
  const modal = dom.querySelector('[role="modal"]') as HTMLElement;
  const key = visible ? 'in' : 'out';
  // 调用zoom动画
  zoom[`center-${key}`]({ targets: modal });
  // 调用fade动画
  fade[key]({
    targets: dom,
    scale: key === 'in' ? [0, 1] : [1, 0],
    easing: 'linear',
    duration: 100,
    // 结束动画的回调
    // complete: instance => {
    //   debugger
    //   再处理一次dom元素，防止出现问题；
    //   instance.animatables.forEach(e => {
    //     e.target.style.transform = key === 'in' ? 'scale(1)' : 'scale(0)';
    //   });
    // }
  })
  dom.style.pointerEvents = visible ? 'auto' : 'none';
}

export default {
  animateToggle
}
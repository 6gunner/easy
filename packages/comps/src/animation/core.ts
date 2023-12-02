import { default as anime } from 'animejs'

export type AnimateParams = anime.AnimeAnimParams

export const animate = async (animeParams: AnimateParams) => {
  const animation = anime({
    // 动画过程里产生回调
    update: function (anim) {
      console.log("progress", Math.round(anim.progress) + '%');
    },
    ...animeParams
  });
  // 等待动画结束
  await animation.finished;
  return animation;
}
import { css } from '../stitches';
export default {
  mask: css({
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
    background: 'rgba(0,0,0,0.8)',

    // 默认隐藏
    opacity: 0,
    transform: 'scale(0)',
    pointerEvents: 'none',

  }),

  maskBody: css({})
}


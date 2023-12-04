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

  modal: css({
    width: 'max-content',
    display: 'inline-block',
    background: "#151716",
    border: '1px solid rgba(255, 255, 255, 0.10)',
    borderRadius: 16,
    padding: 40,
    position: "relative",
  }),


  modalHeader: css({
    color: '#FFF',
    fontFamily: 'Poppins',
    fontSize: 32,
    fontStyle: 'normal',
    fontWeight: 500,
    lineHeight: '1',
    cursor: "pointer"
  }),

  modalBody: css({

  }),
  modalFooter: css({})
}


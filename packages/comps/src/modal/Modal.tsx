import React from "react";
import memoFunctionComp from "../optimistic/memoFunctionComp";

import styles from "./modal.style";

export type ModalProps = {
  visible: boolean;
  closeBtn?: JSX.Element;
  okBtn?: JSX.Element;
  cancelBtn?: JSX.Element;
  body: JSX.Element;
};

const Modal = memoFunctionComp<HTMLDivElement, ModalProps>((props, ref) => {
  const { visible, closeBtn, body, okBtn, cancelBtn, ...resetProps } = props;

  // todo 样式用什么写？jss的用什么好？
  return (
    <div
      role="modal-mask"
      className={styles.mask()}
      data-visible={visible}
      ref={ref}
    >
      <div role="modal" className={styles.maskBody()} data-visible={visible}>
        <div className="modal-header">{closeBtn}</div>
        <div className="modal-body">{body}</div>
        <div className="modal-footer">
          {okBtn}
          {cancelBtn}
        </div>
      </div>
    </div>
  );
});

export default Modal;

import React from "react";
import memoFunctionComp from "../optimistic/memoFunctionComp";

import styles from "./modal.style";

export type ModalProps = {
  visible: boolean;
  closeBtn?: JSX.Element;
  onClose?: () => void;
  okBtn?: JSX.Element;
  onOk?: () => void;
  cancelBtn?: JSX.Element;
  onCancel?: () => void;
  body: JSX.Element;
};

const Modal = memoFunctionComp<HTMLDivElement, ModalProps>((props, ref) => {
  const { visible, body, closeBtn, okBtn, cancelBtn } = props;

  // todo 样式用什么写？jss的用什么好？
  /**
   * 思考几个问题：1、怎么让用户扩展样式？
   *
   * */
  return (
    <div
      role="modal-mask"
      className={styles.mask()}
      data-visible={visible}
      ref={ref}
    >
      <div role="modal" className={styles.modal()}>
        <div className={styles.modalHeader()}>{closeBtn}</div>
        <div className={styles.modalBody()}>{body}</div>
        <div className={styles.modalFooter()}>
          {cancelBtn}
          {okBtn}
        </div>
      </div>
    </div>
  );
});

export default Modal;

import React, { useCallback, useEffect, useMemo, useState } from "react";
import Modal from "./Modal";
import utils from "./utils";

import type { ModalProps } from "./Modal";
import type { Fn } from "../types";

function useModal(
  props: Omit<ModalProps, "visible">,
  options: {
    beforeModal?: Fn;
    afterModal?: Fn;
  } = {}
) {
  const { okBtn, onOk, cancelBtn, onCancel, closeBtn, onClose, ...restProps } =
    props;

  const { beforeModal, afterModal } = options;

  const [visible, setVisible] = useState(false);

  const ref = React.useRef<HTMLDivElement>(null);

  const hideModal = useCallback(() => {
    if (!visible) {
      return;
    }
    // 设置modal隐藏
    ref.current && utils.animateToggle(false, ref.current);
    setVisible(false);
    afterModal?.();
    // 重置这个值;
    document.body.style.overflow = "visible";
  }, [visible, afterModal, ref]);

  const showModal = () => {
    if (visible) {
      return;
    }
    beforeModal?.();
    setVisible(true);
    ref.current && utils.animateToggle(true, ref.current);
    // 为了防止modal出现时，依然可以滚动body
    // FIXME: modal消失，要重置这个值;
    document.body.style.overflow = "hidden";
  };

  useEffect(() => {
    return () => {
      console.log("unmount...");
      hideModal();
    };
  });

  // 缓存计算结果
  const modal = React.useMemo(() => {
    // todo 思考下，这里是不是可以用renderProps来渲染？
    const wrappedCloseBtn =
      closeBtn &&
      React.cloneElement(closeBtn, {
        // 注：这里只是传了一个onClick属性，react不会这个element上添加事件回调，需要使用者在传closeBtn的时候传入onClick才行
        onClick: (e: any) => {
          closeBtn.props.onClick?.(e);
          hideModal();
          onClose && onClose();
        },
      });
    const wrappedOkBtn =
      okBtn &&
      React.cloneElement(okBtn, {
        ...okBtn.props,
        onClick: (e: any) => {
          okBtn.props.onClick?.(e);
          onOk?.();
          hideModal();
        },
      });

    const wrappedCancelBtn =
      cancelBtn &&
      React.cloneElement(cancelBtn, {
        ...cancelBtn.props,
        onClick: (e: any) => {
          cancelBtn.props.onClick?.(e);
          onCancel?.();
          hideModal();
        },
      });
    return (
      <Modal
        {...restProps}
        ref={ref}
        visible={visible}
        okBtn={wrappedOkBtn}
        cancelBtn={wrappedCancelBtn}
        closeBtn={wrappedCloseBtn}
      ></Modal>
    );
  }, [okBtn, cancelBtn, closeBtn, hideModal]);

  return [modal, showModal, hideModal, visible] as const;
}

export default useModal;

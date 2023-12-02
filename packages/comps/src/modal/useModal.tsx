import React, { useEffect, useMemo, useState } from "react";
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
  const { okBtn, cancelBtn, closeBtn, ...resetProps } = props;

  const { beforeModal, afterModal } = options;

  const [visible, setVisible] = useState(false);

  const ref = React.useRef<HTMLDivElement>(null);

  const hideModal = () => {
    if (!visible) {
      return;
    }
    // 设置modal隐藏
    ref.current && utils.animateToggle(false, ref.current);
    setVisible(false);
    afterModal?.();
    // 重置这个值;
    document.body.style.overflow = "visible";
  };

  const showModal = () => {
    if (visible) {
      return;
    }
    beforeModal?.();
    setVisible(true);

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

  const modal = <Modal ref={ref} visible={visible} body={props.body}></Modal>;

  return [modal, showModal, hideModal, visible] as const;
}

export default useModal;

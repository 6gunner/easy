import React, { useState } from "react";
import { useModal } from "@dev-easy/comps";
import { styled, css } from "@dev-easy/comps";

import "./modal.scss";

export type BtnProps = {
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
} & React.PropsWithChildren;

const ConfirmBtn: React.FC<BtnProps> = (props) => {
  return (
    <div className="btn confirm-btn" {...props}>
      <span className="btn-text">{props.children}</span>
    </div>
  );
};

const CancelBtn: React.FC<BtnProps> = (props) => {
  return (
    <div className="btn cancel-btn" {...props}>
      <span className="btn-text">{props.children}</span>
    </div>
  );
};

const Body: React.FC = (props) => {
  return (
    <div className="modal-body">
      <img
        src={require("../assets/loading.gif")}
        alt=""
        className="loading-png"
      />
      <h3 className="loading-text">Creating</h3>
      <span className="loading-tips">
        Please dont leave until the resuit is returned.
      </span>
    </div>
  );
};

function ModalPage() {
  const handleClick = () => {
    if (visible) {
      hide();
    } else {
      show();
    }
  };
  const [TestModal, show, hide, visible] = useModal({
    cancelBtn: (
      <CancelBtn
        onClick={() => {
          console.log("cancel cliked");
        }}
      >
        Done
      </CancelBtn>
    ),
    okBtn: (
      <ConfirmBtn
        onClick={() => {
          console.log("ok clicked");
        }}
      >
        Directly to My NFT
      </ConfirmBtn>
    ),
    body: <Body />,
    onClose: () => {
      console.log("on close...");
    },
    onCancel: () => {
      console.log("on cancel...");
    },
    onOk: () => {
      console.log("on ok...");
    },
  });

  return (
    <div>
      <button onClick={handleClick}>show modal</button>
      <div>{visible ? "true" : "false"}</div>
      {TestModal}
    </div>
  );
}

export default ModalPage;

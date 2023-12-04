import React, { useState } from "react";
import { useModal } from "@dev-easy/comps";
import { styled, css } from "@dev-easy/comps";

import "./modal.scss";
export type CloseBtnProps = {
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
};
const CloseBtn: React.FC<CloseBtnProps> = (props) => {
  return (
    <div
      style={{
        width: 28,
        height: 28,
        position: "absolute",
        right: -10,
        top: -10,
        zIndex: 101,
      }}
      {...props}
    >
      <img src={require("../assets/close-btn-white.svg").default}></img>
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
    closeBtn: (
      <CloseBtn
        onClick={() => {
          console.log("on click");
        }}
      />
    ),
    body: <Body />,
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

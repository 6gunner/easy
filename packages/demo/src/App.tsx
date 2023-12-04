import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import { lineToCamelCase, makeRequest, useRequest } from "@dev-easy/utils";
import { useModal } from "@dev-easy/comps";
import urls from "./urls";

import "./App.css";

type AppData = {
  body: string;
  id: number;
  title: string;
  userId: number;
};

type ArrayedAppData = Array<AppData>;

const request = makeRequest<ArrayedAppData, any>(urls.getPost, {
  method: "get",
});

const ModalPage = React.lazy(() => import("./pages/ModalPage"));

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
      <img src={require("./assets/close-btn-white.svg").default}></img>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <Router>
        {/* switch换成了routes */}
        <Routes>
          <Route path="/modal" element={<ModalPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

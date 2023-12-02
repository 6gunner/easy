import React, { useState } from "react";

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

function App() {
  const [visible, setVisible] = useState(false);
  const [TestModal, show, hide] = useModal({
    body: <div>Modal Content</div>,
  });

  return (
    <div className="App">
      <button onClick={() => setVisible(!visible)}>show modal</button>
      <div>{visible ? "true" : "false"}</div>
    </div>
  );
}

export default App;

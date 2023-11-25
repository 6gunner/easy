import React, { useState } from "react";

import { lineToCamelCase, makeRequest, useRequest } from "@easy/utils";
import urls from "./urls";
import logo from "./logo.svg";
import "./App.css";

import type { EasyResponse } from "@easy/utils/dist/makeRequest/types";

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
  const [list, setList] = useState<AppData[]>();

  const { data, error, loading } = useRequest(request, {
    timeout: 50,
    debounce: {
      wait: 1000,
      leading: true,
      trailing: false,
    },
    // onSuccess: (data: AppData[]) => {
    //   setList(data);
    // },
  });
  return (
    <div className="App">
      <header className="App-header">
        {error ? error.msg : data?.map((item) => <div>{item.body}</div>)}
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
          {lineToCamelCase("app_link")}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

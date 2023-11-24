import React from "react";

import { lineToCamelCase, makeRequest, useRequest } from "utils";
import urls from "./urls";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const request = makeRequest(urls.getPost, {
    method: "get",
  });
  useRequest(request, {
    timeout: 5000,
    debounce: {
      wait: 1000,
      leading: true,
      trailing: false,
    },
  });
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
          {lineToCamelCase("App")}
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

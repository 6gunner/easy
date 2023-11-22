import { useEffect, useState } from "react";

import { Header } from "header";
import Footer from "footer";
import { useApi } from "utils";

// const url = "http://localhost:3001/api/weather/city/101030100";
const url = "https://mdn.github.io/dom-examples/abort-api/sintel.mp4";
const option = {
  method: "get",
  timeout: 5000,
};
export default function Index() {
  // const [data, setData] = useState();

  const { data, error, cancel } = useApi(url, option);

  cancel();

  if (error) {
    console.log(error);
  }
  const handleStart = () => {};
  const handleClick = () => {
    cancel();
  };
  return (
    <>
      <Header />

      <div>
        Content!
        {data && JSON.stringify(data)}
      </div>
      <button onClick={handleStart}>start</button>
      <button onClick={handleClick}>cancel</button>
      <Footer />
    </>
  );
}

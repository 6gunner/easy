import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layout";
import ErrorPage from "./pages/error";

import "./index.css";

const ModalPage = React.lazy(() => import("./pages/ModalPage"));
const ModalPage2 = React.lazy(() => import("./pages/ModalPage2"));
const SelectPage = React.lazy(() => import("./pages/SelectPage"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "modal",
        children: [
          {
            path: "1",
            element: <ModalPage />,
          },
          {
            path: "2",
            element: <ModalPage2 />,
          },
        ],
      },
      {
        path: "select",
        Component: SelectPage,
        // element: <SelectPage />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  // <React.StrictMode>
  <React.Suspense fallback={<>loading</>}>
    <RouterProvider router={router} />
  </React.Suspense>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  Routes,
  Route,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
// import PerformanceIndex from "./scenes/performance";
import Layout from "./layout";
// import Performance from "./routes/performance";
import Dashboard from "./scenes/dashboard";
import Performance from "./scenes/performance";
import "./index.css";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
        // element: <Performance />,
        // element: <Contact />,
      },
      {
        path: "/performance",
        element: <Performance />,
        // element: <Performance />,
        // element: <Contact />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

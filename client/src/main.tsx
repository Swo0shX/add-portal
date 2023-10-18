import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  Routes,
  Route,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
// import PerformanceIndex from "./scenes/performance";
import Root from "./routes/root";
import Contact from "./routes/contact";
// import Performance from "./routes/performance";
import Dashboard from "./scenes/dashboard";
// import PerformanceIndex from "./scenes/kra";
import "./index.css";
import App from "./App";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "contacts/:contactId",
        element: <Contact />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
        // element: <Performance />,
        // element: <Contact />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

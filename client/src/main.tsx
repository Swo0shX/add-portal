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
import "./index.css";
import App from "./App";
// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Root />,
//     children: [
//       // {
//       //   path: "performance",
//       //   // element: <div>hellow</div>,
//       //   element: <Performance />,
//       //   // element: <Contact />,
//       // },
//       {
//         path: "contacts/:contactId",
//         element: <Contact />,
//       },
//     ],
//   },
// ]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

import { createBrowserRouter } from "react-router-dom";

import Assignment1 from "../Pages/Assignment1";
import Assignment2 from "../Pages/Assignment2";

import MainLayout from "../Pages/Shared/MainLayout";

const routerObj = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Assignment1 />,
      },
      {
        path: "/assignment-2",
        element: <Assignment2 />,
      },
    ],
  },
];

const router = createBrowserRouter(routerObj);

export default router;

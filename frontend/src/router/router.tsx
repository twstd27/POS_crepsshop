import { createBrowserRouter } from "react-router-dom";

import { Root } from "../Root";
import { AuthLayout, DashboardLayout } from "../layouts";
import {
  BearPage,
  JiraPage,
  PersonPage,
  WeddingInvitationPage,
} from "../pages";
import LoginPage from "../pages/auth/LoginPage";
import Dashboard from "../pages/dashboard/DashboardPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      /// Dashboard Routes
      {
        path: "dashboard",
        element: <DashboardLayout />,
        children: [
          {
            path: "",
            element: <Dashboard />,
          },
          {
            path: "bears",
            element: <BearPage />,
          },
          {
            path: "person",
            element: <PersonPage />,
          },
          {
            path: "tasks",
            element: <JiraPage />,
          },
          {
            path: "wedding-invitation",
            element: <WeddingInvitationPage />,
          },
        ],
      },

      /// Auth Routes
      {
        path: "auth",
        element: <AuthLayout />,
        children: [
          {
            path: "login",
            element: <LoginPage />,
          },
        ],
      },
    ],
  },
]);

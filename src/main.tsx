import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";


const router = createBrowserRouter([
  {
    path: "/login",
    Component: Login,
  },
  { path: "/register", Component: Register },
  {}
]);
createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />,
);

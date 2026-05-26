import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, redirect, RouterProvider } from "react-router";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Root from "./Root";
import { userService } from "./api/services/user.service";
import AddProduct from "./pages/AddProduct/AddProduct";
import EditProduct from "./pages/EditProduct/EditProduct";
import ShowProduct from "./pages/showProduct/ShowProduct";

const router = createBrowserRouter([
  {
    path: "/",
    loader: () => redirect("/login"),
  },
  {
    path: "login",
    element: <Login />,
  },
  { path: "register", element: <Register /> },
  { path: "items", element:<Root/>,
    children:[
      {path:"",index:true, element: <Dashboard />,loader:async()=>{
        const data= await userService.getAllItems();
        return {data}
      }},
       {path:"create", element: <AddProduct />},
       {path:"edit/:id", element: <EditProduct />},
       {path:"show/:id", element: <ShowProduct/>}

    ]
  },
  {
    path: "*",
    loader: () => redirect("/login"),
  },
]);
createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />,
);

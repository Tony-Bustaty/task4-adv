import { Outlet } from "react-router";
import SideBar from "./components/SideBar/SideBar";
import "./Root.css";
function Root() {
  return (
    <main className="main">
      <SideBar />
      <div className="outlet">
      <Outlet/>
      </div>
    </main>
  );
}

export default Root;

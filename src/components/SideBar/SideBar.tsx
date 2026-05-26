import { useState } from "react";
import Navbar from "../Navbar/Navbar";
import "./SideBar.css";
function SideBar() {
  const {user_name,profile_image_url}=JSON.parse(localStorage.getItem("user")!)
  const [imgError, setImgError] = useState(false);
  return (
    <aside className="sidebar">
     <div className="sidebar-top">
         <div className="logo-container">
        <div className="logo">
          <img src="/assets/Logo.png" alt="logo" width={97} height={23} />
        </div>
      </div>
      <div className="user-account">
        <div className="profile">
          <img src={imgError?"/assets/user.png":profile_image_url} alt="User Profile" onError={()=>setImgError(true)}/>
        </div>
          <p>{user_name}</p>
      </div>
     </div>
      <Navbar />
    </aside>
  );
}

export default SideBar;

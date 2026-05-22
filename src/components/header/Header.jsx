import { useEffect, useState } from "react";
import "../header/header.css";
import im from "../utils/do.png";
import { TiThMenu } from "react-icons/ti";
import { IoIosCart } from "react-icons/io";
import { handleLogout } from "../utils/logout";
import { RiAdminFill } from "react-icons/ri";
import {
  ADMIN_LANDING_PAGE,
  LANDING_PAGE,
  RES_PAGE,
} from "../Constants";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { FaUtensils } from "react-icons/fa";
import CustomAlert from "../utilityComponents/CustomAlerts/CustomAlert";
import { IoPersonCircle } from "react-icons/io5";
import NavBarComponent from "./NavBarComponent";
import UserLogout from "./UserLogout";

const Header = () => {
  const navigate = useNavigate();
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const menus = [
    "Home",
    "Restaurants",
    "Orders",
    "Admin Dashboard",
  ];

  const logout = () => {
    handleLogout();
  };

  const selectedMenu = (menu) => {
    const token = localStorage.getItem("authToken");
    let role = null;
    if (token) {
      try {
        const decoded = jwtDecode(token);
        role = decoded?.roles[0];
      } catch (error) {
        console.error(error);
      }
    }
    switch (menu) {
      case "Home":
        navigate(LANDING_PAGE);
        break;
      case "Restaurants":
        navigate(RES_PAGE);
        break;
      case "Admin Dashboard":
        if (role === "ADMIN") {
          navigate(ADMIN_LANDING_PAGE);
        } else {
          setAlertMessage(
            "You do not have permission to access Admin Dashboard!",
          );
          setShowAlert(true);
        }
        break;
      default:
        alert(`${menu} page is under construction`);
    }
  };

  return (
    <div className="header-container">
      {/* Alert placed at the top */}
      <div
        style={{
          position: "absolute",
          top: "65px",
          right: "5px",
          width: "300px",
        }}
      >
        <CustomAlert
          show={showAlert}
          setShow={setShowAlert}
          message={alertMessage}
          variant="danger"
          heading="Oops!"
        />
      </div>
      <img
        src={im}
        alt="Header Image"
        className="header-image"
        onClick={() => {
          navigate(LANDING_PAGE);
        }}
        style={{ cursor: "pointer" }}
      />

      <NavBarComponent
        menus={menus}
        onMenuClick={selectedMenu}
      />

      {/* User Info and Logout */}
      <div
        style={{
          position: "absolute",
          right: "10px",
          top: "15px",
        }}
      >
        <div
          style={{ color: "white", cursor: "pointer" }}
          onClick={logout}
        >
          {/* <IoPersonCircle /> {localStorage.getItem("user")} */}
          <UserLogout user={localStorage.getItem("user")} />
        </div>
      </div>
    </div>
  );
};

export default Header;

import { useEffect, useRef, useState } from "react";
import "../header/Header.css";
import applogo from "../../assets/applogo.png";
import { handleLogout } from "../utils/logout";
import {
  ADMIN_LANDING_PAGE,
  LANDING_PAGE,
  RES_PAGE,
} from "../Constants";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import CustomAlert from "../utilityComponents/CustomAlerts/CustomAlert";
import NavBarComponent from "./NavBarComponent";
import UserLogout from "./UserLogout";
import menus from "../../config/menuConfig";
import HeaderNotification from "./HeaderNotification";
import { useDispatch } from "react-redux";

const Header = () => {
  const navigate = useNavigate();
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertVariant, setAlertVariant] = useState("");
  const [alertHeading, setAlertHeading] = useState("");
  const dispatch = useDispatch();

  const logout = () => {
    handleLogout(dispatch);
  };

  const selectedMenu = (menu) => {
    const token = localStorage.getItem("authToken");
    let role = null;
    if (token) {
      try {
        const decoded = jwtDecode(token);
        role = decoded?.roles?.[0];
      } catch (error) {
        console.error("Token decoding failed:", error);
      }
    }

    switch (menu.label) {
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
            "You do not have permission to access the Admin Dashboard!",
          );
          setAlertVariant("danger");
          setAlertHeading("Access Denied");
          setShowAlert(true);
          setShowAlert(true);
        }
        break;
      default:
        navigate(menu.path || LANDING_PAGE);
    }
  };

  return (
    <header className="header-master-wrapper">
      {/* Toast Alert Element */}
      <div className="header-alert-toast">
        <CustomAlert
          show={showAlert}
          setShow={setShowAlert}
          message={alertMessage}
          // variant="danger"
          // heading="Access Denied"
          variant={alertVariant}
          heading={alertHeading}
        />
      </div>

      <div className="header-container-fluid">
        {/* Brand Logo Identity */}
        <div
          className="header-logo-brand"
          onClick={() => navigate(LANDING_PAGE)}
        >
          <img
            src={applogo}
            alt="DineMaster Logo"
            className="header-image"
          />
        </div>

        {/* Navigation Core Links Links */}
        <div className="header-navigation-hub">
          <NavBarComponent
            menus={menus}
            onMenuClick={selectedMenu}
          />
        </div>

        {/*Notification Center */}
        <HeaderNotification
          onAlert={(
            message,
            variant = "success",
            heading = "Notification",
          ) => {
            setAlertMessage(message);
            setAlertVariant(variant);
            setAlertHeading(heading);
            setShowAlert(true);
          }}
        />

        {/* Profile */}
        <div onClick={logout}>
          <UserLogout
            user={localStorage.getItem("user") || "Staff"}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;

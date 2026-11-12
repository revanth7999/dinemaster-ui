import { useState } from "react";
import "../header/Header.css";
import applogo from "../../assets/applogo.png";
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
import { Badge } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { FaMoon, FaSun } from "react-icons/fa";
import apiClient from "../utils/axiosUtil";
import { setThemePreference } from "../../redux/authSlice";
import { THEME_PREFERENCE_URL } from "../Constants";

const Header = () => {
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertVariant, setAlertVariant] = useState("");
  const [alertHeading, setAlertHeading] = useState("");
  const [isSavingTheme, setIsSavingTheme] = useState(false);

  const navigate = useNavigate();
  const { environment, themePreference, user } = useSelector(
    (state) => state.auth,
  );
  const dispatch = useDispatch();

  const toggleTheme = async () => {
    if (isSavingTheme) return;
    const previousTheme = themePreference;
    const nextTheme = previousTheme === "dark" ? "light" : "dark";
    dispatch(setThemePreference(nextTheme));
    setIsSavingTheme(true);

    try {
      await apiClient.patch(THEME_PREFERENCE_URL, {
        themePreference: nextTheme,
      });
    } catch (error) {
      dispatch(setThemePreference(previousTheme));
      setAlertMessage(
        error.response?.data?.message || "Could not save your theme preference.",
      );
      setAlertVariant("danger");
      setAlertHeading("Theme not saved");
      setShowAlert(true);
    } finally {
      setIsSavingTheme(false);
    }
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
      case "Product":
        navigate("/product");
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

        <h5 style={{ margin: "5px", marginRight: "15px" }}>
          <Badge bg="secondary">
            {environment || "unknown Instance"}
          </Badge>
        </h5>

        <div className="header-utility-actions">
          <button
            type="button"
            className="header-theme-toggle"
            onClick={toggleTheme}
            disabled={isSavingTheme}
            aria-busy={isSavingTheme}
            aria-label={`Switch to ${themePreference === "dark" ? "light" : "dark"} theme`}
            title={`Switch to ${themePreference === "dark" ? "light" : "dark"} theme`}
          >
            {themePreference === "dark" ? <FaSun /> : <FaMoon />}
          </button>

          {/* Notification Center */}
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
        </div>

        {/* Profile */}
        <UserLogout
          user={user?.username || localStorage.getItem("user") || "Staff"}
          email={user?.email}
        />
      </div>
    </header>
  );
};

export default Header;

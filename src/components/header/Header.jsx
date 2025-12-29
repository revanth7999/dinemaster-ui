import { useEffect, useState } from "react";
import "../header/header.css";
import im from "../utils/do.png";
import { TiThMenu } from "react-icons/ti";
import { IoIosCart } from "react-icons/io";
import { handleLogout } from "../utils/logout";
import { RiAdminFill } from "react-icons/ri";
import { ADMIN_LANDING_PAGE, LANDING_PAGE, RES_PAGE } from "../Constants";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { FaUtensils } from "react-icons/fa";
import CustomAlert from "../utilityComponents/CustomAlerts/CustomAlert";
import { IoPersonCircle } from "react-icons/io5";

const Header = () => {
  // Variables and States
  const [isLoginPage, setIsLoginPage] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [restaurants, setRestaurants] = useState([
    { name: "Menu", icon: <FaUtensils /> },
    { name: "Admin Dashboard", icon: <RiAdminFill /> },
    { name: "Restaurants", icon: <FaUtensils /> },
    { name: "Orders", icon: <IoIosCart /> },
  ]);
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  /**
   * Effect to determine if the current page is the login page and to handle clicks outside the dropdown.
   * This effect runs once when the component is mounted.
   */
  useEffect(() => {
    // Set state based on the document title after the component is mounted
    if (window.location.pathname.includes("login")) {
      setIsLoginPage(true);
    } else {
      setIsLoginPage(false);
    }

    const handleClickOutside = (event) => {
      if (!event.target.closest(".menu-dropdown")) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  /**
   * Handles user logout by calling the handleLogout function from utils.js
   * This function is triggered when the user clicks on the logout text.
   */
  const logout = () => {
    handleLogout();
  };

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  /**
   * Handles menu selection and navigation based on user role.
   */
  const selectedMenu = (selectedMenuOption) => {
    const token = localStorage.getItem("authToken");
    let role = null;
    if (token) {
      try {
        const decoded = jwtDecode(token);
        role = decoded?.roles[0] || null;
      } catch (err) {
        console.error("Invalid token", err);
      }
    }
    if (selectedMenuOption === "Restaurants") {
      navigate(RES_PAGE);
    } else if (selectedMenuOption === "Menu") {
      navigate(LANDING_PAGE);
    } else if (selectedMenuOption === "Admin Dashboard") {
      if (role === "ADMIN") {
        navigate(ADMIN_LANDING_PAGE);
      } else {
        setAlertMessage(
          "You do not have permission to access Admin Dashboard!",
        );
        setShowAlert(true);
      }
    } else {
      alert(`${selectedMenuOption} page is under construction!`);
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

      {/* Menu Dropdown next to logo */}
      <div
        className="menu-dropdown"
        onMouseLeave={() => setShowDropdown(false)}
      >
        <div style={{ color: "white" }} onMouseOver={toggleDropdown}>
          Menu <TiThMenu />
        </div>

        {showDropdown && (
          <ul className={`dropdown-list ${showDropdown ? "show" : ""}`}>
            {restaurants.map((item, index) => (
              <div
                key={index}
                onClick={() => selectedMenu(item.name)}
                style={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
                className="dropdown-item"
              >
                {item.icon && <span>{item.icon}</span>}
                <span>{item.name}</span>
              </div>
            ))}
          </ul>
        )}
      </div>

      {/* User Info and Logout */}
      <div style={{ position: "absolute", right: "10px", top: "15px" }}>
        <div style={{ color: "white", cursor: "pointer" }} onClick={logout}>
          <IoPersonCircle /> {localStorage.getItem("user")}
        </div>
      </div>
    </div>
  );
};

export default Header;

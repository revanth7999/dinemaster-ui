import { useEffect, useState } from "react";
import "../header/header.css";
import im from "../utils/do.png";
import { handleLogout } from "../utils/logout";
import { LANDING_PAGE, RES_PAGE } from "../Constants";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [isLoginPage, setIsLoginPage] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [restaurants, setRestaurants] = useState([
    "Menu",
    "Restaurants",
    "Orders",
  ]); // Replace with API data later

  const navigate = useNavigate();
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

  const log = () => {
    handleLogout();
  };

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const handleSelect = (rest) => {
    console.log("Selected:", rest);
    if (rest === "Restaurants") {
      navigate(RES_PAGE);
    } else if (rest === "Menu") {
      navigate(LANDING_PAGE);
    } else {
      alert(`${rest} page is under construction!`);
    }
  };

  return (
    <div className="header-container">
      <img src={im} alt="Header Image" className="header-image" />

      {/* Menu Dropdown next to logo */}
      <div
        className="menu-dropdown"
        onMouseLeave={() => setShowDropdown(false)}
      >
        <button className="btn btn-light" onMouseOver={toggleDropdown}>
          Menu
        </button>

        {showDropdown && (
          <ul className={`dropdown-list ${showDropdown ? "show" : ""}`}>
            {restaurants.map((rest, index) => (
              <li
                key={index}
                className="dropdown-item"
                onClick={() => {
                  handleSelect(rest);
                }}
              >
                {rest}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div style={{ position: "absolute", right: "10px", top: "10px" }}>
        {/* Logout button on the right */}
        <button
          onClick={log}
          type="button"
          className="btn btn btn-secondary logout-button"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Header;

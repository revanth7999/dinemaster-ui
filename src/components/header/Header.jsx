import { useEffect, useState } from "react";
import "../header/header.css";
import im from "../utils/food-logo.png";
import { LOGIN, TOKEN } from "../Constants";

const Header = () => {
  const [isLoginPage, setIsLoginPage] = useState(false);

  useEffect(() => {
    // Set state based on the document title after the component is mounted
    if (window.location.pathname.includes("Login")) {
      setIsLoginPage(true);
    } else {
      setIsLoginPage(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem(TOKEN);
    window.location.replace("/dinemaster-ui/");
  };

  return (
    <div className="header-container">
      <div className="header">
        <img src={im} alt="Header Image" className="header-image" />
        {!isLoginPage ? (
          <button
            onClick={handleLogout}
            type="button"
            className="btn btn-success logout-button"
          >
            Log Out
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default Header;

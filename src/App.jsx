import { useEffect } from "react";
import "./App.css";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Navigation from "./components/Navigation";
import { handleLogout } from "./components/utils/logout";
import { parseJwt } from "./components/utils/parseJwt";
import { refreshAccessToken } from "./components/utils/auth";
import { TOKEN } from "./components/Constants";

function App() {
  useEffect(() => {
    const isLoginPage = window.location.pathname.includes("login");
    if (isLoginPage) return;

    const scheduleLogout = async () => {
      let token = localStorage.getItem(TOKEN);

      // Try to refresh if token is missing or expired
      if (!token || isTokenExpired(token)) {
        const refreshedToken = await refreshAccessToken();
        if (!refreshedToken) {
          handleLogout();
          return;
        }
        token = refreshedToken;
      }

      const decoded = parseJwt(token);
      if (decoded && decoded.exp) {
        const expiryTime = decoded.exp * 1000;
        const timeoutDuration = expiryTime - Date.now();

        if (timeoutDuration > 0) {
          const logoutTimer = setTimeout(() => {
            handleLogout();
          }, timeoutDuration);

          return () => clearTimeout(logoutTimer);
        } else {
          handleLogout();
        }
      }
    };

    const isTokenExpired = (token) => {
      const decoded = parseJwt(token);
      if (!decoded || !decoded.exp) return true;
      return decoded.exp * 1000 < Date.now();
    };

    scheduleLogout();
    window.addEventListener("token-set", scheduleLogout);

    return () => {
      window.removeEventListener("token-set", scheduleLogout);
    };
  }, []);

  return (
    <div className="app-container">
      <Header className="header" />
      <div className="content">
        <Navigation />
      </div>
      <Footer className="footer" />
    </div>
  );
}

export default App;

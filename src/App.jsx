import { useEffect } from "react";
import "./App.css";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Navigation from "./components/Navigation";
import { handleLogout } from "./components/utils/logout";
import { parseJwt } from "./components/utils/parseJwt";
import { TOKEN } from "./components/Constants";
import { isPublicRoute } from "./components/utils/basicFunctions";
import { useIdleLogout } from "./components/useIdleLogout";

function App() {
  // useIdleLogout();

  useEffect(() => {
    if (isPublicRoute(window.location.pathname)) {
      return;
    }

    const token = localStorage.getItem(TOKEN);

    const isTokenExpired = (token) => {
      const decoded = parseJwt(token);
      if (!decoded || !decoded.exp) return true;
      return decoded.exp * 1000 < Date.now();
    };

    const scheduleLogout = () => {
      if (!token || isTokenExpired(token)) {
        handleLogout();
        return;
      }

      const decoded = parseJwt(token);
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

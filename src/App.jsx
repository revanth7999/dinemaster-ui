import { useEffect } from "react";
import "./App.css";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Navigation from "./components/Navigation";
import { handleLogout } from "./components/utils/logout";
import { parseJwt } from "./components/utils/parseJwt";
import { TOKEN } from "./components/Constants";

function App() {
  useEffect(() => {
    const scheduleLogout = () => {
      const token = localStorage.getItem(TOKEN);
      if (!token) return;

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

    // call it on load
    scheduleLogout();

    // call it when token is set
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

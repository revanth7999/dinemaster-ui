import { useSelector } from "react-redux";
import "./App.css";
import Navigation from "./components/Navigation";
import { HashRouter } from "react-router-dom";
import MaintenanceScreen from "./components/maintenance/MaintenanceScreen";
import { BACKEND_STATUS } from "./components/Constants";

function App() {
  const status = useSelector(
    (state) => state.backendStatus.status,
  );

  return (
    <HashRouter>
      {status === BACKEND_STATUS.UP ? (
        <div className="app-container">
          <div className="content">
            <Navigation />
          </div>
        </div>
      ) : (
        <MaintenanceScreen type={status} />
      )}
    </HashRouter>
  );
}

export default App;

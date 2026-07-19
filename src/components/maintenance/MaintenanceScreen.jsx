import { Button, Spinner } from "react-bootstrap";
import { FaRedoAlt } from "react-icons/fa";
import { MdBuild, MdCloudOff } from "react-icons/md";

import "./maintenanceScreen.css";

const MaintenanceScreen = ({ type = "maintenance" }) => {
  const isMaintenance = type === "maintenance";
  const title = isMaintenance
    ? "Server is Updating"
    : "Server is Unavailable";

  const description = isMaintenance
    ? "We're deploying a new version of DineMaster. This usually takes less than a minute."
    : "We can't connect to the server right now. Our team is working to restore the service.";

  const statusText = isMaintenance
    ? "Checking server status..."
    : "Attempting to reconnect...";
  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <div className="maintenance-container">
      <div className="maintenance-card">
        <div className="maintenance-icon">
          {isMaintenance ? <MdBuild /> : <MdCloudOff />}
        </div>

        <h1>{title}</h1>

        <p className="maintenance-description">
          {description}
        </p>

        <div className="maintenance-status">
          <Spinner animation="border" size="sm" />
          <span>{statusText}</span>
        </div>

        <div className="maintenance-buttons">
          <Button
            variant="dark"
            onClick={refreshPage}
            className="maintenance-btn"
          >
            <FaRedoAlt />
            Retry Now
          </Button>
        </div>

        <div className="maintenance-footer">
          {isMaintenance
            ? "The page will recover automatically once the deployment is complete."
            : "We'll reconnect automatically once the server is available."}
        </div>
      </div>
    </div>
  );
};

export default MaintenanceScreen;

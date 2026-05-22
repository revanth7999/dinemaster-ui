import { Button } from "react-bootstrap";
import { FaRedoAlt } from "react-icons/fa";
import { MdHome } from "react-icons/md";

import "./fallbackScreen.css";

const FallbackScreen = ({
  title = "Something Went Wrong",
  description = "The page failed to load properly or the UI crashed. Please try again.",
}) => {
  const refreshPage = () => {
    window.location.reload();
  };

  const goHome = () => {
    window.location.href = "/";
  };

  return (
    <div className="fallback-container">
      <div className="fallback-card">
        <div className="error-icon">⚠️</div>

        <h1>{title}</h1>

        <p className="fallback-description">
          {description}
        </p>

        <div className="fallback-buttons">
          <Button
            variant="dark"
            onClick={refreshPage}
            className="fallback-btn"
          >
            <FaRedoAlt />
            Retry
          </Button>

          <Button
            variant="outline-dark"
            onClick={goHome}
            className="fallback-btn"
          >
            <MdHome />
            Home
          </Button>
        </div>

        <div className="support-text">
          If the issue continues, contact support.
        </div>
      </div>
    </div>
  );
};

export default FallbackScreen;

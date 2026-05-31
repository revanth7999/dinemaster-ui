import { useState, useEffect } from "react";
import "./Landing.css";
import { LANDING } from "../../components/Constants";
import CustomAlert from "../../components/utilityComponents/CustomAlerts/CustomAlert";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    document.title = LANDING;

    const loginShown = sessionStorage.getItem("loginShown");
    if (!loginShown) {
      setAlertMessage(
        "Login Successful! Welcome back to the floor.",
      );
      setShowAlert(true);
      sessionStorage.setItem("loginShown", "true");
    }
  }, []);

  return (
    <div className="landing-wrapper-bg overflow-hidden">
      {/* Toast Notification Container */}
      <div
        style={{
          position: "fixed",
          top: "80px",
          right: "24px",
          width: "320px",
          zIndex: 1050,
        }}
      >
        <CustomAlert
          show={showAlert}
          setShow={setShowAlert}
          message={alertMessage}
          variant="success"
        />
      </div>

      {/* Main Dynamic Container */}
      <div className="landing-container">
        {/* Hero Banner Section */}
        <header className="hero-section">
          <h1 className="hero-title">
            Master Your Restaurant Operations
          </h1>
          <p className="hero-subtitle">
            Manage your floors, track incoming reservations,
            and monitor live kitchen flows effortlessly.
          </p>
          <div className="hero-actions d-flex gap-3 justify-content-center">
            <button
              className="btn-primary-custom px-4 py-2-5"
              onClick={() => navigate("/restaurants")}
            >
              View Restaurants
            </button>
            <button
              className="btn-secondary-custom px-4 py-2-5"
              onClick={() => navigate("/orders")}
            >
              Monitor Orders
            </button>
          </div>
        </header>

        {/* Dynamic Quick Metrics Cards Grid */}
        <section className="metrics-grid row w-100 g-4 my-4 justify-content-center">
          <div className="col-10 col-md-4 col-lg-3">
            <div className="metric-card text-center p-4 shadow-sm border">
              <span className="fs-1">🍽️</span>
              <h3 className="fw-bold mt-2 mb-1 text-dark">
                Live Floor
              </h3>
              <p className="text-muted small mb-0">
                Track real-time table statuses and guest
                distributions.
              </p>
            </div>
          </div>
          <div className="col-10 col-md-4 col-lg-3">
            <div className="metric-card text-center p-4 shadow-sm border">
              <span className="fs-1">⚡</span>
              <h3 className="fw-bold mt-2 mb-1 text-dark">
                Active Kitchen
              </h3>
              <p className="text-muted small mb-0">
                Ensure ticket speeds remain high with
                instantaneous updates.
              </p>
            </div>
          </div>
          <div className="col-10 col-md-4 col-lg-3">
            <div className="metric-card text-center p-4 shadow-sm border">
              <span className="fs-1">📊</span>
              <h3 className="fw-bold mt-2 mb-1 text-dark">
                Insights
              </h3>
              <p className="text-muted small mb-0">
                Review shift cover counts and top-selling
                menu variants.
              </p>
            </div>
          </div>
        </section>

        {/* Feature List Overview */}
        <section className="features-section mt-4">
          <h2 className="features-title">
            Designed for Fast-Paced Operations
          </h2>
          <ul className="features-list p-0">
            <li>
              ✨ Interactive drag-and-drop floor plans
            </li>
            <li>
              ✨ Advanced reservation protection algorithms
            </li>
            <li>
              ✨ Multi-terminal live data synchronization
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Landing;

import { useState, useEffect } from "react";
import "./Landing.css";
import "./Res.css";
import { LANDING } from "../Constants";
import CustomAlert from "../utilityComponents/CustomAlerts/CustomAlert";

const Landing = () => {
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  /**
   * Sets the document title and shows a one-time alert message on landing page load.
   */
  useEffect(() => {
  document.title = LANDING;

  const loginShown = sessionStorage.getItem("loginShown");
  if (!loginShown) {
    setAlertMessage("Login Successful!");
    setShowAlert(true);
    sessionStorage.setItem("loginShown", "true");
  }
}, []);

  return (
    <>
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
          variant="success"
        />
      </div>
      <div
        className="alert alert-success"
        role="alert"
        style={{ width: "40%" }}
      >
        <b>Welcome to My Space!</b> Explore my diverse acheivements and enjoy a
        seamless experience.
      </div>
    </>
  );
};

export default Landing;

import { useState, useEffect } from "react";
import "./Landing.css";
import "./Res.css";
import { LANDING } from "../Constants";
import CustomAlert from "../utilityComponents/CustomAlerts/CustomAlert";

const Landing = () => {
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  /**
   * Sets the document title and shows a welcome alert on component mount.
   */
  useEffect(() => {
    document.title = LANDING;
    setAlertMessage("Login Successful!");
    setShowAlert(true);
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
        <b>Welcome to DineMaster!</b> Explore our diverse menu and enjoy a
        seamless dining experience.
      </div>
    </>
  );
};

export default Landing;

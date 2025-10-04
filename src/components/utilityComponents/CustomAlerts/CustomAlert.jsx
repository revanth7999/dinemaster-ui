import { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
import "./CustomAlert.css"; // create CSS file

function CustomAlert({ show, setShow, variant, heading, message }) {
  const [fade, setFade] = useState(false);

  useEffect(() => {
    if (show) {
      setFade(true); // trigger fade-in
      const timer = setTimeout(() => {
        setFade(false); // trigger fade-out
        setTimeout(() => setShow(false), 300); // hide completely after fade-out
      }, 3000); // auto close after 3s
      return () => clearTimeout(timer);
    }
  }, [show, setShow]);

  if (!show) return null;

  return (
    <Alert
      variant={variant}
      dismissible
      onClose={() => setShow(false)}
      className={`custom-alert ${fade ? "fade-in" : "fade-out"}`}
    >
      {heading && (
        <Alert.Heading style={{ fontSize: "18px" }}>
          <b>{heading}</b>
        </Alert.Heading>
      )}
      <p style={{ fontSize: "14px", marginBottom: 0 }}>{message}</p>
    </Alert>
  );
}

export default CustomAlert;

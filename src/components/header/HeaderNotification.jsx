import React, { useEffect, useRef, useState } from "react";
import { FaBell } from "react-icons/fa";
import { useSelector } from "react-redux";
import { API_BASE_URL } from "../Constants";
import apiClient from "../utils/axiosUtil";
import CustomAlert from "../utilityComponents/CustomAlerts/CustomAlert";

export default function HeaderNotification({ onAlert }) {
  const [showNotifications, setShowNotifications] =
    useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const notificationRef = useRef(null);
  const { user, isAuthenticated } = useSelector(
    (state) => state.auth,
  );

  const isEmailVerified = user?.isEmailVerified ?? false;
  const notificationCount = isEmailVerified ? 0 : 1;

  const handleVerifyEmail = async () => {
    setIsLoading(true);

    try {
      await apiClient.post(
        `${API_BASE_URL}/email/send-verification-email?id=${user.id}`,
      );

      onAlert(
        "Verification email sent successfully.",
        "success",
        "Email Verification",
      );

      setShowNotifications(false);
    } catch (error) {
      console.error(error);

      onAlert(
        error?.response?.data?.message ||
          "Failed to send verification email.",
        "danger",
        "Email Verification",
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside,
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside,
      );
    };
  }, []);

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        marginRight: "15px",
      }}
    >
      <div
        ref={notificationRef}
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          onClick={() =>
            setShowNotifications(!showNotifications)
          }
          style={{
            cursor: "pointer",
            position: "relative",
            display: "flex",
            alignItems: "center",
          }}
        >
          <FaBell size={18} color="white" />

          <span
            style={{
              position: "absolute",
              top: "-8px",
              right: "-8px",
              minWidth: "16px",
              height: "16px",
              borderRadius: "999px",
              background:
                notificationCount > 0
                  ? "#ef4444"
                  : "#6b7280",
              color: "#fff",
              fontSize: "10px",
              fontWeight: "700",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0 4px",
            }}
          >
            {notificationCount}
          </span>
        </div>

        {showNotifications && (
          <div
            style={{
              position: "absolute",
              top: "35px",
              right: "0",
              width: "280px",
              maxWidth: "90vw",
              background: "#fff",
              border: "1px solid #ddd",
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              zIndex: 999,
              padding: "12px",
            }}
          >
            <div
              style={{
                fontWeight: "600",
                marginBottom: "10px",
                borderBottom: "1px solid #eee",
                paddingBottom: "8px",
              }}
            >
              Notifications
            </div>

            {notificationCount === 0 ? (
              <div
                style={{
                  color: "#6b7280",
                  textAlign: "center",
                  padding: "12px 0",
                  fontSize: "0.9rem",
                }}
              >
                No new notifications
              </div>
            ) : (
              <>
                <div
                  style={{
                    fontSize: "0.9rem",
                    color: "#92400e",
                    marginBottom: "12px",
                    lineHeight: "1.4",
                  }}
                >
                  ⚠ Your email is not verified yet. Please
                  verify your email address to access all
                  features.
                </div>

                <button
                  onClick={handleVerifyEmail}
                  style={{
                    width: "100%",
                    border: "none",
                    padding: "8px 12px",
                    borderRadius: "6px",
                    background: "#f59e0b",
                    color: "#fff",
                    fontWeight: "600",
                    cursor: "pointer",
                  }}
                >
                  {isLoading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" />
                      Sending Email...
                    </>
                  ) : (
                    "Send Verification Email"
                  )}
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

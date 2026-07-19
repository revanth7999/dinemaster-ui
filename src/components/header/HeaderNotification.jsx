import React, { useEffect, useRef, useState } from "react";
import { FaBell } from "react-icons/fa";
import { useSelector } from "react-redux";
import { API_BASE_URL } from "../Constants";
import apiClient from "../utils/axiosUtil";
import CustomAlert from "../utilityComponents/CustomAlerts/CustomAlert";
import "../header/HeaderNotification.css";
import {
  EMAIL_RESPONSE_TYPE,
  EMAIL_SENT_FAILURE_MESSAGE,
  EMAIL_SENT_SUCCESS_MESSAGE,
  EMAIL_TOASTER_TITLE,
  NO_NOTIFICATION_MESSAGE,
  NOTIFICATION_ACTION,
  SEND_EMAIL_BUTTON,
} from "./HeaderConstants";
import { getTimeAgo } from "./dateUtils";

export default function HeaderNotification({ onAlert }) {
  const [showNotifications, setShowNotifications] =
    useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const notificationRef = useRef(null);
  const { user, isAuthenticated } = useSelector(
    (state) => state.auth,
  );

  const notificationCount = notifications.filter(
    (notification) => !notification.isRead,
  ).length;

  const handleVerifyEmail = async () => {
    setIsLoading(true);

    try {
      await apiClient.post(
        `${API_BASE_URL}/email/send-verification-email?id=${user.id}`,
      );

      onAlert(
        EMAIL_SENT_SUCCESS_MESSAGE,
        EMAIL_RESPONSE_TYPE.SUCCESS,
        EMAIL_TOASTER_TITLE,
      );

      setShowNotifications(false);
    } catch (error) {
      console.error(error);

      onAlert(
        error?.response?.data?.message ||
          EMAIL_SENT_FAILURE_MESSAGE,
        EMAIL_RESPONSE_TYPE.DANGER,
        EMAIL_TOASTER_TITLE,
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

  const fetchNotifications = async () => {
    if (!user?.id) return;

    try {
      const response = await apiClient.get(
        `${API_BASE_URL}/notifications/${user.id}`,
      );

      setNotifications(response.data.data ?? []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [user?.id]);

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="notifcation-master-wrapper">
      <div
        className="notifcation-master-body"
        ref={notificationRef}
      >
        {/* {Icon} */}
        <div className="notifcation-icon">
          <FaBell
            size={18}
            color="white"
            onClick={() =>
              setShowNotifications(!showNotifications)
            }
          />

          <span
            className={`notification-badge ${
              notificationCount > 0
                ? "has-notifications"
                : "no-notifications"
            }`}
          >
            {notificationCount}
          </span>
        </div>

        {showNotifications && (
          <div className="notifcation-modal">
            <div className="notifcation-modal-header">
              Notifications ({notificationCount})
            </div>

            {notifications.length === 0 ? (
              <div className="notifcation-modal-body-no-notification">
                {NO_NOTIFICATION_MESSAGE}
              </div>
            ) : (
              <div className="notification-list">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`notification-item ${
                      notification.isRead
                        ? "read"
                        : "unread"
                    }`}
                  >
                    <div className="notification-header">
                      <div className="notification-title">
                        {!notification.isRead && (
                          <span className="notification-dot"></span>
                        )}

                        {notification.title}
                      </div>

                      <span className="notification-time">
                        {getTimeAgo(notification.createdAt)}
                      </span>
                    </div>

                    <div className="notification-message">
                      {notification.message}
                    </div>

                    {notification.actionType ===
                      NOTIFICATION_ACTION.VERIFY_EMAIL && (
                      <button
                        onClick={handleVerifyEmail}
                        className="send-email-button"
                      >
                        {isLoading ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" />
                            Sending Email...
                          </>
                        ) : (
                          SEND_EMAIL_BUTTON
                        )}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

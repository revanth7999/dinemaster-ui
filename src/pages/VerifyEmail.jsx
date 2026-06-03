import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import apiClient from "../components/utils/axiosUtil";
import {
  API_BASE_URL,
  LOGIN_PAGE,
} from "../components/Constants";
import { handleLogout } from "../components/utils/logout";
import { useDispatch } from "react-redux";

export default function VerifyEmail() {
  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState(
    "Verifying your email...",
  );
  const hasVerified = useRef(false);

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = () => {
    handleLogout(dispatch);
  };

  useEffect(() => {
    if (hasVerified.current) return;
    hasVerified.current = true;

    const verifyEmail = async () => {
      const token = new URLSearchParams(
        location.search,
      ).get("token");

      if (!token) {
        setStatus("error");
        setMessage("Invalid verification link.");
        return;
      }

      try {
        const response = await apiClient.get(
          `${API_BASE_URL}/email/verify-email?token=${token}`,
        );

        console.log("SUCCESS RESPONSE:", response);
        setStatus("success");
        setMessage(
          response?.data?.message ||
            "Email verified successfully.",
        );
      } catch (error) {
        console.error(error);

        setStatus("error");
        setMessage(
          error?.response?.data?.message ||
            "Verification link is invalid or expired.",
        );
      }
    };

    verifyEmail();
  }, [location.search]);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f8fafc",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "500px",
          background: "#fff",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          textAlign: "center",
        }}
      >
        {status === "loading" && (
          <>
            <h2>Verifying Email</h2>
            <p>{message}</p>
          </>
        )}

        {status === "success" && (
          <>
            <h2
              style={{
                color: "#16a34a",
              }}
            >
              ✓ Email Verified
            </h2>

            <p>{message}</p>

            <button
              onClick={logout}
              style={{
                marginTop: "15px",
                border: "none",
                padding: "10px 20px",
                borderRadius: "6px",
                background: "#16a34a",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              Go To Login
            </button>
          </>
        )}

        {status === "error" && (
          <>
            <h2
              style={{
                color: "#dc2626",
              }}
            >
              ✗ Verification Failed
            </h2>

            <p>{message}</p>

            <button
              onClick={logout}
              style={{
                marginTop: "15px",
                border: "none",
                padding: "10px 20px",
                borderRadius: "6px",
                background: "#dc2626",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              Go To Login
            </button>
          </>
        )}
      </div>
    </div>
  );
}

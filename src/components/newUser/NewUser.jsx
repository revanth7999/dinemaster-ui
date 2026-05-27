import { useEffect, useState } from "react";
import {
  AUTH_REGISTER_URL,
  CREATE_USER,
  LANDING_PAGE,
  LOGIN_PAGE,
  ROLES,
  STATUS_OK,
  TOKEN,
  USER_NAME,
} from "../Constants";
import "./NewUser.css"; // Ensure this contains the updated CSS below
import { Link, useNavigate } from "react-router-dom";
import { formValidation } from "../utils/basicFunctions";
import apiClient from "../utils/axiosUtil";
import useDocumentTitle from "../../hooks/useDocumentTitle";

const NewUser = ({ prop }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useDocumentTitle(CREATE_USER);

  const createUser = (e) => {
    e.preventDefault(); // Prevents page reload immediately

    // Using your utility validation function
    const validate = formValidation(email, password);
    if (validate) {
      setIsLoading(true);
      apiClient
        .post(AUTH_REGISTER_URL, {
          username: username || email, // Fallback if username isn't explicitly checked
          email: email,
          password: password,
          role: ROLES.CUSTOMER,
          is_active: true,
        })
        .then((response) => {
          if (response.status === STATUS_OK) {
            const token = response.data.data.token;
            localStorage.setItem(TOKEN, token);
            localStorage.setItem(
              USER_NAME,
              username || email,
            );
            setIsLoading(false);
            navigate(LANDING_PAGE);
          } else {
            console.log(response);
            setIsLoading(false);
          }
        })
        .catch((error) => {
          setIsLoading(false);
          console.error(
            "There was an error creating the user!",
            error,
          );
        });
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card shadow-sm">
        {/* Left side / Top Banner on Mobile */}
        <div className="login-left">
          <div className="brand d-flex align-items-center gap-2 text-white">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2c1.1 0 2 .9 2 2v2H10V4c0-1.1.9-2 2-2zM4 9c0-1.1.9-2 2-2h12c1.1 0 2 .9 2 2v3H4V9zm0 5h16v2c0 2.2-1.8 4-4 4H8c-2.2 0-4-1.8-4-4v2z"
                fill="currentColor"
              />
            </svg>
            <span className="fw-semibold fs-5">
              DineMaster
            </span>
          </div>

          <div className="left-content text-white">
            <h1 className="fw-bold mb-2 text-white">
              Join the Kitchen!
            </h1>
            <p className="text-white-50 small mb-0">
              Create your account to start managing floors,
              running automated reservations, and elevating
              dining operations.
            </p>
          </div>

          {/* Feature badges (hidden on mobile via CSS) */}
          <div className="features-footer d-flex justify-content-between text-white-50 gap-2 text-start mt-auto w-100">
            <div>
              <div className="fw-semibold text-white d-flex align-items-center gap-1 mb-1 small">
                🍽️ Smart Floor
              </div>
              <span
                style={{
                  fontSize: "11px",
                  display: "block",
                }}
              >
                Real-time table tracking
              </span>
            </div>
            <div>
              <div className="fw-semibold text-white d-flex align-items-center gap-1 mb-1 small">
                ⚡ Live Sync
              </div>
              <span
                style={{
                  fontSize: "11px",
                  display: "block",
                }}
              >
                Instant kitchen updates
              </span>
            </div>
            <div>
              <div className="fw-semibold text-white d-flex align-items-center gap-1 mb-1 small">
                📈 Analytics
              </div>
              <span
                style={{
                  fontSize: "11px",
                  display: "block",
                }}
              >
                Daily performance insights
              </span>
            </div>
          </div>
        </div>

        {/* Right side (Register form container) */}
        <div className="login-right">
          <form
            onSubmit={createUser}
            className="login-form"
          >
            <h2 className="fw-bold mb-1 text-dark">
              Sign Up
            </h2>
            <p className="text-muted small mb-4">
              Get started today! Please enter your details.
            </p>

            {/* Email Field */}
            <div className="mb-3">
              <label className="form-label small fw-medium mb-1">
                Email Address
              </label>
              <div className="input-group-custom">
                <span className="input-icon">✉️</span>
                <input
                  type="email"
                  className="form-control-custom"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Username Field */}
            <div className="mb-3">
              <label className="form-label small fw-medium mb-1">
                Username
              </label>
              <div className="input-group-custom">
                <span className="input-icon">👤</span>
                <input
                  type="text"
                  className="form-control-custom"
                  placeholder="Choose a unique username"
                  value={username}
                  onChange={(e) =>
                    setUsername(e.target.value)
                  }
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="mb-4">
              <label className="form-label small fw-medium mb-1">
                Password
              </label>
              <div className="input-group-custom">
                <span className="input-icon">🔒</span>
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control-custom"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  required
                />
                <span
                  className="password-toggle"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  style={{ userSelect: "none" }}
                >
                  {showPassword ? "🙈" : "👁️"}
                </span>
              </div>
            </div>

            {/* Submit Registration Button */}
            <button
              type="submit"
              className="btn btn-primary-custom w-100 fw-medium mb-4"
            >
              {isLoading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Registering...
                </>
              ) : (
                "Create User"
              )}
            </button>

            {/* Footer Redirect Link */}
            <p className="text-center small text-muted mb-0">
              Already have an account?{" "}
              <Link
                to={LOGIN_PAGE}
                className="auth-footer-link fw-medium text-decoration-none"
              >
                Log In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewUser;

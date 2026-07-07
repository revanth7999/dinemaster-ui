import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AUTH_LOGIN_URL,
  BAD_REQUEST,
  CREATE_USER_PAGE,
  INTERNAL_SERVER_ERROR,
  LANDING_PAGE,
  LOGIN,
  TOKEN,
  UNKNOWN_ERROR,
  USER_NAME,
} from "../Constants";
import apiClient from "../utils/axiosUtil";
import "./Login.css";
import LoginFormHook from "../../hooks/LoginFormHook";
import { getBrowserName } from "../utils/basicFunctions";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/authSlice";
import useDocumentTitle from "../../hooks/useDocumentTitle";

/**
 * @param {*} values
 * Validates the login form fields.
 */
const validateLogin = (values) => {
  let errors = {};
  if (!values.username) {
    errors.username = "Username is required.";
  }
  if (!values.password) {
    errors.password = "Password is required.";
  }
  return errors;
};

const initialValues = {
  username: "",
  password: "",
};

const LoginUser = () => {
  const { values, handleChange, runValidation, errors } =
    LoginFormHook(
      initialValues,
      true, // validate onChange
      validateLogin,
    );
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  useDocumentTitle(LOGIN);
  useEffect(() => {
    if (localStorage.getItem(TOKEN)) {
      navigate(LANDING_PAGE);
    }
  }, []);

  /**
   * Sets the authentication token and username in local storage.
   * Dispatches a custom event to notify other components of the token change.
   * @param {*} response - The response object from the login API call.
   */
  const setLocalStorage = (response) => {
    const token = response.data.data.tokens.accessToken;
    localStorage.setItem(TOKEN, token);
    localStorage.setItem(USER_NAME, values.username);
    window.dispatchEvent(new Event("token-set"));
  };

  /**
   * @param {*} e
   * Handles the login form submission, performs validation, and manages API interaction.
   * On successful login, stores the token and navigates to the landing page.
   * Displays appropriate alerts for different error scenarios.
   */
  const handleLogin = (e) => {
    e.preventDefault();

    if (runValidation()) {
      setIsLoading(true);
      apiClient
        .post(AUTH_LOGIN_URL, {
          username: values.username,
          password: values.password,
          deviceInfo: getBrowserName(),
        })
        .then((response) => {
          setIsLoading(false);
          if (response.status === 200) {
            const token =
              response.data.data.tokens.accessToken;
            const userData = response.data.data.user;
            const env = response.data.data.meta.environment;
            dispatch(
              loginSuccess({
                token: token,
                user: userData,
                environment: env,
              }),
            );
            setLocalStorage(response);
            navigate(LANDING_PAGE);
          } else {
            alert(UNKNOWN_ERROR);
          }
        })
        .catch((error) => {
          setIsLoading(false);
          if (error.response) {
            // The request was made, and the server responded with a status code out of 2xx
            switch (error.response.status) {
              case 403:
                alert(error.response.data.message);
                break;
              case 400:
                alert(BAD_REQUEST);
                break;
              case 500:
                alert(INTERNAL_SERVER_ERROR);
                break;
              default:
                alert(UNKNOWN_ERROR);
            }
          } else {
            // Some other error (network error, no response)
            alert(error.message || "An error occurred");
          }
          console.error("Login error", error);
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
                d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="fw-semibold fs-5">
              DineMaster
            </span>
          </div>

          <div className="left-content text-white">
            <h1 className="fw-bold mb-2 text-white">
              Welcome Back!
            </h1>
            <p className="text-white-50 small mb-0">
              Log in to manage your floor, track
              reservations, and deliver flawless dining
              experiences.
            </p>
          </div>

          {/* Feature badges (hidden on mobile via CSS) */}
          {/* Desktop Footer Features */}
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

        {/* Right side (form) */}
        <div className="login-right">
          <form
            onSubmit={handleLogin}
            className="login-form"
          >
            <h2 className="fw-bold mb-1 text-dark">
              Log In
            </h2>
            <p className="text-muted small mb-4">
              Welcome back! Please enter your details.
            </p>

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
                  name="username"
                  placeholder="Enter your username"
                  value={values.username}
                  onChange={handleChange}
                />
              </div>
              {errors.username && (
                <small className="text-danger mt-1 d-block small">
                  {errors.username}
                </small>
              )}
            </div>

            {/* Password Field */}
            <div className="mb-3">
              <label className="form-label small fw-medium mb-1">
                Password
              </label>
              <div className="input-group-custom">
                <span className="input-icon">🔒</span>
                <input
                  // Dynamically change type based on state
                  type={showPassword ? "text" : "password"}
                  className="form-control-custom"
                  name="password"
                  placeholder="Enter your password"
                  value={values.password}
                  onChange={handleChange}
                />
                {/* Click listener that toggles the state, and dynamically changes the icon */}
                <span
                  className="password-toggle"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  style={{ userSelect: "none" }} // Prevents highlighting the icon text on double click
                >
                  {showPassword ? "🙈" : "👁️"}
                </span>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div className="form-check d-flex align-items-center gap-2 op-50">
                <input
                  type="checkbox"
                  className="form-check-input custom-checkbox m-0"
                  id="rememberMe"
                  name="rememberMe"
                  checked={false} // Always false since it's not active
                  disabled // This prevents the user from clicking it
                />
                <label
                  className="form-check-label text-muted small user-select-none opacity-75"
                  htmlFor="rememberMe"
                  style={{ cursor: "not-allowed" }}
                >
                  Remember me{" "}
                  <span
                    className="text-danger-custom"
                    style={{ fontSize: "11px" }}
                  >
                    (Not implemented)
                  </span>
                </label>
              </div>

              <Link
                to="/forgot-password"
                className="forgot-link small text-decoration-none"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-primary-custom w-100 fw-medium mb-4"
            >
              {isLoading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" />
                  Loading...
                </>
              ) : (
                "Log In"
              )}
            </button>

            {/* Divider */}
            <div className="divider-wrapper mb-4">
              <div className="line"></div>
              <span className="divider-text">
                or continue with
              </span>
              <div className="line"></div>
            </div>

            {/* Social Buttons */}
            <div className="social-buttons mb-4">
              <button type="button" className="social-btn">
                <img
                  src="https://www.svgrepo.com/show/355037/google.svg"
                  alt="google"
                />
                Google
              </button>
              <button type="button" className="social-btn">
                <img
                  src="https://www.svgrepo.com/show/448239/microsoft.svg"
                  alt="microsoft"
                />
                Microsoft
              </button>
            </div>

            {/* Create Account Link Footer */}
            <p className="text-center small text-muted mb-0">
              Don't have an account?{" "}
              <Link
                to={CREATE_USER_PAGE}
                className="auth-footer-link fw-medium text-decoration-none"
              >
                Create one
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginUser;

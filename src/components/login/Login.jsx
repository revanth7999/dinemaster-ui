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
  VALIDATION_ERROR,
} from "../Constants";
import apiClient from "../utils/axiosUtil";
import "../globalStyles/form.css";
import LoginFormHook from "../../hooks/LoginFormHook";

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
  const { values, handleChange, runValidation, errors } = LoginFormHook(
    initialValues,
    true, // validate onChange
    validateLogin,
  );
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = LOGIN;
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
    const token = response.data.data.accessToken;
    localStorage.setItem(TOKEN, token);
    localStorage.setItem(USER_NAME, values.username);
    window.dispatchEvent(new Event("token-set"));
  };
  /**
   * Detects the browser name from the user agent string.
   * @returns {string|null} - The name of the browser or null if detection fails.
   */
  const getBrowserName = () => {
    try {
      const ua = navigator.userAgent || "";
      if (/Edg\//.test(ua)) return "Edge";
      if (/OPR\//.test(ua)) return "Opera";
      if (/Chrome\//.test(ua) && !/Edg\//.test(ua) && !/OPR\//.test(ua))
        return "Chrome";
      if (/Firefox\//.test(ua)) return "Firefox";
      if (/Safari\//.test(ua) && !/Chrome\//.test(ua)) return "Safari";
      return ua || "Unknown";
    } catch (e) {
      return null;
    }
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
    <div
      className="container d-flex align-items-center justify-content-center"
      style={{ marginTop: "10vh" }}
    >
      <div
        className="row w-100 shadow"
        style={{ maxWidth: "900px", height: "50vh" }}
      >
        {/* Left side (image / design) */}
        <div
          className="col-md-6 d-none d-md-block"
          style={{ background: "#0d1117" }}
        ></div>

        {/* Right side (form) */}
        <div
          className="col-md-6 p-4 d-flex align-items-center"
          style={{ background: "#C1BBBB" }}
        >
          <form
            onSubmit={handleLogin}
            className="w-100"
            style={{ marginLeft: "5vh" }}
          >
            <h2 className="mb-4">Log In</h2>
            <div className="form-floating mb-3" style={{ width: "75%" }}>
              <input
                type="text"
                className="form-control"
                id="floatingInput"
                name="username"
                placeholder="Username"
                value={values.username}
                onChange={handleChange}
              />
              <label htmlFor="floatingInput">Username</label>
              {errors.username && (
                <small className="text-danger">{errors.username}</small>
              )}
            </div>

            <div className="form-floating mb-3" style={{ width: "75%" }}>
              <input
                type="password"
                className="form-control"
                id="floatingPassword"
                name="password"
                placeholder="Password"
                value={values.password}
                onChange={handleChange}
              />
              <label htmlFor="floatingPassword">Password</label>
              {errors.password && (
                <small className="text-danger">{errors.password}</small>
              )}
            </div>

            <p>
              Don’t have an account?{" "}
              <Link to={CREATE_USER_PAGE}>Create one</Link>
            </p>

            <button type="submit" className="btn btn-dark w-75">
              {isLoading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  {" Loading..."}
                </>
              ) : (
                "Log In"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginUser;

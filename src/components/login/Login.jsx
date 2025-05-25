import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ADMIN_LANDING_PAGE,
  AUTH_LOGIN_URL,
  BAD_REQUEST,
  CREATE_USER_PAGE,
  INTERNAL_SERVER_ERROR,
  LANDING_PAGE,
  LOGIN,
  ROLES,
  TOKEN,
  UNKNOWN_ERROR,
  USER_NAME,
  VALIDATION_ERROR,
} from "../Constants";
import { formValidation } from "../utils/basicFunctions";
import apiClient from "../utils/axiosUtil";
import "../globalStyles/form.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { useIdleLogout } from "../useIdleLogout";

const NewUser = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = LOGIN;
  }, []);

  const handleOAuthLogin = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/github"; // adjust port if needed
  };

  const handleLogin = (e) => {
    var validate = formValidation(email, password);
    if (validate) {
      setIsLoading(true);
      e.preventDefault(); // Prevents form submission default behavior
      apiClient
        .post(AUTH_LOGIN_URL, {
          username: email,
          password: password,
        })
        .then((response) => {
          const token = response.data.data.token;
          localStorage.setItem(TOKEN, token);
          localStorage.setItem(USER_NAME, email);
          window.dispatchEvent(new Event("token-set"));
          switch (response.status) {
            case 200:
              useIdleLogout();
              if (response.data.data.role === ROLES.CUSTOMER) {
                setIsLoading(false);
                navigate(LANDING_PAGE);
              } else if (response.data.data.role === ROLES.ADMIN) {
                setIsLoading(false);
                navigate(ADMIN_LANDING_PAGE);
              }
              break;
            case 400:
              alert(BAD_REQUEST);
              setIsLoading(false);
              break;
            case 500:
              alert(INTERNAL_SERVER_ERROR);
              setIsLoading(false);
              break;
            default:
              alert(UNKNOWN_ERROR);
              setIsLoading(false);
          }
        })
        .catch((error) => {
          setIsLoading(false);
          alert(VALIDATION_ERROR);
          console.error("There was an error logging the user!", error);
        });
    }
  };

  return (
    <div className="mainDiv">
      <div className="formDiv">
        <h2 style={{ fontFamily: "monospace" }}>Log In</h2>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Please enter you email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="col-form-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="form-control"
            placeholder="Please enter you password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <p>
          if you wan to create account{" "}
          <Link to={CREATE_USER_PAGE}>Create User</Link>
        </p>
        <div className="loginButton">
          <button
            type="button"
            onClick={handleLogin}
            className="btn btn-success"
          >
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
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
            margin: "5px",
          }}
        >
          <span>or you can sign in with</span>
          <FontAwesomeIcon
            icon={faGithub}
            onClick={handleOAuthLogin}
            style={{ cursor: "pointer", fontSize: "20px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default NewUser;

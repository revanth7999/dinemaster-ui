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
import "../globalStyles/form.css";
import { Link, useNavigate } from "react-router-dom";
import { formValidation } from "../utils/basicFunctions";
import apiClient from "../utils/axiosUtil";

const NewUser = ({ prop }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const createUser = (e) => {
    var validate = formValidation(email, password);
    if (validate) {
      setIsLoading(true);
      e.preventDefault(); // Prevents form submission default behavior
      apiClient
        .post(AUTH_REGISTER_URL, {
          username: email,
          password: password,
          role: ROLES.CUSTOMER,
          is_active: true,
        })
        .then((response) => {
          if (response.status === STATUS_OK) {
            const token = response.data.data.token;
            localStorage.setItem(TOKEN, token);
            localStorage.setItem(USER_NAME, email);
            setIsLoading(false);
            navigate(LANDING_PAGE);
          } else {
            console.log(response);
          }
        })
        .catch((error) => {
          console.error("There was an error creating the user!", error);
        });
    }
  };

  useEffect(() => {
    document.title = CREATE_USER;
  }, []);

  return (
    <div className="mainDiv">
      <div className="formDiv">
        <h2 style={{ fontFamily: "monospace" }}>Create New User</h2>
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
          if you already have an account <Link to={LOGIN_PAGE}>LogIn</Link>
        </p>
        <div className="loginButton">
          <button
            type="button"
            onClick={createUser}
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
              "Create User"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewUser;

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
          <form className="w-100" style={{ marginLeft: "5vh" }}>
            <h2 className="mb-4">Create New User</h2>
            <div className="form-floating mb-3" style={{ width: "75%" }}>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Please enter you email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label htmlFor="floatingInput">Please enter your Email</label>
              {/* {errors.username && <small className="text-danger">{errors.username}</small>} */}
            </div>

            <div className="form-floating mb-3" style={{ width: "75%" }}>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Please enter you email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label htmlFor="floatingInput">Please enter your Username</label>
              {/* {errors.username && <small className="text-danger">{errors.username}</small>} */}
            </div>

            <div className="form-floating mb-3" style={{ width: "75%" }}>
              <input
                type="password"
                id="password"
                className="form-control"
                placeholder="Please enter you password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label htmlFor="floatingPassword">Password</label>
              {/* {errors.password && <small className="text-danger">{errors.password}</small>} */}
            </div>

            <p>
              if you already have an account <Link to={LOGIN_PAGE}>LogIn</Link>
            </p>

            <button
              type="button"
              onClick={createUser}
              className="btn btn-dark w-75"
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewUser;

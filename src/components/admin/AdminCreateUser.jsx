import { useEffect, useState } from "react";
import { AUTH_REGISTER_URL, AUTH_GET_ROLES } from "../Constants";
import "../globalStyles/form.css";
import { useNavigate } from "react-router-dom";
import { formValidation } from "../utils/basicFunctions";
import apiClient from "../utils/axiosUtil";

const AdminCreateUser = ({ prop }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");

  useEffect(() => {
    apiClient
      .get(AUTH_GET_ROLES)
      .then((response) => {
        setRoles(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  const createUser = (e) => {
    var validate = formValidation(email, password);
    if (validate) {
      setIsLoading(true);
      e.preventDefault(); // Prevents form submission default behavior
      apiClient
        .post(AUTH_REGISTER_URL, {
          username: email,
          password: password,
          role: selectedRole,
          is_active: true,
        })
        .then((response) => {
          if (response.status === 200) {
            setIsLoading(false);
            alert("User Created Succesfully!!");
          } else {
            console.log(response);
          }
        })
        .catch((error) => {
          console.error("There was an error creating the user!", error);
        });
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setSelectedRole(value);
  };

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
        <div>
          <select
            className="form-select"
            value={selectedRole}
            onChange={handleChange}
          >
            <option value="" disabled>
              Select a role
            </option>
            {roles.map((role, index) => (
              <option key={index}>{role.roles}</option>
            ))}
          </select>
        </div>
        <div className="loginButton">
          <button
            type="button"
            style={{ margin: "10px" }}
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

export default AdminCreateUser;

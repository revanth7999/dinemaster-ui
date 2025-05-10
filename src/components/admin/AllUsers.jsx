import React, { useEffect, useState } from "react";
import { AUTH_SHOW_USERS } from "../Constants";
import apiClient from "../utils/axiosUtil";
import "../admin/AllUsers.css";

const AllUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    apiClient
      .get(AUTH_SHOW_USERS)
      .then((response) => {
        setUsers(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  return (
    <div className="mainDivs">
      <table
        className="table table-striped"
        style={{ borderCollapse: "separate" }}
      >
        <thead style={{ backgroundColor: "#f0f0f0" }}>
          <tr>
            <th style={thStyle}>S.No</th>
            <th style={thStyle}>Username</th>
            <th style={thStyle}>Role</th>
            <th style={thStyle}>Status</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr
              key={user.id || index}
              style={{ borderBottom: "1px solid #ddd" }}
            >
              <td style={tdStyle}>{index + 1}</td>
              <td style={tdStyle}>{user.username}</td>
              <td style={tdStyle}>{user.role}</td>
              <td style={tdStyle}>
                <span
                  style={{
                    padding: "4px 10px",
                    borderRadius: "6px",
                    backgroundColor: user.is_active ? "#4CAF50" : "#F44336", // Green or Red
                    color: "#fff",
                    fontWeight: "bold",
                    fontSize: "0.9rem",
                  }}
                >
                  {user.is_active ? "Active" : "Inactive"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Basic styling
const thStyle = {
  textAlign: "left",
  padding: "8px",
  borderBottom: "2px solid #ccc",
};

const tdStyle = {
  padding: "8px",
};

export default AllUsers;

import React, { useState, useEffect } from "react";
import { ADMIN_LANDING } from "../Constants";
import AllUsers from "./AllUsers";
import AdminCreateUser from "./AdminCreateUser";
import AllRestaurants from "./AllRestaurants";

export default function Admin() {
  const [activeTab, setActiveTab] = useState("create-user"); // Track active tab

  useEffect(() => {
    document.title = ADMIN_LANDING;
  }, []);

  return (
    <div style={{ display: "flex" }}>
      {/* Navigation menu on the left */}
      <ul
        className="nav nav-pills"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <li className="nav-item">
          <a
            className={`nav-link ${activeTab === "create-user" ? "active" : ""}`}
            aria-current="page"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setActiveTab("create-user");
            }}
          >
            Create User
          </a>
        </li>
        <li className="nav-item">
          <a
            className={`nav-link ${activeTab === "view-users" ? "active" : ""}`}
            href="#"
            onClick={() => setActiveTab("view-users")}
          >
            Show all Users
          </a>
        </li>
        <li className="nav-item">
          <a
            className={`nav-link ${activeTab === "view-restaurants" ? "active" : ""}`}
            href="#"
            onClick={() => setActiveTab("view-restaurants")}
          >
            Show all Restaurants
          </a>
        </li>
      </ul>

      {/* Content area on the right */}
      <div
        style={{
          display: "flex",
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {activeTab === "create-user" && (
          <AdminCreateUser prop={{ msg: "from Admin" }} />
        )}
        {activeTab === "view-users" && <AllUsers />}
        {activeTab === "view-restaurants" && <AllRestaurants />}
      </div>
    </div>
  );
}

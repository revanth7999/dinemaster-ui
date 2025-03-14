import React, { useState, useEffect } from "react";
import { ADMIN_LANDING } from "../Constants";
import NewUser from "../newUser/NewUser";

export default function Admin() {
  const [activeTab, setActiveTab] = useState("create-user"); // Track active tab

  useEffect(() => {
    document.title = ADMIN_LANDING;
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {/* Navigation menu on the left */}
      <ul
        className="nav nav-pills"
        style={{ width: "20%", paddingRight: "20px", justifyItems: "center" }}
      >
        <li className="nav-item">
          <a
            className={`nav-link ${activeTab === "create-user" ? "active" : ""}`}
            aria-current="page"
            href="#"
            onClick={() => setActiveTab("create-user")}
          >
            Create User
          </a>
        </li>
        <li className="nav-item">
          <a
            className={`nav-link ${activeTab === "link1" ? "active" : ""}`}
            href="#"
            onClick={() => setActiveTab("link1")}
          >
            Show all Users
          </a>
        </li>
      </ul>

      {/* Content area on the right */}
      <div style={{ flex: 1 }}>
        {activeTab === "create-user" && (
          <NewUser prop={{ msg: "from Admin" }} />
        )}
        {activeTab === "link1" && <div>Content for Link 1</div>}
      </div>
    </div>
  );
}

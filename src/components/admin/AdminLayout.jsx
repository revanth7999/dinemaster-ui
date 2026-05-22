import React, { useState, useEffect } from "react";
import { ADMIN_LANDING } from "../Constants";
import AdminCreateUser from "./AdminCreateUser";
import { MenuSidebar } from "./MenuSidebar";
import UsersList from "./UsersList";
import RestaurantsList from "./RestaurantsList";
import "../admin/AdminLayout.css";

const tabsConfig = {
  "create-user": {
    title: "Admin | Create User",
    component: <AdminCreateUser />,
  },

  "view-users": {
    title: "Admin | Users",
    component: <UsersList />,
  },

  "view-restaurants": {
    title: "Admin | Restaurants",
    component: <RestaurantsList />,
  },
};

export default function AdminLayout() {
  const [activeTab, setActiveTab] = useState("create-user");

  useEffect(() => {
    document.title =
      tabsConfig[activeTab]?.title || ADMIN_LANDING;
  }, [activeTab]);

  return (
    <div className="admin-layout">
      <MenuSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <div className="admin-content">
        {tabsConfig[activeTab]?.component}
      </div>
    </div>
  );
}

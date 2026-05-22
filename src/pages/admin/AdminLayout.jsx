import React, { useState, useEffect } from "react";
import { ADMIN_LANDING } from "../../components/Constants";
import AdminCreateUser from "./AdminCreateUser";
import { MenuSidebar } from "./MenuSidebar";
import UsersList from "./UsersList";
import RestaurantsList from "./RestaurantsList";
import "./AdminLayout.css";
import CommonBreadcrumb from "../../components/common/CommonBreadcrumb";

const tabsConfig = {
  "create user": {
    title: "Admin | Create User",
    component: <AdminCreateUser />,
  },

  "Users": {
    title: "Admin | Users",
    component: <UsersList />,
  },

  "Restaurants": {
    title: "Admin | Restaurants",
    component: <RestaurantsList />,
  },
};

export default function AdminLayout() {
  const [activeTab, setActiveTab] = useState("create user");

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
        <CommonBreadcrumb
          current={
            tabsConfig[activeTab]?.label || activeTab
          }
        />
       {tabsConfig[activeTab]?.component}
      </div>
    </div>
  );
}

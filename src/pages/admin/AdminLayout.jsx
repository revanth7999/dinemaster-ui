import { useState } from "react";
import { ADMIN_LANDING } from "../../components/Constants";
import AdminCreateUser from "./AdminCreateUser";
import { MenuSidebar } from "./MenuSidebar";
import UsersList from "./UsersList";
import RestaurantsList from "./RestaurantsList";
import "./AdminLayout.css";
import CommonBreadcrumb from "../../components/common/CommonBreadcrumb";
import useDocumentTitle from "../../hooks/useDocumentTitle";

const tabsConfig = {
  "create user": {
    title: "Create user",
    description: "Add a team member and assign their access role.",
    component: <AdminCreateUser />,
  },

  Users: {
    title: "Users",
    description: "Review account status, roles, and email verification.",
    component: <UsersList />,
  },

  Restaurants: {
    title: "Restaurants",
    description: "Browse restaurant records and their contact details.",
    component: <RestaurantsList />,
  },
};

export default function AdminLayout() {
  const [activeTab, setActiveTab] = useState("create user");
  useDocumentTitle(
    tabsConfig[activeTab]?.title || ADMIN_LANDING,
  );

  return (
    <div className="admin-layout">
      <MenuSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <div className="admin-content">
        <div className="admin-page-heading">
          <div>
            <CommonBreadcrumb current={tabsConfig[activeTab]?.title || activeTab} />
            <p className="admin-eyebrow">DineMaster administration</p>
            <h1>{tabsConfig[activeTab]?.title || ADMIN_LANDING}</h1>
            <p className="admin-page-description">
              {tabsConfig[activeTab]?.description}
            </p>
          </div>
          {activeTab !== "create user" && (
            <button
              type="button"
              className="admin-primary-action"
              onClick={() => setActiveTab("create user")}
            >
              <span aria-hidden="true">＋</span> Create user
            </button>
          )}
        </div>
        <section className="admin-workspace" aria-label={`${activeTab} management`}>
          {tabsConfig[activeTab]?.component}
        </section>
      </div>
    </div>
  );
}

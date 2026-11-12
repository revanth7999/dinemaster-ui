import CIcon from "@coreui/icons-react";
import {
  cilPeople,
  cilRestaurant,
  cilUserPlus,
} from "@coreui/icons";
import { useSelector } from "react-redux";

const menuItems = [
  { key: "Users", label: "Users", hint: "Accounts and access", icon: cilPeople },
  { key: "Restaurants", label: "Restaurants", hint: "Restaurant directory", icon: cilRestaurant },
  { key: "create user", label: "Create user", hint: "Invite a team member", icon: cilUserPlus },
];

export const MenuSidebar = ({ activeTab, setActiveTab }) => {
  const { user } = useSelector((state) => state.auth);

  return (
    <aside className="admin-sidebar">
      <div className="admin-brand">
        <div className="admin-brand-mark" aria-hidden="true">D</div>
        <div>
          <strong>DineMaster</strong>
          <span>ADMIN CONSOLE</span>
        </div>
      </div>

      <div className="admin-sidebar-label">WORKSPACE</div>
      <nav className="admin-nav" aria-label="Admin sections">
        {menuItems.map((item) => (
          <button
            key={item.key}
            type="button"
            className={`admin-nav-item ${activeTab === item.key ? "active" : ""}`}
            onClick={() => setActiveTab(item.key)}
            aria-current={activeTab === item.key ? "page" : undefined}
          >
            <span className="admin-nav-icon"><CIcon icon={item.icon} /></span>
            <span className="admin-nav-copy">
              <strong>{item.label}</strong>
              <small>{item.hint}</small>
            </span>
            <span className="admin-nav-chevron" aria-hidden="true">›</span>
          </button>
        ))}
      </nav>

      <div className="admin-sidebar-footer">
        <div className="admin-avatar" aria-hidden="true">
          {(user?.username || "A").slice(0, 1).toUpperCase()}
        </div>
        <div className="admin-account-copy">
          <strong>{user?.username || "Administrator"}</strong>
          <span>{user?.email || "Admin account"}</span>
        </div>
        <span className="admin-role-badge">ADMIN</span>
      </div>
    </aside>
  );
};

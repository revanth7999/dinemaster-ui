import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  CSidebar,
  CSidebarNav,
  CNavTitle,
  CNavItem,
  CSidebarFooter,
  CDropdown,
  CDropdownToggle,
  CAvatar,
  CDropdownMenu,
  CDropdownDivider,
  CDropdownItem,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import {
  cilAccountLogout,
  cilCloudDownload,
  cilCreditCard,
  cilMinus,
  cilOptions,
  cilPlus,
  cilPuzzle,
  cilSettings,
  cilSidebarClose,
  cilSidebarOpen,
  cilSpeedometer,
  cilUser,
  cilUserPlus,
  cilPeople,
  cilRestaurant,
} from "@coreui/icons";
import "@coreui/coreui/dist/css/coreui.min.css";
import { useSelector } from "react-redux";

const menuItems = [
  {
    key: "create user",
    label: "Create User",
    icon: cilUserPlus,
  },
  {
    key: "Users",
    label: "Show Users",
    icon: cilPeople,
  },
  {
    key: "Restaurants",
    label: "Show Restaurants",
    icon: cilRestaurant,
  },
];

export const MenuSidebar = ({
  activeTab,
  setActiveTab,
}) => {
  // 1. Extract the specific pieces of state you need
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  return (
    <CSidebar
      className="border-end admin-sidebar"
      unfoldable={false}
    >
      <CSidebarNav>
        <CNavTitle>ADMIN PANEL</CNavTitle>

        {menuItems.map((item) => (
          <CNavItem
            key={item.key}
            href="#"
            active={activeTab === item.key}
            onClick={(e) => {
              e.preventDefault();
              setActiveTab(item.key);
            }}
            // className="sidebar-item"
          >
            <CIcon
              customClassName="nav-icon"
              icon={item.icon}
            />

            {item.label}
          </CNavItem>
        ))}
        </CSidebarNav>

        <CSidebarFooter>
          <CDropdown className="w-100" direction="dropup">
            <CDropdownToggle
              caret={false}
              className="w-100 d-flex gap-2 p-1 align-items-center"
              variant="ghost"
            >
              <CAvatar
                shape="rounded"
                size="md"
                src="/images/avatars/7.jpg"
              />
              <div className="small text-start d-sidebar-narrow-none">
                <div className="fw-semibold">
                  {user?.username}
                </div>
                <div>{user?.email}</div>
              </div>
              <CIcon className="nav-icon ms-auto d-sidebar-narrow-none" icon={cilOptions} />
            </CDropdownToggle>
            <CDropdownMenu className="w-100">
              <div className="d-flex gap-2 px-2">
                <CAvatar
                  shape="rounded"
                  size="md"
                  src="/images/avatars/7.jpg"
                />
                <div className="small text-start">
                  <div className="fw-semibold">
                    {user?.username}
                  </div>
                  <div>{user?.email}</div>
                </div>
              </div>
              <CDropdownDivider />
              <CDropdownItem href="#">
                <div className="d-flex align-items-center gap-2">
                  <CIcon icon={cilUser} />
                  Account
                </div>
              </CDropdownItem>
              <CDropdownItem href="#">
                <div className="d-flex align-items-center gap-2">
                  <CIcon icon={cilCreditCard} />
                  Billing
                </div>
              </CDropdownItem>
              <CDropdownItem href="#">
                <div className="d-flex align-items-center gap-2">
                  <CIcon icon={cilSettings} />
                  Settings
                </div>
              </CDropdownItem>
              <CDropdownDivider />
              <CDropdownItem href="#">
                <div className="d-flex align-items-center gap-2">
                  <CIcon icon={cilAccountLogout} />
                  Logout
                </div>
              </CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
        </CSidebarFooter>
    </CSidebar>
  );
};

import { useEffect, useRef, useState } from "react";
import { FaChevronDown, FaSignOutAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { handleLogout } from "../utils/logout";

function UserLogout({ user, email }) {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const profileRef = useRef(null);
  const displayName = user || "Staff";
  const initials = displayName.slice(0, 1).toUpperCase();

  useEffect(() => {
    const closeOnOutsideClick = (event) => {
      if (!profileRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    };
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("mousedown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("mousedown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  const logout = () => {
    setIsOpen(false);
    handleLogout(dispatch);
  };

  return (
    <div className="header-profile-menu" ref={profileRef}>
      <button
        type="button"
        className="header-profile-trigger"
        onClick={() => setIsOpen((open) => !open)}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-label={`Account menu for ${displayName}`}
      >
        <span className="header-profile-avatar" aria-hidden="true">
          {initials}
        </span>
        <span className="header-profile-name">{displayName}</span>
        <FaChevronDown className="header-profile-chevron" aria-hidden="true" />
      </button>

      {isOpen && (
        <div className="header-profile-dropdown" role="menu">
          <div className="header-profile-summary">
            <span className="header-profile-avatar header-profile-avatar--large" aria-hidden="true">
              {initials}
            </span>
            <span className="header-profile-details">
              <strong>{displayName}</strong>
              <small>{email || "Signed in to DineMaster"}</small>
            </span>
          </div>
          <div className="header-profile-divider" />
          <button
            type="button"
            className="header-logout-action"
            onClick={logout}
            role="menuitem"
          >
            <FaSignOutAlt aria-hidden="true" />
            <span>Log out</span>
          </button>
        </div>
      )}
    </div>
  );
}

export default UserLogout;

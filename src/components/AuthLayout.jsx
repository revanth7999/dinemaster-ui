import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Header from "./header/Header";
import { LOGIN_PAGE, TOKEN } from "./Constants";

/**
 * AuthLayout component that checks for authentication token in local storage.
 * If the token is not present, it redirects the user to the login page.
 * It also listens for changes in local storage to handle token removal in other tabs.
 */
const AuthLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Function to check if token is in sessionStorage
    const checkToken = () => {
      const token = localStorage.getItem(TOKEN);
      if (!token) {
        navigate(LOGIN_PAGE, { replace: true });
      }
    };

    // Initial check
    checkToken();

    // Listen to storage events (in case token removed in another tab)
    const handleStorageChange = (event) => {
      if (event.key === TOKEN && !event.newValue) {
        navigate(LOGIN_PAGE, { replace: true });
      }
    };
    window.addEventListener("storage", handleStorageChange);

    // Cleanup event listener when component unmounts
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <>
      <Header className="header" />
      <Outlet />
    </>
  );
};

export default AuthLayout;

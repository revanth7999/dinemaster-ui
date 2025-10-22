import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Header from "./header/Header";
import { LOGIN_PAGE, TOKEN } from "./Constants";

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

    // Optionally, you can poll periodically (e.g., every few seconds) for token removal if needed
    // const intervalId = setInterval(checkToken, 3000);

    // Cleanup event listener when component unmounts
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      // clearInterval(intervalId);
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

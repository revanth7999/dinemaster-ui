import { Outlet } from "react-router-dom";
import Header from "./header/Header";

const AuthLayout = () => {
  // ... perhaps some authentication logic to protect routes?
  return (
    <>
      <Header className="header" />
      <Outlet />
    </>
  );
};

export default AuthLayout;

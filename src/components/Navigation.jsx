import { Component } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Landing from "./landing/Landing";
import LoginForm from "./login/Login";
import NewUser from "./newUser/NewUser";
import Admin from "./admin/Admin";
import {
  ADMIN_LANDING_PAGE,
  BASE_PAGE_PATH,
  CREATE_USER_PAGE,
  LANDING_PAGE,
  LOGIN_PAGE,
  OAUTH_PAGE,
  RES_PAGE,
} from "./Constants";
import OAuthSuccess from "./oauth-success";
import Restaurants from "./restaurants/Restaurants";
import AuthLayout from "./AuthLayout";

class Navigation extends Component {
  render() {
    return (
      <Routes>
        <Route path={BASE_PAGE_PATH} element={<Navigate to={LOGIN_PAGE} />} />
        <Route path={LOGIN_PAGE} element={<LoginForm />} />
        <Route path={CREATE_USER_PAGE} element={<NewUser />} />
        <Route element={<AuthLayout />}>
          <Route path={RES_PAGE} element={<Restaurants />} />
          <Route path={LANDING_PAGE} element={<Landing />} />
          <Route path={ADMIN_LANDING_PAGE} element={<Admin />} />
          <Route path={OAUTH_PAGE} element={<OAuthSuccess />} />
        </Route>
      </Routes>
    );
  }
}

export default Navigation;

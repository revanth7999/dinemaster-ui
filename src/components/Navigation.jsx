import { Component } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
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
} from "./Constants";
import OAuthSuccess from "./oauth-success";

class Navigation extends Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route path={BASE_PAGE_PATH} element={<Navigate to={LOGIN_PAGE} />} />
          <Route path={LOGIN_PAGE} element={<LoginForm />} />
          <Route path={CREATE_USER_PAGE} element={<NewUser />} />
          <Route path={LANDING_PAGE} element={<Landing />} />
          <Route path={ADMIN_LANDING_PAGE} element={<Admin />} />
          <Route path={OAUTH_PAGE} element={<OAuthSuccess />} />
        </Routes>
      </Router>
    );
  }
}

export default Navigation;

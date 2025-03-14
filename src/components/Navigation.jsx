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

class Navigation extends Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route
            path="/dinemaster-ui"
            element={<Navigate to="/dinemaster-ui/login" />}
          />
          <Route path="/dinemaster-ui/login" element={<LoginForm />} />
          <Route path="/dinemaster-ui/create-user" element={<NewUser />} />
          <Route path="/dinemaster-ui/landing" element={<Landing />} />
          <Route path="/dinemaster-ui/adminlanding" element={<Admin />} />
        </Routes>
      </Router>
    );
  }
}

export default Navigation;

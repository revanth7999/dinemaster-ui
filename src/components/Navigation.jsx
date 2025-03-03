import { Component } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './landing/Landing';
import LoginForm from './login/Login';
import NewUser from './newUser/NewUser';
import Admin from './admin/Admin';

class Navigation extends Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/create-user" element={<NewUser />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/adminlanding" element={<Admin />} />
        </Routes>
      </Router>
    );
  }
}

export default Navigation;

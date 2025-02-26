import { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './landing/Landing';
import LoginForm from './login/Login';
import NewUser from './newUser/NewUser';

class Navigation extends Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/create-user" element={<NewUser />} />
          <Route path="/landing" element={<Landing />} />
        </Routes>
      </Router>
    );
  }
}

export default Navigation;

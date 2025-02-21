import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Landing from './landing/Landing';
import LoginForm from './login/Login';
import NewUser from './newUser/NewUser';

class Navigation extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/login" component={LoginForm} />
          <Route path="/create-user" component={NewUser} />
          <Route path="/landing" component={Landing} />
        </Switch>
      </Router>
    );
  }
}

export default Navigation;

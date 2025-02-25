import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AUTH_LOGIN_URL, ROLES } from '../Constants';

const NewUser = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault(); // Prevents form submission default behavior
    console.log('Logging in with:', { email, password });
    axios
      .post(AUTH_LOGIN_URL, {
        username: email,
        password: password,
      })
      .then((response) => {
        switch (response.status) {
          case 200:
            if (response.data.data.role === ROLES.CUSTOMER) {
              history.push('/landing');
            } else if (response.data.data.role === ROLES.ADMIN) {
              history.push('/adminlanding');
            }
            break;
          case 400:
            console.log('Bad request');
            break;
          case 500:
            console.log('Server error');
            break;
          default:
            console.log('Unexpected response');
        }
      })
      .catch((error) => {
        console.error('There was an error logging the user!', error);
      });
  };

  return (
    <div className="main">
      <h2 style={{ fontFamily: 'monospace' }}>Log In</h2>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          type="email"
          className="form-control"
          id="email"
          placeholder="Please enter you email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="col-form-label">
          Password
        </label>
        <input
          type="password"
          id="password"
          className="form-control"
          placeholder="Please enter you password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <p>
        if you wan to create account{' '}
        <a href="/create-user" style={{ fontFamily: 'monospace' }}>
          Create User
        </a>
      </p>
      <button type="button" onClick={handleLogin} className="btn btn-primary">
        Log In
      </button>
    </div>
  );
};

export default NewUser;

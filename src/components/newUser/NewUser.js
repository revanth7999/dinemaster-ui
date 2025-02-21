import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { AUTH_REGISTER_URL } from '../Constants';
import '../newUser/newUser.css';

const NewUser = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigatee = useHistory();

  const createUser = (e) => {
    e.preventDefault(); // Prevents form submission default behavior
    axios
      .post(AUTH_REGISTER_URL, {
        username: email,
        password: password,
        role: 'CUSTOMER',
        active: 'Y',
      })
      .then((response) => {
        if (response.status === 200) {
          navigatee.push('/landing');
        } else {
          console.log(response);
        }
      })
      .catch((error) => {
        console.error('There was an error creating the user!', error);
      });
  };

  return (
    <div className="main">
      <h2 style={{ fontFamily: 'monospace' }}>Create New User</h2>
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
        if you already have an account{' '}
        <a href="/login" style={{ fontFamily: 'monospace' }}>
          Login here
        </a>
      </p>
      <button type="button" onClick={createUser} className="btn btn-success">
        Create User
      </button>
    </div>
  );
};

export default NewUser;

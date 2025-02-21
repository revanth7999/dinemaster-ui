import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { AUTH_LOGIN_URL, ROLES } from '../Constants';

const NewUser = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleLogin = (e) => {
    e.preventDefault(); // Prevents form submission default behavior
    console.log("Logging in with:", { email, password });
    axios.post(AUTH_LOGIN_URL, {
      "username": email,
      "password": password
    })
    .then(response => {
      switch (response.status) {
        case 200:
          if ( response.data.data.role === ROLES.CUSTOMER ) {            
            history.push("/landing");
          } else if ( response.data.data.role === ROLES.ADMIN ) {
            history.push("/adminlanding");
          }
          break;
        case 400:
          console.log("Bad request");
          break;
        case 500:
          console.log("Server error");
          break;
        default:
          console.log("Unexpected response");
      }
    })
    .catch(error => {
      console.error("There was an error logging the user!", error);
    });
  };

  return (
    <div>
      <h2>Create New User</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="email">Enter your Email: </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="button" onClick={handleLogin}>Log In</button> 
      </form>
    </div>
  );
};

export default NewUser;

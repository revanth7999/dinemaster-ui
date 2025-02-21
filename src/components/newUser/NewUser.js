import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { AUTH_REGISTER_URL } from '../Constants';

const NewUser = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigatee = useHistory();

  const createUser = (e) => {
    e.preventDefault(); // Prevents form submission default behavior
    axios.post(AUTH_REGISTER_URL, {
      "username": email,
      "password": password,
      "role": "CUSTOMER",
      "active": "Y"
    })
    .then(response => {
      if (response.status === 200) {
        navigatee.push("/landing");
      } else {
        console.log(response)
      }
    })
    .catch(error => {
      console.error("There was an error creating the user!", error);
    });
  };

  return (
    <div>
      <h2>Create New User</h2>
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
      <button type="button" onClick={createUser}>Create User</button> 
    </div>
  );
};

export default NewUser;

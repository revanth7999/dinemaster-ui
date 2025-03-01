import { useState } from 'react';
import axios from 'axios';
import { AUTH_REGISTER_URL } from '../Constants';
import '../newUser/newUser.css';
import { isEmpty } from '../utils/basicFunctions';
import { useNavigate } from 'react-router-dom';

const NewUser = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const validation = () =>{
    if(isEmpty(email) && isEmpty(password)) {
      alert("Please enter Email and Password");
      return false;
    } else if (isEmpty(email) || isEmpty(password)){
      alert("Please enter details");
      return false;
    }
    return true;
  }
  const createUser = (e) => {
    if (validation()) {
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
            navigate('/landing');
          } else {
            console.log(response);
          }
        })
        .catch((error) => {
          console.error('There was an error creating the user!', error);
        });
    }
   
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

import { useState } from 'react';
import axios from 'axios';
import { AUTH_REGISTER_URL } from '../Constants';
import '../newUser/newUser.css';
import { useNavigate } from 'react-router-dom';
import { formValidation } from '../utils/basicFunctions';

const NewUser = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const createUser = (e) => {
    var validate = formValidation(email, password);
    if (validate) {
      setIsLoading(true);
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
            setIsLoading(false);
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
        {isLoading ? (
          <>
            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            {' Loading...'}
          </>
        ) : (
          'Create User'
        )}
      </button>
    </div>
  );
};

export default NewUser;

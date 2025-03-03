import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AUTH_LOGIN_URL, LOGIN, ROLES } from '../Constants';
import { formValidation } from '../utils/basicFunctions';

const NewUser = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = LOGIN;
  })

  const handleLogin = (e) => {
    var validate = formValidation(email, password);
    if (validate) {
      setIsLoading(true);
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
              setIsLoading(false);
              navigate('/landing');
            } else if (response.data.data.role === ROLES.ADMIN) {
              setIsLoading(false);
              navigate('/adminlanding');
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
    }
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
      <button type="button" onClick={handleLogin} className="btn btn-success">
        {isLoading ? (
          <>
            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            {' Loading...'}
          </>
        ) : (
          'Log In'
        )}
      </button>
    </div>
  );
};

export default NewUser;

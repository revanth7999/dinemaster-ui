import { useEffect, useState } from 'react';
import axios from 'axios';
import { AUTH_REGISTER_URL, CREATE_USER, MB_AUTH_REGISTER_URL } from '../Constants';
import '../newUser/newUser.css';
import { Link, useNavigate } from 'react-router-dom';
import { formValidation } from '../utils/basicFunctions';

const NewUser = ({prop}) => {
  // console.log(prop)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [fromAdmin, setFromAdmin] = useState(false);

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
            navigate('dinemaster-ui/landing');
          } else {
            console.log(response);
          }
        })
        .catch((error) => {
          console.error('There was an error creating the user!', error);
        });
    }
   
  };

  useEffect(() => {
    document.title = CREATE_USER;
    if(prop && prop.msg){
      setFromAdmin(true);
    }
  },[prop])

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
      {
        fromAdmin && (
          <div>
            <select className="form-select">
              <option> </option>
              <option>Restaurant</option>
              <option>Delivery Partner</option>
            </select> 
          </div> 
        )
        
      }
      <p>
        if you already have an account{' '}
        <Link to="/dinemaster-ui/login">LogIn</Link>
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

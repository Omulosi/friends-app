import React, { useState, useContext } from "react";
import { useAuth } from '../utils/auth';
import { AuthContext } from '../context';


const Login = (props) => {
  const {authState, login } = useAuth();
  const [user, setUser] = useState({username: '', password: '', password2:''});
  const [errors, setErrors] = useState({name:'', password:''})
  
  const handleChange = event => {
    setUser({...user, [event.target.name]: event.target.value });
  };
  
  const handleSubmit = event => {
    event.preventDefault();
    let err = {};
    if (user.password !== user.password2) {
      err['password'] = 'Passwords do not match';
    }
    if (user.username.length < 3 ) {
      err['name'] = 'Invalid username';
    }
    if (Object.values(err).length > 0){
      setErrors(err);
      setUser({...user, password:'', password2:''});
    } else {
      login(user, props);
      setUser({...user, password:'', password2:''});
    }
  }

  return (
      <div className="form-data">
        <div className="login-header mb-4">
          Sign In
        </div>
        <div className="error mb-2">{authState.error && authState.error}</div>
        <form className='input-form' onSubmit={handleSubmit} method="post">      
          <div className="form-group">
            <label htmlFor="username">Email or Username</label>
            <input
              id="username"
              type='text'
              name='username'
              onChange={handleChange}
              value={user.username}
              required
              className="form-control"
            />
          </div>
          <div className="error mb-1">{errors.name && errors.name}</div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
                type='password'
                name='password'
                onChange={handleChange}
                value={user.password}
                required
                className="form-control"
              />
            </div>{
            (user.password?
          (<div className="form-group">
            <label htmlFor="password">Confirm Password</label>
            <input
                type='password'
                name='password2'
                onChange={handleChange}
                value={user.password2}
                required
                className="form-control"
              />
            </div>): null
            )
            }
          <div className="error mb-1">{errors.password && errors.password}</div>
          <button className="btn btn-primary">Login</button>
        </form>
      </div>
  );
};
  
export default Login;

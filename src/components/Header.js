import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../utils/auth';

const Header = () => {
  const { authState, logout } = useAuth();
  return (
      <header className="header mb-5">
        <nav className="navbar navbar-expand-lg navbar-light bg-light shadow">
          <Link to="/" className="navbar-brand">React-Auth</Link>
          <button className="navbar-toggler" type="button" 
            data-toggle="collapse" data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to="/" className="nav-link">Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/friends" className="nav-link">Friends</Link>
              </li>
              <li className="nav-item">
                <Link to="/add-friend" className="nav-link">Add Friend</Link>
              </li>
              { authState.isAuthenticated?
                (<li className="nav-item">
                  <span className="nav-link" onClick={logout}>Logout</span>
                </li>
                ):
                (<li className="nav-item">
                  <Link to="/login" className="nav-link">Login</Link>
                </li>
              )
              }
            </ul>
          </div>
        </nav>
      </header>
  )
}

export default Header;

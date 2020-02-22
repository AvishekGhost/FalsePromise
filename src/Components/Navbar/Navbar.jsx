import React from 'react';
import { Link, withRouter } from 'react-router-dom';
//need to hide the sign out button when the user is not logged in
const isActive = (history, path) => {
  if (history.location.pathname === path) return { color: "red" }
  else return { color: "#ffffff" }
}

export const signout = (next) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("jwt");
  }
  next();

  return fetch("http://localhost:5000/signout", {
    method: "GET",
  })
    .then(response => {
      console.log('signout: ', response)
      return response.json()
    })
    .catch(err => {
      console.log('err: ', err)
    })
}

const Navbar = ({ history }) => {
  return (
    <div>
      <ul className="nav nav-tabs bg-primary">
        <li className="nav-item">
          <Link className="nav-link" style={isActive(history, '/')} to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" style={isActive(history, '/signin')} to="/signin">Sign in</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" style={isActive(history, '/signup')} to="/signup">Sign up</Link>
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            style={isActive(history, '/signout'), { cursor: 'pointer', color: "#fff" }}
            onClick={() => signout(() => history.push('/'))}
            to="/signout"
          >
            Sign out
          </a>
        </li>

      </ul>
    </div>
  );
};

export default withRouter(Navbar);



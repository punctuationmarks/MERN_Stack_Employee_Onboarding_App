import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

const Navbar = ({ auth, logout }) => {
  const authLinks = (
    <ul>
      <li>
        <Link to="/profiles">
          <i class="fas fa-users"></i>{" "}
          <span className="hide-sm">
            Our Profiles
          </span>
        </Link>
      </li>
      <li>
        <Link to="/posts">
          <i class="fas fa-dumpster-fire"></i>{" "}
          <span className="hide-sm">Posts</span>
        </Link>
      </li>
      <li>
        <Link to="/proTips">
          <i class="fas fa-bullhorn" />{" "}
          <span className="hide-sm">Tips</span>
        </Link>
      </li>
      <li>
        <Link to="/recipes">
          <i class="fas fa-utensils" /> {" "}
          <span className="hide-sm">Recipes</span>
        </Link>
      </li>
      <li>
        <Link to="/coffees">
          <i class="fas fa-radiation" />{" "}
          <span className="hide-sm">Coffee</span>
        </Link>
      </li>
      <li>
        <Link to="/inventories">
          <i class="fas fa-dolly-flatbed" />{" "}
          <span className="hide-sm">Inventory</span>
        </Link>
      </li>
      <li>
        <a onClick={logout} href="#!">
          <i className="fas fa-sign-out-alt" />{" "}
          <span className="hide-sm">Logout</span>
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fas fa-coffee" /> CFCC
        </Link>
      </h1>
      {!auth.loading && (
        <Fragment>{auth.isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logout }
)(Navbar);

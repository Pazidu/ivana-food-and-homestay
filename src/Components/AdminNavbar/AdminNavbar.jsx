import React from "react";
import logo from "../../assets/logo.jpg";
import "./AdminNavbar.css"; // Assuming you have a CSS file for styling
import { Link } from "react-router-dom";

function Navbar(props) {
  return (
    <>
      <nav
        className="navbar navbar-expand-lg"
        style={{ backgroundColor: "black" }}
      >
        <div className="container-fluid">
          <Link to="/admin" className="navbar-brand">
            <img
              src={logo}
              alt="Logo"
              width="35"
              height="35"
              className="d-inline-block
            align-text-top"
            />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            style={{ backgroundColor: "yellow" }}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/admin/menu" className="nav-link" aria-current="page">
                  Menu
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/admin/users" className="nav-link">
                  Users
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/admin/reviews" className="nav-link">
                  Reviews
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/admin/complaints" className="nav-link">
                  Complaints
                </Link>
              </li>
              {/* Dropdown code commented out */}
            </ul>
            <Link to="/login">
              <button className="btn btn-outline-success" type="submit">
                {props.name}
              </button>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;

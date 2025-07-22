import React from "react";
import logo from "../../assets/logo.jpg";
import cart from "../../assets/cart.png";
import "./Navbar.css"; // Assuming you have a CSS file for styling
import { Link } from "react-router-dom";

function Navbar(props) {
  return (
    <>
      <nav
        className="navbar navbar-expand-lg"
        style={{ backgroundColor: "black" }}
      >
        <div className="container-fluid">
          <Link to="/foods/home" className="navbar-brand">
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
                <Link to="/foods/home" className="nav-link" aria-current="page">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/foods/menu" className="nav-link">
                  Menu
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/foods/gallery" className="nav-link">
                  Gallery
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/foods/about" className="nav-link">
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/foods/feedback" className="nav-link">
                  Feedback
                </Link>
              </li>
              {/* Dropdown code commented out */}
            </ul>
            <Link to="/cart" className="cart">
              <img src={cart} alt="" />
            </Link>
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

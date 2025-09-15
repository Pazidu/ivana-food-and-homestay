import React, { useEffect, useState } from "react";
import logo from "../../assets/logo.jpg";
import cartImg from "../../assets/cart.png";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const [user, setUser] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    if (token && username) {
      setUser({ username });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("user_type");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        {/* Brand Logo */}
        <Link to="/foods/home" className="navbar-brand">
          <img
            src={logo}
            alt="Logo"
            width="40"
            height="40"
            className="d-inline-block align-text-top"
          />
        </Link>

        {/* Mobile Toggler */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Links */}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/foods/home" className="nav-link">
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
          </ul>
        </div>

        {/* Right Corner Section */}
        <div className="navbar-right">
          {/* Cart */}
          <Link to="/cart" className="cart">
            <img src={cartImg} alt="cart" />
          </Link>

          {/* Login / User */}
          {!user ? (
            <Link to="/login">
              <button className="btn btn-outline-success" type="button">
                Login
              </button>
            </Link>
          ) : (
            <div className="user-dropdown">
              <button
                className="btn btn-outline-success"
                type="button"
                onClick={() => setShowMenu((prev) => !prev)}
              >
                {user.username}
              </button>
              {showMenu && (
                <div className="dropdown-menu-custom">
                  <button onClick={() => navigate("/user/profile")}>
                    Profile
                  </button>
                  <button onClick={handleLogout}>Logout</button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

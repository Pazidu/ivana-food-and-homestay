import React, { useEffect, useState } from "react";
import logo from "../../assets/logo.jpg";
import cartImg from "../../assets/cart.png";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Navbar() {
  const [user, setUser] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();

  const updateCartCount = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await axios.get("http://localhost:5000/api/cart", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCartCount(response.data.length);
      } catch (err) {
        console.error("Error fetching cart count:", err);
      }
    } else {
      const guestCart = JSON.parse(localStorage.getItem("guestCart")) || [];
      setCartCount(guestCart.length);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    if (token && username) {
      setUser({ username });
    }
    updateCartCount();

    window.addEventListener("storage", updateCartCount);

    return () => {
      window.removeEventListener("storage", updateCartCount);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("user_type");
    setUser(null);
    setCartCount(0);
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          <img src={logo} alt="Logo" width="40" height="40" />
        </Link>

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

        <div className="navbar-right">
          {/* Cart */}
          <Link to="/cart" className="cart" style={{ position: "relative" }}>
            <img src={cartImg} alt="cart" />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>

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

import React, { useState } from "react";
import Navbar from "../../../Components/Navbar/Navbar";
import Footer from "../../../Components/Footer/Footer";
import googleSignIn from "../../../assets/signGoogle.png"; // Adjust the path as necessary
import "./Login.css"; // Assuming you have a CSS file for styling
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChanges = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/auth/login",
        values
      );
      if (response.status === 201) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("username", response.data.username); // Store username in localStorage
        localStorage.setItem("user_type", response.data.user_type); // Store user_type in localStorage
        alert(`Hello ${response.data.username}`); // Show success alert
        navigate("/foods/home"); // Navigate to foods home page
      }
    } catch (error) {
      console.error("Error during login:", error);
      // Handle error appropriately, e.g., show a message to the user
    }
  };

  return (
    <div className="login">
      <Navbar name="Signup" />
      <div className="login-bg bg-image">
        {/* <img src={loginbg} alt="Login Background" className="w-100 h-100 z-0" /> */}
        {/* <h1 className="login-title">Login</h1> */}
        <div className="login-form-container">
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <label htmlFor="email" className="form-label">
                Email :
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter email"
                name="email"
                onChange={handleChanges}
              />
            </div>
            <div className="form-group mb-4">
              <label htmlFor="password" className="form-label">
                Password :
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Password"
                name="password"
                onChange={handleChanges}
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Login
            </button>
          </form>
          <span className="text-center d-block mt-3">
            <a href="/forgot-password" className="text-decoration-none ">
              Forgot Password?
            </a>
          </span>
          <a href="/reset-password" className="text-decoration-none ms-3">
            <div className="google-signin d-flex justify-content-center align-items-center">
              <img src={googleSignIn} />
            </div>
          </a>
          <hr />
          <div className="text-center mt-3">
            <p>Don't have an account?</p>
            <Link to="/signup" className="text-decoration-none">
              <button type="submit" className="btn btn-primary w-100">
                Signup
              </button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Login;

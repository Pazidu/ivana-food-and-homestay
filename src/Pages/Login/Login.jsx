import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import googleSignIn from "../../assets/signGoogle.png"; // Assuming you have a Google sign-in image
// import loginbg from "../../assets/loginbg.jpg"; // Assuming you have a background image
import "./Login.css"; // Assuming you have a CSS file for styling
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="login">
      <Navbar />
      <div className="login-bg bg-image">
        {/* <img src={loginbg} alt="Login Background" className="w-100 h-100 z-0" /> */}
        {/* <h1 className="login-title">Login</h1> */}
        <div className="login-form-container">
          <form>
            <div className="form-group mb-3">
              <label htmlFor="email" className="form-label">
                Email :
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter email"
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

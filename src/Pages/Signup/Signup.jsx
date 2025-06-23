import React from "react";
import Navbar from "../../Components/Navbar/Navbar.jsx";
import Footer from "../../Components/Footer/Footer.jsx";
import "./Signup.css"; // Assuming you have a CSS file for styling
import { Link } from "react-router-dom";

function Signup() {
  return (
    <>
      <Navbar />
      <div className="signupContainer">
        <div className="topic">
          <h1>Sign Up</h1>
        </div>
        <div className="signup-bg">
          <div className="signup-form-container">
            <form>
              <table>
                <tr>
                  <td>Name</td>
                  <td className="input-field">
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      placeholder="Enter your name"
                    />
                  </td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td className="input-field">
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Enter your email"
                    />
                  </td>
                </tr>
                <tr>
                  <td>Address</td>
                  <td className="input-field">
                    <input
                      type="text"
                      className="form-control"
                      id="address"
                      placeholder="Enter your address"
                    />
                  </td>
                </tr>
                <tr>
                  <td>Nearest City</td>
                  <td className="input-field">
                    <input
                      type="text"
                      className="form-control"
                      id="city"
                      placeholder="Enter your city"
                    />
                  </td>
                </tr>
                <tr>
                  <td>Phone</td>
                  <td className="input-field">
                    <input
                      type="text"
                      className="form-control"
                      id="phone"
                      placeholder="Enter your phone"
                    />
                  </td>
                </tr>
                <tr>
                  <td>Password</td>
                  <td className="input-field">
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Enter your password"
                    />
                  </td>
                </tr>
                <tr>
                  <td>Confirm Password</td>
                  <td className="input-field">
                    <input
                      type="password"
                      className="form-control"
                      id="confirmPassword"
                      placeholder="Re-enter your password"
                    />
                  </td>
                </tr>
              </table>
              <Link to="/login" className="text-secondary">
                {/* Already have an account? Login */}
                <button type="submit" className="btn btn-primary w-100">
                  Login
                </button>
              </Link>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Signup;

import React from "react";
import Navbar from "../../Components/Navbar/Navbar.jsx";
import Footer from "../../Components/Footer/Footer.jsx";
import "./Signup.css"; // Assuming you have a CSS file for styling
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Signup() {
  const [values, setValues] = useState({
    username: "",
    email: "",
    address: "",
    city: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleChanges = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/auth/signup",
        values
      );
      if (response.status === 201) {
        navigate("/login");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      // Handle error appropriately, e.g., show a message to the user
    }
  };

  return (
    <>
      <Navbar />
      <div className="signupContainer">
        <div className="topic">
          <h1>Sign Up</h1>
        </div>

        <div className="signup-bg">
          <div className="signup-form-container">
            <form onSubmit={handleSubmit}>
              <table>
                <tbody>
                  <tr>
                    <td>Name</td>
                    <td className="input-field">
                      <input
                        type="text"
                        className="form-control"
                        id="username"
                        placeholder="Enter your username"
                        name="username"
                        onChange={handleChanges}
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
                        name="email"
                        onChange={handleChanges}
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
                        name="address"
                        onChange={handleChanges}
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
                        name="city"
                        onChange={handleChanges}
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
                        name="phone"
                        onChange={handleChanges}
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
                        name="password"
                        onChange={handleChanges}
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
                        name="confirmPassword"
                        onChange={handleChanges}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
              {/* <Link to="/login" className="text-secondary"> */}
              {/* Already have an account? Login */}
              <button type="submit" className="btn btn-primary w-100">
                Login
              </button>
              {/* </Link> */}
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Signup;

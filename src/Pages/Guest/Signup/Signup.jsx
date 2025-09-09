import React, { useState } from "react";
import Navbar from "../../../Components/Navbar/Navbar.jsx";
import Footer from "../../../Components/Footer/Footer.jsx";
import "./Signup.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [resending, setResending] = useState(false);
  const navigate = useNavigate();

  const handleChanges = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  // Step 1: Request OTP without creating user
  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      // Validate password match before sending OTP
      if (values.password !== values.confirmPassword) {
        return alert("Passwords do not match");
      }

      await axios.post("http://localhost:5000/auth/send-otp", {
        email: values.email,
        purpose: "verifyEmail",
      });

      setOtpSent(true);
      alert("OTP sent to your email.");
    } catch (err) {
      console.error("Error sending OTP:", err);
      alert(err.response?.data?.message || "Failed to send OTP");
    }
  };

  // Step 2: Verify OTP & create user
  const handleOtpVerify = async () => {
    try {
      const res = await axios.post("http://localhost:5000/auth/verify-otp", {
        email: values.email,
        otp,
        purpose: "verifyEmail",
      });

      if (res.data.success) {
        // OTP verified ✅ → now create user
        const {
          username,
          email,
          address,
          city,
          phone,
          password,
          confirmPassword,
        } = values;
        await axios.post("http://localhost:5000/auth/signup", {
          username,
          email,
          address,
          city,
          phone,
          password,
          confirmPassword,
        });

        alert("Signup successful! You can now login.");
        navigate("/login");
      } else {
        alert(res.data.message || "OTP verification failed");
      }
    } catch (err) {
      console.error("Error verifying OTP:", err);
      alert("Error verifying OTP");
    }
  };

  return (
    <>
      <Navbar name="Login" />
      <div className="signupContainer">
        <div className="topic">
          <h1>Sign Up</h1>
        </div>
        <div className="signup-bg">
          <div className="signup-form-container">
            {!otpSent ? (
              <form onSubmit={handleSendOtp}>
                <table>
                  <tbody>
                    <tr>
                      <td>Name</td>
                      <td className="input-field">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter your username"
                          name="username"
                          onChange={handleChanges}
                          required
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Email</td>
                      <td className="input-field">
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Enter your email"
                          name="email"
                          onChange={handleChanges}
                          required
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Address</td>
                      <td className="input-field">
                        <input
                          type="text"
                          className="form-control"
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
                          placeholder="Enter your password"
                          name="password"
                          onChange={handleChanges}
                          required
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Confirm Password</td>
                      <td className="input-field">
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Re-enter your password"
                          name="confirmPassword"
                          onChange={handleChanges}
                          required
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
                <button type="submit" className="btn btn-primary w-100">
                  Send OTP
                </button>
              </form>
            ) : (
              <div className="otp-container">
                <h2>Email Verification</h2>
                <p>We sent a 6-digit OTP to your email. Enter it below:</p>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
                <button
                  onClick={handleOtpVerify}
                  className="btn btn-success w-100 mt-3"
                >
                  Verify OTP & Signup
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Signup;

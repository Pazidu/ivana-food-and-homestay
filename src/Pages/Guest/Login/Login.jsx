import React, { useState } from "react";
import Navbar from "../../../Components/Navbar/Navbar";
import Footer from "../../../Components/Footer/Footer";
import googleSignIn from "../../../assets/signGoogle.png";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [step, setStep] = useState("email"); // email -> otp -> newPassword
  const [forgotEmail, setForgotEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

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
        localStorage.setItem("username", response.data.username);
        localStorage.setItem("role", response.data.user_type);
        localStorage.setItem("userId", response.data.id);
        alert(`Hello ${response.data.username}`);
        if (response.data.user_type === "admin") {
          navigate("/admin/orders");
        } else {
          navigate("/foods/home");
        }
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  // ===== Forgot Password Handlers =====
  const handleSendOtp = async () => {
    try {
      await axios.post("http://localhost:5000/auth/send-otp", {
        email: forgotEmail,
      });
      setStep("otp");
    } catch (err) {
      console.error(err);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const res = await axios.post("http://localhost:5000/auth/verify-otp", {
        email: forgotEmail,
        otp,
      });
      if (res.data.success) {
        setStep("newPassword");
      } else {
        alert("Invalid OTP");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleResetPassword = async () => {
    try {
      await axios.post("http://localhost:5000/auth/reset-password", {
        email: forgotEmail,
        newPassword,
      });
      alert("Password updated successfully!");
      setShowModal(false);
      setStep("email");
      setForgotEmail("");
      setOtp("");
      setNewPassword("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="login">
      <Navbar name="Signup" />
      <div className="login-bg bg-image">
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

          {/* Forgot Password Popup Trigger */}
          <span
            className="text-center d-block mt-3 text-decoration-none"
            style={{ cursor: "pointer", color: "blue" }}
            onClick={() => setShowModal(true)}
          >
            Forgot Password?
          </span>

          <a href="/reset-password" className="text-decoration-none ms-3">
            <div className="google-signin d-flex justify-content-center align-items-center">
              <img src={googleSignIn} alt="google-signin" />
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

      {/* Forgot Password Modal */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Forgot Password</h3>

            {step === "email" && (
              <>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="form-control mb-3"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                />
                <button
                  className="btn btn-primary w-100"
                  onClick={handleSendOtp}
                >
                  Send OTP
                </button>
              </>
            )}

            {step === "otp" && (
              <>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  className="form-control mb-3"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
                <button
                  className="btn btn-primary w-100"
                  onClick={handleVerifyOtp}
                >
                  Verify OTP
                </button>
              </>
            )}

            {step === "newPassword" && (
              <>
                <input
                  type="password"
                  placeholder="Enter New Password"
                  className="form-control mb-3"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <button
                  className="btn btn-primary w-100"
                  onClick={handleResetPassword}
                >
                  Reset Password
                </button>
              </>
            )}

            <button
              className="btn btn-secondary w-100 mt-3"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default Login;

import React, { useState, useEffect } from "react";
import "./Profile.css";
import axios from "axios";
import Navbar from "../../../Components/Navbar/Navbar";
import RoomsNavbar from "../../../Components/RoomsNavbar/RoomsNavbar"; // import RoomsNavbar
import { useLocation } from "react-router-dom";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({});
  const location = useLocation();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await axios.get("http://localhost:5000/auth/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(res.data.user);
        setForm(res.data.user);
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };
    fetchProfile();
  }, []);

  const handleEdit = () => {
    setEditing(true);
    setForm(user);
  };

  const handleCancel = () => {
    setEditing(false);
    setForm(user);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put("http://localhost:5000/auth/user/profile", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(form);
      setEditing(false);
    } catch (err) {
      console.error("Error saving profile:", err);
    }
  };

  if (!user) {
    return <p>Loading profile...</p>;
  }

  // Decide which navbar to render
  const isRoomsSection = location.pathname.startsWith("/rooms");

  return (
    <>
      {isRoomsSection ? <RoomsNavbar /> : <Navbar name={user.username} />}

      <div className="profile-container">
        <h2 className="profile-title">User Profile</h2>
        {!editing ? (
          <div className="profile-info">
            <p>
              <strong>Name:</strong> {user.username}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Address:</strong> {user.address}
            </p>
            <p>
              <strong>City:</strong> {user.city}
            </p>
            <p>
              <strong>Phone:</strong> {user.phone}
            </p>
            <button className="profile-edit-btn" onClick={handleEdit}>
              Edit Info
            </button>
          </div>
        ) : (
          <form className="profile-form" onSubmit={handleSave}>
            <div className="profile-form-group">
              <label className="profile-label">Name:</label>
              <input
                className="profile-input"
                name="username"
                value={form.username}
                onChange={handleChange}
              />
            </div>
            <div className="profile-form-group">
              <label className="profile-label">Email:</label>
              <input
                className="profile-input"
                name="email"
                value={form.email}
                onChange={handleChange}
              />
            </div>
            <div className="profile-form-group">
              <label className="profile-label">Address:</label>
              <input
                className="profile-input"
                name="address"
                value={form.address}
                onChange={handleChange}
              />
            </div>
            <div className="profile-form-group">
              <label className="profile-label">City:</label>
              <input
                className="profile-input"
                name="city"
                value={form.city}
                onChange={handleChange}
              />
            </div>
            <div className="profile-form-group">
              <label className="profile-label">Phone:</label>
              <input
                className="profile-input"
                name="phone"
                value={form.phone}
                onChange={handleChange}
              />
            </div>
            <button className="profile-save-btn" type="submit">
              Save
            </button>
            <button
              className="profile-cancel-btn"
              type="button"
              onClick={handleCancel}
              style={{ marginLeft: 8 }}
            >
              Cancel
            </button>
          </form>
        )}
      </div>
    </>
  );
}

import React, { useState } from "react";
import "./Profile.css"; // Assuming you have a CSS file for styling

const initialUser = {
  name: "Ivana",
  email: "ivana@example.com",
  phone: "123-456-7890",
};

export default function Profile() {
  const [user, setUser] = useState(initialUser);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(initialUser);

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

  const handleSave = (e) => {
    e.preventDefault();
    setUser(form);
    setEditing(false);
  };

  return (
    <div className="profile-container">
      <h2 className="profile-title">User Profile</h2>
      {!editing ? (
        <div className="profile-info">
          <p>
            <strong>Name:</strong> {user.name}
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
          <p>
            <strong>Password:</strong> {user.password}
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
              name="name"
              value={form.name}
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
              name="phone"
              value={form.phone}
              onChange={handleChange}
            />
          </div>
          <div className="profile-form-group">
            <label className="profile-label">city:</label>
            <input
              className="profile-input"
              name="phone"
              value={form.phone}
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
          <div className="profile-form-group">
            <label className="profile-label">Password:</label>
            <input
              className="profile-input"
              name="password"
              type="password"
              value={form.password}
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
  );
}

import React, { useEffect, useState } from "react";
import AdminNavbar from "../../../Components/AdminNavbar/AdminNavbar";
import Footer from "../../../Components/Footer/Footer";
import axios from "axios";
import "./Users.css";

function UsersList() {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [formData, setFormData] = useState({
    id: null,
    role: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`);
      setUsers(users.filter((user) => user.id !== id));
      setShowModal(false);
      setConfirmDeleteId(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (user) => {
    setFormData({
      id: user.id,
      role: user.user_type,
    });
    setShowModal("edit");
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({ id: null, role: "" });
    setConfirmDeleteId(null);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { user_type: formData.role };

      const res = await axios.put(
        `http://localhost:5000/api/users/${formData.id}`,
        payload,
      );

      setUsers(
        users.map((user) => (user.id === formData.id ? res.data : user)),
      );

      handleCloseModal();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="users">
      <h2 className="users__title">Users</h2>

      {/* ===== Change Role Modal ===== */}
      {showModal === "edit" && (
        <div className="modal-overlay">
          <div className="modal">
            <h3 className="modal__title">Change User Role</h3>
            <form className="modal__form" onSubmit={handleFormSubmit}>
              <select
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Role</option>
                <option value="admin">admin</option>
                <option value="user">user</option>
              </select>
              <div className="modal__actions">
                <button type="submit" className="btn btn--submit">
                  Save
                </button>
                <button
                  type="button"
                  className="btn btn--cancel"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===== Delete Warning Modal ===== */}
      {showModal === "delete" && (
        <div className="modal-overlay">
          <div className="modal">
            <p>Are you sure you want to delete this user?</p>
            <div className="modal-buttons">
              <button
                className="btn--confirm"
                onClick={() => handleDelete(confirmDeleteId)}
              >
                Yes
              </button>
              <button className="btn--cancel" onClick={handleCloseModal}>
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Users Table */}
      <table className="users__table">
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>City</th>
            <th>Phone</th>
            <th>User Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.address}</td>
              <td>{user.city}</td>
              <td>{user.phone}</td>
              <td>{user.user_type}</td>
              <td className="users__actions">
                <button
                  className="btn btn--edit"
                  onClick={() => handleEdit(user)}
                >
                  Change Role
                </button>
                <button
                  className="btn btn--delete"
                  onClick={() => {
                    setConfirmDeleteId(user.id);
                    setShowModal("delete");
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Users() {
  return (
    <>
      <AdminNavbar name="Admin" />
      <UsersList />
      <Footer />
    </>
  );
}

export default Users;

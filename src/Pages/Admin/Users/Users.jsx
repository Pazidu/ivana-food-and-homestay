import React, { useEffect, useState } from "react";
import AdminNavbar from "../../../Components/AdminNavbar/AdminNavbar";
import Footer from "../../../Components/Footer/Footer";
import axios from "axios";
import "./Users.css"; // Make sure you renamed CSS from menu to users

function UsersList() {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    email: "",
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
    } catch (err) {
      console.error(err);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({
      id: null,
      name: "",
      email: "",
      role: "",
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.id) {
        // Edit user
        const res = await axios.put(
          `http://localhost:5000/api/users/${formData.id}`,
          formData
        );
        setUsers(
          users.map((user) => (user.id === formData.id ? res.data : user))
        );
      } else {
        // Add new user
        const res = await axios.post(
          "http://localhost:5000/api/users",
          formData
        );
        setUsers([...users, res.data]);
      }
      handleCloseModal();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="users">
      <h2 className="users__title">Users</h2>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="modal">
          <div className="modal__content">
            <h3 className="modal__title">
              {formData.id ? "Edit User" : "Add User"}
            </h3>
            <form className="modal__form" onSubmit={handleFormSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="role"
                placeholder="Role"
                value={formData.role}
                onChange={handleInputChange}
                required
              />
              <div className="modal__actions">
                <button type="submit" className="btn btn--submit">
                  Submit
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
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.address}</td>
              <td>{user.city}</td>
              <td>{user.phone}</td>
              <td className="users__actions">
                {/* <button
                  className="btn btn--edit"
                  onClick={() => {
                    setFormData(user);
                    setShowModal(true);
                  }}
                >
                  Edit
                </button> */}
                <button
                  className="btn btn--delete"
                  onClick={() => handleDelete(user.id)}
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

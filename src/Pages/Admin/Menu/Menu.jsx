import React, { useEffect, useState } from "react";
import AdminNavbar from "../../../Components/AdminNavbar/AdminNavbar";
import axios from "axios";
import "./Menu.css"; // Import CSS
import Footer from "../../../Components/Footer/Footer";

function MenuList() {
  const [menuItems, setMenuItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    type: "",
    regular_price: "",
    large_price: "",
    image_link: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/menu")
      .then((res) => setMenuItems(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/menu/${id}`);
      setMenuItems(menuItems.filter((item) => item.id !== id));
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
      type: "",
      regular_price: "",
      large_price: "",
      image_link: "",
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.id) {
        // Edit item
        const res = await axios.put(
          `http://localhost:5000/api/menu/${formData.id}`,
          formData
        );
        setMenuItems(
          menuItems.map((item) => (item.id === formData.id ? res.data : item))
        );
      } else {
        // Add new item
        const res = await axios.post(
          "http://localhost:5000/api/menu",
          formData
        );
        setMenuItems([...menuItems, res.data]);
      }
      handleCloseModal();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="menu">
      <h2 className="menu__title">Menu Items</h2>

      <button className="btn btn--add" onClick={() => setShowModal(true)}>
        + Add New Item
      </button>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="modal">
          <div className="modal__content">
            <h3 className="modal__title">
              {formData.id ? "Edit Menu Item" : "Add Menu Item"}
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
                type="text"
                name="type"
                placeholder="Type"
                value={formData.type}
                onChange={handleInputChange}
                required
              />
              <input
                type="number"
                name="regular_price"
                placeholder="Regular Price"
                value={formData.regular_price}
                onChange={handleInputChange}
                required
              />
              <input
                type="number"
                name="large_price"
                placeholder="Large Price"
                value={formData.large_price}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="image_link"
                placeholder="Image Link"
                value={formData.image_link}
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

      {/* Menu Table */}
      <table className="menu__table">
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Type</th>
            <th>Regular Price (Rs)</th>
            <th>Large Price (Rs)</th>
            <th>Image Link</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {menuItems.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.type}</td>
              <td>{item.regular_price}</td>
              <td>{item.large_price}</td>
              <td className="menu__image-link">{item.image_link}</td>
              <td className="menu__actions">
                <button
                  className="btn btn--edit"
                  onClick={() => {
                    setFormData(item);
                    setShowModal(true);
                  }}
                >
                  Edit
                </button>
                <button
                  className="btn btn--delete"
                  onClick={() => handleDelete(item.id)}
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

function Menu() {
  return (
    <>
      <AdminNavbar name="Admin" />
      <MenuList />
      <Footer />
    </>
  );
}

export default Menu;

import React, { useEffect, useState } from "react";
import AdminNavbar from "../../../Components/AdminNavbar/AdminNavbar";
import axios from "axios";
import "./Menu.css";
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
    image: null,
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // Fetch menu items
  const fetchMenu = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/menu");
      setMenuItems(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  const confirmDelete = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/menu/${deleteId}`);
      setMenuItems(menuItems.filter((item) => item.id !== deleteId));
    } catch (err) {
      console.error(err);
    } finally {
      setShowDeleteModal(false);
      setDeleteId(null);
    }
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
      image: null,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = formData.image_link;

      // Upload new image to Firebase
      if (formData.image) {
        const form = new FormData();
        form.append("image", formData.image);

        const uploadRes = await axios.post(
          "http://localhost:5000/api/menu/upload-image",
          form,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        imageUrl = uploadRes.data.url;
      }

      const payload = {
        name: formData.name,
        type: formData.type,
        regular_price: formData.regular_price,
        large_price: formData.large_price,
        image_link: imageUrl,
      };

      if (formData.id) {
        // Edit menu item
        const res = await axios.put(
          `http://localhost:5000/api/menu/${formData.id}`,
          payload
        );
        setMenuItems(
          menuItems.map((item) => (item.id === formData.id ? res.data : item))
        );
      } else {
        // Add new menu item
        const res = await axios.post("http://localhost:5000/api/menu", payload);
        setMenuItems([...menuItems, res.data]);
      }

      handleCloseModal();
    } catch (err) {
      console.error(err);
    }
  };

  const handleHide = async (id, hide) => {
    try {
      const res = await axios.put(`http://localhost:5000/api/menu/hide/${id}`, {
        hide,
      });
      setMenuItems(menuItems.map((item) => (item.id === id ? res.data : item)));
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
        <div className="modal-overlay">
          <div className="modal">
            <h3>{formData.id ? "Edit Menu Item" : "Add Menu Item"}</h3>
            <form className="modal__form" onSubmit={handleFormSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
              <input
                type="text"
                name="type"
                placeholder="Type"
                value={formData.type}
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value })
                }
                required
              />
              <input
                type="number"
                name="regular_price"
                placeholder="Regular Price"
                value={formData.regular_price}
                onChange={(e) =>
                  setFormData({ ...formData, regular_price: e.target.value })
                }
                required
              />
              <input
                type="number"
                name="large_price"
                placeholder="Large Price"
                value={formData.large_price}
                onChange={(e) =>
                  setFormData({ ...formData, large_price: e.target.value })
                }
                required
              />
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.files[0] })
                }
                required={!formData.id}
              />
              {formData.image && (
                <img
                  src={URL.createObjectURL(formData.image)}
                  alt="Preview"
                  className="modal__preview"
                />
              )}
              <div className="modal-buttons">
                <button type="submit" className="btn--confirm">
                  Submit
                </button>
                <button
                  type="button"
                  className="btn--cancel"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal">
            <p>Are you sure you want to delete this menu item?</p>
            <div className="modal-buttons">
              <button className="btn--confirm" onClick={handleDelete}>
                Yes
              </button>
              <button
                className="btn--cancel"
                onClick={() => setShowDeleteModal(false)}
              >
                No
              </button>
            </div>
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
                  onClick={() => confirmDelete(item.id)}
                >
                  Delete
                </button>
                <button
                  className={`btn ${
                    item.is_hidden ? "btn--show" : "btn--hide"
                  }`}
                  onClick={() => handleHide(item.id, !item.is_hidden)}
                >
                  {item.is_hidden ? "Show" : "Hide"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function Menu() {
  return (
    <>
      <AdminNavbar name="Admin" />
      <MenuList />
      <Footer />
    </>
  );
}

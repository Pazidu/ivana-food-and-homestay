import React, { useEffect, useState } from "react";
import Navbar from "../../../Components/Navbar/Navbar";
import Footer from "../../../Components/Footer/Footer";
import "./FoodsMenu.css";
import FoodCard from "../../../Components/FoodCard/FoodCard";
import { useLocation } from "react-router-dom";

function FoodsMenu() {
  const location = useLocation();
  const { topic, subTopic } = location.state || {};
  const [activeTopic, setActiveTopic] = useState("Rice");
  const subTopics = {
    Rice: [
      "Fried Rice",
      "Fried Rice Set Menu",
      "Special Rice",
      "Nasigoreng",
      "Mongolian Rice",
    ],
    Noodles: [
      "Fried Noodles",
      "Noodles Set Menu",
      "Special Noodles",
      "Me Goreng",
    ],
    Kottu: ["Nasi Kottu", "Kottu", "Cheese Kottu"],
    Spaghetti: ["Ivana Spaghetti", "Ivana Pasta"],
    Dishes: ["Fried Dishes", "Devilled Dishes", "Chopsuey", "Egg"],
    Other: ["Lasi", "Soup", "Snacks"],
  };

  const [activeSubTopic, setActiveSubTopic] = useState(
    subTopics[activeTopic][0]
  );
  const [foods, setFoods] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null);
  const [regularQty, setRegularQty] = useState(0);
  const [largeQty, setLargeQty] = useState(0);

  useEffect(() => {
    setActiveSubTopic(subTopics[activeTopic][0]);
  }, [activeTopic]);

  useEffect(() => {
    fetch(
      `http://localhost:5000/api/foods/menu?type=${encodeURIComponent(
        activeSubTopic
      )}`
    )
      .then((res) => res.json())
      .then((data) => setFoods(data))
      .catch((err) => console.error(err));
  }, [activeSubTopic]);

  useEffect(() => {
    setActiveSubTopic(subTopic || subTopics[activeTopic][0]);
  }, [activeTopic, subTopic]);

  const handleAddToCart = async () => {
    if (!selectedFood) return;
    if (regularQty === 0 && largeQty === 0) {
      alert("Please select at least one quantity.");
      return;
    }

    const token = localStorage.getItem("token"); // JWT from login
    if (!token) {
      alert("Please login first!");
      return;
    }

    const itemsToAdd = [];
    if (regularQty > 0)
      itemsToAdd.push({
        item_id: selectedFood.id,
        description: "Regular",
        quantity: regularQty,
      });
    if (largeQty > 0)
      itemsToAdd.push({
        item_id: selectedFood.id,
        description: "Large",
        quantity: largeQty,
      });

    try {
      const res = await fetch("http://localhost:5000/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // send JWT
        },
        body: JSON.stringify(itemsToAdd),
      });

      if (res.ok) {
        alert("Items added to cart!");
        setRegularQty(0);
        setLargeQty(0);
        setSelectedFood(null);
      } else if (res.status === 403) {
        alert("Session expired or invalid token. Please login again.");
      } else {
        const errData = await res.json();
        alert(errData.error || "Failed to add to cart");
      }
    } catch (err) {
      console.error(err);
      alert("Error adding to cart");
    }
  };

  return (
    <div className="foodsMenu">
      <Navbar name="Login" />

      {/* Main categories */}
      <div className="foodsNav">
        {Object.keys(subTopics).map((item) => (
          <button
            key={item}
            className={`foodsButton${activeTopic === item ? " active" : ""}`}
            onClick={() => setActiveTopic(item)}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Sub categories */}
      <div className="foodsSubNav">
        {subTopics[activeTopic].map((subItem) => (
          <button
            key={subItem}
            className={`foodsSubButton${
              activeSubTopic === subItem ? " active" : ""
            }`}
            onClick={() => setActiveSubTopic(subItem)}
          >
            {subItem}
          </button>
        ))}
      </div>

      {/* Food list */}
      <div className="foodsContainer">
        {foods.map((food) => (
          <div
            key={food.id}
            onClick={() => setSelectedFood(food)}
            style={{ cursor: "pointer" }}
          >
            <FoodCard name={food.name} foodImage={food.image_link} />
          </div>
        ))}
      </div>

      {/* Food popup */}
      {selectedFood && (
        <div
          className="food-popup-overlay"
          onClick={() => setSelectedFood(null)}
        >
          <div className="food-popup" onClick={(e) => e.stopPropagation()}>
            <button
              className="food-popup-close"
              onClick={() => setSelectedFood(null)}
            >
              &times;
            </button>
            <h2>{selectedFood.name}</h2>
            <div className="popup-container">
              <div className="selected-food-image-container">
                {selectedFood.image_link && (
                  <img
                    className="selected-food-image"
                    src={selectedFood.image_link}
                    alt={selectedFood.name}
                  />
                )}
              </div>
              <div className="selected-food-details">
                <table className="price-table">
                  <thead>
                    <tr>
                      <th>Regular</th>
                      <th>Large</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{selectedFood.regular_price}/=</td>
                      <td>{selectedFood.large_price}/=</td>
                    </tr>
                    <tr>
                      <td>
                        <input
                          type="number"
                          min={0}
                          value={regularQty}
                          onChange={(e) =>
                            setRegularQty(Number(e.target.value))
                          }
                          style={{ width: "60px" }}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          min={0}
                          value={largeQty}
                          onChange={(e) => setLargeQty(Number(e.target.value))}
                          style={{ width: "60px" }}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
                <button className="add-to-cart-btn" onClick={handleAddToCart}>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default FoodsMenu;

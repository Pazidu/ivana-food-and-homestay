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
  
  // State to manage the dropdown visibility
  const [showSubTopics, setShowSubTopics] = useState(false); 

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

  // Function to handle main topic click (toggles dropdown visibility)
  const handleTopicClick = (item) => {
    // If clicking the current active topic, just toggle the dropdown
    if (activeTopic === item) {
      setShowSubTopics(!showSubTopics);
    } else {
      // If clicking a new topic, make it active and open the dropdown
      setActiveTopic(item);
      setActiveSubTopic(subTopics[item][0]); 
      setShowSubTopics(true); 
    }
  };

  // Function to handle sub-topic click
  const handleSubTopicClick = (subItem) => {
    setActiveSubTopic(subItem);
    //setShowSubTopics(false);
  };
  
  // Data Fetching logic remains the same
  useEffect(() => {
    fetch(
      `http://localhost:5000/api/foods/menu?type=${encodeURIComponent(
        activeSubTopic
      )}`
    )
      .then((res) => res.json())
      .then((data) => {
        const visibleFoods = data.filter((food) => !food.is_hidden);
        setFoods(visibleFoods);
      })
      .catch((err) => console.error(err));
  }, [activeSubTopic]);

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

  // Add to cart logic remains the same (omitted for brevity)
  const handleAddToCart = async () => {
    if (!selectedFood) return;
    if (regularQty === 0 && largeQty === 0) {
      alert("Please select at least one quantity.");
      return;
    }
    // ... [rest of handleAddToCart logic] ...
    // NOTE: Keeping the previous implementation for correctness, but simplified here for context.
    
    const itemsToAdd = [];
    if (regularQty > 0)
      itemsToAdd.push({
        item_id: selectedFood.id,
        name: selectedFood.name,
        description: "Regular",
        quantity: regularQty,
        price: selectedFood.regular_price,
      });
    if (largeQty > 0)
      itemsToAdd.push({
        item_id: selectedFood.id,
        name: selectedFood.name,
        description: "Large",
        quantity: largeQty,
        price: selectedFood.large_price,
      });

    const token = localStorage.getItem("token");

    if (token) {
      try {
        const res = await fetch("http://localhost:5000/api/cart/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(itemsToAdd),
        });

        if (res.ok) {
          alert("Items added to cart!");
          window.dispatchEvent(new Event("storage"));
        } else {
          const errData = await res.json();
          alert(errData.error || "Failed to add to cart");
        }
      } catch (err) {
        console.error(err);
        alert("Error adding to cart");
      }
    } else {
      const existingCart = JSON.parse(localStorage.getItem("guestCart")) || [];
      const updatedCart = [...existingCart, ...itemsToAdd];
      localStorage.setItem("guestCart", JSON.stringify(updatedCart));
      alert("Items added to cart (Guest Mode)!");
      window.dispatchEvent(new Event("storage"));
    }
    setRegularQty(0);
    setLargeQty(0);
    setSelectedFood(null);
  };
  // End of handleAddToCart logic

  return (
    <div className="foodsMenu">
      {/* Assuming Navbar now only has login/cart icons and no menu toggle */}
      <Navbar name="Login" />

      {/* Main categories (Vertical Sidebar PC / Horizontal Scroll Mobile) */}
      <div className="foodsNav">
        {Object.keys(subTopics).map((item) => (
          <div key={item} className="topic-dropdown-container"> 
            <button
              className={`foodsButton${activeTopic === item ? " active" : ""}`}
              onClick={() => handleTopicClick(item)}
            >
              {item} 
              {/* Add dropdown indicator */}
              <span className="dropdown-indicator">
                {activeTopic === item && showSubTopics ? '\u25B2' : '\u25BC'}
              </span>
            </button>
            
            {/* Dropdown for subtopics */}
            {activeTopic === item && showSubTopics && (
              <div className="foodsSubTopics">
                {subTopics[item].map((subItem) => (
                  <button
                    key={subItem}
                    className={`foodsSubButton${
                      activeSubTopic === subItem ? " active" : ""
                    }`}
                    onClick={() => handleSubTopicClick(subItem)}
                  >
                    {subItem}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Wrapper for Food list */}
      <div className="foodsContentWrapper">
        <div className="foodsContainer">
          {foods.map((food) => (
            <div
              key={food.id}
              onClick={() => setSelectedFood(food)}
              style={{ cursor: "pointer" }}
            >
              <FoodCard
                name={food.name}
                foodImage={
                  food.image_link?.startsWith("http")
                    ? food.image_link
                    : `https://firebasestorage.googleapis.com/v0/b/YOUR_BUCKET_NAME/o/${encodeURIComponent(
                        food.image_link
                      )}?alt=media`
                }
              />
            </div>
          ))}
        </div>
      </div>

      {/* Food popup (Kept as is) */}
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
                    src={
                      selectedFood.image_link?.startsWith("http")
                        ? selectedFood.image_link
                        : `https://firebasestorage.googleapis.com/v0/b/YOUR_BUCKET_NAME/o/${encodeURIComponent(
                            selectedFood.image_link
                          )}?alt=media`
                    }
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
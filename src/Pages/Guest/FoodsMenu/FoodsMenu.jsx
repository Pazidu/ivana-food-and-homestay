import React, { useEffect } from "react";
import Navbar from "../../../Components/Navbar/Navbar";
import Footer from "../../../Components/Footer/Footer";
import "./FoodsMenu.css";
import FoodCard from "../../../Components/FoodCard/FoodCard";
function FoodsMenu() {
  const [activeTopic, setActiveTopic] = React.useState("Rice");
  /* FoodsMenu.css */

  // Define subcategories for each main topic
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

  const [activeSubTopic, setActiveSubTopic] = React.useState(
    subTopics[activeTopic][0]
  );

  // Update subtopic when main topic changes
  React.useEffect(() => {
    setActiveSubTopic(subTopics[activeTopic][0]);
  }, [activeTopic]);

  const [foods, setFoods] = React.useState([]);

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

  const [selectedFood, setSelectedFood] = React.useState(null);

  return (
    <div className="foodsMenu">
      <Navbar name="Login" />
      <div className="foodsNav">
        {Object.keys(subTopics).map((item) => (
          <button
            className={`foodsButton${activeTopic === item ? " active" : ""}`}
            key={item}
            onClick={() => setActiveTopic(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="foodsSubNav">
        {subTopics[activeTopic].map((subItem) => (
          <button
            className={`foodsSubButton${
              activeSubTopic === subItem ? " active" : ""
            }`}
            key={subItem}
            onClick={() => setActiveSubTopic(subItem)}
          >
            {subItem}
          </button>
        ))}
      </div>

      <div className="foodsContainer ">
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

      {selectedFood && (
        <div
          className="food-popup-overlay"
          onClick={() => setSelectedFood(null)}
        >
          <div className="food-popup" onClick={(e) => e.stopPropagation()}>
            <button
              className="food-popup-close"
              onClick={() => setSelectedFood(null)}
              aria-label="Close"
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
                <p>
                  {/* <strong>Price:</strong> {selectedFood.regular_price} */}
                </p>
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
                          defaultValue={0}
                          style={{ width: "60px", marginLeft: "8px" }}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          min={0}
                          defaultValue={0}
                          style={{ width: "60px", marginLeft: "8px" }}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
                <button
                  className="add-to-cart-btn"
                  onClick={() => {
                    // Implement add to cart logic here
                    alert("Added to cart!");
                  }}
                >
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

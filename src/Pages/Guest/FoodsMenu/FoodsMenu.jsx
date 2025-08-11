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
            {selectedFood.image && (
              <img
                src={selectedFood.image}
                alt={selectedFood.name}
                style={{
                  width: "100%",
                  borderRadius: "6px",
                  marginBottom: "1rem",
                }}
              />
            )}
            <p>{selectedFood.description}</p>
            <p>
              <strong>Price:</strong> {selectedFood.regular_price}
            </p>
            {/* Add more details as needed */}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default FoodsMenu;

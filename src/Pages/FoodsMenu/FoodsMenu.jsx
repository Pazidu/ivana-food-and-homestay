import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import "./FoodsMenu.css";
function FoodsMenu() {
  const [activeTopic, setActiveTopic] = React.useState("Rice");
  /* FoodsMenu.css */

  // Define subcategories for each main topic
  const subTopics = {
    Rice: ["Fried Rice", "Fried Rice Set Menu"],
    Kottu: ["Chicken Kottu", "Vegetable Kottu"],
    Noodles: ["Chicken Noodles", "Vegetable Noodles"],
    Spaghetti: ["Spaghetti Bolognese", "Spaghetti Carbonara"],
    Nasigorang: ["Classic Nasigorang", "Special Nasigorang"],
    Megorang: ["Classic Me gorang", "Special Me gorang"],
    Dishes: ["Chicken Curry", "Fish Curry"],
    Other: ["Snacks", "Drinks"],
  };

  const [activeSubTopic, setActiveSubTopic] = React.useState(
    subTopics[activeTopic][0]
  );

  // Update subtopic when main topic changes
  React.useEffect(() => {
    setActiveSubTopic(subTopics[activeTopic][0]);
  }, [activeTopic]);

  return (
    <>
      <Navbar />
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
      <Footer />
    </>
  );
}

export default FoodsMenu;

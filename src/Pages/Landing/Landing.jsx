import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./Landing.css";

function Landing() {
  const navigate = useNavigate();

  const handleFoodClick = () => {
    navigate("/foods/home");
  };
  const handleRoomsClick = () => {
    navigate("/rooms/home");
  };

  return (
    <div className="landing">
      {/* Background Overlay */}
      <div className="overlay" />

      {/* Content */}
      <div className="content">
        <h1 className="title">Welcome to Ivana</h1>
        <p className="subtitle">
          Experience fine dining with Ivana Foods or relax in comfort at Ivana
          Homestay.
        </p>

        {/* Buttons */}
        <div className="button-group">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <button onClick={handleFoodClick} className="btn btn-food">
              Explore Foods
            </button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <button onClick={handleRoomsClick} className="btn btn-rooms">
              Book Homestay
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Landing;

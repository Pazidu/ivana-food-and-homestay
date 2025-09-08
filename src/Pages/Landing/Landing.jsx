
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Landing() {
  const navigate = useNavigate();

  const handleFoodClick = () => {
    navigate("/foods/home");
  };
  const handleRoomsClick = () => {
    navigate("/rooms/home");
  };

  return (
    <div
      style={{
        position: "absolute",
        height: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        backgroundImage:
          'url("https://images.unsplash.com/photo-1600891964599-f61ba0e24092")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Background Overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%",
          width: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.6)",
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          color: "white",
          padding: "24px",
        }}
      >
        <h1
          style={{
            fontSize: "4rem",
            fontWeight: "bold",
            textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
          }}
        >
          Welcome to Ivana
        </h1>
        <p
          style={{
            fontSize: "1.25rem",
            marginTop: "16px",
            maxWidth: "600px",
            margin: "0 auto",
          }}
        >
          Experience fine dining with Ivana Foods or relax in comfort at Ivana
          Homestay.
        </p>

        {/* Buttons */}
        <div
          style={{
            marginTop: "32px",
            display: "flex",
            gap: "16px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <button
              onClick={handleFoodClick}
              style={{
                padding: "12px 24px",
                fontSize: "1.125rem",
                fontWeight: "bold",
                borderRadius: "9999px",
                border: "none",
                cursor: "pointer",
                backgroundColor: "#04114c", // Deep blue
                color: "white",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            >
              Explore Foods
            </button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <button
              onClick={handleRoomsClick}
              style={{
                padding: "12px 24px",
                fontSize: "1.125rem",
                fontWeight: "bold",
                borderRadius: "9999px",
                border: "none",
                cursor: "pointer",
                backgroundColor: "#800909", // Dark red
                color: "white",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            >
              Book Homestay
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Landing;

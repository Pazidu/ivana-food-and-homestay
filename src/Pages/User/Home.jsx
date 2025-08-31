import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status !== 201) {
        navigate("/login");
      }
    } catch (error) {
      navigate("/login");
      console.log(error);
    }
  };
  fetchUser();
  return (
    <div>
      <h1>Hello User</h1>
    </div>
  );
};

export default Home;

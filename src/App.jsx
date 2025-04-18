import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./Pages/Landing";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import FoodsHome from "./Pages/FoodsHome";
import FoodsGallery from "./Pages/FoodsGallery";
import FoodsFeedback from "./Pages/FoodsFeedback";
import FoodsAbout from "./Pages/FoodsAbout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/foods/home" element={<FoodsHome />} />
        <Route path="/foods/gallery" element={<FoodsGallery />} />
        <Route path="/foods/feedback" element={<FoodsFeedback />} />
        <Route path="/foods/about" element={<FoodsAbout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

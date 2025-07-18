import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./Pages/Landing/Landing";
import Signup from "./Pages/Signup/Signup";
import Login from "./Pages/Login/Login";
import FoodsHome from "./Pages/FoodsHome/FoodsHome";
import FoodsGallery from "./Pages/FoodsGallery/FoodsGallery";
import FoodsFeedback from "./Pages/FoodsFeedback/FoodsFeedback";
import FoodsAbout from "./Pages/FoodsAbout/FoodsAbout";
import FoodsMenu from "./Pages/FoodsMenu/FoodsMenu";
import Cart from "./Pages/Cart/Cart";
import PaymentGateway from "./Pages/PaymentGateway/PaymentGateway";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/payment" element={<PaymentGateway />} />
        <Route path="/foods/home" element={<FoodsHome />} />
        <Route path="/foods/gallery" element={<FoodsGallery />} />
        <Route path="/foods/feedback" element={<FoodsFeedback />} />
        <Route path="/foods/about" element={<FoodsAbout />} />
        <Route path="/foods/menu" element={<FoodsMenu />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

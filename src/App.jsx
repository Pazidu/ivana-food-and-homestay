import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./Pages/Landing/Landing";
import Signup from "./Pages/Guest/Signup/Signup";
import Login from "./Pages/Guest/Login/Login";
import FoodsHome from "./Pages/Guest/FoodsHome/FoodsHome";
import FoodsGallery from "./Pages/Guest/FoodsGallery/FoodsGallery";
import FoodsFeedback from "./Pages/Guest/FoodsFeedback/FoodsFeedback";
import FoodsAbout from "./Pages/Guest/FoodsAbout/FoodsAbout";
import FoodsMenu from "./Pages/Guest/FoodsMenu/FoodsMenu";
import Cart from "./Pages/User/Cart/Cart";
import PaymentGateway from "./Pages/User/PaymentGateway/PaymentGateway";
import UserFoodsHome from "./Pages/User/FoodsHome/FoodsHome";
import Profile from "./Pages/User/Profile/Profile";
import Menu from "./Pages/Admin/Menu/Menu";
import Users from "./Pages/Admin/Users/Users";
import Reviews from "./Pages/Admin/Reviews/Reviews";
import Complaints from "./Pages/Admin/Complaints/Complaints";

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
        <Route path="/user/foods/home" element={<UserFoodsHome />} />
        <Route path="/user/profile" element={<Profile />} />
        <Route path="/user/foods/home" element={<UserFoodsHome />} />
        //admin
        <Route path="/admin/menu" element={<Menu />} />
        <Route path="/admin/users" element={<Users />} />
        <Route path="/admin/reviews" element={<Reviews />} />
        <Route path="/admin/complaints" element={<Complaints />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

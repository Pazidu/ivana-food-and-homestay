import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./Components/ProtectedRoute";
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
import RoomsHome from "./Pages/Guest/Rooms/RoomsHome";
import RoomsBooking from "./Pages/Guest/Rooms/RoomsBooking";
import RoomsGallery from "./Pages/Guest/Rooms/RoomsGallery";
import Aboutus from "./Pages/Guest/Rooms/Aboutus";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* guest */}
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/foods/home" element={<FoodsHome />} />
        <Route path="/foods/gallery" element={<FoodsGallery />} />
        <Route path="/foods/feedback" element={<FoodsFeedback />} />
        <Route path="/foods/about" element={<FoodsAbout />} />
        <Route path="/foods/menu" element={<FoodsMenu />} />

        <Route path="/rooms/home" element={<RoomsHome />} />
        <Route path="/rooms/booking" element={<RoomsBooking />} />
        <Route path="/rooms/gallery" element={<RoomsGallery />} />
        <Route path="/rooms/aboutus" element={<Aboutus />} />

        {/* user protected */}
        <Route
          path="/cart"
          element={
            <ProtectedRoute role="user">
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route
          path="/payment"
          element={
            <ProtectedRoute role="user">
              <PaymentGateway />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/profile"
          element={
            <ProtectedRoute role="user">
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* admin protected */}
        <Route
          path="/admin/menu"
          element={
            <ProtectedRoute role="admin">
              <Menu />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute role="admin">
              <Users />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/reviews"
          element={
            <ProtectedRoute role="admin">
              <Reviews />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/complaints"
          element={
            <ProtectedRoute role="admin">
              <Complaints />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/profile"
          element={
            <ProtectedRoute role="admin">
              <Complaints />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
export default App;

import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Category from '../pages/Category';
import ProductDetail from '../pages/ProductDetail';
import Cart from '../pages/Cart';
import Checkout from '../pages/Checkout';
import Wishlist from '../pages/Wishlist';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import AboutUs from '../pages/AboutUs';
import ContactUs from '../pages/ContactUs';
import PaymentSuccess from '../pages/PaymentSuccess';
import PaymentCancel from '../pages/PaymentCancel';
import MyOrders from '../pages/MyOrders';
import OrderDetails from '../pages/OrderDetails';
import AdminOrders from '../pages/admin/AdminOrders';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/category/:id" element={<Category />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/contact" element={<ContactUs />} />
      <Route path="/payment/success" element={<PaymentSuccess />} />
      <Route path="/payment/cancel" element={<PaymentCancel />} />
      <Route path="/orders" element={<MyOrders />} />
      <Route path="/orders/:id" element={<OrderDetails />} />
      <Route path="/admin/orders" element={<AdminOrders />} />
    </Routes>
  );
}

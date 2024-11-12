// App.js (React component)

import 'react-whatsapp-widget/dist/index.css';
import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
// / This is the way to import an SVG file and then pass it as a props
// import { ReactComponent as Logo } from './logo.svg';
import { WhatsAppWidget } from 'react-whatsapp-widget';
// import MessengerCustomerChat from 'react-messenger-customer-chat';
import Navbar from './components/Navbar/Navbar';
// import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import Footer from './components/Footer/Footer';
import About from './components/About/About';
import Contact from './components/Contact/Contact';
// import AppDownload from './components/AppDownload/AppDownload';
import Feedback from './components/Feedback/FeedbackList';
import FeedbackForm from './components/Feedback/FeedBackForm';
import Menu from './components/ExploreMenu/ExploreMenu';
import LoginPopup from './components/LoginPopup/LoginPopup';
import Verify from './pages/Verify/Verify';
import MyOrders from './pages/MyOrders/MyOrders';
import Checkout from './pages/Checkout';
import BikasOrder from './pages/BikasOrder/BikasOrder';
import Dashboard from './pages/Dashboard/Dashboard'
import AdminDashboard from './components/Admin/Admin';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import ProductsDetails from './pages/ProductsDetails/ProductsDetails'

const App = () => {
  const [category, setCategory] = useState('');
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : null}
      <div className="app">
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/myorders" element={<MyOrders />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<LoginPopup />} />
          <Route path="/contact" element={<Contact />} />
          {/* <Route path="/app" element={<AppDownload />} /> */}
          <Route path="/menu" element={<Menu category={category} setCategory={setCategory} />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/feedback_form" element={<FeedbackForm />} />
          <Route path="/bkash" element={<BikasOrder />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/dashboard/*" element={
    <ProtectedRoute>
        <Dashboard />
    </ProtectedRoute>
} />
          {/* Private Route */}
          {/* <Route path="/dashboard" element={<PrivateRoute element={<AdminDashboard />} />} /> */}
          <Route path="/products" element={ProductsDetails } />
        </Routes>
      </div>

      <WhatsAppWidget  phoneNumber="880-1824682965" />
      <Footer />
    </>
  );
};

export default App;

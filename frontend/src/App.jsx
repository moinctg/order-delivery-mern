import React, { useState } from 'react'

import MessengerCustomerChat from 'react-messenger-customer-chat';
import Navbar from './components/Navbar/Navbar'
import {Route, Routes} from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Footer from './components/Footer/Footer'
import About from './components/About/About'
import Contact from './components/Contact/Contact'
import AppDownload from './components/AppDownload/AppDownload'
// import Testomonials from './components/Testomonial/Testomonial'
import Feedback from './components/Feedback/FeedbackList'
import FeedbackForm from './components/Feedback/FeedBackForm'
import Menu from './components/ExploreMenu/ExploreMenu'
import LoginPopup from './components/LoginPopup/LoginPopup'
import Verify from './pages/Verify/Verify'
import MyOrders from './pages/MyOrders/MyOrders'
// import Payment from './components/Payment/PaymentButton'
import Checkout from './pages/Checkout'
import BikasOrder from './pages/BikasOrder/BikasOrder'
import FoodDisplay from './components/FoodDisplay/FoodDisplay';

const App = () => {
  const [category, setCategory] = useState('');
  const [showLogin, setShowLogin] = useState(false);
  return (
    <>
    {showLogin? <LoginPopup setShowLogin={setShowLogin}/>:<></>}
    <div className='app'>
      <Navbar setShowLogin={setShowLogin}/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/order' element={<PlaceOrder/>}/>
        <Route path='/verify' element={<Verify/>}/>
        <Route path='/myorders' element={<MyOrders/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/app' element={<AppDownload/>}/>
        <Route path='/menu' element={<Menu category={category} setCategory={setCategory} />} />
        {/* <FoodDisplay category={category} setCategory={setCategory}/> */}
        <Route path='/feedback' element={<Feedback/>}/>
        <Route path='/feedback_form' element={<FeedbackForm/>}/>
        <Route path='/bkash' element={<BikasOrder/>}/>
        <Route path='/checkout' element={<Checkout/>}/>
      </Routes>
    </div>
    <div>
      {/* Your other components */}
      <MessengerCustomerChat
        pageId="416598257997739"
        appId="589295966995891" // Replace with your actual Facebook App ID
        language="en_US" // Optional: specify language, e.g., "en_US"
        themeColor="#0084ff" // Optional: customize the theme color of the chat
        loggedInGreeting="Hi! How can we help you?"
        loggedOutGreeting="Please log in to chat with us."
      />
    </div>
    <Footer/>
    </>
  )
}

export default App
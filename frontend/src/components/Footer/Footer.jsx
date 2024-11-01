import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
import MessengerCustomerChat from 'react-messenger-customer-chat';

const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                <img src={assets.logo} alt="" />
                <p className='text-white'> We believe that great food brings people together. Our mission is to make it easier for you to enjoy your favorite meals from the comfort of your home. Whether you’re craving a quick snack or a gourmet feast, we’re here to deliver fresh, delicious food straight to your door</p>
                <div className="footer-social-icons">
                    <img src={assets.facebook_icon} alt="" />
                    <img src={assets.twitter_icon} alt="" />
                    <img src={assets.linkedin_icon} alt="" />
                </div>
            </div>
            <div className="footer-content-center">
                <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>
            <div className="footer-content-right">
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>arif</li>
                    <li>880-1824-682965</li>
                    <li>dulanjalisenarathna93@gmail.com</li>
                </ul>
            </div>
            
        </div>
        <hr />
        <p className="footer-copyright text-white">
            Copyright 2024 &copy; Arif & Anik - All Right Reserved.
        </p>

     <MessengerCustomerChat
    pageId="416598257997739"
    appId="589295966995891"
    
  />,
    </div>
  )
}

export default Footer
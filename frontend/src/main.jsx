import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import StoreContextProvider from './components/context/StoreContext.jsx'
import process from "process";
window.process = process;
import MessengerCustomerChat from 'react-messenger-customer-chat';
ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <StoreContextProvider>
    <App />
    <div>
    
      <MessengerCustomerChat
        pageId="416598257997739"
        appId="589295966995891" // Replace with your actual Facebook App ID
        language="en_US" // Optional: specify language, e.g., "en_US"
        themeColor="#0084ff" // Optional: customize the theme color of the chat
        loggedInGreeting="Hi! How can we help you?"
        loggedOutGreeting="Please log in to chat with us."
      />
    </div>
  </StoreContextProvider>
  </BrowserRouter>,
   document.getElementById('root')
)

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import StoreContextProvider from './components/context/StoreContext.jsx'
import MessengerCustomerChat from 'react-messenger-customer-chat';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <StoreContextProvider>
    <App />

 <MessengerCustomerChat
    pageId="<https://www.facebook.com/ahmed.arif01/>"
    appId="<589295966995891>"
    htmlRef="<REF_STRING>"
  />,
  </StoreContextProvider>
  </BrowserRouter>,
)

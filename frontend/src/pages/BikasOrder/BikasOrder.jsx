
import React, { useContext, useEffect } from 'react';
import '../PlaceOrder/PlaceOrder.css';
import { StoreContext } from '../../components/context/StoreContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BikasOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);
  const navigate = useNavigate();

  const placeOrder = async (event) => {
    event.preventDefault();

    let orderItems = [];
    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = { ...item, quantity: cartItems[item._id] };
        orderItems.push(itemInfo);
      }
    });

    const orderData = {
      items: orderItems,
      amount: getTotalCartAmount() + 2,
    };

    try {
      const response = await axios.post(`${url}/api/order/place`, orderData, { headers: { token } });
     
      if (response.data.success) {
        const { session_url } = response.data;
        window.location.replace(session_url);
      } else {
        console.error("Order placement response error:", response.data);
        alert('Error placing order: ' + (response.data.message || 'An unspecified error occurred'));
      }
    } catch (error) {
      console.error("Order placement failed", error);

      if (error.response) {
        // Specific handling for server error response
        console.error("Server responded with error:", error.response.data);
        alert(`Server error: ${error.response.data.message || 'An error occurred on the server'}`);
      } else if (error.request) {
        // Request was made but no response was received
        console.error("No response received:", error.request);
        alert('Network error: No response from server');
      } else {
        // Other errors
        console.error("Error setting up the request:", error.message);
        alert(`Unexpected error: ${error.message}`);
      }
    }
  };

  useEffect(() => {
    if (!token) {
      navigate('/cart');
    } else if (getTotalCartAmount() === 0) {
      navigate('/cart');
    }
  }, [token, navigate, getTotalCartAmount]);

  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Bkash Auto Order Summary</h2>
          <div>
            <div className="cart-total-detail">
              <p>Subtotal</p>
              <p>৳ {getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-detail">
              <p>Delivery Fee</p>
              <p>৳ {getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-detail">
              <b>Total</b>
              <b>৳ {getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 80}</b>
            </div>
          </div>
          <button type='submit'>PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default BikasOrder;




// import React, { useContext, useEffect } from 'react';
// import '../PlaceOrder/PlaceOrder.css';
// import { StoreContext } from '../../components/context/StoreContext';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const BikasOrder = () => {
//   const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);
//   const navigate = useNavigate();

//   const BikasOrder= async (event) => {
//     event.preventDefault();

//     let orderItems = [];
//     food_list.forEach((item) => {
//       if (cartItems[item._id] > 0) {
//         let itemInfo = { ...item, quantity: cartItems[item._id] };
//         orderItems.push(itemInfo);
//       }
//     });

//     const orderData = {
//       items: orderItems,
//       amount: getTotalCartAmount() + 2,
//     };

//     try {
//       const response = await axios.post(`${url}/api/order/place`, orderData, { headers: { token } });
 
//        console.log(response.data)
//       if (response.data.success) {
//         const { session_url } = response.data;
//         window.location.replace(session_url);
//       } else {
//         console.error("Order placement response error:", response.data);
//         alert('Error placing order: ' + (response.data.message || 'Unknown error'));
//       }
//     } catch (error) {
//       console.error("Order placement failed", error);

//       if (error.response) {
//         console.error("Server responded with error:", error.response.data);
//         alert('Server error: ' + (error.response.data.message || 'Unknown server error'));
//       } else if (error.request) {
//         console.error("Request made but no response received:", error.request);
//         alert('Network error: No response received');
//       } else {
//         console.error("Error setting up the request:", error.message);
//         alert('Unexpected error: ' + error.message);
//       }
//     }
//   };

//   useEffect(() => {
//     if (!token) {
//       navigate('/cart');
//     } else if (getTotalCartAmount() === 0) {
//       navigate('/cart');
//     }
//   }, [token, navigate, getTotalCartAmount]);

//   return (
//     <form onSubmit={BikasOrder} className='place-order'>
//       <div className="place-order-right">
//         <div className="cart-total">
//           <h2>Bkash Auto Order Summary</h2>
//           <div>
//             <div className="cart-total-detail">
//               <p>Subtotal</p>
//               <p>৳ {getTotalCartAmount()}</p>
//             </div>
//             <hr />
//             <div className="cart-total-detail">
//               <p>Delivery Fee</p>
//               <p>৳ {getTotalCartAmount() === 0 ? 0 : 2}</p>
//             </div>
//             <hr />
//             <div className="cart-total-detail">
//               <b>Total</b>
//               <b>৳ {getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 80}</b>
//             </div>
//           </div>
//           <button type='submit'>PROCEED TO PAYMENT</button>
//         </div>
//       </div>
//     </form>
//   );
// };

// export default BikasOrder;


import React, { useState, useEffect, useContext } from 'react';
import './Orders.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from './../../../../frontend/src/assets/assets';
import { StoreContext } from '../../components/context/StoreContext';

const Orders = () => {
  const { url } = useContext(StoreContext);

  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(`${url}/api/order/list`);
      if (response.data.success) {
        setOrders(response.data.data);
        console.log(response.data.data);
      } else {
        toast.error('Error fetching orders');
      }
    } catch (error) {
      toast.error('Error fetching orders');
      console.error('Error:', error);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(`${url}/api/order/status`, {
        orderId,
        status: event.target.value,
      });
      if (response.data.success) {
        await fetchAllOrders();
      }
    } catch (error) {
      toast.error('Error updating order status');
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="order add">
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order, index) => (
          <div key={index} className="order-item">
            <img src={assets.parcel_icon} alt="Parcel Icon" />
            <div>
              <p className="order-item-food">
                {order.items.map((item, index) => {
                  return index === order.items.length - 1
                    ? `${item.name} x ${item.quantity}`
                    : `${item.name} x ${item.quantity}, `;
                })}
              </p>
              <p className="order-item-name">
                {order.address
                  ? `${order.address.firstName} ${order.address.lastName}`
                  : 'N/A'}
              </p>
              <div className="order-item-address">
                <p>{order.address ? order.address.state : 'N/A'}</p>
                <p>
                  {order.address
                    ? `${order.address.city}, ${order.address.state}, ${order.address.country}, ${order.address.zipcode}`
                    : 'N/A'}
                </p>
              </div>
              <p className="order-item-phone">
                {order.address ? order.address.phone : 'N/A'}
              </p>
            </div>
            <p>Items: {order.items.length}</p>
            <p>${order.amount}</p>
            <select
              onChange={(event) => statusHandler(event, order._id)}
              value={order.status}
            >
              <option value="Food Processing">Food Processing</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;









// import React from 'react'
// import './Orders.css'
// import { useState,useContext } from 'react'
// import axios from 'axios'
// import { toast } from 'react-toastify';
// import { useEffect } from 'react';
// import { assets } from './../../../../frontend/src/assets/assets';
// import { StoreContext } from '../../components/context/StoreContext';

// const Orders = () => {
//   const { url } = useContext(StoreContext);

//   const [orders, setOrders] = useState([])

//   const fetchAllOrders = async () =>{
//     const response = await axios.get(`${url}/api/order/list`);
//     // `${url}/api/food/add`
//     if(response.data.success){
//       setOrders(response.data.data);
//       console.log(response.data.data);
//     }else{
//       toast.error("Error")
//     }
//   }

//   const statusHandler = async (event,orderId) =>{
//     const response = await axios.post(`${url}/api/order/status`,{
//       orderId,
//       status:event.target.value
//     })
//     if(response.data.success){
//       await fetchAllOrders();
//     }
//   }

//   useEffect(()=>{
//     fetchAllOrders()
//   },[])
//   return (
//     <div className='order add'>
//       <h3>Order Page</h3>
//       <div className="order-list">
//         {orders.map((order, index)=>(
//           <div key={index} className="order-item">
//             <img src={assets.parcel_icon} alt="" />
//             <div>
//               <p className="order-item-food">
//                 {order.items.map((item,index)=>{
//                   if(index===order.items.length-1){
//                     return item.name + " x " + item.quantity
//                   }else{
//                     return item.name + " x " + item.quantity + " , "
//                   }
//                 })}
//               </p>
//               <p className="order-item-name">{order.address.firstName + " "+order.address.lastName}</p>
//               <div className="order-item-address">
//                 <p>{order.address.state + ","}</p>
//                 <p>{order.address.city+" ,"+ order.address.state+" ,"+order.address.country+" ,"+order.address.zipcode}</p>
//               </div>
//               <p className='order-item-phone'>{order.address.phone}</p>
//             </div>
//             <p>Itmes: {order.items.length}</p>
//             <p>${order.amount}</p>
//             <select onChange={(event)=> statusHandler(event,order._id)} value={order.status} >
//               <option value="Food Processing">Food Processing</option>
//               <option value="Out for delivery">Out for delivery</option>
//               <option value="Delivered">Delivered</option>
//             </select>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

// export default Orders
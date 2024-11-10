import React from 'react';
import './Sidebar.css';
import { assets } from '../../../assets/assets'; // Fixed asset path
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-options">
        {/* Use relative paths to '/dashboard/*' */}
        <NavLink to='/dashboard/add' className="sidebar-option">
          <img src={assets.add_icon} alt="Add Icon" />
          <p>Add Items</p>
        </NavLink>
        <NavLink to='/dashboard/list' className="sidebar-option">
          <img src={assets.order_icon} alt="List Icon" />
          <p>List Items</p>
        </NavLink>
        <NavLink to='/dashboard/orders' className="sidebar-option">
          <img src={assets.order_icon} alt="Orders Icon" />
          <p>Orders</p>
        </NavLink>
        <NavLink to='/dashboard/order-summary' className="sidebar-option">
          <img src={assets.order_icon} alt="Order Summary Icon" />
          <p>Order Summary</p>
        </NavLink>
        <NavLink to='/dashboard/daily-order' className="sidebar-option">
          <img src={assets.order_icon} alt="Daily Order Icon" />
          <p>Daily Order List</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;

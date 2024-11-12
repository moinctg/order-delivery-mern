// components/Admin/Sidebar/Sidebar.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { NavLink } from 'react-router-dom';
import logo from '../../../assets/logo.png';

const Sidebar = ({ onLogout }) => {
  return (
    <div className="d-flex flex-column bg-dark text-light p-3 vh-100">
      <img src={logo} alt=""/>
      <h5 className="text-center mb-4">Food Express</h5>

      <div className="d-flex flex-column">
        <NavLink to='/dashboard/add' className="d-flex align-items-center text-light py-2 mb-2 text-decoration-none">
          <i className="bi bi-plus-circle me-2"></i>
          <span>Add Items</span>
        </NavLink>
        <NavLink to='/dashboard/list' className="d-flex align-items-center text-light py-2 mb-2 text-decoration-none">
          <i className="bi bi-list-ul me-2"></i>
          <span>List Items</span>
        </NavLink>
        <NavLink to='/dashboard/orders' className="d-flex align-items-center text-light py-2 mb-2 text-decoration-none">
          <i className="bi bi-bag-check me-2"></i>
          <span>Orders</span>
        </NavLink>
        <NavLink to='/dashboard/order-summary' className="d-flex align-items-center text-light py-2 mb-2 text-decoration-none">
          <i className="bi bi-journal-text me-2"></i>
          <span>Order Summary</span>
        </NavLink>
        <NavLink to='/dashboard/daily-order' className="d-flex align-items-center text-light py-2 mb-2 text-decoration-none">
          <i className="bi bi-calendar-check me-2"></i>
          <span>Daily Order List</span>
        </NavLink>
        <div onClick={onLogout} className="d-flex align-items-center text-light py-2 mb-2 text-decoration-none cursor-pointer">
          <i className="bi bi-box-arrow-right me-2"></i>
          <span>Logout</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;















// import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap-icons/font/bootstrap-icons.css';
// import { NavLink } from 'react-router-dom';
// import logo from '../../../assets/logo.png'

// const Sidebar = () => {
//   return (
//     <div className="d-flex flex-column bg-dark text-light p-3 vh-100">
//       <img src={logo} alt=""/>
//       <h5 className="text-center mb-4">Food Express  </h5>

//       <div className="d-flex flex-column">
//         {/* Sidebar Navigation Links */}
//         <NavLink to='/dashboard/add' className="d-flex align-items-center text-light py-2 mb-2 text-decoration-none">
//           <i className="bi bi-plus-circle me-2"></i> {/* Bootstrap Add Icon */}
//           <span>Add Items</span>
//         </NavLink>
//         <NavLink to='/dashboard/list' className="d-flex align-items-center text-light py-2 mb-2 text-decoration-none">
//           <i className="bi bi-list-ul me-2"></i> {/* Bootstrap List Icon */}
//           <span>List Items</span>
//         </NavLink>
//         <NavLink to='/dashboard/orders' className="d-flex align-items-center text-light py-2 mb-2 text-decoration-none">
//           <i className="bi bi-bag-check me-2"></i> {/* Bootstrap Orders Icon */}
//           <span>Orders</span>
//         </NavLink>
//         <NavLink to='/dashboard/order-summary' className="d-flex align-items-center text-light py-2 mb-2 text-decoration-none">
//           <i className="bi bi-journal-text me-2"></i> {/* Bootstrap Order Summary Icon */}
//           <span>Order Summary</span>
//         </NavLink>
//         <NavLink to='/dashboard/daily-order' className="d-flex align-items-center text-light py-2 mb-2 text-decoration-none">
//           <i className="bi bi-calendar-check me-2"></i> {/* Bootstrap Daily Order Icon */}
//           <span>Daily Order List</span>
//         </NavLink>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

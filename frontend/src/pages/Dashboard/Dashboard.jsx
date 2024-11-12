// components/Dashboard.js
import React, { useContext } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Admin/Navbar/Navbar';
import Sidebar from '../../components/Admin/Sidebar/Sidebar';
import Add from '../Add/Add';
import List from '../List/List';
import Orders from '../Orders/Orders';
import DailyOrderList from '../DailyOrder/DailyOrderList';
import OrderSummary from '../OrderSummary/OrderSummary';
import { Routes, Route } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { StoreContext } from '../../components/context/StoreContext';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const { url } = useContext(StoreContext);
  const location = useLocation();
  const navigate = useNavigate();

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('adminToken'); // Clear token from local storage
    navigate('/admin/login'); // Redirect to login page
  };

  // Chart data and options
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'Total Sales',
        data: [100, 200, 300, 400, 500],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Sales Over Time' },
    },
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <ToastContainer />
      <Navbar />
      <hr />
      <div className="d-flex flex-grow-1">
        <div className="col-3 bg-dark text-white p-4">
          <Sidebar onLogout={handleLogout} /> {/* Passing handleLogout to Sidebar */}
        </div>

        <div className="col-9 p-4">
          <h1 className="mb-4 text-center">Food Express <br /> Admin Dashboard</h1>

          {/* Render the dashboard summary section only on the exact /dashboard route */}
          {location.pathname === '/dashboard' && (
            <>
              <div className="row mb-4">
                <div className="col-md-4 mb-3">
                  <div className="bg-primary text-white p-3 rounded shadow text-center">
                    <h3>Total Sales</h3>
                    <p className="h2">$5,000</p>
                  </div>
                </div>
                <div className="col-md-4 mb-3">
                  <div className="bg-success text-white p-3 rounded shadow text-center">
                    <h3>Total Orders</h3>
                    <p className="h2">250</p>
                  </div>
                </div>
                <div className="col-md-4 mb-3">
                  <div className="bg-warning text-white p-3 rounded shadow text-center">
                    <h3>Total Deliveries</h3>
                    <p className="h2">200</p>
                  </div>
                </div>
              </div>
              <div className="bg-light p-4 rounded shadow mb-4">
                <h2 className="mb-3">Sales Analytics</h2>
                <Line data={data} options={options} />
              </div>
            </>
          )}

          {/* Routes Section */}
          <Routes>
            <Route path='/add' element={<Add url={url} />} />
            <Route path='/list' element={<List url={url} />} />
            <Route path='/orders' element={<Orders url={url} />} />
            <Route path='/daily-order' element={<DailyOrderList url={url} />} />
            <Route path='/order-summary' element={<OrderSummary url={url} />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;





// import React, { useContext } from 'react';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { useLocation } from 'react-router-dom';
// import Navbar from '../../components/Admin/Navbar/Navbar';
// import Sidebar from '../../components/Admin/Sidebar/Sidebar';
// import Add from '../Add/Add';
// import List from '../List/List';
// import Orders from '../Orders/Orders';
// import DailyOrderList from '../DailyOrder/DailyOrderList';
// import OrderSummary from '../OrderSummary/OrderSummary';
// import { Routes, Route } from 'react-router-dom';
// import { Line } from 'react-chartjs-2';
// import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
// import { StoreContext } from '../../components/context/StoreContext'

// // Register Chart.js components
// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// const Dashboard = () => {
//   const { url } = useContext(StoreContext);
//   const location = useLocation();

//   // Chart data and options
//   const data = {
//     labels: ['January', 'February', 'March', 'April', 'May'],
//     datasets: [
//       {
//         label: 'Total Sales',
//         data: [100, 200, 300, 400, 500],
//         borderColor: 'rgba(75, 192, 192, 1)',
//         backgroundColor: 'rgba(75, 192, 192, 0.2)',
//         fill: true,
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     plugins: {
//       legend: { position: 'top' },
//       title: { display: true, text: 'Sales Over Time' },
//     },
//   };

//   return (
//     <div className="d-flex flex-column min-vh-100">
//       <ToastContainer />
//       <Navbar />
//       <hr />
//       <div className="d-flex flex-grow-1">
//         <div className="col-3 bg-dark text-white p-4">
//           <Sidebar />
//         </div>

//         <div className="col-9 p-4">
//           <h1 className="mb-4 text-center">Food Express <br /> Admin Dashboard</h1>
//           <Sidebar onLogout={handleLogout} />
//             <div className="main-content">
//                 {/* Main dashboard content here */}
//             </div>
          
//           {/* Render the dashboard summary section only on the exact /dashboard route */}
//           {location.pathname === '/dashboard' && (
//             <>
//               <div className="row mb-4">
//                 <div className="col-md-4 mb-3">
//                   <div className="bg-primary text-white p-3 rounded shadow text-center">
//                     <h3>Total Sales</h3>
//                     <p className="h2">$5,000</p>
//                   </div>
//                 </div>
//                 <div className="col-md-4 mb-3">
//                   <div className="bg-success text-white p-3 rounded shadow text-center">
//                     <h3>Total Orders</h3>
//                     <p className="h2">250</p>
//                   </div>
//                 </div>
//                 <div className="col-md-4 mb-3">
//                   <div className="bg-warning text-white p-3 rounded shadow text-center">
//                     <h3>Total Deliveries</h3>
//                     <p className="h2">200</p>
//                   </div>
//                 </div>
//               </div>
//               <div className="bg-light p-4 rounded shadow mb-4">
//                 <h2 className="mb-3">Sales Analytics</h2>
//                 <Line data={data} options={options} />
//               </div>
//             </>
//           )}

//           {/* Routes Section */}
//           <Routes>
//             <Route path='/add' element={<Add url={url} />} />
//             <Route path='/list' element={<List url={url} />} />
//             <Route path='/orders' element={<Orders url={url} />} />
//             <Route path='/daily-order' element={<DailyOrderList url={url} />} />
//             <Route path='/order-summary' element={<OrderSummary url={url} />} />
//           </Routes>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

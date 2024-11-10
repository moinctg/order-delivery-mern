import React, { useContext } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
import { StoreContext } from '../../components/context/StoreContext'

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard = () => {
  // Ensure you have the correct URL from context
  const { url } = useContext(StoreContext);

  const data = {
    labels: ['January', 'February', 'March', 'April', 'May'], // Sample months
    datasets: [
      {
        label: 'Total Sales',
        data: [100, 200, 300, 400, 500], // Sample data
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Sales Over Time',
      },
    },
  };

  return (
    <div className="flex flex-col min-h-screen">
      <ToastContainer />
      <Navbar />
      <hr />
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="w-1/4 bg-gray-800 text-white p-4">
          <Sidebar />
        </div>

        {/* Main content */}
        <div className="flex-1 p-6">
          <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

          {/* Dashboard Summary Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Total Sales */}
            <div className="bg-blue-500 text-white p-4 rounded-lg shadow-md flex flex-col items-center">
              <h3 className="text-lg font-bold">Total Sales</h3>
              <p className="text-2xl">$5,000</p>
            </div>
            {/* Total Orders */}
            <div className="bg-green-500 text-white p-4 rounded-lg shadow-md flex flex-col items-center">
              <h3 className="text-lg font-bold">Total Orders</h3>
              <p className="text-2xl">250</p>
            </div>
            {/* Total Deliveries */}
            <div className="bg-yellow-500 text-white p-4 rounded-lg shadow-md flex flex-col items-center">
              <h3 className="text-lg font-bold">Total Deliveries</h3>
              <p className="text-2xl">200</p>
            </div>
          </div>

          {/* Charts Section */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-bold mb-4">Sales Analytics</h2>
            <Line data={data} options={options} />
          </div>

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

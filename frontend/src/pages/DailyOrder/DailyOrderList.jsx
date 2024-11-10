import React, { useState, useEffect } from "react";
import axios from "axios";

const DailyOrderList = ( {url }) => {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchDailyOrders = async () => {
            try {
                const response = await axios.get(`${url}/api/order/daily-orders`);
             
                console.log(response.data)
                setOrders(response.data);
            } catch (err) {
                setError("Error fetching daily orders");
                console.error(err);
            }
        };

        fetchDailyOrders();

        // Optional: Auto-refresh every minute
        const interval = setInterval(fetchDailyOrders, 60000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="container mx-auto p-6 bg-gray-50 rounded-lg shadow-md">
    <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">Today Orders</h1>
    <table className="min-w-full border-collapse border border-gray-200">
        <thead>
            <tr className="bg-blue-600 text-white">
                <th className="p-3 border border-gray-300">Customer</th>
                <th className="p-3 border border-gray-300">Email</th>
                <th className="p-3 border border-gray-300">Address</th>
                <th className="p-3 border border-gray-300">Date</th>
                <th className="p-3 border border-gray-300">Total Amount</th>
                <th className="p-3 border border-gray-300">Status</th>
                <th className="p-3 border border-gray-300">Payment</th>
            </tr>
        </thead>
        <tbody>
            {orders.map((order) => (
                <tr key={order._id} className="even:bg-gray-100 hover:bg-blue-50 transition duration-200">
                    <td className="p-3 border border-gray-300">{order.address.firstName} {order.address.lastName}</td>
                    <td className="p-3 border border-gray-300">{order.address.email}</td>
                    <td className="p-3 border border-gray-300">{order.address.street}, {order.address.city}</td>
                    <td className="p-3 border border-gray-300">{new Date(order.createdAt).toLocaleString()}</td>
                    <td className="p-3 border border-gray-300 font-semibold">${order.amount.toFixed(2)}</td>
                    <td className="p-3 border border-gray-300">
                        <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full 
                            ${order.status === 'Food Processing' ? 'bg-yellow-500 text-white' : 'bg-green-500 text-white'}`}>
                            {order.status}
                        </span>
                    </td>
                    <td className="p-3 border border-gray-300">
                        <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full 
                            ${order.payment ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                            {order.payment ? "Paid" : "Not Paid"}
                        </span>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
</div>

    );
};

export default DailyOrderList;

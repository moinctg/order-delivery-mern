import React, { useState, useEffect } from "react";
import axios from "axios";

const DailyOrderList = ({ url }) => {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchDailyOrders = async () => {
            try {
                const response = await axios.get(`${url}/api/order/daily-orders`);
                console.log(response.data);
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
        <div className="container p-4 my-4 bg-light rounded shadow-sm">
            <h1 className="text-center mb-4">Today’s Orders</h1>
            {error && <p className="text-danger">{error}</p>}
            <table className="table table-bordered table-hover">
                <thead className="table-primary text-center">
                    <tr>
                        <th>Customer</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Date</th>
                        <th>Total Amount</th>
                        <th>Status</th>
                        <th>Payment</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order._id}>
                            <td>{order.address.firstName} {order.address.lastName}</td>
                            <td>{order.address.email}</td>
                            <td>{order.address.street}, {order.address.city}</td>
                            <td>{new Date(order.createdAt).toLocaleString()}</td>
                            <td className="font-weight-bold">${order.amount.toFixed(2)}</td>
                            <td>
                                <span className={`badge 
                                    ${order.status === 'Food Processing' ? 'bg-warning text-dark' : 'bg-success'}`}>
                                    {order.status}
                                </span>
                            </td>
                            <td>
                                <span className={`badge ${order.payment ? 'bg-success' : 'bg-danger'}`}>
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

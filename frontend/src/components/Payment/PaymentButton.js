import React from 'react';
import axios from 'axios';

const PaymentButton = ({ amount, customer }) => {
    const initiatePayment = async () => {
        try {
            const response = await axios.post('http://localhost:8000/api/payment/initiate', {
                amount,
                currency: 'BDT',
                tran_id: `txn_${Date.now()}`,
                customer,
            });
            if (response.data.url) {
                window.location.href = response.data.url; // Redirect to SSLCommerz payment gateway
            }
        } catch (error) {
            console.error('Payment initiation error:', error);
        }
    };

    return (
        <button onClick={initiatePayment}>Pay Now</button>
    );
};

export default PaymentButton;

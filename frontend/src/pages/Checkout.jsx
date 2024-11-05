import React, { useState, useContext } from 'react';
import { StoreContext } from '../components/context/StoreContext';

const CheckoutPage = () => {
  const { getTotalCartAmount, cartItems, token, url } = useContext(StoreContext);
  console.log(getTotalCartAmount, cartItems)
  const [customerInfo, setCustomerInfo] = useState({
    cusName: '',
    cusEmail: '',
    cusAdd1: '',
    cusAdd2: '',
    cusCity: '',
    cusState: '',
    cusPostcode: '',
    cusCountry: 'Bangladesh',
    cusPhone: '',
    cusFax: '777777777',
  });
  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    shippingAdd1: '',
    shippingAdd2: '',
    shippingCity: '',
    shippingState: '',
    shippingPostcode: '',
    shippingCountry: 'Bangladesh',
    cusPhone: '',
  });
  const [loading, setLoading] = useState(false);
  const [paymentError, setPaymentError] = useState(null);

  const handleChange = (e, setState) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleBkashPayment = async () => {
    setLoading(true);
    setPaymentError(null);

    // Check if all required fields are filled
    const allFieldsFilled = Object.values(customerInfo).every(val => val !== '') &&
                            Object.values(shippingInfo).every(val => val !== '');

    if (!allFieldsFilled) {
      setPaymentError("All fields must be filled");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${url}/api/payment/checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', token },
        body: JSON.stringify({
          amount: getTotalCartAmount(),
          cartItems,
          customerInfo,
          shippingInfo,
          deliveryMethod: 'Courier',
          numItem: cartItems.length,
        }),
      });

      const data = await response.json();
      console.log(data)
      if (data && data.GatewayPageURL) {
        window.location.href = data.GatewayPageURL;
      } else {
        throw new Error('Payment initiation failed.');
      }
    } catch (error) {
      setPaymentError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-page" style={{ padding: '20px', maxWidth: '500px', margin: 'auto' }}>
      <h2>Checkout</h2>
      <p>Total Amount: BDT {getTotalCartAmount()}</p>
      {paymentError && <p style={{ color: 'red' }}>{paymentError}</p>}

      <div style={{ margin: '20px 0' }}>
        <h3>Customer Information</h3>
        <input name="cusName" placeholder="Name" value={customerInfo.cusName} onChange={(e) => handleChange(e, setCustomerInfo)} required />
        <input name="cusEmail" placeholder="Email" value={customerInfo.cusEmail} onChange={(e) => handleChange(e, setCustomerInfo)} required />
        <input name="cusAdd1" placeholder="Address Line 1" value={customerInfo.cusAdd1} onChange={(e) => handleChange(e, setCustomerInfo)} required />
        <input name="cusAdd2" placeholder="Address Line 2" value={customerInfo.cusAdd2} onChange={(e) => handleChange(e, setCustomerInfo)} />
        <input name="cusCity" placeholder="City" value={customerInfo.cusCity} onChange={(e) => handleChange(e, setCustomerInfo)} required />
        <input name="cusState" placeholder="State" value={customerInfo.cusState} onChange={(e) => handleChange(e, setCustomerInfo)} />
        <input name="cusPostcode" placeholder="Postcode" value={customerInfo.cusPostcode} onChange={(e) => handleChange(e, setCustomerInfo)} required />
        <input name="cusPhone" placeholder="Phone" value={customerInfo.cusPhone} onChange={(e) => handleChange(e, setCustomerInfo)} required />
      </div>

      <div style={{ margin: '20px 0' }}>
        <h3>Shipping Information</h3>
        <input name="name" placeholder="Recipient Name" value={shippingInfo.name} onChange={(e) => handleChange(e, setShippingInfo)} required />
        <input name="shippingAdd1" placeholder="Shipping Address 1" value={shippingInfo.shippingAdd1} onChange={(e) => handleChange(e, setShippingInfo)} required />
        <input name="shippingAdd2" placeholder="Shipping Address 2" value={shippingInfo.shippingAdd2} onChange={(e) => handleChange(e, setShippingInfo)} />
        <input name="shippingCity" placeholder="City" value={shippingInfo.shippingCity} onChange={(e) => handleChange(e, setShippingInfo)} required />
        <input name="shippingState" placeholder="State" value={shippingInfo.shippingState} onChange={(e) => handleChange(e, setShippingInfo)} />
        <input name="shippingPostcode" placeholder="Postcode" value={shippingInfo.shippingPostcode} onChange={(e) => handleChange(e, setShippingInfo)} required />
        <input name="cusPhone" placeholder="Phone" value={shippingInfo.cusPhone} onChange={(e) => handleChange(e, setShippingInfo)} required />
      </div>

      <button onClick={handleBkashPayment} disabled={loading} style={{ padding: '10px 20px', backgroundColor: '#0066cc', color: 'white', border: 'none', borderRadius: '5px' }}>
        {loading ? 'Processing...' : 'Pay with bKash'}
      </button>
    </div>
  );
};

export default CheckoutPage;

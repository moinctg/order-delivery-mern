import React from 'react';
import axios from 'axios';

const SaleButton = ({ productId, quantity }) => {
  const handleSale = async () => {
    try {
      await axios.post('/api/products/update-stock', { productId, quantity });
      alert('Sale made and stock updated');
    } catch (error) {
      console.error('Error updating stock', error);
    }
  };

  return <button onClick={handleSale}>Make Sale</button>;
};

export default SaleButton;

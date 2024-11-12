import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductStatus = ({ productId }) => {
  const [status, setStatus] = useState('');
  const [stock, setStock] = useState(0);

  useEffect(() => {
    const fetchProductStatus = async () => {
      try {
        const response = await axios.get(`/api/products/status/${productId}`);
        setStatus(response.data.status);
        setStock(response.data.stock);
      } catch (error) {
        console.error('Error fetching product status', error);
      }
    };

    fetchProductStatus();
  }, [productId]);

  return (
    <div>
      <h3>Product Status</h3>
      <p>{status} - {stock} items left</p>
    </div>
  );
};

export default ProductStatus;

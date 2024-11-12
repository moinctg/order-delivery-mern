import React from 'react';
import ProductStatus from '../../components/Products/ProductStatus';

const ProdcutsDetails = () => {
  // Replace with actual product ID to fetch the status for each product
  const sampleProductId = 'yourProductIdHere';

  return (
    <div>
      <h1>Products Details </h1>
      {/* Sample product status check */}
      <ProductStatus productId={sampleProductId} />
    </div>
  );
};

export default ProdcutsDetails;

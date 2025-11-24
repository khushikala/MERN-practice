import React from 'react';

const ProductCard = ({ title, price, discount }) => {
  const finalPrice = price - discount;

  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
      <h3>{title}</h3>
      <p>Price: Rs.{price}</p>
      <p>Discount: Rs.{discount}</p>
      <p>Final Price: Rs.{finalPrice}</p>
    </div>
  );
};

export default ProductCard;

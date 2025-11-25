import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function ProductCard({ product }) {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="card h-100">
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text">Price: Rs.{product.price}</p>
        <p className="card-text"><small className="text-muted">{product.category}</small></p>
        <button onClick={toggleFavorite} className={`btn ${isFavorite ? 'btn-warning' : 'btn-outline-warning'}`}>
          {isFavorite ? 'Favorited' : 'Favorite'}
        </button>
        <Link to={`/product/${product.id}`} className="btn btn-primary ms-2">View Details</Link>
      </div>
    </div>
  );
}

export default ProductCard;

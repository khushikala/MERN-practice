import React from 'react';
import PropTypes from 'prop-types';

function DestinationCard({ id, name, image, description, onAddToWishlist }) {
  return (
    <div className="card h-100">
      <img src={image} className="card-img-top" alt={name} />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">{description}</p>
        <button className="btn btn-primary mt-auto" onClick={() => onAddToWishlist(id)}>Add to Wishlist</button>
      </div>
    </div>
  );
}

DestinationCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onAddToWishlist: PropTypes.func.isRequired,
};

export default DestinationCard;

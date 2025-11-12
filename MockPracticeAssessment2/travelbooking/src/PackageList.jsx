import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function PackageList() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3001/packages')
      .then(res => res.json())
      .then(data => {
        setPackages(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="container mt-4"><p>Loading...</p></div>;

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Travel Packages</h1>
      <div className="row">
        {packages.map(pkg => (
          <div className="col-md-4 mb-4" key={pkg.id}>
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{pkg.name}</h5>
                <p className="card-text">{pkg.description}</p>
                <p className="card-text"><strong>${pkg.price}</strong></p>
                <button className="btn btn-success">Book Now</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

PackageList.propTypes = {
  // No props for now
};

export default PackageList;

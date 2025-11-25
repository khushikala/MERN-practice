import React, { useState, useEffect, Suspense } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:5000/products/${id}`);
        setProduct(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch product details');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        <h2>{product.name}</h2>
        <p>Price: Rs.{product.price}</p>
        <p>Category: {product.category}</p>
        <p>Description: {product.description}</p>
        <Link to="/" className="btn btn-secondary">Back to List</Link>
      </div>
    </Suspense>
  );
};

export default ProductDetail;

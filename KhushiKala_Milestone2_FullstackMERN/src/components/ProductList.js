import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import ProductCard from './ProductCard';

class ProductList extends Component {
  render() {
    const { products, loading, error } = this.props;

    if (loading) return <div className="text-center">Loading...</div>;
    if (error) return <div className="alert alert-danger">{error}</div>;

    return (
      <div>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Product List</h2>
          <Link to="/add-product" className="btn btn-success">Add Product</Link>
        </div>
        <div className="row">
          {products.map(product => (
            <div className="col-md-4 mb-4" key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default function ProductListWithContext() {
  const contextProps = useProducts();
  return <ProductList {...contextProps} />;
}

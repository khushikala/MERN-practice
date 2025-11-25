import React, { Suspense } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './components/ProductList';
const ProductDetail = React.lazy(() => import('./components/ProductDetail'));
import AddProduct from './components/AddProduct';
import { ProductProvider } from './context/ProductContext';

function App() {
  return (
    <ProductProvider>
      <Router>
        <div className="container mt-4">
          <h1 className="text-center mb-4">Product Dashboard</h1>
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/product/:id" element={<Suspense fallback={<div>Loading...</div>}><ProductDetail /></Suspense>} />
            <Route path="/add-product" element={<AddProduct />} />
          </Routes>
        </div>
      </Router>
    </ProductProvider>
  );
}

export default App;

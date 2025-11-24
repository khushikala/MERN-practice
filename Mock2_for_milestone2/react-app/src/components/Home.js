import React from 'react';
import ProductCard from './ProductCard';
import LoginForm from './LoginForm';
import UserStatus from './UserStatus';
import ResponsiveComponent from './ResponsiveComponent';
import FormikLoginForm from './FormikLoginForm';

function Home() {
  return (
    <div>
      <h1>ShopNow</h1>
      <ProductCard title="Laptop" price={1000} discount={100} />
      <LoginForm />
      <UserStatus userId={123} />
      <ResponsiveComponent />
      <FormikLoginForm />
    </div>
  );
}

export default Home;

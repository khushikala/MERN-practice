import React, { useState } from 'react';
import Header from './Header';
import DestinationCard from './DestinationCard';
import Footer from './Footer';
import 'bootstrap/dist/css/bootstrap.min.css';

function Home() {
  const [wishlist, setWishlist] = useState([]);

  const destinations = [
    { id: 1, name: 'Paris', image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1120/300x200?text=Paris', description: 'City of Light' },
    { id: 2, name: 'Tokyo', image: 'https://images.unsplash.com/photo-1513407030348-c983a97b98d8?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1172/300x200?text=Tokyo', description: 'Modern city' },
    { id: 3, name: 'New York', image: 'https://images.unsplash.com/photo-1499092346589-b9b6be3e94b2?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1171https://plus.unsplash.com/premium_photo-1672082422409-879d79636902?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=765/300x200?text=New+York', description: 'The Big Apple' },
  ];

  const addToWishlist = (id) => {
    if (!wishlist.includes(id)) {
      setWishlist([...wishlist, id]);
      alert(`${destinations.find(d => d.id === id).name} added to wishlist!`);
    }
  };

  return (
    <div className="App">
      <Header />
      <div className="container my-4">
        <h1 className="text-center mb-4">Featured Destinations</h1>
        <div className="row">
          {destinations.map(dest => (
            <div className="col-md-4 mb-4" key={dest.id}>
              <DestinationCard {...dest} onAddToWishlist={addToWishlist} />
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;

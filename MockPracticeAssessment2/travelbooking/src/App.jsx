import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { BookingProvider } from './BookingContext';
import ErrorBoundary from './ErrorBoundary';
import Home from './Home';
import PackageList from './PackageList';
import BookingForm from './BookingForm';
import BookingDashboard from './BookingDashboard';
import Contact from './Contact';
import './App.css';

function App() {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <BookingProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/packages" element={<PackageList />} />
              <Route path="/booking" element={<BookingForm />} />
              <Route path="/dashboard" element={<BookingDashboard />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </Router>
        </BookingProvider>
      </Provider>
    </ErrorBoundary>
  );
}

export default App;

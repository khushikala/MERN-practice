import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateBookingStatus } from './bookingSlice';

function BookingDashboard() {
  const bookings = useSelector(state => state.booking.bookings);
  const dispatch = useDispatch();

  const handleStatusChange = (id, status) => {
    dispatch(updateBookingStatus({ id, status }));
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Booking Status Dashboard</h1>
      <div className="row">
        {bookings.map(booking => (
          <div className="col-md-4 mb-4" key={booking.id}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{booking.name}</h5>
                <p className="card-text">Email: {booking.email}</p>
                <p className="card-text">Package: {booking.packageId}</p>
                <p className="card-text">Status: {booking.status || 'Pending'}</p>
                <select
                  className="form-control"
                  value={booking.status || 'Pending'}
                  onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookingDashboard;

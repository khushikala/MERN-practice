import { createSlice } from '@reduxjs/toolkit';

const bookingSlice = createSlice({
  name: 'booking',
  initialState: {
    bookings: [],
    status: 'idle', // idle, loading, succeeded, failed
  },
  reducers: {
    addBooking: (state, action) => {
      state.bookings.push(action.payload);
    },
    updateBookingStatus: (state, action) => {
      const { id, status } = action.payload;
      const booking = state.bookings.find(b => b.id === id);
      if (booking) {
        booking.status = status;
      }
    },
  },
});

export const { addBooking, updateBookingStatus } = bookingSlice.actions;
export default bookingSlice.reducer;

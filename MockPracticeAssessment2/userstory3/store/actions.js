// Redux actions for User Story 3
export const ADD_BOOKING = 'ADD_BOOKING';
export const UPDATE_BOOKING_STATUS = 'UPDATE_BOOKING_STATUS';

export const addBooking = (booking) => ({
  type: ADD_BOOKING,
  payload: booking,
});

export const updateBookingStatus = (id, status) => ({
  type: UPDATE_BOOKING_STATUS,
  payload: { id, status },
});

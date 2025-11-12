// Redux reducers for User Story 3
import { ADD_BOOKING, UPDATE_BOOKING_STATUS } from './actions';

const initialState = {
  bookings: [],
  status: 'idle',
};

const bookingReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BOOKING:
      return {
        ...state,
        bookings: [...state.bookings, action.payload],
      };
    case UPDATE_BOOKING_STATUS:
      return {
        ...state,
        bookings: state.bookings.map(booking =>
          booking.id === action.payload.id
            ? { ...booking, status: action.payload.status }
            : booking
        ),
      };
    default:
      return state;
  }
};

export default bookingReducer;

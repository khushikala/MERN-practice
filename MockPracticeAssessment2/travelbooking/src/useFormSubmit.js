import { useBooking } from './BookingContext';
import { useDispatch } from 'react-redux';
import { addBooking } from './bookingSlice';

const useFormSubmit = () => {
  const { addBooking: contextAdd } = useBooking();
  const dispatch = useDispatch();

  const submitBooking = (values) => {
    contextAdd(values);
    dispatch(addBooking(values));
    // Additional logic like API call
    return Promise.resolve();
  };

  return submitBooking;
};

export default useFormSubmit;

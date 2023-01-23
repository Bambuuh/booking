import {useContext} from 'react';
import {BookingContext} from './bookingContext';

export const useBookingContext = () => {
  const context = useContext(BookingContext);

  return context;
};

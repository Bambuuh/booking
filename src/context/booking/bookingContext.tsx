import React, {createContext, ReactNode, useState} from 'react';

type Booking = {
  userId: string;
  timeSlot: number;
};

type BookingsContextValue = {
  bookings: Booking[];
  addBooking: () => void;
};

export const BookingContext = createContext<BookingsContextValue>({
  bookings: [],
  addBooking: () => null,
});

type BookingProviderProps = {
  children: ReactNode;
};

export const BookingProvider = ({children}: BookingProviderProps) => {
  const [bookings, setBookings] = useState<Booking[]>([]);

  const addBooking = () => {
    const newBooking: Booking = {
      userId: '123',
      timeSlot: 123,
    };
    setBookings([...bookings, newBooking]);
  };

  return (
    <BookingContext.Provider value={{bookings, addBooking}}>
      {children}
    </BookingContext.Provider>
  );
};

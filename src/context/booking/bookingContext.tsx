import React, {createContext, ReactNode, useState} from 'react';
import {getPrettyDate} from '../../utils';

type MachineNumber = 1 | 2;

export type Booking = {
  machine: MachineNumber;
  startTime: Date;
  endTime: Date;
};

type AvailableBooking = {
  machine: MachineNumber;
  startTime: Date;
  endTime: Date;
};

type BookingsContextValue = {
  bookings: BookingMap;
  addBooking: (date: Date, newBooking: Booking) => void;
  getBookingsForDay: (date: Date) => AvailableBooking[];
};

type BookingMap = {
  [date: string]: Booking[];
};

export const BookingContext = createContext<BookingsContextValue>({
  bookings: {},
  addBooking: () => null,
  getBookingsForDay: () => [],
});

type BookingProviderProps = {
  children: ReactNode;
};

export const BookingProvider = ({children}: BookingProviderProps) => {
  const [bookings, setBookings] = useState<BookingMap>({});

  const getBookingsForDay = (date: Date) => {
    const prettyDate = getPrettyDate(date);
    const allBookingsForDay = bookings[prettyDate];
    return allBookingsForDay || [];
  };

  const addBooking = (date: Date, newBooking: Booking) => {
    const prettyDate = getPrettyDate(date);
    const oldDateBookings = bookings[prettyDate] ?? [];
    setBookings({...bookings, [prettyDate]: [...oldDateBookings, newBooking]});
  };

  return (
    <BookingContext.Provider value={{bookings, addBooking, getBookingsForDay}}>
      {children}
    </BookingContext.Provider>
  );
};

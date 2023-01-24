import React, {createContext, ReactNode, useState} from 'react';
import {getPrettyDate} from '../../utils';

export type Booking = {
  id: number;
  machine: number;
  startTime: Date;
  endTime: Date;
};

type AvailableBooking = {
  machine: number;
  startTime: Date;
  endTime: Date;
};

type BookingsContextValue = {
  bookings: BookingMap;
  addBooking: (date: Date, newBooking: Omit<Booking, 'id'>) => number;
  getBookingsForDay: (date: Date) => AvailableBooking[];
  getBookingById: (bookingId: number) => Booking | null;
};

type BookingMap = {
  [date: string]: Booking[];
};

export const BookingContext = createContext<BookingsContextValue>({
  bookings: {},
  addBooking: () => 0,
  getBookingsForDay: () => [],
  getBookingById: () => null,
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

  const isTimeTaken = (newBooking: Omit<Booking, 'id'>) => {
    const dailyBookings = getBookingsForDay(newBooking.startTime);
    const start = newBooking.startTime.getTime();
    const end = newBooking.endTime.getTime();
    return dailyBookings.some(booking => {
      const bookingStart = booking.startTime.getTime();
      const bookingEnd = booking.endTime.getTime();
      return (
        (start > bookingStart && start < bookingEnd) ||
        (bookingStart > start && bookingStart < end)
      );
    });
  };

  const addBooking = (date: Date, newBooking: Omit<Booking, 'id'>) => {
    const isNotAvailable = isTimeTaken(newBooking);

    if (isNotAvailable) {
      return -1;
    }

    const prettyDate = getPrettyDate(date);
    const oldDateBookings = bookings[prettyDate] ?? [];
    const id = new Date().getTime();
    const finalBooking: Booking = {...newBooking, id};

    setBookings({
      ...bookings,
      [prettyDate]: [...oldDateBookings, finalBooking],
    });

    return id;
  };

  const getBookingById = (bookingId: number) => {
    let finalBooking: Booking | null = null;
    Object.keys(bookings).some(key => {
      const booking = bookings[key].find(b => b.id === bookingId);
      if (booking) {
        finalBooking = booking;
        return true;
      }
    });

    return finalBooking;
  };

  return (
    <BookingContext.Provider
      value={{bookings, addBooking, getBookingsForDay, getBookingById}}>
      {children}
    </BookingContext.Provider>
  );
};

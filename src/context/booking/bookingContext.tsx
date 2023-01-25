import React, {createContext, ReactNode, useState} from 'react';
import {getPrettyDate} from '../../utils';

export type RoomNumber = 1 | 2;

export type Booking = {
  id: number;
  room: RoomNumber;
  startTime: Date;
  endTime: Date;
};

export type NewBooking = Omit<Booking, 'id'>;

export type BookingListItem = {
  startTime: Date;
  endTime: Date;
  roomOneBooked: boolean;
  roomTwoBooked: boolean;
};

type AvailableBooking = {
  room: number;
  startTime: Date;
  endTime: Date;
};

type BookingsContextValue = {
  bookings: BookingMap;
  addBooking: (newBooking: NewBooking) => number;
  getBookingsForDay: (date: Date) => AvailableBooking[];
  getBookingById: (bookingId: number) => Booking | null;
  removeBookingByDateAndId: (date: Date, id: number) => void;
  getBookingsByDate: (date: Date) => BookingListItem[];
  getFirstAvailableBookingDate: (date: Date) => Date;
};

type BookingMap = {
  [date: string]: Booking[];
};

export const BookingContext = createContext<BookingsContextValue>({
  bookings: {},
  addBooking: () => 0,
  getBookingsForDay: () => [],
  getBookingById: () => null,
  removeBookingByDateAndId: () => null,
  getBookingsByDate: () => [],
  getFirstAvailableBookingDate: () => {
    return new Date();
  },
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

  const getBookingsByDate = (date: Date) => {
    const bookingsForDate = getBookingsForDay(date);

    const dailyBookings: BookingListItem[] = [];
    let startTime = new Date(date);
    let endTime = new Date(date);

    startTime.setHours(7);
    startTime.setMinutes(0);
    startTime.setSeconds(0);

    endTime.setHours(10);
    endTime.setMinutes(0);
    endTime.setSeconds(0);

    for (let i = 0; i < 5; i++) {
      const roomOneBooked = bookingsForDate.some(
        b => b.room === 1 && b.startTime.getHours() === startTime.getHours(),
      );
      const roomTwoBooked = bookingsForDate.some(
        b => b.room === 2 && b.startTime.getHours() === startTime.getHours(),
      );
      dailyBookings.push({
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        roomOneBooked,
        roomTwoBooked,
      });
      startTime.setHours(startTime.getHours() + 3);
      endTime.setHours(endTime.getHours() + 3);
    }

    return dailyBookings;
  };

  const getFirstAvailableBookingDate = (dateToUse: Date): Date => {
    const date = new Date(dateToUse);
    const dailyBookings = getBookingsByDate(date);
    const isAnyBookingFree = dailyBookings.some(
      booking => !booking.roomOneBooked || !booking.roomTwoBooked,
    );

    if (isAnyBookingFree) {
      return date;
    }

    date.setDate(date.getDate() + 1);
    return getFirstAvailableBookingDate(date);
  };

  const addBooking = (newBooking: NewBooking) => {
    const prettyDate = getPrettyDate(newBooking.startTime);
    const oldDateBookings = bookings[prettyDate] ?? [];
    const id = new Date().getTime();
    const finalBooking: Booking = {...newBooking, id};

    setBookings({
      ...bookings,
      [prettyDate]: [...oldDateBookings, finalBooking],
    });

    return id;
  };

  const removeBookingByDateAndId = (date: Date, id: number) => {
    const prettyDate = getPrettyDate(date);
    const dateBookings = bookings[prettyDate];
    const filteredBookings = dateBookings.filter(b => b.id !== id);
    setBookings({...bookings, [prettyDate]: filteredBookings});
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
      value={{
        bookings,
        addBooking,
        getBookingsForDay,
        getBookingById,
        removeBookingByDateAndId,
        getFirstAvailableBookingDate,
        getBookingsByDate,
      }}>
      {children}
    </BookingContext.Provider>
  );
};

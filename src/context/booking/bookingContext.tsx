import React, {createContext, ReactNode, useState} from 'react';
import {getPrettyDate} from '../../utils';

export type Booking = {
  id: number;
  room: 1 | 2;
  startTime: Date;
  endTime: Date;
};

export type NewBooking = Omit<Booking, 'id' | 'room'>;

type AvailableBooking = {
  room: number;
  startTime: Date;
  endTime: Date;
};

type BookingsContextValue = {
  bookings: BookingMap;
  addBooking: (date: Date, newBooking: NewBooking) => number;
  getBookingsForDay: (date: Date) => AvailableBooking[];
  getBookingById: (bookingId: number) => Booking | null;
  removeBookingByDateAndId: (date: Date, id: number) => void;
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

  const isRoomBusy = (
    newBooking: NewBooking,
    bookingsList: Booking[],
    room: number,
  ) => {
    const start = newBooking.startTime.getTime();
    const end = newBooking.endTime.getTime();

    return bookingsList.some(booking => {
      const bookingStart = booking.startTime.getTime();
      const bookingEnd = booking.endTime.getTime();
      const bookingRoom = booking.room;

      const isRightRoom = bookingRoom === room;
      const startIsOverlapping = start >= bookingStart && start < bookingEnd;
      const endIsOverlapping = bookingStart >= start && bookingStart < end;

      return isRightRoom && (startIsOverlapping || endIsOverlapping);
    });
  };

  const getAvailableRoom = (newBooking: NewBooking) => {
    const dailyBookings = getBookingsForDay(newBooking.startTime);
    const bookingsRoomOne = dailyBookings.filter(b => b.room === 1);
    const bookingsRoomTwo = dailyBookings.filter(b => b.room === 2);

    const isRoomOneBusy = isRoomBusy(newBooking, bookingsRoomOne, 1);
    const isRoomTwoBusy = isRoomBusy(newBooking, bookingsRoomTwo, 2);

    if (isRoomOneBusy && isRoomTwoBusy) {
      return -1;
    } else if (!isRoomOneBusy) {
      return 1;
    }
    return 2;
  };

  const addBooking = (date: Date, newBooking: NewBooking) => {
    const availableRoom = getAvailableRoom(newBooking);

    if (availableRoom === -1) {
      return -1;
    }

    const prettyDate = getPrettyDate(date);
    const oldDateBookings = bookings[prettyDate] ?? [];
    const id = new Date().getTime();
    const finalBooking: Booking = {...newBooking, room: availableRoom, id};

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
      }}>
      {children}
    </BookingContext.Provider>
  );
};

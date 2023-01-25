import React, {useMemo, useState} from 'react';
import {
  BookingListItem,
  RoomNumber,
  useBookingContext,
} from '../../context/booking';
import {BookingScreenContent} from './BookingScreenContent';
import {BookingRequestItem} from './types';

type BookingScreenDataProps = {
  navigateToBookingPrompt: (booking: BookingRequestItem) => void;
};

export const BookingScreenData = ({
  navigateToBookingPrompt,
}: BookingScreenDataProps) => {
  const {getBookingsByDate, getFirstAvailableBookingDate} = useBookingContext();
  const [date, setDate] = useState(getFirstAvailableBookingDate(new Date()));

  const dateBookings = useMemo(
    () => getBookingsByDate(date),
    [getBookingsByDate, date],
  );

  const onPressBooking = (roomNumber: RoomNumber, booking: BookingListItem) => {
    const bookingRequest: BookingRequestItem = {
      startTime: booking.startTime.getTime(),
      endTime: booking.endTime.getTime(),
      room: roomNumber,
    };
    navigateToBookingPrompt(bookingRequest);
  };

  return (
    <BookingScreenContent
      bookings={dateBookings}
      date={date}
      onChangeDate={setDate}
      onPressBooking={onPressBooking}
    />
  );
};

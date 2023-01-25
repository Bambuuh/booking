import React, {useMemo, useState} from 'react';
import {useBookingContext} from '../../context/booking';
import {getPrettyDate} from '../../utils';
import {ListBookingsScreenContent} from './ListBookingsScreenContent';

export const ListBookingsScreenData = () => {
  const [date, setDate] = useState(new Date());
  const {bookings, removeBookingByDateAndId} = useBookingContext();

  const onPressRemove = (bookingId: number) => {
    removeBookingByDateAndId(date, bookingId);
  };

  const filteredBookings = useMemo(() => {
    const prettyDate = getPrettyDate(date);
    return (bookings[prettyDate] || []).sort(
      (a, b) => a.startTime.getTime() - b.startTime.getTime(),
    );
  }, [bookings, date]);

  return (
    <ListBookingsScreenContent
      date={date}
      bookings={filteredBookings}
      onPressRemove={onPressRemove}
      onChangeDate={setDate}
    />
  );
};

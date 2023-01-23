import React, {useMemo} from 'react';
import styled from 'styled-components/native';
import {BookingItem} from '../../components/BookingItem';
import {useBookingContext} from '../../context/booking';
import {theme} from '../../theme';
import {getPrettyDate} from '../../utils';

export const ListBookingsScreen = () => {
  const {bookings} = useBookingContext();

  const todaysBookings = useMemo(() => {
    const prettyDate = getPrettyDate(new Date());
    return bookings[prettyDate] || [];
  }, [bookings]);

  return (
    <Container>
      {todaysBookings.map(booking => (
        <BookingItem booking={booking} key={booking.startTime.getTime()} />
      ))}
    </Container>
  );
};

const Container = styled.View`
  justify-content: center;
  padding: ${() => `${theme.screenPadding}px`};
`;

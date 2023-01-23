import React, {useMemo, useState} from 'react';
import styled from 'styled-components/native';
import {Spacing} from '../../components';
import {BookingItem} from '../../components/BookingItem';
import {DatePicker} from '../../components/DatePicker';
import {useBookingContext} from '../../context/booking';
import {theme} from '../../theme';
import {getPrettyDate} from '../../utils';

export const ListBookingsScreen = () => {
  const [date, setDate] = useState(new Date());
  const {bookings} = useBookingContext();

  const todaysBookings = useMemo(() => {
    const prettyDate = getPrettyDate(date);
    return bookings[prettyDate] || [];
  }, [bookings, date]);

  return (
    <Container>
      <Spacing height={16} />
      <DatePicker date={date} onChange={setDate} />
      <Spacing height={32} />
      {todaysBookings.map((booking, index) => (
        <BookingItemContainer key={booking.startTime.getTime()}>
          <BookingItem booking={booking} />
          {index < todaysBookings.length && <Spacing height={4} />}
        </BookingItemContainer>
      ))}
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  align-items: center;
  padding: ${() => `${theme.screenPadding}px`};
`;

const BookingItemContainer = styled.View`
  align-self: stretch;
`;

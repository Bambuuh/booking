import React, {useMemo, useState} from 'react';
import {Text} from 'react-native';
import styled from 'styled-components/native';
import {Spacing} from '../../components';
import {BookingItem} from '../../components/BookingItem';
import {DatePicker} from '../../components/DatePicker';
import {useBookingContext} from '../../context/booking';
import {theme} from '../../theme';
import {getPrettyDate} from '../../utils';

export const ListBookingsScreen = () => {
  const [date, setDate] = useState(new Date());
  const {bookings, removeBookingByDateAndId} = useBookingContext();

  const todaysBookings = useMemo(() => {
    const prettyDate = getPrettyDate(date);
    return (bookings[prettyDate] || []).sort(
      (a, b) => a.startTime.getTime() - b.startTime.getTime(),
    );
  }, [bookings, date]);

  const onPressRemove = (bookingId: number) => {
    removeBookingByDateAndId(date, bookingId);
  };

  return (
    <Container>
      <Spacing height={16} />

      <DatePickerContainer>
        <Text>Select date:</Text>
        <Spacing height={8} />
        <DatePicker date={date} onChange={setDate} />
      </DatePickerContainer>
      <Spacing height={32} />
      {todaysBookings.map((booking, index) => (
        <BookingItemContainer
          key={`${booking.startTime.getTime()}-${booking.room}`}>
          <BookingItem
            isFirst={index === 0}
            isLast={index === todaysBookings.length - 1}
            isSolo={todaysBookings.length === 1}
            onPressRemove={onPressRemove}
            booking={booking}
          />
          {index < todaysBookings.length && <Spacing height={1} />}
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

const DatePickerContainer = styled.View`
  width: 180px;
  justify-content: space-between;
  align-items: center;
`;

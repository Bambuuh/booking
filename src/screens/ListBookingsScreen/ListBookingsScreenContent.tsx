import React from 'react';
import {Text} from 'react-native';
import styled from 'styled-components/native';
import {Spacing} from '../../components';
import {BookingItem} from '../../components/BookingItem';
import {DatePicker} from '../../components/DatePicker';
import {Booking} from '../../context/booking';
import {theme} from '../../theme';

type ListBookingsScreenContentProps = {
  bookings: Booking[];
  date: Date;
  onPressRemove: (id: number) => void;
  onChangeDate: (date: Date) => void;
};

export const ListBookingsScreenContent = ({
  bookings,
  date,
  onPressRemove,
  onChangeDate,
}: ListBookingsScreenContentProps) => {
  return (
    <Container>
      <Spacing height={16} />
      <DatePickerContainer>
        <Text>Select date:</Text>
        <Spacing height={8} />
        <DatePicker date={date} onChange={onChangeDate} />
      </DatePickerContainer>
      <Spacing height={32} />
      {bookings.map((booking, index) => (
        <BookingItemContainer
          key={`${booking.startTime.getTime()}-${booking.room}`}>
          <BookingItem
            isFirst={index === 0}
            isLast={index === bookings.length - 1}
            isSolo={bookings.length === 1}
            onPressRemove={onPressRemove}
            booking={booking}
          />
          {index < bookings.length && <Spacing height={1} />}
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

import React from 'react';
import {Text} from 'react-native';
import styled from 'styled-components/native';
import {Spacing} from '../../components';
import {DatePicker} from '../../components/DatePicker';
import {NewBookingItem} from '../../components/NewBookingItem';
import {BookingListItem, RoomNumber} from '../../context/booking';
import {theme} from '../../theme';

type BookingScreenContentProps = {
  date: Date;
  bookings: BookingListItem[];
  onChangeDate: (date: Date) => void;
  onPressBooking: (roomnumber: RoomNumber, booking: BookingListItem) => void;
};

export const BookingScreenContent = ({
  onChangeDate,
  onPressBooking,
  bookings,
  date,
}: BookingScreenContentProps) => {
  return (
    <Container>
      <Spacing height={12} />
      <DatePickerContainer>
        <Text>Select date:</Text>
        <Spacing height={8} />
        <DatePicker date={date} onChange={onChangeDate} />
      </DatePickerContainer>
      <Spacing height={32} />
      {bookings.map((booking, index) => {
        const onPressRoom = (roomNumber: RoomNumber) =>
          onPressBooking(roomNumber, booking);
        return (
          <NewBookingContainer key={booking.startTime.getTime()}>
            <NewBookingItem
              isFirst={index === 0}
              isLast={index === bookings.length - 1}
              isSolo={bookings.length === 1}
              onPressRoom={onPressRoom}
              booking={booking}
            />
            {index < bookings.length - 1 && <Spacing height={1} />}
          </NewBookingContainer>
        );
      })}
    </Container>
  );
};

const Container = styled.View`
  padding: ${() => `${theme.screenPadding}px`};
  align-items: center;
  flex: 1;
`;

const DatePickerContainer = styled.View`
  width: 180px;
  justify-content: space-between;
  align-items: center;
`;

const NewBookingContainer = styled.View`
  align-self: stretch;
`;

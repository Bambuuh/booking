import {NavigationProp, useNavigation} from '@react-navigation/native';
import React, {useMemo, useState} from 'react';
import {Text} from 'react-native';
import styled from 'styled-components/native';
import {Spacing} from '../../components';
import {DatePicker} from '../../components/DatePicker';
import {NewBookingItem} from '../../components/NewBookingItem';
import {NewBooking, useBookingContext} from '../../context/booking';
import {MainStackParamsList, ROUTE} from '../../navigation';
import {theme} from '../../theme';

export const BookingScreen = () => {
  const navigation = useNavigation<NavigationProp<MainStackParamsList>>();
  const {addBooking, getBookingsByDate, getFirstAvailableBookingDate} =
    useBookingContext();
  const [date, setDate] = useState(getFirstAvailableBookingDate(new Date()));

  const todaysBookings = useMemo(
    () => getBookingsByDate(date),
    [getBookingsByDate, date],
  );

  const onChangeDate = (newDate: Date) => {
    setDate(newDate);
  };

  return (
    <Container>
      <Spacing height={12} />
      <DatePickerContainer>
        <Text>Select date:</Text>
        <Spacing height={8} />
        <DatePicker date={date} onChange={onChangeDate} />
      </DatePickerContainer>
      <Spacing height={32} />
      {todaysBookings.map((booking, index) => {
        const onPressRoom = (roomNumber: 1 | 2) => {
          console.log(booking);
          const newBooking: NewBooking = {
            startTime: booking.startTime,
            endTime: booking.endTime,
            room: roomNumber,
          };
          const id = addBooking(newBooking);
          navigation.navigate(ROUTE.BOOKING_SUCCESS, {bookingId: id});
        };

        return (
          <NewBookingContainer key={booking.startTime.getTime()}>
            <NewBookingItem onPressRoom={onPressRoom} booking={booking} />
            {index < todaysBookings.length - 1 && <Spacing height={8} />}
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

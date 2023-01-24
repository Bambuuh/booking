import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import React from 'react';
import styled from 'styled-components/native';
import {Button, Spacing} from '../../components';
import {NewBooking, useBookingContext} from '../../context/booking';
import {MainStackParamsList, ROUTE} from '../../navigation';
import {getPrettyDate, getPrettyTime} from '../../utils';

export const BookingSuccess = () => {
  const navigation = useNavigation();

  const {
    params: {booking},
  } = useRoute<RouteProp<MainStackParamsList, ROUTE.BOOKING_PROMPT>>();
  const {addBooking} = useBookingContext();

  if (!booking) {
    return <Title>Something went wrong</Title>;
  }

  const startTime = new Date(booking.startTime);
  const endTime = new Date(booking.endTime);

  const onPressCancel = () => {
    navigation.goBack();
  };

  const onPressConfirm = () => {
    const finalBooking: NewBooking = {
      room: booking.room,
      startTime: new Date(booking.startTime),
      endTime: new Date(booking.endTime),
    };
    addBooking(finalBooking);
    navigation.goBack();
  };

  return (
    <Container>
      <Title>Confirm your booking</Title>
      <Spacing height={16} />
      <RowContainer>
        <DateText>Room:</DateText>
        <DateText>{booking.room}</DateText>
      </RowContainer>
      <Spacing height={8} />
      <RowContainer>
        <DateText>Date:</DateText>
        <DateText>{getPrettyDate(startTime)}</DateText>
      </RowContainer>
      <Spacing height={8} />
      <RowContainer>
        <DateText>Time:</DateText>
        <DateText>
          {getPrettyTime(startTime)} - {getPrettyTime(endTime)}
        </DateText>
      </RowContainer>
      <Spacing height={32} />
      <Button variant="success" title="Confirm" onPress={onPressConfirm} />
      <Spacing height={8} />
      <Button variant="error" title="Cancel" onPress={onPressCancel} />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const RowContainer = styled.View`
  width: 180px;
  flex-direction: row;
  justify-content: space-between;
`;

const Title = styled.Text`
  font-weight: 500;
  font-size: 24px;
`;

const DateText = styled.Text`
  font-size: 18px;
  font-weight: 500;
`;

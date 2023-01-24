import React from 'react';
import styled from 'styled-components/native';
import {Booking} from '../../context/booking';
import {getPrettyTime} from '../../utils';

type BookingItemProps = {
  booking: Booking;
  onPressRemove: (id: number) => void;
};

export const BookingItem = ({booking, onPressRemove}: BookingItemProps) => {
  const onPressRemoveButton = () => {
    onPressRemove(booking.id);
  };

  return (
    <Container>
      <Title>Start: {getPrettyTime(booking.startTime)}</Title>
      <Title>End: {getPrettyTime(booking.endTime)}</Title>
      <Title>Room: {booking.room}</Title>
      <RemoveButton onPress={onPressRemoveButton}>
        <RemoveButtonImage source={require('./remove.png')} />
      </RemoveButton>
    </Container>
  );
};

const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  height: 52px;
  background-color: #fff;
  border-color: #2980b9;
  border-width: 1px;
  border-radius: 12px;
  padding-left: 16px;
`;

const Title = styled.Text``;

const RemoveButton = styled.TouchableOpacity`
  background-color: #e74c3c;
  height: 50px;
  width: 50px;
  align-items: center;
  justify-content: center;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
`;

const RemoveButtonImage = styled.Image`
  height: 24px;
  width: 24px;
  background-color: transparent;
`;

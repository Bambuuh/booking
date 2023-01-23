import {useNavigation} from '@react-navigation/native';
import React from 'react';
import styled from 'styled-components/native';
import {Booking} from '../../context/booking';
import {getPrettyTime} from '../../utils';
import {Spacing} from '../common';

type BookingItemProps = {
  booking: Booking;
};

export const BookingItem = ({booking}: BookingItemProps) => {
  const navigation = useNavigation();

  navigation.setOptions({
    title: 'Bookings',
  });

  return (
    <Container>
      <LeftSide>
        <Title>Start time: {getPrettyTime(booking.startTime)}</Title>
        <Spacing height={4} />
        <Title>End time: {getPrettyTime(booking.endTime)}</Title>
      </LeftSide>
      <Title>Machine: {booking.machine}</Title>
    </Container>
  );
};

const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  height: 52px;
  background-color: #9b59b6;
  border-radius: 4px;
  padding: 0 16px 0 16px;
`;

const LeftSide = styled.View``;

const Title = styled.Text`
  color: #fff;
`;

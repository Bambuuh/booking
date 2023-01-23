import {useNavigation} from '@react-navigation/native';
import React from 'react';
import styled from 'styled-components/native';
import {Booking} from '../../context/booking';
import {getPrettyDate} from '../../utils';

type BookingItemProps = {
  booking: Booking;
};

export const BookingItem = ({booking}: BookingItemProps) => {
  const currentDate = new Date();
  const navigation = useNavigation();

  navigation.setOptions({
    title: getPrettyDate(currentDate),
  });

  return (
    <Container>
      <Title>{booking.startTime.getTime()}</Title>
    </Container>
  );
};

const Container = styled.View`
  justify-content: center;
  align-self: stretch;
  height: 52px;
  background-color: #9b59b6;
  border-radius: 4px;
  padding: 0 16px 0 16px;
`;

const Title = styled.Text`
  color: #fff;
`;

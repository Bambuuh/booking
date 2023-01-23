import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import React, {useMemo} from 'react';
import styled from 'styled-components/native';
import {Button, Spacing} from '../../components';
import {useBookingContext} from '../../context/booking';
import {MainStackParamsList, ROUTE} from '../../navigation';
import {getPrettyDateWithTime} from '../../utils';

export const BookingSuccess = () => {
  const navigation = useNavigation();

  const {
    params: {bookingId},
  } = useRoute<RouteProp<MainStackParamsList, ROUTE.BOOKING_SUCCESS>>();
  const {getBookingById} = useBookingContext();

  const booking = useMemo(() => {
    return getBookingById(bookingId);
  }, [bookingId, getBookingById]);

  if (!booking) {
    return <Title>Something went wrong</Title>;
  }

  const onPressClose = () => {
    navigation.goBack();
  };

  return (
    <Container>
      <Title>Booking Successful</Title>
      <Spacing height={16} />
      <DateText>
        Start time: {getPrettyDateWithTime(booking?.startTime)}
      </DateText>
      <DateText>End time: {getPrettyDateWithTime(booking?.endTime)}</DateText>
      <Spacing height={16} />
      <Button title="Close" onPress={onPressClose} />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const Title = styled.Text`
  font-size: 18px;
`;

const DateText = styled.Text``;

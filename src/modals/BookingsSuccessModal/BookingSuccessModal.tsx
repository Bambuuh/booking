import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import React, {useMemo} from 'react';
import styled from 'styled-components/native';
import {Button, Spacing} from '../../components';
import {useBookingContext} from '../../context/booking';
import {MainStackParamsList, ROUTE} from '../../navigation';
import {getPrettyDate, getPrettyTime} from '../../utils';

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
      <RowContainer>
        <DateText>Date:</DateText>
        <DateText>{getPrettyDate(booking?.startTime)}</DateText>
      </RowContainer>
      <Spacing height={8} />
      <RowContainer>
        <DateText>Time:</DateText>
        <DateText>
          {getPrettyTime(booking?.startTime)} - {getPrettyTime(booking.endTime)}
        </DateText>
      </RowContainer>
      <Spacing height={32} />
      <Button title="Close" onPress={onPressClose} />
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

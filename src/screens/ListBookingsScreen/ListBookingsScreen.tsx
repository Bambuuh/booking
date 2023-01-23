import React, {useMemo} from 'react';
import {View} from 'react-native';
import styled from 'styled-components/native';
import {Spacing} from '../../components';
import {BookingItem} from '../../components/BookingItem';
import {useBookingContext} from '../../context/booking';
import {theme} from '../../theme';
import {getPrettyDate} from '../../utils';

export const ListBookingsScreen = () => {
  const {bookings} = useBookingContext();

  const todaysBookings = useMemo(() => {
    const prettyDate = getPrettyDate(new Date());
    return bookings[prettyDate] || [];
  }, [bookings]);

  return (
    <Container>
      {todaysBookings.map((booking, index) => (
        <View key={booking.startTime.getTime()}>
          <BookingItem booking={booking} />
          {index < todaysBookings.length && <Spacing height={4} />}
        </View>
      ))}
    </Container>
  );
};

const Container = styled.View`
  justify-content: center;
  padding: ${() => `${theme.screenPadding}px`};
`;

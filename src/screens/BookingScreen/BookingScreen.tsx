import {NavigationProp, useNavigation} from '@react-navigation/native';
import React, {useContext, useMemo, useState} from 'react';
import styled from 'styled-components/native';
import {Button, Spacing} from '../../components';
import {BookTimeItem} from '../../components/BookTimeItem';
import {Booking, BookingContext} from '../../context/booking/bookingContext';
import {MainStackParamsList} from '../../navigation';
import {theme} from '../../theme';
import {getPrettyDate} from '../../utils';

export const BookingScreen = () => {
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const navigation = useNavigation<NavigationProp<MainStackParamsList>>();
  const {addBooking} = useContext(BookingContext);

  const currentDate = new Date();

  navigation.setOptions({
    title: getPrettyDate(new Date()),
  });

  const minimumStartDate = useMemo(() => new Date(), []);

  const onPressBookTime = () => {
    const newBooking: Booking = {
      endTime,
      machine: 1,
      startTime,
    };

    addBooking(currentDate, newBooking);
  };

  return (
    <Container>
      <BookTimeItem
        date={startTime}
        minimumDate={minimumStartDate}
        onChange={setStartTime}
        title="Start time"
      />
      <Spacing height={8} />
      <BookTimeItem
        minimumDate={startTime}
        date={endTime}
        onChange={setEndTime}
        title="End time"
      />
      <Spacing height={16} />
      <Button title="Book time" onPress={onPressBookTime} />
    </Container>
  );
};

const Container = styled.View`
  padding: ${() => `${theme.screenPadding}px`};
  align-items: center;
  justify-content: center;
  flex: 1;
`;

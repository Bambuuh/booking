import {NavigationProp, useNavigation} from '@react-navigation/native';
import React, {useContext, useMemo, useState} from 'react';
import {Text} from 'react-native';
import styled from 'styled-components/native';
import {Button, Spacing} from '../../components';
import {BookTimeItem} from '../../components/BookTimeItem';
import {DatePicker} from '../../components/DatePicker';
import {BookingContext} from '../../context/booking/bookingContext';
import {MainStackParamsList, ROUTE} from '../../navigation';
import {theme} from '../../theme';

export const BookingScreen = () => {
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [date, setDate] = useState(new Date());
  const navigation = useNavigation<NavigationProp<MainStackParamsList>>();
  const {addBooking} = useContext(BookingContext);

  const minimumStartDate = useMemo(() => new Date(), []);

  const mapDateToTime = (timeToUse: Date) => {
    const newDate = new Date(date);
    newDate.setHours(timeToUse.getHours());
    newDate.setMinutes(timeToUse.getMinutes());
    newDate.setSeconds(0);
    console.log(newDate);
    return newDate;
  };

  const onPressBookTime = () => {
    const finalStartTime = mapDateToTime(startTime);
    const finalEndTime = mapDateToTime(endTime);
    console.log(finalEndTime);
    const newBooking = {
      machine: 1,
      startTime: finalStartTime,
      endTime: finalEndTime,
    };

    const id = addBooking(date, newBooking);
    navigation.navigate(ROUTE.BOOKING_SUCCESS, {bookingId: id});
  };

  return (
    <Container>
      <DatePickerContainer>
        <Text>Date </Text>
        <DatePicker date={date} onChange={setDate} />
      </DatePickerContainer>
      <Spacing height={16} />
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

const DatePickerContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

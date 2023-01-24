import {NavigationProp, useNavigation} from '@react-navigation/native';
import React, {useMemo, useState} from 'react';
import {Alert, Text} from 'react-native';
import styled from 'styled-components/native';
import {Button, Spacing} from '../../components';
import {BookTimeItem} from '../../components/BookTimeItem';
import {DatePicker} from '../../components/DatePicker';
import {NewBooking, useBookingContext} from '../../context/booking';
import {MainStackParamsList, ROUTE} from '../../navigation';
import {theme} from '../../theme';

export const BookingScreen = () => {
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(
    new Date(new Date().setMinutes(new Date().getMinutes() + 30)),
  );
  const [date, setDate] = useState(new Date());
  const navigation = useNavigation<NavigationProp<MainStackParamsList>>();
  const {addBooking} = useBookingContext();

  const minimumStartDate = useMemo(() => {
    const now = new Date();
    const hourSeven = new Date(date);
    hourSeven.setHours(7);
    hourSeven.setMinutes(0);
    hourSeven.setSeconds(0);
    if (now.getTime() > hourSeven.getTime()) {
      return now;
    }
    return hourSeven;
  }, [date]);

  const maximumEndDate = useMemo(() => {
    const hourTwentyTwo = new Date(date);
    hourTwentyTwo.setHours(22);
    hourTwentyTwo.setMinutes(0);
    hourTwentyTwo.setSeconds(0);
    return hourTwentyTwo;
  }, [date]);

  const mapDateToTime = (timeToUse: Date) => {
    const newDate = new Date(date);
    newDate.setHours(timeToUse.getHours());
    newDate.setMinutes(timeToUse.getMinutes());
    newDate.setSeconds(0);
    return newDate;
  };

  const onChangeDate = (newDate: Date) => {
    setDate(newDate);
    const newStartTime = new Date(startTime);
    newStartTime.setFullYear(newDate.getFullYear());
    newStartTime.setDate(newDate.getDate());
    newStartTime.setMonth(newDate.getMonth());
    setStartTime(newStartTime);

    const newEndTime = new Date(endTime);
    newEndTime.setFullYear(newDate.getFullYear());
    newEndTime.setDate(newDate.getDate());
    newEndTime.setMonth(newDate.getMonth());
    setEndTime(newEndTime);
  };

  const onPressBookTime = () => {
    const finalStartTime = mapDateToTime(startTime);
    const finalEndTime = mapDateToTime(endTime);
    const newBooking: NewBooking = {
      startTime: finalStartTime,
      endTime: finalEndTime,
    };

    const id = addBooking(date, newBooking);
    if (id > 0) {
      navigation.navigate(ROUTE.BOOKING_SUCCESS, {bookingId: id});
    } else {
      Alert.alert('time is taken');
    }
  };

  return (
    <Container>
      <DatePickerContainer>
        <Text>Date</Text>
        <DatePicker date={date} onChange={onChangeDate} />
      </DatePickerContainer>
      <Spacing height={8} />
      <BookTimeItem
        date={startTime}
        minimumDate={minimumStartDate}
        maximumDate={maximumEndDate}
        onChange={setStartTime}
        title="Start time"
      />
      <Spacing height={8} />
      <BookTimeItem
        minimumDate={startTime}
        maximumDate={maximumEndDate}
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
  width: 180px;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
`;

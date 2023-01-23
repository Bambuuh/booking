import RNDateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import styled from 'styled-components/native';
import {MainStackParamsList} from '../../navigation';

export const DatePickerModal = () => {
  const [date, setDate] = useState(new Date());
  const navigation = useNavigation<NavigationProp<MainStackParamsList>>();

  navigation.setOptions({
    title: 'Select date',
  });

  const onDateChange = (event: DateTimePickerEvent) => {
    const {
      nativeEvent: {timestamp},
    } = event;
    if (timestamp) {
      setDate(new Date(timestamp));
    }
  };

  return (
    <Container>
      <Title>DATE PICKER</Title>
      <RNDateTimePicker
        is24Hour
        mode="time"
        value={date}
        onChange={onDateChange}
      />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const Title = styled.Text`
  color: #fff;
`;

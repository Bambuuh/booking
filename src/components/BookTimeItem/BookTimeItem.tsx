import RNDateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import React from 'react';
import styled from 'styled-components/native';

type BookTimeItemProps = {
  title: string;
  date: Date;
  minimumDate: Date;
  onChange: (date: Date) => void;
};

export const BookTimeItem = ({
  title,
  date,
  onChange,
  minimumDate,
}: BookTimeItemProps) => {
  const onDateChange = (event: DateTimePickerEvent) => {
    const {
      nativeEvent: {timestamp},
    } = event;
    if (timestamp) {
      onChange(new Date(timestamp));
    }
  };

  return (
    <Container>
      <Title>{title}</Title>
      <RNDateTimePicker
        is24Hour
        minimumDate={minimumDate}
        mode="time"
        value={date}
        onChange={onDateChange}
      />
    </Container>
  );
};

const Container = styled.View`
  width: 180px;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
`;

const Title = styled.Text``;

import RNDateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import React from 'react';

type DatePickerProps = {
  date: Date;
  onChange: (date: Date) => void;
};

export const DatePicker = ({date, onChange}: DatePickerProps) => {
  const onDateChange = (event: DateTimePickerEvent) => {
    const {
      nativeEvent: {timestamp},
    } = event;
    if (timestamp) {
      onChange(new Date(timestamp));
    }
  };
  return (
    <RNDateTimePicker
      minimumDate={new Date()}
      mode="date"
      value={date}
      onChange={onDateChange}
    />
  );
};

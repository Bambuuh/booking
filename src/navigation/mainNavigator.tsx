import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {BookingSuccess} from '../modals/BookingsPromptModal';
import {DatePickerModal} from '../modals/DatePickerModal';
import {BookingScreen, HomeScreen, ListBookingsScreen} from '../screens';
import {ROUTE} from './routeNames';

export type MainStackParamsList = {
  [ROUTE.HOME]: undefined;
  [ROUTE.BOOKING]: undefined;
  [ROUTE.DATE_PICKER]: undefined;
  [ROUTE.LIST_BOOKINGS]: undefined;
  [ROUTE.BOOKING_PROMPT]: {
    booking: {room: 1 | 2; startTime: number; endTime: number};
  };
};

const {Navigator, Screen, Group} =
  createNativeStackNavigator<MainStackParamsList>();

export const MainNavigator = () => {
  return (
    <Navigator>
      <Group>
        <Screen
          options={{title: 'Home'}}
          name={ROUTE.HOME}
          component={HomeScreen}
        />
        <Screen
          options={{title: 'Book laundry time'}}
          name={ROUTE.BOOKING}
          component={BookingScreen}
        />
        <Screen
          options={{title: 'Bookings list'}}
          name={ROUTE.LIST_BOOKINGS}
          component={ListBookingsScreen}
        />
      </Group>
      <Group screenOptions={{presentation: 'modal'}}>
        <Screen name={ROUTE.DATE_PICKER} component={DatePickerModal} />
        <Screen
          options={{headerShown: false}}
          name={ROUTE.BOOKING_PROMPT}
          component={BookingSuccess}
        />
      </Group>
    </Navigator>
  );
};

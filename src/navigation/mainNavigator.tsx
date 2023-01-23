import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {BookingSuccess} from '../modals/BookingsSuccess';
import {DatePicker} from '../modals/DatePicker';
import {BookingScreen, HomeScreen, ListBookingsScreen} from '../screens';
import {ROUTE} from './routeNames';

export type MainStackParamsList = {
  [ROUTE.HOME]: undefined;
  [ROUTE.BOOKING]: undefined;
  [ROUTE.DATE_PICKER]: undefined;
  [ROUTE.LIST_BOOKINGS]: undefined;
  [ROUTE.BOOKING_SUCCESS]: {bookingId: number};
};

const {Navigator, Screen, Group} =
  createNativeStackNavigator<MainStackParamsList>();

export const MainNavigator = () => {
  return (
    <Navigator>
      <Group>
        <Screen name={ROUTE.HOME} component={HomeScreen} />
        <Screen name={ROUTE.BOOKING} component={BookingScreen} />
        <Screen name={ROUTE.LIST_BOOKINGS} component={ListBookingsScreen} />
      </Group>
      <Group screenOptions={{presentation: 'modal'}}>
        <Screen name={ROUTE.DATE_PICKER} component={DatePicker} />
        <Screen
          options={{headerShown: false}}
          name={ROUTE.BOOKING_SUCCESS}
          component={BookingSuccess}
        />
      </Group>
    </Navigator>
  );
};

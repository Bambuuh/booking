import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {BookingScreen, HomeScreen} from '../screens';
import {ROUTE} from './routeNames';

export type MainStackParamsList = {
  [ROUTE.HOME]: undefined;
  [ROUTE.BOOKING]: undefined;
};

const {Navigator, Screen} = createNativeStackNavigator<MainStackParamsList>();

export const MainNavigator = () => {
  return (
    <Navigator>
      <Screen name={ROUTE.HOME} component={HomeScreen} />
      <Screen name={ROUTE.BOOKING} component={BookingScreen} />
    </Navigator>
  );
};

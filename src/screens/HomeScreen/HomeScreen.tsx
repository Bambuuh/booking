import {NavigationProp, useNavigation} from '@react-navigation/native';
import React from 'react';
import {MainStackParamsList, ROUTE} from '../../navigation';
import {HomeScreenContent} from './HomeScreenContent';

export const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp<MainStackParamsList>>();

  const onPressBookATime = () => {
    navigation.navigate(ROUTE.BOOKING);
  };

  const onPressListBookings = () => {
    navigation.navigate(ROUTE.LIST_BOOKINGS);
  };

  return (
    <HomeScreenContent
      onPressBookATime={onPressBookATime}
      onPressListBookings={onPressListBookings}
    />
  );
};

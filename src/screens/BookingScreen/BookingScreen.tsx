import {NavigationProp, useNavigation} from '@react-navigation/native';
import React from 'react';
import {MainStackParamsList, ROUTE} from '../../navigation';
import {BookingScreenData} from './BookingScreenData';
import {BookingRequestItem} from './types';

export const BookingScreen = () => {
  const navigation = useNavigation<NavigationProp<MainStackParamsList>>();

  const navigateToBookingPrompt = (booking: BookingRequestItem) => {
    navigation.navigate(ROUTE.BOOKING_PROMPT, {booking});
  };

  return (
    <BookingScreenData navigateToBookingPrompt={navigateToBookingPrompt} />
  );
};

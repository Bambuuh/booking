/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';

import React from 'react';
import {StatusBar} from 'react-native';
import {BookingProvider} from './context/booking/bookingContext';
import {MainNavigator} from './navigation';

export const App = () => {
  return (
    <BookingProvider>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer
        theme={{
          dark: true,
          colors: {
            background: '#ecf0f1',
            text: 'blcak',
            border: 'black',
            card: '#bdc3c7',
            notification: 'black',
            primary: 'black',
          },
        }}>
        <MainNavigator />
      </NavigationContainer>
    </BookingProvider>
  );
};

export default App;

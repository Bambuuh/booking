/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';

import React from 'react';
import {BookingProvider} from './context/booking/bookingContext';
import {MainNavigator} from './navigation';

export const App = () => {
  return (
    <BookingProvider>
      <NavigationContainer
        theme={{
          dark: true,
          colors: {
            // background: '#2c3e50',
            background: 'white',
            text: '#FFF',
            border: '#ecf0f1',
            card: '#34495e',
            notification: '#FFF',
            primary: '#FFF',
          },
        }}>
        <MainNavigator />
      </NavigationContainer>
    </BookingProvider>
  );
};

export default App;

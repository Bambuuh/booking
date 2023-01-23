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
          colors: {
            background: '#34495e',
          },
        }}>
        <MainNavigator />
      </NavigationContainer>
    </BookingProvider>
  );
};

export default App;

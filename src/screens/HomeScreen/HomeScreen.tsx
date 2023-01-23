import {NavigationProp, useNavigation} from '@react-navigation/native';
import React from 'react';
import styled from 'styled-components/native';
import {Button, Spacing} from '../../components';
import {MainStackParamsList, ROUTE} from '../../navigation';

export const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp<MainStackParamsList>>();

  const onPressBookATime = () => {
    navigation.navigate(ROUTE.BOOKING);
  };

  const onPressListBookings = () => {
    navigation.navigate(ROUTE.LIST_BOOKINGS);
  };

  return (
    <Container>
      <Button title="Book a time" onPress={onPressBookATime} />
      <Spacing height={16} />
      <Button title="List booked times" onPress={onPressListBookings} />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

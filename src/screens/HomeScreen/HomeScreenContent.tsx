import React from 'react';
import styled from 'styled-components/native';
import {Button, Spacing} from '../../components';

type HomeScreenProps = {
  onPressBookATime: () => void;
  onPressListBookings: () => void;
};

export const HomeScreenContent = ({
  onPressBookATime,
  onPressListBookings,
}: HomeScreenProps) => {
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

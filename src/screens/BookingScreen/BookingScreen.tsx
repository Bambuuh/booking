import React from 'react';
import styled from 'styled-components/native';

export const BookingScreen = () => {
  return (
    <Container>
      <Title>BOOKIN</Title>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const Title = styled.Text`
  color: white;
`;

import React from 'react';
import styled from 'styled-components/native';

type ButtonProps = {
  title: string;
  onPress: () => void;
};

export const Button = ({title, onPress}: ButtonProps) => {
  return (
    <Container onPress={onPress}>
      <Title>{title}</Title>
    </Container>
  );
};

const Container = styled.TouchableOpacity`
  height: 40px;
  width: 200px;
  background-color: #2980b9;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
`;

const Title = styled.Text`
  color: #eceeef;
`;

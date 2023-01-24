import React from 'react';
import styled from 'styled-components/native';

type ButtonProps = {
  title: string;
  onPress: () => void;
  variant?: 'default' | 'error' | 'success';
};

export const Button = ({title, variant, onPress}: ButtonProps) => {
  const getColor = () => {
    switch (variant) {
      case 'error':
        return '#e74c3c';
      case 'success':
        return '#27ae60';
      default:
        return '#2980b9';
    }
  };

  return (
    <Container color={getColor()} onPress={onPress}>
      <Title>{title}</Title>
    </Container>
  );
};

const Container = styled.TouchableOpacity<{color: string}>`
  height: 40px;
  width: 200px;
  background-color: ${({color}) => color};
  border-radius: 20px;
  align-items: center;
  justify-content: center;
`;

const Title = styled.Text`
  color: #eceeef;
`;

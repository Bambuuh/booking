import React from 'react';

import styled from 'styled-components/native';
import {Spacing} from '../Spacing';

type InputProps = {
  title: string;
  value: string;
  onChange: () => void;
};

export const Input = ({value, title, onChange}: InputProps) => {
  return (
    <Container>
      <Title>{title}</Title>
      <Spacing height={8} />
      <CustomInput value={value} onChange={onChange} />
    </Container>
  );
};

const Container = styled.View`
  width: 320px;
`;

const Title = styled.Text`
  color: #fff;
`;

const CustomInput = styled.TextInput`
  align-self: stretch;
  height: 42px;
  background-color: #fff;
  border-radius: 8px;
  padding: 0 16px 0 16px;
`;

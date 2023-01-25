import React from 'react';
import {View} from 'react-native';
import styled from 'styled-components/native';
import {Booking} from '../../context/booking';
import {getPrettyTime} from '../../utils';
import {Spacing} from '../common';

type BookingItemProps = {
  booking: Booking;
  isFirst?: boolean;
  isLast?: boolean;
  isSolo?: boolean;
  onPressRemove: (id: number) => void;
};

export const BookingItem = ({
  booking,
  isFirst = false,
  isLast = false,
  isSolo = false,
  onPressRemove,
}: BookingItemProps) => {
  const onPressRemoveButton = () => {
    onPressRemove(booking.id);
  };

  return (
    <Container isFirst={isFirst} isLast={isLast} isSolo={isSolo}>
      <LeftContainer>
        <RoomContainer>
          <RoomText>{booking.room}</RoomText>
        </RoomContainer>
        <Spacing width={16} />
        <View>
          <Title>
            {getPrettyTime(booking.startTime)} -{' '}
            {getPrettyTime(booking.endTime)}
          </Title>
        </View>
      </LeftContainer>
      <RemoveButton onPress={onPressRemoveButton}>
        <RemoveButtonImage source={require('./remove.png')} />
      </RemoveButton>
    </Container>
  );
};

const Container = styled.View<{
  isFirst: boolean;
  isLast: boolean;
  isSolo: boolean;
}>`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  height: 60px;
  background-color: #fff;
  padding: 0 16px 0 4px;
  border-bottom-left-radius: 40px;
  border-top-left-radius: 40px;

  /* ${({isFirst, isSolo}) =>
    (isFirst || isSolo) && 'border-top-left-radius: 8px'} */
  ${({isFirst, isSolo}) =>
    (isFirst || isSolo) && 'border-top-right-radius: 8px'}

  /* ${({isLast, isSolo}) =>
    (isLast || isSolo) && 'border-bottom-left-radius: 8px'} */
  ${({isLast, isSolo}) =>
    (isLast || isSolo) && 'border-bottom-right-radius: 8px'}
`;

const Title = styled.Text`
  font-size: 16px;
`;

const RemoveButton = styled.TouchableOpacity`
  background-color: #e74c3c;
  height: 32px;
  width: 32px;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
`;

const RemoveButtonImage = styled.Image`
  height: 16px;
  width: 16px;
  background-color: transparent;
`;

const LeftContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const RoomContainer = styled.View`
  height: 52px;
  width: 52px;
  border-radius: 36px;
  align-items: center;
  justify-content: center;
  background-color: #2ecc71;
`;

const RoomText = styled.Text`
  color: white;
  font-size: 30px;
  font-weight: 500;
`;

import React from 'react';
import styled from 'styled-components/native';
import {BookingListItem, RoomNumber} from '../../context/booking';
import {getPrettyTime} from '../../utils';
import {Spacing} from '../common';

type NewBookingItemProps = {
  booking: BookingListItem;
  onPressRoom: (roomNumber: RoomNumber) => void;
  isFirst?: boolean;
  isLast?: boolean;
  isSolo?: boolean;
};

export const NewBookingItem = ({
  booking,
  isFirst = false,
  isLast = false,
  isSolo = false,
  onPressRoom,
}: NewBookingItemProps) => {
  const onPressRoomOne = () => {
    onPressRoom(1);
  };

  const onPressRoomTwo = () => {
    onPressRoom(2);
  };

  return (
    <Container
      isFirst={isFirst}
      isLast={isLast}
      isSolo={isSolo}
      fullyBooked={booking.roomOneBooked && booking.roomTwoBooked}>
      <LeftContainer>
        <Title>Starts: {getPrettyTime(booking.startTime)}</Title>
        <Spacing height={8} />
        <Title>Ends: {getPrettyTime(booking.endTime)}</Title>
      </LeftContainer>
      <RightContainer>
        <RoomBox
          disabled={booking.roomOneBooked}
          onPress={onPressRoomOne}
          booked={booking.roomOneBooked}>
          <RoomBoxText>1</RoomBoxText>
        </RoomBox>
        <Spacing width={16} />
        <RoomBox
          disabled={booking.roomTwoBooked}
          onPress={onPressRoomTwo}
          booked={booking.roomTwoBooked}>
          <RoomBoxText>2</RoomBoxText>
        </RoomBox>
      </RightContainer>
    </Container>
  );
};

const Container = styled.View<{
  fullyBooked: boolean;
  isFirst: boolean;
  isLast: boolean;
  isSolo: boolean;
}>`
  padding: 0 12px;
  flex-direction: row;
  align-self: stretch;
  align-items: center;
  justify-content: space-between;
  height: 80px;
  background-color: #fff;
  ${({fullyBooked}) => fullyBooked && 'opacity: 0.3;'};

  ${({isFirst, isSolo}) => (isFirst || isSolo) && 'border-top-left-radius: 8px'}
  ${({isFirst, isSolo}) =>
    (isFirst || isSolo) && 'border-top-right-radius: 8px'}

  ${({isLast, isSolo}) =>
    (isLast || isSolo) && 'border-bottom-left-radius: 8px'}
  ${({isLast, isSolo}) =>
    (isLast || isSolo) && 'border-bottom-right-radius: 8px'}
`;

const LeftContainer = styled.View`
  height: 80px;
  align-items: flex-start;
  justify-content: center;
`;

const RightContainer = styled.View`
  flex-direction: row;
`;

const RoomBox = styled.TouchableOpacity<{booked: boolean}>`
  height: 52px;
  width: 52px;
  background-color: ${({booked}) => (booked ? '#e74c3c' : '#1abc9c')};
  align-items: center;
  justify-content: center;
  border-radius: 8px;
`;

const RoomBoxText = styled.Text`
  color: #fff;
  font-size: 30px;
`;

const Title = styled.Text``;

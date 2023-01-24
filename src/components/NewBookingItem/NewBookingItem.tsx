import React from 'react';
import styled from 'styled-components/native';
import {BookingListItem} from '../../context/booking';
import {getPrettyTime} from '../../utils';
import {Spacing} from '../common';

type NewBookingItemProps = {
  booking: BookingListItem;
  onPressRoom: (roomNumber: 1 | 2) => void;
};

export const NewBookingItem = ({booking, onPressRoom}: NewBookingItemProps) => {
  const onPressRoomOne = () => {
    onPressRoom(1);
  };

  const onPressRoomTwo = () => {
    onPressRoom(2);
  };

  return (
    <Container fullyBooked={booking.roomOneBooked && booking.roomTwoBooked}>
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

const Container = styled.View<{fullyBooked: boolean}>`
  border-radius: 8px;
  padding: 0 12px;
  flex-direction: row;
  align-self: stretch;
  align-items: center;
  justify-content: space-between;
  height: 80px;
  background-color: #fff;
  border-color: #3498db;
  border-width: 1px;
  ${({fullyBooked}) => fullyBooked && 'opacity: 0.3;'};
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

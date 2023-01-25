import {RoomNumber} from '../../context/booking';

export type BookingRequestItem = {
  startTime: number;
  endTime: number;
  room: RoomNumber;
};

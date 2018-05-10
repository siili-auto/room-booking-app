import { combineEpics } from 'redux-observable';
import loadAllRooms from './loadAllRoomsEpic';
import timerEpic from './timerEpic';
import runAppEpic from './runAppEpic';
import bookRoomEpic from './bookRoomEpic';
import loadRoomAgendaEpic from './loadRoomAgendaEpic';
import refreshRoomsAgendaEpic from './refreshRoomsAgendaEpic';
import removeRoomBookingEpic from './removeRoomBookingEpic';

export default combineEpics(
    loadAllRooms,
    runAppEpic,
    refreshRoomsAgendaEpic,
    timerEpic,
    loadRoomAgendaEpic,
    bookRoomEpic,
    removeRoomBookingEpic
);

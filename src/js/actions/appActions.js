import moment from 'moment';

import * as types from './actionTypes';
import { exitRoomBooking } from './bookingActions';
import { loadAllRooms } from './roomsActions';

export function appInit() {
    return { type: types.APP_INIT_START };
}

export function appReady() {
    return { type: types.APP_INIT_DONE };
}

export function runApp(appMode) {
    return { type: types.APP_INIT, payload: appMode };
}

export function runSetup() {
    return loadAllRooms();
}

export function updateCurrentTime() {
    return {
        type: types.APP_UPDATE_TIME,
        time: moment.now(),
    };
}

export function setAppMode(roomsMode) {
    return {
        type: types.APP_SET_MODE,
        roomsMode,
    };
}

export function addRoom(roomName) {
    return {
        type: types.APP_ADD_ROOM,
        roomName,
    };
}

export function initializeRooms(rooms) {
    return dispatch => rooms.map(room => dispatch(addRoom(room)));
}

export function selectRoom(roomId) {
    return {
        type: types.APP_SELECT_ROOM,
        roomId,
    };
}

export function deselectRoom() {
    return dispatch => {
        dispatch(exitRoomBooking(0));
        dispatch(exitRoomBooking(1));
        return dispatch({ type: types.APP_DESELECT_ROOM });
    };
}

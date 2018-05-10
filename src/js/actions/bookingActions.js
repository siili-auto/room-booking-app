import * as types from './../actions/actionTypes';

export function enterRoomBooking(roomId) {
    return {
        type: types.ROOM_BOOKING_PANEL_OPEN,
        roomId,
    };
}

export function exitRoomBooking(roomId) {
    return {
        type: types.ROOM_BOOKING_PANEL_CLOSE,
        roomId,
    };
}

export function bookRoom(roomId, roomName, duration) {
    return {
        type: types.ROOM_BOOKING_REQUEST,
        roomId,
        roomName,
        duration,
    };
}

export function bookRoomFailed(roomId, error) {
    return dispatch => {
        dispatch({
            type: types.ROOM_BOOKING_FAILURE,
            roomId,
            error,
        });
    };
}

export function bookRoomDone(roomId, event) {
    return {
        type: types.ROOM_BOOKING_SUCCESS,
        roomId,
        event,
    };
}

export function removeRoomBooking(roomId, roomName, eventId) {
    return {
        type: types.ROOM_REMOVE_BOOKING_REQUEST,
        roomId,
        roomName,
        eventId,
    };
}

export function removeRoomBookingFailed(roomId, error) {
    return dispatch => {
        dispatch({
            type: types.ROOM_REMOVE_BOOKING_FAILURE,
            roomId,
            error,
        });
    };
}

export function removeRoomBookingDone(roomId, eventId) {
    return {
        type: types.ROOM_REMOVE_BOOKING_SUCCESS,
        roomId,
        eventId,
    };
}

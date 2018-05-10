import * as types from './../actions/actionTypes';

export function refreshRoomsAgenda(force = false) {
    return {
        type: types.ROOM_AGENDA_REFRESH,
        force,
    };
}

export function loadRoomAgenda(roomId, roomName) {
    return {
        type: types.ROOM_AGENDA_REQUEST,
        roomId,
        roomName,
    };
}

export function roomAgendaDone(roomId, agenda) {
    return {
        type: types.ROOM_AGENDA_SUCCESS,
        roomId,
        agenda,
    };
}

export function roomAgendaFailed(roomId, error) {
    return {
        type: types.ROOM_AGENDA_FAILURE,
        roomId,
        error,
    };
}

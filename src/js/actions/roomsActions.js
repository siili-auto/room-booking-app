import * as types from './../actions/actionTypes';

export function loadAllRooms() {
    return {
        type: types.APP_ROOMS_REQUEST,
    };
}

export function getRoomsDone(rooms) {
    return {
        type: types.APP_ROOMS_SUCCESS,
        rooms,
    };
}

export function getRoomsFailed(error) {
    return {
        type: types.APP_ROOMS_FAILURE,
        error,
    };
}

import * as types from './actionTypes';

export function dismissError() {
    return {
        type: types.APP_DISMISS_ERROR
    };
}

export function showConfirmModal(roomName, eventToRemove) {
    return {
        type: types.APP_SHOW_MODAL_CONFIRM,
        roomName: roomName,
        eventToRemove: eventToRemove
    };
}

export function hideConfirmModal(roomName) {
    return {
        type: types.APP_HIDE_MODAL_CONFIRM,
        roomName: roomName
    };
}

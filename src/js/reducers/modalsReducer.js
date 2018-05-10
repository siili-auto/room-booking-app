import {
    APP_DISMISS_ERROR,
    APP_ADD_ROOM,
    APP_SHOW_MODAL_CONFIRM,
    APP_HIDE_MODAL_CONFIRM,
    APP_ROOMS_FAILURE,

    ROOM_REMOVE_BOOKING_FAILURE,
    ROOM_BOOKING_FAILURE
} from './../actions';

export default function modalReducer(state = {}, action) {
    switch (action.type) {
        case APP_DISMISS_ERROR:
            return {
                ...state,
                error: null
            };

        case APP_ROOMS_FAILURE:
        case ROOM_BOOKING_FAILURE:
        case ROOM_REMOVE_BOOKING_FAILURE:
            return {
                ...state,
                error: action.error
            };

        case APP_ADD_ROOM:
            return {
                ...state,
                roomsModals: {
                    ...state.roomsModals,
                    [action.roomName]: { isModalConfirmShown: false, eventToRemove: null }
                }
            };

        case APP_SHOW_MODAL_CONFIRM:
            return {
                ...state,
                roomsModals: {
                    ...state.roomsModals,
                    [action.roomName]: { isModalConfirmShown: true, eventToRemove: action.eventToRemove }
                }
            };

        case APP_HIDE_MODAL_CONFIRM:
            return {
                ...state,
                roomsModals: {
                    ...state.roomsModals,
                    [action.roomName]: { isModalConfirmShown: false, eventToRemove: null }
                }
            };

        default:
            return state;
    }
}

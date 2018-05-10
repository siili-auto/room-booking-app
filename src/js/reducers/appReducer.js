import {
    APP_INIT_START,
    APP_INIT_DONE,
    APP_SET_MODE,
    APP_UPDATE_TIME,
    APP_SELECT_ROOM,
    APP_DESELECT_ROOM,
    APP_ROOMS_SUCCESS,
} from './../actions';

export default function appReducer(state = {}, action) {
    switch (action.type) {
        case APP_INIT_START:
            return {
                ...state,
                init: true
            };

        case APP_INIT_DONE:
            return {
                ...state,
                init: false
            };

        case APP_SET_MODE:
            return {
                ...state,
                mode: action.roomsMode
            };

        case APP_UPDATE_TIME:
            const currentTime = action.time;
            return {
                ...state,
                currentTime
            };

        case APP_SELECT_ROOM:
            return {
                ...state,
                activeRoom: action.roomId
            };

        case APP_DESELECT_ROOM:
            return {
                ...state, activeRoom: null
            };

        case APP_ROOMS_SUCCESS:
            return {
                ...state,
                rooms: action.rooms
            };

        default:
            return state;
    }
}

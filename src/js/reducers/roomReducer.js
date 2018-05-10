import {
    ROOM_AGENDA_REQUEST,
    ROOM_AGENDA_SUCCESS,
    ROOM_AGENDA_FAILURE,
    ROOM_BOOKING_PANEL_OPEN,
    ROOM_BOOKING_PANEL_CLOSE,
    ROOM_BOOKING_REQUEST,
    ROOM_BOOKING_SUCCESS,
    ROOM_BOOKING_FAILURE,
    ROOM_REMOVE_BOOKING_REQUEST,
    ROOM_REMOVE_BOOKING_SUCCESS,
    ROOM_REMOVE_BOOKING_FAILURE,
    APP_ADD_ROOM,
    APP_UPDATE_TIME,
} from './../actions';

const getTimeSerialized = time => Math.floor(new Date(time).getTime()/1000);

const mapAgendaEvent = event => ({
    ...event,
    uniqueKey: `${getTimeSerialized(event.timeStart)}-${getTimeSerialized(event.timeEnd)}`,
});

const room = (state, action) => {
    switch (action.type) {
        case APP_ADD_ROOM:
            return {
                name: action.roomName,
                agenda: [],
                isBookingPanelActive: false,

                processingStatus: {
                    isUpdating: false,
                    isAwaitingRefresh: false,
                    isRefreshPaused: false,
                },
            };

        case ROOM_BOOKING_PANEL_OPEN: {
            return {
                ...state,
                isBookingPanelActive: true,
            };
        }

        case ROOM_BOOKING_PANEL_CLOSE: {
            return {
                ...state,
                isBookingPanelActive: false,
            };
        }

        case ROOM_AGENDA_REQUEST:
            const { processingStatus } = state;

            return {
                ...state,

                processingStatus: {
                    ...processingStatus,
                    isUpdating: true,
                },
            };

        case ROOM_AGENDA_SUCCESS: {
            const { processingStatus } = state;
            if (processingStatus.currentRefreshRequestId !== action.requestId) {
                return state;
            }

            const agenda = action.agenda.map(event => mapAgendaEvent(event));

            return {
                ...state,
                agenda,

                processingStatus: {
                    ...processingStatus,
                    isUpdating: false,
                    isAwaitingRefresh: false,
                },
            };
        }

        case ROOM_AGENDA_FAILURE: {
            return {
                ...state,

                processingStatus: {
                    ...processingStatus,
                    isUpdating: false,
                },
            };
        }

        case ROOM_BOOKING_REQUEST:
        case ROOM_REMOVE_BOOKING_REQUEST: {
            return {
                ...state,

                processingStatus: {
                    ...processingStatus,
                    isUpdating: true,
                    isRefreshPaused: true,
                },
            };
        }

        case ROOM_BOOKING_SUCCESS: {
            const { agenda } = state;

            return {
                ...state,
                agenda: [mapAgendaEvent(action.event), ...agenda],

                processingStatus: {
                    ...processingStatus,
                    isUpdating: false,
                    isAwaitingRefresh: true,
                    isRefreshPaused: false,
                },
            };
        }

        case ROOM_REMOVE_BOOKING_SUCCESS: {
            const { agenda } = state;
            const removedEventId = action.eventId;

            return {
                ...state,
                agenda: [
                    ...agenda.filter(event => event.id !== removedEventId),
                ],

                processingStatus: {
                    ...processingStatus,
                    isUpdating: false,
                    isRefreshPaused: false,
                },
            };
        }

        case ROOM_BOOKING_FAILURE:
        case ROOM_REMOVE_BOOKING_FAILURE: {
            return {
                ...state,

                processingStatus: {
                    ...processingStatus,
                    isUpdating: false,
                    isRefreshPaused: false,
                },
            };
        }

        case APP_UPDATE_TIME: {
            return { ...state };
        }

        default:
            return state;
    }
};

export default function roomReducer(state = [], action) {
    switch (action.type) {
        case APP_ADD_ROOM: {
            return [...state, room(undefined, action)];
        }

        case APP_UPDATE_TIME: {
            return state.map(r => room(r, action));
        }

        case ROOM_AGENDA_REQUEST:
        case ROOM_AGENDA_SUCCESS:
        case ROOM_AGENDA_FAILURE:
        case ROOM_BOOKING_PANEL_OPEN:
        case ROOM_BOOKING_PANEL_CLOSE:
        case ROOM_BOOKING_REQUEST:
        case ROOM_BOOKING_SUCCESS:
        case ROOM_BOOKING_FAILURE:
        case ROOM_REMOVE_BOOKING_REQUEST:
        case ROOM_REMOVE_BOOKING_SUCCESS:
        case ROOM_REMOVE_BOOKING_FAILURE: {
            return state.map(
                (r, i) => (i === action.roomId ? room(r, action) : r)
            );
        }

        default:
            return state;
    }
}

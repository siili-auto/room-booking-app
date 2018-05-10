import { createSelector } from 'reselect/';
import { isNull, find, times } from 'lodash';

import {
    isCurrentTimeBetween,
    isCurrentTimeBefore,
    getAvailableDurations,
    getCurrentAgenda
} from './../helpers';

// input selectors
const getRoom = (state, roomId) => state.rooms[roomId];

// memoized selectors
const getAgenda = createSelector(
    [getRoom],
    room => room.agenda
);

const getCurrentEvent = createSelector(
    [getAgenda],
    (agenda) => {
        return find(agenda, ({ timeStart, timeEnd }) => isCurrentTimeBetween(timeStart, timeEnd)) || null;
    }
);

const getNextEvent = createSelector(
    [getAgenda],
    (agenda) => {
        return find(agenda, ({ timeStart }) => isCurrentTimeBefore(timeStart)) || null;
    }
);

const roomSelectorFactory = () => {
    return createSelector(
        [getRoom, getCurrentEvent, getNextEvent, getAgenda],
        (room, currentEvent, nextEvent, agenda) => {
            const itemsToShow = isNull(currentEvent) ? 6 : 7;
            return {
                ...room,
                isBookingPanelActive: room.isBookingPanelActive && isNull(currentEvent),
                currentEvent: currentEvent,
                nextEvent: nextEvent,
                availableDurations: getAvailableDurations(nextEvent),
                agenda: getCurrentAgenda(agenda, itemsToShow)
            };
        }
    );
};

export const getRoomsSelector = createSelector(
    [state => state.rooms.length],
    len => times(len, () => roomSelectorFactory())
);

export const getRoomProcessingStatus = createSelector(
    [getRoom],
    room => ( {
        ...room.processingStatus,
        isRefreshing: room.processingStatus.currentRefreshRequestId !== null
    })
);

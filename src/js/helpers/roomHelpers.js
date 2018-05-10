import { isNull } from 'lodash';

import {
    MAXIMUM_END_TIME_ALLOWED,
    BOOKING_DURATIONS
} from './../config';

import {
    formatTime,
    calculateMinutesLeft,
    isCurrentTimeBefore,
    isCurrentTimeBetween
} from './../helpers';

export const getEventTimeLabel = (translate, nextEvent) =>
    isNull(nextEvent) ?
        translate('event-time-until-end-of-day') :
        translate('event-time-until', { time: formatTime(nextEvent.timeStart) });

export const getMaxAllowedDuration = timeToNextEvent => {
    return timeToNextEvent === Infinity
        ? calculateMinutesLeft(MAXIMUM_END_TIME_ALLOWED).asMinutes()
        : timeToNextEvent;
};

export const getAvailableDurations = (nextEvent) => {
    const timeToNextEvent = isNull(nextEvent)
        ? Infinity
        : calculateMinutesLeft(nextEvent.timeStart).asMinutes();

    return BOOKING_DURATIONS.map(duration => (
        duration.isMax ?

        {
            ...duration,
            minutes: isNull(duration.minutes) ? getMaxAllowedDuration(timeToNextEvent) : duration.minutes,
            disabled: timeToNextEvent < duration.minutes
        } : {
            ...duration,
            disabled: timeToNextEvent < duration.minutes
        }
    ));
};

export const getCurrentAgenda = (agenda, itemsToShow) => {
    return agenda
        .filter(event => {
            const { timeStart, timeEnd } = event;
            return isCurrentTimeBefore(timeStart) || isCurrentTimeBetween(timeStart, timeEnd);
        })
        .slice(0, itemsToShow);
};

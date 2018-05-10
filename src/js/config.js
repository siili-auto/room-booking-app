/* global __API_URL__ */
/* global __API_HEADERS__ */
/* global __MAXIMUM_END_TIME_ALLOWED__ */
/* __[name]__ globals are defined using webpack during build */
import { generateEventTime as g } from './helpers';

export const TIME_REFRESH_INTERVAL = 5000;
export const IDLE_TIME_TO_RESET_ROOM_SELECTION = 60 * 1000;
export const CHECK_FOR_UPDATES_INTERVAL = 5 * 60 * 1000;
export const ROOMS_APP_CONFIG_STORAGE_KEY = 'roomsAppConfig';

export const API_URL = __API_URL__;
export const API_HEADERS = __API_HEADERS__;

export const BOOKING_DURATIONS = [{
    minutes: 5,
    timeLabel: '5',
    unitLabel: 'minutes'
},{
    minutes: 15,
    timeLabel: '15',
    unitLabel: 'minutes'
}, {
    minutes: 30,
    timeLabel: '30',
    unitLabel: 'minutes'
}, {
    minutes: 60,
    timeLabel: '1',
    unitLabel: 'hour'
}, {
    minutes: 120,
    timeLabel: '2',
    unitLabel: 'hours'
}, {
    isMax: true,
    timeLabel: 'Max',
    minutes: null,
}];

export const MINIMAL_TIME_REQUIRED = BOOKING_DURATIONS[0].minutes;
export const MAXIMUM_END_TIME_ALLOWED = g(__MAXIMUM_END_TIME_ALLOWED__);

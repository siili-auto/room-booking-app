import moment from 'moment';

import faker from 'faker/locale/en_US';
import { getAppConfigFromStorage } from '../../configs/configStorage';

import { remove } from 'lodash';
import { ROOM_MODE } from '../../enums/roomsModeEnums';

const ROOMS = [
    'JavaScript',
    'React',
    'Redux',
    'Webpack',
].map(name => ({ name }));

const generateEvent = (timeStart, timeEnd) => {
    return {
        id: faker.random.uuid(),
        timeStart: timeStart.toISOString(),
        timeEnd: timeEnd.toISOString(),
        owner: `${faker.name.firstName()} ${faker.name.lastName()}`,
        subject: faker.company.catchPhrase()
    };
};

const generateAgenda = (numberOfEvents, isCurrentlyAvailable) => {
    const actualOrNextEventStart = isCurrentlyAvailable
        ? moment().minutes(0).add(1, 'hour')
        : moment().minutes(0);

    const events = [];
    for (let i=0; i < numberOfEvents; i++) {
        events.push(
            generateEvent(
                moment(actualOrNextEventStart).add(i, 'hour'),
                moment(actualOrNextEventStart).add(i+1, 'hour')
            )
        );
    }

    return events;
};

const getRandomTimeout = () =>
    Math.floor((Math.random() * 1250) + 250);

const createQuickEvent = (timeStart, timeEnd, roomName) => {
    return {
        id: faker.random.uuid(),
        subject: "Doesn't really matter",
        owner: "Quick meeting user",
        timeStart: timeStart.toISOString(),
        timeEnd: timeEnd.toISOString(),
        roomName: roomName,
        isQuick: true
    };
};

export function getRooms() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(ROOMS);
        }, getRandomTimeout());
    });
}

const FIRST_ROOM_AGENDA = generateAgenda(3, true);
const SECOND_ROOM_AGENDA = generateAgenda(4, false);

function getRoomsFromConfig() {
    const config = getAppConfigFromStorage();

    if (config.mode === ROOM_MODE.DOUBLE) {
        return {
            FIRST_ROOM: config.locations.left.name,
            SECOND_ROOM: config.locations.right.name,
        };
    } else {
        return {
            FIRST_ROOM: config.locations.left.name,
        };
    }
}

export function getRoomAgenda(roomName) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const { FIRST_ROOM, SECOND_ROOM } = getRoomsFromConfig();

            switch (roomName) {
                case FIRST_ROOM:
                    resolve(FIRST_ROOM_AGENDA);
                    break;
                case SECOND_ROOM:
                    resolve(SECOND_ROOM_AGENDA);
                    break;
                default:
                    reject('Cannot load agenda (dev api)');
            }

            reject('Cannot load agenda');
        }, getRandomTimeout());
    });
}



export function makeRoomBooking(roomName, duration) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const { FIRST_ROOM } = getRoomsFromConfig();
            const agenda = roomName === FIRST_ROOM ? FIRST_ROOM_AGENDA : SECOND_ROOM_AGENDA;

            const timeStart = moment();
            const timeEnd = moment().add(duration, 'minutes');

            if (timeEnd.isBefore(moment(agenda[0].timeStart))) {
                const newEvent = createQuickEvent(timeStart, timeEnd, roomName);
                agenda.unshift(newEvent);
                resolve(newEvent);
            } else {
                reject('Room is busy.');
            }
        }, getRandomTimeout());
    });
}

export function removeRoomBooking(roomName, eventId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const { FIRST_ROOM } = getRoomsFromConfig();
            const agenda = roomName === FIRST_ROOM ? FIRST_ROOM_AGENDA : SECOND_ROOM_AGENDA;

            remove(agenda, (e => e.id === eventId));
            resolve();
        }, getRandomTimeout());
    });
}

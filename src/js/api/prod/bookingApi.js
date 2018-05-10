import axios from 'axios';
import moment from 'moment';

import { API_URL } from './../../config';

const buildRoomsUrl = () => `${ API_URL }/rooms`;
const buildEventsUrl = roomName => `${buildRoomsUrl()}/${roomName}/events`;
const buildEventUrl = (roomName, eventId) => `${buildEventsUrl(roomName)}/${encodeURIComponent(eventId)}`;

const getErrorMessage = error => {
    return error.data
        ? (error.data.Message || error.data)
        : (error.message || error);
};

const roomAdapter = ({ name }) => ({ name });
const eventAdapter = ({ id, subject, owner, timeEnd, timeStart, type }) => ({
    id,
    subject,
    owner,
    timeEnd,
    timeStart,
    isQuick: type === 'quick'
});

export function getRooms() {
    return new Promise((completed, failed) =>
        axios.get(buildRoomsUrl())
            .then(response => completed(response.data.map(roomAdapter)))
            .catch(error => failed(getErrorMessage(error)))
    );
}

export function getRoomAgenda(roomName) {
    const queryString = {
        from: moment().format('YYYY-MM-DD'),
        to: moment().add(1, 'day').format('YYYY-MM-DD'),
    };

    return new Promise((completed, failed) =>
        axios.get(buildEventsUrl(roomName), { params: queryString })
            .then(response => completed(response.data.map(eventAdapter)))
            .catch(error => failed(getErrorMessage(error)))
    );
}

export function makeRoomBooking(roomName, duration) {
    const params = ({
        startDate: moment().toISOString(),
        endDate: moment().add(Math.floor(duration), 'minutes').toISOString()
    });

    return new Promise((completed, failed) =>
        axios.post(buildEventsUrl(roomName), params)
            .then(({ data }) => completed(eventAdapter(data)))
            .catch(error => failed(getErrorMessage(error)))
    );
}

export function removeRoomBooking(roomName, eventId) {
    return new Promise((completed, failed) =>
        axios.delete(buildEventUrl(roomName, eventId))
            .then(({ data }) => completed(data))
            .catch(error => failed(getErrorMessage(error)))
    );
}

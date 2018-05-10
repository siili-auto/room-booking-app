import moment from 'moment';

export default {
    app: {
        currentTime: moment().now,
        init: true,
        activeRoom: null,
        mode: null,
        rooms: []
    },
    modal: {
        error: null,
        roomsModals: {}
    },
    rooms: []
};

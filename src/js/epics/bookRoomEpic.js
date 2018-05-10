import { Observable } from 'rxjs';
import api from '../api';
import {
    bookRoomDone,
    exitRoomBooking,
    bookRoomFailed,
} from '../actions/bookingActions';
import { ROOM_BOOKING_REQUEST } from '../actions/actionTypes';

const bookRoomEpic = action$ => {
    return action$
        .ofType(ROOM_BOOKING_REQUEST)
        .switchMap(({ roomName, duration, roomId }) =>
            Observable.fromPromise(api.makeRoomBooking(roomName, duration))
                .switchMap(data =>
                    Observable.of(
                        bookRoomDone(roomId, data),
                        exitRoomBooking(roomId)
                    )
                )
                .catch(error => Observable.of(bookRoomFailed(roomId, error)))
        );
};

export default bookRoomEpic;

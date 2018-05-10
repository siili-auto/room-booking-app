import { Observable } from 'rxjs';
import api from '../api';
import {
    removeRoomBookingDone,
    exitRoomBooking,
    removeRoomBookingFailed,
} from '../actions/bookingActions';
import { ROOM_REMOVE_BOOKING_REQUEST } from '../actions/actionTypes';

const removeRoomBookingEpic = action$ => {
    return action$
        .ofType(ROOM_REMOVE_BOOKING_REQUEST)
        .switchMap(({ roomName, eventId, roomId }) =>
            Observable.fromPromise(api.removeRoomBooking(roomName, eventId))
                .switchMap(() =>
                    Observable.of(
                        removeRoomBookingDone(roomId, eventId),
                        exitRoomBooking(roomId)
                    )
                )
                .catch(error =>
                    Observable.of(removeRoomBookingFailed(roomId, error))
                )
        );
};

export default removeRoomBookingEpic;

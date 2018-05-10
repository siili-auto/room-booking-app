import { Observable } from 'rxjs';
import api from '../api';
import { getRoomsDone, getRoomsFailed } from '../actions/roomsActions';
import { APP_ROOMS_REQUEST } from '../actions/actionTypes';
import { appReady } from '../actions/appActions';

const loadAllRoomsEpic = action$ => {
    return action$
        .ofType(APP_ROOMS_REQUEST)
        .switchMap(() => Observable.fromPromise(api.getRooms()))
        .catch(error => Observable.of(getRoomsFailed(error)))
        .switchMap(data => Observable.of(getRoomsDone(data), appReady()));
};

export default loadAllRoomsEpic;

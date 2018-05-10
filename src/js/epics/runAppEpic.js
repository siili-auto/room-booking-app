import { Observable } from 'rxjs';
import { values } from 'lodash';
import { APP_INIT } from '../actions/actionTypes';
import {
    appReady,
    setAppMode,
    initializeRooms,
    updateCurrentTime,
} from '../actions/appActions';

const runAppEpic = action$ => {
    return action$.ofType(APP_INIT).switchMap(action => {
        const mode = action.payload.mode;
        const rooms = values(action.payload.locations).map(room => room.name);

        return Observable.of(
            setAppMode(mode),
            initializeRooms(rooms),
            updateCurrentTime(),
            appReady()
        );
    });
};

export default runAppEpic;

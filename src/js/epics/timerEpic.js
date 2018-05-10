import { Observable } from 'rxjs';
import { refreshRoomsAgenda } from '../actions/agendaActions';
import { updateCurrentTime } from '../actions/appActions';
import { APP_INIT, APP_STOP } from '../actions/actionTypes';
import { TIME_REFRESH_INTERVAL } from '../config';

const timerEpic = action$ => {
    return action$
        .ofType(APP_INIT)
        .switchMap(() => {
            return Observable.interval(TIME_REFRESH_INTERVAL)
                .startWith(0)
                .switchMap(() =>
                    Observable.of(refreshRoomsAgenda(), updateCurrentTime())
                );
        })
        .takeUntil(action$.ofType(APP_STOP));
};

export default timerEpic;

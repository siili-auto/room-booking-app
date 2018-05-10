import { Observable } from 'rxjs';
import api from '../api';
import { roomAgendaDone, roomAgendaFailed } from '../actions/agendaActions';
import { ROOM_AGENDA_REQUEST } from '../actions/actionTypes';

const loadRoomAgendaEpic = action$ => {
    return action$.ofType(ROOM_AGENDA_REQUEST).mergeMap(action => {
        return Observable.fromPromise(api.getRoomAgenda(action.roomName))
            .map(agenda => roomAgendaDone(action.roomId, agenda))
            .catch(error =>
                Observable.of(roomAgendaFailed(action.roomId, error))
            );
    });
};

export default loadRoomAgendaEpic;

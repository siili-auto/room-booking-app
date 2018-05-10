import { Observable } from 'rxjs';
import { loadRoomAgenda } from '../actions/agendaActions';
import { ROOM_AGENDA_REFRESH } from '../actions/actionTypes';

const refreshRoomsAgendaEpic = (action$, store) => {
    return action$.ofType(ROOM_AGENDA_REFRESH).switchMap(action => {
        const { rooms, app } = store.getState();

        if (!action.force && app.activeRoom !== null) return Observable.empty();

        const actions = rooms
            .filter(room => !room.processingStatus.isUpdating)
            .map((room, index) => loadRoomAgenda(index, room.name));

        return Observable.of(...actions);
    });
};

export default refreshRoomsAgendaEpic;

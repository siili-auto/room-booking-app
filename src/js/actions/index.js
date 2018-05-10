import { getAppConfigFromStorage } from '../configs/configStorage';
import { appInit, runApp, runSetup } from './appActions';

export * from './actionTypes';
export * from './appActions';
export * from './roomsActions';
export * from './bookingActions';
export * from './agendaActions';
export * from './modalsActions';

export function initializeApp() {
    const appConfig = getAppConfigFromStorage();

    return (dispatch) => {
        dispatch(appInit());

        if (appConfig) {
            dispatch(runApp(appConfig));
        } else {
            dispatch(runSetup());
        }
    };
}

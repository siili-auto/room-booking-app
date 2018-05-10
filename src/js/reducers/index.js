import { combineReducers } from 'redux';

import app from './appReducer';
import modal from './modalsReducer';
import rooms from './roomReducer';

export default combineReducers({
    app,
    modal,
    rooms
});

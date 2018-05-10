import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import epics from '../epics';

const epicMiddleware = createEpicMiddleware(epics);

function configureStore(initialState) {
  return createStore(
      rootReducer,
      initialState,
      applyMiddleware(thunk, epicMiddleware)
  );
}

export default configureStore;

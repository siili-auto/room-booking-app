import devStore from './configureStore.dev';
import prodStore from './configureStore.prod';
import initialState from './initialState';

export { initialState };

export default process.env.NODE_ENV === 'production' ? prodStore : devStore;

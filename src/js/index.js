import React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';

import './rx';

import Main from './components/Main';

import configureStore, { initialState } from './store';
import { API_HEADERS, CHECK_FOR_UPDATES_INTERVAL } from './config';
import { initializeApp, deselectRoom } from './actions';

import '../styles/index.scss';

const store = configureStore(initialState);

axios.defaults.headers.common = {
    ...API_HEADERS,
    'Content-Type': 'application/json',
};

store.dispatch(initializeApp());

// Disable browser back button
history.pushState(null, null, '');
window.addEventListener('popstate', () => {
    history.pushState(null, null, '');
    store.dispatch(deselectRoom());
});

const render = App => {
    ReactDOM.render(
        <AppContainer>
            <Provider store={ store }>
                <App />
            </Provider>
        </AppContainer>,
        document.getElementById('app')
    );
};

render(Main);

// enable HMR for React Components
if (module.hot) {
    module.hot.accept('./components/Main', () => {
        const NextMain = require('./components/Main').default;
        render(NextMain);
    });
}

// NOTE: This interval checks if index.html content returned from server
// differs with initial index.html content and reloads app if necessary.
// This solution bases on fact that index.html from different build
// contains links to bundle.js and style.css with different hashes.
function checkForUpdatesInterval() {
    function reloadApp() {
        window.location.reload(true);
    }

    let indexHtmlContents;

    setInterval(() => {
        axios.get('/').then((response) => {
            if (indexHtmlContents && indexHtmlContents !== response.data) {
                reloadApp();
            }

            indexHtmlContents = response.data;
        });

    }, CHECK_FOR_UPDATES_INTERVAL);
}

checkForUpdatesInterval();

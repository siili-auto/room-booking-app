import { ROOMS_APP_CONFIG_STORAGE_KEY } from '../config';

export const getAppConfigFromStorage = () =>
    JSON.parse(localStorage.getItem(ROOMS_APP_CONFIG_STORAGE_KEY));

export const setAppConfigToStorage = (appMode) => {
    localStorage.setItem(ROOMS_APP_CONFIG_STORAGE_KEY, JSON.stringify(appMode));
};

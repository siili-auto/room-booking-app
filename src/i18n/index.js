import Polyglot from 'node-polyglot';

import en from './en.yml';

const polyglot = new Polyglot({
    locale: 'en',
    allowMissing: false,
    phrases: en.translations,
});

export function translate(key, opts) {
    const translation = polyglot.t(key, opts);

    if (!translation) {
        throw new Error(`[i18n] Missing key '${key}'`);
    }

    return translation;
}

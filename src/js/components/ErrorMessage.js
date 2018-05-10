import React, { PropTypes } from 'react';
import { Message } from './../components';

import { endsWith } from 'lodash';

const ErrorMessage = ({ isShowing, content = '', onConfirm }, { translate }) => {
    const formatMessageContent = (message) => {
        if (message !== '') {
            return endsWith(message, '.') ? `${ message } ` : `${ message }. `;
        }
        return '';
    };

    const messageTitle = translate('error-title');
    const messageContent = translate('error-message-template',  { error: formatMessageContent(content) });

    return (
        <Message
            isShowing={ isShowing }
            title = { messageTitle }
            confirmLabel={ translate('error-dismiss-button') }
            onConfirm={ onConfirm }
        >
            { messageContent }
        </Message>
    );
};

ErrorMessage.propTypes = {
    isShowing: PropTypes.bool,
    content: PropTypes.string.isRequired,
    onConfirm: PropTypes.func.isRequired
};

ErrorMessage.contextTypes = {
    translate: PropTypes.func.isRequired,
};

export default ErrorMessage;

import React, { PropTypes } from 'react';
import Portal from 'react-portal';

import cx from 'classnames';

const Message = ({ isShowing, title = '', children, confirmLabel, cancelLabel, onConfirm, onCancel }, { translate }) => {
    const className = cx('message', { 'message--visible': isShowing });

    confirmLabel = confirmLabel || translate('dialog-ok');
    cancelLabel = cancelLabel || translate('dialog-cancel');

    return (
        <Portal isOpened={ true }>
            <div className={ className }>
                <div className="message__box">
                    <h2 className="message__title">{ title }</h2>
                    <p className="message__content">
                        { children }
                    </p>
                    <button className="message__button" onClick={ onConfirm }>
                        { confirmLabel }
                    </button>
                    { !!onCancel &&
                    <button className="message__button message__button--cancel" onClick={ onCancel }>
                        { cancelLabel }
                    </button>
                    }
                </div>
            </div>
        </Portal>
    );
};

Message.propTypes = {
    isShowing: PropTypes.bool,
    title: PropTypes.string.isRequired,
    confirmLabel: PropTypes.string,
    cancelLabel: PropTypes.string,
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func,
    children: PropTypes.string
};

Message.contextTypes = {
    translate: PropTypes.func.isRequired,
};

export default Message;

import React, { PropTypes } from 'react';
import cx from 'classnames';

import {
    formatTime,
    calculateTimeLeft,
    calculateTimeProgress,
} from './../helpers';

const AgendaEvent = ({ id, timeStart, timeEnd, owner, isQuick, isCurrent, isUpcoming, inProgress, isRefreshed, onRemoveBooking }, { translate }) => {
    const eventClass = cx('agenda-event', {
        'agenda-event--current': isCurrent,
        'agenda-event--upcoming': isUpcoming,
        'agenda-event--in-progress': inProgress
    });
    const progressStyle = {
        width: `${ calculateTimeProgress(timeStart, timeEnd) }%`
    };

    return (
        <div className={ eventClass }>
            <div className="agenda-event__content">
                <div className="agenda-event__time">
                    <p className="agenda-event__time-start">{ formatTime(timeStart) }</p>
                    <p className="agenda-event__time-end">{ formatTime(timeEnd) }</p>
                </div>
                <div className="agenda-event__description">
                    <p className="agenda-event__owner">
                        { isQuick ? translate('event-quick') : owner }
                    </p>
                    <p className="agenda-event__status">
                        { isCurrent ?
                            translate('event-in-progress') :
                            translate('event-coming-up', { time: calculateTimeLeft(timeStart) })
                        }
                    </p>
                </div>
                { isQuick && isRefreshed &&
                <button className="agenda-event__remove-button" onClick={ onRemoveBooking(id) }>
                    <span className="agenda-event__remove-button-caption">+</span>
                    <span className="agenda-event__remove-button-spinner" />
                </button>
                }
            </div>
            <div className="agenda-event__progress-bar">
                <div className="agenda-event__progress" style={ progressStyle } />
            </div>
        </div>
    );
};

AgendaEvent.propTypes = {
    id: PropTypes.string.isRequired,
    timeStart: PropTypes.string.isRequired,
    timeEnd: PropTypes.string.isRequired,
    owner: PropTypes.string.isRequired,
    isQuick: PropTypes.bool,
    isCurrent: PropTypes.bool.isRequired,
    isUpcoming: PropTypes.bool.isRequired,
    inProgress: PropTypes.bool.isRequired,
    isRefreshed: PropTypes.bool.isRequired,
    onRemoveBooking: PropTypes.func.isRequired
};

AgendaEvent.contextTypes = {
    translate: PropTypes.func.isRequired,
};

export default AgendaEvent;

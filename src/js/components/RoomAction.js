import React, { PropTypes } from 'react';
import cx from 'classnames';

import { getEventTimeLabel } from './../helpers/roomHelpers';
import { getTimeAndUnitFromMinutes } from './../helpers/timeHelpers';

const RoomAction = ({
    direction,
    active,
    enabled,
    durations,
    nextEvent,
    inProgress,
    onToggleBooking,
    onBookRoom
}, {
    translate
}) => {
    const roomActionClass = cx(
        'room-action',
        `room-action--${ direction }`,
        {
            'room-action--active': active,
            'room-action--enabled': enabled,
            'room-action--in-progress': inProgress
        }
    );
    const bookRoomHandler = (minutes, disabled) => disabled ? false : onBookRoom(minutes);
    const bookingLabel = inProgress ?
        translate('room-booking-in-progress') : translate('room-book-for-time');

    return (
        <div className={ roomActionClass }>
            <button className="room-action__button" onClick={ onToggleBooking }>
                <span className="room-action__button-caption">+</span>
                <span className="room-action__button-spinner" />
            </button>
            <div className="room-action__new-event">
                <p className="room-action__new-event-label">
                    { bookingLabel }
                </p>
                <div className="room-action__new-event-durations">
                { !inProgress ? durations.map(({ isMax, minutes, disabled }, index) => {
                    let timeLabel, unitLabel;

                    if (isMax) {
                        timeLabel = translate('event-time-max');
                        unitLabel = getEventTimeLabel(translate, nextEvent);
                    } else {
                        const { value, unit } = getTimeAndUnitFromMinutes(minutes);

                        timeLabel = value;
                        unitLabel = translate({
                            H: 'time-unit-hour',
                            m: 'time-unit-minute',
                        }[unit],
                        { smart_count: value });
                    }

                    const durationClassName = cx(
                        'room-action__duration',
                        `room-action__duration--item${ index + 1 }`,
                        { 'room-action__duration--disabled': disabled }
                    );
                    return (
                        <div
                          className={ durationClassName }
                          onClick={ bookRoomHandler(minutes, disabled) }
                          key={ index }
                        >
                            <p className="room-action__duration-time">{ timeLabel }</p>
                            <p className="room-action__duration-unit">{ unitLabel }</p>
                        </div>
                    );
                }) : null }
                </div>
            </div>
        </div>
    );
};

RoomAction.propTypes = {
    direction: PropTypes.oneOf(['left', 'right']).isRequired,
    active: PropTypes.bool,
    enabled: PropTypes.bool,
    durations: PropTypes.array.isRequired,
    nextEvent: PropTypes.object,
    inProgress: PropTypes.bool,
    onToggleBooking: PropTypes.func.isRequired,
    onBookRoom: PropTypes.func.isRequired,
};

RoomAction.contextTypes = {
    translate: PropTypes.func.isRequired,
};

export default RoomAction;

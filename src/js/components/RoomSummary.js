import React, { Component, PropTypes } from 'react';
import { capitalize } from 'lodash';
import cx from 'classnames';

import { formatTime, calculateTimeLeft, calculateTimeProgress } from './../helpers';
import { getEventTimeLabel } from './../helpers/roomHelpers';

function getRoomSummary(translate, { subject, owner, timeStart, timeEnd, isQuick }, nextEvent) {

    const timeRange = translate('event-time-range', {
        start: formatTime(timeStart),
        end: formatTime(timeEnd)
    });

    const timeLeft = translate('event-time-left', {
        time: capitalize(calculateTimeLeft(timeEnd))
    });

    const thenAvailable = translate('room-then-available', {
        time: getEventTimeLabel(translate, nextEvent)
    });

    return isQuick ? {
        title: isQuick ? translate('event-quick') : owner,
        subtitle: `${ timeRange }. ${ timeLeft }`,
        description: thenAvailable
    } : {
        title: subject,
        subtitle: translate('event-reservation-by', { timeRange, person: owner }),
        description: `${ timeLeft }. ${ thenAvailable }`
    };
}

const ROOM_CONTAINER_PADDING = 50;

class RoomSummary extends Component {

    computeNameTranslateX() {
        const { direction, compact } = this.props;

        const containerWidth = this.containerRef ? this.containerRef.offsetWidth : 0;
        const nameWidth = this.nameRef ? this.nameRef.offsetWidth : 0;

        const sign = (direction === 'right' ? -1 : 1);
        const diff = (containerWidth - 2 * ROOM_CONTAINER_PADDING) - nameWidth;
        return sign * (compact ? diff : 0);
    }

    render() {
        const { name, direction, event, nextEvent, compact, fullScreen, isRoomFree, onClick } = this.props;
        const { translate } = this.context;

        const className = cx('room-summary', {
            'room-summary--free': isRoomFree,
            'room-summary--compact': compact,
            'room-summary--fullscreen': fullScreen
        }, `room-summary--${ direction }`);

        const { title, subtitle, description } = isRoomFree ? {
            title: translate('room-available'),
            subtitle: translate('room-booking-encouragement'),
            description: translate('room-vacant', { time: getEventTimeLabel(translate, nextEvent) })
        } : getRoomSummary(translate, event, nextEvent);

        const progressStyle = {
            width: `${ event ? calculateTimeProgress(event.timeStart, event.timeEnd) : 0 }%`
        };

        return (
            <div
              className={ className }
              onClick={ onClick }
              ref={ el => (this.containerRef = el) }
            >
                <div className="room-summary__wrapper">
                    <img className="room-summary__photo" src={ `/assets/${name}.jpg` } />
                    <div className="room-summary__tint" />
                    <div className="room-summary__event">
                        <p className="room-summary-event__title">
                            {title}
                        </p>
                        <div className="room-summary-event__progress-bar">
                            <div className="room-summary-event__progress-duration">
                                <div className="room-summary-event__progress" style={ progressStyle } />
                            </div>
                        </div>
                        <p className="room-summary-event__subtitle">
                            {subtitle}
                        </p>
                        <p className="room-summary-event__description">
                            {description}
                        </p>
                    </div>
                </div>
                <div
                  className="room-summary__name"
                  ref={ el => (this.nameRef = el) }
                  style={ { transform: `translateX(${this.computeNameTranslateX()}px)` } }
                >
                    {name}
                </div>
            </div>
        );
    }
}

RoomSummary.propTypes = {
    name: PropTypes.string.isRequired,
    direction: PropTypes.oneOf(['left', 'right']).isRequired,
    event: PropTypes.object,
    nextEvent: PropTypes.object,
    compact: PropTypes.bool.isRequired,
    fullScreen: PropTypes.bool.isRequired,
    isRoomFree: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired
};

RoomSummary.contextTypes = {
    translate: PropTypes.func,
    currentTime: PropTypes.number
};

export default RoomSummary;

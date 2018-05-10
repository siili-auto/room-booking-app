import React, { Component, PropTypes } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import cx from 'classnames';

import { RoomSummary, Agenda, RoomAction } from './';

class Room extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        return shallowCompare(this, nextProps, nextState);
    }

    render() {
        const {
            name,
            direction,
            agenda,
            currentEvent,
            nextEvent,
            active,
            single,
            bookingDurations,
            isBookingPanelActive,
            isUpdating,
            isFree,
            isRefreshed,
            onToggleRoom,
            onToggleBooking,
            onBookRoom,
            onRemoveBooking
        } = this.props;
        const roomClassName = cx('room', {
            'room--active': active,
            'room--single': single,
            'room--free': isFree,
            'room--booking': isBookingPanelActive
        }, `room--${ direction }`);

        return (
            <div className={ roomClassName }>
                <RoomSummary
                  name={ name }
                  event={ currentEvent }
                  nextEvent={ nextEvent }
                  compact={ active }
                  fullScreen={ single }
                  isRoomFree={ isFree }
                  direction={ direction }
                  onClick={ onToggleRoom }
                />
                <Agenda
                  name={ name }
                  events={ agenda }
                  visible={ active }
                  single={ single }
                  pushed={ isBookingPanelActive }
                  inProgress={ isUpdating }
                  isRefreshed={ isRefreshed }
                  onRemoveBooking={ onRemoveBooking }
                />
                <RoomAction
                  direction={ direction }
                  enabled={ active && isFree }
                  active={ isBookingPanelActive && isFree }
                  durations={ bookingDurations }
                  inProgress={ isUpdating }
                  onToggleBooking={ onToggleBooking }
                  onBookRoom={ onBookRoom }
                  nextEvent={ nextEvent }
                />
            </div>
        );
    }

}

Room.propTypes = {
    name: PropTypes.string.isRequired,
    direction: PropTypes.oneOf(['left', 'right']).isRequired,
    agenda: PropTypes.array.isRequired,
    currentEvent: PropTypes.object,
    nextEvent: PropTypes.object,
    active: PropTypes.bool.isRequired,
    single: PropTypes.bool.isRequired,
    bookingDurations: PropTypes.array.isRequired,
    isUpdating: PropTypes.bool.isRequired,
    isBookingPanelActive: PropTypes.bool.isRequired,
    isFree: PropTypes.bool.isRequired,
    isRefreshed: PropTypes.bool.isRequired,
    onToggleRoom: PropTypes.func.isRequired,
    onToggleBooking: PropTypes.func.isRequired,
    onBookRoom: PropTypes.func.isRequired,
    onRemoveBooking: PropTypes.func.isRequired
};

export default Room;

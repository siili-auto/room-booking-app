import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import cx from 'classnames';
import { isNull, map } from 'lodash';

import { IDLE_TIME_TO_RESET_ROOM_SELECTION } from './../config';
import * as actions from './../actions';
import { getRoomsSelector, getIsAppUpdating } from '../selectors';

import ReactIdle from 'react-idle';
import { RoomsSetup, Preloader, TopBar, Room, ErrorMessage } from './../components';

import { translate } from './../../i18n';

class Main extends Component {

    getChildContext() {
        const { currentTime } = this.props;

        return {
            currentTime,
            translate,
        };
    }

    getRoomClassName(id) {
        return id === 0 ? 'first' : 'second';
    }

    toggleRoom = (roomId) => {
        const { activeRoom, actions: { selectRoom, deselectRoom } } = this.props;
        return () => isNull(activeRoom) ? selectRoom(roomId) : deselectRoom();
    }

    toggleBooking = (roomId, roomName) => {
        const { rooms, actions: { enterRoomBooking, exitRoomBooking } } = this.props;
        return () => rooms[roomId].isBookingPanelActive
            ? exitRoomBooking(roomId) : enterRoomBooking(roomId, roomName);
    }

    makeBooking = (roomName, roomId) => {
        const { actions: { bookRoom } } = this.props;
        return (duration) => () => {
            bookRoom(roomId, roomName, duration);
        };
    }

    removeBooking = (roomName, roomId) => {
        return (eventId) => () => {
            this.props.actions.removeRoomBooking(roomId, roomName, eventId);
        };
    }

    render () {
        const { init, mode, isUpdating, error, activeRoom, rooms, actions: { deselectRoom, dismissError } } = this.props;
        const roomsClassName = cx('main__rooms',
            {
                [`main__rooms--${ this.getRoomClassName(activeRoom) }-active`]: activeRoom !== null
            });

        return (
            <div className="main">
                { !mode &&
                <RoomsSetup />
                }
                <Preloader show={ init }/>
                { mode &&
                <div className={ roomsClassName }>
                    {
                        map(rooms, ({ name, isBookingPanelActive, processingStatus, agenda, currentEvent, nextEvent, availableDurations }, index) => {
                            const isRoomActive = activeRoom === index;
                            const className = cx(
                                'main__room',
                                `main__room--${ this.getRoomClassName(index) }`,
                                { 'main__room--active': isRoomActive }
                            );
                            return (
                                <div className={ className } key={ index }>
                                    <Room
                                      name={ name }
                                      direction={ index === 0 ? 'left' : 'right' }
                                      agenda={ agenda }
                                      currentEvent={ currentEvent }
                                      nextEvent={ nextEvent }
                                      active={ isRoomActive }
                                      single={ rooms.length === 1 }
                                      bookingDurations={ availableDurations }
                                      isBookingPanelActive={ isBookingPanelActive }
                                      isUpdating={ processingStatus.isUpdating }
                                      isFree={ isNull(currentEvent) }
                                      isRefreshed={ !processingStatus.isAwaitingRefresh }
                                      canBook={ availableDurations.length }
                                      onToggleRoom={ this.toggleRoom(index) }
                                      onToggleBooking={ this.toggleBooking(index, name) }
                                      onBookRoom={ this.makeBooking(name, index) }
                                      onRemoveBooking={ this.removeBooking(name, index) }
                                    />
                                </div>
                            );
                        })
                    }
                </div>}
                <TopBar
                  showBackLink={ activeRoom !== null }
                  loading={ isUpdating }
                  onGoBack={ deselectRoom }
                />
                <ErrorMessage
                  isShowing={ !isNull(error) }
                  content={ isNull(error) ? '' : error }
                  onConfirm={ dismissError }
                />
                <ReactIdle
                  timeout={ IDLE_TIME_TO_RESET_ROOM_SELECTION }
                  onChange={ ({ idle }) => {
                      if (idle) {
                          deselectRoom();
                      }
                  } }
                />
            </div>
        );
    }
}

Main.propTypes = {
    currentTime: PropTypes.number,
    init: PropTypes.bool.isRequired,
    mode: PropTypes.string,
    isUpdating: PropTypes.bool.isRequired,
    error: PropTypes.string,
    activeRoom: PropTypes.number,
    rooms: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};

Main.childContextTypes = {
    translate: PropTypes.func,
    currentTime: PropTypes.number,
};

const mapStateToProps = state => {
    return {
        ...state.app,
        isUpdating: getIsAppUpdating(state),
        error: state.modal.error,
        rooms: getRoomsSelector(state)
            .map((room, index) => room(state, index))
    };
};

const mapDispatchToProps = dispatch => ({ actions: bindActionCreators(actions, dispatch) });

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Main);

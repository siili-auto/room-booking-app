import React, { Component, PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import cx from 'classnames';
import { capitalize } from 'lodash';

import AgendaEvent from './AgendaEvent';
import Message from './Message';

import { showConfirmModal, hideConfirmModal }  from './../actions';
import { isCurrentTimeBefore, isCurrentTimeBetween } from './../helpers';

class Agenda extends Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        events: PropTypes.array.isRequired,
        visible: PropTypes.bool.isRequired,
        single: PropTypes.bool.isRequired,
        pushed: PropTypes.bool.isRequired,
        inProgress: PropTypes.bool.isRequired,
        isRefreshed: PropTypes.bool.isRequired,
        onRemoveBooking: PropTypes.func.isRequired,
        eventToRemove: PropTypes.string,
        isModalShowing: PropTypes.bool.isRequired,
        actions: PropTypes.object.isRequired
    };

    static contextTypes = {
        translate: PropTypes.func.isRequired,
    };

    constructor(props, context) {
        super(props, context);

        this.removeBooking = this.removeBooking.bind(this);
        this.confirmRemoveBooking = this.confirmRemoveBooking.bind(this);
        this.cancelRemoveBooking = this.cancelRemoveBooking.bind(this);
    }

    removeBooking(eventId) {
        const { name, actions: { showConfirmModal } } = this.props;

        return () => () => {
            showConfirmModal(name, eventId);
        };
    }

    confirmRemoveBooking() {
        const { name, eventToRemove, onRemoveBooking, actions: { hideConfirmModal } } = this.props;

        return () => {
            hideConfirmModal(name);

            onRemoveBooking(eventToRemove)();
        };
    }

    cancelRemoveBooking() {
        const { name, actions: { hideConfirmModal } } = this.props;

        return () => {
            hideConfirmModal(name);
        };
    }

    render() {
        const { translate } = this.context;
        const { events, visible, single, pushed, inProgress, isRefreshed, isModalShowing } = this.props;
        const agendaEmpty = events.length === 0 ?
            (<h2 className="agenda__empty">{
                translate('room-available-till-end-of-day')
            }</h2>) :
            null;
        const agendaClassName = cx('agenda', {
            'agenda--visible': visible,
            'agenda--single': single,
            'agenda--pushed': pushed
        });

        return (
            <div className={ agendaClassName }>
                { agendaEmpty }
                <ReactCSSTransitionGroup
                    component="div"
                    className="agenda__events"
                    transitionName="agenda__transition"
                    transitionEnterTimeout={ 800 }
                    transitionLeaveTimeout={ 800 }
                >
                    { events.map(event => {
                        const { id, uniqueKey, timeStart, timeEnd } = event;
                        return (
                            <AgendaEvent
                                key={ uniqueKey }
                                isCurrent={ isCurrentTimeBetween(timeStart, timeEnd) }
                                isUpcoming={ isCurrentTimeBefore(timeStart) }
                                inProgress={ inProgress }
                                isRefreshed= { isRefreshed }
                                { ...event }
                                onRemoveBooking={ this.removeBooking(id) }
                            />
                        );
                    }) }
                </ReactCSSTransitionGroup>
                <Message
                    isShowing={ isModalShowing }
                    title={ translate('terminate-modal-title') }
                    onConfirm={ this.confirmRemoveBooking() }
                    onCancel={ this.cancelRemoveBooking() }
                    confirmLabel={ translate('terminate-button') }
                >
                    { translate('terminate-confirm', { name: capitalize(this.props.name) }) }
                </Message>
            </div>
        );
    }

}

const mapStateToProps = state => ({
        roomsModals: state.modal.roomsModals
    });

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({ showConfirmModal, hideConfirmModal }, dispatch)
});

const mergeProps = (stateProps, dispatchProps, ownProps) =>
    Object.assign({}, dispatchProps, ownProps, {
        eventToRemove: stateProps.roomsModals[ownProps.name].eventToRemove,
        isModalShowing: stateProps.roomsModals[ownProps.name].isModalConfirmShown
    });

export default connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps
)(Agenda);

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { find, defaults, pick, keys } from 'lodash';

import { setAppConfigToStorage } from '../configs/configStorage';
import { runApp } from './../actions';
import { appModesDefinitions, getDefaultRoomsMode, getDefaultModeLocations } from '../configs/appSetupConfig';

import { RoomSelection, ToggleButton } from './../components';

const applyValuesOnDefaults = (defaultsObject, valuesObject) => {
    const resultValuesObject = defaults(valuesObject, defaultsObject);

    return pick(resultValuesObject, keys(defaultsObject));
};

class RoomsSetup extends Component {
    constructor(props, context) {
        super(props, context);

        const { mode, locations } = getDefaultRoomsMode();

        const modeDefinition = find(appModesDefinitions, d => mode === d.mode);

        this.state = { modeDefinition, locations };
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.rooms === nextProps.rooms) {
            return;
        }

        this.setDefaultRoomsAtLocations(this.state.modeDefinition, nextProps.rooms);
    }

    setDefaultRoomsAtLocations = (modeDefinition, rooms) => {
        const defaultLocations = getDefaultModeLocations(modeDefinition, rooms);

        this.setState({
            locations: {
                ...applyValuesOnDefaults(defaultLocations, this.state.locations)
            }
        });
    };

    getSwitchModeHandler = (modeDefinition) => {
        return () => {
            this.setState({
                modeDefinition: modeDefinition
            });

            this.setDefaultRoomsAtLocations(modeDefinition, this.props.rooms);
        };
    };

    getSelectRoomHandler = (location) => {
        return (room) => () => {
            this.setState({
                locations: {
                    ...this.state.locations,
                    [location]: room
                }
            });
        };
    };

    confirmRooms = () => {
        const { modeDefinition, locations } = this.state;
        const appMode = { mode: modeDefinition.mode, locations };

        setAppConfigToStorage(appMode);

        this.props.actions.runApp(appMode);
    };

    render() {
        const { translate } = this.context;
        const { rooms } = this.props;
        const { modeDefinition } = this.state;

        return (
            <div className="rooms-setup">
                <div className="rooms-setup__modes">
                    { appModesDefinitions.map(md => (
                        <div
                            key={ md.mode }
                            className="rooms-setup__mode">
                            <ToggleButton
                                id={ `mode-${md.mode}-rb` }
                                name="mode-rbg"
                                text={ `${md.modeName}` }
                                isChecked={ modeDefinition.mode === md.mode }
                                onToggle={ this.getSwitchModeHandler(md) }
                            />
                        </div> )
                    ) }
                </div>
                <div className="rooms-setup__rooms">
                    { modeDefinition.roomsLocations.map(l => (
                        <RoomSelection
                            key={ l.location }
                            location={ l.location }
                            locationName={ l.locationName }
                            rooms={ rooms }
                            activeRoom={ this.state.locations[ l.location ] }
                            onRoomSelected={ this.getSelectRoomHandler(l.location) }
                        /> )
                    ) }
                </div>
                <div className="rooms-setup__confirm">
                    <button
                        className="rooms-setup__confirm-button"
                        onClick={ this.confirmRooms }>
                        { translate('configurator-confirm-button') }
                    </button>
                </div>
            </div>
        );
    }
}

RoomsSetup.propTypes = {
    rooms: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};

RoomsSetup.contextTypes = {
    translate: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    rooms: state.app.rooms
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({ runApp }, dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RoomsSetup);


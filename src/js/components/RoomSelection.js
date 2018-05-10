import React, { PropTypes } from 'react';
import cx from 'classnames';

import { ToggleButton } from './../components';

const RoomSelection = ({ location, locationName, rooms, activeRoom, onRoomSelected }) => {
    const labelClassName = cx('room-selection__label',
        `room-selection__label--${ location }`);

    return (
        <div className="room-selection">
            <h2 className={ labelClassName }>
                { locationName }
            </h2>
            <div className="room-selection__rooms">
                {rooms.map(room => (
                        <div key={ room.name } className="room-selection__room">
                            <ToggleButton
                                id={ `room-${location}-${room.name}-rb` }
                                name={ `room-${location}-rbg` }
                                text={ room.name }
                                isChecked={ activeRoom.name === room.name }
                                isSmall={ true }
                                onToggle={ onRoomSelected(room) }/>
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

RoomSelection.propTypes = {
    location: PropTypes.string.isRequired,
    locationName: PropTypes.string.isRequired,
    rooms: PropTypes.array.isRequired,
    activeRoom: PropTypes.object,
    onRoomSelected: PropTypes.func
};

export default RoomSelection;

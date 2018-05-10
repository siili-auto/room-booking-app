import { ROOM_MODE, ROOM_LOCATION } from '../enums/roomsModeEnums';

export const getDefaultRoom = (availableRooms) => availableRooms[ 0 ];

export const getDefaultModeLocations = (mode, rooms) =>
    mode.roomsLocations.reduce((locations, next) => {
            return {
                ...locations,
                [next.location]: getDefaultRoom(rooms)
            };
        },
    {});

export const getDefaultRoomsMode = () =>
    ({
        mode: ROOM_MODE.SINGLE,
        locations: {}
    });

export const appModesDefinitions = [
    {
        mode: ROOM_MODE.SINGLE,
        modeName: 'Single room',
        roomsLocations: [
            {
                location: ROOM_LOCATION.LEFT,
                locationName: 'Left room'
            }
        ]
    },
    {
        mode: ROOM_MODE.DOUBLE,
        modeName: 'Double room',
        roomsLocations: [
            {
                location: ROOM_LOCATION.LEFT,
                locationName: 'Left room'
            },
            {
                location: ROOM_LOCATION.RIGHT,
                locationName: 'Right room'
            }
        ]
    }
];

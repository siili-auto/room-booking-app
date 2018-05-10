import { createSelector } from 'reselect/';
import { some } from 'lodash';

// input selectors
const getRooms = (state) => state.rooms;

// memoized selectors
export const getIsAppUpdating = createSelector(
    [getRooms],
    (rooms) => some(rooms, ({ processingStatus }) => processingStatus.isUpdating));

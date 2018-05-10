import { getTimeAndUnitFromMinutes } from './timeHelpers';

describe('timeHelpers - getTimeAndUnitFromMinutes', () => {
    it('should return minutes', () => {
        expect(getTimeAndUnitFromMinutes(1)).toEqual({
            unit: 'm',
            value: 1,
        });
        expect(getTimeAndUnitFromMinutes(30)).toEqual({
            unit: 'm',
            value: 30,
        });
        expect(getTimeAndUnitFromMinutes(200)).toEqual({
            unit: 'm',
            value: 200,
        });
    });

    it('should return hours', () => {
        expect(getTimeAndUnitFromMinutes(60)).toEqual({
            unit: 'H',
            value: 1,
        });
        expect(getTimeAndUnitFromMinutes(120)).toEqual({
            unit: 'H',
            value: 2,
        });
    });
});

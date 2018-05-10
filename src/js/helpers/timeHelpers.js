import moment from 'moment';

export const getTimeAndUnitFromMinutes = minutes => {
    const duration = moment.duration(minutes, 'minutes');

    const isFullHours = duration.hours() && !duration.minutes();

    return {
        value: isFullHours ? duration.asHours() : duration.asMinutes(),
        unit: isFullHours ? 'H' : 'm'
    };
};

export const formatTime = time => moment(time).format('H:mm'); //

export const getCurrentHour = () => moment().format('HH:mm');

export const isCurrentTimeBetween = (start, end) => moment().isBetween(start, end, 'minute', '[)');

export const isCurrentTimeBefore = time => moment().isBefore(time);

export const calculateMinutesLeft = end => moment.duration(moment(end).diff(moment()));

export const calculateTimeLeft = end => calculateMinutesLeft(end).humanize();

export const calculateTimeProgress = (start, end) => Math.round((moment() - moment(start)) / (moment(end) - moment(start)) * 100);

export const generateEventTime = hour => moment(hour, 'HH:mm');

export const generateEventTimeString = hour => generateEventTime(hour).toISOString();


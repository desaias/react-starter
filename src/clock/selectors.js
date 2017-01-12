import { createSelector } from 'reselect';

export const feature = 'clock';

export let getDate = (state) => state[feature].date;

export const getTime = createSelector(
    getDate,
    (date) => format(date)
);

const format = (date) => {
    const yyyy = date.getFullYear();
    const mm = date.getMonth () + 1;
    const dd = date.getDate();
    const hh = date.getHours();
    const m = date.getMinutes();
    const s = date.getSeconds();

    return `${mm}/${dd}/${yyyy} ${hh}:${m}:${s}`;
};

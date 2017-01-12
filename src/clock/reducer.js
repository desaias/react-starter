import { CHANGE_DATE } from './constants';

const initialState = {
    date: new Date()
};

function clockReducer(state = initialState, action) {
    switch (action.type) {
        case CHANGE_DATE:
            return Object.assign({}, state, {
                date: action.date
            });

        default:
            return state;
    }
}

export default clockReducer;


import { Action, combineReducers } from 'redux';
import { ActionTypes } from './actions';

const counterReducer = (state = 0, action: Action) => {
    switch (action.type) {
        case ActionTypes.INCREMENT: 
            return state + 1;
        case ActionTypes.DECREMENT:
            return state - 1;
        default:
            return state;
    }
}

export default combineReducers({
    counter: counterReducer
});
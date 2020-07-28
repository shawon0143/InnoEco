import { Event, TEvent } from '../types/event';
import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';
import { EventActions } from '../types/eventActionTypes';

const initialState: Event = {
    allEvents: {},
    error: '',
    loading: false
};

const getAllEventsStart = (state: Event, action: any) => {
    return updateObject(state, {loading: true, error: ''});
};

const getAllEventsSuccess = (state: Event, action: any) => {
    let allEvents: { [id: string]: TEvent } = {};
    for (let i = 0; i < action.events.length; i++) {
        allEvents[action.events[i]._id] = Object.assign({}, action.events[i]);
    }
    return updateObject(state, {allEvents: allEvents, error: '', loading: false});
}

const getAllEventsFail = (state: Event, action: any) => {
    return updateObject(state, {loading: false, error: action.error});
};

const registerEventSuccess = (state: Event, action: any) => {
    let eventId = action.eventId;
    let updatedEventArray = {...state.allEvents};
    let selectedEvent = {...updatedEventArray[eventId]};
    let members = [...selectedEvent.members];
    members = [...members, action.userEmail];
    return {
        ...state,
        allEvents: {
            ...state.allEvents,
            [action.eventId]: {
                ...state.allEvents[eventId],
                members: members
            }
        }
    }
}

// const resetEvents = (state: Event, action: any) => {
//     return updateObject(state, {loading: false, error: '', allEvents: {}});
// };


const reducer = (state= initialState, action: EventActions): Event => {
    switch (action.type) {
        case actionTypes.GET_ALL_EVENTS_START:
            return getAllEventsStart(state, action);
        case actionTypes.GET_ALL_EVENTS_FAIL:
            return getAllEventsFail(state, action);
        case actionTypes.GET_ALL_EVENTS_SUCCESS:
            return getAllEventsSuccess(state, action);
        case actionTypes.REGISTER_EVENT_SUCCESS:
            return registerEventSuccess(state, action);
        default:
            return state;
    }
};
export default reducer;


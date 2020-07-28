import * as actionTypes from '../actions/actionTypes';
import { TEvent } from './event';


export interface GetAllEventsStart {
    type: typeof actionTypes.GET_ALL_EVENTS_START;
}

export interface GetAllEventsFail {
    type: typeof actionTypes.GET_ALL_EVENTS_FAIL;
    error: string;
}

export interface GetAllEventsSuccess {
    type: typeof actionTypes.GET_ALL_EVENTS_SUCCESS;
    events: any;
}

export interface RegisterEventSuccess {
    type: typeof actionTypes.REGISTER_EVENT_SUCCESS;
    eventId: string;
    userEmail: string;
}

export type EventActionTypes = 
      GetAllEventsStart
    | GetAllEventsFail
    | GetAllEventsSuccess
    | RegisterEventSuccess;

export type EventActions = EventActionTypes;


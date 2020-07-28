import * as actionTypes from './actionTypes';
import {EventActions} from '../types/eventActionTypes';
import {callApi} from "../../shared/axios";
import {Dispatch} from "redux";
// import configureStore from "../configureStore";

export const createNewEvent = (data: any) => {
    return () => {
        callApi('addEvent', data, null,(err: any, result: any) => {
            if (err) {
                console.log(err);
            } else {
                console.log(result);
            }
        })
    }
};

export const getAllEventsStart = (): EventActions => ({
    type: actionTypes.GET_ALL_EVENTS_START
});

export const getAllEventFail = (error: string): EventActions => ({
    type: actionTypes.GET_ALL_EVENTS_FAIL,
    error: error
});

export const getAllEventSuccess = (events: any): EventActions => ({
    type: actionTypes.GET_ALL_EVENTS_SUCCESS,
    events: events
});

export const getAllEvents = ()  => {
    return (dispatch: Dispatch<EventActions>) => {
        dispatch(getAllEventsStart());
        callApi('getAllEvents', null, null, (err: any, result: any) => {
            if (err) {
                console.log(err);
                dispatch(getAllEventFail('get all events fail'));
            } else {
                // console.log(result);
                dispatch(getAllEventSuccess(result.events));
            }
        })
    }
};

export const registerEventSuccess = (eventId: string, userEmail: string): EventActions => ({
    type: actionTypes.REGISTER_EVENT_SUCCESS,
    eventId: eventId,
    userEmail: userEmail
}); 

export const registerEvent = (email: string, eventId: string) => {
    return (dispatch: Dispatch<EventActions>) => {
        callApi('registerEvent', {email: email}, {eventId: eventId}, (err: any, result: any) => {
            if (err) {
                console.log(err);
            } else {
                console.log(result);
                dispatch(registerEventSuccess(eventId, email));
            }
        });
    }
};

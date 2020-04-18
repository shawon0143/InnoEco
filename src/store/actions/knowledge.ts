import * as actionTypes from './actionTypes';
import {KnowledgeActions} from "../types/knowledgeActionTypes";
import {callApi} from "../../shared/axios";
import {Dispatch} from "redux";
// import {store} from "../configureStore";

// =====================================
// ======= Create new knowledge ========
// =====================================

export const createKnowledgeStart = (): KnowledgeActions => {
    return {
        type: actionTypes.CREATE_KNOWLEDGE_START
    }
};

export const createKnowledgeSuccess = (): KnowledgeActions => {
    return {
        type: actionTypes.CREATE_KNOWLEDGE_SUCCESS
    }
};

export const createKnowledgeFail = (error: string): KnowledgeActions => {
    return {
        type: actionTypes.CREATE_KNOWLEDGE_FAIL,
        error: error
    }
};

export const createKnowledge = (data: any) => {
    return (dispatch: Dispatch<KnowledgeActions>) => {
        dispatch(createKnowledgeStart());
        callApi('createKnowledge', data, null, (err: any, result: any) => {
            if (err) {
                console.log(err);
                dispatch(createKnowledgeFail(err));
            } else {
                console.log(result);
                dispatch(createKnowledgeSuccess());
            }
        });
    }
};

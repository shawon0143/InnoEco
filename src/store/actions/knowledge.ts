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

export const createKnowledgeSuccess = (successFeedback: string): KnowledgeActions => {
    return {
        type: actionTypes.CREATE_KNOWLEDGE_SUCCESS,
        successFeedback: successFeedback
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
        // we called this action from createKnowledgeForm.tsx
        // dispatch(createKnowledgeStart());
        callApi('createKnowledge', data, null, (err: any, result: any) => {
            if (err) {
                console.log(err);
                dispatch(createKnowledgeFail(err));
                // we hide the error message after 5 seconds
                setTimeout(() => {
                    dispatch(resetKnowledgeFlags());
                }, 5000);
            } else {
                console.log(result);
                dispatch(createKnowledgeSuccess(result.message));
                // we hide the success message after 5 seconds
                setTimeout(() => {
                    dispatch(resetKnowledgeFlags());
                }, 5000);
            }
        });
    }
};


export const resetKnowledgeFlags = (): KnowledgeActions => ({
    type: actionTypes.RESET_KNOWLEDGE_FLAGS
});

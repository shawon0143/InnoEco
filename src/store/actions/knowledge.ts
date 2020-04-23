import * as actionTypes from './actionTypes';
import {KnowledgeActions} from "../types/knowledgeActionTypes";
import {callApi} from "../../shared/axios";
import {Dispatch} from "redux";
import {getUserById} from "./auth";
import {TCreatedBy} from "../types/knowledge";

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
// =====================================
// ======== Get all knowledge ==========
// =====================================

export const getAllKnowledgeStart = (): KnowledgeActions => ({
   type: actionTypes.GET_ALL_KNOWLEDGE_START
});

export const getAllKnowledgeFail = (error: string): KnowledgeActions => ({
    type: actionTypes.GET_ALL_KNOWLEDGE_FAIL,
    getAllKnowledgeError: error
});

export const getAllKnowledgeSuccess = (result: any): KnowledgeActions => ({
    type: actionTypes.GET_ALL_KNOWLEDGE_SUCCESS,
    totalNoOfKnowledge: result.count,
    knowledge: result.knowledge
});

export const loadKnowledgeCreatorDetails = (users: TCreatedBy[]): KnowledgeActions => ({
    type: actionTypes.LOAD_KNOWLEDGE_CREATOR_DETAILS,
    users: users,
});

export const getAllKnowledge = () => {
    return (dispatch: Dispatch<KnowledgeActions>) => {
        dispatch(getAllKnowledgeStart());
        callApi('getKnowledge', null, null,async (err: any, result: any) => {
           if (err) {
               console.log(err);
               dispatch(getAllKnowledgeFail(err.message));
           } else {
               // console.log(result);
               dispatch(getAllKnowledgeSuccess(result));
               let userIdList: any = [];
                   for (let i = 0; i < result.knowledge.length; i++) {
                       if (!userIdList.includes(result.knowledge[i].createdBy)) {
                           userIdList.push(result.knowledge[i].createdBy);
                       }
                   }
                // console.log(userIdList);
                let users = await getUserById(userIdList);
                // console.log(users);
                dispatch(loadKnowledgeCreatorDetails(users));

           }
        });
    };
};


export const resetKnowledgeFlags = (): KnowledgeActions => ({
    type: actionTypes.RESET_KNOWLEDGE_FLAGS
});

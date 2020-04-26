import * as actionTypes from '../actions/actionTypes';
import {TComment, TUserDetails, TKnowledge} from "./knowledge";

export interface CreateKnowledgeStart {
    type: typeof actionTypes.CREATE_KNOWLEDGE_START;
}
export interface CreateKnowledgeSuccess {
    type: typeof actionTypes.CREATE_KNOWLEDGE_SUCCESS;
    successFeedback: string;
}
export interface CreateKnowledgeFail {
    type: typeof actionTypes.CREATE_KNOWLEDGE_FAIL;
    error: string;
}

export interface GetAllKnowledgeStart {
    type: typeof actionTypes.GET_ALL_KNOWLEDGE_START;
}

export interface GetAllKnowledgeFail {
    type: typeof actionTypes.GET_ALL_KNOWLEDGE_FAIL;
    getAllKnowledgeError: string;
}

export interface GetAllKnowledgeSuccess {
    type: typeof actionTypes.GET_ALL_KNOWLEDGE_SUCCESS;
    totalNoOfKnowledge: number;
    knowledge: any;
}

export interface LoadKnowledgeCreatorDetails {
    type: typeof actionTypes.LOAD_KNOWLEDGE_CREATOR_DETAILS;
    users: TUserDetails[]
}

export interface UpdateKnowledgeStart {
    type: typeof actionTypes.UPDATE_KNOWLEDGE_START;
}

export interface UpdateKnowledgeFail {
    type: typeof actionTypes.UPDATE_KNOWLEDGE_FAIL;
    updateKnowledgeError: string;
}

export interface UpdateKnowledgeSuccess {
    type: typeof actionTypes.UPDATE_KNOWLEDGE_SUCCESS;
    knowledge: TKnowledge;
}

export interface AddCommentToKnowledge {
    type: typeof actionTypes.ADD_COMMENT_TO_KNOWLEDGE;
    comment: TComment;
    knowledgeId: string;
}

export interface ResetKnowledgeFlags {
    type: typeof actionTypes.RESET_KNOWLEDGE_FLAGS
}

export type KnowledgeActionTypes =
    CreateKnowledgeStart
    | CreateKnowledgeSuccess
    | CreateKnowledgeFail
    | ResetKnowledgeFlags
    | GetAllKnowledgeStart
    | GetAllKnowledgeFail
    | GetAllKnowledgeSuccess
    | LoadKnowledgeCreatorDetails
    | UpdateKnowledgeStart
    | UpdateKnowledgeFail
    | UpdateKnowledgeSuccess
    | AddCommentToKnowledge;


export type KnowledgeActions = KnowledgeActionTypes;

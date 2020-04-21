import * as actionTypes from '../actions/actionTypes';
import {TCreatedBy} from "./knowledge";

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
    users: TCreatedBy[]
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
    | LoadKnowledgeCreatorDetails;


export type KnowledgeActions = KnowledgeActionTypes;

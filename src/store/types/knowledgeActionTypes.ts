import * as actionTypes from '../actions/actionTypes';

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

export interface ResetKnowledgeFlags {
    type: typeof actionTypes.RESET_KNOWLEDGE_FLAGS
}

export type KnowledgeActionTypes =
    CreateKnowledgeStart
    | CreateKnowledgeSuccess
    | CreateKnowledgeFail
    | ResetKnowledgeFlags;


export type KnowledgeActions = KnowledgeActionTypes;

import * as actionTypes from '../actions/actionTypes';

export interface CreateKnowledgeStart {
    type: typeof actionTypes.CREATE_KNOWLEDGE_START;
}
export interface CreateKnowledgeSuccess {
    type: typeof actionTypes.CREATE_KNOWLEDGE_SUCCESS;
}
export interface CreateKnowledgeFail {
    type: typeof actionTypes.CREATE_KNOWLEDGE_FAIL;
    error: string;
}

export type KnowledgeActionTypes =
    CreateKnowledgeStart
    | CreateKnowledgeSuccess
    | CreateKnowledgeFail;


export type KnowledgeActions = KnowledgeActionTypes;

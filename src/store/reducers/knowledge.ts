import {Knowledge, TComment, TKnowledge} from "../types/knowledge";
import {KnowledgeActions} from '../types/knowledgeActionTypes';
import * as actionTypes from '../actions/actionTypes';
import {updateObject} from "../../shared/utility";

const initialState: Knowledge = {
    error: '',
    loading: false,
    successFeedback: '',
    getAllKnowledgeError: '',
    getAllKnowledgeLoading: false,
    updateKnowledgeError: '',
    updateKnowledgeLoading: false,
    allKnowledge: {},
    totalNoOfKnowledge: 0
};

const createKnowledgeStart = (state: Knowledge, action: any) => {
    return updateObject(state, {error: '', loading: true});
};

const createKnowledgeSuccess = (state: Knowledge, action: any) => {
    return updateObject(state, {error: '', loading: false, successFeedback: action.successFeedback});
};

const createKnowledgeFail = (state: Knowledge, action: any) => {
    return updateObject(state, {error: action.error, loading: false});
};

const getAllKnowledgeStart = (state: Knowledge, action: any) => {
    return updateObject(state, {getAllKnowledgeError: '', getAllKnowledgeLoading: true});
};

const getAllKnowledgeFail = (state: Knowledge, action: any) => {
    return updateObject(state, {getAllKnowledgeError: action.getAllKnowledgeError, getAllKnowledgeLoading: false});
};

const getAllKnowledgeSuccess = (state: Knowledge, action: any) => {
    let allKnowledge: { [id: string]: TKnowledge } = {};
    for (let i = 0; i < action.knowledge.length; i++) {
        allKnowledge[action.knowledge[i]._id] = Object.assign({}, action.knowledge[i]);
    }
    return updateObject(state, {allKnowledge: allKnowledge, getAllKnowledgeError: '', getAllKnowledgeLoading: false});
};

// update knowledge =====

const updateKnowledgeStart = (state: Knowledge, action: any) => {
    return updateObject(state, {updateKnowledgeError: '', updateKnowledgeLoading: true});
};

const updateKnowledgeFail = (state: Knowledge, action: any) => {
    return updateObject(state, {updateKnowledgeError: action.updateKnowledgeError, updateKnowledgeLoading: false});
};

const updateKnowledgeSuccess = (state: Knowledge, action: any) => {
    console.log(action.knowledge);
    let updatedKnowledgeArray = {...state.allKnowledge};
    updatedKnowledgeArray[action.knowledge._id] = action.knowledge;
    return updateObject(state, {allKnowledge: updatedKnowledgeArray, updateKnowledgeError: '', updateKnowledgeLoading: false});
};

const addCommentToKnowledge = (state: Knowledge, action: any) => {
    let comment: TComment = action.comment;
    let knowledgeId = action.knowledgeId;
    let updatedKnowledgeArray = {...state.allKnowledge};
    let selectedKnowledge = {...updatedKnowledgeArray[knowledgeId]};
    let comments = [...selectedKnowledge.comments];
    comments = [...comments, comment];
    return {
        ...state,
        allKnowledge: {
            ...state.allKnowledge,
            [knowledgeId]: {
                ...state.allKnowledge[knowledgeId],
                comments: comments
            }
        }
    }
};

const resetKnowledgeFlags = (state: Knowledge, action: any) => {
    return updateObject(state, {error: '', loading: false, successFeedback: ''});
};


const reducer = (state = initialState, action: KnowledgeActions): Knowledge => {
    switch (action.type) {
        case actionTypes.CREATE_KNOWLEDGE_START: return createKnowledgeStart(state, action);
        case actionTypes.CREATE_KNOWLEDGE_SUCCESS: return createKnowledgeSuccess(state, action);
        case actionTypes.CREATE_KNOWLEDGE_FAIL: return createKnowledgeFail(state, action);
        case actionTypes.RESET_KNOWLEDGE_FLAGS: return resetKnowledgeFlags(state, action);
        case actionTypes.GET_ALL_KNOWLEDGE_START: return getAllKnowledgeStart(state, action);
        case actionTypes.GET_ALL_KNOWLEDGE_FAIL: return getAllKnowledgeFail(state, action);
        case actionTypes.GET_ALL_KNOWLEDGE_SUCCESS: return getAllKnowledgeSuccess(state, action);
        case actionTypes.UPDATE_KNOWLEDGE_START: return updateKnowledgeStart(state, action);
        case actionTypes.UPDATE_KNOWLEDGE_FAIL: return updateKnowledgeFail(state, action);
        case actionTypes.UPDATE_KNOWLEDGE_SUCCESS: return updateKnowledgeSuccess(state, action);
        case actionTypes.ADD_COMMENT_TO_KNOWLEDGE: return addCommentToKnowledge(state, action);
        default:
            return state;
    }

};
export default reducer;

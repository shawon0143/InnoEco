import {Knowledge, TKnowledge} from "../types/knowledge";
import { KnowledgeActions } from '../types/knowledgeActionTypes';
import * as actionTypes from '../actions/actionTypes';
import { updateObject } from "../../shared/utility";

const initialState: Knowledge = {
    error: '',
    loading: false,
    successFeedback: '',
    getAllKnowledgeError: '',
    getAllKnowledgeLoading: false,
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

const loadKnowledgeCreatorDetails = (state: Knowledge, action: any) => {
    // console.log(action.users);
    // console.log(state.allKnowledge);
    let updatedKnowledgeArray = {...state.allKnowledge};
    for (let key in updatedKnowledgeArray) {
        if (updatedKnowledgeArray.hasOwnProperty(key)) {
            let userDetails = updatedKnowledgeArray[key].createdBy;
            for (let i = 0; i < action.users.user.length; i++) {
                if (action.users.user[i]._id === userDetails) {
                    userDetails = action.users.user[i];
                    updatedKnowledgeArray[key].createdBy = userDetails;
                }
            }
        }
    }
    return {
        ...state,
        allKnowledge: updatedKnowledgeArray
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
        case actionTypes.LOAD_KNOWLEDGE_CREATOR_DETAILS: return loadKnowledgeCreatorDetails(state, action);
        default:
            return state;
    }

};
export default reducer;

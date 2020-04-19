import { Knowledge} from "../types/knowledge";
import { KnowledgeActions } from '../types/knowledgeActionTypes';
import * as actionTypes from '../actions/actionTypes';
import { updateObject } from "../../shared/utility";


const initialState: Knowledge = {
    error: '',
    loading: false,
    successFeedback: '',
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

const resetKnowledgeFlags = (state: Knowledge, action: any) => {
    return updateObject(state, {error: '', loading: false, successFeedback: ''});
};


const reducer = (state = initialState, action: KnowledgeActions): Knowledge => {
    switch (action.type) {
        case actionTypes.CREATE_KNOWLEDGE_START: return createKnowledgeStart(state, action);
        case actionTypes.CREATE_KNOWLEDGE_SUCCESS: return createKnowledgeSuccess(state, action);
        case actionTypes.CREATE_KNOWLEDGE_FAIL: return createKnowledgeFail(state, action);
        case actionTypes.RESET_KNOWLEDGE_FLAGS: return resetKnowledgeFlags(state, action);
        default:
            return state;
    }

};
export default reducer;

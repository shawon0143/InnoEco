import * as actionTypes from './actionTypes';
import {KnowledgeActions} from "../types/knowledgeActionTypes";
import {callApi} from "../../shared/axios";
import {Dispatch} from "redux";
import {getUserById, loadUserDetailsById} from "./auth";
import {TComment, TKnowledge, TLike} from "../types/knowledge";

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

// export const loadKnowledgeCreatorDetails = (users: TUserDetails[]): KnowledgeActions => ({
//     type: actionTypes.LOAD_KNOWLEDGE_CREATOR_DETAILS,
//     users: users,
// });

export const getAllKnowledge = () => {
    return (dispatch: Dispatch<KnowledgeActions>) => {
        dispatch(getAllKnowledgeStart());
        callApi('getKnowledge', null, null,async (err: any, result: any) => {
           if (err) {
               console.log(err);
               dispatch(getAllKnowledgeFail(err.message));
           } else {
               // console.log(result);
               let userIdList: any = [];
                   for (let i = 0; i < result.knowledge.length; i++) {
                       if (!userIdList.includes(result.knowledge[i].createdBy)) {
                           userIdList.push(result.knowledge[i].createdBy);
                       }
                       // we extract comment userId's
                       for (let j = 0; j < result.knowledge[i].comments.length; j++) {
                           if (!userIdList.includes(result.knowledge[i].comments[j].userId)) {
                               userIdList.push(result.knowledge[i].comments[j].userId);
                           }
                       }
                       // we extract like userId's
                       for (let k = 0; k < result.knowledge[i].likes.length; k++) {
                           if (!userIdList.includes(result.knowledge[i].likes[k].userId)) {
                               userIdList.push(result.knowledge[i].likes[k].userId);
                           }
                       }
                   }
                // console.log(userIdList);
                let users = await getUserById(userIdList);
                // console.log(users);
                dispatch(loadUserDetailsById(users.user) as any);
                // dispatch(loadKnowledgeCreatorDetails(users));
               dispatch(getAllKnowledgeSuccess(result));

           }
        });
    };
};

// ======== Update knowledge ===========
export const updateKnowledgeStart = (): KnowledgeActions => ({
    type: actionTypes.UPDATE_KNOWLEDGE_START
});

export const updateKnowledgeFail = (error: string): KnowledgeActions => ({
    type: actionTypes.UPDATE_KNOWLEDGE_FAIL,
    updateKnowledgeError: error
});

export const updateKnowledgeSuccess = (knowledge: TKnowledge): KnowledgeActions => ({
    type: actionTypes.UPDATE_KNOWLEDGE_SUCCESS,
    knowledge: knowledge
});

export const saveKnowledge = (knowledge: any) => {
    return (dispatch: Dispatch<KnowledgeActions>) => {
        dispatch(updateKnowledgeStart());
        callApi('updateKnowledge', knowledge, {knowledgeId: knowledge._id}, (err: any, result: any) => {
            if (err) {
                console.log(err);
                dispatch(updateKnowledgeFail(err));
            } else {
                console.log(result);
                dispatch(updateKnowledgeSuccess(knowledge));
            }
        });
    }
};
// ======= add new comment ==========
export const addNewComment = (comment: any, knowledgeId: string) => {
    return (dispatch: Dispatch<KnowledgeActions>) => {
        callApi('addComment', comment, {knowledgeId: knowledgeId}, (err: any, result: any) => {
            if (err) {
                console.log(err);
            } else {
                // console.log(result);
                dispatch(addCommentToKnowledge(result.data.comments[result.data.comments.length - 1], result.data._id));
            }
        });
    }
};

export const addCommentToKnowledge = (comment: TComment, knowledgeId: string): KnowledgeActions => ({
    type: actionTypes.ADD_COMMENT_TO_KNOWLEDGE,
    comment: comment,
    knowledgeId: knowledgeId
});

// ======= add new like ============
export const addNewLike = (like: any, knowledgeId: string) => {
    return (dispatch: Dispatch<KnowledgeActions>) => {
        callApi('addLike', like, {knowledgeId: knowledgeId}, (err: any, result: any) => {
            if (err) {
                console.log(err);
            } else {
                console.log(result);
                dispatch(addLikeToKnowledge(result.data.likes[result.data.likes.length - 1], result.data._id));
            }
        })
    }
};

export const addLikeToKnowledge = (like: TLike, knowledgeId: string): KnowledgeActions => ({
    type: actionTypes.ADD_LIKE_TO_KNOWLEDGE,
    like: like,
    knowledgeId: knowledgeId
});

// ========== RESET FLAGS =============
export const resetKnowledgeFlags = (): KnowledgeActions => ({
    type: actionTypes.RESET_KNOWLEDGE_FLAGS
});

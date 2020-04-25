export interface Knowledge {
    error: string;
    loading: boolean;
    successFeedback: string;
    getAllKnowledgeError: string,
    getAllKnowledgeLoading: boolean,
    allKnowledge: {[id: string]: TKnowledge},
    totalNoOfKnowledge: number
}

export type TKnowledge = {
    _id: string,
    title: string,
    description: string,
    type: TKnowledgeType,
    affiliation: string[],
    status: string,
    lookingFor: string[],
    members: string[],
    knowledgeFile: string,
    knowledgeFileType: string,
    createdBy: TCreatedBy,
    comments: TComment[],
    likes: TLike[],
    createdAt: Date,
    updatedAt: Date,
    request: {
        type: string,
        url: string
    }
};

export type TCreatedBy = {
    _id: string;
    firstName: string;
    lastName: string;
    imageUrl: string;
}

export type TComment = {
    details: string;
    userId: string;
    postedOn: Date;
}

export type TLike = {
    userId: string;
    likedOn: Date;
}

export type TKnowledgeType = 'pitch'|'project'|'publication'|'post';

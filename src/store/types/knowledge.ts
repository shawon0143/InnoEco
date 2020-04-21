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
    type: string,
    affiliation: string[],
    status: string,
    lookingFor: string[],
    members: string[],
    knowledgeFile: string,
    createdBy: string,
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
    name: string;
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

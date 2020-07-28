export interface Event {
    allEvents: {[id: string]: TEvent},
    error: string;
    loading: boolean;
}

export type TEvent = {
    _id: string,
    name: string,
    description: string,
    members: string[],
    eventDate: Date,
    createdBy: string,
    createdAt: Date,
    updatedAt: Date,
}
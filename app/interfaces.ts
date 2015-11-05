export enum EventType {
    POMIDORO,
    SHORT_BREAK,
    LONG_BREAK
};

export interface Pomodori {
    eventType: EventType,
    dateCreated?: Date
};

export interface AuthUser {
    auth: {
        provider: string,
        uid: string
    },
    expires: number,
    provider: string,
    token: string,
    uid: string,
    twitter?: {
        accessToken: string,
        accessTokenSecret: string,
        displayName: string,
        id: string,
        profileImageUrl: string,
        username: string
    }
};
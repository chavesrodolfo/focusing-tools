export enum PhaseType {
    POMIDORO,
    SHORT_BREAK,
    LONG_BREAK,
    CUSTOM_BREAK
};

export interface FocusPhase {
    phaseType: PhaseType,
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
        profileImageURL: string,
        username: string
    }
};
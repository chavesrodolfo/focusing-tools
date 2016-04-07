export enum PhaseType {
    FOCUS = 25,
    SHORT_BREAK = 5,
    LONG_BREAK = 15,
    CUSTOM_BREAK = null
};

export enum AuthType {
    TWITTER,
    GITHUB
};

export enum NotificationPermission {
	GRANTED,
	DENIED,
	UNSUPPORTED
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
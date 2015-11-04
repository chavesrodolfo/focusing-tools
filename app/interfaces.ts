export enum EventType {
    POMIDORO,
    SHORT_BREAK,
    LONG_BREAK
};

export interface Pomodori {
    eventType: EventType,
    dateCreated?: Date
};
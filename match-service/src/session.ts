import session from 'express-session';

declare module 'express-session' {
    export interface SessionData {
        loggedIn: boolean;
        user: { [key: string]: any };
    }
}
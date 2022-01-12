import * as express from "express"
import * as UserController from "./userController"
import { userRoutes } from './userRoutes'
import { matchRoutes } from './matchRoutes'

export const router = ( app: express.Application ) => {
    app.get('/', (req, res) => res.send('Hello World!'));

    app.use('/user', userRoutes);
    app.use('/match', matchRoutes);
}


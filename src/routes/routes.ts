import * as express from "express"
import * as path from "path"
import { userRoutes } from './userRoutes'
import { matchRoutes } from './matchRoutes'

export const router = ( app: express.Application ) => {
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname + '/login.html'))
    });

    app.use('/user', userRoutes);
    app.use('/match', matchRoutes);
}


import * as express from "express"
import * as path from "path"
import { accountRoutes } from "./accountRoutes"

export const router = ( app: express.Application ) => {
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname + '/../login.html'))
    });

    app.use('/auth', accountRoutes);
}


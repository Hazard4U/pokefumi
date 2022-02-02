import * as express from "express"
import { userRoutes } from './userRoutes'
import { matchRoutes } from './matchRoutes'
import { pokemonRoutes } from "./pokemonRoutes"
import { roundRoutes } from './roundRoutes'

export const router = ( app: express.Application ) => {
    app.get('/', (req, res) => {
        res.send("Match-Service")
    });

    app.use('/user', userRoutes);
    app.use('/match', matchRoutes);
    app.use('/pokemon', pokemonRoutes);
    app.use('/round', roundRoutes);
}


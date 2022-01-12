import * as express from "express"
import * as MatchController from "./matchController"
import { Match } from './model'

export const matchRoutes = ( app: express.Application ) => {
    app.get('/', (req, res) => {
        res.status(200).json(MatchController.listMatchs())
    });

    app.get('/:id', (req, res) => {
        const matchId: number = parseFloat(req.params.id)
        res.status(200).json(MatchController.findMatch(matchId))
    })

    app.post('/', (req, res) => {
        const newMatch: Match = req.body    
        res.status(200).json(MatchController.addMatch(newMatch))
    })
}


import * as express from "express"
import * as UserController from "./userController"
import { User } from './model'

export const userRoutes = ( app: express.Application ) => {
    app.get('/', (req, res) => {
        res.status(200).json(UserController.listUsers())
    });

    app.get('/:id', (req, res) => {
        const userId: number = parseFloat(req.params.id)
        res.status(200).json(UserController.findUser(userId))
    })

    app.post('/', (req, res) => {
        const newUser: User = req.body    
        res.status(200).json(UserController.addUser(newUser))
    })
}


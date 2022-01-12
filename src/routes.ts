import * as express from "express"
import * as path from "path"
import * as UserController from "./userController"
import { User } from './model'

export const register = ( app: express.Application ) => {
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname + '/login.html'))
    });

    app.get('/user', (req, res) => {
        res.status(200).json(UserController.listUsers())
    })

    app.get('/user/:id', (req, res) => {
        const userId: number = parseFloat(req.params.id)
        res.status(200).json(UserController.findUser(userId))
    })

    app.post('/user', (req, res) => {
        const newUser: User = req.body    
        res.status(200).json(UserController.addUser(newUser))
    })  
}


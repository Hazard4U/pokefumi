import express from 'express';
import * as bodyParser from 'body-parser';

import { User } from './model'
import { listUsers, findUser, addUser } from './userController'

const app = express();
app.use(bodyParser.json({
    limit: '50mb',
    verify(req: any, res, buf, encoding) {
        req.rawBody = buf;
    }
}));

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/user', (req,res) => {
    res.status(200).json(listUsers())
})

app.post('/user', (req, res) => {
    const newUser: User = req.body;
    res.status(200).json(addUser(newUser))
})

app.get('/user/:id', (req, res) => {
    const userId: number = parseFloat(req.params.id)
    res.status(200).json(findUser(userId))
})


export {app};


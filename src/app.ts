import express from 'express';
import * as bodyParser from 'body-parser';

import users from './users.json';

const app = express();
app.use(bodyParser.json({
    limit: '50mb',
    verify(req: any, res, buf, encoding) {
        req.rawBody = buf;
    }
}));

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/user', (req,res) => {
    res.status(200).json(users)
})

export {app};


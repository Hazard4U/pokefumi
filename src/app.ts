import express from 'express';
import session from 'express-session';
import * as bodyParser from 'body-parser';

import { register } from './routes';

const app = express();

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}))

app.use(bodyParser.json({
    limit: '50mb',
    verify(req: any, res, buf, encoding) {
        req.rawBody = buf;
    }
}));

register(app)

export {app};


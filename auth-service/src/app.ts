import express from 'express';
import session from 'express-session';
import * as bodyParser from 'body-parser';

import { router } from './routes/routes';

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

router(app)

export {app};


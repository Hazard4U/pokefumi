import express from 'express';
import * as bodyParser from 'body-parser';

import { router } from './routes/routes';
import { checkAuth } from './middlewares/AuthMiddleware'

const app = express();


app.use(bodyParser.json({
    limit: '50mb',
    verify(req: any, res, buf, encoding) {
        req.rawBody = buf;
    }
}));

app.all('/match', checkAuth)
app.all('/round', checkAuth)
app.all('/pokemon', checkAuth)

router(app)

export {app};


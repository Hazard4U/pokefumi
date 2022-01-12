import express from 'express';
import * as bodyParser from 'body-parser';

import { router } from './routes';

const app = express();
app.use(bodyParser.json({
    limit: '50mb',
    verify(req: any, res, buf, encoding) {
        req.rawBody = buf;
    }
}));

router(app)

export {app};


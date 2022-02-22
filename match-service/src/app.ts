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

app.all('/*', (req, res, next) => {
    const allowedPostRoutes = ["/user/"];
    if(req.method == "POST" && allowedPostRoutes.includes(req.path)){
        return next();
    }
    checkAuth(req, res, next);
})
router(app)

export {app};


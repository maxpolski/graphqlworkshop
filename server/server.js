import express from 'express';
import bodyParser from 'body-parser';

import configs from '../configs';
import indexRouteHandler from './routes/indexRoute';
import authRouteHandler from './routes/authRoute';
import connectMongo from './helpers/mongo';
import isAuthorizedMiddleware from './middlewares/checkAuth';

const PORT = configs.appPort || 3000;

const app = express();

app.use(express.static('client/dist'));
app.use(bodyParser.json());
app.use(isAuthorizedMiddleware);

app.get('/', indexRouteHandler);
app.post('/auth', authRouteHandler);

module.exports = () =>
  app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
    connectMongo();
  });

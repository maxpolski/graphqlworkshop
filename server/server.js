import express from 'express';

import configs from '../configs';
import indexRouteHandler from './routes/indexRoute';

const PORT = configs.appPort || 3000;

const app = express();

app.use(express.static('client/dist'));
app.get('/', indexRouteHandler);

module.exports = () =>
  app.listen(PORT, () =>
    console.log(`listening on port ${PORT}`));

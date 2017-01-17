import express from 'express';
import bodyParser from 'body-parser';

import configs from '../configs';
import indexRouteHandler from './routes/indexRoute';
import authRouteHandler from './routes/authRoute';
import connectMongo from './helpers/mongo';
import isAuthorizedMiddleware from './middlewares/checkAuth';
import addPostRouteHandler from './routes/addPostRoute';
import getPostRouteHandler from './routes/getPostRoute';
import addCommentRouteHandler from './routes/addCommentRoute';
import getCommentRouteHandler from './routes/getCommentRoute';
import addLikePostRouteHandler from './routes/addLikePostRoute';
import addLikeCommentRouteHandler from './routes/addLikeCommentRoute';
import getUserRouteHandler from './routes/getUserRoute';

const PORT = configs.appPort || 3000;

const app = express();

app.use(express.static('client/dist'));
app.use(bodyParser.json());
app.use(isAuthorizedMiddleware);

app.get('/', indexRouteHandler);
app.post('/auth', authRouteHandler);
app.post('/post', addPostRouteHandler);
app.get('/post/:postId', getPostRouteHandler);
app.post('/comment', addCommentRouteHandler);
app.get('/comment/:commentId', getCommentRouteHandler);
app.post('/likepost', addLikePostRouteHandler);
app.post('/likecomment', addLikeCommentRouteHandler);
app.get('/user/:userId', getUserRouteHandler);

module.exports = () =>
  app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
    connectMongo();
  });

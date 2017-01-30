import express from 'express';
import bodyParser from 'body-parser';
import graphqlHTTP from 'express-graphql';

import configs from '../configs';
import indexRouteHandler from './routes/indexRoute';
import authRouteHandler from './routes/authRoute';
import connectMongo from './helpers/mongo';
import isAuthorizedMiddleware from './middlewares/checkAuth';
import graphQLSchema from './graphql/schema';
import addPostRouteHandler from './routes/addPostRoute';
import getPostRouteHandler from './routes/getPostRoute';
import addCommentRouteHandler from './routes/addCommentRoute';
import getCommentRouteHandler, {
  getPostCommentsList as getPostCommentsListHandler,
} from './routes/getCommentRoute';
import addLikePostRouteHandler from './routes/addLikePostRoute';
import addLikeCommentRouteHandler from './routes/addLikeCommentRoute';
import getUserRouteHandler, {
  getUsersList as getUsersListHandler,
} from './routes/getUserRoute';
import getCurrentUserRouteHandler from './routes/getCurrentUserRoute';
import getPostsRouteHandler from './routes/getPostsRoute';

const PORT = configs.appPort || 3000;

const app = express();

app.use(express.static('client/dist'));
app.use('/graphql', graphqlHTTP({
  schema: graphQLSchema,
  graphiql: true,
}));
app.use(bodyParser.json());
app.use(isAuthorizedMiddleware);

app.get('/', indexRouteHandler);
app.post('/api/auth', authRouteHandler);
app.post('/api/post', addPostRouteHandler);
app.get('/api/post/:postId', getPostRouteHandler);
app.post('/api/comment', addCommentRouteHandler);
app.get('/api/comment/:commentId', getCommentRouteHandler);
app.get('/api/postcomments/:postId', getPostCommentsListHandler);
app.post('/api/likepost', addLikePostRouteHandler);
app.post('/api/likecomment', addLikeCommentRouteHandler);
app.get('/api/user/:userId', getUserRouteHandler);
app.post('/api/getusers', getUsersListHandler);
app.get('/api/posts/:pageNum*?', getPostsRouteHandler);
app.get('/api/currentUser/:token', getCurrentUserRouteHandler);

app.get('*', indexRouteHandler);

module.exports = () =>
  app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
    connectMongo();
  });

import { combineReducers } from 'redux';

import general from './general';
import users from './users';
import posts from './posts';
import comments from './comments';
import likes from './likes';

export default combineReducers({
  likes,
  posts,
  users,
  comments,
  general,
});

import { combineReducers } from 'redux';

import general from './general';
import posts from './posts';
import likes from './likes';

export default combineReducers({
  likes,
  posts,
  general,
});

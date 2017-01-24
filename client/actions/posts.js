import {
  GET_POSTS_LIST_PENDING,
  GET_POSTS_LIST_RESOLVED,
  GET_POSTS_LIST_REJECTED,
} from '../constants/actions';
import { getPostsList as getPostsListApiCall } from '../apiCalls/postCalls';

export const getPostsList = dispatch => (pageNum) => {
  dispatch({ type: GET_POSTS_LIST_PENDING });
  getPostsListApiCall(pageNum)
    .then(posts => dispatch({ type: GET_POSTS_LIST_RESOLVED, payload: posts }))
    .catch(err => dispatch({ type: GET_POSTS_LIST_REJECTED, payload: err }));
};

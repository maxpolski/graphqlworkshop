import {
  GET_COMMENTS_LIST_PENDING,
  GET_COMMENTS_LIST_RESOLVED,
  GET_COMMENTS_LIST_REJECTED,
} from '../constants/actions';

import getCommentsListCall from '../apiCalls/commentCalls';
import { getUsersList } from './user';

export const getCommentsList = dispatch => (postId, commentsIds) => {
  dispatch({
    type: GET_COMMENTS_LIST_PENDING,
    payload: {
      postId,
      commentsList: commentsIds,
    },
  });
  return getCommentsListCall(postId)
    .then((response) => {
      const commentsUsersIds = response.commentsList.map(comment => comment.author);
      getUsersList(dispatch)(commentsUsersIds);
      return dispatch({
        type: GET_COMMENTS_LIST_RESOLVED,
        payload: response,
      });
    })
    .catch(err => dispatch({ type: GET_COMMENTS_LIST_REJECTED, payload: err }));
};

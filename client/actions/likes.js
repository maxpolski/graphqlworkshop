import {
  LIKE_POST_RESOLVED,
  LIKE_POST_REJECTED,
  LIKE_POST_PENDING,
  LIKE_COMMENT_PENDING,
  LIKE_COMMENT_RESOLVED,
  LIKE_COMMENT_REJECTED,
} from '../constants/actions';
import { likePostCall } from '../apiCalls/likeCalls';

export const likePost = dispatch => (postId) => {
  dispatch({ type: LIKE_POST_PENDING, payload: { postId } });
  likePostCall(postId)
    .then(({ action, post }) =>
      dispatch({
        type: LIKE_POST_RESOLVED,
        payload: {
          actionType: action,
          post,
        },
      }),
    )
    .catch(err => dispatch({ type: LIKE_POST_REJECTED, payload: { err, postId } }));
};

export const likeComment = dispatch => (commentId) => {
  dispatch({ type: LIKE_COMMENT_PENDING, payload: commentId });
  likePostCall(commentId)
    .then(actionType => dispatch({ type: LIKE_COMMENT_RESOLVED, payload: actionType }))
    .catch(err => dispatch({ type: LIKE_COMMENT_REJECTED, payload: { err, commentId } }));
};

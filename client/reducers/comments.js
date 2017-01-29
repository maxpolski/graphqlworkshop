import {
  GET_COMMENTS_LIST_PENDING,
  GET_COMMENTS_LIST_RESOLVED,
  // GET_POSTS_LIST_REJECTED,
} from '../constants/actions';

const defaultState = {
  postsComments: [],
  pendingPostComments: [],
};

export default (state = defaultState, { type, payload }) => {
  switch (type) {
    case GET_COMMENTS_LIST_PENDING:
      return {
        ...state,
        pendingPostComments: [
          ...state.pendingPostComments,
          payload.postId,
        ],
      };
    case GET_COMMENTS_LIST_RESOLVED:
      const {
        postId,
      } = payload;

      const newPendingPostComments = state.pendingPostComments.filter(pendingComment =>
      pendingComment !== postId);
      const postCommentsIndex = state.postsComments.findIndex(postComments =>
        postComments.postId === postId);
      const newPostsComments = [
        ...state.postsComments.slice(0, postCommentsIndex),
        payload,
        ...state.postsComments.slice(postCommentsIndex + 1),
      ];

      return {
        ...state,
        pendingPostComments: newPendingPostComments,
        postsComments: newPostsComments,
      };

    default:
      return state;
  }
};

export const getCommentsByPostId = (state, postId) => {
  const postData = state.postsComments.find(postComments => postComments.postId === postId);
  return (postData && postData.commentsList) || [];
};

export const getPendingComments = state =>
  state.pendingPostComments;

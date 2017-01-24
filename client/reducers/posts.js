import {
  GET_POSTS_LIST_PENDING,
  GET_POSTS_LIST_RESOLVED,
  GET_POSTS_LIST_REJECTED,
  INITIALIZE_RESOLVED,
} from '../constants/actions';

const defaultState = {
  isPostsFetching: true,
  postsList: [],
};

export default (state = defaultState, { type, payload }) => {
  switch (type) {
    case INITIALIZE_RESOLVED:
      return {
        ...state,
        postsList: payload.posts,
      };
    case GET_POSTS_LIST_PENDING:
      return {
        ...state,
        isPostsFetching: true,
      };
    case GET_POSTS_LIST_RESOLVED:
      return {
        ...state,
        isPostsFetching: false,
        postsList: payload,
      };
    case GET_POSTS_LIST_REJECTED:
      return {
        ...state,
        isPostsFetching: false,
      };
    default:
      return state;
  }
};

export const getPostByPostId = (state, postId) =>
  state.postsList.find(post => post._id === postId);

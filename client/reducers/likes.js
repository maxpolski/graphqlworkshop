import {
  INITIALIZE_RESOLVED,
  LIKE_POST_PENDING,
  LIKE_POST_REJECTED,
  LIKE_POST_RESOLVED,
} from '../constants/actions';

const defaultState = {
  pendingPostLikes: [],
  postsLikes: [],
};

export default (state = defaultState, { type, payload }) => {
  switch (type) {
    case INITIALIZE_RESOLVED:
      let newPostsLikes = payload.posts.map(post => ({
        postId: post._id,
        postLikes: post.likes,
      }));
      return { ...state, postsLikes: newPostsLikes };
    case LIKE_POST_PENDING:
      let newPendingPostLikes = [...state.pendingPostLikes];
      newPendingPostLikes.push(payload.postId);
      return { ...state, pendingPostLikes: newPendingPostLikes };
    case LIKE_POST_REJECTED:
      const rejectedLikeIndex = state.pendingPostLikes.findIndex(
        postId => postId === payload.postId,
      );
      newPendingPostLikes = [
        ...state.postsLikes.slice(0, rejectedLikeIndex),
        ...state.pendingPostLikes.slice(rejectedLikeIndex + 1, state.pendingPostLikes.length - 1),
      ];
      return { ...state, pendingPostLikes: newPendingPostLikes };
    case LIKE_POST_RESOLVED:
      const resolvedLikeIndex = state.pendingPostLikes.findIndex(
        postLike => postLike === payload.post._id,
      );

      newPendingPostLikes = [
        ...state.pendingPostLikes.slice(0, resolvedLikeIndex),
        ...state.pendingPostLikes.slice(resolvedLikeIndex + 1, state.pendingPostLikes.length - 1),
      ];

      let postIndex = state.postsLikes.findIndex(
        postLikes => postLikes.postId === payload.post._id
      );

      newPostsLikes = [
        ...state.postsLikes.slice(0, postIndex),
        {
          postId: payload.post._id,
          postLikes: payload.post.likes,
        },
        ...state.postsLikes.slice(postIndex + 1),
      ];

      return {
        ...state,
        postsLikes: newPostsLikes,
        pendingPostLikes: newPendingPostLikes,
      };
    default:
      return state;
  }
};

export const getPostsLikesById = (state, postId) =>
  state.postsLikes.find(postLikes => postLikes.postId === postId).postLikes;

export const getPendingLikes = state =>
  state.pendingLikes;

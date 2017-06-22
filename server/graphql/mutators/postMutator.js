import Post from '../../data/models/post';

export const likePostMutator = (postId, userId) =>
  Post.findById(postId)
    .then((post) => {
      const userLikeId = post.likes.indexOf(userId);
      const newLikesList = ~userLikeId ?
      [
        ...post.likes.slice(0, userLikeId),
        ...post.likes.slice(userLikeId + 1),
      ]
        :
      [...post.likes, userId];
      return Post.findByIdAndUpdate(postId, { likes: newLikesList });
    });

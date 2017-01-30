import Comment from '../../data/models/comment';
import Post from '../../data/models/post';

export const likeCommentMutator = (commentId, userId) =>
  Comment.findById(commentId)
    .then((comment) => {
      const userLikeId = comment.likes.indexOf(userId);
      const newLikesList = ~userLikeId ?
      [
        ...comment.likes.slice(0, userLikeId),
        ...comment.likes.slice(userLikeId + 1),
      ]
        :
      [...comment.likes, userId];
      return Comment.findByIdAndUpdate(commentId, { likes: newLikesList });
    });

export const addCommentMutator = (commentText, userId, postId) => {
  const newComment = new Comment({
    text: commentText,
    author: userId,
  });

  const savedComment = newComment.save()
    .then(({ id }) =>
      Post.findByIdAndUpdate(postId, { $push: { comments: id } })
        .then(() => ({ id })));

  return savedComment;
};

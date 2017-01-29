import Comment from '../data/models/comment';
import Post from '../data/models/post';

export default (req, res) => {
  const {
    commentId,
  } = req.params;

  Comment.findById(commentId, (err, comment) => {
    if (!err) {
      return res
              .set('Content-Type', 'application/json')
              .send(JSON.stringify(comment));
    }

    return res
            .send('');
  });
};

export const getPostCommentsList = (req, res) => {
  const {
    postId,
  } = req.params;

  Post.findById(postId)
    .then(post => Promise.all(post.comments.map(commentId => Comment.findById(commentId))))
    .then(
      commentsList =>
        res
          .set('Content-Type', 'application/json')
          .send(JSON.stringify({ postId, commentsList })),
    );
};

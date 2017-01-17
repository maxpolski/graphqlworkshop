import Comment from '../data/models/comment';

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

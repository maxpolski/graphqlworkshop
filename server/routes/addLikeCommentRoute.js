import Comment from '../data/models/comment';

import { getUserIdFromToken } from '../helpers/token';

export default (req, res) => {
  const {
    token,
    commentId,
  } = req.body;

  const userId = getUserIdFromToken(token);

  Comment.findByIdAndUpdate(commentId, { $push: { likes: userId } }, (err) => {
    if (!err) {
      return res.send(userId);
    }

    return res.send('');
  });
};

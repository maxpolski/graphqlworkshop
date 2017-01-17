import Post from '../data/models/post';

import { getUserIdFromToken } from '../helpers/token';

export default (req, res) => {
  const {
    token,
    postId,
  } = req.body;

  const userId = getUserIdFromToken(token);

  Post.findByIdAndUpdate(postId, { $push: { likes: userId } }, (err) => {
    if (!err) {
      return res.send(userId);
    }

    return res.send('');
  });
};

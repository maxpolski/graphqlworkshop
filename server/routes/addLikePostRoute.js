import Post from '../data/models/post';

import { getUserIdFromToken } from '../helpers/token';

const sendRespond = (res, data) =>
  res.send(data);

export default async (req, res) => {
  const {
    token,
    postId,
  } = req.body;

  const userId = getUserIdFromToken(token);

  const post = Post.findById(postId);
  const hasUserLikedPost = post.likes.includes(userId);
  const userIndexInLikesArray = post.likes.indexOf(userId);

  if (hasUserLikedPost) {
    post.likes.splice(userIndexInLikesArray, 1);
    return Post.findByIdAndUpdate(
      userId,
      { likes: post.likes },
      (err) => {
        if (!err) {
          return sendRespond(res, JSON.stringify({ action: 'unliked' }));
        }

        return sendRespond(res, '');
      },
    );
  }

  Post.findByIdAndUpdate(postId, { $push: { likes: userId } }, (err) => {
    if (!err) {
      return sendRespond(res, JSON.stringify({ action: 'liked' }));
    }

    return sendRespond(res, '');
  });
};

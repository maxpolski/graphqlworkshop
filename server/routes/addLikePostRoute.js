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
  const post = await Post.findById(postId);
  const hasUserLikedPost = post.likes.includes(userId);
  const userIndexInLikesArray = post.likes.indexOf(userId);

  if (hasUserLikedPost) {
    const likesClone = [...post.likes];
    likesClone.splice(userIndexInLikesArray, 1);

    try {
      await Post.findByIdAndUpdate(postId, { $set: { likes: likesClone } });
      return sendRespond(
        res, JSON.stringify({
          post: await Post.findById(postId),
          action: 'unliked',
        }),
      );
    } catch (err) {
      console.error(`Something went wrong: ${err}`);
      return sendRespond(res, '');
    }
  }

  try {
    await Post.findByIdAndUpdate(postId, { $push: { likes: userId } });
    return sendRespond(res, JSON.stringify({
      post: await Post.findById(postId),
      action: 'liked',
    }));
  } catch (err) {
    console.error(`Something went wrong: ${err}`);
    return sendRespond(res, '');
  }
};

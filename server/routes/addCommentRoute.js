import Comment from '../data/models/comment';
import Post from '../data/models/post';
import { getUserIdFromToken } from '../helpers/token';

export default async (req, res) => {
  const {
    token,
    text,
    postId,
  } = req.body;

  const userId = getUserIdFromToken(token);
  const newComment = new Comment({ text, author: userId });
  const { id: commentId } = await newComment.save();
  await Post.findByIdAndUpdate(postId, { $push: { comments: commentId } });

  res
    .set('Content-Type', 'application/json')
    .send(JSON.stringify({ commentId, postId }));
};

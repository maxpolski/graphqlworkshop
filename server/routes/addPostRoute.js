import Post from '../data/models/post';
import { getUserIdFromToken } from '../helpers/token';

export default async (req, res) => {
  const {
    token,
    title,
    description,
    mainText,
  } = req.body;

  const authorId = getUserIdFromToken(token);
  const newPost = new Post({ title, description, mainText, author: authorId });
  const { _id: postId } = await newPost.save();

  res
    .set('Content-Type', 'application/json')
    .send(JSON.stringify({ postId }));
};

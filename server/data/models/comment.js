import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
  text: String,
  author: mongoose.Schema.Types.ObjectId,
  likes: [mongoose.Schema.Types.ObjectId],
});

export default mongoose.model('Comment', CommentSchema);

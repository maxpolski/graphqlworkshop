import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
  title: String,
  description: String,
  mainText: String,
  comments: [mongoose.Schema.Types.ObjectId],
  author: mongoose.Schema.Types.ObjectId,
  likes: [mongoose.Schema.Types.ObjectId],
});

export default mongoose.model('Post', PostSchema);

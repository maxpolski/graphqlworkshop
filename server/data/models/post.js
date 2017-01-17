import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  mainText: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  comments: [String],
  likes: [String],
});

export default mongoose.model('Post', PostSchema);

import Post from '../../data/models/post';

export default (root, args) =>
  Post.findById(args.id);

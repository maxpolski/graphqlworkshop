import Comment from '../../data/models/comment';

export default (root, args) =>
  Comment.findById(args.id);

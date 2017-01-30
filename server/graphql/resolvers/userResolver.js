import User from '../../data/models/user';

export default (root, args) =>
  User.findById(args.id);

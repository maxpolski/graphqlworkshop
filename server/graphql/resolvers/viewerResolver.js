import { getUserIdFromToken } from '../../helpers/token';

export default (root, args) => {
  const userId = getUserIdFromToken(args.token);
  return {
    userId,
  };
};

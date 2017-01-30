import { getUserIdFromToken } from '../../helpers/token';

export default (root, args) => {
  const { token } = args;
  const userId = token ? getUserIdFromToken(args.token) : '';
  return {
    userId,
  };
};

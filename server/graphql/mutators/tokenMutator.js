import User from '../../data/models/user';

import { createToken } from '../../helpers/token';

export default (root, { login, password }) =>
  User.findOne({ login, password })
    .then(user => createToken(user.id, login))
    .catch(() => '');

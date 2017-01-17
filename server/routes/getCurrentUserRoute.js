import User from '../data/models/user';

import { getUserIdFromToken } from '../helpers/token';

export default (req, res) => {
  const {
    token,
  } = req.params;

  const userId = getUserIdFromToken(token);

  User.findById(userId, (err, user) => {
    if (!err) {
      return res
              .set('Content-Type', 'application/json')
              .send(JSON.stringify(user));
    }

    return res.send('');
  });
};

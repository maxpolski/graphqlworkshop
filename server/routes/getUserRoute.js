import User from '../data/models/user';

export default (req, res) => {
  const {
    userId,
  } = req.params;

  User.findById(userId, (err, user) => {
    if (!err) {
      return res
              .set('Content-Type', 'application/json')
              .send(JSON.stringify(user));
    }

    return res.send('');
  });
};

export const getUsersList = (req, res) => {
  const {
    ids,
  } = req.body;

  Promise.all(ids.map(id => User.findById(id)))
    .then(users => res
      .set('Content-Type', 'application/json')
      .send(JSON.stringify({ users })))
    .catch(() => res.send(''));
};

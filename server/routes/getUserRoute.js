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

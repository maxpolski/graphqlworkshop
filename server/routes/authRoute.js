import jwt from 'jwt-simple';

import User from '../data/models/user';
import config from '../../configs';

export default (req, res) => {
  const {
    login,
    password,
  } = req.body;

  User.findOne({ login, password }, (err, result) => {
    if (!err) {
      if (result) {
        const payload = { login, id: result._id };
        const token = jwt.encode(payload, config.tokenSecretString);
        res
          .set('Content-Type', 'application/json')
          .send(JSON.stringify({ token }));
        return;
      }

      res
        .set('Content-Type', 'application/json')
        .send(JSON.stringify({ token: '' }));
      return;
    }
    console.error(`Something went wrong ${err}`);
  });
};

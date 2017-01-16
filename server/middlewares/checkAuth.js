import jwt from 'jwt-simple';

import config from '../../configs';


export default (req, res, next) => {
  const { token } = req.body;
  if (!token) {
    req.isAuthorized = false;
    return next();
  }

  const { login } = jwt.decode(token, config.tokenSecretString);

  if (login) {
    req.isAuthorized = true;
    return next();
  }

  req.isAuthorized = false;
  res.redirect('/');
};

import { getLoginFromToken } from '../helpers/token';

export default (req, res, next) => {
  const { token } = req.body;
  if (!token) {
    req.isAuthorized = false;
    return next();
  }

  const login = getLoginFromToken(token);

  if (login) {
    req.isAuthorized = true;
    return next();
  }

  req.isAuthorized = false;
  res.redirect('/');
};

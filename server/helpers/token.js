import jwt from 'jwt-simple';

import config from '../../configs';

export const getLoginFromToken = (token) => {
  const { login } = jwt.decode(token, config.tokenSecretString);
  return login;
};

export const getUserIdFromToken = (token) => {
  const { id } = jwt.decode(token, config.tokenSecretString);
  return id;
};

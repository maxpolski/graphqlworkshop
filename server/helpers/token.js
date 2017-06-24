import jwt from 'jwt-simple';

import config from '../../configs';

export const createToken = (id, login) =>
  jwt.encode({ id, login }, config.tokenSecretString);

export const getLoginFromToken = (token) => {
  const { login } = jwt.decode(token, config.tokenSecretString);
  return login;
};

export const getUserIdFromToken = (token) => {
  const { id } = jwt.decode(token, config.tokenSecretString);
  return id;
};

// TODO: add logic
export const updateToken = token => token;

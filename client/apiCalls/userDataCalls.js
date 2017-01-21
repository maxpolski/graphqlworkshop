import makeFetch from 'fetch-ponyfill';

const { fetch } = makeFetch();

export const getUser = userId =>
  fetch(`/api/user/${userId}`)
    .then(response => response.json());

export const getCurrentUser = () => {
  const token = localStorage.getItem('token');
  if (token) {
    return fetch(`/api/currentUser/${token}`)
      .then(response => response.json());
  }

  return Promise.resolve({});
};

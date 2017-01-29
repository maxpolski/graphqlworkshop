import makeFetch from 'fetch-ponyfill';

const { fetch } = makeFetch();

export const getUsersList = ids =>
  fetch('/api/getusers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ids }),
  })
  .then(response => response.json());

import makeFetch from 'fetch-ponyfill';

const { fetch } = makeFetch();

export default commentId =>
  fetch(`/api/comment/${commentId}`)
    .then(response => response.json());
